import axios  from "axios";
export function request(config){
      const instance =axios.create({
            baseURL:"http://123.207.32.32:8000",
            timeout:5000
          })
         
      //请求拦截器
      //比如可以在这里改请求头信息
      //在发送网络请求时，都希望在界面中显示一个图标
      //比如登录的时候携带一些特殊的信息，token 
      instance.interceptors.request.use(config=>{
       //  console.log(config);
        return  config
      },err=>{
        console.log(err);
      })
      //响应拦截
      instance.interceptors.response.use(res=>{
       //       console.log(res);
       return res.data
      },err=>{
             console.log(err);
      })
      return   instance(config)
  }