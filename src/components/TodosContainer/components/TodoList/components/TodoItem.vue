<script setup lang="ts">
import type { Todo } from '@/models/Todo';
import CheckButton from '@/base-components/CheckButton.vue';
import XButton from '@/base-components/XButton.vue';
import { AppThemeEnum } from '@/models/AppThemeEnum';
import { computed } from 'vue';

const props = defineProps<{
    appTheme: AppThemeEnum;
    todo: Todo;
}>();

const emit =defineEmits<{
    (e: 'toggle-todo', value: string): void;
    (e: 'delete-todo', value: string): void;
}>();

const todoItemClasses = computed<string[]>(() => {
    const classes = ['todo-item'];

    if (props.appTheme === AppThemeEnum.Dark)
        classes.push('todo-item__dark')

    return classes
});
</script>

<template>
    <div :class="todoItemClasses">
        <div class="todo-item-content">
            <check-button
                :isChecked="todo.isComplete"
                :app-theme="appTheme"
                @toggle="emit('toggle-todo', todo.id)"
            />
            <p>{{ todo.title }}</p>
        </div>
        <x-button @button-click="emit('delete-todo', todo.id)"></x-button>
    </div>
</template>

<style scoped lang="scss">
.todo-item {
    display: flex;
    flex-direction: row;
    flex: 0 1 auto;
    align-items: center;
    justify-content: space-between;
    column-gap: 0.5rem;

    color: #494C6B;
    border-bottom: 1px solid #E3E4F1;
    padding: 1rem 1.2rem;

    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 400;

     &__dark {
        border-bottom: 1px solid #393A4B;
        color: #C8CBE7;
    }

    &-content {
        display: flex;
        flex-direction: row;
        flex: 0 1 auto;
        align-items: center;
        column-gap: 0.7rem;
    }
}

@media only screen and (min-width: 768px) {
    .todo-item {
        font-size: 1.1rem;
    }
}
</style>
