<template>
	<view class="register">
		<uni-nav-bar
			status-bar="true" 
			fixed="true"
			left-icon="back" 
			background-color="#F8F8F8"
			left-text="返回" 
			title="个人信息管理"
			@clickLeft="backUpPage"
			>
		</uni-nav-bar>
		<view class="register-main">
			<van-field required :value="name" label="用户名" placeholder="请输入用户名"  v-on:input="getName"/>
			<van-field required :value="psd" label="密码" placeholder="请输入密码" v-on:input="getPsd"/>
			<van-field label="年龄" :value="age" placeholder="请输入年龄"  v-on:input="getAge"/>
			<view class="temp">
				<van-radio-group :value="sex" v-on:change="getSex">
					<view class="sex" >性别</view>
					<van-radio name="男">男</van-radio>
				    <van-radio name="女">女</van-radio>
				</van-radio-group>
			</view>
			<van-field label="手机号" :value="phone" placeholder="请输入手机号" v-on:input="getPhone"/>
			<van-field label="邮箱" :value="email" placeholder="请输入邮箱"  v-on:input="getEmail"/>
			<van-uploader :file-list="fileList" :deletable="false" v-on:after-read="afterRead" />
			<button type="primary" @click="update">修改</button>
		</view>
	</view>
</template>

<script>
	import {setIsShow,getIsShow,setUserInfor} from "../../util/index.js";
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue'
	export default{
		data(){
			return{
				fileList:[],
				sex:'男',
				name:'',
				age:0,
				psd:'',
				phone:'',
				email:'',
				id:'',
			}
		},
		onLoad(option) {
			console.log("------tempData------->",JSON.parse(decodeURIComponent(option.data)))
			var tempData=JSON.parse(decodeURIComponent(option.data))
			// console.log("------tempData------->",JSON.parse(decodeURIComponent(option.data)))
			this.id=tempData._id
			this.getUserInfor()
		},
		methods:{
			//返回上一层
			backUpPage(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			},
			//获取个人信息
			getUserInfor(){
				uni.request({
					url: this.$baseURL+'/userInfor?_id='+this.id,
					success: (res) => {
						console.log("-----获取个人信息------>",res);
						this.name=res.data[0].name
						this.psd=res.data[0].psd
						this.age=res.data[0].age
						this.sex=res.data[0].sex
						this.phone=res.data[0].phone
						this.email=res.data[0].email
						this.fileList.push({
							url:res.data[0].img
						})
					}
				})
			},
			//修改
			update(){
				uni.request({
					url: this.$baseURL+'/user_update?_id='+this.id,
					method:'POST',
					data:{
						name : this.name,
						psd : this.psd,
						age : this.age,
						sex : this.sex,
						img : this.fileList[0].url,
						phone : this.phone,
						email : this.email,
					},
					success: (res) => {
						console.log("-----修改------>",res);
						this.name=''
						this.psd=''
						this.age=''
						this.sex='男'
						this.phone=''
						this.email=''
						this.fileList=[]
						uni.showToast({
						    title: '修改成功',
						    duration: 500
						});
						uni.request({
							url: this.$baseURL+'/userInfor?_id='+this.id,
							success: (res) => {
								console.log("-----获取个人信息------>",res)
								setUserInfor(res.data[0])
							}
						})
					}
				})
				//更新动态相关信息
				uni.request({
					url: this.$baseURL+'/updateActivity?userid='+this.id,
					data:{
						 username : this.name,
						 userimg : this.fileList[0].url
					},
					method:'POST',
					success: (res) => {
						console.log("-----动态信息修改------>",res)
					}
				})
				//更新评论相关信息
				uni.request({
					url: this.$baseURL+'/updateComment?userid='+this.id,
					data:{
						 username : this.name,
						 userimg : this.fileList[0].url
					},
					method:'POST',
					success: (res) => {
						console.log("-----评论信息修改------>",res)
					}
				})
			},
			getName(e){
				this.name=e.detail
			},
			getPsd(e){
				this.psd=e.detail
			},
			getAge(e){
				this.age=e.detail
			},
			getSex(e){
				this.sex=e.detail
			},
			getPhone(e){
				this.phone=e.detail
			},
			getEmail(e){
				this.email=e.detail
			},
			//上传图片
			afterRead(event){
				console.log("-----temp----->",event)
				const { file } = event.detail
				this.fileList=[]
				this.fileList.push({
					url:file.path
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './updateInfor.scss'
</style>
