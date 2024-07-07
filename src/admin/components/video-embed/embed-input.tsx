import { Plus } from "@medusajs/icons";
import { Button, Input } from "@medusajs/ui";
import React from "react";

type Props = {
  appendVideoEmbed: (embedId: string, channelId: string) => void;
};

const EmbedInput = ({ appendVideoEmbed }: Props) => {
  const [embedId, setEmbedId] = React.useState("");
  const [channelId, setChannelId] = React.useState("");

  return (
    <div className="flex w-full justify-between items-center">
      <Input
        placeholder="Your video embed id"
        className="flex-auto min-w-[300px] my-4"
        onChange={(e) => setEmbedId(e.target.value)}
        value={embedId}
      />
      <Input
        placeholder="Your video channel id"
        className="flex-auto min-w-[300px] my-4"
        onChange={(e) => setChannelId(e.target.value)}
        value={channelId}
      />
      <Button
        type="button"
        className="w-fit"
        onClick={() => {
          appendVideoEmbed(embedId, channelId);
          setEmbedId("");
          setChannelId("");
        }}
      >
        <Plus className="mr-2" /> Add Id
      </Button>
    </div>
  );
};

export default EmbedInput;
