'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      try {
        // Check for auth token in cookies or localStorage
        const authToken = document.cookie.includes('auth-token') || localStorage.getItem('auth-token')
        
        if (authToken) {
          // User is authenticated, redirect to dashboard
          router.replace('/dashboard')
        } else {
          // User is not authenticated, redirect to sign in
          router.replace('/auth/signin')
        }
      } catch (error) {
        // If auth check fails, redirect to sign in
        console.error('Auth check failed:', error)
        router.replace('/auth/signin')
      }
    }

    // Small delay to prevent hydration issues
    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [router])

  // Show loading while redirecting - matches your auth theme
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background elements matching auth pages */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-purple-500/10 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-16 h-16 bg-blue-500/10 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/5 w-24 h-24 bg-indigo-500/10 rounded-full animate-pulse delay-2000" />
      </div>

      {/* Loading content */}
      <div className="relative z-10 text-center">
        {/* Logo matching your auth pages */}
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
          <span className="text-2xl font-bold text-white">PM</span>
        </div>
        
        {/* Loading indicator */}
        <div className="flex flex-col items-center gap-4 text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg">Loading ProjectFlow...</span>
          </div>
          <p className="text-slate-400 text-sm">Redirecting to your workspace</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}