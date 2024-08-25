<script setup lang="ts">
import { AppThemeEnum } from '@/models/AppThemeEnum';
import { computed } from 'vue';

const props = defineProps<{
  isChecked: boolean;
  appTheme: AppThemeEnum;
}>();

const emit = defineEmits<{
  (e: 'toggle', value: boolean): void;
}>();

const checkButtonBackground = computed<string>(() => {
    return props.isChecked ? 'linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))' : '';
});

const checkButtonClasses = computed<string[]>(() => {
    const classes = ['check-button'];

    if (props.appTheme === AppThemeEnum.Dark)
        classes.push('check-button-dark');

    if (props.isChecked)
      classes.push('check-button__no-border')

    return classes;
});
</script>

<template>
    <button
      :class="checkButtonClasses"
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

    cursor: pointer;

    &-dark {
      border: 1px solid #393A4B;
    }

    &__no-border {
      border: none;
    }
}

@media only screen and (min-width: 768px) {
  .check-button {
    width: 24px;
    height: 24px;
  }
}
</style>
