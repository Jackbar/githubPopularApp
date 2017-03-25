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
import NavigationBar from '../../common/NavigationBar'
import CustomKeyPage from './CustomKeyPage'
import SortKeyPage from './SortKeyPage'
export default class MyPage extends Component {
	constructor(props){
		super(props)
		this.state={
			result:''
		}
	}


	render() {
		return <View style={styles.container}>
			<NavigationBar
				title={'我的'}
			></NavigationBar>
			<Text
				onPress={()=>{
					this.props.navigator.push({
						component:CustomKeyPage,
						params:{...this.props}
					})
				}
				}
			>自定义标签</Text>
			<Text
				onPress={()=>{
					this.props.navigator.push({
						component:SortKeyPage,
						params:{...this.props}
					})
				}
				}
			>标签排序</Text>
		</View>
	}
}
const styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#fff'
	}
})