/**
 *
 */
export default class ArrayUtils {
	static updateArray(array, item) {
		for (let i = 0; i < array.length; i++) {
			if (item === array[i]) {
				array.splice(i, 1)
				return
			}
		}
		array.push(item)
	}

	static clone(from) {
		let newArray = []
		if (!from) return []
		for (let i = 0; i < from.length; i++) {
			newArray[i] = from[i]
		}
		return newArray
	}

	static isEqual(arr1, arr2) {
		if (!(arr1 && arr2)) return false
		if(arr1.length!==arr2.length) return false
		for(let i=0;i<arr2.length;i++){
			if(arr1[i]!==arr2[i]) return false
		}
		return true
	}
}

