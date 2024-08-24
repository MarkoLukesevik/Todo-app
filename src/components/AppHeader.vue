<script setup lang="ts">
import { computed } from 'vue'
import { AppThemeEnum } from '@/models/AppThemeEnum'

const props = defineProps<{
  appTheme: AppThemeEnum
}>()

const emit = defineEmits<{
  (e: 'toggleTheme', value: AppThemeEnum): void
}>()

const themeIcon = computed<string>(() => {
  return props.appTheme === AppThemeEnum.Light
    ? '/assets/images/icon-moon.svg'
    : '/assets/images/icon-sun.svg'
})

const handleIconClick = (): void => {
  props.appTheme === AppThemeEnum.Light
    ? emit('toggleTheme', AppThemeEnum.Dark)
    : emit('toggleTheme', AppThemeEnum.Light)
}
</script>

<template>
  <div class="app-header">
    <h1 class="app-header__title">TODO</h1>
    <img class="app-header__theme-icon" :src="themeIcon" alt="" @click="handleIconClick" />
  </div>
</template>

<style scoped lang="scss">
.app-header {
  display: flex;
  flex-direction: row;
  flex: 0 1 auto;
  align-items: center;
  justify-content: space-between;

  color: #ffffff;

  font-family: 'Josefin Sans', sans-serif;

  &__title {
    font-size: 2rem;
  }
}
</style>
