<script setup lang="ts">
import { computed } from 'vue';

import { AppThemeEnum } from '@/models/AppThemeEnum';
import { TodosFilterEnum } from '@/models/TodosFilterEnum';

const props = defineProps<{
    appTheme: AppThemeEnum;
    todosFilter: TodosFilterEnum;
}>();

const emit = defineEmits<{
    (e: 'change-todos-filter', value: TodosFilterEnum): void;
}>();

const actionBarClasses = computed<string[]>(() => {
    const classes = ['action-bar'];

    if (props.appTheme === AppThemeEnum.Dark)
        classes.push('action-bar__dark');

    return classes;
});
</script>

<template>
    <div data-test="action-bar" :class="actionBarClasses">
        <span
            data-test="action-bar-all-filter"
            class="action-bar__filter"
            :class="{ 'action-bar__active-filter': todosFilter === TodosFilterEnum.All }"
            @click="emit('change-todos-filter', TodosFilterEnum.All)"
        >
            All
        </span>
        <span
            data-test="action-bar-active-filter"
            class="action-bar__filter"
            :class="{ 'action-bar__active-filter': todosFilter === TodosFilterEnum.Active }"
            @click="emit('change-todos-filter', TodosFilterEnum.Active)"
        >
            Active
        </span>
        <span
            data-test="action-bar-completed-filter"
            class="action-bar__filter"
            :class="{ 'action-bar__active-filter': todosFilter === TodosFilterEnum.Completed }"
            @click="emit('change-todos-filter', TodosFilterEnum.Completed)"
        >
            Completed
        </span>
    </div>
</template>

<style scoped lang="scss">
.action-bar {
    display: flex;
    flex-direction: row;
    flex: 0 1 auto;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;

    background-color: #ffffff;
    color: #9495A5;
    box-shadow: 0px 35px 50px -15px rgba(194, 195, 214, 0.5);
    border-radius: 5px;
    padding: 1rem;

    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;

    &__filter {
        cursor: pointer;
    }

    &__dark {
        background-color: #25273D;
        color: #5B5E7E;
        box-shadow: 0px 35px 50px -15px rgba(0, 0, 0, 0.5);
    }

    & .action-bar__active-filter {
        color: #3A7CFD;
    }
}

@media only screen and (min-width: 768px) {
    .action-bar {
        display: none;
    }
}
</style>