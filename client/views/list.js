var yourList = [{
  title: 'Product Title',
  url: 'http://puddllee.io',
  seller: 'Walmart',
  detail: 'This is some detail about the product',
  image: 'https://store.storeimages.cdn-apple.com/4876/as-images.apple.com/is/image/AppleInc/aos/published/images/M/KX/MKXJ2/MKXJ2?wid=445&hei=445&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1441818627105',
  price: '$40',
  bought: false,
  bought_user: 'Jake',
  type: 'text'
}, {
  title: 'Another Title',
  url: 'http://puddllee.io',
  seller: 'Walmart',
  detail: 'This is some detail about the product',
  image: 'https://store.storeimages.cdn-apple.com/4876/as-images.apple.com/is/image/AppleInc/aos/published/images/M/KX/MKXJ2/MKXJ2?wid=445&hei=445&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1441818627105',
  price: '$40',
  bought: false,
  bought_user: 'Jake',
  type: 'text'
}, {
  title: 'Product Title',
  url: 'http://puddllee.io',
  seller: 'Walmart',
  detail: 'This is some detail about the product',
  image: 'https://store.storeimages.cdn-apple.com/4876/as-images.apple.com/is/image/AppleInc/aos/published/images/M/KX/MKXJ2/MKXJ2?wid=445&hei=445&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1441818627105',
  price: '$40',
  bought: false,
  bought_user: 'Jake',
  type: 'text'
}, {
  title: 'Product Title',
  url: 'http://puddllee.io',
  seller: 'Walmart',
  detail: 'This is some detail about the product',
  image: 'https://store.storeimages.cdn-apple.com/4876/as-images.apple.com/is/image/AppleInc/aos/published/images/M/KX/MKXJ2/MKXJ2?wid=445&hei=445&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1441818627105',
  price: '$40',
  bought: false,
  bought_user: 'Jake',
  type: 'text'
}, {
  title: 'Product Title',
  url: 'http://puddllee.io',
  seller: 'Walmart',
  detail: 'This is some detail about the product',
  image: 'https://store.storeimages.cdn-apple.com/4876/as-images.apple.com/is/image/AppleInc/aos/published/images/M/KX/MKXJ2/MKXJ2?wid=445&hei=445&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1441818627105',
  price: '$40',
  bought: false,
  bought_user: 'Jake',
  type: 'text'
}, {
  title: 'Product Title',
  url: 'http://puddllee.io',
  seller: 'Walmart',
  detail: 'This is some detail about the product',
  image: 'https://store.storeimages.cdn-apple.com/4876/as-images.apple.com/is/image/AppleInc/aos/published/images/M/KX/MKXJ2/MKXJ2?wid=445&hei=445&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1441818627105',
  price: '$40',
  bought: false,
  bought_user: 'Jake',
  type: 'text'
}, {
  title: 'Product Title',
  url: 'http://puddllee.io',
  seller: 'Walmart',
  detail: 'This is some detail about the product',
  image: 'https://store.storeimages.cdn-apple.com/4876/as-images.apple.com/is/image/AppleInc/aos/published/images/M/KX/MKXJ2/MKXJ2?wid=445&hei=445&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1441818627105',
  price: '$40',
  bought: false,
  bought_user: 'Jake',
  type: 'text'
}];

var friendList = [{
  name: 'Jake',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}, {
  name: 'Jake',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}, {
  name: 'Jake',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}, {
  name: 'Jake',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}, {
  name: 'Jake',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}, {
  name: 'Jake',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}, {
  name: 'Jake',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}, {
  name: 'Jake',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}];

var SAVE_WAIT_TIME = 1000; // ms
var last_save;

Template.list.rendered = function() {
  Session.set('yourList', yourList);
  Session.set('friendList', friendList);
}

Template.list.events({});

Template.list.helpers({});
