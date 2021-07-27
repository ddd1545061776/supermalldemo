<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load.once="imgaeLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad:true
    }
  },
  methods: {
    imgaeLoad(){
      if(this.isLoad){
      this.$emit('homewiperImage')
         this.isLoad=false
      }
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>
<style scoped></style>
