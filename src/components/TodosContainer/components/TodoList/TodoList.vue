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
    (e: 'see-all-todos'): void;
    (e: 'see-only-active-todos'): void;
    (e: 'see-only-completed-todos'): void;
}>();

const todosClasses = computed<string[]>(() => {
    const classes = ['todos'];

    if (props.appTheme === AppThemeEnum.Dark)
        classes.push('todos-dark');

    return classes;
});
</script>

<template>
    <div :class="todosClasses">
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
                <span @click="emit('see-all-todos')">All</span>
                <span @click="emit('see-only-active-todos')">Active</span>
                <span @click="emit('see-only-completed-todos')">Completed</span>
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
        
        background-color: #ffffff;
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
            font-size: 1rem;
            font-weight: 400;

            &__actions {
                display: none;
            }

            &__clear {
                cursor: pointer;
            }
        }

        &-dark {
            background-color: #25273D;
        }

        &-dark .todos-footer {
            color: #5B5E7E;
        }
    }

    @media only screen and (min-width: 768px) {
        .todos-footer__actions {
            display: flex;
            flex-direction: row;
            flex: 0 1 auto;
            align-items: center;
            justify-content: center;
            column-gap: 1rem;
        }
    }
</style>
