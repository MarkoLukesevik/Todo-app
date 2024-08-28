import { shallowMount } from '@vue/test-utils';
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { nextTick } from 'vue';

import { AppThemeEnum } from '@/models/AppThemeEnum';
import { mockLocalStorage } from './mockLocalStorage/mockLocalStorage';

import App from '@/App.vue';
import AppHeader from '@/components/AppHeader.vue';

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('Test suite for app component', () => {
    let wrapper: any;
    let originalInnerWidth: number;

    beforeEach(() => {
        originalInnerWidth = window.innerWidth;
        localStorage.clear();
        wrapper = shallowMount(App);
    });

    afterEach(() => {
        Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, writable: true });
      });

    it('Should match the snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it('should initialize appTheme from localStorage', async () => {
        localStorage.setItem('appTheme', JSON.stringify(AppThemeEnum.Dark));
        wrapper = shallowMount(App);
        expect(wrapper.vm.appTheme).toBe(AppThemeEnum.Dark);
    });
    
    it('should default appTheme to Light if no localStorage entry', () => {
        localStorage.removeItem('appTheme');
        expect(wrapper.vm.appTheme).toBe(AppThemeEnum.Light);
    });

    it('should compute correct background image for light theme', async () => {
        const imageDiv = await wrapper.find('[data-test="app-image"]');

        expect(imageDiv.element.style.getPropertyValue('background-image'))
            .toBe('url(/assets/images/bg-desktop-light.jpg)');
        expect(wrapper.vm.appBackgroundImage).toBe('/assets/images/bg-desktop-light.jpg');
            
        Object.defineProperty(window, 'innerWidth', { value: 200, writable: true });
        window.dispatchEvent(new Event('resize'));
       
        expect(wrapper.vm.appBackgroundImage).toBe('/assets/images/bg-mobile-light.jpg');
    });

    it('should compute correct background image for dark theme', async () => {
        const imageDiv = await wrapper.find('[data-test="app-image"]');
        wrapper.vm.appTheme = AppThemeEnum.Dark;
        await nextTick();

        expect(imageDiv.element.style.getPropertyValue('background-image'))
            .toBe('url(/assets/images/bg-desktop-dark.jpg)');
        expect(wrapper.vm.appBackgroundImage).toBe('/assets/images/bg-desktop-dark.jpg');
            
        Object.defineProperty(window, 'innerWidth', { value: 200, writable: true });
        window.dispatchEvent(new Event('resize'));
       
        expect(wrapper.vm.appBackgroundImage).toBe('/assets/images/bg-mobile-dark.jpg');
    });

    it('should compute and render correct app classes for dark theme', async () => {
        const appDiv = await wrapper.find('[data-test="app"]');
        wrapper.vm.appTheme = AppThemeEnum.Dark;
        await nextTick();

        expect(wrapper.vm.appClasses).toContain('app-dark');
        expect(appDiv.classes()).toEqual(['app', 'app-dark']);
    });
    
    it('should compute and render correct app classes for light theme', async () => {
        const appDiv = await wrapper.find('[data-test="app"]');
        wrapper.vm.appTheme = AppThemeEnum.Light;

        expect(wrapper.vm.appClasses).not.toContain('app-dark');
        expect(appDiv.classes()).toEqual(['app']);
    });

    it('should update appTheme and localStorage on theme toggle', async () => {
        expect(wrapper.vm.appTheme).toBe(AppThemeEnum.Light);

        wrapper.vm.handleThemeToggle(AppThemeEnum.Dark);
        await nextTick();

        expect(wrapper.vm.appTheme).toBe(AppThemeEnum.Dark);
        expect(localStorage.getItem('appTheme')).toBe(JSON.stringify(AppThemeEnum.Dark));
      });
    
      it('should handle theme toggle event from AppHeader', async () => {
        const appHeader = wrapper.findComponent(AppHeader);

        await appHeader.vm.$emit('toggle-theme', AppThemeEnum.Dark);
        await nextTick();

        expect(wrapper.vm.appTheme).toBe(AppThemeEnum.Dark);
      });
});