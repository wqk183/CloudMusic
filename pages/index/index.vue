<template>
	<view class="login">
		<view v-if="!isShow">
			<van-field 
			required 
			:value="name"
			label="用户名" 
			placeholder="请输入用户名"  
			v-on:blur="getName"/>
			<van-field 
			label="密码" 
			:value="psd"
			placeholder="请输入密码" 
			required  
			v-on:input="getPsd"/>
			<button type="primary" @click="login">登录</button>
			<view class="tips">还没账号？点击<span class="register" @click="toRegisterPage">注册</span></view>
		</view>
		<view class="my" v-if="isShow">
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
				<view class="my-content" @click="toDeleteActivity">
					<view class="left">
						<view class="iconfont icon-dongtaiguanli"></view>
						<view class="title">个人动态管理</view>
					</view>
					<view class="right">></view>
				</view>
				<view class="my-content" @click="toMyLove">
					<view class="left">
						<view class="iconfont icon-xihuan" ></view>
						<view class="title">我的喜欢</view>
					</view>
					<view class="right">></view>
				</view>
				<view class="my-content" @click="toMyDownload">
					<view class="left">
						<view class="iconfont icon-xiazai" ></view>
						<view class="title">我的下载</view>
					</view>
					<view class="right">></view>
				</view>
				<button  @click="loginOut">退出登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	import {setUserInfor,getUserInfor,removeUserInfor,removeId,getId,getIsShow,setIsShow,removeIsShow} from "../../util/index.js";
	export default {
		data() {
			return {
				name:'',
				psd:'',
				checkPsd:'',
				isShow:false,
				userInfor:'',
				infor:''
			}
		},
		created() {
			getIsShow(this)
			getUserInfor(this)
		},
		onShow(){
			this.getUInfor()
		},
		methods: {
			...mapActions([
			            'handleLogin',
						'handleLoginOut'
			        ]),
			//去个人动态管理
			toDeleteActivity(){
				uni.reLaunch({
					url:'../deleteActivity/deleteActivity?userid='+this.userInfor._id
				})
			},
			//去个人信息修改
			toUpdateInfor(){
				uni.reLaunch({
					url:'../updateInfor/updateInfor?data='+encodeURIComponent(JSON.stringify(this.userInfor))
				})
			},
			//去我的喜欢
			toMyLove(){
				uni.reLaunch({
					url:'../myLove/myLove?userid='+this.userInfor._id
				})
			},
			//去我的下载
			toMyDownload(){
				uni.reLaunch({
					url:'../myDownload/myDownload?userid='+this.userInfor._id
				})
			},
			//去注册页
			toRegisterPage(){
				uni.reLaunch({
					url:'../register/register'
				})
			},
			//获取个人信息
			getUInfor(){
				uni.request({
					url: this.$baseURL+'/userInfor?_id='+this.userInfor._id,
					success: (res) => {
						this.userInfor=res.data[0]
					}
				})
			},
			getName(e){
				this.name=e.detail.value
			},
			getPsd(e){
				this.psd=e.detail
			},
			//登录
			login(){
				var name=this.name
				var psd=this.psd
				console.log("--123-->",this.name,this.psd)
				this.handleLogin({name,psd}).then(res=>{
					if(res[1].data.length>0){
						this.checkPsd=res[1].data[0].psd
						this.userInfor=res[1].data[0]
						if(this.psd==this.checkPsd){
							setIsShow(true)
							getIsShow(this)
							setUserInfor(this.userInfor)
							this.name=''
							this.psd=''
						}else{
							uni.showToast({
							    title: '密码有误',
								icon:'none',
							    duration: 2000
							});
							this.psd=''
						}
					}else{
						uni.showToast({
						    title: '信息填写有误',
							icon:'none',
						    duration: 2000
						});
						this.name=''
						this.psd=''
					}
				})
			},
			//退出登录
			loginOut(){
				setIsShow(false)
				getIsShow(this)
				setUserInfor('')
				getUserInfor(this)
			}
		}
	}
</script>

<style lang="scss">
   @import './index.scss'
</style>
