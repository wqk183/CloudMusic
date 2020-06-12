<template>
	<view class="activity">
		<view class="main">
			<view class="list" v-for="(item,index) in activityList" :key="index">
				<view class="top">
					<image class="img" :src="item.userimg"></image>
					<view class="name">{{item.username}}</view>
				</view>
				<view class="center">{{item.title}}</view>
				<image class="bottom" :src="item.content"></image>
				<view class="iconfont icon-pinglun" id="pinglun" @click="toComment(item)"></view>
			</view>
		</view>
		<view class="display" @click="toActivityDetail">
			<view class="iconfont icon-fabu" id="fabu" ></view>
		</view>
	</view>
</template>

<script>
	import {getUserInfor} from "../../util/index.js"
	export default{
		data(){
			return{
				activityList:[],
				userInfor:''
			}
		},
		onShow(){
			getUserInfor(this)
			console.log("----onShow---->")
		},
		created() {
			this.getActivity()
			console.log("----created---->")
		},
		methods:{
			//去评论区
			toComment(data){
				console.log("-----userInfor---->",this.userInfor)
				if(this.userInfor){
					uni.reLaunch({
						url:'../comment/comment?data='+encodeURIComponent(JSON.stringify(data))
					})
				}else{
					uni.showToast({
					    title: '请先进行登录',
						icon:'none',
					    duration: 2000
					});
				}
			},
			//去发布动态页
			toActivityDetail(){
				if(this.userInfor){
					uni.reLaunch({
						url:'../activityDetail/activityDetail'
					})
				}else{
					uni.showToast({
					    title: '请先进行登录',
						icon:'none',
					    duration: 2000
					});
				}
			},
			//获取动态
			getActivity(){
				uni.request({
					url:this.$baseURL+'/activity',
					success: (res) => {
						this.activityList=res.data
						console.log("----获取动态----->",res)
					}
					
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './activity.scss'
</style>
