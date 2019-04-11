var fs = require('fs'),path = require('path');
var vm = require('vm');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

var config ={
  LOG:{
    _LOG_LEVEL_ERROR:-100,
    _LOG_LEVEL_WARNING:-10
  }
}

let dirfileName = __dirname+'/PDD1';
let n = '0';
var currentData =  require(dirfileName+'/1.json');

// var currentData =  '';

var result = {};
var htmlString = '';

var sharedSandbox = {
  fs         :fs,
  CLog       :console,
  htmlString : "",
  cheerio    : cheerio,
  iconv      : iconv,
  Date       : new Date(),
  config,
  dirfileName,
  currentData,
  parserInfo : {},                     ///parser内部信息
  result,                              ///返回结果
};

// var parserCode = fs.readFileSync('./SRC_JDY_JDExt.js');

var parserCode = fs.readFileSync(dirfileName + '/parser_'+n+'.js');
// var parserCode = fs.readFileSync(dirfileName + '/parser_JDDESC.js');


sharedSandbox.htmlString = fs.readFileSync(dirfileName + '/1.htm');

// sharedSandbox.htmlString = fs.readFileSync('./1.htm');

vm.runInNewContext(parserCode, sharedSandbox);



var localVar = 'initial value';

//在runInThisContext创建的沙箱环境中执行
var vmResult = vm.runInThisContext('localVar = "vm";');


var vm = require('vm');




