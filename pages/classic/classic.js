import { ClassIcModel } from "../../models/classic";
import { LikeModel } from "../../models/like";
let ClassIcModal = new ClassIcModel();
let LikeModal= new LikeModel()
Page({
  data: {
    classic:null,
    latest:true,   //左边箭头
    first:false,  // 右边箭头
    likeCount:0,
    likeStatus:false // 喜欢的状态
  },
  onLoad(options) {
    ClassIcModal.getLatest((res)=>{
      this.setData({
        classic:res,
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    });
  },
  onLike:function(event){
      let behavior=event.detail.behavior
      LikeModal.Like(behavior,this.data.classic.id,this.data.classic.type)
  },

  onNext:function(){
    this._updateClassic('next')
  },
  onPrevious:function(){
    this._updateClassic('previous')
  },

  _updateClassic(nextOrPrevious){
    let index=this.data.classic.index
    ClassIcModal.getClassic(index,nextOrPrevious,(res)=>{
       this.setData({
         classic:res,
         latest:ClassIcModal.isLatest(res.index),
         first:ClassIcModal.isFirst(res.index)
       })
    })
  },

  _getLikeStatus:function(artID,category){
    LikeModal.getClassicLikeStatus(artID,category,(res)=>{
      this.setData({
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
  }
});
