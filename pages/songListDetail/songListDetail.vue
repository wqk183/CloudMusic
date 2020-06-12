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
				title="官方歌单详情"
				@clickLeft="backUpPage"
				>
			</uni-nav-bar>
			<view class="recommendDetail-titleImg">
				<image class="img" :src="recommendHeaderDetailData.dir_pic_url2"></image>
			</view>
			<view class="recommendDetail-content">
				<view class="recommendDetail-content-desc" >
					<view class="title">
						<image class="img" src="http://y.gtimg.cn/music/common/upload/t_celebrity_certification/1579030.png"></image>
						<view>CloudMusic官方歌单</view>
					</view>
					<view class="context">{{recommendHeaderDetailData.desc}}</view>
					<view style="clear: both;"></view>
				</view>
				<!-- temp -->
				<view class="temp">
					<view class="title">
						<image class="img" src="http://y.gtimg.cn/music/common/upload/t_celebrity_certification/1579030.png"></image>
						<view>CloudMusic官方歌单</view>
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
						<view class="right">
							<view class="iconfont icon-shoucang" id="shoucang" v-show="loveIndex!=index" @click="saveSong(item,index)"></view>
							<view class="iconfont icon-lujing" id="shoucang" v-show="loveIndex==index"></view>
							<view class="iconfont icon-iconfontzhizuobiaozhun023146" id="xiazai" v-show="downLoadIndex!=index" @click="downloadSong(item,index)"></view>
							<view class="iconfont icon-xiazai1" id="xiazai" v-show="downLoadIndex==index"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="playDiv">
				<luch-audio 
					:src="audioData.audioSrc"
					:poster="audioData.picUrl" 
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
				upPage:'',
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
			this.upPage=option.upPage
			this.recommendHeaderDetailData=JSON.parse(decodeURIComponent(option.data))
			this.getRecommendDetailData()
		},
		methods:{
			//下载歌曲
			downloadSong(data,index){
				console.log("-----data------>",this.userInfor)
				if(this.userInfor){
					this.downLoadIndex=index
					uni.downloadFile({
					    url: data.audioSrc, //仅为示例，并非真实的资源
					    success: (res) => {
					        if (res.statusCode === 200) {
								console.log("-----下载------>",res.tempFilePath)
					            uni.request({
					            	url: this.$baseURL+'/download_add',
					            	method:'POST',
					            	data:{
					            		userid : this.userInfor._id,
					            		songmid : data.songmid,
										picUrl:data.picUrl,
										songname:data.songname,
										name:data.name,
										audioSrc:res.tempFilePath,
					            	},
					            	success: (res) => {
					            		console.log("-----下载歌曲------>",res)
										uni.showToast({
										    title: '下载成功',
										    duration: 500
										});
					            	}
					            })
					        }
					    }
					});
				}else{
					uni.showToast({
					    title: '请先进行登录',
						icon:'none',
					    duration: 500
					});
				}
			},
			//收藏歌曲
			saveSong(data,index){
				console.log("----收藏歌曲this.userInfor----->",this.userInfor)
				console.log("----收藏歌曲data----->",data)
				if(this.userInfor){
					this.loveIndex=index
					uni.request({
						url: this.$baseURL+'/love_add',
						method:'POST',
						data:{
							userid : this.userInfor._id,
							songid : data.songmid
						},
						success: (res) => {
							console.log("-----收藏歌曲------>",res)
							uni.showToast({
							    title: '收藏成功',
							    duration: 500
							});
						}
					})
				}else{
					uni.showToast({
					    title: '请先进行登录',
						icon:'none',
					    duration: 500
					});
				}
			},
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
					    url: '/pages/songListMore/songListMore'
					});
				}else if(this.upPage==2){
					uni.switchTab({
					    url: '/pages/recommend/recommend'
					});
				}
			},
			//获取推荐歌单详细信息
			getRecommendDetailData(){
				console.log("-----tid----->",this.recommendHeaderDetailData.tid)
				uni.request({
					url:this.$baseURL+'/songdetail?tid='+this.recommendHeaderDetailData.tid,
					success: (res) => {
						console.log("------获取推荐歌单详细信息----->",res)
						this.recommendDetailData=res.data
						this.audioData=this.recommendDetailData[0]
						//console.log("------获取推荐歌单详细信息this.audioData----->",this.audioData)
					}
				})
			},
			//播放音乐
			playMusic(data,index){
				this.rowIndex=index
				this.audioData=data
				let songmid=data.songmid
				let songid=data.songid/*  */
				this.audioPlay=false
				uni.request({
					url:this.$baseURL+'/songPicUrl?songid='+songid,
					success: (res) => {
						//console.log("----音乐封面----->",res)
						this.audioData.picUrl=res.data[0].picUrl
					}
				})
				// uni.request({
				// 	url:this.$baseURL+'/songAudioSrc?songmid='+songmid,
				// 	success: (res) => {
				// 		//console.log("----播放音乐----->",res)
				// 		this.audioData.audioSrc=res.data[0].audioSrc
				// 	}
				// })
				uni.request({
					url:'https://api.qq.jsososo.com/song/urls?id='+songmid,
					success: (res) => {
						console.log("----播放音乐----->",res)
						this.audioData.audioSrc=res.data.data[songmid]
					}
				})
				// uni.request({
				// 	url:'https://api.qq.jsososo.com/lyric?songmid='+songmid,
				// 	success: (res) => {
				// 		console.log("---歌词---->",res)
				// 		let lyric=res.data.data.lyric
				// 		this.currentLyric=new Lyric(lyric)
				// 		console.log("---歌词转换---->",this.currentLyric)
				// 	},
					
				// 	// url:this.$baseURL+'/songAudioSrc?songmid='+songmid,
				// 	// success: (res) => {
				// 	// 	console.log("---歌词---->",res)
				// 	// 	let lyric=res.data[0].lyric
				// 	// 	this.currentLyric=new Lyric(lyric)
				// 	// 	console.log("---歌词转换---->",this.currentLyric)
				// 	// }
				// })
			}
		}
	}
</script>

<style lang="scss">
	@import './songListDetail.scss'
</style>
