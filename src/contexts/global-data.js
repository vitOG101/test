"use client";

import { createContext, useState, useEffect } from "react";
export const GlobalData = createContext(null);


function Context({ children }) {
    const [config, setConfig] = useState({
        wallet: '',
        links: { x: '', doc: '', discord: '', gitbook: '', ads: '' }
    });
    const [banners, setBanners] = useState([]);
    const [sponsors, setSponsors] = useState([]);

    const fetchData = async () => {
        try {
            const configRes = await fetch(`/api/config`);
            const config = await configRes.json();
            setConfig(() => config.data);
            const sponsorsRes = await fetch(`/api/sponsors`);
            const sponsors = await sponsorsRes.json();
            setSponsors(() => sponsors.data);
            const bannersRes = await fetch(`/api/banners`);
            const banners = await bannersRes.json();
            setBanners(() => banners.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <GlobalData.Provider value={{ config, setConfig, banners, setBanners, sponsors, setSponsors, fetchData }}>
            {children}
        </GlobalData.Provider>
    );
}

export default Context;
