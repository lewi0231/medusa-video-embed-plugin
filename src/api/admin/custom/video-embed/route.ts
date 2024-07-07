import type {
  MedusaRequest,
  MedusaResponse,
  UserService,
} from "@medusajs/medusa";
import VideoEmbedService from "src/services/video-embed";
import { VideoEmbed } from "src/types/product";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const id = req.user.userId;

    // verify is authorized user
    const userService = req.scope.resolve<UserService>("userService");
    const user = await userService.retrieve(id);

    if (user.role !== "admin") {
      res
        .status(403)
        .json({ error: "You do not have the required permissions" });
      return;
    }

    // extract the data
    const body = req.body;

    const videoEmbedService =
      req.scope.resolve<VideoEmbedService>("videoEmbedService");

    // Update videoEmbeds
    const result = await videoEmbedService.update(
      body as { videoEmbeds: VideoEmbed[] }
    );

    // return the result
    res.json({
      result,
    });
  } catch (error) {
    console.error("Problem updating video embeds: ", error);
  }
};
