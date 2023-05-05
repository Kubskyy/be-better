import * as React from 'react';
import './App.css';
import { trpc } from './trpc';

const App = () => {
  const [todo, setTodo] = React.useState('');

  const { data, isLoading, refetch } = trpc.todo.getTodos.useQuery();


  const createTodoMutation = trpc.todo.createTodo.useMutation({
    onSuccess: () => refetch(),
  });

  const deleteTodoMutation = trpc.todo.deleteTodo.useMutation({
    onSuccess: () => refetch(),
  });

  const checkTodoMutation = trpc.todo.checkTodo.useMutation({
    onSuccess: () => refetch(),
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTodo(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setTodo('');
    createTodoMutation.mutate({todo});
    event.preventDefault();
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodoMutation.mutate({ id });
  };

  const handleCheckTodo = (id: string, done: boolean) => {
    checkTodoMutation.mutate({ id, done});
  };


  if (isLoading) return <span>Loading ...</span>;

  return (
    <div>
      <h1>feature branch edit</h1>
      <ul>
        {(data ?? []).map((todo : any) => (
          <li key={todo.id} 
          style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
          >
            <input
              type="checkbox"
              checked={todo.status}
              onChange={() => handleCheckTodo(todo.id, todo.done)}
            />
            {todo.content}{' '}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Todo:</label>
        <input
          id="name"
          type="text"
          value={todo}
          onChange={handleChange}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default App;
