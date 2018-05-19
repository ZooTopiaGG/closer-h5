const nodeExternals = require('webpack-node-externals')
module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: '贴近Closer',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      {
        name: 'format-detection',
        content: "telephone=no"
      },
      {
        hid: 'description',
        name: 'description',
        content: '贴近Closer'
      }
    ],
    // 可使用外链形式 引入第三方库
    script: [{
        innerHTML: `if (typeof window !== 'undefined') {
              let deviceWidth = document.documentElement.clientWidth
              if (deviceWidth > 768) deviceWidth = 768
              document.documentElement.style.fontSize = deviceWidth / 7.5 + "px"
              let nvg = navigator.userAgent.toLowerCase()
              if (nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1) {
                document.documentElement.style.overflow = "auto"
              } else {
                document.documentElement.style.overflow = "hidden"
              }
          } else {
              console.log('Do not use window in server')
          }`,
        type: 'text/javascript',
        charset: 'utf-8'
      },
      {
        src: 'https://g.alicdn.com/de/prismplayer/2.6.0/aliplayer-h5-min.js'
      },
      {
        src: 'https://cdn.bootcss.com/vue-lazyload/1.2.3/vue-lazyload.js'
      }
    ],
    __dangerouslyDisableSanitizers: ['script'],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdn.bootcss.com/mint-ui/2.2.13/style.min.css'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//at.alicdn.com/t/font_663941_c0ea3e10z0fz85mi.css'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://g.alicdn.com/de/prismplayer/2.6.0/skins/default/aliplayer-min.css'
      },
    ],

  },
  // 路由配置 
  router: {
    base: '/',
    mode: 'history',
    // 中间件 在路由之前判断浏览器内核
    middleware: 'user-agent',
    scrollBehavior(to, from, savedPosition) {
      // return 期望滚动到哪个的位置
      if (savedPosition) {
        return savedPosition
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    },
  },
  // 全局CSS配置
  css: [{
      src: '~/assets/css/style.css'
    },
    {
      src: '~/assets/css/common.css'
    },
    {
      src: '~/assets/css/reset.css'
    },
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    retry: {
      retries: 3
    },
    baseURL: 'https://api-sandbox.tiejin.cn/command/',
    debug: true, // 添加拦截器
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#FDDB00',
    height: '2px'
  },
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
    vendor: ['axios', 'vue-picture-preview2', 'mint-ui', 'js-cookie'],
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient,
      isServer
    }) {
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
        // 添加 alias 配置
        Object.assign(config.resolve.alias, {
          'vue': 'vue/dist/vue.js'
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
    '~/plugins/api.js',
    '~/plugins/utils.js',
    '~/plugins/components.js',
    '~/plugins/mintui.js',
    '~/plugins/axios',
    '~/plugins/async',
    '~/plugins/picture-view.js',
    {
      src: '~/plugins/device.js',
      ssr: false
    },
    {
      src: '~/plugins/lazyload.js',
      ssr: false
    }
  ]
}
