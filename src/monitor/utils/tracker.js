let host = 'cn-guangzhou.log.aliyuncs.com'
let project = 'caicai'
let logStore = 'caicai-store'
let userAgent = require('user-agent')

function getExtraData() {
  return {
    title: document.title,
    url: location.href,
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent).name,
  }
}

class SendTracker {
  constructor() {
    this.url = `http://${project}.${host}/logstores/${logStore}/track` //上报的路径
    this.xhr = new XMLHttpRequest()
  }
  send(data = {}) {
    let extraData = getExtraData()
    let log = { ...extraData, ...data }
    //对象 的值不能是数字

    for (let key in log) {
      if (typeof log[key] === 'number') {
        log[key] = `${log[key]}`
      }
    }
    this.xhr.open('POST', this.url, true)
    let body = JSON.stringify({
      __logs__: [log],
    })
    console.log(body)
    this.xhr.setRequestHeader('Content-Type', 'application/json') //请求体类型
    this.xhr.setRequestHeader('x-log-apiversion', '0.6.0') //版本号
    this.xhr.setRequestHeader('x-log-bodyrawsize', body.length) //请求体的大小
    this.xhr.onload = function () {
      // console.log(this.xhr.response)
    }
    this.xhr.onerror = function (error) {
      // console.log(error)
    }
    this.xhr.send(body)
  }
}

export default new SendTracker()
