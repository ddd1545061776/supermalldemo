<template>
  <div id="deatil">
    <detail-nav class="deatail-nav"></detail-nav>
    <scroll class="content">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shops"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
    </scroll>
  </div>
</template>

<script>
import DetailNav from "./childComps/DetailNav";
import { getDeatils, Goods, Shop, GoodsParam } from "network/detail";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
export default {
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
  },
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
    };
  },
  created() {
    this.iid = this.$route.params.id;
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
    });
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