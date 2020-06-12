<template>
	<view class="mvDetail">
		<uni-nav-bar
			status-bar="true" 
			fixed="true"
			left-icon="back" 
			background-color="#F8F8F8"
			left-text="返回" 
			title="精选视频详情"
			@clickLeft="backUpPage"
			>
		</uni-nav-bar>
		<view class="mvDetail-context">
			<video class="mvDetail-context-video" :src="mvUrl" controls autoplay="true">
			</video>
		</view>
		<view class="mvDetail-comment">
			<view class="mvDetail-comment-title">
				<view id="icon" class="iconfont icon-MV"></view>
				<view class="title">{{mvDeatailData.mvtitle}}</view>
			</view>
			<view class="mvDetail-comment-desc">
				<view class="mvDetail-comment-desc-author">
					<image class="img" src="../../static/img/touxiang.png"></image>
					<view class="author">{{mvDeatailData.singername}}</view>
				</view>
				<view class="desc">{{mvDeatailData.mvdesc}}</view>
			</view>
			<view class="mvDetail-comment-author"></view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				mvUrl:'',
				mvDeatailData:{},
				upPage:'',
			}
		},
		onLoad(option) {
			//console.log("====option====>",option.upPage)
			this.upPage=option.upPage
			this.mvDeatailData=JSON.parse(decodeURIComponent(option.data))
			//console.log("====mvDeatailData====>",this.mvDeatailData)
		},
		mounted() {
			this.getMvDetail()
		},
		methods:{
			videoErrorCallback(e){
				console.log("------videoErrorCallback------>",e)
			},
			//返回上一层
			backUpPage(){
				if(this.upPage==0){
					uni.switchTab({
					    url: '/pages/musicHall/music_hall'
					});
				}else if(this.upPage==1){
					uni.redirectTo({
					    url: '/pages/mvMore/mvMore'
					});
				}
			},
			//获取mv链接
			getMvDetail(){
				// uni.request({
				// 	url:this.$baseURL+'/mvdetail?vid='+this.mvDeatailData.vid
				// 	success: (res) => {
				// 		console.log("===vid====>",this.mvDeatailData.vid)
				// 		console.log("===获取mv链接====>",res)
				// 		this.mvUrl=res.data[0].mvurl
				// 	}
				// })
				uni.request({
					url:'https://api.qq.jsososo.com/mv/url?id='+this.mvDeatailData.vid,  
					success: (res) => {
						//console.log("===vid====>",this.mvDeatailData.vid)
						console.log("===获取mv链接====>",res)
						this.mvUrl=res.data.data[this.mvDeatailData.vid][0]
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	@import './mvDetail.scss'
</style>
