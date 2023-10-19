"use client";

import { useState, useRef, useContext } from "react";
import Image from 'next/image';
import "@/app/admin/page.css";
import { GlobalData } from "@/contexts/global-data";

function FormSponsor() {
    const [loading, setLoading] = useState(false);
    const hiddenFileInput = useRef(null);
    const { sponsors, setSponsors } = useContext(GlobalData);

    const handleFile = async (fileInput) => {
        const formData = new FormData();
        formData.append('file', fileInput);
        
        try {
            setLoading(true);
            const res = await fetch(`/api/sponsors`, {
                method: 'post',
                body: formData,
            });
            const { data } = await res.json();
            setSponsors(() => data);
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
                const res = await fetch(`/api/sponsors/${id}`, {
                    method: 'delete',
                });
                const { data } = await res.json();
                setSponsors(() => data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(() => false);
            }
        }
    }
    const handleChangeLink = (e, ind) => {
        setSponsors((pre) => {
            pre[ind].link = e.target.value;
            return pre;
        });
    }
    const handleSaveLinks = async () => {
        try {
            setLoading(true);
            await fetch(`/api/sponsors/all`, {
                method: 'post',
                body: JSON.stringify(sponsors),
            });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(() => false);
        }
    };

    return (
        <div className="admin-images-upload">
            <div className="adm-img-sp">
                <div className="adm-img--sponsor">
                    <Image src='/sponsor.png' width={115} height={115} alt='' />
                    <div className="btn-circle">
                        <Image src='/icons/add.svg' width={56} height={56} alt='' onClick={handleClick} />
                        {!loading ? <input type='file' ref={hiddenFileInput} accept='image/*' hidden onChange={handleChange} />: ''}
                    </div>
                </div>
                <button type='submit' className='btn btn-green w100' onClick={handleSaveLinks}>Save</button>  
            </div>
            {!loading && sponsors && sponsors.map((el, ind) => (
                <div className="adm-img-sp" key={ind}>
                    <div className="adm-img--sponsor">
                        <Image src={`/api${el.src}`} width={115} height={115} alt='' />
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

export default FormSponsor;
