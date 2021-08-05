<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isField"
      class="tab-control"
    ></tab-control>
    <scroll
      class="content"
      ref="www"
      :probe-type="3"
      @scroll="backTopClick"
      :pullUpLoad="true"
      @pullingUp="pullingUp"
    >
      <home-swiper
        :banners="banners"
        @homewiperImage="homewiperImage"
      ></home-swiper>
      <recommend-view :recommend="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <good-list :goods="goods[currentType].list"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import { getHomeMultidata, getHomeData } from "network/home";
import FeatureView from "./childComps/FeatureView";
import GoodList from "components/content/goods/GoodList";
import TabControl from "components/content/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
import mitt from "mitt";
const emitter = mitt();
export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabControlOffsetTop: 0,
      isField: false,
      saveY:0
    };
  },
  created() {
    this.getHomeMultidata();

    //请求商品数据
    this.getHomeData("pop");
    this.getHomeData("new");
    this.getHomeData("sell");
  },
  mounted() {
    //监听图片加载
    const refresh = this.debounce(this.$refs.www.refresh, 30);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
    //获取tabControl里面的offerTop
    // this.homewiperImage()
  },
  
  activated() {
      // console.log(this.saveY)
  //  console.log(this.saveY)
   this.$refs.www.refresh()

   this.$refs.www.scroll.scrollTo(0,this.saveY)
  },
  deactivated() {
    this.saveY=this.$refs.www.scroll.y
    //  console.log(this.saveY)
  },
  updated() {
    //  this.$refs.www.scroll.scrollTo(0,this.saveY)
  //  this.$refs.www.scroll.refresh()
  },
  destroyed() {
  },
  methods: {
    //防抖
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func(this, args);
        }, delay);
      };
    },
    //homewiper图片加载监听
    homewiperImage() {
      this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    //事件监听的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backClick() {
      //父组件访问子组件的数据
      this.$refs.www.scroll.scrollTo(0, 0);
      // this.$refs.www.scroll.refresh();
    },
    //下拉加载更多
    pullingUp() {
      this.getHomeData(this.currentType);
      // this.$refs.www.scroll.refresh();
    },
     
    backTopClick(position) {
      //监听返回图标是否显示
      // console.log(position)
      this.isShowBackTop = Math.abs(position.y) > 1000;
      this.isField = Math.abs(position.y) > this.tabControlOffsetTop;
    },

    //获取请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeData(type) {
      const page = this.goods[type].page + 1;
      getHomeData(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-bar {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
