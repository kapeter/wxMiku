//index.js
//获取应用实例
var app = getApp();

Page({
  data: {
    userInfo: null,
    errorText: '',
    email: '',
    subject: '',
    content: ''
  },
  onLoad: function () {
    let _self = this;
    if (app.globalData.userInfo != null){
      _self.setData({
        userInfo: app.globalData.userInfo,
      })      
    }else{
      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          _self.setData({
            userInfo: res.userInfo,
          }) 
        }
      })      
    }
  },
  formSubmit: function({detail}){
    let _self = this;
  	let vals = detail.value;
  	let errorText = '';

  	for (let x in vals){
  		if (vals[x] == ''){
  			switch(x){
  				case 'email':
  					errorText = '邮箱地址不能为空';
  					break;
  				case 'subject':
  					errorText = '邮件主题不能为空';
  					break;
  				case 'content':
  					errorText = '邮件内容不能为空';
  					break; 
  			}
        break;
  		}

  	}

  	let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z0-9_-])+/;
  	if (errorText == '' && !reg.test(vals.email)){
  		errorText = '邮箱格式错误';
  	}

  	if (errorText == '') {
      vals.name = _self.data.userInfo.nickName;
  		wx.request({
  			url: 'https://api.kapeter.com/mail/send',
  			method: 'POST',
        data: vals,
  			success: function(res){
  				if ('code' in res.data && res.data.code == 10000) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1500
            });     
            _self.setData({
              email: '',
              subject: '',
              content: '',
              errorText: ''
            })            	
        	}else{
            _self.setData({
              errorText: res.data.message
            }) 
        	}
          _self.setData({
            errorText: errorText
          })          
  			}
  		})   
  	}else{
  		_self.setData({
  			errorText: errorText
  		})
  	}
  },

  formReset: function() {
    let _self = this;
    _self.setData({
      errorText: ''
    })    
  }
})
