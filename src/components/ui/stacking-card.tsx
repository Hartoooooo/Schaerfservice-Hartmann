'use client';

import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { InteractiveHoverButton } from '@/components/InteractiveHoverButton';
import AiBadge from '@/components/ui/AiBadge';

export interface ServiceCardData {
  title: string;
  description: React.ReactNode;
  imageUrl: string;
  imageAlt: string;
  badgeIcon: React.ReactNode;
  badgeText: string;
  href: string;
  linkTitle: string;
  buttonText: string;
  /** Bild ist KI-generiert/-bearbeitet -> Kennzeichnung einblenden. */
  aiImage?: boolean;
}

interface CardProps extends ServiceCardData {
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card = ({
  i,
  title,
  description,
  imageUrl,
  imageAlt,
  badgeIcon,
  badgeText,
  href,
  linkTitle,
  buttonText,
  aiImage,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 28}px)`,
        }}
        className="relative flex flex-col h-[440px] w-full max-w-5xl rounded-2xl bg-white border border-gray-100 shadow-xl p-10 origin-top overflow-hidden"
      >
        <div className="flex h-full gap-10">
          <div className="w-[45%] flex flex-col justify-center">
            <h3 className="text-3xl font-semibold text-gray-900 mb-5">
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
            <div className="flex items-center gap-2 mb-8">
              {badgeIcon}
              <p className="text-sm text-blue-600 font-medium">{badgeText}</p>
            </div>
            <Link href={href} title={linkTitle}>
              <InteractiveHoverButton className="w-full max-w-xs" text={buttonText} />
            </Link>
          </div>

          <div className="relative w-[55%] h-full rounded-xl overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            {aiImage && <AiBadge className="top-3 right-3" align="right" />}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface StackingCardsProps {
  services: ServiceCardData[];
}

export default function StackingCards({ services }: StackingCardsProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={container}>
      {services.map((service, i) => {
        const targetScale = 1 - (services.length - i) * 0.05;
        return (
          <Card
            key={service.title}
            i={i}
            {...service}
            progress={scrollYProgress}
            range={[i * (1 / services.length), 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}
