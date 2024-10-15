import { TodoListProps } from '@/types/todoListProps';
import { TodoItem } from '@components/TodoItem';

export const TodoList = ({ todos, onRemove, handleCheckBox }: TodoListProps) => {
  return (
    <ul data-testid="todo-list">
      {/* 어디서든 이 컴포넌트를 테스트할 수 있도록 data-test id를 추가*/}
      {todos.map(todo => (
        <TodoItem onRemove={onRemove} handleCheckBox={handleCheckBox} todo={todo} key={todo.id} />),
      )}
    </ul>
  );

};