/*setupProxy.js*/
const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    // proxy第一个参数为要代理的路由
    // 第二参数中target为代理后的请求网址，changeOrigin是否改变请求头
    app.use('/airport/coordecision',createProxyMiddleware( {
        target: 'http://172.16.1.172:8620',
        changeOrigin: true,
        ws: true,
    }))
    app.use('/test',createProxyMiddleware( {
        target: 'http://localhost:4001',
        changeOrigin: true,
    }))

}
