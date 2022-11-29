import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class AuthModel extends Model {
  @Column
  name: string;

  @Column
  password: string;
}
