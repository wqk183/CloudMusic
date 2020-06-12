<template>
	<view class="content">
		<view class="content-search" @click="toSearch">
			<van-search :value="value1" shape="round" placeholder="请输入搜索关键词"  />
		</view>
		<view class="content-carousel">
			<swiper class="content-carousel-swiper" indicator-dots='true' autoplay='true' circular='true' interval="3000">
				<swiper-item class="content-carousel-item" v-for="(item,index) in picUrlList" :key="index">
					<image class="content-carousel-img" :src="item.picurl"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- <view class="content-funBtn">
			<view class="content-funBtn-main" v-for="(item,index) in functionBtnList" :key="index">
				<view id="icon" :class="item.iconfont"></view>
				<view class="context">{{item.context}}</view>
			</view>
		</view> -->
		<view class="content-recommendMusicList">
			<view class="recommend" >官方歌单</view>
			<view class="more" @click="toRecommendDetailPage">更多></view>
		</view>
		<view class="content-recommendMusicList-context">
			<scroll-view class="scroll-view_H" scroll-x="true">
				<view class="scroll-view_H_box" v-for="(item,index) in showRecommendSongList" :key="index" @click="toRecommmendDetail(item)">
					<view class="scroll-view-item_H uni-bg-red" >
						<image class="scroll-view-item_H-img" :src="item.cover_url_big"></image>
					</view>
					<view class="scroll-view-item_context" >{{item.title}}</view>
				</view>
			</scroll-view>
		</view>
		<view class="content-recommendMusicList">
			<view class="recommend">精选视频</view>
			<view class="more" @click="toMvMorePage">更多></view>
		</view>
		<view class="content-niceVideoList-context">
			<scroll-view class="scroll-view_H" scroll-x="true">
				<view class="scroll-view_H_box" v-for="(item,index) in showNiceVideoList" :key="index" @click="toMvDetail(item)">
					<view class="scroll-view-item_H uni-bg-red">
						<image class="scroll-view-item_H-img" :src="item.picurl"></image>
					</view>
					<view class="scroll-view-item_context">{{item.mvtitle}}-{{item.singername}}</view>
					<view class="scroll-view-item_context other-css">{{item.mvdesc}}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value1:'',
				picUrlList:[],
				recommendSongList:[],
				showRecommendSongList:[],//显示6个
				niceVideoList:[],
				showNiceVideoList:[],//显示6个
				functionBtnList:[
					{
						iconfont:'iconfont icon-geshou',
						context:'歌手'
					},
					{
						iconfont:'iconfont icon-paixingbang',
						context:'排行'
					},
					{
						iconfont:'iconfont icon-gedan',
						context:'歌单'
					},
					{
						iconfont:'iconfont icon-diantai',
						context:'电台'
					}
				]
			}
		},
		created() {
			this.getCarouselData()
			this.getRecommendData()
			this.getNiceVideoData()
			//this.updateSongdetail()
			//this.updateMvdetail()
		},
		methods:{
			//音乐搜索
			toSearch(){
				uni.reLaunch({
					url:'../search/search'
				})
			},
			//获取轮播数据
			getCarouselData(){
				uni.request({
					url:this.$baseURL+'/banner',
					success: (res) => {
						console.log("==1==>",res)
						this.picUrlList=res.data
					}
					
				})
			},
			//更多
			toRecommendDetailPage(){
				console.log("wwwwwww")
				uni.reLaunch({
					url:'../songListMore/songListMore'
				})
			},
			//mv更多
			toMvMorePage(){
				console.log("wwwwwww")
				uni.reLaunch({
					url:'../mvMore/mvMore'
				})
			},
			//更新song资源
			updateSongdetail(){
				uni.request({
					url:this.$baseURL+'/songdetailAll',
					success: (res) => {
						//console.log("----获取推荐歌单数据ALL----->",res)
						res.data.forEach(el=>{
							uni.request({
								url:'https://api.qq.jsososo.com/song/urls?id='+el.songmid,
								success: (res) => {
									console.log("----更新song资源----->",res)
									if(res.data.result!=400){
										uni.request({
											url:this.$baseURL+'/updateAudioSrc?songmid='+el.songmid,
											method:'POST',
											data:{
												audioSrc:res.data.data[el.songmid]
											},
											success: (res) => {
												console.log("----音乐更新----->",res.data)
											}
										})
									}
								}
								
							})
						})
					}
					
				})
			},
			//更新mv资源
			updateMvdetail(){
				uni.request({
					url:this.$baseURL+'/mv',
					success: (res) => {
						res.data.forEach(el=>{
							uni.request({
								url:"https://api.qq.jsososo.com/mv/url?id="+el.vid,
								success: (res) => {
									console.log("===更新mv资源====>",res)
									if(res.data.result!=400){
										uni.request({
											url:this.$baseURL+'/updateMvurl?vid='+el.vid,
											method:'POST',
											data:{
												mvurl:res.data.data[el.vid][0]
											},
											success: (res) => {
												console.log("----视频更新----->",res.data)
											}
										})
									}
								}
							})
						})
					}
					
				})
			},
			//获取官方歌单数据
			getRecommendData(){
				uni.request({
					url:this.$baseURL+'/playlist',
					success: (res) => {
						this.recommendSongList=res.data
						for(var i=0;i<6;i++){
							this.showRecommendSongList.push(this.recommendSongList[i])
						}
						console.log("----获取推荐歌单数据----->",res)
					}
					
				})
			},
			//获取精选视频数据
			getNiceVideoData(){
				uni.request({
					url:this.$baseURL+'/mv',
					success: (res) => {
						this.niceVideoList=res.data
						for(var i=0;i<6;i++){
							this.showNiceVideoList.push(this.niceVideoList[i])
						}
						console.log("----获取精选视频数据----->",res)
					}
					
				})
			},
			//去精选视频详细页面
			toMvDetail(data){
				console.log("----》",data)
				uni.reLaunch({
					url:'../mvDetail/mvDetail?upPage=0&data='+encodeURIComponent(JSON.stringify(data))
				})
			},
			//去官方歌单详细页面
			toRecommmendDetail(data){
				console.log("----去推荐歌单详细页面---->",data)
				uni.reLaunch({
					url:'../songListDetail/songListDetail?upPage=0&data='+encodeURIComponent(JSON.stringify(data))
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './music_hall.scss'
</style>
