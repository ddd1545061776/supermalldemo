<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from "components/common/swiper/Swiper";
import SwiperItem from 'components/common/swiper/SwiperItem';
export default {
  components: { Swiper, SwiperItem },
  name: "DetailSwiper",
  methods: {},
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.detail-swiper{
  height: 300px;
}
</style> 