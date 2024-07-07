import { zodResolver } from "@hookform/resolvers/zod";
import { XMark } from "@medusajs/icons";
import { Button, Input } from "@medusajs/ui";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { VideoEmbed } from "src/types/product";
import { z } from "zod";
import EmbedInput from "./embed-input";

const UpdateVideoEmbedSchema = z.object({
  id: z.string().uuid({ message: "Incorrect id format." }),
  provider: z.enum(["youtube"]).optional(),
  embed_id: z.string().min(1),
  product_id: z.string().min(1),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  channel_id: z.string().optional(),
  channel_name: z.string().optional(),
});

const UpdateVideoEmbedSchemaArray = z.object({
  videoEmbeds: z.array(UpdateVideoEmbedSchema),
});

type Props = {
  videoEmbeds: VideoEmbed[];
  productId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  videoEmbedsOptimisticUpdate: (videoEmbeds: Partial<VideoEmbed>[]) => void;
};
const EmbedForm = ({
  videoEmbeds,
  productId,
  setOpen,
  videoEmbedsOptimisticUpdate,
}: Props) => {
  const [previousVideoEmbeds, setPreviousVideoEmbeds] = React.useState<
    Partial<VideoEmbed>[] | undefined
  >();
  const form = useForm<z.infer<typeof UpdateVideoEmbedSchemaArray>>({
    resolver: zodResolver(UpdateVideoEmbedSchemaArray),
    defaultValues: {
      videoEmbeds: videoEmbeds,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "videoEmbeds",
  });

  React.useEffect(() => {
    console.log("FIELDS", fields);
  }, [fields]);

  const appendVideoEmbed = (embedId: string, channelId: string) => {
    append({
      id: crypto.randomUUID(),
      provider: "youtube",
      embed_id: embedId,
      product_id: productId,
      channel_id: channelId,
    });
  };

  function onSubmit(values: z.infer<typeof UpdateVideoEmbedSchemaArray>) {
    // Optimistically update videoEmbeds
    setPreviousVideoEmbeds(values.videoEmbeds);
    videoEmbedsOptimisticUpdate(values.videoEmbeds);

    fetch(`http://localhost:9000/admin/custom/video-embed`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoEmbeds: values.videoEmbeds,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem:", error);
        // TODO - Revert Optimstic Update
        videoEmbedsOptimisticUpdate(previousVideoEmbeds);
      });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      {fields.map((item, index) => (
        <div className="flex justify-stretch my-2">
          <div className="flex justify-between items-center gap-6 w-full">
            <Input
              {...form.register(`videoEmbeds.${index}.embed_id`)}
              className="w-[300px]"
            />
            <Input
              {...form.register(`videoEmbeds.${index}.channel_id`)}
              className="w-[300px]"
            />
          </div>
          <Button
            type="button"
            onClick={() => {
              remove(index);
            }}
            variant="danger"
            className="w-fit ml-2"
          >
            <XMark />
          </Button>
        </div>
      ))}

      <EmbedInput appendVideoEmbed={appendVideoEmbed} />
      <div className="w-full flex justify-end">
        <Button
          size="large"
          variant="primary"
          type="submit"
          disabled={form.formState.isValidating || form.formState.isSubmitting}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EmbedForm;
