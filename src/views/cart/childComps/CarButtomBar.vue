<template>
  <div class="car-buttom-bar">
    <div class="check-content">
      <CheckButton
        :ischecked="isSelectAll"
        class="check-button"
        @click.native="checkAllClick"
      ></CheckButton>
      <span>全选</span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>
    <div class="calculate">计算:({{ calculateLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  components: { CheckButton },
  name: "CarButtomBar",
  methods: {
    checkAllClick(){
      this.$store.commit('checkAllClick')
    }
  },
  computed: {
    ...mapGetters(["isSelectAll"]),
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + parseInt(item.price.substring(1)) * item.count;
        }, 0);
    },
    calculateLength() {
      return this.$store.state.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
  },
};
</script>
<style scoped>
.car-buttom-bar {
  display: flex;
  background-color: #eee;
  height: 40px;
  position: relative;
  line-height: 40px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 5px;
  width: 60px;
}
.check-button {
  width: 22px;
  height: 22px;
  line-height: 22px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  color: #fff;
  text-align: center;
  background-color: red;
}
</style>