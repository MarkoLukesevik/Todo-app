import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import { AppThemeEnum } from '@/models/AppThemeEnum';
import { TodosFilterEnum } from '@/models/TodosFilterEnum';
import type { Todo } from '@/models/Todo';

import TodoList from '@/components/TodosContainer/components/TodoList/TodoList.vue';
import TodoItem from '@/components/TodosContainer/components/TodoList/components/TodoItem.vue';

describe('Todos', () => {
  let wrapper: ReturnType<typeof shallowMount>;
  const todos: Todo[] = [
    { id: '1', title: 'First Todo', isComplete: false },
    { id: '2', title: 'Second Todo', isComplete: true },
  ];

    beforeEach(() => {
        wrapper = shallowMount(TodoList, {
            props: {
                appTheme: AppThemeEnum.Light,
                todos,
                todosFilter: TodosFilterEnum.All,
                todosCount: todos.length,
            },
            global: {
                components: {
                TodoItem: TodoItem,
                draggable: { template: '<div />' },
                },
            },
        });
    });

    it('Should match the snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it('Should render correctly with default props', () => {
        const todosDiv = wrapper.find('[data-test="todos-list"]');

        expect(todosDiv.exists()).toBe(true);
        expect(todosDiv.classes()).toContain('todos');
        expect(wrapper.find('[data-test="todos-list-empty"]').exists()).toBe(false);
        expect(wrapper.find('[data-test="todos-list-counter"]').text()).toBe('2 items left');
    });

    it('Should display empty message when todosCount is 0', async () => {
        await wrapper.setProps({ todosCount: 0 });

        expect(wrapper.find('[data-test="todos-list-empty"]').exists()).toBe(true);
        expect(wrapper.find('[data-test="todos-list-counter"]').text()).toBe('0 items left');
    });

    it('Should apply dark theme class when appTheme is Dark', async () => {
        await wrapper.setProps({ appTheme: AppThemeEnum.Dark });
        expect(wrapper.find('.todos').classes()).toContain('todos-dark');
    });

    it('Should emit correct events when filter options are clicked', async () => {
        const allFilter = await wrapper.find('[data-test="todos-list-all-filter"]');
        const activeFilter = await wrapper.find('[data-test="todos-list-active-filter"]');
        const completedFilter = await wrapper.find('[data-test="todos-list-completed-filter"]');

        await allFilter.trigger('click');
        expect(wrapper.emitted('change-todos-filter')).toBeTruthy();
        expect(wrapper.emitted('change-todos-filter')?.[0]).toEqual([TodosFilterEnum.All]);

        await activeFilter.trigger('click');
        expect(wrapper.emitted('change-todos-filter')?.[1]).toEqual([TodosFilterEnum.Active]);

        await completedFilter.trigger('click');
        expect(wrapper.emitted('change-todos-filter')?.[2]).toEqual([TodosFilterEnum.Completed]);
    });

    it('Should emit delete-completed-todos event when Clear Completed is clicked', async () => {
        await wrapper.find('[data-test="todos-list-clear"]').trigger('click');
        expect(wrapper.emitted('delete-completed-todos')).toBeTruthy();
    });

    it('Should display correct filter classes based on selected filter', async () => {
        await wrapper.setProps({ todosFilter: TodosFilterEnum.All });
        expect(wrapper.find('[data-test="todos-list-all-filter"]').classes()).toContain('active-filter');
        
        await wrapper.setProps({ todosFilter: TodosFilterEnum.Active });
        expect(wrapper.find('[data-test="todos-list-active-filter"]').classes()).toContain('active-filter');

        await wrapper.setProps({ todosFilter: TodosFilterEnum.Completed });
        expect(wrapper.find('[data-test="todos-list-completed-filter"]').classes()).toContain('active-filter');
    });
});