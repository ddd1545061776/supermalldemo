import BackTop from "components/content/backTop/BackTop";
export const backTopMixin={
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      //父组件访问子组件的数据
      this.$refs.scroll.scroll.scrollTo(0, 0);
      // this.$refs.www.scroll.refresh();
    },
    backTopClick(position) {
      //监听返回图标是否显示
      // console.log(position)
      this.isShowBackTop = Math.abs(position.y) > 1000;
    },
  }
}