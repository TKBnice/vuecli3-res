
import underscore from 'underscore'

class Utils {

    constructor() {

        String.prototype.endWith = function (str) {
            if (str == null || str == "" || this.length == 0 || str.length > this.length)
                return false;
            if (this.substring(this.length - str.length) == str)
                return true;
            else
                return false;

        }

        String.prototype.trim = function () {
            return this.replace(/(^\s*)|(\s*$)/g, '');
        };

        // Array.prototype.indexOf = function(val) {
        //     for (var i = 0; i < this.length; i++) {
        //     if (this[i] == val) return i;
        //     }
        //     return -1;
        // };

        // Array.prototype.remove = function(val) {
        //     var index = this.indexOf(val);
        //     if (index > -1) {
        //     this.splice(index, 1);
        //     }
        // };

        this._ = underscore;

    };


    getLogFromArgs(arg) {
        var log = '';
        for (var i in arg) {
            if (typeof arg[i] == 'object') {
                log += JSON.stringify(arg[i])
            }
            else {
                log += arg[i];
            }

        }
        return log;

    }

    debugLog() {
        var log = this.getLogFromArgs(arguments);
        console.log(log);
    };

    infoLog() {
        var log = this.getLogFromArgs(arguments);
        console.log(log);
    };

    warnLog(log) {
        var log = this.getLogFromArgs(arguments);
        console.error(log);
    };

    errorLog(log) {
        var log = this.getLogFromArgs(arguments);
        console.error(log);
    };

    getJsonBody(response, body) {

        var ct = response.headers['content-type'];
        if (ct.indexOf('application/json') >= 0) {
            try {
                var jsonBody = JSON.parse(body);
                if (jsonBody) {
                    return jsonBody;
                }
            } catch (th) {
                //console.log("Malformed json...");
            }
        }
        return null;
    };

    getFileType(filename) {
        filename = filename.toLowerCase();

        if (filename.endWith('.jpg') || filename.endWith('.jpeg')) {
            return "image/jpeg";
        } else if (filename.endWith('.png')) {
            return "image/png";
        } else if (filename.endWith('.gif')) {
            return "image/gif";
        } else if (filename.endWith('.bmp')) {
            return "image/bmp";
        } else {
            return "image/jpeg";
        }
    };

    cloneJSON(obj) {
        // basic type deep copy
        if (obj === null || obj === undefined || typeof obj !== 'object') {
            return obj
        }
        // array deep copy
        if (obj instanceof Array) {
            var cloneA = [];
            for (var i = 0; i < obj.length; ++i) {
                cloneA[i] = this.cloneJSON(obj[i]);
            }
            return cloneA;
        }
        // object deep copy
        var cloneO = {};
        for (var i in obj) {
            cloneO[i] = this.cloneJSON(obj[i]);
        }
        return cloneO;


    };

    isNumber(s) {
        var re = new RegExp("^\\d{1,9}(\\.\\d{1,9}|d{0})$");
        if ((s + '').search(re) == -1 || s <= 0) {
            return false;
        } else {
            return true;
        }
    };

    isMoneyNumber(s) {
        var re = new RegExp("^\\d{1,9}(\\.\\d{1,2}|d{0})$");
        if ((s + '').search(re) == -1 || s <= 0) {
            return false;
        } else {
            return true;
        }
    };

    isPositiveInteger(s) {
        var re = new RegExp("^([1-9][0-9]*){1,9}$");
        // var re = new RegExp("^\\+?[1-9][0-9]*$");
        if ((s + '').search(re) == -1 || s <= 0) {
            return false;
        } else {
            return true;
        }
    };

    isNonZeroInteger(s) {
        var re = new RegExp("^([1-9][0-9]*|0){1,9}$");
        if ((s + '').search(re) == -1) {
            return false;
        } else {
            return true;
        }
    };

