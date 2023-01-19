import { VString } from './strings'
import { VNumber } from './numbers'
import { VFile } from './files'
import { VCore } from './core'
import { isInstanceOf, isNull, isUndefined } from '../rules'
import { VArray } from './arrays'
import { VAnd, VObject, VOr } from './objects'
import { VBoolean } from './booleans'

export const v = {
	or: VOr.create,
	and: VAnd.create,
	string: VString.create,
	number: VNumber.create,
	boolean: VBoolean.create,
	file: VFile.create,
	array: VArray.create,
	object: VObject.create,
	null: (err?: string) => VCore.c<null>().addRule((val: null) => isNull(err)(val)),
	undefined: (err?: string) => VCore.c<undefined>().addRule((val: undefined) => isUndefined(err)(val)),
	instanceof: <T> (classDef: new () => T, err?: string) => VCore.c<T>().addRule((val: T) => isInstanceOf(classDef, err)(val)),
	any: () => VCore.c<any>(),
	force: {
		string: (err?: string) => {
			const v = VString.create<unknown>(err)
			v.addSanitizer((value) => String(value))
			v.forced = true
			return v
		},
		number: (err?: string) => {
			const v = VNumber.create<unknown>(err)
			v.addSanitizer((value) => Number(value))
			v.forced = true
			return v
		},
		boolean: (err?: string) => {
			const v = VBoolean.create<unknown>(err)
			v.addSanitizer((value) => Boolean(value))
			v.forced = true
			return v
		}
	}
}