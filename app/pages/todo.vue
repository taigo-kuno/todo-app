<template>
<div>
  <p v-if="$fetchState.pending">Fetching todos...</p>
  <p v-else-if="$fetchState.error">An error occured :(</p>
  <div >
    <h1>todo app</h1>
    <div class="todoInput">
      <p>タイトルを入力してください</p>
      <input placeholder="title" v-model="newTodoTitle">
      <input placeholder="desc" v-model="newTodoDesc">
      <button @click="addTodo">追加</button>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo.index">
        <button @click="delTodo(todo.id)">終了</button>
        {{todo.id}}:{{ todo.name }} : {{ todo.description }} 
        <nuxt-link v-bind:to="{name:'work-id',params:{id:todo.id}}" >修正</nuxt-link>
      </li>
    </ul>
    <button @click="getTodo">再表示</button>
  </div>
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
      this.todos = await this.$axios.$get(this.localURL)
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
    }
  },

  async fetch() {
    this.todos =  await this.$axios.$get(this.serverURL);
  },
  fetchOnServer:false
})
</script>