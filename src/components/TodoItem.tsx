import { TodoItemProps } from '@/types/todoItemProps';
import styled from 'styled-components';
import { useCallback } from 'react';

interface LabelProps {
  checked: boolean;
}

export const TodoItem = ({ todo, onRemove, handleCheckBox }: TodoItemProps) => {
  const { id, text, done } = todo;
  const remove = useCallback(() => onRemove(id), [id, onRemove]);
  return (
    <li>
      <input type="checkbox" id={text} checked={done} onChange={() => handleCheckBox(id, !done)} />
      <Label htmlFor={text} checked={done}>{text}</Label>
      <button type="button" onClick={remove}>삭제</button>
    </li>
  );
};

const Label = styled.label<LabelProps>`
    ${({ checked }) => checked && 'text-decoration: line-through;'}
`;