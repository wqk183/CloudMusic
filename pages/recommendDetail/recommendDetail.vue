<template>
	<view class="recommendDetail">
		<song-detail v-if="isShow" @toSongDetail="toSongDetail"></song-detail>
		<view v-if="!isShow">
			<uni-nav-bar
				status-bar="true" 
				fixed="true"
				left-icon="back" 
				background-color="#F8F8F8"
				left-text="返回" 
				title="推荐歌单"
				@clickLeft="backUpPage"
				>
			</uni-nav-bar>
			<view class="recommendDetail-titleImg">
				<image class="img" :src="recommendDetailData.dir_pic_url2"></image>
			</view>
			<view class="recommendDetail-content">
				<view class="recommendDetail-content-desc" >
					<view class="title">
						<image class="img" :src="recommendDetailData.headurl"></image>
						<view>{{recommendDetailData.nickname}}</view>
					</view>
					<view class="context">{{recommendDetailData.desc}}</view>
					<view style="clear: both;"></view>
				</view>
				<!-- temp -->
				<view class="temp">
					<view class="title">
						<image class="img" :src="recommendDetailData.headurl"></image>
						<view>{{recommendDetailData.nickname}}</view>
					</view>
					<view class="context">{{recommendDetailData.desc}}</view>
					<view style="clear: both;"></view>
				</view>
				
				<view class="recommendDetail-content-list">
					<view class="recommendDetail-content-list-main" v-for="(item,index) in recommendDetailData.songlist" :key="index">
						<view class="left" :style="[rowIndex==index ? bingCss:'']" @click="playMusic(item,index)">
							<view class="left">{{index+1}}</view>
							<view class="center">
								<view class="title">{{item.songname}}</view>
								<view class="author"  :style="[rowIndex==index ? bingCss:'']">{{item.singer[0].name}}</view>
							</view>
						</view>
						<view class="right">
							<view class="iconfont icon-shoucang" id="shoucang"></view>
							<view class="iconfont icon-iconfontzhizuobiaozhun023146" id="xiazai"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="playDiv" @click="showPage">
				<luch-audio :src="audioSrc" :poster="picUrl" autoplay="true" :play.sync="audioPlay" :author="audioData.singer[0].name" :name="audioData.songname" ></luch-audio>
			</view>
		</view>
	</view>
</template>

<script>
	import songDetail from '../../components/song-detail/song-detail.vue'
	import luchAudio from '../../components/luch-audio/luch-audio.vue'
	export default{
		data(){
			return{
				upPage:'',
				tid:'',
				recommendDetailData:[],
				bingCss:{
					color:'#1afa29'
				},
				rowIndex:-1,
				audioPlay:true,
				audioData:'',
				audioSrc:'',
				picUrl:'',
				isShow:false
			}
		},
		components: {
			luchAudio,songDetail
		},
		onLoad(option) {
			this.upPage=option.upPage
			this.tid=option.tid
			console.log("====this.tid====>",this.tid)
		},
		mounted() {
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
				if(this.upPage==0){
					uni.switchTab({
					    url: '/pages/musicHall/music_hall'
					});
				}else if(this.upPage==1){
					uni.redirectTo({
					    url: '/pages/recommendMore/recommendMore'
					});
				}
			},
			//获取推荐歌单详细信息
			getRecommendDetailData(){
				uni.request({
					url:'https://api.qq.jsososo.com/songlist?id='+this.tid,
					success: (res) => {
						console.log("------获取推荐歌单详细信息----->",res)
						this.recommendDetailData=res.data.data
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
						console.log("----音乐封面----->",res)
						this.picUrl=res.data.data[0].imgurl
					}
				})
				uni.request({
					url:'https://api.qq.jsososo.com/song/urls?id='+songmid,
					success: (res) => {
						console.log("----播放音乐----->",res)
						this.audioSrc=res.data.data[songmid]
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './recommendDetail.scss'
</style>
