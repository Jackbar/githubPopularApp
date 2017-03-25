/**
 * Created by liuhuang808 on 17/3/18.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableHighlight,
	TouchableOpacity,
	Alert
} from 'react-native'
import SortableListView from 'react-native-sortable-listview'
import NavigationBar from '../../common/NavigationBar'
import LanguageDao,{FLAG_LANGUAGE}from '../../expand/dao/LanguageDao'
import ArrayUtils from '../../util/ArrayUtils'
import ViewUtils from '../../util/ViewUtils'
export default class SortKeyPage extends Component {
	constructor(props){
		super(props);
		this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
		this.dataArray=[];
		this.sortResultArray=[];
		this.originalCheckedArray=[];
		this.state={
			checkedArray:[]
		}
	}
	componentDidMount(){
		this.getLanguage()
	}
	getLanguage(){
		this.languageDao.fetch()
			.then(res=>{
				this.dataArray = res;
				this.getCheckedItems(res)
			})
	}
	getCheckedItems(array){
		let checkedArray =  array.filter(item=>{
			return item.checked
		})
		this.setState({
			checkedArray:checkedArray
		})
		this.originalCheckedArray = ArrayUtils.clone(checkedArray);
	}
	onBack(){
		if(ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkedArray)){
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
	onSave(){
		if(ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkedArray)){
			this.porps.navigator.pop()
			return
		}
		this.getSortResult();
		this.languageDao.save(this.sortResultArray)
		this.props.navigator.pop()
	}
	getSortResult(){
		this.sortResultArray = ArrayUtils.clone(this.dataArray);
		for(let i=0;i<this.originalCheckedArray.length;i++){
			let item = this.originalCheckedArray[i];
			let index = this.dataArray.indexOf(item);
			this.sortResultArray.splice(index,1,this.state.checkedArray[i])
		}
	}
	render() {
		let rightButton =
			<TouchableOpacity
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
			  leftButton={ViewUtils.getLeftButton(()=>{this.onBack()})}
			  rightButton={rightButton}
			></NavigationBar>
			<SortableListView
				style={{flex: 1}}
				data={this.state.checkedArray}
				order={Object.keys(this.state.checkedArray)}
				onRowMoved={e => {
					this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
					this.forceUpdate();
				}}
				renderRow={row => <SortCell data={row} />}
			/>
		</View>
	}
}
class SortCell extends Component {
	render(){
		return (
			<TouchableHighlight
				underlayColor={'#eee'}
				delayLongPress={500}
				style={{padding: 10, backgroundColor: "#F8F8F8", borderBottomWidth:1, borderColor: '#eee'}}
				{...this.props.sortHandlers}
			>
				<View style={{flexDirection:'row',alignItems:'center'}}>
					<Image style={{width:14,height:14,tintColor:'#2196f3',marginRight:10}} source={require('./img/ic_sort.png')}></Image>
					<Text>{this.props.data.name}</Text>
				</View>

			</TouchableHighlight>
		)
	}
}
const styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#fff'
	},
	save:{
		padding:8,
		color:'#fff'
	},
})