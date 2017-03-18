/**
 * Created by liuhuang808 on 17/3/18.
 */
export default class DataRepository {
	fetchNetRepository(url){
		return new Promise((resolve,reject)=>{
			fetch(url)
				.then(response=>response.json())
				.then(res=>{
					resolve(res)
				})
				.catch(error=>{
					reject(error)
				})
		})
	}
}