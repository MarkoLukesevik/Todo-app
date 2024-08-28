import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { nextTick } from 'vue';

import { useViewport } from '@/mixins/viewportMixin';

describe('useViewport', () => {
    let wrapper: VueWrapper<any>;
    let originalInnerWidth: number;
    let addEventListenerSpy: any;
    let removeEventListenerSpy: any;

    beforeEach(() => {
        originalInnerWidth = window.innerWidth;

        addEventListenerSpy = vi.spyOn(window, 'addEventListener');
        removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

        const TestComponent = {
            setup() {
                const { width } = useViewport();
                return { width };
            },
            template: '<div>{{ width }}</div>',
        };

        wrapper = mount(TestComponent);
    });

    afterEach(() => {
        Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, writable: true });
        window.removeEventListener('resize', () => {});
    });

    it('should initialize viewport width correctly', () => {
        expect(wrapper.text()).toBe(window.innerWidth.toString());
    });

    it('should update width on resize', async () => {
        Object.defineProperty(window, 'innerWidth', { value: 800, writable: true });
        window.dispatchEvent(new Event('resize'));

        await nextTick();

        expect(wrapper.text()).toBe('800');
    });

    it('should add and remove resize event listener', () => {
        expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    
        wrapper.unmount();
    
        const addCallback = addEventListenerSpy.mock.calls[0][1];
        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', addCallback);
      });
});