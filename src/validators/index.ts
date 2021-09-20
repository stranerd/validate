import { isRequiredIf } from '../rules'

export type Rule = (value: any) => { valid: true, error: null } | { valid: false, error: string }

export class Validator {
	public static single (value: any, rules: Rule[], presence = true) {
		if (value === undefined && !presence) return { isValid: true, errors: [] }
		if (value === null && !presence) return { isValid: true, errors: [] }

		if (rules.length === 0) return { isValid: true, errors: [] }

		rules = [(value: any) => isRequiredIf(value, presence), ...rules]

		const checks = rules.map((rule) => rule(value))
		const isValid = checks.every((r) => r.valid)
		const errors = checks.map((r) => r.error)
			.filter((e) => e !== null) as string[]

		return { isValid, errors }
	}
}
