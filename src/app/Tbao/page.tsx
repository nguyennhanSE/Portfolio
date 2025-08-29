'use client'

import Image from 'next/image';
import React, {useLayoutEffect, useRef } from 'react';
import "./adjust.css"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Flip } from 'gsap/Flip';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);
import { BiWorld } from "react-icons/bi";

const Page = () => {
    const stackRef = useRef<HTMLDivElement>(null);
    const profile = useRef<HTMLDivElement>(null);
    const popUpRef = useRef<HTMLDivElement>(null);
    const popUpDetailRef = useRef<HTMLDivElement>(null);

    // function onOpen() {
    //     const stacks = document.querySelectorAll('.stacked');
    //     if (!stacks) return;
    //     let active : HTMLElement | null = null;
    //     const overlay = popUpRef.current!;
    //     const box = popUpDetailRef.current!;
    //     const stackedRef = stackRef.current!;
    //     const items = document.querySelectorAll<HTMLElement>('.stacked-item');

    //     const open = (item : HTMLElement) => {
    //         overlay.classList.remove('hidden');
    //         overlay.classList.add('flex');
    //         item.classList.add('is-expanded');
    //         // Lưu state trước khi move
    //         const state = Flip.getState(item);
    //         // Move element vào popup container
    //         box.appendChild(item);
    //         // Set CSS để center ảnh trong popup
    //         gsap.set(item, {
    //             position: 'absolute',
    //             top: '50%',
    //             left: '50%',
    //             xPercent: -50,
    //             yPercent: -50,
    //             width: '70vw',
    //             height: '70vh',
    //             maxWidth: '800px',
    //             maxHeight: '600px'
    //         });
    //         // Animate từ vị trí cũ đến vị trí mới
    //         Flip.from(state, {
    //             duration: 0.6,
    //             ease: 'power3.out',
    //             absolute: true,
    //             scale: true,
    //         });
    //         active = item;
    //     }
    //     const close = () => {
    //         if (!active) return;
    //         const state = Flip.getState(active);
    //         const item = active;
    //         item.classList.remove('is-expanded');
    //         // Clear các properties đã set
    //         gsap.set(item, { clearProps: 'all' });
    //         stackedRef.appendChild(item);
    //         Flip.from(state, {
    //             duration: 0.5,
    //             ease: 'power3.inOut',
    //             absolute: true,
    //             scale: true,
    //             onComplete: () => {
    //                 overlay.classList.add('hidden');
    //                 overlay.classList.remove('flex');
    //                 active = null;
    //             },
    //         });
    //     }

    //     items.forEach((item) => {
    //         item.onclick = () => open(item);
    //     })
        
    //     overlay.onclick = (e) => {
    //         if (e.target === overlay) {
    //             close();
    //         }
    //     };
    //     const handleKeyDown = (e: KeyboardEvent) => {
    //         if (e.key === 'Escape') {
    //             close();
    //         }
    //     };
        
    //     document.addEventListener('keydown', handleKeyDown);
        
    //     return () => {
    //         document.removeEventListener('keydown', handleKeyDown);
    //     };
    // }

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
        gsap.set('.profile3-item', { scale : 0 });
        const profile3Items = Array.from(document.querySelectorAll('.profile3-item'));
        profile3Items.forEach((item, index) => {
            item.classList.add(`profile3-item-${index + 1}`);
        })
        let items = gsap.utils.toArray<HTMLElement>('.profile3-item');
        items = items.reverse();
        const counters = gsap.utils.toArray<HTMLElement>('.counter');
        gsap.set(counters, { autoAlpha: 0, y: 30 });
        const countImg = document.querySelectorAll('.profile3-item').length;
        const appear = 0.15;  
        const hold   = 0.25;  
        const hide   = 0.15;  
        const total = (appear + hold + hide) * 100;
        const timeEachImg = total / countImg;
        const gap = 5;  
        // const gapHover = 20;
        gsap.set('.profile3-second-background',{y:'100%'});
        gsap.set('.profile3-role',{autoAlpha: 0, y : '100%'});
        gsap.set('.profile3-name',{autoAlpha: 0, y : '25%'});
        gsap.set('.profile3-icon',{autoAlpha: 0, y : '25%'});
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
        gsap.set('.profile3-line3', {
            scaleX: 0,
            scaleY: 1,
            transformOrigin: 'left center'
        })
        gsap.set('.profile3-line4', {
            scaleX: 0,
            scaleY: 1,
            transformOrigin: 'left center'
        })
        gsap.set('.profile3-description', {
            x:'-100%',
            autoAlpha: 0,
        })
        gsap.set('.profile3-contact', {
            x:'-100%',
            autoAlpha: 0,
        })
        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: profile.current,
            start: 'top top',
            end: '+=600%',              
            pin: true,
            scrub: 1,
            anticipatePin: 0.8,        
        },
            defaults: { ease: 'power3.out' }
            });
        tl.add('profile3Start' , '>0.2')
        .to('.profile3-item-1', { scale: 1, duration: timeEachImg, ease: 'back.out(1.7)' }, 'profile3Start')
        .fromTo('.profile3-item-2', { scale: 0.3 }, { scale: 1, duration: timeEachImg, ease: 'back.out(1.7)', immediateRender: false }, '>')
        .fromTo('.profile3-item-3', { scale: 0.3 }, { scale: 1, duration: timeEachImg, ease: 'back.out(1.7)', immediateRender: false }, '>')
        .fromTo('.profile3-item-4', { scale: 0.3 }, { scale: 1, duration: timeEachImg, ease: 'back.out(1.7)', immediateRender: false }, '>')
        .fromTo('.profile3-item-5', { scale: 0.3 }, { scale: 1, duration: timeEachImg, ease: 'back.out(1.7)', immediateRender: false }, '>')
        .to('.profile3-second-background', { y: 0, duration: total, ease: 'power3.out' }, 'profile3Start')
        .to(counters, {
        keyframes: [
            { autoAlpha: 1, y: 0, duration: appear, ease: 'power2.out' },
            { duration: hold },                         
            { autoAlpha: 0, duration: hide, ease: 'power2.in' }
        ],
        stagger: { each: appear + hold + hide, from: 0 }
        }, 'profile3Start')
        .add ('imgTransition', '>0.1')
        .add('imgTransition', '>0.1')
        .to(items, {
            top: (i, el) => {
            const c = stackRef.current!;
            const h = (el as HTMLElement).offsetHeight;
            return c.clientHeight - h - (gap * i);
            },
            left: (i, el) => {
            const c = stackRef.current!;
            const w = (el as HTMLElement).offsetWidth;
            return c.clientWidth - w - (gap * i);
            },
            duration: (i) => total + 5 + i * 0.25,
            stagger: { each: 5.2, from: 'end' } 
        }, 'imgTransition')
        .add('image3Arrange', '>')
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
        .to('.profile3-line3', {
            scaleX: 1,      
            duration: total,
            ease: 'power3.out'
        }, 'image3Arrange+=0.1')
        .to('.profile3-line4', {
            scaleX: 1,      
            duration: total,
            ease: 'power3.out'
        }, 'image3Arrange+=0.1')
        .to('.profile3-role',{
            scaleX: 1,
            duration: total,
            ease: 'power3.out'
        })
        .to('.profile3-role',{
            y: 0,
            autoAlpha: 1,
            duration: total,
            ease: 'power4.out'
        },'image3Arrange+=0.3')
        .to('.profile3-name',{
            y: 0,
            autoAlpha: 1,
            duration: total,
            ease: 'power4.out'
        },'image3Arrange+=0.3')
        .to('.profile3-description',{
            x: 0,
            autoAlpha: 1,
            duration: total,
            ease: 'power4.out'
        },'image3Arrange+=0.3')
        .to('.profile3-contact',{
            x: 0,
            autoAlpha: 1,
            duration: total,
            ease: 'power4.out'
        },'image3Arrange+=0.3')
        .to('.profile3-icon',{
            y: 0,
            autoAlpha: 1,
            duration: total,
            ease: 'power4.out'
        },'image3Arrange+=0.3')
        // .add('image3Ready', '<0.1')
        .add(() => {
            stackRef.current!.classList.add('stacked');
            gsap.set(items, { clearProps: 'transform' });
            items.forEach((el, i) => {
                el.classList.add('stacked-item');
                // el.classList.add('is-expanded');
                el.style.setProperty('--i', String(i));
            });
            document.addEventListener('scroll',() => stackRef.current?.classList.remove('stacked'), { once: true });
            // onOpen();
        })
    }, profile);
    return () => ctx.revert();
    }, []);
    
    return (
        <>
        <div ref={profile} className='w-full h-screen overflow-hidden grid'>
            <div className='profile3-first-image w-full h-full absolute z-10 top-0 left-0 bg-[#EDECE1]'></div>
            <div ref={stackRef} className='profile-3-item-container overflow-visible w-[90%] h-[90%] place-self-center justify-self-center z-30 inset-0  '>
                <div className="profile3-item z-10 top-0 left-0">
                    <Image src="/avt3-1.jpg" alt="Profile 3 Image" fill
                    onLoadingComplete={() => ScrollTrigger.refresh()} className="object-cover"/>
                </div>
                <div className="profile3-item z-20 top-0 left-0">
                    <Image src="/avt3-2.jpg" alt="Profile 3 Image" fill className="object-cover"/>
                </div>
                <div className="profile3-item z-30 top-0 left-0">
                    <Image src="/avt3-3.jpg" alt="Profile 3 Image" fill className="object-cover"/>
                </div>
                <div className="profile3-item z-40 top-0 left-0">
                    <Image src="/avt3-4.jpg" alt="Profile 3 Image" fill className="object-cover"/>
                </div>
                <div className="profile3-item z-50 top-0 left-0">
                    <Image src="/avt3-5.jpg" alt="Profile 3 Image" fill className="object-cover"/>
                </div>
                {Array.from({length : 100},(_,i) => (
                    <div className={`counter absolute overflow-hidden text-black text-6xl font-semibold bottom-0 right-0 flex items-end justify-end`} key={i}>
                        {i}
                    </div>
                ))}
            </div>
            <div className='profile3-second-background w-full h-full inset-0 absolute z-20 bg-[#DADBD1]'>
            </div>
            <div className="profile3-line1 absolute left-[5%] top-0 h-full w-[1px] z-[20] bg-gray-400"></div>
            <div className="profile3-line2 absolute left-0 top-[5%] h-[1px] w-full z-[20] bg-gray-400"></div>
            <div className="absolute left-[5%] top-[5%] right-[5%] bottom-[5%] z-20 bg-transparent px-5">
                <div className="absolute top-[20%] flex flex-col items-start gap-3">
                    <span className="profile3-role">Backend Developer</span>
                    <span className="profile3-name">Thai Bao</span>
                </div>
                <div className='profile3-line3 absolute top-[60%] h-[1px] w-full z-[20] bg-gray-400'></div>
                <div className="absolute top-[60%] left-5 right-0 pt-10 flex flex-col gap-4">
                    <div className='profile3-description max-w-[30%] h-full profile3-in4'>A Software developer specializing in backend technologies and system architecture.</div>
                    <div className='profile3-line4 max-w-[30%] h-[1px] bg-gray-400 '></div>
                    <div className='max-w-[30%] flex gap-2 items-center'>
                        <BiWorld className='profile3-icon text-gray-600' size={30} />
                        <div className='profile3-contact grid grid-rows-2'>
                            <span className='text-[##191919] text-xs'>0948371235</span>
                            <span className='text-[##191919] text-xs font-semibold'>thaibao.hcmutwork@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div ref={popUpRef} className="fixed inset-0 z-[100] hidden items-center justify-center">
            <div className="absolute inset-0 bg-white/70 backdrop-blur-md"></div>
            <div
                ref={popUpDetailRef}
                className="relative z-10 w-[min(90vw,900px)] aspect-[4/3] flex items-center justify-center"
            />
        </div>
        </>
    );};

export default Page;