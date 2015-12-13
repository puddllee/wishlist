var amazon = Meteor.npmRequire('amazon-product-api');
var Fiber = Meteor.npmRequire('fibers');

var client = amazon.createClient({
  awsId: AMAZON_ID,
  awsSecret: AMAZON_SECRET,
  awsTag: "Wish List"
});

AMAZON = {
  productForURL: function(url) {
    var asin = validateAmazonURL(url);
    if (asin) {
      asin = asin.trim();
      console.log('looking up amazon id: ' + asin);

      var lookup = Meteor.wrapAsync(client.itemLookup);
      var result = lookup({
        IdType: 'ASIN',
        itemId: asin,
        responseGroup: 'ItemAttributes,Offers,Images'
      });
      return result;
    } else {
      // not a amazon url
      return 'Not an amazon url';
    }
  }
}

Meteor.methods(AMAZON);
