const scrollBehavior = (to, from, savedPosition) => {
  console.log(to)
  // savedPosition 只有在 popstate 导航（如按浏览器的返回按钮）时可以获取。
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // 目标页面子组件少于两个
    // if (to.matched.length < 2) {
    //   // 滚动至页面顶部
    //   position = { x: 0, y: 0 }
    // }
    // else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    //   // 如果目标页面子组件中存在配置了scrollToTop为true
    //   position = { x: 0, y: 0 }
    // }
    // 如果目标页面的url有锚点,  则滚动至锚点所在的位置
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}
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
        name: 'keywords',
        content: '贴近,本地, 资讯, 城市, 都市, 社群, 城市温度运营商, 贴近一点看身边, 我的都市朋友圈, 华人文化, 上海切近信息科技有限公司, closer'
      },
      {
        hid: 'description',
        name: 'description',
        content: '“贴近”一个基于城市的内容分发与兴趣社群产品，为用户提供城市发展新鲜资讯、都市生活新锐观点和市井社交新潮玩法，致力于成为城市温度运营商。'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      },
      {
        name: 'format-detection',
        content: "telephone=no"
      },
      {
        'http-equiv': "X-UA-Compatible",
        content: 'IE=edge,chrome=1'
      }
    ],
    // 可使用外链形式 引入第三方库
    script: [{
      innerHTML: `
        document.onreadystatechange = function () {
          if (document.readyState === "interactive" || document.readyState === "complete") {
            canShowContent()
            try {
              window.webkit.messageHandlers.canShowContent.postMessage(null);
            } catch (e) {}
          }
        }
        function canShowContent() {}`
    }, ],
    __dangerouslyDisableSanitizers: ['script'],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
  },
  // 路由配置 
  router: {
    // base: '/',
    mode: 'history',
    // 中间件 在路由之前判断浏览器内核
    middleware: 'user-agent',
    scrollBehavior: function (to, from, savedPosition) {
      console.log(to.hash)
      console.log(savedPosition)
      // savedPosition 只有在 popstate 导航（如按浏览器的返回按钮）时可以获取。
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        // 如果目标页面的url有锚点,  则滚动至锚点所在的位置
        if (to.hash) {
          console.log(to.hash)
          position = { selector: to.hash }
        }
        return position
      }
    }
  },
  // 全局CSS配置
  css: [{
      src: 'mint-ui/lib/style.css',
    },
    {
      src: '~/assets/css/style.css'
    }
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    retry: {
      retries: 3
    },
    debug: true, // 添加拦截器
  },
  /*
   ** Customize the progress bar color
   */
  loading: false,
  // 禁用预加载
  render: {
    resourceHints: false,
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
    // vendor.bundle.js文件内添加模块以减小应用程序包的大小。
    vendor: ['axios', 'mint-ui', 'js-cookie'],
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient,
      isServer
    }) {
      // config.externals = {
      //   'Aliplayer': 'Aliplayer'
      // }
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        // 添加 alias 配置
        // Object.assign(config.resolve.alias, {
        //   'vue$': 'vue/dist/vue.esm.js'
        // })
      } else if (isServer) {
        // config.externals = [
        //   nodeExternals({
        //     whitelist: [/^vue-picture-preview2/]
        //   })
        // ]
      }
    }
  },
  // 插件
  plugins: [
    '~/plugins/api.js',
    '~/plugins/utils.js',
    '~/plugins/components.js',
    '~/plugins/mintui.js',
    '~/plugins/axios',
    {
      src: '~/plugins/vconsole.js',
      ssr: false
    },
  ]
}
