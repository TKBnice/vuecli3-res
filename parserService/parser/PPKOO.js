class ParserPPKOO {
  constructor($) {
    this.data = {
      items: [],
      pageSize: 20,
      maxPageNum: 0,
      titleFromHtml: '',
      spuPrice: '',
      spuOriginalPrice: ''
    };
    this.parsePageItems($)
    this.parseTitleFromHtml($)
    this.parseItemInfo($)
  }
  parsePageItems($) {
    var page = 1;
    $('.pk_main_warp .pk_search').find('.pk_sk_f2 .pk_sk_con .pk_sk_item').each((i, elem) => {
      var title = $(elem).find('.pk_sk_item01>a').attr('title');
      var itemUrl = $(elem).find('.pk_sk_item01>a').attr('href');
      var imgUrl = $(elem).find('.pk_sk_item01 a>img').attr('src');
      var price = $(elem).find('.pk_sk_item02 .pk_sk_item02_lt').text().replace(/\s/g, '').replace('￥', '');
      var skuId = $(elem).attr('item_id');
      var it = {
        itemUrl,
        title,
        imgUrl,
        price,
        skuId
      };
      this.data.items.push(it);

    })

    page = $('.pk_main_warp').find('.pager>span').last().text().replace(/[^0-9]/ig, "");

    this.data.maxPageNum = page;

  }
  parseTitleFromHtml($) {

    var title = $(".pk_main_warp .con_box .con_box_rt>h3").text().replace(/\s/g, '');

    title = title.replace(/[-\(（【\[ ]*(特P|P|不低于|控|控价)[0-9]+[\)\]】） ]*/g, "")

    this.data.titleFromHtml = title;

    //  console.log('data.titleFromHtml----------',data.titleFromHtml)
  }
  parseItemInfo($) {

    var spuOriginalPrice = $("#js-price").text().replace(/\s/g, '').split('-')[1];

    this.data.spuPrice = spuOriginalPrice;

    this.data.spuOriginalPrice = spuOriginalPrice;

    $('.cons_main_rt .cons_main_rt_c .info').find('>li').each(function (i, elem) {

      if ($(this).text().trim() != '') {
        var att = $(this).text().trim().replace(":", "：");
        this.data.addtionalAttrs.push(att);
        if (att.indexOf("货号") >= 0 || att.indexOf("款号") >= 0) {
          var goodsId = att.replace("货号", "").replace("款号", "").replace("：", "");
          this.data.goodsId = goodsId;
        }
      }
    });

  }
  getUrlParam(param, url) {
    var theRequest = new Object();
    if (!url) return theRequest;
    if (url.indexOf("?") !== -1) {
      var urlBefore = url.substring(0, url.indexOf("?"))
      var str = url.substr(url.indexOf("?") + 1) + "&";
      var strs = str.split("&");
      for (var i = 0; i < strs.length - 1; i++) {
        var key = strs[i].substring(0, strs[i].indexOf("="));
        var val = strs[i].substring(strs[i].indexOf("=") + 1);
        theRequest[key] = val;
      }
    }
    return theRequest[param];
  }
}

export default ParserPPKOO;