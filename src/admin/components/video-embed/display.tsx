import { VideoEmbed } from "src/types/product";

type Props = {
  videoEmbeds: VideoEmbed[];
};
const Display = ({ videoEmbeds = [] }: Props) => {
  return (
    <div className="gap-y-xsmall mb-large mt-base flex flex-col">
      <div className="flex justify-between">
        <h2 className="inter-base-semibold">Channel id</h2>
        <h2 className="inter-base-semibold">Embed id</h2>
      </div>
      <div className="gap-y-xsmall flex flex-col">
        <div className="inter-base-regular text-grey-50 w-full ">
          {videoEmbeds?.length > 0
            ? videoEmbeds.map((link: VideoEmbed) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between w-full text-small"
                >
                  <p>{link.channel_id}</p>
                  <p>{link.embed_id}</p>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Display;
