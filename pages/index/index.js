//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    postItems: [],
    bannerItems: []
  },
  onLoad: function(options) {
    let _self = this
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
      }
    })
    wx.request({
      url: 'https://api.kapeter.com/post', //仅为示例，并非真实的接口地址
      data: {
        per_page: 6,
        sort: 'published_at|desc'
      },
      success: function(res) {
        _self.setData({
          postItems: res.data.data
        }) 
      }
    })    
  },
})
