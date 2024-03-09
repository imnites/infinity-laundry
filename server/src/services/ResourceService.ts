import { Database } from '~/models';

export class ResourceService {
  private readonly _database: Database;

  public constructor(database: Database) {
    this._database = database;
  }
}
