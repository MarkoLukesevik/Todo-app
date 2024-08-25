<script setup lang="ts">
defineProps<{
  placeholder: string;
  modelValue: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const handleInputChange = (event: Event): void => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<template>
  <input
    class="app-input"
    :placeholder="placeholder"
    :value="modelValue"
    @input="handleInputChange($event)"
  />
</template>

<style scoped lang="scss">
.app-input {
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;

    background-color: transparent;
    color: #9495a5;
    border: none;

    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 400;

    &:focus {
        outline: none;
    }
}
</style>
