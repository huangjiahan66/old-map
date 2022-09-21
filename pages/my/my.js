import {BookModel} from '../../models/book'
import {ClassIcModel} from '../../models/classic'
const bookModel=new BookModel()
const classIcModel =new ClassIcModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized:false, // 是否授权
    userInfo:null,
    bookCount:0,
    classics:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     this.userAuthorized()
     this.getMyFavor()
     this.getMyBookCount()
  },
     // 弹出授权
  onGetUserInfo(e){
    wx.getUserProfile({
      lang: "zh_CN",
      // 这里的desc为必填项，如果你没填，那么会直接去执行fail
      desc: "获取登陆授权",
      success: (res)=> {
        console.log(res);
         this.setData({
          authorized:true,
          userInfo:res.userInfo
         })
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },
  // 判断用户是否授权
  userAuthorized(){
    wx.getSetting({
      success:data=>{
        if(data.authSetting['scope.userInfo']){
          console.log(data.authSetting['scope.userInfo']);
          this.onGetUserInfo()
        }else{
            console.log('err');
        }
     
      }
    })
  },
  getMyBookCount(){
    bookModel.getMyBookCount().then(res=>{
      this.setData({
        bookCount:res.count
      })
    })
  },
  getMyFavor(){
    classIcModel.getMyFavor(res=>{
        this.setData({
          classics:res
        })
    })
  },

  onJumpToAbout(){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onStudy(){
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})