<script setup lang="ts">
const emit = defineEmits<{
    (e: 'button-click'): void;
}>()
</script>

<template>
    <button class="x-button" @click="emit('button-click')">
        <img src="/assets/images/icon-cross.svg" alt="">
    </button>
</template>

<style scoped lang="scss">
    .x-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
</style>