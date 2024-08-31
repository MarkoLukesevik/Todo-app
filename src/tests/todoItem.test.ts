import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import { AppThemeEnum } from '@/models/AppThemeEnum';
import type { Todo } from '@/models/Todo';

import TodoItem from '@/components/TodosContainer/components/TodoList/components/TodoItem.vue';

describe('TodoItem', () => {
    let wrapper: ReturnType<typeof shallowMount>;

    const todo: Todo = {
        id: '1',
        title: 'Sample Todo',
        isComplete: false,
    };

    beforeEach(() => {
        wrapper = shallowMount(TodoItem, {
            props: {
                appTheme: AppThemeEnum.Light,
                todo,
            },
            global: {
                components: {
                CheckButton: { template: '<div />' },
                XButton: { template: '<div />' },
                },
            },
        });
    });

    it('Should match the snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it('Should render correctly with default props', () => {
        const todoItem = wrapper.find('[data-test="todo-item"]');

        expect(todoItem.exists()).toBe(true);
        expect(todoItem.classes()).toContain('todo-item');
        expect(todoItem.classes()).not.toContain('todo-item__dark');
        expect(todoItem.classes()).not.toContain('todo-item__completed');
        expect(wrapper.find('[data-test="todo-item-title"]').text()).toBe('Sample Todo');
    });

    it('Should apply dark theme class when appTheme is Dark', async () => {
        await wrapper.setProps({ appTheme: AppThemeEnum.Dark });
        expect(wrapper.find('.todo-item').classes()).toContain('todo-item__dark');
    });

    it('Should apply completed class when todo isComplete is true', async () => {
        await wrapper.setProps({ todo: { ...todo, isComplete: true } });
        expect(wrapper.find('.todo-item').classes()).toContain('todo-item__completed');
    });

    it('Should emit toggle-todo event with the todo id when CheckButton is toggled', async () => {
        await wrapper.findComponent({ name: 'CheckButton' }).vm.$emit('toggle', todo.id);
        expect(wrapper.emitted('toggle-todo')).toBeTruthy();
        expect(wrapper.emitted('toggle-todo')?.[0]).toEqual([todo.id]);
    });

    it('Should emit delete-todo event with the todo id when XButton is clicked', async () => {
        await wrapper.findComponent({ name: 'XButton' }).vm.$emit('button-click');
        expect(wrapper.emitted('delete-todo')).toBeTruthy();
        expect(wrapper.emitted('delete-todo')?.[0]).toEqual([todo.id]);
    });
});