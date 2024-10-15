import { render, screen, fireEvent } from '@testing-library/react';
import { TodoForm } from '@/components/TodoForm';
import { TodoFormProps } from '@/components/TodoForm';

describe('<TodoForm />', () => {
  // setup
  const setup = (props: Partial<TodoFormProps> = {}) => {
    const onInsert = jest.fn() as jest.MockedFunction<TodoFormProps['onInsert']>;
    const utils = render(<TodoForm onInsert={onInsert} {...props} />);
    const { getByText, getByPlaceholderText } = utils;
    const input = getByPlaceholderText('할 일을 입력하세요') as HTMLInputElement;
    const button = getByText('등록');
    return {
      input,
      button,
      onInsert,
      ...utils,
    };
  };

  // 개별 테스트 케이스
  it('has input and a button', () => {
    const { input, button } = setup();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('changes input', () => {
    const { input } = setup();
    fireEvent.change(input, {
      target: {
        value: 'TDD 배우는 중',
      },
    });
    expect(input).toHaveAttribute('value', 'TDD 배우는 중');
    // expect(input.value).toBe('TDD 배우는 중'); 는 잘못된 테스트 코드
  });

  it('calls onInsert and clears input', () => {
    const { input, button, onInsert } = setup();
    fireEvent.change(input, {
      target: {
        value: 'TDD 배우기',
      },
    });
    fireEvent.click(button);
    expect(onInsert).toBeCalledWith('TDD 배우기');
    expect(input).toHaveAttribute('value', '');
  });
});