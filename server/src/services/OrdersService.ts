import { Database, Product } from '~/models';
import { UUIDV4 } from 'sequelize';

export class OrdersService {
  private readonly _database: Database;

  public constructor(database: Database) {
    this._database = database;
  }

  public async putProduct({
    target,
    product: { name }
  }: {
    target: { id: string } | null;
    product: { name: string };
  }): Promise<void> {
    let p: Product | null = null;
    if (target !== null) {
      p = await this._getProductOrFault(target.id);
    }

    p = await this._database.models.product.build({
      id: new UUIDV4(),
      name,
      slug: '1',
      description: '',
      summary: ''
    });

    await p.save();
    return;
  }

  private async _getProductOrFault(id: string): Promise<Product> {
    const product = await this._database.models.product.findByPk(id);

    if (product === null) {
      throw new Error('Product not found with given id');
    }

    return product;
  }
}
