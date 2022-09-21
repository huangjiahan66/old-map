import { HTTP } from "../util/http-p"

class KeywordModel extends HTTP{
  key='q'
  maxLength=10
  // 获取历史搜索
  getHistory(){
    const words=wx.getStorageSync(this.key)
    if(!words){
      return []
    }
    return words
  }
  // 获取热门搜索接口
  getHot(){
     return this.request({
       url:'book/hot_keyword'
     })
  }
  // 关键字写入缓存
  addToHistory(keyword){
    let words=this.getHistory()
    const has=words.includes(keyword)
    // 如果不存在
    if(!has){
      const length=words.length
      if(length>=this.maxLength){
        words.pop()
      }
      words.unshift(keyword) 
      wx.setStorageSync(this.key, words)
    }

  }
}

export {
  KeywordModel
}