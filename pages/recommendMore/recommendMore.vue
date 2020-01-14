<template>
	<view class="recommendMore">
		<view class="recommendMore-img">
			<image class="recommendMore-img-context" src="../../static/img/songBackImg1.png"></image>
		</view>
		<view class="recommendMore-all" >
			<view class="recommendMore-all-item" v-for="(item,index) in recommendSongList" :key="index">
				<view class="recommendMore-all-item-img">
					<image class="recommendMore-all-item-img-con" :src="item.cover_url_big" @click="torRecommendDetail(item)"></image>
				</view>
				<view class="recommendMore-all-item-desc">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				recommendSongList:[]
			}
		},
		onLoad(){
			uni.request({
				url:'https://api.qq.jsososo.com/recommend/playlist',
				success: (res) => {
					this.recommendSongList=res.data.data.list
					console.log("----获取推荐歌单数据----->",res)
				}
				
			})
		},
		methods:{
			//去推荐歌单详细页面
			torRecommendDetail(data){
				console.log("----》",data)
				uni.redirectTo({
					url:'../recommendDetail/recommendDetail?upPage=1&tid='+data.tid
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './recommendMore.scss'
</style>
