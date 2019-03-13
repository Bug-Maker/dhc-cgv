// pages/userConsole/goodsType/goodsType.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索框内容
    gtypeforsearch: '',
    // 新增产品类型
    addGoodTypeName: '',
    // 模态窗是否显示
    modalName: null,
    // 当前产品分类表的分类id
    goodtypeid: '',
    // 更新模态框默认值
    updateValue: '',
    // 更新模态框输入的值
    updateGoodName: '',

    // 保存产品类型信息   实际数据为点击搜索后从后台取得的数据
    goodtypes: [
      {
        goodtypeid: '0001',
        goodtypename: "人气热销",
      },
      {
        goodtypeid: '0002',
        goodtypename: "经典套餐",
      },
      {
        goodtypeid: '0003',
        goodtypename: "现调饮料",
      },
      {
        goodtypeid: '0004',
        goodtypename: "爆米花类",
      },
      {
        goodtypeid: '0005',
        goodtypename: "瓶装饮料",
      },
      {
        goodtypeid: '0006',
        goodtypename: "精选套餐",
      },
      {
        goodtypeid: '0007',
        goodtypename: "果拼果汁",
      },
      {
        goodtypeid: '0008',
        goodtypename: "小吃主食",
      },
    ]
  },

  /**
   * 得到搜索输入框内容
   */
  getTypeInput: function(e) {
    this.data.gtypeforsearch = e.detail.value;
  },

  /**
   * 得到新增输入框内容
   */
  getAddTypeInput: function (e) {
    this.data.addGoodTypeName = e.detail.value;
  },  

  /**
   * 得到更新输入框内容
   */
  getUpdateTypeInput: function (e) {
    this.data.updateGoodName = e.detail.value;
  },    

  /*
  * 搜索按钮点击事件
  */
  searchType: function(options) {
    // 得到搜索输入框的内容
    console.log(this.data.gtypeforsearch);
    let typename = this.data.gtypeforsearch;

    // 请求服务器处理搜索信息
    wx.request({
      url: 'http://172.21.20.150:8080/goodTypeSearch' + typename,
      method: "GET",
      header: {
        'Content-Type': 'json',
      },
      success: (({ data }) => {

        console.log(data)

      }),
      fail: function () {
        wx.showModal({
          content: '访问服务器失败',
          showCancel: false,
        })
        return;
      },
    })
  },

  /**
   * 新增按钮模态框后的确定按钮点击事件
   */
  addType: function(options) {

    // 得到新增输入框内容
    console.log(this.data.addGoodTypeName);
    let typename = this.data.addGoodTypeName;

    // 请求服务器处理新增信息
    wx.request({
      url: 'http://172.21.20.150:8080/goodTypeAdd',
      method: "GET",
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        'typename': typename,
      },
      success: (({ data }) => {

        console.log(data)


        // 关闭新增模态框
        hideModal

      }),
      fail: function () {
        wx.showModal({
          content: '访问服务器失败',
          showCancel: false,
        })
        return;
      },
    })
  },

  // 更新按钮点击事件
  updateType: function() {
    
    // 得到更新输入框内容
    console.log(this.data.updateGoodName);
    let typename = this.data.updateGoodName;
    // 得到产品分类id
    let typeid = this.data.goodtypeid;

    // 请求服务器处理新增信息
    wx.request({
      url: 'http://172.21.20.150:8080/goodTypeUpdate',
      method: "GET",
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        "typeid": typeid,
        "typename": typename,
      },
      success: (({ data }) => {

        console.log(data)


        // 关闭新增模态框
        hideModal

      }),
      fail: function () {
        wx.showModal({
          content: '访问服务器失败',
          showCancel: false,
        })
        return;
      },
    })

  },

  // 删除按钮点击事件
  deleteType: function () {

    // 得到产品分类id
    let typeid = this.data.goodtypeid;

    // 请求服务器处理新增信息
    wx.request({
      url: 'http://172.21.20.150:8080/goodTypeDelete',
      method: "GET",
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        "typeid": typeid,
      },
      success: (({ data }) => {

        console.log(data)


        // 关闭新增模态框
        hideModal

      }),
      fail: function () {
        wx.showModal({
          content: '访问服务器失败',
          showCancel: false,
        })
        return;
      },
    })

  },  

  // 显示模态窗
  showModel: function(e) {

    // 设置要打开的模态框的名字
    this.setData({
      modalName: e.currentTarget.dataset.target
    })

    // 当点击更新或者删除按钮时
    if (this.data.modalName == "DialogUpdate" || this.data.modalName == "DialogDelete") {

      // 得到当前条数据的产品分类id(主键，作为唯一区分)
      let gTypeIndex = e.currentTarget.dataset.gtypeindex;
      this.setData({
        goodtypeid: gTypeIndex
      })

      // 设置更新模态框中输入内容的值
      let goodTypeName = this.data.goodtypes[gTypeIndex].goodtypename;
      this.setData({
        updateValue: goodTypeName
      })

    }
  },
  // 隐藏模态框
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },  

  /**
   * 
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})