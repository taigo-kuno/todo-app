<template lang="pug">
  div
    div.todoApp
      h1 todo app
      div.todoInput
        p タイトルを入力してください
        input(placeholder="title" v-model="newTodoTitle")
        input(placeholder="desc" v-model="newTodoDesc")
        button(@click="addTodo") 追加
      ul
        li(v-for="todo in todos" :key="todo.index")
          |
          button(@click="delTodo(todo.id)") 終了 
          | {{todo.id}}:{{ todo.name }} : {{ todo.description }}
          nuxt-link(v-bind:to="{name:'work-id',params:{id:todo.id}}") 修正
          
      button(@click="getTodo") 再表示
    iframe(src="http://localhost:8080/test" width="400" height="300")
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