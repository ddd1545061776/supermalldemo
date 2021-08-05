<template>
  <div class="cart-list">
   <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
  </div>
</template>

<script>
import Scoll from "components/common/scroll/Scroll";
import { mapGetters } from "vuex";
import CartListItem from './CartListItem.vue';
export default {
  name: "CartList",
  components: {
    Scoll,
    CartListItem
  },
  methods: {},
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>
<style scoped>

</style>