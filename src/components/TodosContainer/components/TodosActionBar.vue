<script setup lang="ts">
import { AppThemeEnum } from '@/models/AppThemeEnum';
import { computed } from 'vue';

const props = defineProps<{
    appTheme: AppThemeEnum;
}>();

const emit = defineEmits<{
    (e: 'see-all-todos'): void;
    (e: 'see-only-active-todos'): void;
    (e: 'see-only-completed-todos'): void;
}>();

const actionBarClasses = computed<string[]>(() => {
    const classes = ['action-bar'];

    if (props.appTheme === AppThemeEnum.Dark)
        classes.push('action-bar__dark');

    return classes;
});
</script>

<template>
    <div :class="actionBarClasses">
        <span @click="emit('see-all-todos')">All</span>
        <span @click="emit('see-only-active-todos')">Active</span>
        <span @click="emit('see-only-completed-todos')">Completed</span>
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
    border-radius: 5px;
    padding: 1rem;

    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;

    & > span {
        cursor: pointer;

        &:hover {
            color: #494C6B;
        }
    }

    &__dark {
        background-color: #25273D;
        color: #5B5E7E;

        & > span:hover {
            color: #E3E4F1;
        }
    }
}

@media only screen and (min-width: 768px) {
    .action-bar {
        display: none;
    }
}
</style>