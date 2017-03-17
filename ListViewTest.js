/**
 * Created by liuhuang808 on 17/3/16.
 */
import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	ListView,
	TouchableOpacity,
	RefreshControl
} from 'react-native'
import Toast,{DURATION} from 'react-native-easy-toast'
import NavigationBar from './NavigationBar'
import HttpUtils from './HttpUtils'
var data={garageList:[{garageName:'jj',contactMobile:'133'}]}
export default class ListViewTest extends Component {
	constructor(props){
		super(props)
		const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
		this.state={
			dataSource:ds.cloneWithRows(data.garageList),
			isLoading:true,
			list:[1,2]
		}
		this.getData()
	}
	renderRow(item){
		return <View style={styles.row}>
			<TouchableOpacity
				onPress={()=>{
					this.toast.show(item.garageName,DURATION.LENGTH_LONG)
				}}
			>
				{/*<Image style={{width:100,height:100}} source={{uri:item.photoThumbUrl}}></Image>*/}
				<Text style={styles.text}>{item.garageName}</Text>
				<Text>{item.contactMobile}</Text>
			</TouchableOpacity>
		</View>
	}
	renderSeparator(sectionID, rowID, adjacentRowHighlighted){
		return <View key={rowID} style={styles.line}></View>
	}
	renderFooter(){
		return <View><Text>加载中...</Text></View>
	}
	getData(){
		// setTimeout(()=>{
		// 	this.setState({
		// 		isLoading:false
		// 	})
		// },2000)
		console.log(111)
		HttpUtils.get('http://rap.taobao.org/mockjsdata/11793/test')
			.then(res=>{
				console.log(res)
				this.setState({
					isLoading:false,
					list:res.garageList
				})
			})
			.catch(error=>{
				console.log(error)
			})
	}
	render (){
		return(
			<View style={styles.container}>
				<NavigationBar
					title='ListView'
				></NavigationBar>

				<ListView
					dataSource={this.state.dataSource}
				  renderRow={(item)=>this.renderRow(item)}
				  renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
					renderFooter={()=>this.renderFooter()}
					refreshControl={<RefreshControl
						refreshing={this.state.isLoading}
					  onRefresh={()=>this.getData()}
					/>}
				/>

				<Toast ref={toast=>{this.toast=toast}}/>
			</View>
		)
	}
}
const styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#fff'
	},
	row:{
		height:100,
		marginTop:20,
		// flexDirection:'row'
	},
	text:{
		fontSize:20
	},
	line:{
		height:1,
		backgroundColor:'#e2e4e6'
	}
})