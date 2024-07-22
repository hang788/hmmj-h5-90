import request from '@/utils/request'

export const getArticles = params => request.get('/interview/query', { params })

export const getArticleDetail = id => request.get('/interview/show', { params: { id } })

export const updateLike = id => request.post('/interview/opt', {
  id,
  optType: 1
})

export const updateCollect = id => request.post('/interview/opt', {
  id,
  optType: 2
})

export const getArticlesCollectOrLike = params =>
  request.get('/interview/opt/list',
    { params })
