import Image from "next/image";

type OptimizedCoverProps = {
  src: string;
  alt?: string;
  sizes?: string;
  className?: string;
};

export default function OptimizedCover({
  src,
  alt = "",
  sizes = "(max-width: 700px) 45vw, (max-width: 1100px) 20vw, 180px",
  className = "cover-image",
}: OptimizedCoverProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={72}
      className={className}
      loading="lazy"
    />
  );
}
