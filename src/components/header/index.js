"use client";

import { useContext, useEffect, useState } from "react";
import { GlobalData } from "@/contexts/global-data";
import Image from 'next/image';
import Link from 'next/link';
import '@/components/header/styles.css';

function Header({ }) {
    const { config } = useContext(GlobalData);
    const [links, setLinks] = useState([
        {
            href: '/',
            title: 'Home',
        },
        {
            href: '/about',
            title: 'About',
        },
        {
            href: '/burn',
            title: 'Burn Station',
        },
        {
            href: '#',
            title: 'Leaderboard',
            soon: true,
        },
        {
            href: '#',
            title: 'Museum',
            soon: true,
        },
        {
            href: config?.links.ads ?? '#',
            title: 'Ads',
        },
        {
            href: config?.links.doc ?? '/',
            title: <Image src="/icons/doc.svg" width={18} height={22} alt='doc' />,
        },
        {
            href: config?.links.x ?? '/',
            title: <Image src="/icons/x.svg" width={25} height={28} alt='x' />,
        },
        {
            href: config?.links.discord ?? '/',
            title: <Image src="/icons/discord.svg" width={35} height={35} alt='discord' />,
        },
    ]);

    useEffect(() => {
        setLinks(() => [
            {
                href: '/',
                title: 'Home',
            },
            {
                href: '/about',
                title: 'About',
            },
            {
                href: '/burn',
                title: 'Burn Station',
            },
            {
                href: '#',
                title: 'Leaderboard',
                soon: true,
            },
            {
                href: '#',
                title: 'Museum',
                soon: true,
            },
            {
                href: config?.links.ads ?? '#',
                title: 'Ads',
            },
            {
                href: config?.links.doc ?? '#',
                title: <Image src="/icons/doc.svg" width={18} height={22} alt='doc' />,
            },
            {
                href: config?.links.x ?? '#',
                title: <Image src="/icons/x.svg" width={25} height={28} alt='x' />,
            },
            {
                href: config?.links.discord ?? '#',
                title: <Image src="/icons/discord.svg" width={35} height={35} alt='discord' />,
            },
        ]);
    }, [config]);
    return (
        <header className="container header">
            <Link className='logo-link' href="/">
                <Image src="/logo.svg" width={250} height={19} alt="logo" className="logo" />
            </Link>
            <nav className='navigation'>
                <ul className='navigation__list'>
                    {links.map((el, ind) => (<li className={`navigation__item ${el?.soon ? 'navigation__item--color-grey' : ''}`} key={ind}>
                        {el?.soon ? <div className="navigation__soon">Soon</div> : ''}
                        <Link className='navigation__link' href={el.href ?? '#'}>{el.title}</Link>
                    </li>))}
                </ul>
            </nav>
        </header>
    )
}

export default Header;
