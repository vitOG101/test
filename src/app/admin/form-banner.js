'use client';

import Image from 'next/image';
import { useState, useRef, useContext } from "react";
import "@/app/admin/page.css";
import { GlobalData } from "@/contexts/global-data";

function FormBanner() {
    const [loading, setLoading] = useState(false);
    const hiddenFileInput = useRef(null);
    const { banners, setBanners } = useContext(GlobalData);

    const handleFile = async (fileInput) => {
        const formData = new FormData();
        formData.append('file', fileInput);
        
        try {
            setLoading(true);
            const res = await fetch(`/api/banners`, {
                method: 'post',
                body: formData,
            });
            const { data } = await res.json();
            setBanners(() => data);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(() => false);
        }
    };
    const handleChange = (e) => {
        const fileUploaded = e.target.files[0];
        handleFile(fileUploaded);
    }
    const handleClick = (e) => {
        hiddenFileInput.current.click();
    }
    const handleRemove = async (id) => {
        if (confirm("Remove?\nEither OK or Cancel.")) {
            try {
                setLoading(true);
                const res = await fetch(`/api/banners/${id}`, {
                    method: 'delete',
                });
                const { data } = await res.json();
                setBanners(() => data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(() => false);
            }
        }
    }
    const handleChangeLink = (e, ind) => {
        setBanners((pre) => {
            pre[ind].link = e.target.value;
            return pre;
        });
    }
    const handleSaveLinks = async () => {
        try {
            setLoading(true);
            await fetch(`/api/banners/all`, {
                method: 'post',
                body: JSON.stringify(banners),
            });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(() => false);
        }
    };

    return (
        <div className="admin-images-upload">
            <div className="adm-img">
                <div className="adm-img--banner">
                    <Image src='/grey-bg.svg' width={333} height={142} alt='' />
                    <div className="btn-circle">
                        <Image src='/icons/add.svg' width={56} height={56} alt='' onClick={handleClick} />
                        {!loading ? <input type='file' ref={hiddenFileInput} accept='image/*' hidden onChange={handleChange} />: ''}
                    </div>
                </div>
                <button type='submit' className='btn btn-green w100' onClick={handleSaveLinks}>Save</button>
            </div>
            
            {banners && banners.map((el, ind) => (
                <div className="adm-img" key={ind}>
                    <div className="adm-img--banner">
                        <Image src={`/api${el.src}`} width={333} height={142} alt='' />
                        <div className="btn-circle" onClick={() => handleRemove(ind)}>
                            <Image src='/icons/remove.svg' width={56} height={56} alt='' />
                        </div>
                    </div>
                    <input type="text" className='form-input w100' name="link" defaultValue={el.link || ''} onChange={(e) => handleChangeLink(e, ind)} />
                </div>
            ))}
        </div>
    );
};

export default FormBanner;
