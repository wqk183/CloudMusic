<script>
	import {setIsShow,setUserInfor,removeIsShow,removeUserInfor} from "./util/index.js";
	export default {
		// globalData: {  
		//             userInfor: ''  
		//         }, 
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "/wxcomponents/vant/dist/common/index.wxss";
	/*每个页面公共css */
	@import "/static/iconfont/iconfont.css";
</style>
