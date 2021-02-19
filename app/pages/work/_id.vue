<template>
<div>
  <!-- <p v-if="$fetchState.pending">Fetching todos...</p>
  <p v-else-if="$fetchState.error">An error occured :(</p> -->
  <div >
    <h1>todo app</h1>
    <div class="todoInput">
      <p>id:{{ this.$route.params.id }}を修正してください</p>
      <input placeholder="title" v-model="newTodoTitle">
      <input placeholder="desc" v-model="newTodoDesc">
      <button @click="updateTodo">修正</button>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo.index">
        {{ todo.name }} : {{ todo.description }} 
      </li>
    </ul>
    <button @click="getTodo">現在のデータを表示</button>
  </div>
  <NuxtLink to="/todo">todoListに戻る</NuxtLink>
</div>
</template>



<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      serverURL: 'http://api_container:3000/tests',
      localURL: 'http://localhost:3000/tests',
      newTodoId: 0,
      newTodoTitle: '',
      newTodoDesc: '',
      todos: []
    }
  },
  methods: {
    async getTodo() {
      //そのまま代入するとなぜかエラーが出たので一旦代入
      const id = this.$route.params.id;
      this.todos = await this.$axios.$get(this.localURL + `/${id}`);
    },


    async addTodo() {
      await this.$axios.$post(this.localURL,
        {
          id: this.newTodoId,
          name: this.newTodoTitle,
          desc: this.newTodoDesc
        }
      );
      this.todos = await this.$axios.$get(this.localURL);
    },
    
    async delTodo(id:string){
      await this.$axios.$delete(this.localURL + `/${id}`);
      this.todos = await this.$axios.$get(this.localURL);
    },

    async updateTodo(){
      const id = this.$route.params.id;
      await this.$axios.$put(this.localURL + `/${id}`,
        {
          id:id,
          name: this.newTodoTitle,
          desc: this.newTodoDesc
        }
        
      );
      this.todos = await this.$axios.$get(this.localURL+ `/${id}`);
    }
  },

  // async fetch() {
  //   this.todos =  await this.$axios.$get(this.localURL);
  // }
})
</script>