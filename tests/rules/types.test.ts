import { isArray, isArrayOf, isBoolean, isNumber, isString } from '../../src/rules'

describe('IsBoolean', () => {
	test('false', () => {
		const result = isBoolean(false)
		expect(result.valid).toBe(true)
	})
	test('true', () => {
		const result = isBoolean(true)
		expect(result.valid).toBe(true)
	})
	test('truthy string', () => {
		const result = isBoolean('hello')
		expect(result.valid).toBe(false)
	})
	test('falsy string', () => {
		const result = isBoolean('')
		expect(result.valid).toBe(false)
	})
	test('truthy number', () => {
		const result = isBoolean(1)
		expect(result.valid).toBe(false)
	})
	test('falsy number', () => {
		const result = isBoolean(0)
		expect(result.valid).toBe(false)
	})
	test('object', () => {
		const result = isBoolean({})
		expect(result.valid).toBe(false)
	})
	test('array', () => {
		const result = isBoolean([])
		expect(result.valid).toBe(false)
	})
})

describe('IsString', () => {
	test('truthy string', () => {
		const result = isString('1')
		expect(result.valid).toBe(true)
	})
	test('falsy string', () => {
		const result = isString('')
		expect(result.valid).toBe(true)
	})
	test('number', () => {
		const result = isString(1)
		expect(result.valid).toBe(false)
	})
	test('array', () => {
		const result = isString([])
		expect(result.valid).toBe(false)
	})
	test('object', () => {
		const result = isString({})
		expect(result.valid).toBe(false)
	})
	test('function', () => {
		const result = isString(() => {
		})
		expect(result.valid).toBe(false)
	})
	test('set', () => {
		const result = isString(new Set())
		expect(result.valid).toBe(false)
	})
	test('symbol', () => {
		const result = isString(Symbol())
		expect(result.valid).toBe(false)
	})
})

describe('IsNumber', () => {
	test('truthy number', () => {
		const result = isNumber(1)
		expect(result.valid).toBe(true)
	})
	test('falsy number', () => {
		const result = isNumber(0)
		expect(result.valid).toBe(true)
	})
	test('NaN', () => {
		const result = isNumber(NaN)
		expect(result.valid).toBe(false)
	})
	test('string', () => {
		const result = isNumber('')
		expect(result.valid).toBe(false)
	})
	test('array', () => {
		const result = isNumber([])
		expect(result.valid).toBe(false)
	})
	test('object', () => {
		const result = isNumber({})
		expect(result.valid).toBe(false)
	})
	test('function', () => {
		const result = isNumber(() => {
		})
		expect(result.valid).toBe(false)
	})
	test('set', () => {
		const result = isNumber(new Set())
		expect(result.valid).toBe(false)
	})
	test('symbol', () => {
		const result = isNumber(Symbol())
		expect(result.valid).toBe(false)
	})
})

describe('IsArray', () => {
	test('empty string', () => {
		const result = isArray([])
		expect(result.valid).toBe(true)
	})
	test('non-empty string', () => {
		const result = isArray([1, '2', [], {}, Symbol()])
		expect(result.valid).toBe(true)
	})
	test('number', () => {
		const result = isArray(1)
		expect(result.valid).toBe(false)
	})
	test('string', () => {
		const result = isArray('array')
		expect(result.valid).toBe(false)
	})
	test('object', () => {
		const result = isArray({})
		expect(result.valid).toBe(false)
	})
	test('function', () => {
		const result = isArray(() => {
		})
		expect(result.valid).toBe(false)
	})
	test('set', () => {
		const result = isArray(new Set())
		expect(result.valid).toBe(false)
	})
	test('symbol', () => {
		const result = isArray(Symbol())
		expect(result.valid).toBe(false)
	})
})

describe('IsArrayOf', () => {
	test('array of string', () => {
		const result = isArrayOf(['a', 'b'], (val) => isString(val).valid, 'string')
		expect(result.valid).toBe(true)
	})
	test('array of number', () => {
		const result = isArrayOf([1, 2], (val) => isNumber(val).valid, 'number')
		expect(result.valid).toBe(true)
	})
	test('array of boolean', () => {
		const result = isArrayOf([true, false], (val) => isBoolean(val).valid, 'boolean')
		expect(result.valid).toBe(true)
	})
	test('array of array', () => {
		const result = isArrayOf([[], []], (val) => isArray(val).valid, 'array')
		expect(result.valid).toBe(true)
	})
	test('array of objects', () => {
		const result = isArrayOf([{ id: 1 }, { id: 2 }], (val) => isNumber(val.id).valid, 'objects')
		expect(result.valid).toBe(true)
	})
	test('mixed array', () => {
		const result = isArrayOf(['1', 2, true, [], { id: 1 }], (val) => isNumber(val).valid, 'number')
		expect(result.valid).toBe(false)
	})
	test('not an array', () => {
		const result = isArrayOf(1 as any, (val) => isNumber(val).valid, 'number')
		expect(result.valid).toBe(false)
	})
})