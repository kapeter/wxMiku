Page({
  data: {
    catList: [],
    postList: [],
    currentIdx: -1,
    actStyle:{
      left: 0,
      width: 200
    }
  },
  onLoad: function () {
    let _self = this

    wx.request({
      url: 'https://api.kapeter.com/category', 
      success: function(res) {
        _self.setData({
          catList: res.data.data
        }) 
      }
    })

    wx.request({
      url: 'https://api.kapeter.com/post', 
      data: { 
        per_page: 10, 
        category: 0, 
        filter: '', 
        page: 1 
      },
      success: function(res) {
        _self.setData({
          "postList[0]": res.data.data
        }) 
      }
    })
  },
  
  changeCat({currentTarget}){
    let _self = this;
    _self.setData({
      currentIdx: currentTarget.dataset.id,
      "actStyle.left": currentTarget.offsetLeft
    }) 
  }
})
