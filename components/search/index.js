import {KeywordModel}from '../../models/keyword'
import {BookModel} from '../../models/book'
const keywordModel=new KeywordModel()
const bookModel=new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type:String,
      observer:'LoadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    dataArray:[],
    searching:false,
    q:'',
    loading:false, //是否在发送请求
    loadingCenter: false, // 是否有loading效果
    noneResult:false
  },
  attached(){
    const hotWords=keywordModel.getHot()
    hotWords.then(res=>{
      this.setData({
        hotWords:res.hot
      })
    })
    this.setData({
      historyWords:keywordModel.getHistory()
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
     LoadMore(){
       if(!this.data.q){
         return
       }
       if(this.data.loading){
         return 
       }
       const length=this.data.dataArray.length
       this.setData({
         loading:true
       })
       bookModel.search(length,this.data.q).then(res=>{
         const tempArray=this.data.dataArray.concat(res.books)
         this.setData({
           dataArray:tempArray
         })
        this.data.loading=false
       })
    },
    onCancel(event){
      this.triggerEvent('cancel')
      this.setData({
        noneResult: false,
      })
    },
    // 点击×
    onDelete(){
      this.setData({
        searching:false,
        noneResult: false,
        q:''
      })
    },
    onConfirm(event){
      this._showLoadingCenter()
      this.setData({
        searching:true
      })
      const q=event.detail.value || event.detail.text
      bookModel.search(0,q).then(res=>{
        this.setData({
          dataArray:res.books,
          q:q
        })
    
        if(res.books.length==0){
          this.setData({
           noneResult:true
          })
        }
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },
    // 展示loading
    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
      // 隐藏loading
    _hideLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    }

  }
})
