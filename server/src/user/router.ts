import { z } from 'zod';

import { router, publicProcedure } from '../trpc';

import { users, todos } from './db';
import { User, Todo } from './types';

export const userRouter = router({
  getUsers: publicProcedure.query(() => {
    return users;
  }),
  getUserById: publicProcedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const { input } = req;

      const user = users.find((user) => user.id === input);

      return user;
    }),
  createUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation((req) => {
      const { input } = req;

      const user: User = {
        id: `${Math.random()}`,
        name: input.name,
      };

      users.push(user);

      return user;
    }),
});

export const todoRouter = router({
  getTodos: publicProcedure.query(() => {
    return todos;
  }),
  createTodo: publicProcedure
    .input(z.object({ todo: z.string() }))
    .mutation((req) => {
      const { input } = req;

      const todo: Todo = {
        id: `${Math.random()}`,
        text: input.todo,
        done: false,
      };

      todos.push(todo);

      return todo;
    }),
  deleteTodo: publicProcedure
    .input(z.object({id: z.string()}))
    .mutation((req) => {
      const {input} = req;
      const { id } = input;

      const todoIndex = todos.findIndex((todo)=>todo.id === id);

      if( todoIndex === -1){
        throw new Error (`Todo with ID ${id} not found`);
      }

      const deleteTodo = todos.splice(todoIndex, 1)[0];
      return deleteTodo;

    }),
    checkTodo: publicProcedure
      .input(z.object({ id: z.string(), done: z.boolean() }))
      .mutation((req) => {
        const { input } = req;
        const { id } = input;

        const todoIndex = todos.findIndex((todo) => todo.id === id);

        if (todoIndex === -1) {
          throw new Error(`Todo with ID ${id} not found`);
        }

        const updatedTodo = { ...todos[todoIndex], done: !todos[todoIndex].done };
        todos[todoIndex] = updatedTodo;

        return updatedTodo;
      }),
})