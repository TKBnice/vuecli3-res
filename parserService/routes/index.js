var express = require('express');
var router = express.Router();
var http = require('https');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var vm = require('vm');
var iconv = require('iconv-lite');
var Url = require('url');

var utils = require('../utils');

// var Parser51ZWX = require('../parser/2');
//设置允许跨域访问该服务.

import ParserPPKOO from '../parser/PPKOO';

/* GET home page. */
router.get('/index', function(req, res, next) {
    res.render('index', { title: '简单nodejs爬虫' });
});

router.get('/getList', function(req, res, next) {
    res.send({ list: '简单nodejs爬虫' });
});

router.get('/getSelectGoodsList', function(req, res, next) {
    var data = fs.readFileSync('./json/test.json').toString('utf-8');
    // 写入成功后读取测试
    // console.log('data',typeof JSON.parse(data));

    res.send(JSON.parse(data));
});

router.get('/listShopGoodsInfo.do1', function(req, res, next) {
    var data = fs.readFileSync('./json/listShopGoodsInfo1.json').toString('utf-8');
    // 写入成功后读取测试
    // console.log('data',typeof JSON.parse(data));
    res.send(JSON.parse(data));
});

router.get('/listShopGoodsInfo.do2', function(req, res, next) {
    var data = fs.readFileSync('./json/listShopGoodsInfo2.json').toString('utf-8');
    // 写入成功后读取测试
    // console.log('data',typeof JSON.parse(data));
    res.send(JSON.parse(data));
});

router.get('/PPKOO/index', function(req, res, next) { // 浏览器端发来get请求

    var Res = res;  //保存，防止下边的修改
    //url 获取信息的页面部分地址
    var url = 'https://www.ppkoo.com/search/goods.html';

    // https://www.ppkoo.com/search/goods.html?keywords=%E5%9B%9B%E4%BB%B6%E5%A5%97
    // https://www.ppkoo.com/search/goods.html?keywords=%E5%9B%9B%E4%BB%B6%E5%A5%97&page=2
    utils.httpGet(http,url).then((data)=>{
        var $ = cheerio.load(data); //cheerio模块开始处理 DOM处理
        var parser = new ParserPPKOO($);
        Res.render('PPKOO', parser.data);
    })
});

router.get('/getGoodsList', function(req, res){
    var Res = res;  //保存，防止下边的修改
    var page = req.query.page;
    var keywords = req.query.keywords;
    var min_price = req.query.min_price;
    var max_price = req.query.max_price;
    var url = 'https://www.ppkoo.com/search/goods.html';

    url = url+Url.parse(req.url).search;

    console.log('url',url);

    utils.httpGet(http,url).then((htmlString)=>{

        try {
            var sharedSandbox = {
                CLog       :console,
                htmlString : htmlString,
                cheerio    : cheerio,
                iconv      : iconv,
                Date       : new Date(),
                parserInfo : {},                              ///parser内部信息
                result     : {},                                  ///返回结果
                vm         :vm
              };

            var parserCode = fs.readFileSync('./parser/parser_ppkoo.js');

            vm.runInNewContext(parserCode, sharedSandbox);
            // var $ = cheerio.load(data); //cheerio模块开始处理 DOM处理
            // var parser = new ParserPPKOO($);

            // console.log('sharedSandbox',sharedSandbox.result);
            Res.send({
                data:sharedSandbox.result,
                success:true
            });

        } catch (error) {

            console.log('parser error:',error);

        }

    })

});



module.exports = router;