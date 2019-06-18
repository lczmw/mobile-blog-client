<template>
	<div class="header p-level">
		<div>
			<i class="iconfont icon-wode"></i>
		</div>
		<div>
			<i class="iconfont icon-bianji"></i>
			<i class="iconfont icon-tuichu"></i>
		</div>
	</div>
</template>

<script>
	import { LoginIn } from '@/api'

	export default {

		data () {
			return {}
		},

		methods: {
			
		},

		created () {

		},
	}
</script>

<style lang="scss" scoped>
	.header{
		display: flex;align-items: center;justify-content: space-between;height: 40px;
	}
	.icon-bianji{
		margin-right: 20px;
	}
</style>