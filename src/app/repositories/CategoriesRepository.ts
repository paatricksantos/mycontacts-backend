import { Query } from '../../database';

interface ICategory {
  id?: string;
  name: string;
}

class CategoriesRepository {
  async findAll(): Promise<ICategory[]> {
    const rows = await Query(`
      SELECT * FROM categories ORDER BY name
    `);

    return rows;
  }

  async findById(id: string): Promise<ICategory> {
    const [row] = await Query(
      `
     SELECT * FROM categories WHERE id = $1
    `,
      [id],
    );

    return row;
  }

  async findByName(name: string): Promise<ICategory> {
    const [row] = await Query(
      `
    SELECT * FROM categories WHERE name = $1
    `,
      [name],
    );

    return row;
  }

  async create(name: string): Promise<ICategory> {
    const [row] = await Query(
      `
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *
    `,
      [name],
    );

    return row;
  }

  async update({ id, name }: ICategory): Promise<ICategory> {
    const [row] = await Query(
      `
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING *
      `,
      [name, id],
    );

    return row;
  }

  async delete(id: string) {
    const deleteOp = await Query(`DELETE FROM categories WHERE id = $1`, [id]);

    return deleteOp;
  }
}

export default new CategoriesRepository();
