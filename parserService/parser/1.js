var _VER             = '1.0.1';
var _INDEX           = 0;
var _TYPE            = 'PK:detail_info_extract';
var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR   = -1;
var _PLANTFORM       = '品库';
var _PLANTFORM_TYPE  = 'PK'; 
//商品批量
var htmlStr = iconv.decode(htmlString,'utf-8');

var $       = cheerio.load(htmlStr ); 
var data    = {};
data.itemInfo={};
data.addtionalAttrs     = [];
data.mainPicsFromHtml   =[];
data.goodsId            ="";
data.skuList            =[];
data.skuProps           =[];
data.propertyPics       =[];
data.spuOriginalPrice   ="";

var colorArr = [];
var sizeArr = [];

function paresImgVideoUrl(){
    
    var video = $('div.topWrap').find('#J_playVideo');
    // if(video){
    data.imgVideoUrl = video.attr('videourl');
    // }
    // console.log('videourl-----------',data.imgVideoUrl)
}

function paresMainPicsFromHtml(){

    data.mainPicsFromHtml = [];

    $('#thumblist').find('ul>li').each(function (i, elem){

        let urlNoFormat = $(elem).find('>a>img').attr('src');

        urlNoFormat = getUrlWithoutFormat(urlNoFormat);

        data.mainPicsFromHtml.push(urlNoFormat);

    });

    // console.log('data.mainPicsFromHtml---------',data.mainPicsFromHtml)

}


function parseTitleFromHtml(){

     var title = $(".pk_main_warp .con_box .con_box_rt>h3").text().replace(/\s/g,'');

     title = title.replace(/[-\(（【\[ ]*(特P|P|不低于|控|控价)[0-9]+[\)\]】） ]*/g,"")
       
     data.titleFromHtml = title;

    //  console.log('data.titleFromHtml----------',data.titleFromHtml)
}


function parseItemInfo(){
    //spu商品价格
    var spuOriginalPrice = $(".pk_main_warp .con_box .con_box_rt").find('#js-price').text().replace("￥","");

    data.spuPrice = spuOriginalPrice;

    data.itemId= $(".pk_main_warp .con_box .con_box_f1").find('.cons_banner .con_box_icon>a').first().attr('item_id');

    data.goodsId= $(".pk_main_warp .con_box .con_box_rt").find('.con_box04>span').first().text();
   

    data.spuOriginalPrice = spuOriginalPrice;

    // console.log("data.spuPrice-----------------",data.spuPrice)
    // console.log("data.spuOriginalPrice---------",data.spuOriginalPrice)
    // console.log("data.itemId---------",data.itemId)
    // console.log("data.goodsId---------",data.goodsId)

    //属性
    $('#j_tabs').find('.cons_main_rt_c .info li').each(function (i, elem) {
        if (i!=0) {

            var att=$(this).text().trim().replace(":","：");
    
            data.addtionalAttrs.push(att);

            if (att.indexOf('尺码')>-1) {
                sizeArr = att.split('：')[1].split(' ');
                if (sizeArr[0].indexOf(',')>-1) {
                    sizeArr = sizeArr[0].split(',')
                }
            }

            if (att.indexOf('颜色')>-1||att.indexOf('颜色分类')>-1) {
                colorArr = att.split('：')[1].split(' ');
                if (colorArr[0].indexOf(',')>-1) {
                    colorArr = colorArr[0].split(',')
                }
            }

        }
    });
    // console.log("data.addtionalAttrs---------",data.addtionalAttrs)
}


function getSkuList(){

    var skuPropsColorObj = {
      "isColor" : true,
      "values" : [],
      "title" : "颜色"
    };
    var colorCollections ={};

    for (let i = 0,len = colorArr.length; i < len; i++) {

        var colorName = colorArr[i];
        var colorImg  = '';
        var colorCode = 'color:'+i;
        var colorInfo={"id":colorCode,"name":colorName,"imags":[]}

        colorCollections[colorName]=colorCode;
        
        if(colorImg!=null && colorImg!=""){
            colorImg = getUrlWithoutFormat(colorImg);
            colorInfo.imags.push(colorImg);

            var propertyPic = {
                "imgs" : [colorImg],
                "id" : colorCode
            };            
            data.propertyPics.push(propertyPic)
        }
        skuPropsColorObj.values.push(colorInfo);
        
    }

    data.skuProps.push(skuPropsColorObj);
    
    // console.log("skuPropsColorObj----------",Object.keys(colorCollections))

    //////尺码
    var skuPropsSizeObj = {
          "isColor" : false,
          "values" : [],
          "title" : "尺码"
    };

    var sizeCollections ={};

    for (let j = 0,len = sizeArr.length; j < len; j++) {

        var sizeName = sizeArr[j];

        if(sizeCollections[sizeName]==null){
            var sizeCode = 'size:'+j;
            var sizeInfo={"id":sizeCode,"name":sizeName,"imags":[]}
            skuPropsSizeObj.values.push(sizeInfo);
            sizeCollections[sizeName]=sizeCode;
        }
    };
    data.skuProps.push(skuPropsSizeObj);

    for (let k = 0,len = colorArr.length; k < len; k++) {

        for (let m = 0,len = sizeArr.length; m < len; m++) {
            
            var skuItem = {
                "price" :     data.spuOriginalPrice,
                "name" :      colorArr[k]+";"+sizeArr[m]+";",
                "pNameArray": [colorArr[k],sizeArr[m]],
                "stock" :     500,
                "skuId" :     data.itemId+k+""+m,
                "properties": ";"+colorArr[k]+";"+sizeArr[m]+";",
                "propertiesNew" : colorArr[k]+";"+sizeArr[m]+";",
            }
            
            data.skuList.push(skuItem);

        }
    }

    // console.log(JSON.stringify(data.skuList));

}


