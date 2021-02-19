import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: function(){
      return {
        message1: 'hello Vuex!',
        message2: 'By Vuex!'
      }
    },
    mutations: {
      updateMessage: function(state,playload:string){
        state.message1 = playload;
      }
    }
  })
}


export default createStore