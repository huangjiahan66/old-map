import {classicBeh} from '../classic-beh'
let  mMgr =  wx.getBackgroundAudioManager()  //音乐管理对象
Component({

  properties: {
    //  img:String,
    //  content:String
    src:String,
    title:String
  },
  behaviors:[classicBeh],
  /**
   * 组件的初始数据
   */
  data: {
    playing:false, // 默认不播放
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },
  detached(){
    // mMgr.stop()
  },
  attached:function(){ 
     this._recoverStatus()
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(){
      if(!this.data.playing){
        this.setData({
          playing:true
        })
         mMgr.title = this.properties.title 
         mMgr.src=this.properties.src
      }else{
        this.setData({
          playing:false
        })
        mMgr.pause()
      }
    },

    _recoverStatus:function(){
      if(mMgr.paused){
        this.setData({
          playing:false
        })
        return
      }
      if(mMgr.src==this.properties.src){
        console.log(mMgr.src=this.properties.src);
        this.setData({
          playing:true
        })
      }
    },

    _moniorSwitch(){
      //todo ....
      mMgr.onPlay(()=>{
       this._recoverStatus()
      })
      mMgr.onPause(()=>{
        this._recoverStatus()
      })
      mMgr.onStop(()=>{
        this._recoverStatus()
      })
      mMgr.onEnded (()=>{
        this._recoverStatus()
      })
    }



  }
})
