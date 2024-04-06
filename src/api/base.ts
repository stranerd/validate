import { check, Options as Opts, Rule, Sanitizer, Transformer } from '../utils/rules'

type Options<I> = Opts & { original: boolean, default: (() => I) | I }

export class VBase<I> {
	#force: ((val: unknown) => I) | undefined = undefined
	#groups: {
		transformer: Transformer<I, any>,
		typings: Rule<I>[],
		rules: Rule<I>[],
		sanitizers: Sanitizer<I>[],
		options: Options<I>
	}[] = [
			{
				transformer: ((v) => v),
				typings: [], rules: [], sanitizers: [],
				options: { original: false, required: true, nullable: false, default: undefined as unknown as I }
			}
		]

	get forced () {
		return !!this.#force
	}

	static createType<C extends VBase<any>, A extends Array<any>> (c: new (...args: A) => C) {
		return (...args: A) => new c(...args)
	}

	static createForcedType<C extends VBase<any>, A extends any[] = any[]> (c: new (...args: A) => C, conv: (arg: unknown) => ExtractI<C>) {
		return (...args: A) => new c(...args)._setForced(conv)
	}

	protected clone (base: VBase<I>) {
		this.#force = base.#force
		this.#groups = base.#groups
		return this
	}

	parse (input: unknown, ignoreRulesIfNotRequired = true) {
		let value = input as I
		if (this.#force) value = this.#force(value)

		let res = { errors: [] as string[], valid: true as true, value, ignored: false }

		for (const group of this.#groups) {
			const val = this.#value(res.value, group.options)
			const typeCheck = check(val, group.typings, { ignoreRulesIfNotRequired, ...group.options })
			if (!typeCheck.valid) return typeCheck

			const sanitizedValue = typeCheck.ignored ? typeCheck.value : this.#sanitize(typeCheck.value, group.sanitizers)
			const v = check(sanitizedValue, group.rules, { ignoreRulesIfNotRequired, ...group.options })
			if (!v.valid) return v

			const retValue = group.options.original ? res.value : group.transformer(v.value)

			res = { ...v, valid: true, value: retValue }
		}

		return res
	}

	addTyping (rule: Rule<I>) {
		this.#groups.at(-1)!.typings.push(rule)
		return this
	}

	addRule (rule: Rule<I>) {
		this.#groups.at(-1)!.rules.push(rule)
		return this
	}

	addSanitizer (sanitizer: Sanitizer<I>) {
		this.#groups.at(-1)!.sanitizers.push(sanitizer)
		return this
	}

	protected _addTransform<T> (transformer: Transformer<I, T>) {
		this.#groups.at(-1)!.transformer = transformer
		this.#groups.push({
			transformer: (v) => v,
			typings: [], rules: [], sanitizers: [],
			options: {
				original: false,
				required: true,
				nullable: false,
				default: undefined as unknown as I
			}
		})
		return this
	}

	protected _setOption<K extends keyof Options<I>> (key: K, value: Options<I>[K]) {
		if (this.#groups.at(-1)?.options) this.#groups.at(-1)!.options[key] = value
		return this
	}

	protected _setForced (conv: (val: unknown) => I) {
		this.#force = conv
		return this
	}

	#value (value: I, options: Options<I>) {
		if (value !== undefined) return value
		const def = options.default
		// @ts-ignore
		if (def !== undefined) return typeof def === 'function' ? def() : def as I
		return undefined as unknown
	}

	#sanitize (value: I, sanitizers: Sanitizer<I>[]) {
		return sanitizers.reduce((v, sanitizer) => sanitizer(v), value)
	}
}

export type ExtractI<T extends VBase<any>> = T extends VBase<infer I> ? I : never