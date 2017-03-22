/**
 * Created by liuhuang808 on 17/3/22.
 */
import React, {Component} from 'react';
import {
	Image,
	TouchableOpacity,
	StyleSheet
} from 'react-native'

export default class ViewUtils {
	static getLeftButton(callback){
		return (
			<TouchableOpacity
				style={styles.container}
				onPress={callback}
			>
				<Image style={styles.back} source={require('../../res/images/ic_arrow_back_white_36pt@2x.png')}></Image>
			</TouchableOpacity>
		)
	}
}
const styles = StyleSheet.create({
	container:{
		padding:8
	},
	back:{
		width:22,
		height:22
	}
})