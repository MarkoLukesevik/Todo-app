import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import { AppThemeEnum } from '@/models/AppThemeEnum';

import CheckButton from '@/base-components/CheckButton.vue';

describe('Test suite for check button component', () => {
    let wrapper: ReturnType<typeof shallowMount>;

    beforeEach(() => {
        wrapper = shallowMount(CheckButton, {
            props: {
                isChecked: false,
                appTheme: AppThemeEnum.Light,
            },
        });
    });

    it('Should match the snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it('Should render correctly with default props', () => {
        const button = wrapper.find('button');
        expect(wrapper.find('img').exists()).toBe(false);
        
        expect(button.exists()).toBe(true);
        expect(button.classes()).toContain('check-button');
        expect(button.element.style.background).toBe('');
    });

    it('Should render image when isChecked prop is true', async () => {
        expect(wrapper.find('img').exists()).toBe(false);

        await wrapper.setProps({ isChecked: true });

        expect(wrapper.find('img').exists()).toBe(true);
    });

    it('Should add dark theme class when appTheme is Dark', async () => {
        await wrapper.setProps({ appTheme: AppThemeEnum.Dark });
        expect(wrapper.find('button').classes()).toContain('check-button-dark');
    });

    it('Should add no-border class when isChecked is true', async () => {
        await wrapper.setProps({ isChecked: true });
        expect(wrapper.find('button').classes()).toContain('check-button__no-border');
        expect(wrapper.find('img').exists()).toBe(true); // Image should be present
    });

    it('Should emit toggle event with the correct value when clicked', async () => {
        await wrapper.setProps({ isChecked: false });
        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted('toggle')).toBeTruthy();
        expect(wrapper.emitted('toggle')?.[0]).toEqual([true]); // Click should toggle the value
    });
});