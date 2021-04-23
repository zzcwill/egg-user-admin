'use strict';

const xlsx = require('node-xlsx').default;
const path = require('path');
const fs = require('fs');
const contentDisposition = require('content-disposition');


const { Controller } = require('egg');

class ExcelController extends Controller {
  async get() {
    const { ctx, service, config } = this;

    ctx.set('Content-Disposition', contentDisposition('excel.xlsx'));

    let url = path.resolve(__dirname, '../../public/demo.xlsx');

    let excelData = xlsx.parse(fs.readFileSync(url));

    // console.info(excelData[0].data[0])
    let data1 = [
      'zzc', '18042434282', '10', '1000', '2021-02-22'
    ]

    excelData[0].data.push(data1);

    const options = {'!cols': [{ wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 },{ wch: 25 } ]};    
    let buffer = xlsx.build([{ name: excelData[0].name, data: excelData[0].data }],options);
    ctx.body = buffer;
    
  }
  async get2() {
    const { ctx, service, config } = this;

    let url = '/public/demo.xlsx'
    ctx.redirect(url)
  }	
}

module.exports = ExcelController;
