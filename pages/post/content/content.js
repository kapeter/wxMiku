const WxParse = require('../../../wxParse/wxParse.js')
const marked  = require('../../../utils/marked.js')

Page({
  data: {
    thePost: {},
    isLoaded: false,
  },
  onLoad: function (options) {
    let _self = this
    let id = options.id;
    wx.request({
      url: 'https://api.kapeter.com/post/' + id, 
      success: function(res) {
        let postData = res.data.data;
        postData.published_at.date = postData.published_at.date.slice(0, 19);
        _self.setData({
          thePost: postData,
          isLoaded: true
        }) 

        let html = marked(postData.content)
        WxParse.wxParse('content', 'html', html, _self, 5);

        wx.setNavigationBarTitle({
          title: postData.title
        })
      }
    })
  },

})
