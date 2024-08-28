import { beforeEach, describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";

import { AppThemeEnum } from "@/models/AppThemeEnum";
import { TodosFilterEnum } from "@/models/TodosFilterEnum";

import TodosActionBar from "@/components/TodosContainer/components/TodosActionBar.vue";

describe('Test suite for todos actions bar component', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = shallowMount(TodosActionBar, {
            props: {
                appTheme: AppThemeEnum.Light,
                todosFilter: TodosFilterEnum.All
            }
        });
    });

    it('Should match the snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it('Should apply correct classes based on appTheme prop', async () => {
        const actionbar = await wrapper.find('[data-test="action-bar"]');
        expect(actionbar.classes()).toEqual(['action-bar']);

        await wrapper.setProps({ appTheme: AppThemeEnum.Dark });

        expect(actionbar.classes()).toEqual(['action-bar', 'action-bar__dark']);
    });

    it('Should apply correct active filter class based on appTheme prop', async () => {
        const allFilter = await wrapper.find('[data-test="action-bar-all-filter"]');
        const activeFilter = await wrapper.find('[data-test="action-bar-active-filter"]');
        const completedFilter = await wrapper.find('[data-test="action-bar-completed-filter"]');

        expect(allFilter.classes()).toEqual(['action-bar__filter', 'action-bar__active-filter']);
        expect(activeFilter.classes()).toEqual(['action-bar__filter']);
        expect(completedFilter.classes()).toEqual(['action-bar__filter']);

        await wrapper.setProps({ todosFilter: TodosFilterEnum.Active});

        expect(allFilter.classes()).toEqual(['action-bar__filter']);
        expect(activeFilter.classes()).toEqual(['action-bar__filter', 'action-bar__active-filter']);
        expect(completedFilter.classes()).toEqual(['action-bar__filter']);

        await wrapper.setProps({ todosFilter: TodosFilterEnum.Completed});

        expect(allFilter.classes()).toEqual(['action-bar__filter']);
        expect(activeFilter.classes()).toEqual(['action-bar__filter']);
        expect(completedFilter.classes()).toEqual(['action-bar__filter', 'action-bar__active-filter']);
    });

    it('Should emit the correct event with the filter value when a filter is clicked', async () => {
        const allFilter = await wrapper.find('[data-test="action-bar-all-filter"]');
        const activeFilter = await wrapper.find('[data-test="action-bar-active-filter"]');
        const completedFilter = await wrapper.find('[data-test="action-bar-completed-filter"]');

        allFilter.trigger('click');
        expect(wrapper.emitted('change-todos-filter')[0]).toEqual([TodosFilterEnum.All]);
    
        activeFilter.trigger('click');
        expect(wrapper.emitted('change-todos-filter')[1]).toEqual([TodosFilterEnum.Active]);
    
        completedFilter.trigger('click');
        expect(wrapper.emitted('change-todos-filter')[2]).toEqual([TodosFilterEnum.Completed]);
      });
});