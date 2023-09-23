const axios = require('axios')
async function imageToBase64(url) {
  // 获取图片的二进制数据
  const { data } = await axios.get(url, { responseType: 'blob' })
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = (event) => {
      /// 转换结束回调
      try {
        const fullImgBase64 = event.target.result ?? ''
        const imgBase64 = fullImgBase64?.split('base64,')[1] ?? ''
        resolve(imgBase64)
      } catch (e) {
        reject(e)
      }
    }
    // 读取 图片 二进制数据 转成 base64
    reader.readAsDataURL(data)
  })
}

imageToBase64('https://agent-v2.lianyirong.com.cn/param-web/bup/qrCode/20230425140839924.png')
