import { Entity, Column, PrimaryColumn, DataSource } from "typeorm";

@Entity()
class ExampleEntity {
  @PrimaryColumn()
  id: string;

  @Column({ update: false })
  notUpdatable: string;

  @Column()
  updatable: string;
}

const datasource = new DataSource({
  name: "default",
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "postgres",
  database: "postgres",
  schema: "public",
  synchronize: false,
  entities: [ExampleEntity],
  migrations: ["migrations/*.ts"],
});

export default datasource;

Error.stackTraceLimit = 100;

async function main() {
  await datasource.initialize();

  const entity = new ExampleEntity();
  entity.id = "1";
  entity.notUpdatable = "before change";
  entity.updatable = "before change";

  await datasource.manager.save(entity);

  entity.notUpdatable = "after change";
  entity.updatable = "after change";

  await datasource.manager.save(entity);

  entity.notUpdatable = "after change 2";

  // throws
  await datasource.manager.save(entity);

  await datasource.destroy();
}

if (require.main === module) {
  main();
}
