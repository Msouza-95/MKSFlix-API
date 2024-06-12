import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCast1718162659613 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cast',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'movie_id',
            type: 'uuid',
          },
          {
            name: 'actor_id',
            type: 'uuid',
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'cast',
      new TableForeignKey({
        columnNames: ['movie_id'],
        referencedColumnNames: ['id'],
        name: 'Fk_MovieInCast',
        referencedTableName: 'movie',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'cast',
      new TableForeignKey({
        columnNames: ['actor_id'],
        referencedColumnNames: ['id'],
        name: 'Fk_ActorInCast',
        referencedTableName: 'actor',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cast', 'Fk_MovieInCast');
    await queryRunner.dropForeignKey('cast', 'Fk_ActorInCast');
    await queryRunner.dropTable('cast');
  }
}
