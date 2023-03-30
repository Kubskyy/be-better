import { z } from 'zod';

import { router, publicProcedure } from '../trpc';


// export const todoRouter = router().query('getTodos', publicProcedure({
//   async resolve({ ctx }) {
//     const allTodos = await ctx.prisma.todo.findMany();
//     return allTodos;
//   },
// })).mutation('addTodo', publicProcedure({
//   input: {
//     title: trpc.joi.string(),
//     completed: trpc.joi.boolean().optional(),
//   },
//   async resolve({ input }, { ctx }) {
//     const newTodo = await ctx.prisma.todo.create({
//       data: {
//         title: input.title,
//         completed: input.completed || false,
//       },
//     });
//     return newTodo;
//   },
// }));




export const todoRouter = router({
    getTodos: publicProcedure
    .query(({ctx}) => {
      return ctx.prisma.todo.findMany();
    }),
    createTodo: publicProcedure
      .input(
        z.object({ todo: z.string() }))
      .mutation(async ({input, ctx}) => {
        const todo = await ctx.prisma.todo.create({
          data: {
            content: input.todo,
            status: false,
          }
        })
        
        return todo;
      }),
    // deleteTodo: publicProcedure
    //   .input(z.object({id: z.string()}))
    //   .mutation((req) => {
    //     const {input} = req;
    //     const { id } = input;
  
    //     const todoIndex = todos.findIndex((todo)=>todo.id === id);
  
    //     if( todoIndex === -1){
    //       throw new Error (`Todo with ID ${id} not found`);
    //     }
  
    //     const deleteTodo = todos.splice(todoIndex, 1)[0];
    //     return deleteTodo;
  
    //   }),
    //   checkTodo: publicProcedure
    //     .input(z.object({ id: z.string(), done: z.boolean() }))
    //     .mutation((req) => {
    //       const { input } = req;
    //       const { id } = input;
  
    //       const todoIndex = todos.findIndex((todo) => todo.id === id);
  
    //       if (todoIndex === -1) {
    //         throw new Error(`Todo with ID ${id} not found`);
    //       }
  
    //       const updatedTodo = { ...todos[todoIndex], done: !todos[todoIndex].done };
    //       todos[todoIndex] = updatedTodo;
  
    //       return updatedTodo;
    //     }),
  })