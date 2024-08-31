import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import XButton from '@/base-components/XButton.vue';

describe('Test suite for x button component', () => {
    let wrapper: ReturnType<typeof shallowMount>;

    beforeEach(() => {
        wrapper = shallowMount(XButton);
    });

    it('Should match the snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it('Should render correctly', () => {
        expect(wrapper.find('button').exists()).toBe(true);
        expect(wrapper.find('img').attributes('src')).toBe('/assets/images/icon-cross.svg');
    });

    it('Should emit button-click event when button is clicked', async () => {
        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted('button-click')).toBeTruthy();
        expect(wrapper.emitted('button-click')?.length).toBe(1);
    });
});