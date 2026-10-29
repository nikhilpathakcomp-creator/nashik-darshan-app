
import { useEffect, useState } from "react";

const imageCache = new Map();

export default function PlaceImage({
  place,
  className = "place-card-image",
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadImage() {
      const searchTerm = `${place.english} Nashik Maharashtra India`;

      setLoading(true);
      setFailed(false);
      setImageUrl("");

      try {
        if (imageCache.has(searchTerm)) {
          const cachedUrl = imageCache.get(searchTerm);

          if (!cancelled) {
            setImageUrl(cachedUrl);
            setFailed(!cachedUrl);
            setLoading(false);
          }

          return;
        }

        const params = new URLSearchParams({
          action: "query",
          generator: "search",
          gsrsearch: `${place.english} India`,
          gsrnamespace: "6",
          gsrlimit: "10",
          prop: "imageinfo",
          iiprop: "url",
          iiurlwidth: "700",
          format: "json",
          origin: "*",
        });

        const response = await fetch(
          `https://commons.wikimedia.org/w/api.php?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Image search failed");
        }

        const data = await response.json();
        const pages = Object.values(data?.query?.pages || {});

        const imagePage = pages.find((page) => {
          const info = page.imageinfo?.[0];
          const title = page.title || "";

          return (
            info?.thumburl &&
            /\.(jpe?g|png|webp)$/i.test(title) &&
            !/logo|map|icon|flag|diagram/i.test(title)
          );
        });

        const url = imagePage?.imageinfo?.[0]?.thumburl || "";

        imageCache.set(searchTerm, url);

        if (!cancelled) {
          setImageUrl(url);
          setFailed(!url);
          setLoading(false);
        }
      } catch (error) {
        console.error(
          `Could not load photo for ${place.english}:`,
          error
        );

        if (!cancelled) {
          setFailed(true);
          setLoading(false);
        }
      }
    }

    loadImage();

    return () => {
      cancelled = true;
    };
  }, [place.english]);

  if (loading) {
    return (
      <div className={`${className} image-placeholder`}>
        फोटो लोड होत आहे...
      </div>
    );
  }

  if (failed || !imageUrl) {
    return (
      <div className={`${className} image-placeholder`}>
        📍 {place.english}
        <br />
        फोटो उपलब्ध नाही
      </div>
    );
  }

  return (
    <img
      className={className}
      src={imageUrl}
      alt={`${place.english} photo`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
