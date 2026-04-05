'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { HugeiconsIcon } from '@hugeicons/react'
import { AlertCircleIcon } from '@hugeicons/core-free-icons'

export default function Register() {
    const [emailAddress, setEmailAddress] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()

    const handleRegister = async () => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email_address: emailAddress, mobile_number: mobileNumber, password })
            })

            if (!response.ok) {
                const error = await response.json()
                setError(error.message)
                return
            }

            const data = await response.json()
            setMessage(data.message)
            setEmailAddress('')
            setMobileNumber('')
            setPassword('')
            router.push('/profile')
        } catch (err) {
            alert(err.message)
            setError(err.message)
        }
    }

    return (
        <div
            className='flex flex-col justify-start items-center mt-10 p-5 h-screen w-screen'
        >
            <header className='flex flex-col justify-center items-center p-10 gap-2'>
                <h1 className='font-semibold text-4xl'>Sign Up</h1>
                <p className='text-[#5f4bd2] text-sm font-semibold'>Join Ledger. Manage Smarter.</p>
            </header>
            {error ? (
                <Alert variant='destructive' className='max-w-md'>
                    <HugeiconsIcon icon={AlertCircleIcon} />
                    <AlertTitle>Registration failed</AlertTitle>
                    <AlertDescription>
                        {error.map((err, i) => (
                            <span
                            key={i}
                            className='flex flex-col'
                            >
                                • {err}
                            </span>
                        ))}
                    </AlertDescription>
                </Alert>
            ) : null}

            <div className='flex flex-col gap-8 w-screen p-10'>
                <div className='flex flex-col gap-2'>
                    <Label>Email</Label>
                    <Input
                        className='bg-transparent border-t-0 border-r-0 border-l-0 rounded-none p-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-trasparent'
                        placeholder='e.g. eimii@example.com'
                        value={emailAddress}
                        onChange={e => setEmailAddress(e.target.value)}
                        required
                        type='email'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label>Mobile Number</Label>
                    <Input
                        className='bg-transparent border-t-0 border-r-0 border-l-0 rounded-none p-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-trasparent'
                        placeholder='Enter Mobile No.'
                        value={mobileNumber}
                        onChange={e => setMobileNumber(e.target.value)}
                        required
                        type='text'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label>Password</Label>
                    <Input
                        className='bg-transparent border-t-0 border-r-0 border-l-0 rounded-none p-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-trasparent'
                        placeholder='e.g. ••••••••'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        type='password'
                    />
                </div>
            </div>
            <div className='w-[60vw] text-center text-sm'>
                By signing up you are agreeing to our{' '}
                <span className='text-[#5f4bd2] font-semibold'>Terms & Conditions</span>
                {' '}and{' '}
                <span className='text-[#5f4bd2] font-semibold'>Privacy Policy</span>
            </div>
            <div className='w-screen p-10 pb-20'>
                <Button
                    className='w-full p-6 font-bold'
                    style={{ background: 'linear-gradient(to right, #4b3c9f, #5f4bd2)' }}
                    type='button'
                    onClick={handleRegister}
                >SIGN UP</Button>
            </div>
            <footer>
                Already a member? <span className='text-[#5f4bd2] font-bold'>Login</span>
            </footer>
        </div>
    )
}