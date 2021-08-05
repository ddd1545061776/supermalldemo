<template>
  <div id="deatil">
    <detail-nav
      class="deatail-nav"
      @detailTabClick="detailTabClick"
      ref="nav"
    ></detail-nav>
    <scroll class="content" ref="scroll" @scroll="scroll" :probeType="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shops"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comments"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <good-list ref="recommends" :goods="recomments"></good-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast message="哈哈哈哈"></toast>
  </div>
</template>

<script>
import DetailNav from "./childComps/DetailNav";
import {
  getDeatils,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodList from "components/content/goods/GoodList";
import DetailBottomBar from "./childComps/DetailBottomBar";
import { backTopMixin } from "common/mixin";
import Toast from 'components/common/toast/Toast';
export default {
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    Scroll,
    DetailBottomBar,
    Toast,
  },
  mixins: [backTopMixin],
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shops: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recomments: [],
      themoffset: [],
      currentIndex: 0,
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDeatils(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      //获取轮播图
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取创建店铺信息
      this.shops = new Shop(data.shopInfo);
      //获取店铺详细信息
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论信息

      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      //当组件渲染完数据会回调这个函数
      this.$nextTick(() => {});
    });
    //获取推荐信息
    getRecommend().then((res) => {
      this.recomments = res.data.list;
    });
  },

  methods: {
    detailTabClick(index) {
      //  console.log( this.$refs.scroll);
      //  console.log( this.$refs.scroll.scroll);
      this.$refs.scroll.scroll.scrollTo(0, -this.themoffset[index]);
    },
    //监听图片全部加载完回调
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themoffset = [];
      this.themoffset.push(0);
      this.themoffset.push(this.$refs.params.$el.offsetTop - 44);
      this.themoffset.push(this.$refs.comments.$el.offsetTop - 44);
      this.themoffset.push(this.$refs.recommends.$el.offsetTop - 44);
      this.themoffset.push(Number.MAX_VALUE);
      console.log(this.themoffset);
    },

    scroll(position) {
      const positionY = -position.y;
      // console.log(this.themoffset);
      let length = this.themoffset.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themoffset[i] &&
          positionY <= this.themoffset[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // for (let i = 0; i < length; i++) {
      //   if(this.currentIndex !==i && ((i<length-1&&positionY>=this.themoffset[i] && positionY<this.themoffset[i+1])||
      //   (i===length-1&&this.themoffset[i]<=positionY))){
      //     this.currentIndex=i;
      //     console.log(this.currentIndex);
      //     this.$refs.nav.currentIndex=this.currentIndex
      //   }
      // }
      //监听滑动的位置
      this.backTopClick(position);
    },
    //添加购物车
    addToCart() {
      const product={}
      product.iid=this.iid
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.newPrice
      this.$store.dispatch('addCart', product).then(res=>{
        // console.log(res);
        this.$toast.show(res,2000)
      })
    },
  },
};
</script>
<style scoped>
#deatil {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.deatail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
  /* position:absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden; */
}
</style>