/**
 * Created by liuhuang808 on 17/3/18.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
} from 'react-native'
import HomePage from './HomePage'
import NavigationBar from '../common/NavigationBar'
export default class WelcomePage extends Component {
	componentDidMount() {
		this.timer = setTimeout(() => {
			this.props.navigator.resetTo({
				component: HomePage
			})
		}, 2000)
	}

	componentWillUnmount() {
		this.timer && clearTimeout(this.timer)
	}

	render() {
		return <View>
			<NavigationBar
				title={'欢迎'}
			></NavigationBar>
			<Text>欢迎页</Text>
		</View>
	}
}