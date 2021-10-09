import {
	arrayContains,
	hasLessThan,
	hasMoreThan,
	isArrayOf,
	isDeepEqualTo,
	isExtractedHTMLLongerThan,
	isLessThan,
	isLongerThan,
	isMoreThan,
	isRequiredIf,
	isShallowEqualTo,
	isShorterThan
} from '../rules'

export function isRequiredIfX<Type> (condition: boolean, error?: string) {
	return (val: Type) => isRequiredIf(val, condition, error)
}

export const isLongerThanX = (length: number, error?: string) => (val: string) => isLongerThan(val, length, error)
export const isShorterThanX = (length: number, error?: string) => (val: string) => isShorterThan(val, length, error)
export const isExtractedHTMLLongerThanX = (length: number, error?: string) => (val: string) => isExtractedHTMLLongerThan(val, length, error)

export function hasMoreThanX<Type> (length: number, error?: string) {
	return (val: Type[]) => hasMoreThan(val, length, error)
}

export function hasLessThanX<Type> (length: number, error?: string) {
	return (val: Type[]) => hasLessThan(val, length, error)
}

export function isShallowEqualToX<Type> (compare: Type, error?: string) {
	return (val: Type) => isShallowEqualTo(val, compare, error)
}

export function isDeepEqualToX<Type> (compare: Type, comparer: (curr: Type, val: Type) => boolean, error?: string) {
	return (val: Type) => isDeepEqualTo(val, compare, comparer, error)
}

export const isMoreThanX = (length: number, error?: string) => (val: number) => isMoreThan(val, length, error)
export const isLessThanX = (length: number, error?: string) => (val: number) => isLessThan(val, length, error)

export function arrayContainsX<Type> (array: Type[], comparer: (curr: Type, val: Type) => boolean, error?: string) {
	return (val: Type) => arrayContains(val, array, comparer, error)
}

export function isArrayOfX<Type> (comparer: (curr: Type) => boolean, type: string, error?: string) {
	return (val: Type[]) => isArrayOf(val, comparer, type, error)
}