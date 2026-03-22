import { useState } from "react";

type ResponsiveImageProps = {
  src?: string;
  alt: string;
  ratio?: string;
  className?: string;
  placeholderLabel?: string;
  fit?: "cover" | "contain";
};

export function ResponsiveImage({
  src,
  alt,
  ratio = "4 / 3",
  className = "",
  placeholderLabel,
  fit = "cover",
}: ResponsiveImageProps) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  return (
    <div className={`responsive-image ${className}`.trim()} style={{ aspectRatio: ratio }}>
      {showPlaceholder ? (
        <div className="image-placeholder">{placeholderLabel ?? alt}</div>
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} style={{ objectFit: fit }} />
      )}
    </div>
  );
}
