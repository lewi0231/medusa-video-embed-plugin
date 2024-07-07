import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { VideoEmbed } from "../models/video-embed";

const VideoEmbedRepository = dataSource.getRepository(VideoEmbed);
export default VideoEmbedRepository;
