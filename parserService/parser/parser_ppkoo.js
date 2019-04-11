var _VER             = '1.0.3';
var _INDEX           = 0;
var _TYPE            = 'PK:PLATFORM_ITEMS';
var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR   = -1;
// 平台搜索
// htmlString           = iconv.decode(htmlString,'utf-8');

var $                = cheerio.load(htmlString);
// var currentData =       JSON.parse(htmlString);

var data             = {};

data.items = [];
data.maxPageNum=-1;
data.sorts=[];

var sortMap = {
'综合'  : 'https://www.ppkoo.com/search/goods.html?keywords=%E9%9F%A9%E7%89%88%E8%BF%9E%E8%A1%A3%E8%A3%99&hot=desc',
'上架时间'  : 'https://www.ppkoo.com/search/goods.html?keywords=%E9%9F%A9%E7%89%88%E8%BF%9E%E8%A1%A3%E8%A3%99&listtime=desc',
'批发价'  : 'https://www.ppkoo.com/search/goods.html?keywords=%E9%9F%A9%E7%89%88%E8%BF%9E%E8%A1%A3%E8%A3%99&price=desc',
'价格范围(综合)'  : 'https://www.ppkoo.com/search/goods.html?keywords=%E9%9F%A9%E7%89%88%E8%BF%9E%E8%A1%A3%E8%A3%99&min_price=100&max_price=200&hot=desc'
}


function parsePageItems(){
    var page = 1;
    var pageSize = 20;

    try{

        $('.pk_main_warp .pk_search').find('.pk_sk_f2 .pk_sk_con .pk_sk_item').each(function (i,elem) {
          
          var title   = $(elem).find('.pk_sk_item01>a').attr('title');
          var itemUrl = $(elem).find('.pk_sk_item01>a').attr('href');
          var imgUrl  = $(elem).find('.pk_sk_item01 a>img').attr('src');
          var price   = $(elem).find('.pk_sk_item02 .pk_sk_item02_lt').text().replace(/\s/g,'').replace('￥','');
          var tel     = $(elem).find('.pk_sk_item02 .pk_sk_item02_rt').text().replace(/\s/g,'');
          var addr    = $(elem).find('.pk_sk_item04 .pk_sk_item04_lt').text().replace(/\s/g,'');
          var itemN   = $(elem).find('.pk_sk_item04 .pk_sk_item04_rt>b').text().replace(/\s/g,'');
          var skuId   = $(elem).attr('item_id');
          var it = {itemUrl,title,imgUrl,price,skuId,tel,addr,itemN};
          data.items.push(it);  
        })

        page = $('.pk_main_warp').find('.pager>span').last().text().replace(/[^0-9]/ig,"");
        data.maxPageNum = page;

    }
    catch(e){
        console.log(e);
    }
}



function checkResult(){

    if (data.maxPageNum<0){
        return -11;
    }
    return 0;
}


try{

    parserInfo.index = _INDEX;
    parserInfo.ver   = _VER;
    parserInfo.type  = _TYPE;

    parsePageItems();

    result = data;
    // CLog.info('result:\n'+JSON.stringify(result));

    result.handler = _INDEX;
    if(checkResult() == 0){
        result.retcode = _RETCODE_SUCCESS;
        CLog.info('parser success : ');
    }
    else{
        result.retcode = _RETCODE_ERROR;
        result.errorResponse = htmlString;
        CLog.error('parser failed : ');
    }

}
catch(e){
    result.retcode = _RETCODE_ERROR;
    CLog.error('parser excption : '+e.message);
    CLog.error('parser excption :' +e.stack);
}
