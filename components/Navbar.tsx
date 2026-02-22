'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Church } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Service Times', href: '/service' },
        { name: 'Announcements', href: '/announcements' },
        { name: 'Sermons', href: '/sermons' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Weekly Word', href: '/verses' }, // The Bible Verse Notice Board

    ];

    return (
        <nav className="bg-white shadow-md fixed w-full z-50 top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">

                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <Church className="h-8 w-8 text-blue-600" />
                            <span className="font-bold text-2xl text-gray-800 tracking-tight">
                                Mt. Eden Korean Church
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="bg-blue-600 text-white px-3 py-1 text-sm rounded-full hover:bg-blue-700 transition"
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/login"
                            className="bg-blue-600 text-white px-3 py-1 text-sm rounded-full hover:bg-blue-700 transition"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                            >
                                {item.name}
                            </Link>
                        ))}
                        {/* Contact Us — same style as nav links */}
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        >
                            Contact Us
                        </Link>
                        {/* Login — same style as nav links */}
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}