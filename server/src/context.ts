import * as trpcExpress from '@trpc/server/adapters/express';
import {prisma} from "../utils/prisma";

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {
    prisma,
  };
};