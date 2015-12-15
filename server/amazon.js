var amazon = Meteor.npmRequire('amazon-product-api');
var aws = Meteor.npmRequire('aws-lib');
var Fiber = Meteor.npmRequire('fibers');

var client = amazon.createClient({
  awsId: AMAZON_ID,
  awsSecret: AMAZON_SECRET,
  // awsTag: "Wish List"
});

var prodAdv = aws.createProdAdvClient(AMAZON_ID, AMAZON_SECRET, AMAZON_TAG);

var FALLBACK_ERROR = 'AWS.ECommerceService.ItemNotAccessible';

var ALL_PRICE_REG = /Price: ([A-Z]+). ([0-9]+\.?[0-9]+)/g;
var PRICE_REG = /Price: ([A-Z]+). ([0-9]+\.?[0-9]+)/;

// tries to parse text and find price and offer price
var getPriceFromText = function(text) {
  var match = text.match(ALL_PRICE_REG);
  var price = '';
  if (match && match.length > 0) {
    var priceString = match[match.length - 1];
    match = priceString.match(PRICE_REG);
    if (match && match.length >= 2) {
      price = match[2] + ' ' + match[1];
    }
  }
  return price;
};

// finds first image in references and returns it
var getImageFromReferences = function(refs) {
  var image = '';
  for (var i = 0; i < refs.length; i++) {
    if (refs[i].indexOf('png') !== -1 || refs[i].indexOf('jpg') !== -1 || refs[i].indexOf('jpeg') !== -1) {
      image = refs[i];
      break;
    }
  }
  return image;
};

// returns amazon fallback information if result has errored
var amazonFallback = function(result, url) {
  if (result.Items.Request.Errors) {
    var websiteData = Scrape.website(url)
    var title = websiteData.description || websiteData.title || '';
    var detail = '';
    var image = websiteData.image || '';

    // parse title to remove 'Amazon.ca: Electronics' or ', Amazon.com'
    if (title.indexOf(',') !== -1) {
      title = title.split(',')[0];
    } else if (title.indexOf(':') !== -1) {
      title = title.split(':')[0];
    }

    price = getPriceFromText(websiteData.text);
    if (!image || image === '') {
      image = getImageFromReferences(websiteData.references);
    }
    return {
      url: url,
      name: title,
      detail: detail,
      image: image,
      price: price
    }
  } else {
    return null;
  }
};

AMAZON = {
  productForURL: function(url) {
    try {
      var asin = validateAmazonURL(url);
      if (asin) {
        asin = asin.trim();

        var lookup = Meteor.wrapAsync(prodAdv.call);
        var result = lookup('ItemLookup', {
          IdType: 'ASIN',
          ItemId: asin,
          ResponseGroup: 'Large'
        });
        var fallback = amazonFallback(result, url);
        if (fallback) {
          return fallback;
        } else {
          return result.Items;
        }
      } else {
        // not a amazon url
        return 'Not an amazon url';
      }
    } catch (err) {
      console.log(err);
      return 'Error';
    }
  }
};

Meteor.methods(AMAZON);

// Doesn't work
// http://www.amazon.ca/Conair-Super-Steam-Fabric-Steamer/dp/B00EALFJSI/ref=lp_12767015011_1_1?s=beauty&ie=UTF8&qid=1450028385&sr=1-1
// http://www.amazon.co.uk/gp/product/B00JG1OJB0/ref=br_asw_pdt-1?pf_rd_m=A3P5ROKL5A1OLE&pf_rd_s=desktop-3&pf_rd_r=04FJCQPWQ17E6QEN8JCB&pf_rd_t=36701&pf_rd_p=772971427&pf_rd_i=desktop
// http://www.amazon.co.uk/dp/B00KC6KMWI/ref=gw_comb_203556267_1?pf_rd_m=A3P5ROKL5A1OLE&pf_rd_s=desktop-hero-kindle-A&pf_rd_r=1NWW7SRMFXH56GSF0P8N&pf_rd_t=36701&pf_rd_p=781516727&pf_rd_i=desktop

// Works
// http://www.amazon.com/gp/product/B00TM7A4NA/ref=pd_lpo_sbs_dp_ss_1?pf_rd_p=1944687682&pf_rd_s=lpo-top-stripe-1&pf_rd_t=201&pf_rd_i=B00011V016&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=1S6V9PYF2GCTN3RK02EJ
// http://www.amazon.co.uk/gp/product/B00AU6DXFS/ref=br_asw_pdt-2?pf_rd_m=A3P5ROKL5A1OLE&pf_rd_s=desktop-2&pf_rd_r=0RRPTQ372WFWTE8BCZCN&pf_rd_t=36701&pf_rd_p=782747887&pf_rd_i=desktop
// http://www.amazon.co.uk/gp/product/B00P9PF3ZS/ref=br_asw_pdt-1?pf_rd_m=A3P5ROKL5A1OLE&pf_rd_s=desktop-6&pf_rd_r=0SYK4QMEPVWN98MN15V1&pf_rd_t=36701&pf_rd_p=757010267&pf_rd_i=desktop
