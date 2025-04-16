"use client"

import Form from 'next/form'
import SignInAction from '@/actions/auth/signin'
import useSession from '@/hooks/use-session'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
export default function SignInForm() {

    const { login } = useSession()



    const handleSignin = async (formData: FormData) => {
        const data = Object.fromEntries(formData.entries())
        const router = useRouter()

        const schema = z.object({
            email: z.string().email(),
            password: z.string().min(2),
        })
        const result = schema.safeParse(data)
        if (!result.success) {
            // return { error: result.error.format() }
        }
        else {
            const { email, password } = result.data
            try {
                await login({ identifier: email, password })
                router.push('/')
                router
            } catch (error) {
                console.error("Login failed", error)
                // return { error: "Login failed" }
            }
        }

    }



    return (
        // <form className="flex flex-col gap-2 p-2">
        //     <label htmlFor="email">Email</label>
        //     <input type="email" name="email" id="email" className="border border-gray-300 rounded p-2" required />
        //     <label htmlFor="password">Password</label>
        //     <input type="password" name="password" id="password" className="border border-gray-300 rounded p-2" required />
        //     <button type="submit" className="bg-blue-500 text-white rounded p-2">Sign In</button>
        // </form>
        <Form action={handleSignin} className='flex flex-col gap-2 p-2'>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className="border border-gray-300 rounded p-2" required />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" className="border border-gray-300 rounded p-2" required />
            <button type="submit" className="bg-blue-500 text-white rounded p-2">Sign In</button>
        </Form>
    )
}