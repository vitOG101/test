import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import FormWallet from './form-wallet';
import FormLinks from './form-links';
import FormSponsor from './form-sponsor';
import FormBanner from './form-banner';

import "@/app/admin/page.css";

async function Admin({ }) {
    const session = await getServerSession();

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="admin-page">
            <h2 className='container'>Edit banners</h2>

            <FormBanner />

            <h2 className='container'>Edit wallet</h2>

            <div className="container">
                <FormWallet />
            </div>


            <h2 className='container'>Edit sponsors</h2>

            <FormSponsor />

            <h2 className='container'>Edit socials</h2>

            <div className="container">
                <FormLinks />
            </div>
        </div>
    )
}

export default Admin;
