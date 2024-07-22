<template>
  <div class="collect-page">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleItem v-for="item in articles" :key="item.id" :item="item"></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import { getArticlesCollectOrLike } from '@/api/article'

export default {
  name: 'CollectPage',
  data () {
    return {
      articles: [],
      loading: false, // 是否在加载中
      finished: false, // 是否结束（没有下一页）
      current: 1, // 当前页数
      optType: 2 // 操作类型：1点赞2收藏
    }
  },
  methods: {
    async onLoad () {
      console.log('到底了加载数据')
      const res = await getArticlesCollectOrLike({
        page: this.current++, // 当前页数
        pageSize: 10, // 每页获取多少条数据
        optType: this.optType
      })
      // this.articles = res.data.rows
      this.articles.push(...res.data.rows)
      this.loading = false
      if (this.current > res.data.pageTotal) {
        this.finished = true
      }
    }

  }
}
</script>

<style lang="less" scoped>

</style>
