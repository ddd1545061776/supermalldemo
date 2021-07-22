  <template>
<div id="home">
  <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
</div>
  </template>
  <script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'
  export default{
  components: {
     NavBar
      },
  name:'Home',
  data(){
    return{
      banners:[],
      recommends:[]

    }
  }, 
  created(){
    getHomeMultidata().then(res=>{
      console.log(res)
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
    })
  }
  }
  </script>
  <style scoped>
    .home-bar{
      background-color: var(--color-tint);
      color: #fff;
    }
  </style>