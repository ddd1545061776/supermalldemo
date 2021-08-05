import getters from './getters'
export  const mutations= {
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      payload.checked=true
      state.cartList.push(payload)
  },
  changeCheckedValue(state, payload){
    payload.checked=!payload.checked
  },
  checkAllClick(state, payload){
   if(getters.isSelectAll(state)){
     state.cartList.forEach(item=> item.checked = false)
   }else{
    state.cartList.forEach(item=> item.checked = true)
   }
  }
}
