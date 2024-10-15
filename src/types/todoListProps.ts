import { Todo } from '@/types/todoProps';

export interface TodoListProps {
  todos: Todo[];
  onRemove: (id: number) => void;
  handleCheckBox: (id: number, done: boolean) => void;
}