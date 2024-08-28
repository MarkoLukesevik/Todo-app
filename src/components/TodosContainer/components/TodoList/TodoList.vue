<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue';

import draggable from 'vuedraggable';

import type { Todo } from '@/models/Todo';
import { AppThemeEnum } from '@/models/AppThemeEnum';
import { TodosFilterEnum } from '@/models/TodosFilterEnum';

import TodoItem from './components/TodoItem.vue';

const props = defineProps<{
    appTheme:AppThemeEnum;
    todos: Todo[];
    todosFilter: TodosFilterEnum;
    todosCount: number;
}>();

const scopedTodos: Ref<Todo[]> = ref(props.todos);

watch(() => props.todos, () => {
    scopedTodos.value = props.todos;
});

const emit = defineEmits<{
    (e: 'toggle-todo', value: string): void;
    (e: 'delete-todo', value: string): void;
    (e: 'delete-completed-todos'): void;
    (e: 'change-todos-filter', value: TodosFilterEnum): void;
    (e: 'update:model-value', value: Todo[]): void;
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
        <p v-if="todosCount === 0" class="todos-empty">Your todo list is empty. please add some todo items.</p>
        <div class="todos-list">
            <draggable
                v-model="scopedTodos"
                :item-key="'todos'"
                :delay="100"
                @change=" emit('update:model-value', scopedTodos)"
            >
                <template #item="{ element: todo }">
                    <todo-item
                        :key="todo.id"
                        :app-theme="appTheme"
                        :todo="todo"
                        @toggle-todo="emit('toggle-todo', $event)"
                        @delete-todo="emit('delete-todo', $event)"
                    />
                </template>
            </draggable>
        </div>
        <div class="todos-footer">
            <div class="todos-footer__counter">{{ todosCount }} items left</div>
            <div class="todos-footer__actions">
                <span
                    :class="{ 'active-filter': todosFilter === TodosFilterEnum.All }"
                    @click="emit('change-todos-filter', TodosFilterEnum.All)"
                >
                    All
                </span>
                <span
                    :class="{ 'active-filter': todosFilter === TodosFilterEnum.Active }"
                    @click="emit('change-todos-filter', TodosFilterEnum.Active)"
                >
                    Active
                </span>
                <span
                    :class="{ 'active-filter': todosFilter === TodosFilterEnum.Completed }"
                    @click="emit('change-todos-filter', TodosFilterEnum.Completed)"
                >
                    Completed
                </span>
            </div>
            <div class="todos-footer__clear" @click="emit('delete-completed-todos')">Clear Completed</div>
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
    box-shadow: 0px 35px 50px -15px rgba(194, 195, 214, 0.5);

    ::-webkit-scrollbar {
        width: 0.3rem;
    }

    ::-webkit-scrollbar-track {
            background-color: #ffffff;
        }

    ::-webkit-scrollbar-thumb {
        background-color: #E3E4F1;
        border-radius: 5px;
    }

    &-empty {
        margin: 1rem 1.2rem;
        color: #494C6B;
        font-family: 'Josefin Sans', sans-serif;
        font-size: 0.9rem;
        font-weight: 400;
    }

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

            &:hover {
                color: #494C6B;
            }
        }
    }

    &-dark {
         background-color: #25273D;
         box-shadow: 0px 35px 50px -15px rgba(0, 0, 0, 0.5);

         & .todos-empty {
            color: #C8CBE7;
         }

         & .todos-footer {
            color: #5B5E7E;

            &__clear:hover {
                color: #E3E4F1;
            }
         }

        ::-webkit-scrollbar-track {
            background-color: #25273D;
        }

        ::-webkit-scrollbar-thumb {
            background-color: #393A4B;
            border-radius: 5px;
        }
    }
}

@media only screen and (min-width: 768px) {
    .todos {
        &-empty {
            font-size: 1.1rem;
        }

        &-footer {
            font-size: 1rem;

            &__actions {
                display: flex;
                flex-direction: row;
                flex: 0 1 auto;
                align-items: center;
                justify-content: center;
                column-gap: 1rem;

                & span {
                    cursor: pointer;
                    font-weight: 600;

                    &:hover {
                        color: #494C6B;
                    }
                }

                & .active-filter {
                    color: #3A7CFD;
                }
            }
        }
    }

    .todos-dark .todos-footer__actions span:hover {
        color: #E3E4F1;
    }
}
</style>