<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';

import { AppThemeEnum } from '@/models/AppThemeEnum';
import type { Todo } from '@/models/Todo';
import { generateId } from '@/helpers/generateid';

import CheckButton from '@/base-components/CheckButton.vue';
import TextInput from '@/base-components/TextInput.vue';

const props = defineProps<{
    appTheme: AppThemeEnum;
}>();

const emit = defineEmits<{
  (e: 'create-todo', value: Todo): void;
}>();

const newTodoTitle: Ref<string> = ref('');
const newTodoIsComplete: Ref<boolean> = ref(false);

const containerBackgroundColor = computed<string>(() => {
    return props.appTheme === AppThemeEnum.Light ? '#ffffff' : '#25273D';
});

const handleAddNewTodo = (): void => {
    if (!newTodoTitle.value) return;

    emit('create-todo', {
        id: generateId(),
        title: newTodoTitle.value,
        isComplete: newTodoIsComplete.value
    });

    resetNewTodo();
}

const resetNewTodo = (): void => {
    newTodoIsComplete.value = false;
    newTodoTitle.value = '';
}

const toggleNewTodo = (): void => {
    newTodoIsComplete.value = !newTodoIsComplete.value;
}
</script>

<template>
    <div
        data-test="create-todo-container"
        class="create-todo-container"
        @keyup.enter="handleAddNewTodo()"
        :style="{ backgroundColor: containerBackgroundColor }"
    >
        <check-button
            :isChecked="newTodoIsComplete"
            :app-theme="appTheme"
            @toggle="toggleNewTodo"
        />
        <text-input
            placeholder="Create new todo..."
            v-model="newTodoTitle"
            :app-theme="appTheme"
        />
    </div>
</template>

<style scoped lang="scss">
.create-todo-container {
    display: flex;
    flex: 0 1 auto;
    flex-direction: row;
    column-gap: 0.7rem;

    padding: 1rem;
    border-radius: 5px;
    background-color: white;
}
</style>