    isLongNumber(s) {
        var re = new RegExp("^([1-9][0-9]*|0){1,20}$");
        if ((s + '').search(re) == -1) {
            return false;
        } else {
            return true;
        }
    };

    decimalFormat(d, len) {
        var len = len || 0; //默认不保留
        var digitStr = d + "";
        if (digitStr.indexOf('.') > 0) {
            return Number(Number(d).toFixed(len));
        } else {
            return d;
        }
    };

    maxLen(s, max,fromRight) {
        var fromRight = fromRight || false;
        if (!s || s == undefined || s == null ||s=="") {
            return '';
        }

        //console.log("maxxxxx",max);
        if (s.length <= max) {
            return s;
        } else if(fromRight){
            return s.substring(0, max/2)+"..."+ s.substring(s.length - max/2) ;
        }
        else{
            return s.substring(0, max) + "...";
        }
    };

    subStrByWidth(str, width, size) {
        var allowMax = parseInt(width * 1.5 / size);
        //console.log(str.length,width,size,allowMax);
        if (str.length <= allowMax) {
            return str;
        } else {
            return this.maxLen(str, allowMax - 3);
        }
    };


    isEmptyStr(str) {
        
        if (str == null || str == "" || str == undefined) {
            return true;
        } else {
            var str = (str + "").trim();
            return false;
        }
    };


    getBetterDatetime(d) {
        //var d = this.parseDate(dateTimeStr);
        var n = new Date();

        if (d) {
            if (d.getFullYear() == n.getFullYear() && d.getMonth() == n.getMonth() && d.getDate() == n.getDate()) {
                return d.getHours() + ":" + (d.getMinutes() <= 9 ? "0" + d.getMinutes() : d.getMinutes());
            } else if (d.getFullYear() == n.getFullYear() && d.getMonth() == n.getMonth() && d.getDate() + 1 == n.getDate()) {
                return '昨天 '+d.getHours() + ":" + (d.getMinutes() <= 9 ? "0" + d.getMinutes() : d.getMinutes());

            } else if (d.getFullYear() == n.getFullYear() && d.getMonth() == n.getMonth() && d.getDate() + 2 == n.getDate()) {
                return '前天';
            } else {
                return (d.getMonth() + 1) + "月" + d.getDate() + "日";
            }
        } else {
            return dateTimeStr;
        }

    };

