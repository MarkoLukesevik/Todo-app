<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

import type { Todo } from '@/models/Todo';

import CreateTodo from '@/components/TodosContainer/components/CreateTodo.vue';
import TodoList from './components/TodoList/TodoList.vue';
import type { AppThemeEnum } from '@/models/AppThemeEnum';

defineProps<{
    appTheme: AppThemeEnum;
}>();

const todos: Ref<Todo[]> = ref([]);

const addNewTodo = (todo: Todo): void => {
    todos.value.push(todo);
}

const toggleTodo = (id: string): void => {
    const foundTodo = todos.value.find((todo: Todo) => todo.id === id);
    if (foundTodo)
      foundTodo.isComplete = !foundTodo.isComplete;
}

const deleteTodo = (id: string): void => {
    todos.value = todos.value.filter((todo: Todo) => todo.id !== id);
}
</script>

<template>
  <create-todo :app-theme="appTheme" @create-todo="addNewTodo" />
  <todo-list
      :app-theme="appTheme"
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
  />
</template>

<style scoped></style>
