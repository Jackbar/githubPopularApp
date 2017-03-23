/**
 *
 */
export default class ArrayUtils {
	static updateArray(array,item){
		for(let i=0;i<array.length;i++){
			if(item===array[i]){
				array.splice(i,1)
				return
			}
		}
		array.push(item)
	}
}

