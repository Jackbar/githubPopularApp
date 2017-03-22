/**
 * Created by liuhuang808 on 17/3/18.
 */

import React, {Component} from 'react';
import {
	StyleSheet,
	Image,
	View,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage'
import MyPage from './my/MyPage'
export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'tb_popular'
		}
	}
	render() {
		return (
			<View style={styles.container}>
				<TabNavigator tabBarStyle={{opacity:0.97}}>
					<TabNavigator.Item
						selected={this.state.selectedTab === 'tb_popular'}
						selectedTitleStyle={{color: '#2196f3'}}
						title="最热"
						renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')}/>}
						renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196f3'}]}
						                                 source={require('../../res/images/ic_polular.png')}/>}
						// badgeText="1"
						onPress={() => this.setState({selectedTab: 'tb_popular'})}>
						<PopularPage></PopularPage>
					</TabNavigator.Item>
					<TabNavigator.Item
						selected={this.state.selectedTab === 'tb_trending'}
						title="趋势"
						selectedTitleStyle={{color: 'yellow'}}
						renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')}/>}
						renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'yellow'}]}
						                                 source={require('../../res/images/ic_trending.png')}/>}
						onPress={() => this.setState({selectedTab: 'tb_trending'})}>
						<View style={styles.page2}></View>
					</TabNavigator.Item>
					<TabNavigator.Item
						selected={this.state.selectedTab === 'tb_favorite'}
						selectedTitleStyle={{color: 'red'}}
						title="收藏"
						renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')}/>}
						renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'red'}]}
						                                 source={require('../../res/images/ic_polular.png')}/>}
						badgeText="1"
						onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
						<View style={styles.page1}></View>
					</TabNavigator.Item>
					<TabNavigator.Item
						selected={this.state.selectedTab === 'tb_my'}
						title="我的"
						selectedTitleStyle={{color: 'yellow'}}
						renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')}/>}
						renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'yellow'}]}
						                                 source={require('../../res/images/ic_trending.png')}/>}
						onPress={() => this.setState({selectedTab: 'tb_my'})}>
						<MyPage {...this.props}></MyPage>
					</TabNavigator.Item>
				</TabNavigator>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
	page1: {
		flex: 1,
		backgroundColor: 'pink'
	},
	page2: {
		flex: 1,
		backgroundColor: 'yellow'
	},
	image: {
		height: 22,
		width: 22
	}
});

