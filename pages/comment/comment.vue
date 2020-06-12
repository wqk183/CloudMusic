<template>
	<view class="comment">
		<uni-nav-bar
			status-bar="true" 
			fixed="true"
			left-icon="back" 
			background-color="#F8F8F8"
			left-text="返回" 
			title="评论中心"
			@clickLeft="backUpPage"
			>
		</uni-nav-bar>
		<view class="main">
			<view class="list">
				<view class="top">
					<image class="img" :src="activityData.userimg"></image>
					<view class="name">{{activityData.username}}</view>
				</view>
				<view class="center">{{activityData.title}}</view>
				<image class="bottom" :src="activityData.content"></image>
			</view>
		</view>
		<view class="comment-content">
			<view class="comment-content-tilte">
				<view class="title">全部评论</view>
				<view class="count">{{commentList.length>0 ? commentList.length : ''}}</view>
			</view>
			<view class="tips" v-show="!state">暂无评论</view>
			<view class="comment-content-list" v-show="state" v-for="(item,index) in commentList" :key="index">
				<view class="top">
					<image class="left" :src="item.userimg"></image>
					<view class="right">
						<view class="name">{{item.username}}</view>
						<view class="time">{{item.time}}</view>
					</view>
				</view>
				<view class="content">{{item.content}}</view>
			</view>
		</view>
		<view class="comment-dispatch">
			<input class="input" :value="inputValue" @input="bindInput" placeholder="发表评论" />
			<button class="buttom" type="primary" @click="dispatchComment">发送</button>
		</view>
	</view>
</template>

<script>
	import {getUserInfor} from "../../util/index.js"
	export default{
		data(){
			return{
				activityData:{},
				inputValue:'',
				userInfor:'',
				commentList:[],
				state:'',
			}
		},
		onLoad(option) {
			this.activityData=JSON.parse(decodeURIComponent(option.data))
			console.log("-----this.activityData--->",this.activityData)
			this.getComment()
		},
		created(){
			getUserInfor(this)
		},
		methods:{
			//返回上一层
			backUpPage(){
				uni.switchTab({
				    url: '/pages/activity/activity'
				});
			},
			//获取评论
			getComment(){
				console.log("---this.activityData._id----->",this.activityData._id)
				uni.request({
					url:this.$baseURL+'/comment?activityid='+this.activityData._id,
					success: (res) => {
						if(res.data.length>0){
							this.commentList=res.data
							this.state=true
						}else{
							this.state=false
						}
						console.log("----获取评论----->",res)
					}
					
				})
			},
			//发布评论
			dispatchComment(){
				if(this.inputValue){
					uni.request({
						url: this.$baseURL+'/addComment',
						method:'POST',
						data:{
							userid:this.activityData.userid,
							activityid :this.activityData._id,
							username : this.userInfor.name,
							userimg : this.userInfor.img,
							time : this.getTime(),
							content : this.inputValue,
						},
						success: (res) => {
							console.log("-----发布评论------>",res);
							this.inputValue=''
							this.getComment()
						}
					})
				}else{
					uni.showToast({
					    title: '请输入评论内容',
					    duration: 500
					});
				}
			},
			bindInput(e){
				console.log("-----评论------>",e.detail.value);
				this.inputValue=e.detail.value
			},
			//getTime
			getTime(){
				var date = new Date(),
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate(),
				hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
				minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
				second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				return timer;
			},
		}
	}
</script>

<style lang="scss">
	@import './comment.scss'
</style>
