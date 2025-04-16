"use client"

import Form from 'next/form'
import { useAuth } from '@/hooks/useAuth'
export default function SignInForm() {

    const { signIn } = useAuth()


    const handleSubmit = async (formData: FormData) => {
        const res = await signIn(formData)
        if (res?.error) {
            console.log(res.error)
        } else {
            console.log("ok")
        }
    }

    return (
        <Form action={handleSubmit} className='flex flex-col gap-2 p-2'>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className="border border-gray-300 rounded p-2" required />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" className="border border-gray-300 rounded p-2" required />
            <button type="submit" className="bg-blue-500 text-white rounded p-2">Sign In</button>
        </Form>
    )
}