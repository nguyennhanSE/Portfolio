'use client';

import {useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Flip from 'gsap/Flip';
gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(Flip);
import "./adjust.css";
import Image from 'next/image';

export default function DetailPortfolio() {
    const component = useRef<HTMLDivElement>(null);
    const text1 = useRef<HTMLHeadingElement>(null);
    const text2 = useRef<HTMLHeadingElement>(null);
    const text3 = useRef<HTMLHeadingElement>(null);

    // Profile
    const profile = useRef<HTMLDivElement>(null);
    const eyRef = useRef<HTMLSpanElement>(null);
    const profile1Images = useRef<HTMLDivElement>(null);
    const profile1BigImage = useRef<HTMLDivElement>(null);
    const profile1RightCol = useRef<HTMLDivElement>(null);
    const profile1In4 = useRef<HTMLDivElement>(null);
    
    // Profile2
    const profile2All = useRef<HTMLDivElement>(null);

    // Profile3
    const profile3All = useRef<HTMLDivElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);
    
    // 

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: component.current, 
                    start: 'top top',       
                    end: '+=100%',         
                    pin: true,               
                    scrub: 1,                 
                },
            });
            tl.from(text1.current, { xPercent: -100, opacity: 0, ease: 'power2.inOut' })
              .from(text2.current, { xPercent: 100, opacity: 0, ease: 'power2.inOut' }, '<')
              .from(text3.current, { yPercent: 100, opacity: 0, ease: 'power2.inOut' }, '<');
        }, component); 
        return () => ctx.revert();
    }, []);

    useLayoutEffect(() => {
        const el = eyRef.current;
        if (!el) return;

        const spans = (el.textContent || '')
            .split('')
            .map(ch => ch === ' '
            ? `<span class="char" style="display:inline-block;width:0.35em">&nbsp;</span>`
            : `<span class="char" style="display:inline-block">${ch}</span>`
            ).join('');
        el.innerHTML = spans;

        const ctxProfile = gsap.context(() => {
            const chars = el.querySelectorAll('.char');
            const lines = profile1In4.current?.querySelectorAll('.det') ?? [];
            const tiles = profile1Images.current?.querySelectorAll('.tile') ?? [];

            // STATES đầu
            gsap.set(chars, { opacity: 0, yPercent: 40, rotateX: -80, transformPerspective: 400 });
            gsap.set(lines, { autoAlpha: 0, y: 28, filter: 'blur(6px)' });

            gsap.set(profile1BigImage.current, { width: 0 });
            gsap.set(profile1RightCol.current, { width: '100%' });

            gsap.set(profile1Images.current, { display: 'none' });
            gsap.set(tiles, { autoAlpha: 0, y: 32, scale: 0.98 });

            // Profile 2 
            gsap.utils.toArray<HTMLElement>('.profile2-sub').forEach(el => {
                const txt = el.textContent ?? '';
                el.innerHTML = txt.split('').map(ch =>
                    `<span class="profile2-char">${ch === ' ' ? '&nbsp;' : ch}</span>`
                ).join('');
            });
            gsap.set('.profile2-header', {opacity: 0, y: 20});
            // Profile 3
            gsap.set('.profile3-item', { scale : 0 });
            // gsap.to('.profile3-item', {
            //     scrollTrigger: {
            //         trigger: stackRef.current,
            //         start: 'top 80%',
            //         end: 'bottom 20%',
            //         toggleActions: 'play none none reverse',
            //     },
            //     scale: 1,
            //     duration: 0.8,
            //     ease: 'back.out(1.7)',
            //     stagger: 0.2
            // });
            const profile3Items = Array.from(document.querySelectorAll('.profile3-item'));
            profile3Items.forEach((item, index) => {
                item.classList.add(`profile3-item-${index + 1}`);
            })
            const count = document.querySelectorAll('.profile3-item').length;
            const per = 0.8;                // duration mỗi item
            const total = count * per;
            gsap.set(profile2All.current, { autoAlpha: 0, pointerEvents: 'none' });
            gsap.set(profile3All.current, { autoAlpha: 0, pointerEvents: 'none' });
            gsap.set('.profile3-first-image', {y: "100%"});
            gsap.set('.block-letter', { y: 20, autoAlpha: 0 });
            gsap.set('.profile2', { autoAlpha: 0 });
            gsap.set('.profile2-sub', { opacity: 0, scaleX: 0, transformOrigin: 'left center' });
            gsap.set('.profile2-sub .profile2-char', { y: 20, autoAlpha: 0, filter: 'blur(6px)' });
            gsap.set('.profile2-circle', { scale: 0 });
            gsap.set('.profile2-circle-2', { scale: 0 });
            gsap.set('.profile2-circle-3', { scale: 0 });
            gsap.set('.profile2-img', { y:20,autoAlpha : 0 });
            gsap.set(['.profile2-line1','.profile2-line3','.profile2-line5'], { xPercent: 100 });
            gsap.set(['.profile2-line2','.profile2-line4'], { xPercent: -100 });
            gsap.set('.profile3-second-background',{y:'100%'});
            gsap.set('.profile3-header',{autoAlpha: 0, y : '25%'});
            gsap.set('.profile3-line1', {
                scaleX: 1,   
                scaleY: 0,      
                transformOrigin: 'top center'
            })
            gsap.set('.profile3-line2', {
                scaleX: 0,
                scaleY: 1,
                transformOrigin: 'left center'
            })
            const tl = gsap.timeline({
            scrollTrigger: {
                trigger: profile.current,
                start: 'top top',
                end: '+=1200%',              
                pin: true,
                scrub: 1,
                anticipatePin: 0.8,        
            },
            defaults: { ease: 'power3.out' }
            });
            tl.add('charsIn', 0);
            tl.to(chars, {
                opacity: 1,
                yPercent: 0,
                rotateX: 0,
                duration: 1.0,              
                stagger: { each: 0.10, from: 'start' }
            }, 'charsIn')
            .to(el, { letterSpacing: '-0.02em', duration: 0.8 }, 'charsIn+=0.4')

            .to({}, { duration: 0.4 })  
            .add('panelOpen')
            .to(profile1BigImage.current, { width: '50%', duration: 2.2 }, 'panelOpen')
            .to(profile1RightCol.current, { width: '50%', duration: 2.2 }, 'panelOpen')
            .add('leftLines', 'panelOpen+=0.8')
            .to(lines, {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0)',
                duration: 0.9,
                stagger: 0.6           
            }, 'leftLines')

            .add('tilesIn', 'leftLines+=0.8')
            .set(profile1Images.current, { display: 'grid' }, 'tilesIn')
            .to(tiles, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: { each: 0.6, from: 'start' },
                immediateRender: false
            }, 'tilesIn+=0.1')
            // Profile2 
            .add('profile2Start', '>')
            .set(profile2All.current, { autoAlpha: 1, pointerEvents: 'auto' }, 'profile2Start')
            .to('.profile2-line1', { xPercent: 0, duration: 2.2, ease: 'power2.out' }, 'profile2Start+=0.1')
            .to('.profile2-line2', { xPercent: 0, duration: 2.2, ease: 'power2.out' }, 'profile2Start+=0.2')
            .to('.profile2-line3', { xPercent: 0, duration: 2.2, ease: 'power2.out' }, 'profile2Start+=0.3')
            .to('.profile2-line4', { xPercent: 0, duration: 2.2, ease: 'power2.out' }, 'profile2Start+=0.4')
            .to('.profile2-line5', { xPercent: 0, duration: 2.2, ease: 'power2.out' }, 'profile2Start+=0.5')
            .to('.profile2-header', {opacity: 1, y: 0, duration: 1.5}, '<0.5')

            .to('.profile2', { autoAlpha: 1, duration: 1.5 }, '>0.5')
            .to('.block-letter' , {autoAlpha : 1, duration: 0.6, filter: 'blur(0)', stagger:0.2}, '>0.2')
            .add('blocksStart', '>')
            .to('.block-1',{ x:'-250', y:'-100', scale:2.4, ease:'expo.inOut', duration:2 }, 'blocksStart')
            .to('.block-2',{ x:'-180', y:'200',  scale:1.2, ease:'expo.inOut', duration:2 }, 'blocksStart')
            .to('.block-3',{ x:'180',  y:'-240', scale:1.6, ease:'expo.inOut', duration:2 }, 'blocksStart')
            .to('.block-4',{ x:'280',  y:'240',  scale:0.8, ease:'expo.inOut', duration:2 }, 'blocksStart')
            // .add('circleStart', '>')
            .to('.profile2-circle',   { scale:1, ease:'expo.inOut', duration:1.5 }, 'blocksStart+=0.5')
            .to('.profile2-circle-2', { scale:1, ease:'expo.inOut', duration:1.5 }, 'blocksStart+=0.5')
            .to('.profile2-circle-3', { scale:1, ease:'expo.inOut', duration:1.5 }, 'blocksStart+=0.5')
            .to('.profile2-img', { autoAlpha: 1, duration:1.5, y:0 }, 'blocksStart+=1.3')
            .add('subs')
            .to('.profile2-sub', { opacity: 1, scaleX: 1, duration: 0.35, stagger: 0.05 }, 'subs')
            .to('.sub-1 .profile2-char', { y:0, autoAlpha:1, filter:'blur(0)', stagger:0.1, duration:0.6 }, 'subs+=0.05')
            .to('.sub-2 .profile2-char', { y:0, autoAlpha:1, filter:'blur(0)', stagger:0.1, duration:0.6 }, 'subs+=0.10')
            .to('.sub-3 .profile2-char', { y:0, autoAlpha:1, filter:'blur(0)', stagger:0.1, duration:0.6 }, 'subs+=0.15')
            .to('.sub-4 .profile2-char', { y:0, autoAlpha:1, filter:'blur(0)', stagger:0.1, duration:0.6 }, 'subs+=0.20')
            .add('profile3Begin', '>1')
            .to(profile3All.current,{ autoAlpha: 1, pointerEvents: 'auto', duration: 0.1 }, 'profile3Begin')
            .to('.profile3-first-image', { y: 0, duration: 1.5, ease: 'power3.out' }, 'profile3Begin+=0.1')
            // .add(() => ScrollTrigger.refresh())
            .add('profile3Start' , '>0.2')
            .to('.profile3-item-1', { scale: 1, duration: per, ease: 'back.out(1.7)' }, 'profile3Start')
            .fromTo('.profile3-item-2', { scale: 0.3 }, { scale: 1, duration: per, ease: 'back.out(1.7)', immediateRender: false }, '>')
            .fromTo('.profile3-item-3', { scale: 0.3 }, { scale: 1, duration: per, ease: 'back.out(1.7)', immediateRender: false }, '>')
            .fromTo('.profile3-item-4', { scale: 0.3 }, { scale: 1, duration: per, ease: 'back.out(1.7)', immediateRender: false }, '>')
            .fromTo('.profile3-item-5', { scale: 0.3 }, { scale: 1, duration: per, ease: 'back.out(1.7)', immediateRender: false }, '>')
            .to('.profile3-second-background', { y: 0, duration: total, ease: 'power3.out' }, 'profile3Start')
            .add('image3Arrange', '>')
            .to('.profile3-item-5',{top : 0, left: 0, ease:'power3.out', duration:per}, 'image3Arrange')
            .to('.profile3-item-4', {
                top: 0,
                left: '50%',
                xPercent: -50,   
                y: 0,            
                ease: 'power3.out',
                duration: per
            }, '>')
            .to('.profile3-item-3',{top : 0, right: 0, ease:'power3.out', duration:per}, '>')
            .to('.profile3-item-2',{bottom : 0, left: 0, ease:'power3.out', duration:per}, '>')
            .to('.profile3-item-1',{
                bottom: 0,
                left: '50%',
                xPercent: -50,
                y: 0,
                ease: 'power3.out',
                duration: per
            }, '>')
            .to('.profile3-line1', {
                scaleY: 1,     
                duration: total,
                ease: 'power3.out'
            }, 'image3Arrange')
            .to('.profile3-line2', {
                scaleX: 1,      
                duration: total,
                ease: 'power3.out'
            }, 'image3Arrange')
            .to('.profile3-header',{autoAlpha : 1, y : 0 , ease:'power4.out', duration:1, stagger: 0.3 }, '>0.2')
    }, profile);
    
    return () => ctxProfile.revert();
    }, []);

    return (
        <>
        <div className="relative z-[55] inset-0 w-full min-h-screen bg-[#DCD6C5]">
            <section ref={component} className="w-full h-full ">
                <div className="continue-text-1 max-w-4xl w-full h-full mx-auto grid content-center">
                    <h1 ref={text1} className="place-self-start">The</h1>
                    <h1 ref={text2} className="place-self-end -mr-[150px]">Great Team</h1>
                    <h1 ref={text3} className="place-self-center">Of Engineers</h1>
                </div>
            </section>
            <div className='w-full h-[100px] '>
            </div>
        </div>


        <div ref={profile} className='relative z-[55] inset-0 w-full h-screen bg-[#24211D] flex'>

            <div ref={profile1BigImage} className='relative w-[50%] h-full'>
                <Image src='/avt1-2.jpg' alt='EY Consultant Avatar' layout='fill' className='w-full h-full object-cover'></Image>
                <div ref={profile1In4} className='cinzel-text-2 relative z-5 flex flex-col gap-0 py-7 px-2 '>
                    <span className='det'>Nguyen Nhan</span>
                    <span className='det'>Role: Frontend Developer</span>
                    <span className='det'>HCMUT</span>
                    <span className='det'>THE MASTER OF UI/UX</span>
                </div>
            </div>
            <div ref={profile1RightCol} className='relative w-full h-full flex-1 '>
                <div ref={profile1Images} className='relative top-36 grid grid-cols-4 gap-7 mx-auto w-fit'>
                    <div className='tile w-[150px] h-[150px] relative'>
                        <Image src='/avt1-1.jpg' alt='Person1' fill className='w-full h-full object-cover'></Image>
                    </div>
                    <div className='tile w-[150px] h-[150px] relative'>
                        <Image src='/avt1-3.jpg' alt='Person1' fill className='w-full h-full object-cover'></Image>
                    </div>
                    <div className='tile w-[150px] h-[150px] relative'>
                        <Image src='/avt1-4.jpg' alt='Person1' fill className='w-full h-full object-cover'></Image>
                    </div>
                    <div className='tile w-[150px] h-[150px] relative'>
                        <Image src='/avt1-5.jpg' alt='Person1' fill className='w-full h-full object-cover'></Image>
                    </div>
                </div>
                <span ref={eyRef} className='cinzel-text absolute bottom-7 left-12'>Frontend</span>
            </div>
            {/* Profile 2 */}
            <div ref={profile2All} className='w-full h-full z-10 absolute inset-0 overflow-hidden'>
                <div className='grid w-full h-full inset-0 absolute z-10'>
                    <span className='absolute z-10 font profile2-header place-self-center justify-self-center'>AI</span>
                    <div className="w-full h-[20%] absolute top-[0%]  bg-[#61442D] profile2-line1"></div>
                    <div className="w-full h-[20%] absolute top-[20%] bg-[#61442D] profile2-line2"></div>
                    <div className="w-full h-[20%] absolute top-[40%] bg-[#61442D] profile2-line3"></div>
                    <div className="w-full h-[20%] absolute top-[60%] bg-[#61442D] profile2-line4"></div>
                    <div className="w-full h-[20%] absolute top-[80%] bg-[#61442D] profile2-line5"></div>
                </div>
                <div className='profile2 w-full h-full bg-[#35312B] absolute z-20'>
                    <div className='z-1 profile2-circle overflow-hidden'></div>
                    <div className='profile2-circle-2 absolute z-2 top-[25%] left-[15%] transform translate(-50%, -50%) w-[140px] h-[140px] border rounded-full bg-[#a12e0a]'></div>
                    <div className='profile2-circle-3 absolute z-2 top-[50%] left-[74%] transform translate(-50%, -50%) w-[240px] h-[240px] border rounded-full bg-[#a12e0a]'></div>
                    <div className='relative z-3 w-full h-full items-center justify-center'>
                        <div className='flex items-center justify-center w-full h-full profile2-blocks'>
                            <div className="block-profile-2 block-1">
                                <span className="block-letter">F</span>
                                <span className="profile2-sub sub-1">oundation models</span>
                            </div>
                            <div className="block-profile-2 block-2">
                                <span className="block-letter">P</span>
                                <span className="profile2-sub sub-2">rompting</span>
                            </div>
                            <div className="block-profile-2 block-3">
                                <span className="block-letter">T</span>
                                <span className="profile2-sub sub-3">ransformers</span>
                            </div>
                            <div className="block-profile-2 block-4">
                                <span className="block-letter">U</span>
                                <span className="profile2-sub sub-4">nsupervised learning</span>
                            </div>
                        </div>
                    </div>
                    <div className="profile2-img absolute overflow-hidden bottom-0 right-[18%] h-[65vh] w-[25%] bg-transparent">
                        <Image src="/avt2-1.jpg" alt="Profile 2 Image" fill className="object-cover" />
                    </div>
                </div>
            </div>

            <div ref={profile3All} className='w-full h-full z-20 absolute inset-0 overflow-hidden grid '>
                <div className='profile3-first-image w-full h-full absolute z-10 top-0 left-0 bg-[#EDECE1]'></div>
                <div ref={stackRef} className='profile-3-item-container overflow-visible w-[80%] h-[80%] place-self-center justify-self-center z-30 inset-0 '>
                    <div className="profile3-item">
                        <Image src="/avt3-1.jpg" alt="Profile 3 Image" fill
                        onLoadingComplete={() => ScrollTrigger.refresh()} className="object-cover"/>
                    </div>
                    <div className="profile3-item">
                        <Image src="/avt3-2.jpg" alt="Profile 3 Image" fill className="object-cover"/>
                    </div>
                    <div className="profile3-item">
                        <Image src="/avt3-3.jpg" alt="Profile 3 Image" fill className="object-cover"/>
                    </div>
                    <div className="profile3-item">
                        <Image src="/avt3-4.jpg" alt="Profile 3 Image" fill className="object-cover"/>
                    </div>
                    <div className="profile3-item">
                        <Image src="/avt3-5.jpg" alt="Profile 3 Image" fill className="object-cover"/>
                    </div>
                    <div className='profile3-header right-0 bottom-0 transform translate-x-[20%] whitespace-nowrap '>
                        Backend Developer
                    </div>
                    {/* <div className='profile3-item p-5 text-left'>Lorem ipsum…</div>
                    <div className='profile3-item p-5 text-left'>Lorem ipsum…</div>
                    <div className='profile3-item p-5 text-left'>Lorem ipsum…</div>
                    <div className='profile3-item p-5 text-left'>Lorem ipsum…</div> */}
                </div>
                <div className='profile3-second-background w-full h-full inset-0 absolute z-20 bg-[#DADBD1]'>
                </div>
                <div className="profile3-line1 absolute left-[5%] top-0 h-full w-[1px] z-[20] bg-gray-400"></div>
                <div className="profile3-line2 absolute left-0 top-[5%] h-[1px] w-full z-[20] bg-gray-400"></div>
            </div>
        </div>
        </>
    );
}



