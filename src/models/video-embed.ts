import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./product";

@Entity("video_embed")
export class VideoEmbed extends BaseEntity {
  @Column({ type: "varchar" })
  provider?: "youtube" | null;

  @Column({ type: "varchar" })
  embed_id: string;

  @Column({ type: "varchar" })
  product_id: string;

  @Column({ type: "varchar" })
  channel_id?: string;

  @Column({ type: "varchar" })
  channel_name?: string;

  @ManyToOne(() => Product, (product) => product.videoEmbeds)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "videoUrl");
  }
}

export default VideoEmbed;
