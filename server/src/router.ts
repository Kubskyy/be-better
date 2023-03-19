import { router } from './trpc';
import { userRouter, todoRouter } from './user/router';

export const appRouter = router({
  user: userRouter,
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;