
const articleRouter = {
  route: null,
  name: null,
  title: '文章管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/article/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '修改文章',
      type: 'view',
      name: 'ArticleCreate',
      route: '/article/edit',
      filePath: 'view/article/create-article.vue',
      inNav: false,
      icon: 'iconfont icon-tushuguanli'
    },
    {
      title: '添加文章',
      type: 'view',
      name: 'ArticleCreate',
      route: '/article/create',
      filePath: 'view/article/create-article.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli'
    },
    {
      title: '文章列表',
      type: 'view',
      name: 'ArticleCreate',
      route: '/article/list',
      filePath: 'view/article/article-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli'
    }
  ]
}

export default articleRouter

