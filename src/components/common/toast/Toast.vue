<template>
  <div v-if="isShow" class="toast">{{ message }}</div>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default() {
  //       return "";
  //     },
  //   },
  // },
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message, duration) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
      }, duration);
    },
  },
};
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0.75);
  z-index: 999;
  transform: translate(-50%,-50%);
}
</style>