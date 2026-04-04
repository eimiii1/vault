import { NextResponse } from "next/server";
import { z } from 'zod'

const registerSchema = z.object({
    email_address: z.string(),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
})
