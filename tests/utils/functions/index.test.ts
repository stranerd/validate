import { capitalizeText, extractUrls, stripHTML, trimToLength } from '../../../src/utils/functions'

test('CapitalizeText', () => {
	expect(capitalizeText('test')).toBe('Test')
	expect(capitalizeText('test home')).toBe('Test Home')
	expect(capitalizeText('')).toBe('')
	expect(capitalizeText(2 as unknown as string)).toBe('2')
	expect(capitalizeText(null as unknown as string)).toBe(null)
	expect(capitalizeText(undefined as unknown as string)).toBe(undefined)
})

test('stripHTML', () => {
	expect(stripHTML('test')).toBe('test')
	expect(stripHTML(2 as unknown as string)).toBe('2')

	expect(stripHTML('<p>a</p>')).toBe('a')
	expect(stripHTML('<p>a<a>b</a></p>')).toBe('ab')
	expect(stripHTML('<p>a<img src="/" /></p>')).toBe('a')

	expect(stripHTML(null as unknown as string)).toBe(null)
	expect(stripHTML(undefined as unknown as string)).toBe(undefined)
})

test('TrimToLength', () => {
	expect(trimToLength('abc', 10)).toBe('abc')
	expect(trimToLength('abc', 1)).toBe('a...')

	expect(trimToLength(null as unknown as string, 1)).toBe(null)
	expect(trimToLength(undefined as unknown as string, 1)).toBe(undefined)

	const num = 123, arr = [1, 2, 3], obj = { name: 'test' }
	expect(trimToLength(num as unknown as string, 10)).toBe(num.toString())
	expect(trimToLength(arr as unknown as string, 10)).toBe(arr.toString())
	expect(trimToLength(obj as unknown as string, 20)).toBe(obj.toString())
})

test('ExtractUrls', () => {
	expect(extractUrls('abc abc.co 123')[0].original).toBe('abc.co')
	expect(extractUrls('abc abc.co 123')[0].normalized).toBe('http://abc.co')
	expect(extractUrls('abc 123')[0]).toBe(undefined)
})
