/**
 * Created by liuhuang808 on 17/3/20.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity
} from 'react-native'

export default class RepositoryCell extends Component {
	render(){
		return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.cell_container}>
				<Text style={styles.name}>{this.props.data.full_name}</Text>
				<Text style={styles.description}>{this.props.data.description}</Text>
				<View style={styles.cellLine}>
					<View style={styles.cellLine}>
						<Text>Author:</Text>
						<Image style={styles.avatar} source={{uri:this.props.data.owner.avatar_url}}></Image>
					</View>
					<View style={styles.cellLine}>
						<Text>Stars:</Text>
						<Text>{this.props.data.stargazers_count}</Text>
					</View>
					<Image style={styles.avatar} source={require('../../res/images/ic_star.png')}/>
				</View>
			</View>
		</TouchableOpacity>

		)
	}
}
const styles = StyleSheet.create({
	container:{
		flex:1
	},
	cell_container:{
		backgroundColor:'white',
		padding:10,
		marginHorizontal:5,
		marginVertical:4,
		borderWidth:0.5,
		borderColor:'#ddd',
		shadowColor:'gray',
		shadowOffset:{width:0.5,height:0.5},
		shadowOpacity:0.4,
		shadowRadius:1,
		elevation:2//安卓阴影
	},
	cellLine:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between'
	},
	avatar:{
		width:22,
		height:22
	},
	name:{
		fontSize:16,
		marginBottom:2,
		color:'#212121'
	},
	description:{
		fontSize:14,
		marginBottom:2,
		color:'#757575'
	}
})