<template>
	<view class="recommendDetail">
		<song-detail v-if="isShow" 
					@toSongDetail="toSongDetail" 
					:currentLyric="currentLyric" 
					:windowHeight="windowHeight">
		</song-detail>
		<view v-if="!isShow">
			<uni-nav-bar
				status-bar="true" 
				fixed="true"
				left-icon="back" 
				background-color="#F8F8F8"
				left-text="返回" 
				title="推荐中心"
				@clickLeft="backUpPage"
				>
			</uni-nav-bar>
			<view class="recommendDetail-titleImg">
				<image class="img" :src="recommendHeaderDetailData.cover"></image>
			</view>
			<view class="recommendDetail-content">
				<view class="recommendDetail-content-desc" >
					<view class="title">
						<image class="img" src="http://y.gtimg.cn/music/common/upload/t_celebrity_certification/1579030.png"></image>
						<view>CloudMusic个性推荐歌单</view>
					</view>
					<view class="context">{{recommendHeaderDetailData.desc}}</view>
					<view style="clear: both;"></view>
				</view>
				<!-- temp -->
				<view class="temp">
					<view class="title">
						<image class="img" src="http://y.gtimg.cn/music/common/upload/t_celebrity_certification/1579030.png"></image>
						<view>CloudMusic个性推荐歌单</view>
					</view>
					<view class="context">{{recommendHeaderDetailData.desc}}</view>
					<view style="clear: both;"></view>
				</view>
				
				<view class="recommendDetail-content-list">
					<view class="recommendDetail-content-list-main" v-for="(item,index) in recommendDetailData" :key="index">
						<view class="left" :style="[rowIndex==index ? bindCss:'']" @click="playMusic(item,index)">
							<view class="left">{{index+1}}</view>
							<view class="center">
								<view class="title">{{item.songname}}</view>
								<view class="author"  :style="[rowIndex==index ? bindCss:'']">{{item.name}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="playDiv">
				<luch-audio 
					:src="audioSrc"
					:poster="picUrl" 
					autoplay="true" 
					:play.sync="audioPlay" 
					:author="audioData.name" 
					:name="audioData.songname" >
				</luch-audio>
			</view>
		</view>
	</view>
</template>

<script>
	//import Lyric from 'lyric-parser'
	import songDetail from '../../components/song-detail/song-detail.vue'
	import luchAudio from '../../components/luch-audio/luch-audio.vue'
	import {getUserInfor} from "../../util/index.js";
	export default{
		data(){
			return{
				userInfor:'',
				loveIndex:-1,
				downLoadIndex:-1,
				tid:'',
				recommendHeaderDetailData:'',
				recommendDetailData:[],
				bindCss:{
					color:'#4fc08d'
				},
				rowIndex:-1,
				audioPlay:false,
				audioData:{},
				audioSrc:'',
				picUrl:'',
				isShow:false,
				currentLyric:{},
				windowHeight:'',
				list:[]
			}
		},
		components: {
			luchAudio,songDetail
		},
		created(){
			getUserInfor(this)
			uni.getSystemInfo({
			  success: (res) => {
				  this.windowHeight=res.windowHeight+'px'
			  }
			})
		},
		onLoad(option) {
			this.recommendHeaderDetailData=JSON.parse(decodeURIComponent(option.data))
			this.getRecommendDetailData()
		},
		methods:{
			//显示播放页
			showPage(){
				this.isShow=true
			},
			toSongDetail(state){
				this.isShow=state
			},
			//返回上一层
			backUpPage(){
				uni.switchTab({
				    url: '/pages/recommend/recommend'
				});
			},
			//获取推荐歌单详细信息
			getRecommendDetailData(){
				console.log("-----tid----->",this.recommendHeaderDetailData.content_id)
				uni.request({
					url:this.$baseURL+'/recommendList?disstid='+this.recommendHeaderDetailData.content_id,
					success: (res) => {
						console.log("------获取推荐歌单详细信息----->",res)
						this.recommendDetailData=res.data[0].songlist
						this.audioData=this.recommendDetailData[0]
						uni.request({
							url:'https://api.qq.jsososo.com/song/playlist?id='+this.audioData.songid,
							success: (res) => {
								console.log("------获取第一首信息img----->",res)
								if(res.data.result!=400){
									this.picUrl=res.data.data[0].imgurl
								}
							}
						})
						uni.request({
							url:'https://api.qq.jsososo.com/song/urls?id='+this.audioData.songmid,
							success: (res) => {
								console.log("------获取第一首信息src----->",res)
								this.audioSrc=res.data.data[this.audioData.songmid]
								if(res.data.result!=400){
									this.audioSrc=res.data.data[this.audioData.songmid]
								}
							}
						})
					}
				})
			},
			//播放音乐
			playMusic(data,index){
				
				this.rowIndex=index
				this.audioData=data
				let songmid=data.songmid
				let songid=data.songid
				this.audioPlay=false
				uni.request({
					url:'https://api.qq.jsososo.com/song/playlist?id='+songid,
					success: (res) => {
						console.log("----播放音乐picUrl----->",res)
						if(res.data.result!=400){
							this.picUrl=res.data.data[0].imgurl
						}
					}
				})
				uni.request({
					url:'https://api.qq.jsososo.com/song/urls?id='+songmid,
					success: (res) => {
						console.log("----播放音乐audioSrc----->",res)
						if(res.data.result!=400){
							this.audioSrc=res.data.data[this.audioData.songmid]
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './recommendListDetail.scss'
</style>
