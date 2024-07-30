import { Model, Table, Column, DataType } from "sequelize-typescript";

interface Children {
  code: string;
  name: string;
  registration_date: Date;
  introducer_code: string;
  relationship: "direct" | "indirect";
}

@Table({
  tableName: "policyholders",
  timestamps: false,
})
export class Policyholder extends Model {
  @Column({
    type: DataType.STRING(20),
    primaryKey: true,
    allowNull: false,
  })
  code!: string;

  @Column(DataType.STRING(50))
  name!: string;

  @Column({
    type: DataType.STRING(20),
    unique: true,
    allowNull: false,
  })
  id_number!: string;
  

  @Column(DataType.DATE)
  registration_date!: Date;

  @Column(DataType.STRING(20))
  introducer_code!: string;

  @Column(DataType.JSON)
  l!: Children[];

  @Column(DataType.JSON)
  r!: Children[];
}
