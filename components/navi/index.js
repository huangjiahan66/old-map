// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String, //期刊标题
    first:Boolean,
    latest:Boolean  // 是否是最后一期
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft:function(){
      // 如果他不是最新的
      if(!this.properties.latest){
        this.triggerEvent('left')
      }

    },
    onRight:function(){
        // 如果不是第一期
      if(!this.properties.first){
        this.triggerEvent('right')
      }

    }
  }
})
