import { TodoForm } from '@components/TodoForm';
import { TodoList } from '@components/TodoList';
import { useCallback, useEffect, useState } from 'react';
import { Todo } from '@/types/todoProps';

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onInsert = useCallback((value: string) => {
    const newId = todos[todos.length - 1] ? todos[todos.length - 1].id + 1 : 1;
    const newData = {
      id: newId,
      text: value,
      done: false,
    };

    setTodos(todos => [...todos, newData]);
  }, [todos]);

  const handleCheckBox = useCallback((id: number, done: boolean) => {
    const filtered = todos.map(data => {
      if (data.id === id) {
        return { ...data, done };
      }
      return data;
    });
    setTodos(filtered);
  }, [todos]);

  const onRemove = useCallback((id: number) => {
    const filtered = todos.filter(data => data.id !== id);
    setTodos(filtered);
  }, [todos]);

  useEffect(() => {
    const data = [
      {
        id: 1,
        text: 'TDD 배우기',
        done: true,
      },
      {
        id: 2,
        text: 'react-testing-library 사용하기',
        done: true,
      },
    ];
    setTodos(data);
  }, []);
  return (<div>
    <TodoForm onInsert={onInsert} data-testid="todo-form" />
    <TodoList todos={todos} onRemove={onRemove} handleCheckBox={handleCheckBox} />
  </div>);
};