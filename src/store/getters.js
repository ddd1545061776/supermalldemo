export default{
  cartLength(state){
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  },
  isSelectAll(state) {
    if(state.cartList.length===0){
    return false
    }
   
    // for(let item of state.cartList){
    //   if(!item.checked){
    //      return false
    //    }
    // }
    for (let i = 0; i < state.cartList.length; i++) {
      if(!state.cartList[i].checked){
             return false
           }
      
    }
    return true
  },
 
}