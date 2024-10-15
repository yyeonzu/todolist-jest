import { TodoList } from '@components/TodoList';
import { fireEvent, render, screen } from '@testing-library/react';

describe('<TodoList/>', () => {
  const sampleTodos = [
    { id: 1, text: 'TDD 배우기', done: true },
    { id: 2, text: 'react-testing-library 사용하기', done: true },
  ];

  const setup = () => {
    const onRemove = jest.fn();
    const handleCheckBox = jest.fn();
    const utils = render(<TodoList todos={sampleTodos} onRemove={onRemove} handleCheckBox={handleCheckBox} />);
    return {
      ...utils,
      onRemove,
    };
  };

  it('renders todos properly', () => {
    setup();
    screen.getByText(sampleTodos[0].text);
    screen.getByText(sampleTodos[1].text);

    // 기존 방식으로 expect(item1).toBeTruthy()를 사용해도 괜찮지만, 어차피 getByText가 안된다면 Fail이므로 생략해도 된다
  });

  it('calls onRemove', () => {
    const { onRemove } = setup();
    fireEvent.click(screen.getAllByText('삭제')[0]);
    expect(onRemove).toBeCalledWith(sampleTodos[0].id);
  });

});