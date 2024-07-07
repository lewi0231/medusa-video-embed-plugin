import { TransactionBaseService } from "@medusajs/medusa";
import VideoEmbedRepository from "../repositories/video-embed";
import { VideoEmbed } from "../types/product";

class VideoEmbedService extends TransactionBaseService {
  protected videoEmbedRepository: typeof VideoEmbedRepository;

  constructor(container) {
    super(container);
    this.videoEmbedRepository = container.videoEmbedRepository;
  }

  async update(data: { videoEmbeds: VideoEmbed[] }) {
    const productId = data.videoEmbeds.find(
      (link) => link.product_id
    )?.product_id;

    return this.atomicPhase_(async (manager) => {
      const videoEmbedRepo = manager.withRepository(this.videoEmbedRepository);
      const currentVideoEmbeds = await videoEmbedRepo.findBy({
        product_id: productId,
      });

      // Filter out the missing videoEmbeds
      const toBeDeleted = currentVideoEmbeds.filter(
        (link) => !data.videoEmbeds.map((video) => video.id).includes(link.id)
      );

      const insertResults = [];

      // Iterate through updating or creating (will update if id exists)
      const toBeDeletedIds = toBeDeleted.map((link) => link.id);
      for (const videoEmbedData of data.videoEmbeds) {
        if (!toBeDeletedIds.includes(videoEmbedData.id)) {
          const link = await videoEmbedRepo.upsert(videoEmbedData, ["id"]);
          insertResults.push(link);
        }
      }

      const removeResults = [];

      for (const videoEmbedData of toBeDeleted) {
        const deleted = await videoEmbedRepo.remove(videoEmbedData);
        removeResults.push(deleted);
      }

      return { insertResults, removeResults };
    });
  }

  async list() {
    return this.atomicPhase_(async (manager) => {
      const videoEmbedRepo = manager.withRepository(this.videoEmbedRepository);
      const videoEmbeds = await videoEmbedRepo.find({
        order: { created_at: "DESC" },
        relations: {
          product: true,
        },
      });

      return { videoEmbeds };
    });
  }
}

export default VideoEmbedService;
