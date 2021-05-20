<template>
	<div class="Popup" v-show="visible">
		<div class="mask"></div>
		<div class="content">
			<div class="top">
				<div class="title" :class="{'paddingTop0':title.length<=0}">{{title}}</div>
				<div class="txt">{{text}}</div>
			</div>
			<div class="bottom">
				<button :style="sureStyle" @click.prevent="sure" v-if="sureShow&&type=='text'">
					{{sureText}}
				</button>
				<a v-if="sureShow&&type=='phone'" @click="sure" :href="'tel:'+ phone">{{sureText}}</a>
				<button @click.prevent="cancel" v-if="cancelShow">{{cancelText}}</button>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */ 
	export default {
		name: 'Popup',
		props: {
			title: {
				type: String,
				default: 'popup-title'
			},
			phone:{
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: 'text'
			},			
			text: {
				type: String,
				default: 'popup-text'
			},
			callBack: {
				type: Function,
				default: () => {

				}
			},
			sureText: {
				type: String,
				default: '确定'
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			sureShow: {
				type: Boolean,
				default: true
			},
			cancelShow:{
				type: Boolean,
				default: true
			},
			sureStyle:{
				type: Object,
				default: () => {
        	return {}
      	}
			}
		},
		data() {
			return {
				visible: false
			}
		},
		methods: {
			open() {
				this.visible = true
			},
			hide() {
				this.visible = false
			},
			sure() {
				this.callBack(this)
			},
			cancel() {
				this.visible = false
			}
		},
	}
	/* eslint-disable */ 
</script>

<style lang="less">
	.Popup {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 1000;

		.mask {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			opacity: 0.1;
			background-color: #000;
			z-index: 1001;
		}

		.content {
			position: absolute;
			width: 560px;
			top: 50%;
			left: 50%;
			margin-left: -280px;
			margin-top: -145px;
			background-color: #fff;
			border-radius: 10px;
			z-index: 1002;
			box-shadow: #eee 0px 0px 5px;

			.top{
				padding-bottom:20px;
				border-bottom:1px solid #e5e5e5;
				.title{
					padding-top:30px;
					font-size:33px;
					color:#333;
					text-align: center;
				}
				.txt{
					padding:0px 20px 0 20px;
					margin-top: 34px;
					text-align:center;
					font-size:30px;
					color:#999;
				}
			}
			
			.bottom{
				height:80px;
				display: flex;
				justify-content: center;
				button{
					display: block;
					margin:0 auto;
					border:none;
					font-size:34px;
					color:#ed1c24;
					background-color:#fff;
				}
				a{
					display: flex;
					align-items:center;
					margin:0 auto;
					border:none;
					font-size:34px;
					color:#ed1c24;
					background-color:#fff;
					text-decoration: none;
				}
			}
		}
	}
	.paddingTop0{
		padding-top:0!important;
	}
</style>