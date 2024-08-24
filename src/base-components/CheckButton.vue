<script setup lang="ts">
const props = defineProps<{
  isChecked: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle', value: boolean): void
}>()
</script>

<template>
  <button></button>
</template>

<style scoped lang="scss"></style>
