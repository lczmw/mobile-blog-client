<template>
    <div class="p-flex">
        <div class="p-flex-scroll">
            <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        </div>
        <div class="p-footer-btn">
        	<mt-button type="primary" size='large'>注册</mt-button>
        </div>
    </div>
</template>
<script>
import { Field as MtField, Button as MtButton } from 'mint-ui';

export default {
    components: {
        MtField,
        MtButton,
    },
    data() {
        return {
            username: '',
            password: ''
        }
    },

    methods: {

    },

    created() {

    },
}
</script>
<style lang="scss" scoped>
</style>