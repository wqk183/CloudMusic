<template>
	<view class="myLove">
		<uni-nav-bar
			status-bar="true" 
			fixed="true"
			left-icon="back" 
			background-color="#F8F8F8"
			left-text="返回" 
			title="音乐收藏中心"
			@clickLeft="backUpPage"
			>
		</uni-nav-bar>
		<view class="myLove-content">
			<view class="myLove-content-list">
				<view class="myLove-content-list-main" v-for="(item,index) in songDetailList" :key="index">
					<view class="left" :style="[rowIndex==index ? bindCss:'']" @click="playMusic(item,index)">
						<view class="left">{{index+1}}</view>
						<view class="center">
							<view class="title">{{item.songname}}</view>
							<view class="author"  :style="[rowIndex==index ? bindCss:'']">{{item.name}}</view>
						</view>
					</view>
					<view class="right">
						<view class="iconfont icon-shanchu" id="shanchu" @click="deleteLoveSong(item)"></view>
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
				audioSrc:'',
				picUrl:'',
				songDetailList:[],
				rowIndex:-1,
				bindCss:{
					color:'#4fc08d'
				},
			}
		},
		onLoad(option) {
			this.userid=option.userid
			console.log("---myLove--->",this.userid)
			this.getLoveSong()
		},
		components: {
			luchAudio
		},
		created() {
			console.log("---myLove--created->",this.userid)
		},
		methods:{
			//返回上一层
			backUpPage(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			},
			//删除love song
			deleteLoveSong(data){
				console.log("----data----->",data.songmid)
				uni.request({
					url:this.$baseURL+'/delete?songid='+data.songmid,
					method:'DELETE',
					success: (res) => {
						console.log("----删除love song----->",res)
						this.audioData={}
						this.songDetailList=[]
						this.getLoveSong()
					}
				})
			},
			//获取喜欢song
			getLoveSong(){
				uni.request({
					url:this.$baseURL+'/song?userid='+this.userid,
					success: (res) => {
						console.log("------获取喜欢song----->",res)
						res.data.forEach(el=>{
							uni.request({
								url:this.$baseURL+'/songAudioSrc?songmid='+el.songid,
								success: (res) => {
									//console.log("------获取喜欢song详情----->",res)
									this.songDetailList.push(res.data[0])
									var hash = {}; 
									this.songDetailList = this.songDetailList.reduce(function(item, next) {
										hash[next.songid]?'':hash[next.songid]=true&&item.push(next);
										return item;
									}, []);
									this.audioData=this.songDetailList[0]
									//console.log("------this.songDetailList----->",this.songDetailList)
								}
							})
						})
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
				uni.request({
					url:this.$baseURL+'/songAudioSrc?songmid='+songmid,
					success: (res) => {
						//console.log("----播放音乐----->",res)
						this.audioData.audioSrc=res.data[0].audioSrc
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './myLove.scss'
</style>
