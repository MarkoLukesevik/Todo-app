<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue';

import type { Todo } from '@/models/Todo';
import { AppThemeEnum } from '@/models/AppThemeEnum';
import { TodosFilterEnum } from '@/models/TodosFilterEnum';

import CreateTodo from '@/components/TodosContainer/components/CreateTodo.vue';
import TodoList from './components/TodoList/TodoList.vue';
import TodosActionBar from './components/TodosActionBar.vue';

const props = defineProps<{
    appTheme: AppThemeEnum;
}>();

const getTodosFromLocalStorage = (): void => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos)
        todos.value = JSON.parse(storedTodos);
}

const setTodosLocalStorage =(): void => {
    localStorage.setItem('todos', JSON.stringify(todos.value));
}

const todos: Ref<Todo[]> = ref([]);
getTodosFromLocalStorage();
const currentTodos: Ref<Todo[]> = ref(todos.value);
const todosFilter: Ref<TodosFilterEnum> = ref(TodosFilterEnum.All);


watch(() => todosFilter.value, () => {
    switch (todosFilter.value) {
        case TodosFilterEnum.All:
            currentTodos.value = todos.value;
            break;
        case TodosFilterEnum.Active:
            currentTodos.value = todos.value.filter((todo: Todo) => !todo.isComplete);
            break;
        case TodosFilterEnum.Completed:
            currentTodos.value = todos.value.filter((todo: Todo) => todo.isComplete);
            break;
    }
});

const dragAndDropTextColor = computed<string>(() => {
    return props.appTheme === AppThemeEnum.Light ? '#9495A5' : '#5B5E7E';
});

const changeTodosFilter = (filter: TodosFilterEnum): void => {
    todosFilter.value = filter;
}

const addNewTodo = (todo: Todo): void => {
    todos.value.push(todo);
    setTodosLocalStorage();
}

const toggleTodo = (id: string): void => {
    const foundTodo = currentTodos.value.find((todo: Todo) => todo.id === id);
    if (foundTodo) {
        foundTodo.isComplete = !foundTodo.isComplete;
        setTodosLocalStorage();
    }
}

const deleteTodo = (id: string): void => {
    todos.value = todos.value.filter((todo: Todo) => todo.id !== id);
    console.log(todos.value);
    currentTodos.value = todos.value;
    setTodosLocalStorage();
}

const deleteCompletedTodos = (): void => {
    todos.value = todos.value.filter((todo: Todo) => !todo.isComplete);
    currentTodos.value = todos.value;
    setTodosLocalStorage();
}

const updateTodosOrder = (value: Todo[]) : void => {
    todos.value = value;
    setTodosLocalStorage();
}
</script>

<template>
    <create-todo :app-theme="appTheme" @create-todo="addNewTodo" />
    <todo-list
        :app-theme="appTheme"
        :todos="currentTodos"
        :todos-count="todos.length"
        :todos-filter="todosFilter"
        @toggle-todo="toggleTodo"
        @delete-todo="deleteTodo"
        @delete-completed-todos="deleteCompletedTodos"
        @change-todos-filter="changeTodosFilter"
        @update:model-value="updateTodosOrder"
    />
    <todos-action-bar
        :app-theme="appTheme"
        :todos-filter="todosFilter"
        @change-todos-filter="changeTodosFilter"
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
