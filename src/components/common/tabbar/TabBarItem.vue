  <template>
  <div @click="itemClick" class="tab-car-item">
    <!-- <img src="../../assets/img/bar/profile.svg">
       <div>首页</div> -->
    <div v-if="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div v-else>
      <slot name="item-icon"> </slot>
    </div>
    <div :style="isactiveColor">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
  <script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      //isActive:true
    };
  },
  methods: {
    itemClick() {
      console.log(this.path);
      this.$router.replace(this.path);
    },
  },
  computed: {
    isActive() {
      //$route是哪个路由活跃就是那个路由的路径
      return this.$route.path == this.path;
    },
    isactiveColor() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
};
</script>
  <style>
.tab-car-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-car-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
/* .active {
  color: red;
} */

</style>