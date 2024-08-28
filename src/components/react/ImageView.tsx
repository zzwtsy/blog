import Image from "rc-image";
import "rc-image/assets/index.css";
import {
  X,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  FlipHorizontal2,
  FlipVertical2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function ImageView({ src }: { src: string }) {
  return (
    <Image
      src={src}
      preview={{
        icons: {
          rotateLeft: <RotateCcw />,
          rotateRight: <RotateCw />,
          zoomIn: <ZoomIn />,
          zoomOut: <ZoomOut />,
          left: <ChevronLeft />,
          right: <ChevronRight />,
          close: <X />,
          flipX: <FlipHorizontal2 />,
          flipY: <FlipVertical2 />,
        },
      }}
    />
  );
}
