import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import User from "@/lib/models/User";
import { connectDB } from "@/lib/database";

const loginSchema = z.object({
    email_address: z.email(),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
})

export async function POST(request) {
    try {
        await connectDB()
        const body = await request.json()
        const result = loginSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json(
                { message: result.error.issues },
                { status: 400 }
            )
        }

        // * if input are validated -> fetch in database -> compare password
        const { email_address, password } = result.data
        const user = await User.findOne({ email_address })

        const compare = await bcrypt.compare(password, user.password)
        if (!compare) {
            return NextResponse.json(
                { message: "Password doesn't match!" },
                { status: 401 }
            )
        }

        // * if password match -> create a session token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: '1d'})

        const response = NextResponse.json(
            { message: 'Login Successful!' },
            { status: 200 }
        )
        
        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        
        return response
    } catch (err) {
        return NextResponse.json(
            { message: `Login error: ${err.message}` },
            { status: 500 }
        )
    }
}