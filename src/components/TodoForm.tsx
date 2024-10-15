// input에 할 일을 입력, button 클릭 시 할 일 목록 추가
import { useCallback, useState } from 'react';

export interface TodoFormProps {
  onInsert: (value: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onInsert }) => {

  const [value, setValue] = useState('');
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);

  const onSubmit = useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
    onInsert(value);
    setValue('');
    e.preventDefault();
  }, [onInsert, value]);

  return (
    <form onSubmit={onSubmit}>
      <input placeholder={'할 일을 입력하세요'} onChange={onChange} value={value} />
      <button type="submit">등록</button>
    </form>
  );
};

