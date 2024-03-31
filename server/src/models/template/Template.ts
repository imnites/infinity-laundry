import { DataTypes, Model } from 'sequelize';
import { ModelDef } from '../types';

export class Template extends Model {
  public get Id(): string {
    return this.getDataValue('id') as string;
  }

  public get Slug(): string {
    return this.getDataValue('slug') as string;
  }

  public get Name(): string {
    return this.getDataValue('name') as string;
  }

  public get Status(): boolean {
    return this.getDataValue('status') as boolean;
  }

  public get HTML(): string {
    return this.getDataValue('html') as string;
  }

  public get CSS(): string {
    return this.getDataValue('css') as string;
  }

  public get Javascript(): string {
    return this.getDataValue('javascript') as string;
  }
}

export const TemplateDef: ModelDef = {
  fields: {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    css: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    javascript: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  options: {}
};
