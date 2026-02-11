import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './CustomImageGallery.css';

export default function CustomImageGallery({ photos }) {
  const params = useParams();

  const galleryPhotos = photos.map((photo) => ({
    original: photo.src,
    thumbnail: photo.src,
    description: photo.title || '',
  }));

  // Custom vasemman nuolen renderöinti
  const renderLeftNav = (onClick, disabled) => {
    return (
      <button
        type="button"
        className="custom-left-nav"
        disabled={disabled}
        onClick={onClick}
        aria-label="Previous Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="6 0 12 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="custom-nav-svg"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
    );
  };

  // Custom oikean nuolen renderöinti
  const renderRightNav = (onClick, disabled) => {
    return (
      <button
        type="button"
        className="custom-right-nav"
        disabled={disabled}
        onClick={onClick}
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="6 0 12 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="custom-nav-svg"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    );
  };

  return (
    <ImageGallery
      items={galleryPhotos}
      showThumbnails={true}
      showFullscreenButton={true}
      showPlayButton={true}
      renderLeftNav={renderLeftNav}
      renderRightNav={renderRightNav}
      onClick={() => console.log('Image clicked')}
    />
  );
}

/*import { useParams } from "react-router-dom";
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
}*/
