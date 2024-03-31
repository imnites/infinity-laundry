import { Database, Resource } from '~/models';

export class ResourceService {
  private readonly _database: Database;

  public constructor(database: Database) {
    this._database = database;
  }

  public async getResourceByCode(code: string): Promise<Resource | null> {
    return this._database.models.resource.findOne({
      where: {
        code
      },
      order: [['createdAt', 'DESC']]
    });
  }
}
