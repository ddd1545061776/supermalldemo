  <template>
  <div class="recommend">
    <div v-for="(item, index) in recommend" class="recommed-item" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>
  <script>
export default {
  name: "RecommendView",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
  <style scoped>
.recommend {
  display: flex;
  text-align: center;
  width: 100%;
  font-size: 12px;
  border-bottom: 10px solid #eee;
}
.recommed-item {
  flex: 1;
  text-align: center;
}
.recommed-item img {
  width: 65px;
  height: 65px;
  margin-bottom: 10px;
}
</style>