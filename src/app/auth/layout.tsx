import { Metadata } from 'next'
import './auth.css'

export const metadata: Metadata = {
  title: {
    template: '%s | ProjectFlow',
    default: 'Authentication | ProjectFlow'
  },
  description: 'Sign in or create an account for ProjectFlow project management platform',
  robots: {
    index: false, // Don't index auth pages
    follow: false
  }
}

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        
        {/* Floating geometric shapes */}
        <div className="floating-shape floating-shape-1" />
        <div className="floating-shape floating-shape-2" />
        <div className="floating-shape floating-shape-3" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full grid-pattern" />
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10 auth-fade-in">
        {children}
      </main>
    </div>
  )
}