var QQMapWX = require('../../qqmap-wx-jssdk/qqmap-wx-jssdk.min.js');
var qqmapsdk;
// var bannerJs = require("../../templates/banner.js");
// pages/index/index.js
var util = require('../../utils/util.js');
Page({

  data: {
    // openid: '',
    movieAddress: '',
    currProvince: '',
    currCity: '',
    latitude1: 0.0,
    longitude1: 0.0,
    // --------------------------------------------------------------//
    navbar: ['热映', '待映'],
    currentTab: 0,
    moreTab: 0,
    wantFlag: 0,
    // --------------------------------------------------------//
    bannerUrls: [{
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547628306053&di=94b4308ff1c464cbe5c939576eacd31b&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2F00%2F00%2F69%2F40%2F89e207928e4ba2a9877b06ec87c6ab71.jpg',
        linkUrl: ''
      },
      {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547628306053&di=77c8b34af1b44fd990e6e201df49f827&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201403%2F20%2F20140320140243_5MySw.jpeg',
        linkUrl: ''
      },
      {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547628378838&di=e01f784abb225d79416180122bc456e1&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0118cf5837d75ea801219c77f35e67.jpg',
        linkUrl: ''
      },
      {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547628378837&di=6127169e3cc9a444bf43da0906e9a57b&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ce8b582439aea84a0e282ba855d9.jpg',
        linkUrl: ''
      }
    ],
    hotMovieList: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    conHeight: "1700rpx",
    changeIndicatorDots: function(e) {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
    changeAutoplay: function(e) {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },
    intervalChange: function(e) {
      this.setData({
        interval: e.detail.value
      })
    },
    durationChange: function(e) {
      this.setData({
        duration: e.detail.value
      })
    },
  },
  //选项卡切换
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      conHeight: "1700rpx",
      moreTab: 0
    })
  },
     //滑动切换tab 
    bindChange:   function(e)  {    
    var  that  =  this;    
    that.setData( { 
      currentTab:  e.detail.current,
      conHeight: "1700rpx",
      moreTab: 0
    });

      
  },
   
  onLoad: function(options) {
    qqmapsdk = new QQMapWX({
      key: 'TIDBZ-4UIEX-2A446-ZS7S5-FLU27-RQFJV'
    });
    // this.setData({
    //   openid: getApp().globalData.openid
    // })
    // bannerJs.imgHeight(this);
    let types = options.ask || 'in_theaters';
    // 请求热映
    this.setData({
      types,
      loader: true
    })
    wx.request({
      url: `https://douban.uieee.com/v2/movie/${this.data.types}&start=${this.data.start}&count=${this.data.count}`,
      method: "GET",
      header: {
        'Content-Type': 'json',
      },
      success: ({
        data
      }) => {
        let arr = [];
        let movieObj = new Map();
        for (let i = 0; i < data.subjects.length; i++) {
          movieObj.set('movieImage', data.subjects[i].images['small'])
          movieObj.set('movieName', data.subjects[i].title)
          movieObj.set('movieShow', data.subjects[i].title)
          let directors = '';
          for (let j = 0; j < data.subjects[0].directors.length; j++) {
            directors = directors + data.subjects[0].directors[j].name
          }
          let casts = '';
          for (let k = 0; k < data.subjects[i].casts.length; k++) {
            casts = casts + data.subjects[i].casts[k].name
          }
          movieObj.set('movieDirectorStarring', directors + '/' + casts)
          movieObj.set('moiveGrade', data.subjects[i].rating.average + '分')
          movieObj.set('movieStatus', '购票')
          movieObj.set('id', data.subjects[i].id)
          movieObj.set('id', data.subjects[i].id)
          arr.push(JSON.parse(util.MapTOJson(movieObj)))
        }
        this.setData({
          hotMovieList: arr
        })

        console.log(data)
        console.log(arr)
        // console.log(arr[0][0].images.medium)
        let arr2 = [];
        let movieObj2 = new Map();
        for (let i = 0; i < data.subjects.length; i++) {
          movieObj2.set('movieImage', data.subjects[i].images['small'])
          movieObj2.set('movieName', data.subjects[i].title)
          movieObj2.set('movieShow', data.subjects[i].title)
          let directors = '';
          for (let j = 0; j < data.subjects[0].directors.length; j++) {
            directors = directors + data.subjects[0].directors[j].name
          }
          let casts = '';
          for (let k = 0; k < data.subjects[i].casts.length; k++) {
            casts = casts + data.subjects[i].casts[k].name + " "
          }
          movieObj2.set('movieDirectorStarring', directors + '/' + casts)
          movieObj2.set('wishCount', data.subjects[i].collect_count)
          movieObj2.set('movieStatus', '预售')
          movieObj2.set('id', data.subjects[i].id)
          movieObj2.set('wantFlag', 0)
          movieObj2.set('url', '../index/filmDetails/filmDetails')
          arr2.push(JSON.parse(util.MapTOJson(movieObj2)))
        }
        this.setData({
          comingMovieList: arr2
        })


      }
    })
  },

  onShow: function() {
    let vm = this;
    this.getLocation();
    qqmapsdk.getCityList({
      success: function(res) {
        console.log(res);
        console.log('省份数据：', res.result[0]); //打印省份数据
        console.log('城市数据：', res.result[1]); //打印城市数据
        console.log('区县数据：', res.result[2]); //打印区县数据
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    });
    // 调用接口
    qqmapsdk.search({
      keyword: 'CVG影城',
      success: function(res) {
        console.log('CVG影城:' + res);
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      }
    });

  },
  getLocation: function() {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: function(res) {
        if (res.errMsg === 'getLocation:ok') {
          // success  
          var latitude = res.latitude
          var longitude = res.longitude
          vm.setData({
            latitude1: latitude,
            longitude1: longitude
          })
          vm.getLocal(latitude, longitude);
        }
      },
      fail: function(res) {
        console.error(res);
      },
      complete: function(res) {
        console.log(res);
      },
    });
  },


  //获取当前地理位置
  getLocal: function(latitude, longitude) {
    var that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        console.log(JSON.stringify(res));
        if (res.status === 0) {
          let localMovieAddr = wx.getStorageSync('localMovieAddress');
          let localCityName = wx.getStorageSync('localCityName');
          console.log('local->' + localMovieAddr)
          if (localMovieAddr == undefined || localMovieAddr == '') {
            localMovieAddr = that.getMovieAddress(res.result.address_component.city);
          }
          if (localCityName == undefined || localCityName == '') {
            localCityName = res.result.address_component.city;
          }
          that.setData({
            currProvince: res.result.address_component.province,
            currCity: localCityName,
            movieAddress: localMovieAddr
          })
        }
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  },

  //计算两个坐标点的距离
  distance: function(la2, lo2) {
    var la1 = this.data.latitude1;
    var lo1 = this.data.longitude1;
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2);
    return s;
  },


  //TODO 
  getMovieAddress: function(city) {
    let list = [];
    let suzhou = [{
        'id': '0',
        'movieAddress': 'CGV苏州中心店',
        'latitude': '39.915405',
        'longitude': '116.403802'
      },
      {
        'id': '1',
        'movieAddress': 'CGV昆山广场店',
        'latitude': '31.200479',
        'longitude': '121.334421'
      }
    ];
    let shanghai = [{
        'id': '0',
        'movieAddress': 'CGV上海广场',
        'latitude': 1.2,
        'longitude': 2.2
      },
      {
        'id': '1',
        'movieAddress': 'CGV外滩店',
        'latitude': '77.77777',
        'longitude': '11.11111'
      },
      {
        'id': '2',
        'movieAddress': 'CGV浦东店',
        'latitude': '22.1111',
        'longitude': '65.4321'
      }
    ];
    if (city === '苏州市') {
      list = suzhou;
    } else {
      list = shanghai;
    };

    var tempDistance = this.distance(list[0].latitude, list[0].longitude);
    var tempNode = list[0];

    for (let a of list) {
      var dis = this.distance(a.latitude, a.longitude);
      console.log('t->' + tempDistance + ' d->' + dis)
      console.log(tempDistance < dis)
      if (tempDistance < dis) {
        tempDistance = dis;
        tempNode = a;
      }
    }

    return tempNode.movieAddress
  },


  //轮播高度自适应——获取图片高度
  imgHeight: function(e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height; //图片高度
    var imgw = e.detail.width; //图片宽度
    var swiperH = winWid * imgh / imgw + "px"
    this.setData({
      Height: swiperH //设置高度
    })
  },
  redirct: function() {
    wx.navigateTo({
      url: '../index/chooseMovie/chooseMovie',
    })
  },
  //选择影城跳转事件
  jumpcinema() {
    wx.navigateTo({
      url: '/pages/jumpcinema/jumpcinema?ct=' + this.data.currCity,
    })
  },
  // 点击更多
  clickMore(e) {
    this.setData({
      moreTab: 1,
      conHeight: "4500rpx"
    })
  },
  // 收起更多
  clickHidden(e) {
    this.setData({
      moreTab: 0,
      conHeight: "1700rpx"
    })
  },
  // 点击想看
  clickWant(e) {
    // wantFilms
    let arrL = this.data.comingMovieList
    for (let i = 0; i < arrL.length; i++) {
      if (arrL[i].id == e.currentTarget.dataset.id) {
        if (arrL[i].wantFlag == 1) {
          // wx.request({
          //   url: this.data.IP + '/users/update',
          //   data: {
          //     _id: wx.getStorageSync("userId"),
          //     film: e.currentTarget.id,
          //     isPush: true,
          //   },
          //   success: ((res) => {})
          // })
          this.setData({
            wantFlag: 0,
            comingMovieList: arrL
          })
          wx.showToast({
            title: '已取消想看',
            icon: 'success',
            duration: 1500
          })
          arrL[i].wantFlag = this.data.wantFlag
          arrL[i].wishCount--;
        } else {
          // wx.request({
          //   url: this.data.IP + '/users/find',
          //   data: {
          //     _id: wx.getStorageSync("userId")
          //   },
          //   success: ((res) => {
          //     wx.request({
          //       url: this.data.IP + '/users/update',
          //       data: {
          //         _id: wx.getStorageSync("userId"),
          //         film: res.data.film.filter(item => item != e.currentTarget.id),
          //         wantFlag: 0
          //       },
          //       success: ((res) => {})
          //     })
          //   })
          // })
          wx.showToast({
            title: '已标记想看',
            icon: 'success',
            duration: 1500
          })
          this.setData({
            wantFlag: 1,
            comingMovieList: arrL
          })
          arrL[i].wantFlag = this.data.wantFlag
          arrL[i].wishCount++;
        }
        this.setData({
          comingMovieList: arrL
        })
      }
    }
    wx.setStorageSync("comingMovieList", this.data.comingMovieList);
  },
})