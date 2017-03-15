/**
 * Created by liuhuang808 on 17/3/14.
 */
import React,{ Component } from 'react';
import  {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet
} from 'react-native';
import NavigationBar from './NavigationBar'
export default class Girl extends Component {
	constructor(props){
		super(props)
		this.state = {
			gift:''
		}
	}
	renderButton(image){
		return <TouchableOpacity
			onPress={()=>{
				this.props.navigator.pop()
			}}
		>
			<Image style={{width:22,height:22,margin:5}} source={image}></Image>
		</TouchableOpacity>
	}
	render(){
		return (
			<View style={styles.container}>
				<NavigationBar
					title='Girl'
				  style={{
				  	backgroundColor:'#ee6363'
				  }}
				  leftButton={
					  this.renderButton(require('./res/images/ic_arrow_back_white_36pt.png'))
				  }
				  rightButton={
				  	this.renderButton(require('./res/images/ic_star.png'))
				  }
					statusBar={{
						backgroundColor:'#ee6363',
						barStyle:'light-content',
					}}
				></NavigationBar>
				<Text style={styles.text}>I am Gril</Text>
				<Text style={styles.text}>{this.props.gift}</Text>
				<Text style={styles.text}
					onPress={()=>{
						this.props.callback('巧克力');
						this.props.navigator.pop()
					}}
				>回赠巧克力</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'white',
	},
	text:{
		fontSize:20
	}
})