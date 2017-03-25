/**
 * Created by liuhuang808 on 17/3/18.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image,
	Alert
} from 'react-native'
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import NavigationBar from '../../common/NavigationBar'
import CheckBox from 'react-native-check-box'
import ViewUtils from '../../util/ViewUtils'
import ArrayUtils from '../../util/ArrayUtils'
export default class CustomKeyPage extends Component {
	constructor(props){
		super(props)
		this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
		this.changeValue=[]
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
		if(this.changeValue.length===0){
			this.props.navigator.pop()
			return
		}
		this.languageDao.save(this.state.dataArray)
		this.props.navigator.pop()

	}
	onBack(){
		if(this.changeValue.length==0){
			this.props.navigator.pop()
			return
		}
		Alert.alert(
			'提示',
			'要保存修改吗?',
			[
				{text:'不保存',onPress:()=>{this.props.navigator.pop()},styles:'cancel'},
				{text:'保存',onPress:()=>{this.onSave()}}
			]
		)
	}
	renderView(){
		if(!this.state.dataArray || this.state.dataArray.length===0) return null
		len=this.state.dataArray.length
		let view=[]
		for(let i=0,l=Math.ceil(len/2),j=0;i<l;i++,j+=2){
			view.push(
				<View key={i}>
					<View style={styles.row}>
						{this.renderCheckBox(this.state.dataArray[j])}
						{j+1<len?this.renderCheckBox(this.state.dataArray[j+1]):null}

						{/*<Text>{this.state.dataArray[j].name}</Text>*/}
						{/*{j+1<len?<Text>{this.state.dataArray[j+1].name}</Text>:null}*/}
					</View>
					<View style={styles.borderLine}></View>
				</View>
			)
		}
		return view
		// return <Text style={{height:400,width:400}}>{JSON.stringify(this.state.dataArray)}</Text>

	}
	renderCheckBox(data){
		let leftText = data.name
		return (
			<CheckBox
				style={{flex:1,padding:10}}
				onClick={()=>{this.onClick(data)}}
			  leftText={leftText}
			  isChecked={data.checked}
			  checkedImage={<Image style={{tintColor:'#2196f3'}} source={require('./img/ic_check_box.png')}></Image>}
			  unCheckedImage={<Image style={{tintColor:'#2196f3'}} source={require('./img/ic_check_box_outline_blank.png')}></Image>}
			></CheckBox>
		)
	}
	onClick(data){
		data.checked=!data.checked;
		ArrayUtils.updateArray(this.changeValue,data)
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
			  	this.onBack()
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
	},
	row:{
		flexDirection:'row',
	},
	borderLine:{
		height:0.5,
		backgroundColor:'#ddd'
	}
})