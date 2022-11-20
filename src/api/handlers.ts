import { rest } from 'msw';
import * as f from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import * as T from 'fp-ts/Task';
import * as O from 'fp-ts/Option';

export type DatabaseError = { type: 'database_error'; reason: string };
export type NotFoundError = { type: 'notfound_error'; reason: string };

const createNotFoundError = (): NotFoundError => ({
  type: 'notfound_error',
});

const createDatabaseError = (reason: string): DatabaseError => ({
  type: 'database_error',
  reason,
});

import { db } from './db';
type Todo = { title: string; createdAt: Date };

const safeDbGetTodos = () =>
  TE.tryCatch(
    () => db.getAll<Array<Todo>>('todos'),
    (e) => createDatabaseError(`${e}`)
  );

const safeDbGetTodo = (id: string) =>
  TE.tryCatch(
    () => db.getById<Todo>('todo', id),
    (e) => createDatabaseError(`${e}`)
  );

const liftOptionalDbResult = <L, R>(result: E.Either<L, O.Option<R>>) =>
  f.pipe(
    result,
    E.chainW(
      O.fold(
        () => E.left(createNotFoundError()),
        (value) => E.right(value)
      )
    )
  );

export const handlers = [
  rest.post('/todos/:id', (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get('/todos', (req, res, ctx) => {
    return f.pipe(
      safeDbGetTodos(),
      TE.fold(
        () => res(ctx.status(500)),
        (data) => res(ctx.status(200), ctx.json(data))
      )
    );
  }),
];
