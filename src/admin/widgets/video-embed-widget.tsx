import type { ProductDetailsWidgetProps, WidgetConfig } from "@medusajs/admin";
import { Button, Container, Heading } from "@medusajs/ui";

import React from "react";
import { VideoEmbed } from "src/types/product";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../components/shared/dialog";

import MoreIcon from "../components/shared/icons/more-icon";
import Display from "../components/video-embed/display";
import VideoEmbedForm from "../components/video-embed/embed-form";

const VideoEmbedWidget = ({ product, notify }: ProductDetailsWidgetProps) => {
  const [open, setOpen] = React.useState(false);
  const [videoEmbeds, setVideoEmbeds] = React.useState(product.videoEmbeds);

  return (
    <Container>
      <div className="flex items-center justify-between">
        <h1 className="text-grey-90 inter-xlarge-semibold">Video Embeds</h1>
        <div className="flex items-center gap-x-2">
          <div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="btn btn-ghost btn-small w-xlarge h-xlarge focus-visible:shadow-input focus-visible:border-violet-60 focus:shadow-none focus-visible:outline-none cursor-pointer"
                  type="button"
                  id="radix-:r24:"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  data-state="closed"
                >
                  <span className="mr-xsmall last:mr-0">
                    <MoreIcon />
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="space-y-2">
                <DialogTitle>
                  <Heading level="h2">Edit Embedded Videos</Heading>
                </DialogTitle>
                <DialogDescription className="text-ui-fg-subtle">
                  These will embed a publicly available videos (e.g., youtube)
                  inside of the Product page.
                </DialogDescription>
                <VideoEmbedForm
                  videoEmbeds={videoEmbeds}
                  productId={product.id}
                  setOpen={setOpen}
                  videoEmbedsOptimisticUpdate={(videoEmbeds: VideoEmbed[]) =>
                    setVideoEmbeds([...videoEmbeds])
                  }
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <Display videoEmbeds={videoEmbeds} />
    </Container>
  );
};

export const config: WidgetConfig = {
  zone: "product.details.after",
};

export default VideoEmbedWidget;
