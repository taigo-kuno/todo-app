<template>
  <div>
    <p>Home</p>
    <div class="ToDoInput">
      <p>タイトルを入力してください</p>
      <input placeholder="title" v-model="newToDoTitle">
      <button @click="addToDo()">追加</button>
    </div>
    <div class="ToDoOutput">
      <div v-for=" (title, index) in titles" :key="title.index">
        <p>
          <input type="checkbox">
          ToDo{{ index + 1 }} : {{ title }}
        </p>
      </div>
    </div>
    <div></div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data:() => ({
    newToDoTitle:'',
    titles: [] as any,
  }),
  methods:{
    addToDo(){
      if(this.newToDoTitle){
        this.titles.push(this.newToDoTitle)
        alert(`${this.newToDoTitle}を作成しました。`)
        this.newToDoTitle = ''
      } else{
        alert('タイトルを入力してください')
      }
    }
  }
})
</script>

<style >
div.ToDoInput {
  padding:30px;
}

div.ToDoOutput {
  padding:40px;
}
</style>