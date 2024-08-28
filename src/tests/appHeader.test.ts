import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';

import { AppThemeEnum } from '@/models/AppThemeEnum';

import AppHeader from '@/components/AppHeader.vue';

describe('Test suite for app header component', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = shallowMount(AppHeader, {
            props: { appTheme: AppThemeEnum.Light }
        });
    });

    it('Should match the snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders the correct theme icon based on the appTheme prop', async () => {
        expect(wrapper.find('[data-test="app-header-image"]').attributes('src')).toBe('/assets/images/icon-moon.svg');

        await wrapper.setProps({ appTheme: AppThemeEnum.Dark });
        await nextTick();

        expect(wrapper.find('[data-test="app-header-image"]').attributes('src')).toBe('/assets/images/icon-sun.svg');
    });

    it('emits toggleTheme with the correct value when the icon is clicked', async () => {
        const apHeaderImage = await wrapper.find('[data-test="app-header-image"]');
        await apHeaderImage.trigger('click');
        expect(wrapper.emitted('toggleTheme')[0]).toEqual([AppThemeEnum.Dark]);

        await wrapper.setProps({ appTheme: AppThemeEnum.Dark });
        await apHeaderImage.trigger('click');
        expect(wrapper.emitted('toggleTheme')[1]).toEqual([AppThemeEnum.Light]);
    });
});