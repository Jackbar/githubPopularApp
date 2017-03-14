/**
 * Created by liuhuang808 on 17/3/14.
 */
import React,{ Component } from 'react';
import  {
	View,
	Text,
	StyleSheet
} from 'react-native';

export default class Girl extends Component {
	constructor(props){
		super(props)
		this.state = {
			gift:''
		}
	}
	render(){
		return (
			<View style={styles.container}>
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
		backgroundColor:'pink',
		justifyContent:'center'
	},
	text:{
		fontSize:20
	}
})