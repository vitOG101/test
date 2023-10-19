"use client";

import { useState, useContext, useEffect } from "react";
import { GlobalData } from "@/contexts/global-data";
import "@/app/admin/page.css";

function FormWallet() {
    const [loading, setLoading] = useState(false);
    const { config, setConfig } = useContext(GlobalData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = {
            wallet: formData.get('wallet'),
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
            setConfig(data);
            // alert('Saved wallet!');
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(() => false);
        }
    };

    return (
        <form action="#" className='adm-form-wallet' onSubmit={handleSubmit}>
            <div className="form-inline">
                <input type="text" name="wallet" className='form-input w100' defaultValue={config?.wallet} />
                <button type='submit' className='btn btn-green' disabled={loading}>Save</button>
            </div>
        </form>
    );
};

export default FormWallet;
