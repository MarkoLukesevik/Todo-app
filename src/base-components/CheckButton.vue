<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isChecked: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle', value: boolean): void
}>()

const checkButtonBackground = computed<string>(() => {
  return props.isChecked ? 'linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))' : ''
})
</script>

<template>
  <button
    class="check-button"
    :style="{ background: checkButtonBackground }"
    @click="emit('toggle', !isChecked)"
  >
    <img v-if="isChecked" src="/assets/images/icon-check.svg" alt="" />
  </button>
</template>

<style scoped lang="scss">
.check-button {
  display: flex;
  flex-direction: row;
  flex: 0 1 auto;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  background-color: transparent;
  border: 1px solid #979797;
  border-radius: 50%;

  &:hover {
    background:
      linear-gradient(white, white) padding-box,
      linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%)) border-box;
    border: 1px solid transparent;
  }
}
</style>
