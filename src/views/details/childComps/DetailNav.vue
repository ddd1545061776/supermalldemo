<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backHome" class="backImage">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title" >
           <div class="title-item" v-for="(item,index) in titles" :key="index" @click="itemClick(index)" :class="{active:index===currentIndex}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNav",
  components: {
    NavBar,
  },
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    };
  },
  methods: {
    itemClick(index){
        this.currentIndex=index
        this.$emit("detailTabClick",index)
    },
    backHome(){
      this.$router.go(-1)
    }
  },
};
</script>
<style scoped>
.title{
  display: flex;
}
.title-item{
  flex: 1;
  font-size: 13px;
}
.active{
  color:red;
}
.backImage img{
  margin-top: 10px;
}
</style>