const util = require('../../../utils/format.js')

Page({
  data: {
    catList: [],
    postList: [],
    metaList:[],
    currentIdx: 0,
    actStyle:{
      left: 0,
      width: 200
    },
    isLoaded: false,
  },

  onLoad: function(options) {
    let _self = this

    const promise1 = new Promise(function(resolve, reject){
      wx.request({
        url: 'https://api.kapeter.com/category', 
        success: function(res) {
          _self.setData({
            catList: res.data.data
          }) 
          resolve();
        }
      })
    }); 

    const promise2 = new Promise(function(resolve, reject){
      wx.request({
        url: 'https://api.kapeter.com/post', 
        data: { 
          per_page: 10, 
          category: 0, 
          page: 1 
        },
        success: function(res) {
          _self.setData({
            "postList[0]": util.format(res.data.data),
            "metaList[0]": res.data.meta.pagination,
            "metaList[0].category": 0
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
  // 改变栏目
  changeCat({currentTarget}){
    let _self = this;
    let idx = currentTarget.dataset.index;
    let catId = currentTarget.dataset.cat;
    let postList = _self.data.postList;
    _self.setData({
      currentIdx: idx,
      "actStyle.left": currentTarget.offsetLeft
    });
    // 如果还没加载过该栏目的文章
    if (!postList[idx]){
      wx.request({
        url: 'https://api.kapeter.com/post', 
        data: { 
          per_page: 10, 
          category: catId, 
          page: 1 
        },
        success: function(res) {
          let param = {};
          param["postList[" + idx + "]"] =  util.format(res.data.data);
          param["metaList[" + idx + "]"] = res.data.meta.pagination;
          param["metaList[" + idx + "].category"] = catId;
          _self.setData(param);
        }
      });      
    }
  },

  loadData({currentTarget}){
    let _self = this;
    let idx = currentTarget.dataset.index;
    let metaList = _self.data.metaList;
    wx.request({
      url: 'https://api.kapeter.com/post', 
      data: { 
        per_page: metaList[idx].per_page, 
        category: metaList[idx].category, 
        page: metaList[idx].current_page + 1
      },
      success: function(res) {
        let param = {};
        let newList = util.format(res.data.data)
        param["postList[" + idx + "]"] = _self.data.postList[idx].concat(newList);
        param["metaList[" + idx + "].current_page"] = res.data.meta.pagination.current_page;
        _self.setData(param);
      }
    });    
  }
})
