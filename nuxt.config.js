const nodeExternals = require('webpack-node-externals')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'awesome-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://g.alicdn.com/de/prismplayer/2.6.0/skins/default/aliplayer-min.css' }
    ],
    // 可使用外链形式 引入第三方库
    script: [
      { src: 'https://g.alicdn.com/de/prismplayer/2.6.0/aliplayer-h5-min.js' },
    ]
  },
  // 路由配置 
  router: {
    base: '/',
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
      // return 期望滚动到哪个的位置
      if(savedPosition){
        return savedPosition
      }else{
        return { x:0,y:0 }
      }
    },
    // 自定义路由路线
    // extendRoutes (routes, resolve) {
    //   console.log(routes)
    //   routes.push({
    //     name: 'report-index',
    //     path: '/',
    //     component: resolve(__dirname, 'pages/report/index.vue')
    //   })
    // }
  },
  // 全局CSS配置
  css: [
    { src: '~/assets/css/common.css' },
    { src: '~/assets/css/reset.css' },
    // { src: '~/assets/css/theme.less' },
    // { src: '~/assets/css/index.less' },
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#FDDB00', height: '2px' },
  /*
  ** Build configuration
  */
  build: {
    analyze: true,
    // or
    analyze: {
      analyzerMode: 'static'
    },
    // 发布路径 只需设置为根路径
    // publicPath: 'http://h5-sandbox.tiejin.cn:3000',
    // vendor.bundle.js文件内添加模块以减小应用程序包的大小。
    vendor: ['axios', 'qs', 'iview', 'vue-picture-preview2'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient, isServer }) {
      config.externals = {
        'Aliplayer': 'Aliplayer'
      }
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        // config.externals = [
        //   { Aliplayer: 'Aliplayer'}
        // ]
      } else if (isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vue-picture-preview2/]
          })
        ]
      }
      // console.log(config.externals)
    }
  },
  // 插件
  plugins: [
    {src: '~/plugins/device.js', ssr: false},
    '~/plugins/api.js',
    '~/plugins/utils.js',
    '~/plugins/iview.js',
    '~/plugins/picture-view.js',
  ]
}