function getDescHtml(){

    console.log($('#js-descripton_decode').next().html());

    var descContent = $('#js-descripton_decode').html().trim();

    descContent =  descContent.replace(/\&lt;/g,'<').replace(/\&gt;/g,'>').replace(/\&quot;/g,'\"');

    var descDom = cheerio.load(descContent);

    data.detailImgs=[];

    descDom('img').each(function (i, e) {
        //src
        //data-lazyload
        var imgSrc = $(this).attr('data-original');

        if (!imgSrc) {
          imgSrc = $(this).attr('src');
        }
        if (imgSrc != undefined && imgSrc !='') {
             data.detailImgs.push(imgSrc);
             $(this).attr('src',imgSrc);
             $(this).removeAttr('data-original');
        }
       
    });
    data.html=descDom.html();

    // let ms = data.html.match(/(?=background\-image\:url\()[\s\S]*?(?=\)})/g);
    // if (ms != undefined) {
    //     ms.forEach(function (e) {
    //        data.detailImgs.push(e.replace('background-image:url(',''));
    //     });
    // }
    //  console.log("data.detailImgs---------",data.detailImgs); 
}


function getAbstract(result){
    
    let abstract            = {};
    abstract.title          = result.titleFromHtml;
    abstract.platform       = _PLANTFORM;
    abstract.platformType   = _PLANTFORM_TYPE;
    abstract.spuPrice       = result.spuPrice;
    abstract.spuOriginalPrice = result.spuOriginalPrice;
    abstract.itemId         = result.itemId;
    abstract.jdCateId       = "";
    abstract.shopCateId     = "";
    abstract.itemMainPic    = result.mainPicsFromHtml;
    abstract.addtionalAttrs = result.addtionalAttrs;
    abstract.goodsId        = result.goodsId;
    abstract.skuList        = result.skuList;
    abstract.skuProps       = result.skuProps;
    abstract.html           = result.html;
    abstract.detailImgs     = result.detailImgs;
    abstract.imgVideoUrl    = result.imgVideoUrl;
    abstract.propertyPics   = result.propertyPics;


    return abstract;
}


function getUrlWithoutFormat(urlStr){
    let matches =  urlStr.match(/(?=\/\/)[\s\S]*?(?=\.jpg_)/g);
    let matches1 =  urlStr.match(/(?=\/\/)[\s\S]*?(?=\.gif_)/g);
    let matches2 =  urlStr.match(/(?=\/\/)[\s\S]*?(?=\.png_)/g);
    

    urlStr = urlStr.replace(/\.\d{1,3}x\d{0,4}\./g,".")

    let urlOri  = urlStr;
    if (matches) {
         //process.exit()
         urlOri = matches[0]+'.jpg';
    }else if(matches1){
         //process.exit()
        urlOri = matches1[0]+'.gif';
       
    }
    else if(matches2){        
        urlOri = matches2[0]+'.png';

    }
    matches =  urlOri.match(/(?=_)_[\d]*x[\d]*(\.jpg|\.png|\.gif)/g);
    if(matches){
        urlOri=urlOri.replace(matches[0],"");
    }
    if(!urlOri.match("http")){
        urlOri="http:"+urlOri;
    }
    return urlOri;
}

function checkResult(){

  
    // check title
    if ((data.titleFromJson == undefined || data.titleFromJson == '') && 
        (data.titleFromHtml == undefined || data.titleFromHtml == '')){
        return -11;
    }


    if (data.mainPicsFromHtml == undefined || data.mainPicsFromHtml.length == 0) {
        return -33;
    }

 


    return 0;
}


function ifItemExist(){
    var exist = ($('div.noitem').length==0);
    return exist;

}

try{

    parserInfo.index = _INDEX;
    parserInfo.ver   = _VER;
    parserInfo.type  = _TYPE;


    //Check if item is exit
    if(!ifItemExist()){
        result = data;
        result.retcode = _RETCODE_ERROR;
        result.itemNotFound = true;
        CLog.error('This item does not exist');  
    }
    else{
        // paresImgVideoUrl();
        parseTitleFromHtml();
        parseItemInfo();
        paresMainPicsFromHtml();
        getSkuList();
        getDescHtml();

        result = data;
        result.handler = _INDEX;
        

        // console.log("data-----------------> ",JSON.stringify(data))
        var check = checkResult();
        if(check==0){

            result.retcode = _RETCODE_SUCCESS; 

            let abstract   = getAbstract(result);

            result.abstract = abstract;
            //console.log(JSON.stringify(abstract))
            result.itemInfo = null;
            CLog.info('parser success : '); 

        }
        else{
            result.retcode = _RETCODE_ERROR;
            CLog.error('parser failed :  '+check);  
        }
    }
}
catch(e){
    result.retcode = _RETCODE_ERROR;
    CLog.error('parser excption : '+e.message);
}
