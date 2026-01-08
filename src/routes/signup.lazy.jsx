import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from '@tanstack/react-router'
import { Button, Label, TextInput } from 'flowbite-react'
import { Carousel } from 'flowbite-react'
import photo1 from '../assets/photo1.png'
import photo2 from '../assets/photo2.jpg'
import photo3 from '../assets/photo3.jpg'

export const Route = createLazyFileRoute('/signup')({
    component: SignUpPage,
})

function SignUpPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const { user, register, isRegisterPending, errorRegister, isRegisterError } = useContext(AuthContext)
    const navigate = useNavigate()

    if (user) {
        navigate({ to: '/app' })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        await register(name, email, password)
    }

    const isEmailValid = email.includes('@') && email.length > 5
    const isPasswordValid = password.length >= 6
    const canSubmit = isEmailValid && isPasswordValid && !isRegisterPending

    return (
        <div className="flex flex-row w-full h-screen">
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#0d1117] text-white">
                <form
                    onSubmit={handleRegister}
                    className="flex w-full max-w-md md:max-w-lg flex-col gap-4 p-8 bg-gray-900 rounded-lg shadow-xl border border-gray-800"
                >
                    <h2 className="text-2xl font-bold">Sign up on MergeMind!</h2>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name">Your name</Label>
                        </div>
                        <TextInput
                            id="name"
                            type="text"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email">Your email</Label>
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password">Your password</Label>
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="Senha"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={!canSubmit}>
                        {isRegisterPending ? 'Loading...' : 'Enter'}
                    </Button>
                    <div>
                         Already have an account?{' '}
                        <span
                            className="text-blue-500 cursor-pointer"
                            onClick={() => navigate({ to: '/login' })}
                        >
                            Sign in
                        </span>
                    </div>

                    {isRegisterError && <p className="text-red-500 mt-2" >{errorRegister.message}</p>}
                </form>
            </div>

            <div className="hidden md:flex w-1/2 items-center justify-center p-8 ">
                <div className="h-96 sm:h-[450px] xl:h-[550px] 2xl:h-[650px] w-full max-w-2xl relative rounded-2xl">
                    <Carousel slideInterval={5000} indicators={false}>
                        <div className="relative h-full w-full">
                            <img
                                src={photo1}
                                alt="Slide 1"
                                className="absolute inset-0 w-full h-full object-cover "
                            />
                        </div>
                        <div className="relative h-full w-full">
                            <img
                                src={photo2}
                                alt="Slide 2"
                                className="absolute inset-0 w-full h-full object-cover "
                            />
                        </div>
                        <div className="relative h-full w-full">
                            <img
                                src={photo3}
                                alt="Slide 3"
                                className="absolute inset-0 w-full h-full object-cover "
                            />
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
    )
}
