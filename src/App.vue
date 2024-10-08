<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';

import { AppThemeEnum } from '@/models/AppThemeEnum';

import { useViewport } from './mixins/viewportMixin';

import TodosContainer from '@/components/TodosContainer/TodosContainer.vue';
import AppHeader from '@/components/AppHeader.vue';


const getAppThemeFromLocalStorage = (): AppThemeEnum => {
    const storedAppTheme = localStorage.getItem('appTheme');
    if (storedAppTheme)
        return JSON.parse(storedAppTheme);
    return AppThemeEnum.Light;
}

const setAppThemeLocalStorage =(): void => {
    localStorage.setItem('appTheme', JSON.stringify(appTheme.value));
}

const appTheme: Ref<AppThemeEnum> = ref(getAppThemeFromLocalStorage());
    const { width: viewportWidth } = useViewport();

const appBackgroundImage = computed<string>(() => {
    if (viewportWidth.value < 768) {
      return appTheme.value === AppThemeEnum.Light
        ? '/assets/images/bg-mobile-light.jpg'
        : '/assets/images/bg-mobile-dark.jpg';
    } else {
      return appTheme.value === AppThemeEnum.Light
        ? '/assets/images/bg-desktop-light.jpg'
        : '/assets/images/bg-desktop-dark.jpg';
    }
})

const appClasses = computed<string[]>(() => {
    const classes = ['app']

    if (appTheme.value === AppThemeEnum.Dark)
        classes.push('app-dark')

    return classes;
});

const handleThemeToggle = (theme: AppThemeEnum): void => {
    appTheme.value = theme;
    setAppThemeLocalStorage();
}
</script>

<template>
    <div data-test="app" :class="appClasses">
        <div  data-test="app-image" :style="{ backgroundImage: 'url(' + appBackgroundImage + ')' }" class="app-image"></div>
        <div class="app-container">
            <app-header :appTheme="appTheme" @toggle-theme="handleThemeToggle" />
            <todos-container :app-theme="appTheme" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');
.app {
    position: relative;

    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    row-gap: 1.5rem;

    background-color: #fafafa;
    padding: 2rem 1.5rem;

    &-dark {
        background-color: #171823;
    }

    &-image {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;

        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        width: 100%;
        height: 30%;
    }

    &-container {
        position: relative;

        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        row-gap: 1.5rem;

        width: 100%;
        margin: 0 auto;
    }
}

@media only screen and (min-width: 768px) {
.app {
    row-gap: 2rem;
    padding: 3rem 1.5rem;

    &-container {
        row-gap: 2rem;
        max-width: 540px
    }
}
}
</style>
