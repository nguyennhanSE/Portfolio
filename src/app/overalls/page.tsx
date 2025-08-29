'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './adjust.module.css';

type ImageItem = {
    id: number;
    src: string;
    alt: string;
    role: string;
};

const DATA: ImageItem[] = [
    { id: 1, src: '/avt1-1.jpg', alt: 'Nguyen Nhan', role: 'Frontend Developer' },
    { id: 2, src: '/avt1-2.jpg', alt: 'Thai Bao', role: 'Backend Developer' },
    { id: 3, src: '/avt1-3.jpg', alt: 'Bui Tung Hung', role: 'AI Engineer' },
    { id: 4, src: '/avt1-4.jpg', alt: 'Huy Ta', role: 'Data Engineer' },
];

const Page = () => {
    const [currentId, setCurrentId] = useState<number>(1);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const root = useRef<HTMLDivElement>(null);
    const imgWrapRef = useRef<HTMLDivElement>(null);
    const roleRef = useRef<HTMLDivElement>(null);

    const current = useMemo(
        () => DATA.find((i) => i.id === currentId)!,
        [currentId]
    );

    useEffect(() => {
        if (!roleRef.current) return;
        const el = roleRef.current;
        const letters = current.role.split('');
        el.innerHTML = letters
            .map((ch, i) => `<span class="${styles.letter}" data-i="${i}">${ch === ' ' ? '&nbsp;' : ch}</span>`)
            .join('');

        const ctx = gsap.context(() => {
            const spans = el.querySelectorAll<HTMLSpanElement>(`.${styles.letter}`);
            gsap.fromTo(
            spans,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.03, ease: 'power3.out' }
            );
        }, root);

        return () => ctx.revert();
    }, [current.role]);

    const handlePick = (id: number) => {
        if (isAnimating || id === currentId) return;
        setIsAnimating(true);
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: 'power3.inOut' },
                onComplete: () => setIsAnimating(false),
            });
            // tl.to(imgWrapRef.current, { y: 40, opacity: 0, duration: 0.35 })
            tl.to(roleRef.current, { opacity: 0, y: 10, duration: 0.25 }, '<0.05')
            .add(() => setCurrentId(id))
            // reset vị trí ảnh mới + animate IN
            .add(() => {
                gsap.set(imgWrapRef.current, { y: -50, opacity: 0 });
                gsap.set(roleRef.current, { y: 12, opacity: 0 });
            })
            .to(imgWrapRef.current, { y: 0, opacity: 1, duration: 1.2 })
            .to(roleRef.current, { y: 0, opacity: 1, duration: 1.2 }, '<0.2');
        }, root);
        return () => ctx.revert();
    };

  return (
    <section ref={root} className="w-full min-h-screen relative bg-black flex items-center">
      <div className="h-full flex flex-col pl-16 gap-12 z-20 relative w-fit">
        {DATA.map((item) => (
          <button
            key={item.id}
            onClick={() => handlePick(item.id)}
            className={`${styles.item} ${currentId === item.id ? styles.selected : ''} transition-all duration-300 hover:opacity-75`}
            disabled={isAnimating}
          >
            {item.alt}
          </button>
        ))}
      </div>
      <div className="absolute bottom-16 right-16 z-30">
        <div ref={roleRef} className={`${styles.role} overflow-hidden`} />
      </div>

      <div className="absolute inset-0 z-10 overflow-hidden">
        <div ref={imgWrapRef} className="absolute inset-0">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-20" />
      </div>
    </section>
  );
};

export default Page;
