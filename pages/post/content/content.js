const WxParse = require('../../../wxParse/wxParse.js')
const marked  = require('../../../utils/marked.js')

Page({
  data: {
    thePost: {}
  },
  onLoad: function (options) {
    let _self = this
    let id = options.id;
    wx.request({
      url: 'https://api.kapeter.com/post/' + id, 
      success: function(res) {
        _self.setData({
          thePost: res.data.data
        }) 

        let html = marked(res.data.data.content)
        WxParse.wxParse('content', 'html', html, _self, 5);

        wx.setNavigationBarTitle({
          title: res.data.data.title
        })
      }
    })
  },

})
