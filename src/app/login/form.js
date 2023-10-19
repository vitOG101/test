'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Form() {
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        });

        // console.log({ response });
        if (!response?.error) {
            router.push('/admin');
            router.refresh();
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="container form-column"
        >
            <input
                name="email"
                className="form-input"
                type="email"
            />
            <input
                name="password"
                className="form-input"
                type="password"
            />
            <button type="submit" className='btn btn-yellow'>Login</button>
        </form>
    );
}