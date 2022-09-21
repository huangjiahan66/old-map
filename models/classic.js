import { HTTP } from "../util/http.js";
class ClassIcModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: "classic/latest",
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
        let key=this._getkey(res.index)
        wx.setStorageSync(key, res)
      },
    });
  }
  
  getMyFavor(success) {
    const params = {
        url: 'classic/favor',
        success: success
    }
    this.request(params)
}


  // 获取当前一期的上一期
  getClassic(index,nextOrPrevious,sCallback){
    // 缓存中查找 or api 写入到缓存中  
    let key=nextOrPrevious=='next'?this._getkey(index+1):this._getkey(index-1)

    let classic=wx.getStorageSync(key)  //每个期刊的数据
    if(!classic){
      this.request({
        url:'classic/'+index+'/'+nextOrPrevious,
           success: (res) => {
            //  数据写入缓存
              wx.setStorageSync(this._getkey(res.index), res)
              sCallback(res)
        },
      })
    }else {
      sCallback(classic)
    }
 
  }
  // 判断当前期刊是否为第一个
    isFirst(index){
      return index == 1 ? true :false
    }
  //判断当前期刊是否是最新的一期
  isLatest(index){
   let latestIndex=this._getLatestIndex()
   return latestIndex==index ? true :false
  }

  _setLatestIndex(index){
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex(){
   let index= wx.getStorageSync('latest')
   return index
  }

  _getkey(index){
    let key='classic-'+index
    return key

  }
}

export { ClassIcModel };
