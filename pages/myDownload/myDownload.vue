<template>
	<view class="myLove">
		<uni-nav-bar
			status-bar="true" 
			fixed="true"
			left-icon="back" 
			background-color="#F8F8F8"
			left-text="返回" 
			title="音乐下载中心"
			@clickLeft="backUpPage"
			>
		</uni-nav-bar>
		<view class="myLove-content">
			<view class="myLove-content-list">
				<view class="myLove-content-list-main" v-for="(item,index) in downloadDetailList" :key="index">
					<view class="left" :style="[rowIndex==index ? bindCss:'']" @click="playMusic(item,index)">
						<view class="left">{{index+1}}</view>
						<view class="center">
							<view class="title">{{item.songname}}</view>
							<view class="author"  :style="[rowIndex==index ? bindCss:'']">{{item.name}}</view>
						</view>
					</view>
					<view class="right">
						<view class="iconfont icon-shanchu" id="shanchu" @click="deleteDownload(item)"></view>
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
</template>

<script>
	import luchAudio from '../../components/luch-audio/luch-audio.vue'
	export default{
		data(){
			return{
				userid:'',
				audioPlay:false,
				audioData:{},
				downloadDetailList:[],
				rowIndex:-1,
				bindCss:{
					color:'#4fc08d'
				},
			}
		},
		onLoad(option) {
			this.userid=option.userid
			this.getDownload()
		},
		components: {
			luchAudio
		},
		methods:{
			//返回上一层
			backUpPage(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			},
			//删除下载
			deleteDownload(data){
				uni.request({
					url:this.$baseURL+'/deleteDownload?songmid='+data.songmid,
					method:'DELETE',
					success: (res) => {
						console.log("----删除下载----->",res)
						this.audioData={}
						this.downloadDetailList=[]
						this.getDownload()
					}
				})
			},
			//获取下载
			getDownload(){
				uni.request({
					url:this.$baseURL+'/download?userid='+this.userid,
					success: (res) => {
						console.log("------获取下载----->",res)
						this.downloadDetailList=res.data
						var hash = {};
						this.downloadDetailList = this.downloadDetailList.reduce(function(item, next) {
							hash[next.songmid]?'':hash[next.songmid]=true&&item.push(next);
							return item;
						}, []);
						this.audioData=this.downloadDetailList[0]
					}
				})
			},
			//播放音乐
			playMusic(data,index){
				this.rowIndex=index
				this.audioData=data
				this.audioPlay=false
			}
		}
	}
</script>

<style lang="scss">
	@import './myDownload.scss'
</style>
