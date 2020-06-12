<template>
	<view class="register">
		<uni-nav-bar
			status-bar="true" 
			fixed="true"
			left-icon="back" 
			background-color="#F8F8F8"
			left-text="返回" 
			title="注册页"
			@clickLeft="backUpPage"
			>
		</uni-nav-bar>
		<view class="register-main">
			<van-field required :value="name" label="用户名" placeholder="请输入用户名"  v-on:blur="getName"/>
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
			<button type="primary" @click="register">注册</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue'
	export default{
		data(){
			return{
				fileList:[],
				sex:'男',
				name:'',
				age:'',
				psd:'',
				phone:'',
				email:'',
			}
		},
		created(){
			//console.log("----created1----->",getIsShow())
		},
		methods:{
			//返回上一层
			backUpPage(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			},
			//注册
			register(){
				if(this.name && this.psd){
					uni.request({
						url: this.$baseURL+'/user_add',
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
							console.log("-----注册------>",res);
							this.name=''
							this.psd=''
							this.age=''
							this.sex='男'
							this.phone=''
							this.email=''
							this.fileList=[]
							uni.showToast({
							    title: '注册成功',
							    duration: 500
							});
						}
					})
				}else{
					uni.showToast({
					    title: '请将信息输入完整',
					    duration: 500
					});
				}
			},
			getName(e){
				console.log("-----getName------>",e.detail.value);
				this.name=e.detail.value
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
	@import './register.scss'
</style>
