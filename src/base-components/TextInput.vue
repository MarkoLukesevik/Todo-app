<script setup lang="ts">
import { AppThemeEnum } from '@/models/AppThemeEnum';
import { computed } from 'vue';

const props = defineProps<{
    placeholder: string;
    modelValue: string;
    appTheme: AppThemeEnum;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const textInputColor = computed<string>(() => {
    return props.appTheme === AppThemeEnum.Light ? '#9495a5' : '#767992';
});

const handleInputChange = (event: Event): void => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<template>
  <input
    class="app-input"
    :style="{ color: textInputColor }"
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
    border: none;

    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 400;

    &:focus {
        outline: none;
    }
}
</style>
