<template>
	<view class="mvMore">
		<view class="mvMore-main">
			<view class="mvMore-content" v-for="(item,index) in mvList" :key="index">
				<view class="mvMore-img" @click="toMvDetail(item)">
					<image class="mvMore-img-con" :src="item.picurl"></image>
				</view>
				<view class="mvMore-content-main">
					<view class="mvMore-context-title">{{item.mvtitle}}</view>
					<view class="mvMore-context-name" v-for="(items,index) in item.singers" :key="index">&nbsp;{{items.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue'
	export default{
		data(){
			return{
				mvList:[],
				mvInforList:[]
			}
		},
		components: {
			uniNavBar
		},
		created(){
			uni.request({
				url:'https://api.qq.jsososo.com/new/mv',
				success: (res) => {
					this.mvList=res.data.data.list
					console.log("----获取mv数据----->",res)
				}
			});
		},
		methods:{
			//去精选视频详细页面
			toMvDetail(data){
				console.log("----》",data)
				uni.redirectTo({
					url:'../mvDetail/mvDetail?upPage=1&data='+JSON.stringify(data)
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './mvMore.scss'
</style>
