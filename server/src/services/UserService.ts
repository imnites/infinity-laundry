import { Database } from '~/models';

export class UserService {
  private readonly _database: Database;

  public constructor(database: Database) {
    this._database = database;
  }
}
