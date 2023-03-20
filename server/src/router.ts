import { todoRouter } from './todo/router';
import { router } from './trpc';
import { userRouter } from './user/router';

export const appRouter = router({
  user: userRouter,
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;