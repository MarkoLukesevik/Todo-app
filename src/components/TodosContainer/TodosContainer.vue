<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

import CreateTodo from '@/components/TodosContainer/components/CreateTodo.vue'
import type { Todo } from '@/models/Todo'

const todos: Ref<Todo[]> = ref([])

const addNewTodo = (todo: Todo): void => {
  todos.value.push(todo)
  console.log(todos.value)
}
</script>

<template>
  <create-todo @create-todo="addNewTodo"></create-todo>
</template>

<style scoped></style>
