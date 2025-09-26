// app/api/auth/status/route.ts or pages/api/auth/status.ts depending on your Next.js version
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get('cookie') || ''
    const cookies = Object.fromEntries(cookie.split('; ').map(c => {
      const [key, ...v] = c.split('=')
      return [key, v.join('=')]
    }))
    const token = cookies['Klickshare']

    if (!token) {
      return NextResponse.json({ isLoggedIn: false })
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      //console.log(decoded);
      return NextResponse.json({ isLoggedIn: true, user: decoded })
    } catch {
      return NextResponse.json({ isLoggedIn: false })
    }
  } catch {
    return NextResponse.json({ isLoggedIn: false })
  }
}
