/**
 * Created by liuhuang808 on 17/3/18.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity
} from 'react-native'
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../util/ViewUtils'
export default class CustomKeyPage extends Component {
	constructor(props){
		super(props)
		this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
		this.state={
			dataArray:[]
		}
	}
	componentDidMount(){
		this.loadData()
	}
	loadData(){
		this.languageDao.fetch()
			.then(result=>{
				this.setState({
					dataArray:result
				})
			})
			.catch(error=>{
				console.log(error)
			})
	}
	onSave(){
		this.props.navigator.pop()
	}
	renderView(){
		return <Text style={{height:400,width:400}}>{JSON.stringify(this.state.dataArray)}</Text>

	}
	render() {
		let RightButton = <TouchableOpacity
				onPress={()=>{
					this.onSave()
				}}
			>
				<View>
					<Text style={styles.save}>保存</Text>
				</View>
			</TouchableOpacity>
		return <View style={styles.container}>
			<NavigationBar
				title={'自定义标签'}
			  leftButton={ViewUtils.getLeftButton(()=>{
			  	this.onSave()
			  })}
			  rightButton={RightButton}
			></NavigationBar>
			<ScrollView>
				{this.renderView()}
			</ScrollView>
		</View>
	}
}
const styles=StyleSheet.create({
	container:{
		flex:1
	},
	save:{
		padding:8,
		color:'#fff'
	}
})