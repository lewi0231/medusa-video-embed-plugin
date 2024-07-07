import { Product as MedusaProduct } from "@medusajs/medusa";

export interface VideoEmbed {
  id: string;
  created_at?: string;
  updated_at?: string;
  provider?: "youtube" | null;
  channel_id?: string;
  channel_name?: string;
  embed_id: string;
  product_id: string;
}

export interface Product extends MedusaProduct {
  videoEmbeds: VideoEmbed[];
}
