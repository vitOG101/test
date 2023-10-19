'use client';

import { useState, useContext, useEffect } from "react";
import "@/app/admin/page.css";
import Image from 'next/image';
import { GlobalData } from "@/contexts/global-data";

function FormLinks() {
    const [loading, setLoading] = useState(false);
    const { config, setConfig } = useContext(GlobalData);

    useEffect(() => { }, [config]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = {
            links: {
                x: formData.get('x'),
                discord: formData.get('discord'),
                doc: formData.get('doc'),
                gitbook: formData.get('gitbook'),
                ads: formData.get('ads'),
            }
        };
        try {
            setLoading(true);
            const res = await fetch(`/api/config`, {
                method: 'post',
                body: JSON.stringify(response),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const { data } = await res.json();
            setConfig(() => data);
            // alert('Saved link!');
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(() => false);
        }
    };

    return (
        <form action="#" className='adm-form-social' onSubmit={handleSubmit}>
            <div className="form-inline">
                <div className="adm-mg-wrapper"><Image src="/icons/x.svg" width={68} height={48} alt='x' /></div>
                <input type="text" className='form-input w100' name="x" defaultValue={config?.links?.x} />
                <button type='submit' className='btn btn-green'>Save</button>
            </div>
            <div className="form-inline">
                <div className="adm-mg-wrapper"><Image src="/icons/discord.svg" width={68} height={46} alt='discord' /></div>
                <input type="text" className='form-input w100' name="discord" defaultValue={config?.links?.discord} />
                <button type='submit' className='btn btn-green'>Save</button>
            </div>
            <div className="form-inline">
                <div className="adm-mg-wrapper"><Image src="/icons/doc.svg" width={68} height={55} alt='doc' /></div>
                <input type="text" className='form-input w100' name="doc" defaultValue={config?.links?.doc} />
                <button type='submit' className='btn btn-green'>Save</button>
            </div>
            <div className="form-inline">
                <div className="adm-mg-wrapper"><Image src="/icons/gitbook.svg" width={68} height={62} alt='gitbook' /></div>
                <input type="text" className='form-input w100' name="gitbook" defaultValue={config?.links?.gitbook} />
                <button type='submit' className='btn btn-green'>Save</button>
            </div>
            <div className="form-inline">
                <div className="adm-mg-wrapper"><Image src="/icons/ads.svg" width={68} height={44} alt='ads' /></div>
                <input type="text" className='form-input w100' name="ads" defaultValue={config?.links?.ads} />
                <button type='submit' className='btn btn-green'>Save</button>
            </div>
        </form>
    );
};

export default FormLinks;
