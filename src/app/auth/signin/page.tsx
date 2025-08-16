'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Replace this with your actual authentication logic
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Redirect to dashboard after successful login
        router.push('/dashboard')
      } else {
        alert('Invalid credentials')
      }
    } catch (error) {
      console.error('Sign in error:', error)
      alert('Sign in failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient with subtle texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-500/5 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-500/5 rounded-full blur-xl animate-pulse delay-1000" />

      {/* Main Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-white mb-2">
              Welcome back
            </h1>
            <p className="text-slate-400 text-sm">
              Sign in to continue to ProjectFlow
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-slate-300 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium">Continue with Google</span>
            </button>
            
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-slate-300 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-sm font-medium">Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-slate-900 px-3 text-slate-500 font-medium">or</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white/[0.04] transition-all duration-200 outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 bg-white/[0.02] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white/[0.04] transition-all duration-200 outline-none"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 rounded border border-white/[0.08] bg-white/[0.02] text-emerald-500 focus:ring-emerald-500/20" />
                  <span className="ml-2 text-sm text-slate-400">Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-emerald-500/20"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <span className="text-slate-400 text-sm">Don't have an account? </span>
            <Link href="/auth/signup" className="text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors">
              Sign up
            </Link>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Secure Login</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>256-bit SSL</span>
          </div>
        </div>
      </div>
    </div>
  )
}