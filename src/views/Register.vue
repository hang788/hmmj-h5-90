<template>
  <div class="register-page">
    <van-nav-bar
      title="面经注册"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          { pattern: /^[a-zA-Z0-9_-]{5,16}$/, message: '用户名必须在 5 到 16 位' }
         ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^[a-zA-Z0-9_-]{6,16}$/, message: '密码必须在 6 到 16 位' }
         ]"
      />
      <div style="margin: 16px;">
        <van-button block type="primary" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <router-link class="link" to="/login">有账号，去登录</router-link>
  </div>
</template>

<script>
import { register } from '@/api/user'

export default {
  name: 'RegisterPage',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      // console.log('submit', values)
      // const res = await request.post('/user/register', values)
      // try {
      const res = await register(values)
      console.log(res)
      this.$toast.success('注册成功')
      this.$router.push('/login')
      // } catch (e) {
      //   this.$toast.fail(e.response.data.message)
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.link {
  color: #069;
  font-size: 12px;
  padding-right: 20px;
  float: right;
}
</style>
