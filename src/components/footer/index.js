"use client";

import { useContext, useEffect, useState } from "react";
import { GlobalData } from "@/contexts/global-data";

import Link from 'next/link';
import '@/components/footer/styles.css';

function Footer() {
    const { config } = useContext(GlobalData);
    const [links, setLinks] = useState([
        {
            href: config?.links.x ?? '#',
            title: 'Twittter',
        },
        {
            href: config?.links.discord ?? '#',
            title: 'Discord',
        },
        {
            href: config?.links.gitbook ?? '#',
            title: 'GitBook',
        },
        {
            href: config?.links.doc ?? '#',
            title: 'Guide',
        },
        {
            href: '#',
            title: 'Cookies',
        },
    ]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            await fetch(`/api/subscription`, {
                method: 'post',
                body: JSON.stringify({ email: formData.get('email') }),
            });

            e.target.reset();
            // alert('Subscribed!');
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        setLinks(() => [
            {
                href: config?.links.x ?? '#',
                title: 'Twittter',
            },
            {
                href: config?.links.discord ?? '#',
                title: 'Discord',
            },
            {
                href: config?.links.gitbook ?? '#',
                title: 'GitBook',
            },
            {
                href: config?.links.doc ?? '#',
                title: 'Guide',
            },
            {
                href: '#',
                title: 'Cookies',
            },
        ])
    }, [config]);
    return (
        <footer className="footer">
            <div className="container">
                <section className="footer__container">
                    <form action="#" onSubmit={handleSubmit} className="subscription">
                        <h3>Stay Connected</h3>
                        <label htmlFor="email">Email*</label>
                        <input type="email" name="email" required />
                        <button type='submit' className='btn btn-small btn-black'>Subscribe</button>
                    </form>
                    <nav className='footer__links'>
                        <h3>Links</h3>
                        <ul>
                            {links.map((el, ind) => (<li key={ind}><Link href={el.href ?? '#'}>{el.title}</Link></li>))}
                        </ul>
                    </nav>
                </section>
                <div className="copi">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path d="M2.52198 2.45521C4.18254 0.818403 6.17521 0 8.5 0C10.8248 0 12.8175 0.828764 14.478 2.48629C16.1593 4.14382 17 6.15356 17 8.51554C17 10.8568 16.1697 12.8562 14.5092 14.5137C12.8486 16.1712 10.8455 17 8.5 17C6.1337 17 4.12027 16.1712 2.45971 14.5137C0.819902 12.8355 0 10.8361 0 8.51554C0 6.13285 0.840659 4.11274 2.52198 2.45521ZM1.18315 8.51554C1.18315 10.5874 1.88889 12.3382 3.30037 13.7678C4.69109 15.1974 6.4243 15.9122 8.5 15.9122C10.5757 15.9122 12.3089 15.2078 13.6996 13.7989C15.0904 12.39 15.7857 10.6496 15.7857 8.5777C15.7857 6.50579 15.08 4.74467 13.6685 3.29433C12.2778 1.844 10.5446 1.11883 8.46886 1.11883C6.39316 1.11883 4.65995 1.83364 3.26923 3.26325C1.87851 4.69287 1.18315 6.44363 1.18315 8.51554ZM5.38645 5.19013C6.279 4.29921 7.34799 3.85375 8.59341 3.85375C9.58974 3.85375 10.4823 4.16453 11.2711 4.78611C12.0806 5.38696 12.6203 6.17428 12.8901 7.14808H11.3333C11.105 6.58867 10.7418 6.1432 10.2436 5.8117C9.74542 5.48019 9.19536 5.31444 8.59341 5.31444C7.72161 5.31444 6.98474 5.62523 6.38278 6.2468C5.80159 6.84765 5.51099 7.58318 5.51099 8.45338C5.51099 9.32358 5.80159 10.0695 6.38278 10.691C6.98474 11.3126 7.72161 11.6234 8.59341 11.6234C9.19536 11.6234 9.74542 11.4576 10.2436 11.1261C10.7418 10.7946 11.105 10.3492 11.3333 9.78976H12.8901C12.5995 10.7428 12.0598 11.5302 11.2711 12.1517C10.5031 12.7526 9.6105 13.053 8.59341 13.053C7.32723 13.053 6.24786 12.6076 5.35531 11.7166C4.46276 10.805 4.01648 9.71725 4.01648 8.45338C4.01648 7.18952 4.47314 6.10177 5.38645 5.19013Z" fill="black" />
                    </svg>
                    2023 MAXXIS
                </div>
            </div>
        </footer>
    )
}

export default Footer;
