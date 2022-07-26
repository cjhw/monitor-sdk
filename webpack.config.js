const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  context: process.cwd(),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    onBeforeSetupMiddleware(devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }
      // 用来配置路由的  express服务器
      devServer.app.get('/success', function (req, res) {
        res.json({ id: 1 }) //200
      })
      devServer.app.post('/error', function (req, res) {
        res.sendStatus(500) //500
      })
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      //自动打包出HTML文件的
      template: './src/index.html',
      inject: 'head',
      scriptLoading: 'blocking',
    }),
  ],
}
