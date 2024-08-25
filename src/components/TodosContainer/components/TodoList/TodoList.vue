<script setup lang="ts">
import type { Todo } from '@/models/Todo';
import { AppThemeEnum } from '@/models/AppThemeEnum';

import TodoItem from './components/TodoItem.vue';
import { computed } from 'vue';

const props = defineProps<{
    appTheme:AppThemeEnum;
    todos: Todo[];
}>();

const emit = defineEmits<{
    (e: 'toggle-todo', value: string): void;
    (e: 'delete-todo', value: string): void;
}>();

const todosBackgroundColor = computed<string>(() => {
    return props.appTheme === AppThemeEnum.Light ? '#ffffff' : '#25273D';
});
</script>

<template>
    <div class="todos" :style="{ backgroundColor: todosBackgroundColor }">
        <div class="todos-list">
            <todo-item
                v-for="todo in todos"
                :key="todo.id"
                :app-theme="appTheme"
                :todo="todo"
                @toggle-todo="emit('toggle-todo', $event)"
                @delete-todo="emit('delete-todo', $event)"
            />
        </div>
        <div class="todos-footer">
            <div class="todos-footer__counter">{{ todos.length }} items left</div>
            <div class="todos-footer__actions">
                <span>All</span>
                <span>Active</span>
                <span>Completed</span>
            </div>
            <div class="todos-footer__clear">Clear Completed</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .todos {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        
        border-radius: 5px;

        &-list {
            display: flex;
        flex-direction: column;
        flex: 1 1 0;

        overflow-y: auto;
        }

        &-footer {
            display: flex;
            flex-direction: row;
            flex: 0 1 auto;
            align-items: center;
            justify-content: space-between;
            column-gap: 0.5rem;

            padding: 1rem 1.2rem;
            color: #9495A5;
    
            font-family: 'Josefin Sans', sans-serif;
            font-size: 0.9rem;
            font-weight: 400;

            &__actions {
                display: none;
            }

            &__clear {
                cursor: pointer;
            }
        }
    }
</style>
