'use client'

import Link from 'next/link'
import { signOut } from '@/auth'
import { useRouter } from 'next/navigation'

interface NavProps {
  user: {
    name?: string | null
    email?: string | null
  } | null
}

export function Nav({ user }: NavProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/login')
    router.refresh()
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Todo App
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">
                  {user.name || user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-500"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
