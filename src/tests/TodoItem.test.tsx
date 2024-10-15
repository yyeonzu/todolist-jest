import { TodoProps } from '@/types/todoProps';
import { screen, render, fireEvent } from '@testing-library/react';
import { TodoItem } from '@/components/TodoItem';

describe('<TodoItem/>', () => {
  const sampleTodo = {
    id: 1,
    text: 'TDD 배우기 2',
    done: false,
  };

  const setup = (props = {} as TodoProps) => {
    const onRemove = jest.fn(); // mock 함수
    const handleCheckBox = jest.fn();
    const initialProps = { todo: sampleTodo };
    const utils = render(<TodoItem {...initialProps} {...props} onRemove={onRemove} handleCheckBox={handleCheckBox} />);
    const todo = props.todo || initialProps.todo;
    const input = screen.getByLabelText(todo.text, { selector: 'input' });
    const label = screen.getByText(todo.text);
    const button = screen.getByText('삭제');
    return {
      ...utils,
      input,
      label,
      button,
      onRemove,
      handleCheckBox,
    };
  };

  it('has input, label, and button', () => {
    const { input, label, button } = setup();
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });


  it('input is checked and line-through if done is true', () => {
    const { input, label } = setup({ todo: { ...sampleTodo, done: true } });
    expect(input).toBeChecked();
    expect(label).toHaveStyle('text-decoration: line-through');
  });

  it('input is not checked and not line-through if done is false', () => {
    const { input, label } = setup({ todo: { ...sampleTodo, done: false } });
    expect(input).not.toBeChecked();
    expect(label).not.toHaveStyle('text-decoration: line-through');
  });

  it('calls onRemove', () => {
    const { button, onRemove } = setup();
    fireEvent.click(button);
    expect(onRemove).toBeCalledWith(sampleTodo.id);
  }); // 현재 클릭한 버튼의 id가 onRemove 함수에 전달되는지 확인

  it('calls handleCheckBox', () => {
    const { input, handleCheckBox } = setup();
    fireEvent.click(input);
    expect(handleCheckBox).toBeCalledWith(sampleTodo.id, !sampleTodo.done);
  });


});