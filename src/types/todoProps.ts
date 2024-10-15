export interface TodoProps {
  todo: {
    id: number;
    text: string;
    done: boolean;
  };
}

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}