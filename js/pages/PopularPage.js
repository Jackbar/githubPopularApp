/**
 * Created by liuhuang808 on 17/3/18.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	ListView,
	RefreshControl
} from 'react-native'
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NavigationBar from '../common/NavigationBar'
import DataRepository from '../expand/dao/DataRepository'
import RepositoryCell from '../common/RepositoryCell'
import LanguageDao ,{FLAG_LANGUAGE}from '../expand/dao/LanguageDao'
const URL='https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
export default class PopularPage extends Component {
	constructor(props){
		super(props)
		this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
		this.state={
			language:[]
		}
	}

	componentDidMount(){
		this.loadLanguage()
	}

	loadLanguage(){
		this.languageDao.fetch()
			.then(res=>{
				this.setState({
					language:res
				})
			})
			.catch(error=>{
				console.log(error)
			})
	}

	render() {
		let scrollContent =
			<ScrollableTabView
				renderTabBar={()=><ScrollableTabBar></ScrollableTabBar>}
				tabBarBackgroundColor="#2196f3"
				tabBarInactiveTextColor="mintcream"
				tabBarActiveTextColor="white"
				tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
			>
				{this.state.language.map((result,i,arr)=>{
					let lan = arr[i]
					return lan.checked?<PopularTab key={i} tabLabel={lan.name}></PopularTab>:null
				})}
			</ScrollableTabView>

		return <View style={styles.container}>
			<NavigationBar
				title={'最热'}
			  // statusBar={{backgroundColor:'#2196f3'}}
			></NavigationBar>
			{this.state.language.length>0?scrollContent:null}
		</View>
	}
}
class PopularTab extends Component {
	constructor(props){
		super(props)
		this.dataRepository = new DataRepository()

		this.state={
			result:'',
			dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
			isLoading:false
		}
	}
	componentDidMount(){
		this.loadData()
	}
	loadData(){
		this.setState({
			isLoading:true
		})
		let url = URL+this.props.tabLabel+QUERY_STR
		console.log(url)
		this.dataRepository.fetchNetRepository(url)
			.then(res=>{
				this.setState({
					isLoading:false,
					dataSource:this.state.dataSource.cloneWithRows(res.items)
				})
			})
			.catch(error=>{
				this.setState({
					result:JSON.stringify(error)
				})
			})
	}
	renderRow(data){
		return (
			<RepositoryCell data={data}></RepositoryCell>
		)
	}
	render(){
		return (
			<View style={styles.container}>
				<ListView
					dataSource={this.state.dataSource}
				  renderRow={(data)=>this.renderRow(data)}
				  refreshControl={
					  <RefreshControl
					    refreshing={this.state.isLoading}
					    onRefresh={()=>this.loadData()}
					    // colors={['#2196f3']}
					    // tintColor={'#2196f3'}
					    title={'加载中...'}
					    // titleColor={'#2196f3'}
					  ></RefreshControl>
				  }
				/>
			</View>
		)
	}
}
const styles=StyleSheet.create({
	container:{
		flex:1
	}
})