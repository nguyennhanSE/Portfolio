// import Image from 'next/image';
import React from 'react';
import FluidBackground from '../components/FluidBackground';
import "./home.css"
import Image from 'next/image';
const Page = () => {
    return (
        <div className="container">
            <nav>
                <div className="logo">
                    <p>BiBox</p>
                </div>
                <div className="nav-items">
                    <a href="/portfolio" className='text-white'>Portfolio</a>
                    <p>Contact</p>
                </div>
            </nav>

            <section className="hero">
                <FluidBackground />
                <div className="hero-logo">
                    <div className="logo-icon">
                        <Image src="/logo.svg" width={200} height={200} alt="Logo" className='invert text-white w-full h-full object-cover' />
                    </div>
                </div>
                <div className="hero-footer">
                    <p>BiBox - Your Digital Companion</p>
                    <p>Built by NguyenNhan</p>
                </div>
            </section>
        </div>
    );
};

export default Page;