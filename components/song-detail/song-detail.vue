<template>
	<view class="song-detail" :style="{height:windowHeight}" >
		<uni-nav-bar
			status-bar="true" 
			fixed="true"
			left-icon="back" 
			background-color="#F8F8F8"
			left-text="返回" 
			title="播放页"
			@clickLeft="backUpPage"
			>
		</uni-nav-bar>
		<view class="song-detail-content">
			<view class="song-detail-songInfo">
				 <scroll-view scroll-y="true" class="scroll-Y" >
					<p class="song" v-for="(item,index) in currentLyric.lines" :key="index">{{item.txt}}</p>
				</scroll-view>
			</view>
			<view class="song-detail-progress">
				<view>1</view>
				<progress  percent="40" active stroke-width="3" class="progress" />
				<view>2</view>
			</view>
			<view class="song-detail-songAction">
				<view id="up" class="iconfont icon-shangyishou" @click="switchUp"></view>
				<view id="play" :class="[playState ? 'iconfont icon-bofang' : 'iconfont icon-zanting']" @click="switchPlay"></view>
				<view id="next" class="iconfont icon-xiayishou" @click="switchNext"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				playState:false,
			}
		},
		props:{
			currentLyric:{
				type:Object
			},
			windowHeight:{
				type:String
			}
		},
		created() {
			console.log("qqqqqqqq")
		},
		methods:{
			//返回上一层
			backUpPage(){
				this.$emit('toSongDetail',false)
			},
			//上一首
			switchUp(){
				this.playState=true
			},
			//下一首
			switchNext(){
				this.playState=true
			},
			//暂停播放切换
			switchPlay(){
				this.playState=!this.playState
			}
		}
	}
</script>

<style lang="scss">
	.song-detail{
		
		.song-detail-content{
			padding-left: 18px;
			padding-right: 18px;
			height: calc(100% - 64px);
			.song-detail-songInfo{
				text-align: center;
				height: calc(100% - 100px);
				.scroll-Y{
					height: 100%;
					.song{
						font-size: 14px;
						line-height: 32px;
					}
				}
			}
			.song-detail-progress{
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: fixed;
				bottom: 80px;
				left: 36px;
				right: 36px;
				height: 20px;
				z-index: 1002;
				.progress{
					width: 100%;
				}
			}
			.song-detail-songAction{
				height: 80px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: fixed;
				bottom: 0;
				left: 36px;
				right: 36px;
				z-index: 1002;
				#up{
					font-size: 45px;
				}
				#play{
					font-size: 45px;
				}
				#next{
					font-size: 45px;
				}
			}
		}
		
	}
</style>
