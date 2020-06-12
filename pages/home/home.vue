<template>
	<view class="my">
		<uni-nav-bar
			status-bar="true" 
			fixed="true"
			background-color="#F8F8F8" 
			title="个人中心"
			@clickLeft="backUpPage"
			>
		</uni-nav-bar>
		<view class="myTop-img">
			<image class="myTop-img-context" src="../../static/img/songBackImg1.png"></image>
		</view>
		<view class="my-id">
			<view class="id">
				<image class="img" :src="userInfor.img"></image>
			</view>
			<view class="name">{{userInfor.name}}</view>
		</view>
		<view class="my-mian">
			<view class="my-content" @click="toUpdateInfor">
				<view class="left">
					<view class="iconfont icon-xinxiguanli"></view>
					<view class="title">个人信息管理</view>
				</view>
				<view class="right">></view>
			</view>
			<view class="my-content">
				<view class="left">
					<view class="iconfont icon-dongtaiguanli"></view>
					<view class="title">个人动态管理</view>
				</view>
				<view class="right">></view>
			</view>
			<view class="my-content">
				<view class="left">
					<view class="iconfont icon-xihuan" ></view>
					<view class="title">我的喜欢</view>
				</view>
				<view class="right">></view>
			</view>
			<view class="my-content">
				<view class="left">
					<view class="iconfont icon-xiazai" ></view>
					<view class="title">我的下载</view>
				</view>
				<view class="right">></view>
			</view>
			<button  @click="loginOut">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfor:'',
			}
		},
		onLoad(option) {
			this.userInfor=JSON.parse(decodeURIComponent(option.data))
		},
		methods: {
			//去个人信息管理页
			toUpdateInfor(){
				uni.redirectTo({
					url:'../updateInfor/updateInfor?data='+encodeURIComponent(JSON.stringify(this.userInfor))
				})
			},
			//退出登录
			loginOut(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style lang="scss">
   @import './home.scss'
</style>
