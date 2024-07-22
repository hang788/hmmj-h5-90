<template>
  <div class="article-page">
    <nav class="my-nav van-hairline--bottom">
      <a
        :class="{active:sorter === 'weight_desc'}"
        @click="hChange('weight_desc')"
        href="javascript:"
      >推荐</a>
      <a
        :class="{active:sorter === null}"
        @click="hChange(null)"
        href="javascript:"
      >最新</a>
      <div class="logo"><img src="@/assets/logo.png" alt=""></div>
    </nav>
    <van-list
      v-model= "loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleItem v-for="item in articles" :key="item.id" :item="item"></ArticleItem>
    </van-list>
  </div>
</template>

<script>

import { getArticles } from '@/api/article'

export default {
  name: 'article-page',
  // 因为在页面刚加载就在底部，所以不需要发请求
  // async created () {
  //   const res = await getArticles({
  //     current: 1, // 当前页数
  //     pageSize: 10, // 每页获取多少条数据
  //     sorter: 'weight_desc'
  //   })
  //   this.articles = res.data.rows
  // },
  data () {
    return {
      articles: [],
      loading: false, // 是否在加载中
      finished: false, // 是否结束（没有下一页）
      current: 1, // 当前页数
      sorter: 'weight_desc' // 排序方式
    }
  },
  methods: {
    /**
     * load 事件在页面滑动到底的时候自动触发
     * 自动将 loading 改为 true
     * 请求结束后，将 loading 手动改为 false
     */
    async onLoad () {
      console.log('到底了加载数据')
      const res = await getArticles({
        current: this.current++, // 当前页数
        pageSize: 10, // 每页获取多少条数据
        sorter: this.sorter
      })
      // this.articles = res.data.rows
      this.articles.push(...res.data.rows)
      this.loading = false
      if (this.current > res.data.pageTotal) {
        this.finished = true
      }
    },
    hChange (sorter) {
      // 点击切换排序方式并重置数据
      this.sorter = sorter
      this.current = 1
      this.articles = []
      // 发送请求
      this.loading = true
      this.finished = false
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;

  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;

    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }

      &.active {
        color: #222;

        &::after {
          width: 14px;
        }
      }
    }

    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}

</style>
