let path = require('path')
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const cdn = [
    "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
    "https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js",
    'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
    "https://cdn.bootcss.com/element-ui/2.7.0/index.js",
    'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
    'https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js',
 
]
const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'element-ui': 'ELEMENT',
    'axios': 'axios',
    'js-cookie': 'Cookies',
  
}

function resolve(dir) {
    console.log(__dirname);
    
    return path.join(__dirname, dir)
}

//vue.config.js
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?'/dueDiligence/' :'./',
    // publicPath: process.env.NODE_ENV === 'production' ?'./' :'./',
    // assetsPublicPath: './',
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('@@', resolve('src/components'))
            .set('@img', resolve('src/assets/img'))
            .set('~', resolve('src/views'))
      if (IS_PRODUCTION) {
        // config
        //     .plugin('analyzer')
        //     .use(BundleAnalyzerPlugin)
        //     .end()
        // config
        //     .plugin('html')
        //     .tap(args => {
        //             args[0].cdn = cdn;
        //             return args;
        //         })
        //     .end()
        // config
        //     .externals(externals)
        }
        
    },
    css: {
        loaderOptions: {
            sass: {
              data: `
                    @import "@/assets/scss/common.scss";//@指向src目录
              `
          }
        }
    }
    // devServer: {
    //     host: '0.0.0.0',
    //     port: 8090,
    //     proxy: {
    //       '/Admin': {
    //         target: '',
    //         changeOrigin: true,
    //         ws: true,
    //         pathRewrite: {
    //             '^/Admin': ''
    //           }
    //       },
    //     }
    //   }
}