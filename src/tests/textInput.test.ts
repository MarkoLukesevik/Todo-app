import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import { AppThemeEnum } from '@/models/AppThemeEnum';

import TextInput from '@/base-components/TextInput.vue';

describe('AppInput', () => {
    let wrapper: ReturnType<typeof shallowMount>;

    beforeEach(() => {
        wrapper = shallowMount(TextInput, {
            props: {
                placeholder: 'Enter text',
                modelValue: 'initial value',
                appTheme: AppThemeEnum.Light,
            },
        });
    });

    it('Should match the snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it('Should render correctly with default props', () => {
        const input = wrapper.find('input');
        expect(input.exists()).toBe(true);
        expect(input.attributes('placeholder')).toBe('Enter text');
        expect(input.element.value).toBe('initial value');
        expect(input.element.style.color).toBe('rgb(148, 149, 165)');
    });

    it('Should apply the correct text color based on appTheme prop', async () => {
        expect(wrapper.find('input').element.style.color).toBe('rgb(148, 149, 165)');
        
        await wrapper.setProps({ appTheme: AppThemeEnum.Dark });
        expect(wrapper.find('input').element.style.color).toBe('rgb(200, 203, 231)');
    });

    it('Should emit update:modelValue event with the input value when input changes', async () => {
        const input = wrapper.find('input');
        
        await input.setValue('new value');
        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value']);
    });
});