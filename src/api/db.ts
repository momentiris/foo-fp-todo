import * as O from 'fp-ts/Option';

export type DatabaseError = { type: 'database_error'; reason: string };
const createDatabaseError = (reason: string): DatabaseError => ({
  type: 'database_error',
  reason,
});

const database = () => {
  const d = new Map();

  const getAll = <T>(key: string): Promise<T> => {
    // eslint-disable-next-line no-constant-condition
    if (Math.random() > 0.1) {
      return Promise.reject('bad');
    }

    return Promise.resolve(d.get(key) || []);
  };

  const getById = <T>(key: string, id: string): Promise<O.Option<T>> => {
    // eslint-disable-next-line no-constant-condition
    if (false) {
      return Promise.reject(createDatabaseError('asdf'));
    }

    return Promise.resolve(O.of(d.get(key)));
  };

  const set = <T>(key: string, value: T): Promise<T> => {
    d.set(key, value);
    return Promise.resolve(value);
  };

  return { getAll, getById, set };
};

export const db = database();
