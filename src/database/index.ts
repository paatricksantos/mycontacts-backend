import { Client } from 'pg';

interface IContact {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  category_id?: string;
}

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client.connect();

export const Query = async (
  _query: string,
  values?: string[],
): Promise<IContact[]> => {
  const { rows } = await client.query(_query, values);

  return rows;
};
