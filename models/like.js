import { HTTP } from "../util/http.js";
class LikeModel extends HTTP {
  Like(behavior,artID,category) {
    let url=behavior=='like'?'like':'like/cancel'
    this.request({
      url: url,
      method: "post",
      data:{
        art_id:artID,
        type:category
      }
    })
  }

  getClassicLikeStatus(artID,category,sCallback){
    this.request({
      url:'classic/'+category+'/'+artID+'favor',
      success:sCallback
    })
  }
}

export { LikeModel };
