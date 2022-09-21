import {BookModel} from '../../models/book'
import {random} from '../../util/common'
const bookModel=new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searching:false,
    more:'' //默认不需要加载更多数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    bookModel.getHotList().then(res=>{
      this.setData({
        books:res
      })
    })
   
  },
  onSearching(){
    this.setData({
      searching:true
    })
  },
  onCancel(){
    this.setData({
      searching:false
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.setData({
      more:random(16)
    })
  },


})