'use client';

import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        image:
            'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80',
        heading: '마운트이든 한인교회',
        // subtext: 'A place of love, hope, and new beginnings.',
        subtext : 'Mount Eden Korean Methodist Church of New Zealand.'
    },
    {
        image:
            'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        heading: 'Worship Together',
        subtext: 'Join us every Sunday for inspiring praise and worship.',
    },
    {
        image:
            'https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        heading: 'Serve Our Community',
        subtext: 'Making a difference in the lives of those around us.',
    },
    {
        image:
            'https://images.unsplash.com/photo-1543357480-c60d40f9df07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        heading: 'Grow in Faith',
        subtext: 'Bible studies, small groups, and discipleship for all ages.',
    },
];

const AUTO_SLIDE_INTERVAL = 7000; // 7 seconds

export default function HeroBanner() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
    }, []);

    const prev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    // Auto-advance
    useEffect(() => {
        if (paused) return;
        const timer = setInterval(next, AUTO_SLIDE_INTERVAL);
        return () => clearInterval(timer);
    }, [next, paused]);

    return (
        <section
            className="relative h-[500px] flex items-center justify-center text-center text-white overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{ opacity: index === current ? 1 : 0 }}
                >
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url("${slide.image}")` }}
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/50" />
                </div>
            ))}

            {/* Content */}
            <div className="relative z-10 px-4 max-w-4xl mx-auto transition-all duration-700">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
                    {slides[current].heading}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-100 font-light">
                    {slides[current].subtext}
                </p>
                <a
                    href="/service"
                    className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                >
                    Join Us This Sunday
                </a>
            </div>

            {/* Prev / Next arrows */}
            <button
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-4 z-20 bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 rounded-full transition"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={next}
                aria-label="Next slide"
                className="absolute right-4 z-20 bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 rounded-full transition"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-5 z-20 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current
                                ? 'bg-white scale-125'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
