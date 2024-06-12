import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMovie1718161242290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'year',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'duration',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'synopsis',
            type: 'varchar',
          },
          {
            name: 'genre_id',
            type: 'uuid',
          },
          {
            name: 'director_id',
            type: 'uuid',
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
      'movie',
      new TableForeignKey({
        columnNames: ['genre_id'],
        referencedColumnNames: ['id'],
        name: 'Fk_GenreInMovie',
        referencedTableName: 'genre',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'movie',
      new TableForeignKey({
        columnNames: ['director_id'],
        referencedColumnNames: ['id'],
        name: 'Fk_DirectorInMovie',
        referencedTableName: 'director',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('movie', 'Fk_DirectorInMovie');

    await queryRunner.dropForeignKey('movie', 'Fk_GenreInMovie');
    await queryRunner.dropTable('movie');
  }
}
