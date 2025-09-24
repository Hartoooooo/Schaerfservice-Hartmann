import { PropsWithChildren, ReactNode } from "react";
import { clsx } from "clsx";
import Image from "next/image";

type CardProps = PropsWithChildren<{
  className?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
}>;

export function Card({ children, className, title, subtitle, imageUrl, imageAlt }: CardProps) {
  return (
    <div className={clsx("card p-0 overflow-hidden", className)}>
      {imageUrl && (
        <div className="relative h-48 min-h-[180px]">
          <Image 
            src={imageUrl} 
            alt={imageAlt || ""} 
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex-1">
        {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}
        {subtitle && <p className="text-neutral-600 mb-3">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}


