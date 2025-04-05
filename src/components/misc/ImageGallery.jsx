import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./CustomImageGallery.css";

export default function CustomImageGallery({ photos }) {
  // hooks
  const params = useParams();

  const galleryPhotos = photos.map((photo) => ({
    original: photo.src,
    thumbnail: photo.src,
    description: photo.title || "",
  }));

  return (
    <ImageGallery
      items={galleryPhotos}
      showThumbnails={true}
      showFullscreenButton={true}
      showPlayButton={true}
      onClick={() => console.log('Image clicked')}
    />
  );
}

