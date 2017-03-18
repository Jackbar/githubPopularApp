/**
 * Created by liuhuang808 on 17/3/18.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	TextInput
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import DataRepository from '../expand/dao/DataRepository'
const URL='https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
export default class PopularPage extends Component {
	constructor(props){
		super(props)
		this.dataRepository = new DataRepository()
		this.state={
			result:''
		}
	}
	onLoad(){

		let url = this.getUrl(this.text)
		console.log(url)
		this.dataRepository.fetchNetRepository(url)
			.then(res=>{
				console.log(res)
				this.setState({
					result:JSON.stringify(res)
				})
			})
			.catch(error=>{
				this.setState({
					result:JSON.stringify(error)
				})
			})
	}
	getUrl(key){
		return URL+key+QUERY_STR
	}

	render() {
		return <View>
			<NavigationBar
				title={'欢迎'}
			></NavigationBar>
			<Text
				onPress={()=>{
					this.onLoad()
				}
				}
			>获取数据</Text>
			<TextInput style={{height:20,borderWidth:1}}
				onChangeText={text=>this.text=text}
			></TextInput>
			<Text style={{height:800,fontSize:22,backgroundColor:'pink'}}>{this.state.result}</Text>
		</View>
	}
}