/**
 * Created by liuhuang808 on 17/3/17.
 */
export default class HttpUtils {
	static get(url){
		return new Promise((resolve,reject)=>{
			fetch(url)
				.then(response=>response.json())
				.then(res=>{
					resolve(res);
				})
				.catch(error=>{
					reject(error);
				})
		})
	}
	static post(url,obj){
		return new Promise((resolve,reject)=>{
			fetch(url,{
				method:'post',
				header:{
					'Accept':'application/json',
					'Content-Type':'application/json'
				},
				body:JSON.stringify(obj)
			})
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