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
        innerHTML: `(function (root, factory) {
            if (typeof exports === "object") {
                module.exports = factory(root);
            } else if (typeof define === "function" && define.amd) {
                define([], factory(root));
            } else {
                root.LazyLoad = factory(root);
            }
        }) (typeof global !== "undefined" ? global : this.window || this.global, function (root) {
        
            "use strict";
        
            const defaults = {
                src: "data-src",
                srcset: "data-srcset",
                selector: ".lazyload"
            };
        
            /**
            * Merge two or more objects. Returns a new object.
            * @private
            * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
            * @param {Object}   objects  The objects to merge together
            * @returns {Object}          Merged values of defaults and options
            */
            const extend = function ()  {
        
                let extended = {};
                let deep = false;
                let i = 0;
                let length = arguments.length;
        
                /* Check if a deep merge */
                if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
                    deep = arguments[0];
                    i++;
                }
        
                /* Merge the object into the extended object */
                let merge = function (obj) {
                    for (let prop in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                            /* If deep merge and property is an object, merge properties */
                            if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
                                extended[prop] = extend(true, extended[prop], obj[prop]);
                            } else {
                                extended[prop] = obj[prop];
                            }
                        }
                    }
                };
        
                /* Loop through each object and conduct a merge */
                for (; i < length; i++) {
                    let obj = arguments[i];
                    merge(obj);
                }
        
                return extended;
            };
        
            function LazyLoad(images, options) {
                this.settings = extend(defaults, options || {});
                this.images = images || document.querySelectorAll(this.settings.selector);
                this.observer = null;
                this.init();
            }
        
            LazyLoad.prototype = {
                init: function() {
        
                    /* Without observers load everything and bail out early. */
                    if (!root.IntersectionObserver) {
                        this.loadImages();
                        return;
                    }
        
                    let self = this;
                    let observerConfig = {
                        root: null,
                        rootMargin: "0px",
                        threshold: [0]
                    };
        
                    this.observer = new IntersectionObserver(function(entries) {
                        entries.forEach(function (entry) {
                            if (entry.intersectionRatio > 0) {
                                self.observer.unobserve(entry.target);
                                let src = entry.target.getAttribute(self.settings.src);
                                let srcset = entry.target.getAttribute(self.settings.srcset);
                                if ("img" === entry.target.tagName.toLowerCase()) {
                                    if (src) {
                                        entry.target.src = src;
                                    }
                                    if (srcset) {
                                        entry.target.srcset = srcset;
                                    }
                                } else {
                                    entry.target.style.backgroundImage = "url(" + src + ")";
                                }
                            }
                        });
                    }, observerConfig);
        
                    this.images.forEach(function (image) {
                        self.observer.observe(image);
                    });
                },
        
                loadAndDestroy: function () {
                    if (!this.settings) { return; }
                    this.loadImages();
                    this.destroy();
                },
        
                loadImages: function () {
                    if (!this.settings) { return; }
        
                    let self = this;
                    this.images.forEach(function (image) {
                        let src = image.getAttribute(self.settings.src);
                        let srcset = image.getAttribute(self.settings.srcset);
                        if ("img" === image.tagName.toLowerCase()) {
                            if (src) {
                                image.src = src;
                            }
                            if (srcset) {
                                image.srcset = srcset;
                            }
                        } else {
                            image.style.backgroundImage = "url(" + src + ")";
                        }
                    });
                },
        
                destroy: function () {
                    if (!this.settings) { return; }
                    this.observer.disconnect();
                    this.settings = null;
                }
            };
        
            root.lazyload = function(images, options) {
                return new LazyLoad(images, options);
            };
        
            if (root.jQuery) {
                const $ = root.jQuery;
                $.fn.lazyload = function (options) {
                    options = options || {};
                    options.attribute = options.attribute || "data-src";
                    new LazyLoad($.makeArray(this), options);
                    return this;
                };
            }
        
            return LazyLoad;
        });`
      },
      {
        innerHTML: `
        document.addEventListener("DOMContentLoaded", function(event) {
            canShowContent()
            try {
              window.webkit.messageHandlers.canShowContent.postMessage(null);
            } catch (e) {}
        });
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
    // {
    //   src: '~/plugins/device.js',
    //   ssr: false
    // }
  ]
}