    parseDate(str) {
        var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
        if (results && results.length > 3)
            return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]));
        results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
        if (results && results.length > 6)
            return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]), parseInt(results[5]), parseInt(results[6]));
        results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
        if (results && results.length > 7)
            return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]), parseInt(results[5]), parseInt(results[6]), parseInt(results[7]));
    };

    getNowDateString() {

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + '-' + month + '-' + day + '_' + hour + '-' + minute + '-' + second;

    }

    getDateDayString(date) {
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var str = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        //console.log("getDateDayString "+str);
        return str;

    };

    getMonthAndDayString(date) {
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var str = month + seperator1 + strDate;
        //console.log("getDateDayString "+str);
        return str;

    };



    getDateString(date,isDateOnly) {
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }

        var dateStr =  date.getFullYear() + seperator1 + month + seperator1 + strDate;

        if(!isDateOnly){
            var hours = date.getHours();
            hours = hours < 10 ? "0" + hours : hours;
            var mins = date.getMinutes();
            mins = mins < 10 ? "0" + mins : mins;
            var sec = date.getSeconds();
            sec = sec < 10 ? "0" + sec : sec;

            dateStr += " " + hours + seperator2 + mins + seperator2 + sec;
        }

        return dateStr;

    };

    getDateStringFromUTC(utcStr,isDateOnly) {
        //console.log("getDateStringFromUTC ",utcStr);
        //utcStr = utcStr.toString();
        //if(utcStr && utcStr.indexOf("T")>0 && utcStr.indexOf("Z")>0){
            var isDateOnly = isDateOnly || false;
            var ds = this.getDateString(new Date(utcStr),isDateOnly);
            if (ds.indexOf('NaN') >= 0) {
                return "";
            }
            else {
                return ds;
            }
        //}
        //else{
        //    return utcStr;
        //}

    };

    getStdMainImgUrl(url,platform){//返回标准主图格式  800x800
        var url = url || "";
        //console.log("getStdMainImgUrl ",url);
        var platform = platform || "TM";
        if(url.indexOf("suning.cn")>0){
            platform ='SN';
        }
        else if(url.indexOf("360buyimg.com")>0){
            platform ='JD';
        }
        else if(url.indexOf("alicdn.com")>0){
            platform ='TM';
        }
        else if(url.indexOf("nos.netease.com")>0){
            platform ='KAOLA';
        }

        if (platform === "JD") {
            url = url.replace(/\/n[1-9]\/jfs/g, '/imgzone/jfs');
        }
        else if (platform === "TM" || platform === "TB") {
            var re = new RegExp("_[1-9]{1}[0-9]{1,3}x[1-9]{1}[0-9]{1,3}");
            if (url.search(re) > 0) {
                url = url.replace(re, "_800x800")
            }            
        }
        else if(platform =='SN'){
            url=url.replace(re,"_800x800");
        }
        else if(platform =='3E3E'){
            url="http://we-create-cdn.oss-cn-hangzhou.aliyuncs.com/blank.png";
        }
        if (platform === "KAOLA") {
            if(url.indexOf('?imageView')<0){
                url=url+"?imageView&thumbnail=800x0&quality=85";
            }
        }

        var picUrl = this.fixUrl(url);
        return picUrl;
    }

    getBigPicUrl(small, platform, bigSize) {

        if(typeof small !='string'){
            return "";
        }

        //console.log("getBigPicUrl ",small,(platform),bigSize)
        var small = small || "";
        var bigPicUrl = small||"";
        var platform = platform || "TM";
        var bigSize = bigSize || '_400x400';
        //console.log("getBigPicUrl 222222222222",bigPicUrl,(platform),bigSize)

        if(small.indexOf("suning.cn")>0){
            platform ='SN';
        }

        var jdImgzoneReg = new RegExp("360buyimg\\.com");

        if (platform === "JD" || bigPicUrl.search(jdImgzoneReg) > 0) {
            if(bigSize==null || bigSize=='' || bigSize== '_400x400' ){
                bigPicUrl = bigPicUrl.replace(/\/imgzone\/jfs/g, '/n1/jfs');
            }
            else{
                bigPicUrl = bigPicUrl.replace(/\/imgzone\/jfs/g, '/'+bigSize+'/jfs');
            }
            //console.log("bigPicUrl",bigPicUrl);
        }
        else if (platform === "TM" || platform === "TB") {

            var re = new RegExp("_[1-9]{1}[0-9]{1,3}x[1-9]{1}[0-9]{1,3}");
            if (bigPicUrl.search(re) > 0) {
                bigPicUrl = bigPicUrl.replace(re, bigSize)
                return bigPicUrl;
            }
            else if(bigPicUrl.indexOf("spaceball.gif")>0){
                return bigPicUrl;
            }
            else if(bigPicUrl.indexOf("_q90.")>0){
                bigPicUrl = bigPicUrl.replace("_q90.", bigSize+"q90.");
            }
            else {
                bigPicUrl += bigSize + ".jpg"
            }

        }
        else if(platform =='SN'){
            bigPicUrl=bigPicUrl.replace("_800x800","_400x400").replace("_800w_800h","_400w_400h");
        }
        else if(platform =='3E3E'){
            bigPicUrl="http://we-create-cdn.oss-cn-hangzhou.aliyuncs.com/blank.png";
        }



        // if (platform === "TM" || platform === "TB") {
        //     if (small.indexOf('_60x60')) {
        //         bigPicUrl = small.replace('_60x60', bigSize);
        //     }
        // } else if (platform === "JD") {
        //     bigPicUrl = small.replace(/\/n[0-9]\/jfs/g, '/n1/jfs');
        // }

        var picUrl = this.fixUrl(bigPicUrl);
        //this.debugLog("platform: ",platform," getBigPicUrl: ",picUrl);
        return picUrl;
    };

    getMainImgURL(mainPic, platform) {
        var tmp = [];
        tmp.push(mainPic);
        return this.getMainImgSrc(tmp, platform);
    };
    getSNMainImgSrc(url) {
        if (url) {
            url = url.replace("_800w_800h", '_200w_200h');
        }
        return url;
    };

    getJDMainImgSrc(url,format) {
        if(typeof url =='string'){
            //var url=url.toString||"";
            var format = format||"n3";
            if (url) {
                url = url.replace(/\/(imgzone|popWareDetail)\/jfs/g, '/'+format+'/jfs').replace(/http:/g, 'https:');
            }
            return url;
        }
        else{
            return "";
        }
    };
    getMainImgSrc(mainPics, platform) {

        var mainPics = mainPics;
        var defaultPic = 'http://we-create-cdn.oss-cn-hangzhou.aliyuncs.com/blank.png#';
        var mainPicUrl = defaultPic;
        
        if (mainPics != undefined && mainPics.length > 0) {
            mainPicUrl = mainPics[0]||defaultPic;
        }

        if(mainPicUrl.indexOf("suning.cn")>0){
            platform ='SN';
        }

        
        var url = this.fixUrl(mainPicUrl);
        //url = url.replace("_800x800.jpg","");

        var jdImgzoneReg = new RegExp("360buyimg\\.com");

        if (platform === "JD" || url.search(jdImgzoneReg) > 0) {
            url = url.replace(/\/(imgzone|popWareDetail)\/jfs/g, '/n3/jfs');
        }
        else if (platform === "TM" || platform === "TB") {

            var re = new RegExp("[1-9]{1}[0-9]{1,3}x[1-9]{1}[0-9]{1,3}");
            if (url.search(re) > 0) {
                //console.log("xxXxx getMainImgSrc: ",url);
                return url;
            }
            else {
                url += "_60x60q9.jpg"
            }
        }
        else if(platform == 'SN'){
            url=url.replace("_800x800","_100x100").replace("_800w_800h","_100w_100h")
        }
        else if(platform =='3E3E' && mainPicUrl.indexOf('ximgs.net')>0){
            url="http://we-create-cdn.oss-cn-hangzhou.aliyuncs.com/blank.png";
        }
        //console.log("platform: ",platform," getMainImgSrc: ",url);
        return url;

    };

    stringArrToNumArray(strArr){
        var nums = [];
        for(var i in strArr){
            nums.push(Number(strArr[i]));
        }
        return nums;
    };

    fixUrl(url) {
        if(!url){
            return "";
        }
        if (url.indexOf("http") < 0) {
            if (url.indexOf("//") != 0) {
                url = "https://" + url
            } else {
                url = "https:" + url;
            }
        }

        url=url.replace("////","//");

        return url;

    };

    IsURL(str_url) { 
        var strRegex = '^((https|http)?://)?([0-9a-z_\.]+)\.(jd.com|suning.com)[^\s]*';
        var re=new RegExp(strRegex); 
            if (re.test(str_url)) { 
                return (true); 
            } else { 
                return (false); 
            } 
    };

    stripHTML(s) {
        var reTag = /<(?:.|\s)*?>/g;
        return s.replace(reTag,"");
    };

    getBatterDateTimeFromTs(ts) {
        if (ts != undefined) {
            var newDate = new Date();
            newDate.setTime(ts);
            return this.getBetterDatetime(newDate);
        } else {
            return "";
        }
    };
    getDateTimeFromTs(ts) {
        if (ts != undefined) {
            var newDate = new Date();
            newDate.setTime(ts);
            return this.getDateString(newDate);
        } else {
            return "";
        }
    };

    getBatterSize(size){
        if(size){
             if(size<1024){
                 return size+' B';
             }
             else if(size>1024 && size<1024*1024)
             {
                 return Math.round(size/1024)+' KB';
             }
            else if(size> (1024*1024))
            {
                 return Math.round(size/(1024*1024))+' MB';
            }
        }
        else{
            return "";
        }
    };

    getDateFromeTs(ts) {
        if (ts != undefined) {
            var newDate = new Date();
            newDate.setTime(ts);
            //console.log("getDateTimeTs");
            return this.getDateDayString(newDate);

        } else {
            return "";
        }
    };

    updateObject(from, to) {
        for (var k in from) {
            //console.log("updateObject from key:",k," v:",from[k]);
            to[k] = from[k];
            //console.log("updateObject to key:",k," v:",to[k]);
        }
        //console.log("after updateObject: ",JSON.stringify(to));
    };

    parseURL2(url) {
        //var pattern = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");


        if (!url) {
            return "";
        }

        var pattern = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");

        var matches = url.match(pattern);
        //this.debugLog("matches", matches);
        // return {
        //     protocol: matches[2],
        //     host: matches[4],
        //     path: matches[5],
        //     query: matches[7],
        //     fragment: matches[9]
        // };
        return {
            protocol: matches[2],
            host: matches[4]
        };
    };
    inputKeyword(val,Maxkeyword){
    let len = val.replace(/；/g,';').split(';').length;
    val = val.replace(/；/g,';');
      if(len>Maxkeyword){
        return sliceStr(val,';',Maxkeyword);
      }
      return val;
        function sliceStr(str,cha,num){
          var x=str.indexOf(cha);
            num = num -1 ;
          for(var i=0;i<num;i++){
              x=str.indexOf(cha,x+1);
          }
          return str.slice(0,x);
        }
    }
    indexOf(array, val) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == val) return i;
        }
        return -1;
    };
    includes(arr1, arr2,key) {//判断数组arr2的值是否都在在arr1中
        return arr2.every((item,j) =>{
            let itemStatus = ((arr,value)=>{
                    for(var i = 0; i < arr.length; i++){
                        if(value === arr[i]){
                            return true;
                        }
                    }
                    return false;
                })(arr1,item[key])
            return itemStatus;
        });
    }
    remove(array, val) {
        var index = this.indexOf(array, val);
        if (index > -1) {
            array.splice(index, 1);
            return true
        }
        else {
            return false
        }
    };

    push(array, val) {
        var index = this.indexOf(array, val);
        if (index > -1) {
            return false
        }
        else {
            array.push(val);
        }
    };

    //这个函数只适用于数组里面是Number或者String类型的，如果是对象类型则不适合
    merge(array1, array2) {

        var l1 = array1.length;
        var l2 = array2.length;

        var map = {};

        var mapArray = l1 > l2 ? array1 : array2;
        var addArray = l1 > l2 ? array2 : array1;

        for (var i in mapArray) {
            var v = mapArray[i] + "";
            map[v] = "1";
        }


        for (var i in addArray) {
            var v = addArray[i] + "";
            if (map[v] === undefined) {
                mapArray.push(v);
            }
        }

        return mapArray;

    };

    shouldShift(n, len) {
        var b = (n + 3 >= len) && len > 5;
        return b;
    };

    isColorCode(s){

        var regexp = new RegExp("^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$");
        
        if ((s + '').search(regexp) == -1) {
            return false;
        } else {
            return true;
        }

    };
    getPostersHtml(posters){

        if(!posters){
            return "";
        }
        var html="";
        for(var i in posters){
            var p = posters[i];
            //console.log("poster data",p);
            var mapAreas = p.mapAreas;
            var map = null;
            var mapName = null;
            if(mapAreas!=undefined && mapAreas.length>0){
                mapName = "map"+i;
                map = '<map id="'+mapName+'" name="'+mapName+'">';
                for(var j in mapAreas){
                   var mapArea = mapAreas[j];
                   var x1 = Number(mapArea.left);
                   var y1 = Number(mapArea.top);
                   var x2 = Number(mapArea.left)+Number(mapArea.width);
                   var y2 = Number(mapArea.top)+Number(mapArea.height);

                   map+='<area shape="rect"   coords="'+x1+','+y1+','+x2+','+y2+'" href="'+mapArea.link+'" target="_blank">';
                }
                map+='</map>';
            }

            if(map ==null){
                html+="<div name='mzuan-poster-"+p.posterId+"'>";
                if(p.link && p.link!="" && p.link!="#"){
                    html+="<a href='"+p.link+"' target='_blank'>";
                }
                html+="<img src='"+p.imgUrl+"' style='width:"+p.width+"px' />";
                if(p.link && p.link!="" && p.link!="#"){
                    html+="</a>"
                }
                html+="</div>";
            }
            else{                
                html+="<div name='mzuan-poster-"+p.posterId+"'>";
                if(p.link && p.link!="" && p.link!="#"){
                    html+="<a href='"+p.link+"' target='_blank'>";
                }
                html+="<img src='"+p.imgUrl+"' style='width:"+p.width+"px' usemap='#"+mapName+"' />"+map;
                if(p.link && p.link!="" && p.link!="#"){
                    html+="</a>"
                }
                html+="</div>";             
            }
        }

        console.log("poster html\n"+html);
        return html;

    };

    getTemplatePreview(tpl,showItems,nohref) {

        if(!tpl){
            return "";
        }

        var frame = tpl.frame || "";
        var itemTemplate = tpl.item || "";
        var data = tpl.data || {};

        var templateHtml = frame;
        var itemListHtml = "";

        for (var pName in data) {

            if (pName != 'items') {
                var pValue = data[pName];
                //console.log(pName,pValue);
                templateHtml = templateHtml.replace(new RegExp('\\$' + pName + '\\$', 'g'), pValue);
                itemTemplate = itemTemplate.replace(new RegExp('\\$' + pName + '\\$', 'g'), pValue);
            }
        }

        var items = showItems||data.items;
        var nohref= nohref||false;
        for (var i in items) {
            var itm = items[i];
            //console.log("itm",itm);
            var thisItemHtml = this.cloneJSON(itemTemplate);
            for (var itemParaName in itm) {
                var itemParaValue = itm[itemParaName];
                //itemParaValue = itemParaValue.trim();
                thisItemHtml = thisItemHtml.replace(new RegExp('\\$' + itemParaName + '\\$', 'g'), itemParaValue);
            }
            itemListHtml += thisItemHtml;
        }

        templateHtml = templateHtml.replace(new RegExp('\\$itemList\\$', 'g'), itemListHtml);

        
       
        if(nohref){
            templateHtml = templateHtml.replace(new RegExp('href=', 'g'),"xhref=");
        }

        return templateHtml;
    };

    isEmptyObject(e) {  
        if(!e){
            return true;
        }

        var t;  
        for (t in e)  
            return !1;  
        return !0  
    };
    
    colorRGB2Hex(color) {
        if(!color){
            return "";
        }
        var rgb = color.split(',');
        var r = parseInt(rgb[0].split('(')[1]);
        var g = parseInt(rgb[1]);
        var b = parseInt(rgb[2].split(')')[0]);
     
        var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return hex.toUpperCase();
     };


     makeSnItemUrl(shop_id,item_id){
        return "https://product.suning.com/00"+shop_id+"/"+item_id+".html";
     };

     makeJdItemUrl(ware){
         if(ware && ware.skuIds && ware.skuIds.length>0){
            return "https://item.jd.com/"+ware.skuIds[0]+".html";
         }
         else{
             return "http://www.jd.com";
         }
     };

     getSnSmallImg(imgurl){
        if(imgurl){
            return imgurl.replace("800x800","100x100").replace("_800w_800h","_100w_100h").replace("_x.jpg","_100x100.jpg");
        }
        else{
            return "http://we-create-cdn.oss-cn-hangzhou.aliyuncs.com/blank.png";
        }
     };

     getSnImageByWidth(imgurl,width){
        if(imgurl){
            var width = width|| 100;
            return imgurl.replace("800x800",width+"x"+width).replace("_800w_800h","_"+width+"w_"+width+"h").replace("_x.jpg","_"+width+"x"+width+".jpg");
        }
        else{
            return "http://we-create-cdn.oss-cn-hangzhou.aliyuncs.com/blank.png";
        }
     };

     getSnMinMaxPrice(ware){
        const MAX = 99999999;
        var minPrice = MAX;
        var maxPrice = 0; 
        if(ware.childItemdetailQueries && ware.childItemdetailQueries.length>0){
            for(var i in ware.childItemdetailQueries){
                var priceStr = ware.childItemdetailQueries[i].price;
                var p = Number(priceStr);

                if(p>maxPrice){
                    maxPrice=p;
                }
                if(p<minPrice){
                    minPrice=p;
                }
            }
        }
        else if(ware.price){
            minPrice = ware.price;
            maxPrice = ware.price;
        }
        else{
            minPrice = -1;
            maxPrice = -1;
        }

        var min_max = [];
        min_max.push(minPrice);
        min_max.push(maxPrice);

        return min_max;

     }

     getSnPrices(ware){
        const MAX = 99999999;
        var minPrice = MAX;
        var maxPrice = 0; 
        if(ware.childItemdetailQueries && ware.childItemdetailQueries.length>0){
            for(var i in ware.childItemdetailQueries){
                var priceStr = ware.childItemdetailQueries[i].price;
                var p = Number(priceStr);

                if(p>maxPrice){
                    maxPrice=p;
                }
                if(p<minPrice){
                    minPrice=p;
                }
            }

            if(minPrice==maxPrice || minPrice==MAX){
                return "¥ "+maxPrice;
            }
            else{
                return "¥ "+minPrice +" ~ " + maxPrice;
            }
        }
        else if(ware.price){
            return "¥ "+ware.price;
        }
        else{
            return "-"
        }
    };

    getSnStocks(ware){
        var stock=0;
        if(ware.childItemdetailQueries && ware.childItemdetailQueries.length>0){
            for(var i in ware.childItemdetailQueries){
                var str = ware.childItemdetailQueries[i].invQty+"";
                var s = Number(str);
                stock+=s
            }
            return stock;
        }
        else if(ware.invQty){
            return ware.invQty;
        }
        else{
            return "-"
        }
    };

    openSourceLink(url) {
        if (url != undefined && url != "") {
            var targetUrl = this.fixUrl(url);
            window.open(targetUrl);
        }
    };

    getApproxNumK(n){

        var num = this.getApproxNum(n);
        if(num!=""){
            return "("+num+")";
        }
        else{
            return ""
        }
        
    }
    getApproxNum(n){
        
        if(n==undefined || n==null || !this.isLongNumber(n)){
            return ""
        }

        if(n<=10){
            return n;
        }
        else if(n>10 && n<100){
            var tt =  Math.floor(n / 10);
            return tt+"0+";
        }
        else{
            var ht =  Math.floor(n / 100);
            return ht+"00+";
        }        
    }

    parseDom(arg) {
        　　 var objE = document.createElement("div");
        　　 objE.innerHTML = arg;
        　　 return objE;
    }

    getOriginalShopId(shopId){
        if(shopId>900000000){
            return shopId-900000000;
        }
        else{
            return shopId;
        }
    }

}

//module.exports = new Utils();
export default new Utils();
