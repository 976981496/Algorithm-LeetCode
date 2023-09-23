const xlsx = require('node-xlsx')
const fs = require('fs')
const moment = require('moment')

//转换
function convertXLSXToJson(type) {
  let initId = 460 // 起始id
  let MaxIndex = 33 // 文件读取的行数
  let ReverseOrder = initId + MaxIndex - 2
  // 读取xlsx
  const sheets = xlsx.parse('newDoc.xlsx', { cellDates: true })
  // 获取xlsx第一个标签栏的数据，要转换其他标签栏的数据就改变sheet[0]中的值
  const sheetData = sheets[0].data
  // 定义数据列表
  let testList = []
  // 循环拼装数据
  sheetData.forEach((item, index) => {
    if (index == 0) {
      // 去除标题栏
      return
    } else {
      if (index < MaxIndex) {
        //可以自定义转换的数据格式
        var date = new Date(item[0]) //转换xlsx 中的日期时间
        let date_new = moment(date).add(1, 'days').format('YYYY-MM-DD')
        //unshift id倒序
        testList.push({
          plus: false,
          articleId: ReverseOrder--,
            date: date_new,
          
          title: type == 'zh' ? item[3] : type == 'ch' ? item[1] : item[2],
          link: type == 'en' ? item[4] || item[5] : item[5]//说明：官网英文端有英文稿件的放英文稿件链接，没有英文稿件的放中文内容链接
        })
           
      }
    }
  }) 
  const jsonObj = testList 
  fs.writeFileSync('./convertXLSXToJson/'+type + '_JSON_Result.json', JSON.stringify(jsonObj))
  console.log(type+'文件转换完成')
}

convertXLSXToJson('ch') //中文简体
convertXLSXToJson('zh') //中文繁体
convertXLSXToJson('en') //中文简体
