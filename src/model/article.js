/* eslint-disable class-methods-use-this */
import _axios from '@/lin/plugin/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Article {
  // 获取文章列表
  async getArticleList(params) {
    return _axios({
      method: 'get',
      url: 'cms/article/getArticleList',
      params
    })
  }
  async deleteArticle(id) {
    return _axios({
      method: 'delete',
      url: `cms/article/delete/${id}`
    })
  }
  async createArticle(data) {
    return _axios({
      method: 'post',
      url: 'cms/article/create',
      data
    })
  }
  async getArticleById(id) {
    return _axios({
      method: 'get',
      url: `cms/article/getArticleById/${id}`
    })
  }
  async editArticleById(id, data) {
    return _axios({
      method: 'put',
      url: `cms/article/edit/${id}`,
      data
    })
  }
}

export default new Article()
