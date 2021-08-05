<template>
  <div class="carts">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <scroll ref="scroll" class="content">
      <CartList></CartList>
    </scroll>
    <car-buttom-bar></car-buttom-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import { mapGetters } from "vuex";
import CartList from "./childComps/CartList";
import Scroll from "components/common/scroll/Scroll.vue";
import CarButtomBar from './childComps/CarButtomBar.vue';
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CarButtomBar,
  },
    activated() {
    this.$refs.scroll.refresh()
  },
    methods: {
  
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"]),
  },

};
</script>
<style scoped>
.carts {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>
