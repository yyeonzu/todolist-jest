import { TodoApp } from '@/components/TodoApp';
import { fireEvent, render, screen } from '@testing-library/react';

describe('<TodoApp/>', () => {
  it('renders TodoForm and TodoList', () => {
    render(<TodoApp />);
    screen.getByText('등록');
    screen.getByTestId('todo-list');
  });

  it('renders two defaults todos', () => {
    render(<TodoApp />);
    screen.getByText('TDD 배우기');
    screen.getByText('react-testing-library 사용하기');
  });

  it('creates new todo', () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText('할 일을 입력하세요');
    const button = screen.getByText('등록');
    fireEvent.change(input, {
      target: {
        value: '새 항목 추가하기',
      },
    });
    fireEvent.click(button);
    screen.getByText('새 항목 추가하기');
  });

  it('checkbox todo', () => {
    render(<TodoApp />);
    const input = screen.getByLabelText('TDD 배우기', { selector: 'input' });
    const label = screen.getByText('TDD 배우기');
    expect(label).toHaveStyle('text-decoration: line-through;');
    fireEvent.click(input);
    expect(label).not.toHaveStyle('text-decoration: line-through;');
    fireEvent.click(input);
    expect(label).toHaveStyle('text-decoration: line-through;');
  });

  it('removes todo', () => {
    render(<TodoApp />);
    const todoText = screen.getByText('TDD 배우기');
    const removeButton = screen.getAllByText('삭제')[0];
    fireEvent.click(removeButton);
    expect(todoText).not.toBeInTheDocument();
  });

});