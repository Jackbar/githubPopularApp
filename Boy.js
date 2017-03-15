/**
 * Created by liuhuang808 on 17/3/14.
 */
import React,{ Component } from 'react';
import  {
	View,
	Text,
	StyleSheet
} from 'react-native';
import Girl from './Girl'
import NavigationBar from './NavigationBar'
export default class Boy extends Component {
	constructor(props){
		super(props);
		this.state = {
			gift:''
		}
	}
	render(){
		return (
			<View style={styles.container}>
				<NavigationBar
					title={'Boy'}
					style={{
						backgroundColor:'#0096ff'
					}}
					statusBar={{
						backgroundColor:'#0096ff',//安卓下才会生效
						barStyle:'light-content'
					}}
				/>
				<Text style={styles.text}>I am boy</Text>
				<Text style={styles.text}
					onPress={()=>{
						this.props.navigator.push({
							component:Girl,
							params:{
								gift:'一枝玫瑰',
								callback:(gift)=>{
									this.setState({
										gift:gift
									})
								}
							}
						})
					}}
				>送女孩一枝玫瑰</Text>
				<Text style={styles.text}>{this.state.gift}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#fff',
	},
	text:{
		fontSize:20,

	}
})