<template>
	<view class="recommend">
		<view class="in" v-if="userInfor">
			<view class="in-top">
				<view class="title">Hi {{userInfor.name}}, 今日为你打造</view>
				<view class="in-recommend-top">
					<scroll-view class="scroll-view_H" scroll-x="true">
						<view class="scroll-view_H_box" v-for="(item,index) in showRecommendList" :key="index" @click="toRecommendListDetail(item)">
							<view class="scroll-view-item_H uni-bg-red" >
								<image class="scroll-view-item_H-img" :src="item.cover"></image>
							</view>
							<view class="scroll-view-item_context" >{{item.title}}</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="in-other">
				<view class="title-other">符合你最近收听的音乐</view>
				<view class="in-recommend">
					<scroll-view class="scroll-view_H" scroll-x="true">
						<view class="scroll-view_H_box" v-for="(item,index) in showRecommendListOne" :key="index" @click="toRecommendListDetail(item)">
							<view class="scroll-view-item_H uni-bg-red" >
								<image class="scroll-view-item_H-img" :src="item.cover"></image>
							</view>
							<view class="scroll-view-item_context" >{{item.title}}</view>
						</view>
					</scroll-view>
				</view>
				<view class="title-other">更多为你推荐</view>
				<view class="list">
					<view class="item" v-for="(item,index) in moreRecommendListFirst" :key="index" @click="toDetail(item)">
						<view class="left">
							<image class="img" :src="item.cover_url_big"></image>
						</view>
						<view class="right">
							<view class="content">{{item.desc}}</view>
						</view>
					</view>
				</view>
				<view class="videoList">
					<view class="main" v-for="(item,index) in mvList" :key="index">
						<video class="videoList-video" :src="item.mvUrl" controls ></video>
						<view class="videoList-title">{{item.mvtitle}}</view>
						<view class="videoList-name">{{item.singername}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="out" v-if="!userInfor">
			<view class="top" @click="toLogin">
				<image class="img" src="../../static/img/top.jpg"></image>
			</view>
			<view class="recommend-content" @click="toLogin">
				<view class="top-con">告诉我们你的音乐偏好</view>
				<view class="next-con">获得专属推荐</view>
			</view>
			<view class="title">热门歌曲免费听</view>
			<view class="list">
				<view class="item" v-for="(item,index) in freeList" :key="index" @click="toDetail(item)">
					<view class="left">
						<image class="img" :src="item.cover_url_big"></image>
					</view>
					<view class="right">
						<view class="content">{{item.desc}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getUserInfor} from "../../util/index.js";
	export default{
		data(){
			return {
				userInfor:'',
				freeList:[],
				showRecommendList:[],
				showRecommendListOne:[],
				moreRecommendListFirst:[],
				mvList:[]
			}
		},
		onShow(){
			getUserInfor(this)
			console.log("----onShow------>",this.userInfor)
		},
		created(){
			getUserInfor(this)
			this.getRecommendData()
			this.getFreeList()
			//this.getNiceVideoData()
		},
		mounted() {
			this.getNiceVideoData()
		},
		watch: {
					userInfor(newValue, oldValue) {
						//console.log("---newValue--->",newValue)
						this.userInfor=newValue
					}
				},
		methods:{
			//获取视频数据
			getNiceVideoData(){
				uni.request({
					url:this.$baseURL+'/mv',
					success: (res) => {
						var tempList=[]
						for(var i=40;i<46;i++){
							tempList.push(res.data[i])
						}
						tempList.forEach(el=>{
							uni.request({
								url:this.$baseURL+'/mvdetail?vid='+el.vid,
								success: (res) => {
									// this.mvList.push({
									// 	//mvUrl:res.data[0].mvurl,
									// 	mvtitle:el.mvtitle,
									// 	singername:el.singername
									// })
									uni.request({
										url:'https://api.qq.jsososo.com/mv/url?id='+el.vid,  
										success: (res) => {
											//console.log("----test----->",res)
											this.mvList.push({
												mvUrl:res.data.data[el.vid][0],
												mvtitle:el.mvtitle,
												singername:el.singername
											})
										}
									})
								}
							})
						})
						console.log("----获取精选视频数据----->",this.mvList)
					}
					
				})
			},
			//去个性推荐歌单详细页面
			toRecommendListDetail(data){
				console.log("----去推荐歌单详细页面---->",data)
				uni.reLaunch({
					url:'../recommendListDetail/recommendListDetail?&data='+encodeURIComponent(JSON.stringify(data))
				})
			},
			//获取个人推荐list-top
			getRecommendData(){
				uni.request({
					url:this.$baseURL+'/recommend',
					success: (res) => {
						for(var i=0;i<6;i++){
							this.showRecommendList.push(res.data[i])
						}
						for(var i=6;i<12;i++){
							this.showRecommendListOne.push(res.data[i])
						}
						console.log("----获取推荐歌单数据----->",res)
					}
					
				})
			},
			//热门歌曲免费听
			getFreeList(){
				uni.request({
					url:this.$baseURL+'/playlist',
					success: (res) => {
						for(var i=10;i<20;i++){
							this.freeList.push(res.data[i])
						}
						for(var i=14;i<17;i++){
							this.moreRecommendListFirst.push(res.data[i])
						}
						console.log("----热门歌曲免费听----->",this.freeList)
					}
					
				})
			},
			//去官方歌单详细页面
			toDetail(data){
				//console.log("----去推荐歌单详细页面---->",data)
				uni.reLaunch({
					url:'../songListDetail/songListDetail?upPage=2&data='+encodeURIComponent(JSON.stringify(data))
				})
			},
			//去登录
			toLogin(){
				uni.showToast({
				    title: '请先进行登录噢',
					icon:'none',
				    duration: 2000
				});
			}
		}
	}
</script>

<style lang="scss">
	@import './recommend.scss'
</style>
