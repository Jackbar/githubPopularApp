/**
 * Created by liuhuang808 on 17/3/18.
 */
import React, {Component} from 'react';
import {
	Navigator
} from 'react-native'
import WelcomePage from './WelcomePage'
function setup() {
	//进行一些初始化

	class Root extends Component {
		renderScene(router, navigator) {
			let Component = router.component
			return <Component {...router.params} navigator={navigator}></Component>
		}

		render() {
			return <Navigator
				initialRoute={{component: WelcomePage}}
				renderScene={(router, navigator) => this.renderScene(router, navigator)}
			/>
		}
	}

	return <Root/>
}
export default setup