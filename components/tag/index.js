// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text:String
  },
  // 组件外部传递过来的样式
  externalClasses:['tag-class'],
  options:{
    multipleSlots:true
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      this.triggerEvent('tapping',{
        text:this.properties.text
      })
    }
  }
})
