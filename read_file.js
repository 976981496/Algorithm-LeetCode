

//如果不是全局就得引入fs成员
const fs = require("fs");

// //fs  核心模块中提供了一个  fs.readFile方法,来读取指定目录下的文件
// //fs.resdFile 三个参数

// // 1,读取文件的路径
// // 2,读取文件的编码格式
// // 3,当文件读取完成,调用这个callback回调函数来读取文件的结果
// //第一个参数文error对象   第二个参数 才是读取成功的结果
// // fs.readFile('./http/111.txt','utf-8',function(error,data){
// // console.log(error);  //如果err为null就说明读取成功了,没有出错
// // console.log(data); // 如果不给第二个参数[读取的文件编码格式]就会以beffer格式输出
// // });
// fs.readFile("./file/fy.xlsx", "utf-8", function(error, data) {
//   // console.log(error);  //如果err为null就说明读取成功了,没有出错
//   // console.log(data); // 如果不给第二个参数[读取的文件编码格式]就会以beffer格式输出

//   //  用error来判断文件是否读取成功
//   if (error) return console.log("读取文件失败,内容是" + error.message);
//   console.log("读取文件成功,内容是" );
// });

const Excel = require('exceljs')
const excelfile = "./file/ct.xlsx";  //这是要导入的.xlsx文件的路径
var workbook = new Excel.Workbook();
let obj_contract={}
workbook.xlsx.readFile(excelfile).then(function () {
    var worksheet = workbook.getWorksheet(1); //获取第一个worksheet
    worksheet.eachRow(function (row, rowNumber) {
    let new_key=row.values[3]
      let lowercase_key=new_key.toLowerCase().replace(/[&\|\\\*^%$#@\-,._()（）-]/g,'').replace(/\ /g, "_");
      obj_contract[lowercase_key]=row.values[3]
      
console.log(obj_contract)
        // console.log('Row ' + rowNumber + ' = ' + row.values[2],'---------- ',row.values[3],'---------- ',lowercase_key);
    });
});