 
const xlsx = require("xlsx");  // 想要直接操作本地文件只能采用nodejs的方式，client端无法处理
const fs = require("fs");
const path = require("path") 
const {Sheets,SheetNames} = xlsx.readFile("newDoc.xlsx",{}) // 获取整个xlsx文档
 
console.log(Sheets)
const sheetData = sheets[0].data;
SheetNames.forEach(item => {
    console.log(item)
    const arr = xlsx.utils.sheet_to_json(Sheets[item],{ header: 8 })
 
    //定义输出文件路径
    const outputFile = path.join(__dirname, `output.json`)
    fs.writeFile(outputFile, JSON.stringify(arr, '' , ''), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`output.json 创建成功！！！`)
        }
    })
}) 

const {Sheets:SheetsEn ,SheetNames:SheetNamesEN} = xlsx.readFile("newDocEn.xlsx",{}) // 获取整个xlsx文档
 
SheetNamesEN.forEach(item => {

    const arr = xlsx.utils.sheet_to_json(SheetsEn[item],{ header: 8 })
 
    //定义输出文件路径
    const outputFile = path.join(__dirname, `outpuEn.json`)
    fs.writeFile(outputFile, JSON.stringify(arr, '' , ''), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`outpuEn.json 创建成功！！！`)
        }
    })
}) 


const {Sheets:SheetsCh ,SheetNames:SheetNamesCh} = xlsx.readFile("newDocCh.xlsx",{}) // 获取整个xlsx文档
 
SheetNamesCh.forEach(item => {
    console.log(item)
    const arr = xlsx.utils.sheet_to_json(SheetsCh[item],{ header: 8 })
 
    //定义输出文件路径
    const outputFile = path.join(__dirname, `outpuEn.json`)
    fs.writeFile(outputFile, JSON.stringify(arr, '' , ''), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`outpuCh.json 创建成功！！！`)
        }
    })
}) 
