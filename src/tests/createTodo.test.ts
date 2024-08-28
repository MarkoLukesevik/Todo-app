import { beforeEach, describe, expect, it, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";

import { AppThemeEnum } from "@/models/AppThemeEnum";

import CreateTodo from "@/components/TodosContainer/components/CreateTodo.vue";
import CheckButton from "@/base-components/CheckButton.vue";
import TextInput from "@/base-components/TextInput.vue";

vi.mock('@/helpers/generateid', () => ({
    generateId: vi.fn(() => '12345'),
}));

describe('Test suite for create todo component', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = shallowMount(CreateTodo, {
            props: {
                appTheme: AppThemeEnum.Light
            }
        });
    });

    it('Should match the snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it('Should render correct background color based on appTheme prop', async () => {
        const container = await wrapper.find('[data-test="create-todo-container"]');

        expect(container.element.style.getPropertyValue('background-color')).toBe('rgb(255, 255, 255)');

        await wrapper.setProps({ appTheme: AppThemeEnum.Dark });
        expect(container.element.style.getPropertyValue('background-color')).toBe('rgb(37, 39, 61)');
    });

    it('Should emit create-todo event with correct data when handleAddNewTodo is called', async () => {
        wrapper.vm.newTodoTitle = 'Test Todo';
        wrapper.vm.newTodoIsComplete = true;

        await wrapper.vm.handleAddNewTodo();

        expect(wrapper.emitted('create-todo')).toHaveLength(1);
        expect(wrapper.emitted('create-todo')[0]).toEqual([{
            id: '12345',
            title: 'Test Todo',
            isComplete: true,
        }]);

        expect(wrapper.vm.newTodoTitle).toBe('');
        expect(wrapper.vm.newTodoIsComplete).toBe(false);
    });

    it('Should toggle newTodoIsComplete when toggleNewTodo is called', async () => {
        expect(wrapper.vm.newTodoIsComplete).toBe(false);

        await wrapper.vm.toggleNewTodo();
        expect(wrapper.vm.newTodoIsComplete).toBe(true);

        await wrapper.vm.toggleNewTodo();
        expect(wrapper.vm.newTodoIsComplete).toBe(false);
    });

    it('triggers handleAddNewTodo when Enter key is pressed', async () => {
        wrapper.vm.newTodoTitle = 'Test Todo';
    
        await wrapper.trigger('keyup.enter');
    
        expect(wrapper.emitted('create-todo')).toHaveLength(1);
        expect(wrapper.emitted('create-todo')[0]).toEqual([{
            id: '12345',
            title: 'Test Todo',
            isComplete: false,
        }]);
    });

    it('Should render check-button and text-input components', () => {
        const checkButton = wrapper.findComponent(CheckButton);
        expect(checkButton.exists()).toBe(true);
    
        const textInput = wrapper.findComponent(TextInput);
        expect(textInput.exists()).toBe(true);
    });
});