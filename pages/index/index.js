const util = require('../../utils/format.js')

Page({
  data: {
    postItems: [],
    bannerItems: [],
    isLoaded: false
  },
  onLoad: function(options) {
    let _self = this

    const promise1 = new Promise(function(resolve, reject){
      wx.request({
        url: 'https://api.kapeter.com/post', //仅为示例，并非真实的接口地址
        data: {
          per_page: 3, 
          recommend: 0
        },
        success: function(res) {
          _self.setData({
            bannerItems: res.data.data
          }) 
          resolve();
        }
      })
    }); 

    const promise2 = new Promise(function(resolve, reject){
      wx.request({
        url: 'https://api.kapeter.com/post', //仅为示例，并非真实的接口地址
        data: {
          per_page: 6,
          sort: 'published_at|desc'
        },
        success: function(res) {
          _self.setData({
            postItems: util.format(res.data.data)
          }) 
          resolve();
        }
      });
    });    

    Promise.all([promise1, promise2]).then(() => {
      _self.setData({
        isLoaded: true
      })
    })
  },
})
