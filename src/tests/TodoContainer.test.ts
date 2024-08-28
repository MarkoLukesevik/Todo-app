import { describe, it, beforeEach, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";

import { mockLocalStorage } from "./mockLocalStorage/mockLocalStorage";
import { TodosFilterEnum } from "@/models/TodosFilterEnum";

import TodosContainer from "@/components/TodosContainer/TodosContainer.vue";
import { AppThemeEnum } from "@/models/AppThemeEnum";

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('Test suite for todo container component', () => {
    let wrapper: any;

    beforeEach(() => {
        localStorage.clear();
        wrapper = shallowMount(TodosContainer, {
            props: {appTheme: AppThemeEnum.Light}
        });
    });

    it('Should add a new todo and update local storage', async () => {
        const newTodo = { id: '1', text: 'New Todo', isComplete: false };

        await wrapper.vm.addNewTodo(newTodo);

        expect(wrapper.vm.todos).toContainEqual(newTodo);
        expect(wrapper.vm.currentTodos).toContainEqual(newTodo);

        const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
        expect(storedTodos).toContainEqual(newTodo);
    });

    it('Should toggle a todo completion status and update localStorage', async () => {
        const todo = { id: '1', text: 'Todo', isComplete: false };
    
        wrapper.vm.todos = [todo];
        wrapper.vm.currentTodos = [todo];
    
        await wrapper.vm.toggleTodo('1');
    
        expect(wrapper.vm.todos[0].isComplete).toBe(true);
        expect(wrapper.vm.currentTodos[0].isComplete).toBe(true);
    
        const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
        expect(storedTodos).toContainEqual({ id: '1', text: 'Todo', isComplete: true });
      });

    it('Should delete a todo and update local storage', async () => {
        const todo = { id: '1', text: 'Todo', isComplete: false };

        wrapper.vm.todos = [todo];
        wrapper.vm.currentTodos = [todo];

        await wrapper.vm.deleteTodo('1');

        const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
        expect(storedTodos).toEqual([]);
      });

    it('Should delete completed todos and update local storage', async () => {
        const todos = [
            { id: '1', text: 'Todo 1', isComplete: true },
            { id: '2', text: 'Todo 2', isComplete: false },
            { id: '3', text: 'Todo 3', isComplete: true },
            { id: '4', text: 'Todo 4', isComplete: false },
          ];

        wrapper.vm.todos = todos;
        wrapper.vm.currentTodos = todos;

        await wrapper.vm.deleteCompletedTodos();

        expect(wrapper.vm.todos).toHaveLength(2);
        expect(wrapper.vm.currentTodos).toHaveLength(2);
        expect(wrapper.vm.todos).toEqual([
            { id: '2', text: 'Todo 2', isComplete: false },
            { id: '4', text: 'Todo 4', isComplete: false }
        ]);
        expect(wrapper.vm.currentTodos).toEqual([
            { id: '2', text: 'Todo 2', isComplete: false },
            { id: '4', text: 'Todo 4', isComplete: false }
        ]);

        const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
        expect(storedTodos).toHaveLength(2);
        expect(storedTodos).toEqual([
            { id: '2', text: 'Todo 2', isComplete: false },
            { id: '4', text: 'Todo 4', isComplete: false }
        ]);
    });

    it('Should filter current todos based on TodosFilterEnum', async () => {
        const todos = [
            { id: '1', text: 'Todo 1', isComplete: true },
            { id: '2', text: 'Todo 2', isComplete: false }
        ];

        wrapper.vm.todos = todos;
        wrapper.vm.currentTodos = todos;

        await wrapper.vm.changeTodosFilter(TodosFilterEnum.Active);

        expect(wrapper.vm.currentTodos).toHaveLength(1);
        expect(wrapper.vm.currentTodos).toEqual([{ id: '2', text: 'Todo 2', isComplete: false }]);

        expect(wrapper.vm.todos).toHaveLength(2);
        expect(wrapper.vm.todos).toEqual([
            { id: '1', text: 'Todo 1', isComplete: true },
            { id: '2', text: 'Todo 2', isComplete: false }
        ]);
    });

    it('Should update todos order and local storage', async () => {
        const todos = [
            { id: '1', text: 'Todo 1', isComplete: false },
            { id: '2', text: 'Todo 2', isComplete: false }
        ];


        const reorderedTodos = [
            { id: '2', text: 'Todo 2', isComplete: false },
            { id: '1', text: 'Todo 1', isComplete: false }
        ];
        
        wrapper.vm.todos = todos;
        wrapper.vm.currentTodos = todos;

        expect(wrapper.vm.todos).toEqual(todos);
      
        await wrapper.vm.updateTodosOrder(reorderedTodos);

        expect(wrapper.vm.todos).toEqual(reorderedTodos);
      
        const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
        expect(storedTodos).toEqual(reorderedTodos);
    });

    it('Should render correct dra and drop text color based on app theme prop', async () => {
        expect(wrapper.vm.dragAndDropTextColor).toBe('#9495A5');
        
        await wrapper.setProps({appTheme: AppThemeEnum.Dark});

        expect(wrapper.vm.dragAndDropTextColor).toBe('#5B5E7E');
    });
})