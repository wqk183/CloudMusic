<template>
	<view class="activityDetail">
		<uni-nav-bar
			status-bar="true" 
			fixed="true"
			left-icon="back" 
			background-color="#F8F8F8"
			left-text="返回" 
			title="动态发布"
			@clickLeft="backUpPage"
			>
		</uni-nav-bar>
		<view class="activityDetail-main">
			<textarea @input="bindTextAreaBlur" :value="textareaValue" placeholder="这一刻的想法......"/></view>
			<van-uploader :file-list="fileList" :deletable="false" v-on:after-read="afterRead" />
			<button type="primary" @click="display">发布</button>
		</view>
	</view>
</template>

<script>
	import {getUserInfor} from "../../util/index.js"
	export default{
		data(){
			return{
				fileList:[],
				textareaValue:'',
				userInfor:'',
			}
		},
		created(){
			getUserInfor(this)
		},
		methods:{
			bindTextAreaBlur(e){
				console.log("----bindTextAreaBlur--->",e)
				this.textareaValue=e.detail.value
			},
			//上传图片
			afterRead(event){
				console.log("-----temp----->",event)
				const { file } = event.detail
				this.fileList=[]
				this.fileList.push({
					url:file.path
				})
			},
			//发布
			display(){
				console.log("-----this.userInfor---->",this.fileList)
				if(this.textareaValue&&this.fileList.length>0){
					uni.request({
						url: this.$baseURL+'/addActivity',
						method:'POST',
						data:{
							userid :this.userInfor._id,
							username : this.userInfor.name,
							userimg : this.userInfor.img,
							title : this.textareaValue,
							content : this.fileList[0].url,
						},
						success: (res) => {
							console.log("-----发布------>",res);
							this.textareaValue=''
							this.fileList=[]
							uni.showToast({
							    title: '发布成功',
							    duration: 500
							});
						}
					})
				}else{
					uni.showToast({
					    title: '请将信息填写完整',
					    duration: 500
					});
				}
			},
			//返回上一层
			backUpPage(){
				uni.switchTab({
				    url: '/pages/activity/activity'
				});
			},
			//获取动态
			getActivity(){
				uni.request({
					url:this.$baseURL+'/activity',
					success: (res) => {
						this.activityList=res.data
						console.log("----获取动态----->",res)
					}
					
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './activityDetail.scss'
</style>
