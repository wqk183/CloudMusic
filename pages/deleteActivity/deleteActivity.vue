<template>
	<view class="deleteActivity">
		<uni-nav-bar
			status-bar="true" 
			fixed="true"
			left-icon="back" 
			background-color="#F8F8F8"
			left-text="返回" 
			title="个人动态管理"
			@clickLeft="backUpPage"
			>
		</uni-nav-bar>
		<view class="deleteActivity-main">
			<view class="deleteActivity-list" v-for="(item,index) in activityList" :key="index">
				<view class="title">
					<view class="center">{{item.title}}</view>
					<view class="iconfont icon-shanchu" id="shanchu" @click="deleteActivity(item)"></view>
				</view>
				<image class="bottom" :src="item.content"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				activityList:[],
				userid:''
			}
		},
		onLoad(option) {
			this.userid=option.userid
			console.log("---myLove--->",this.userid)
			this.getActivity()
		},
		methods:{
			//返回上一层
			backUpPage(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			},
			//删除动态
			deleteActivity(data){
				uni.request({
					url:this.$baseURL+'/deleteActivity?_id='+data._id,
					method:'DELETE',
					success: (res) => {
						console.log("----删除动态----->",res)
						uni.request({
							url:this.$baseURL+'/deleteComment?_id='+data._id,
							method:'DELETE',
							success: (res) => {
								console.log("----删除相关评论----->",res)
							}
						})
						this.getActivity()
					}
				})
			},
			//获取个人动态
			getActivity(){
				console.log("---myLoves--->",this.userid)
				uni.request({
					url:this.$baseURL+'/activityforId?userid='+this.userid,
					success: (res) => {
						this.activityList=res.data
						console.log("----获取个人动态----->",res)
					}
					
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './deleteActivity.scss'
</style>
