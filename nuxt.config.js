var nodeExternals = require('webpack-node-externals')
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
        'http-equiv': "X-UA-Compatible",
        content: 'IE=edge,chrome=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: '贴近Closer'
      }
    ],
    // 可使用外链形式 引入第三方库
    script: [
      // html head 中创建 script 标签
      {
        innerHTML: `(function() {
          if (typeof window !== 'undefined') {
            let nvg = navigator.userAgent.toLowerCase()
            // 判断页面当前处于的浏览器或者当前链接，设置html的hidden和auto
            if (nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1 || location.href.indexOf('/invite') > -1) {
              document.documentElement.style.overflow = "auto"
            } else {
              document.documentElement.style.overflow = "hidden"
            }
          } else {
            console.log('Do not use window in server')
          }
        })()`
      },
      {
        innerHTML: `
        var nt = Date.now()
        document.addEventListener("DOMContentLoaded", function(event) {
            console.log("DOMContentLoaded====", Date.now() - nt);
            canShowContent()
            try {
              window.webkit.messageHandlers.canShowContent.postMessage(null);
            } catch (e) {}
        });
        if (typeof document != 'undefined') {
          document.onreadystatechange = completeLoading;
        }
        function completeLoading() {
          switch (document.readyState) {
            case "loading": 
              console.log('loading====', nt)
              break;
            case "interactive":
              console.log("interactive====", Date.now() - nt);
              break;
            case "complete":
              console.log("complete====", Date.now() - nt);
              break;
          }
        }
        
        function canShowContent() {}`
      },
    ],
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
  },
  // 全局CSS配置
  css: [{
      src: 'mint-ui/lib/style.css',
    },
    {
      src: '~/assets/fonts/iconfont.css'
    },
    {
      src: '~/assets/css/reset.css'
    },
    {
      src: '~/assets/css/style.css'
    },
    {
      src: '~/assets/css/common.css'
    }
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    retry: {
      retries: 3
    },
    // baseURL: 'https://api-sandbox.tiejin.cn/command/',
    debug: true, // 添加拦截器
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#FDDB00',
    height: '2px'
  },
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
    publicPath: 'http://h5-sandbox.tiejin.cn/_nuxt/',
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
    '~/plugins/async',
    {
      src: '~/plugins/vconsole.js',
      ssr: false
    },
    {
      src: '~/plugins/device.js',
      ssr: false
    }
  ]
}
