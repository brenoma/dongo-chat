import {
  Connection,
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMessagesTable1636169351052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'content',
            type: 'varchar',
          },
          {
            name: 'authorId',
            type: 'int',
          },
          //   {
          //     name: 'roomId',
          //     type: 'int',
          //     isPrimary: true,
          //   },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys(
      'messages',
      [
        new TableForeignKey({
          columnNames: ['authorId'],
          referencedTableName: 'users',
          referencedColumnNames: ['id']
        }),
        // new TableForeignKey({
        //     columnNames: ['roomId'],
        //     referencedTableName: 'rooms',
        //     referencedColumnNames: ['id']
        // })
      ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages');
  }
}
