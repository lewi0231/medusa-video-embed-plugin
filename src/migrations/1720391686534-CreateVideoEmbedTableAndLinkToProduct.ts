import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateVideoEmbedTableAndLinkToProduct1720391686534
  implements MigrationInterface
{
  name = "CreateVideoEmbedTableAndLinkToProduct1720391686534";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE "video_embed" (
            "id" varchar PRIMARY KEY,
            "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            "provider" varchar,
            "embed_id" varchar NOT NULL,
            "product_id" varchar NOT NULL,
            "channel_id" varchar,
            "channel_name" varchar
            );
    `
    );

    await queryRunner.createForeignKey(
      "video_embed",
      new TableForeignKey({
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "product",
        name: "FK_video_embed_product",
        onUpdate: "cascade",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("video_embed", "FK_video_embed_product");
    await queryRunner.dropTable("video_embed");
  }
}
