import { Product as MedusaProduct } from "@medusajs/medusa";
import { Entity, OneToMany } from "typeorm";
import { VideoEmbed } from "./video-embed";

@Entity()
export class Product extends MedusaProduct {
  @OneToMany(() => VideoEmbed, (embed) => embed.product, {
    cascade: true,
    eager: true,
  })
  videoEmbeds: VideoEmbed[];
}

export default Product;
