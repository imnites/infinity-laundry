import { Database, Template } from '~/models';

export class TemplateService {
  private readonly _database: Database;

  public constructor(database: Database) {
    this._database = database;
  }

  public async getTemplateDetails(slug: string): Promise<Template | null> {
    return this._database.models.template.findOne({
      where: {
        slug
      },
      order: [['createdAt', 'DESC']]
    });
  }
}
