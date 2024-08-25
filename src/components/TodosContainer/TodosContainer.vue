<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Ref } from 'vue';

import type { Todo } from '@/models/Todo';
import { AppThemeEnum } from '@/models/AppThemeEnum';

import CreateTodo from '@/components/TodosContainer/components/CreateTodo.vue';
import TodoList from './components/TodoList/TodoList.vue';
import TodosActionBar from './components/TodosActionBar.vue';

const props = defineProps<{
    appTheme: AppThemeEnum;
}>();

const todos: Ref<Todo[]> = ref([]);
const currentTodos: Ref<Todo[]> = ref([]);

const dragAndDropTextColor = computed<string>(() => {
    return props.appTheme === AppThemeEnum.Light ? '#9495A5' : '#5B5E7E';
});

const addNewTodo = (todo: Todo): void => {
    todos.value.push(todo);
    seeAllTodos();
}

const toggleTodo = (id: string): void => {
    const foundTodo = currentTodos.value.find((todo: Todo) => todo.id === id);
    if (foundTodo)
      foundTodo.isComplete = !foundTodo.isComplete;
}

const deleteTodo = (id: string): void => {
    todos.value = todos.value.filter((todo: Todo) => todo.id !== id);
}

const seeAllTodos = (): void => {
    currentTodos.value = todos.value;
}

const seeOnlyActiveTodos = (): void => {
    currentTodos.value = todos.value.filter((todo: Todo) => !todo.isComplete);
}

const seeOnlyCompletedTodos = (): void => {
    currentTodos.value = todos.value.filter((todo: Todo) => todo.isComplete);
}
</script>

<template>
    <create-todo :app-theme="appTheme" @create-todo="addNewTodo" />
    <todo-list
        :app-theme="appTheme"
        :todos="currentTodos"
        @toggle-todo="toggleTodo"
        @delete-todo="deleteTodo"
        @see-all-todos="seeAllTodos"
        @see-only-active-todos="seeOnlyActiveTodos"
        @see-only-completed-todos="seeOnlyCompletedTodos"
    />
    <todos-action-bar
        :app-theme="appTheme"
        @see-all-todos="seeAllTodos"
        @see-only-active-todos="seeOnlyActiveTodos"
        @see-only-completed-todos="seeOnlyCompletedTodos"
    />

    <p class="drag-and-drop" :style="{ color: dragAndDropTextColor }">
        Drag and drop to reorder list
    </p>
</template>

<style scoped>
.drag-and-drop {
    text-align: center;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
}

@media only screen and (min-width: 768px) {
    .drag-and-drop {
        font-size: 1.1rem;
    }
}
</style>
