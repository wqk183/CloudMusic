<template>
	<view class="search">
		<uni-nav-bar
			status-bar="true" 
			fixed="true"
			left-icon="back" 
			background-color="#F8F8F8"
			left-text="返回" 
			title="搜索中心"
			@clickLeft="backUpPage"
			>
		</uni-nav-bar>
		<view class="content-search">
			<van-search :value="searchValue" shape="round" placeholder="请输入搜索关键词" @search="search" @clear="clear" />
		</view>
		<view class="hot-search" v-show="state">
			<view class="title">热门搜索</view>
			<view class="hot-list">
				<view class="item" v-for="(item,index) in  hotList" :key="index" @click="chooseHot(item.k)">{{item.k}}</view>
			</view>
		</view>
		<view class="song-list" v-show="!state">
			<view class="main" v-for="(item,index) in  songList" :key="index" @click="playSong(item,index)">
				<view class="title" :style="[rowIndex==index ? bindCss:'']">{{item.songname}}</view>
				<view class="sinername" :style="[rowIndex==index ? bindCss:'']">{{item.singer[0].name}}</view>
			</view>
		</view>
		<view class="playDiv">
			<luch-audio 
				:src="audioSrc"
				:poster="picUrl" 
				autoplay="true" 
				:play.sync="audioPlay" 
				:author="audioData.singer[0].name" 
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
				hotList:[],
				songList:[],
				state:true,
				searchValue:'',
				audioData:{},
				audioPlay:false,
				bindCss:{
					color:'#4fc08d'
				},
				rowIndex:-1,
				picUrl:'',
				audioSrc:''
			}
		},
		components: {
			luchAudio
		},
		created() {
			this.hotSearch()
		},
		methods:{
			//返回上一层
			backUpPage(){
				uni.switchTab({
				    url: '/pages/musicHall/music_hall'
				});
			},
			//播放音乐
			playSong(data,index){
				this.rowIndex=index
				this.audioData=data
				let songmid=data.songmid
				let songid=data.songid
				this.audioPlay=false
				uni.request({
					url:'https://api.qq.jsososo.com/song/playlist?id='+songid,
					success: (res) => {
						console.log("----播放音乐picUrl----->",res)
						if(res.data.result!=400&&res.data.data){
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
			},
			//清空搜索框
			clear(){
				this.songList=[]
				this.state=true
				this.rowIndex=-1
			},
			//选择热门内容搜索
			chooseHot(value){
				this.searchValue=value
				uni.request({
					url:'https://api.qq.jsososo.com/search?key='+value,
					success: (res) => {
						console.log("----选择热门内容搜索----->",res)
						this.songList=[]
						this.songList=res.data.data.list
						this.state=false
					}
					
				})
			},
			//热门搜索
			hotSearch(){
				this.rowIndex=-1
				uni.request({
					url:'https://api.qq.jsososo.com/search/hot',
					success: (res) => {
						console.log("----热门搜索----->",res)
						for(var i=0;i<12;i++){
							this.hotList.push(res.data.data[i])
						}
					}
					
				})
			},
			//搜索
			search(e){
				//console.log("---音乐搜索--->",e.detail)
				if(e.detail){
					uni.request({
						url:'https://api.qq.jsososo.com/search?key='+e.detail,
						success: (res) => {
							console.log("----音乐搜索----->",res)
							if(res.data.data.list.length>0){
								this.songList=[]
								this.rowIndex=-1
								this.songList=res.data.data.list
								this.state=false
							}else{
								uni.showToast({
								    title: '暂无内容',
									icon:'none',
								    duration: 2000
								});
							}
						}
						
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import './search.scss'
</style>
