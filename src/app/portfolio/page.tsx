'use client'

import Image from 'next/image';
import React, {useLayoutEffect, useRef } from 'react';
import { FaRegCopyright } from "react-icons/fa6";

import "./portfolio.css"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
gsap.registerPlugin(ScrollTrigger);

const Page = () => {
    const fatherRootRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const barRef  = useRef<HTMLDivElement>(null);
    const preRef  = useRef<HTMLDivElement>(null);    
    const textRef = useRef<HTMLSpanElement>(null);
    const loadingTextRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const leftTextRef = useRef<HTMLDivElement>(null);
    const rightTextRef = useRef<HTMLDivElement>(null);
    const continueRef = useRef<HTMLSpanElement>(null);
    const inkRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Ẩn chữ ban đầu 
            gsap.set(textRef.current, { autoAlpha: 0, y: 16, filter: 'blur(6px)' });
            gsap.set(leftRef.current, { autoAlpha: 0, x: '-100%' });
            gsap.set(leftTextRef.current, { autoAlpha: 0, x : '-30%', filter: 'blur(6px)' });
            gsap.set(rightTextRef.current, { autoAlpha: 0, x : '-30%', filter: 'blur(6px)' });
            gsap.set(continueRef.current, { autoAlpha: 0, y: 20, filter: 'blur(6px)' });
            // gsap.set(portfolioDetailRef.current, { autoAlpha: 0, visibility: 'hidden' });
            const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.inOut' },
                onStart: () => document.body.classList.add('no-scroll'),
                onComplete: () => document.body.classList.remove('no-scroll'), 
            });
            tl.fromTo(
                barRef.current,
                { yPercent: 100 },
                { yPercent: -100, duration: 0.8, ease: 'none', repeat: 2, yoyo: true }
            )
            .to(preRef.current, { scale: 2, duration: 0.4, ease: 'power2.out' })
            .to(preRef.current, { autoAlpha: 0, duration: 0.45 }, '<0.05')
            .set(preRef.current, { display: 'none' })
            .fromTo(
                textRef.current,
                { autoAlpha: 0, y: 16, filter: 'blur(6px)' },
                { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' },
                '<-0.2'
            )
            .to(loadingTextRef.current, { xPercent: 110, duration: 0.8, ease: 'power4.inOut' }, '+=0.1')
            .set(loadingTextRef.current, { display: 'none' })
            .to(rootRef.current, { xPercent: 110, duration: 0.8, ease: 'power4.inOut' }, '+=0.1')
            .set(rootRef.current, { display: 'none' })
            .to(leftRef.current, { autoAlpha: 1, x: '0%', duration: 1.2, ease: 'power3.inOut' }, '<0.2')
            .to(leftTextRef.current, {
                autoAlpha: 1,
                x: '0%',
                filter: 'blur(0px)',
                duration: 0.8,
                ease: 'power2.out',
                }, '>0.1')
            .to(rightTextRef.current, {
                autoAlpha: 1,
                x: '0%',
                filter: 'blur(0px)',
                duration: 0.8,
                ease: 'power2.out',
                }, '<0.2')  
            .to(continueRef.current, {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.8,
                ease: 'power2.out',
            }, '> 1')
        }, fatherRootRef);
        return () => ctx.revert();
    }, []);

    const portText1 = useRef<HTMLSpanElement>(null);
    const portText2 = useRef<HTMLSpanElement>(null);
    const portText3 = useRef<HTMLSpanElement>(null);
    const portText4 = useRef<HTMLSpanElement>(null);
    const portLeft = useRef<HTMLDivElement>(null);
    const portRight = useRef<HTMLDivElement>(null);
    const z60DivRef = useRef<HTMLDivElement>(null);
    // const portfolioDetailRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const onClickContinueRef = () => {
        const btn = continueRef.current;
        const ink = inkRef.current;
        if (!btn || !ink) return;
        const r = btn.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;

        const radius = Math.hypot(window.innerWidth, window.innerHeight);

        gsap.set(ink, {
            display: 'block',
            clipPath: `circle(0px at ${cx}px ${cy}px)`,
            WebkitClipPath: `circle(0px at ${cx}px ${cy}px)`,
        });
        gsap.set([portText1.current, portText2.current, portText3.current, portText4.current], { autoAlpha: 0, y: -10, filter: 'blur(6px)' });
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.set(continueRef.current, { display: 'none' })
        .to(btn, { y: -8, duration: 0.18 }, 0)
        .to(ink, {
            clipPath: `circle(${radius}px at ${cx}px ${cy}px)`,
            WebkitClipPath: `circle(${radius}px at ${cx}px ${cy}px)`,
            duration: 0.8,
        }, 0)
        .to(portText1.current, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.in', filter: 'blur(0px)' }, '> 0.2')
        .to(portText2.current, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.in', filter: 'blur(0px)' }, '< 0.1')
        .to(portText3.current, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.in', filter: 'blur(0px)' }, '< 0.1')
        .to(portText4.current, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.in', filter: 'blur(0px)' }, '< 0.1')
        .add('split', '>')
        .to([portText1.current, portText3.current], {
             y: '-35vh',               
            duration: 0.6,
            ease: 'power3.inOut'
        }, 'split')
        .to([portText2.current, portText4.current], {
             y: '35vh', 
            duration: 0.6,
            ease: 'power3.inOut'
        }, 'split')

        .add('split2', '>')
        .to(portLeft.current, {
            x: '-100%',
            duration: 0.6,
            ease: 'power3.inOut'
        }, 'split2')
        .to(portRight.current, {
            x: '100%',
            duration: 0.6,
            ease: 'power3.inOut'
        }, 'split2')
        .set([portText1.current, portText2.current, portText3.current, portText4.current,portLeft.current,portRight.current], { display: 'none' })
        .set(z60DivRef.current, { display: 'none' })
        // .set(portfolioDetailRef.current, { visibility: 'visible' })
        // .to(portfolioDetailRef.current, { autoAlpha: 1, duration: 0.1 }, '>0.1')
        .call(() => {
            if (ink) {
            gsap.set(ink, { clipPath: 'none', WebkitClipPath: 'none' });
            gsap.set(ink, { backgroundColor: 'transparent' });
            }
            ScrollTrigger.refresh();
        })
        .to({}, { duration: 0.5 }) 
        .call(() => router.push('/overalls'));
    };
    return (
        <>
        <div ref={fatherRootRef} className='w-full h-[calc(100vh)] min-h-screen relative'>
            <nav className='font-montserrat w-full px-20 py-8 flex justify-between items-center bg-[#ebe2d5] border-b border-gray-300 z-5 absolute'>
                <div className='flex items-center gap-10'>
                    <a href="/" className='text-xs font-semibold'>STARTING PRESENTATION</a>
                    <a href="/about" className='text-xs font-semibold'>COLLECTIONS</a>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='text-xl font-semibold'>BIBOX</span>
                    <FaRegCopyright size={20} />
                </div>
                <div className='flex items-center gap-10'>
                    <a href="/" className='text-xs font-semibold'>BRANDING UNIVERSAL</a>
                    <a href="/about" className='text-xs font-semibold'>CONTACT MODELS</a>
                </div>
            </nav>
            <div className='absolute inset-0 z-1 w-full h-screen'>
                <Image src="/background.jpg" alt="Description" width={500} height={300} className='absolute object-cover w-full h-full' />
            </div>
            <main className='absolute z-2 w-full h-full grid grid-cols-1 md:grid-cols-2'>
                <div ref={leftRef} className='bg-[#ebe2d5] flex flex-col items-center justify-center left-item'>
                    <div ref={leftTextRef} className='max-w-lg flex flex-col gap-6 mx-auto items-center text-center'>
                        <div className='rounded-xl text-center text-2xl border px-3 py-1'>
                            SINCE - 2024
                        </div>
                        <span className='text-lg'>A collections of applications for files storage and livestreaming</span>
                        <div className='w-[300px] h-[300px] relative'>
                            <Image src="/team.jpg" alt="App Collection" fill className='rounded-xl h-full w-full object-cover' />
                        </div>
                        <span className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam perferendis illum est aliquam nam corporis quae itaque architecto blanditiis tempora ad illo, rem odio in. Fuga aperiam veritatis totam voluptatum!</span>
                    </div>
                </div>
                
                <div className='right-item bg-transparent flex items-center justify-center' >
                    <div ref={rightTextRef} className='max-w-xl flex flex-col gap-8 text-center items-center mx-auto'>
                        <span className='text-yellow-300 text-6xl'>FROM THE</span>
                        <span className='text-yellow-300 text-6xl'>HEART</span>
                        <span className='text-yellow-300 text-6xl'>OF CREATIVITY</span>
                        <span className='text-yellow-300 text-6xl'>AND EMOTION</span>
                    </div>

                </div>
            </main>
            <div ref={rootRef} className="z-10 revealer">
                <div ref={preRef} className="pre-loader block">
                    <div className="loader-wrapper">
                        <div ref={barRef} className="loader" />
                    </div>
                </div>
                <div ref={loadingTextRef} className="loader-text-wrapper block">
                    <span ref={textRef} className="loader-text">BiBox</span>
                </div>
            </div>

            <div className='relative w-full h-[100vh] overflow-hidden flex justify-center items-center z-5'>
                <span onClick={() => onClickContinueRef()} ref={continueRef} className="inline-block">
                    <span
                        className="
                        continue-text inline-block
                        transform-gpu transition-transform duration-300 ease-out
                        hover:-translate-y-2.5
                        after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                        after:h-[3px] after:w-full after:bg-gray-300 after:origin-left
                        after:scale-x-0 after:transition-transform after:duration-300
                        hover:after:scale-x-100
                        relative cursor-pointer
                        "
                    >
                        Continue
                    </span>
                </span>
            </div> 
            <div
                ref={inkRef}
                className="absolute inset-0 w-full min-h-screen z-[50] bg-[#DCD6C5] hidden"
                style={{ clipPath: 'circle(0% at 50% 50%)' }}   
            >
                <div ref={z60DivRef} className="absolute z-[60] inset-0 w-full h-full grid grid-cols-2">
                    <div ref={portLeft} className='bg-gray-200 port-left flex flex-col w-full h-full overflow-hidden '>
                        <span ref={portText1} className='port-text flex items-end justify-end'>B</span>
                        <span ref={portText2} className='port-text flex justify-end'>B</span>
                    </div>
                    <div ref={portRight} className='bg-gray-200 port-right flex flex-col w-full h-full overflow-hidden '>
                        <span ref={portText3} className='port-text flex items-end'>I</span>
                        <span ref={portText4} className='port-text flex'>OX</span>
                    </div>
                </div>
                <div className='w-full h-full inset-0 absolute z-50 bg-[#DCD6C5]'>
                </div>
                {/* <div ref={portfolioDetailRef}>
                    <DetailPortfolio></DetailPortfolio>
                </div> */}
            </div>
        </div>
        </>
    );
};

export default Page;

