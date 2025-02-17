// app/api/auth/webhook/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Define the expected user type
interface ClerkUser {
  id: string
  email: string
  first_name?: string
  last_name?: string
  created_at: string
}

// Only handle POST requests
export async function POST(request: Request) {
  try {
    // Step 1: Parse the incoming request body
    const { user }: { user: ClerkUser } = await request.json()

    const body = await request.json()  // This parses the body as JSON
    console.log(body)

    // Step 2: Check if user data exists in the request
    if (!user) {
      return NextResponse.json({ error: 'No user data found' }, { status: 400 })
    }

    const { id, email, first_name, last_name, created_at } = user

    // Step 3: Check if the user exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { id },
    })

    let result

    if (existingUser) {
      // If the user already exists, update their information
      result = await prisma.user.update({
        where: { id },
        data: {
          email,
          firstName: first_name || null,
          lastName: last_name || null,
        },
      })
    } else {
      // If the user doesn't exist, create a new user
      result = await prisma.user.create({
        data: {
          id,
          email,
          firstName: first_name || null,
          lastName: last_name || null,
          createdAt: new Date(created_at),
        },
      })
    }

    // Step 4: Return success response
    return NextResponse.json({ success: true, user: result })
  } catch (error) {
    // Catch and log any errors
    console.error('Error handling webhook:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  } finally {
    // Disconnect from Prisma to avoid any hanging connections
    await prisma.$disconnect()
  }
}

// For any other HTTP methods (e.g., GET, PUT), return a method not allowed response
export async function GET() {
  return NextResponse.json(
    { error: 'Method Not Allowed' },
    { status: 405 } // 405 Method Not Allowed
  )
}
