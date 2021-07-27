<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot> </slot>
    </div>
  </div>
</template>

<script>
import BScroll, { PullUpLoad } from "better-scroll";
import Pullup from "@better-scroll/pull-up";
BScroll.use(Pullup);
export default {
  name: "Scroll",
  methods: {
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      //probeType：默认为0不监听滚动的坐标，1表示肯定不监听滚动坐标，2表示监听滚动坐标，惯性的滑动不监听，3惯性的滑动也监听
      probeType: this.probeType,
      //PullUpLoad:向下滑动pull数据监听
      pullUpLoad: this.pullUpLoad,
      click: true,
      observeDOM: true,
      observeImage:true
    });
    //监听实时位置
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll",position)
    });
    if(this.pullUpLoad){
     this.scroll.on("pullingUp", () => {
      console.log("pullUpLoad执行了");
      this.$emit("pullingUp")
        this.scroll.finishPullUp();
    });
    }
 
  },
};
</script>
<style scoped>
/* .wrapper {
  height: 300px;
} */
</style>
