"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      router.push('/');
    }
  }, [router]);

  const handleEmailSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Simulate API call - replace with your actual auth logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      localStorage.setItem('auth-token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify({ 
        email, 
        name: `${firstName} ${lastName}` 
      }));
      
      router.push('/');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 p-2">
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iYnJhaW5HcmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRkY2NTAwIi8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGOEUwMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9ImNoaXBHcmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMDBGRjAwIi8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwRkY4OCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjwhLS0gQnJhaW4gU2lkZSAoTGVmdCkgLS0+CjxwYXRoIGQ9Ik04IDVDNiA1IDQgNyA0IDEwQzQgMTMgNiAxNSA4IDE1SDE2QzE2IDEzIDE2IDEwIDE2IDhDMTYgNiAxNCA0IDEyIDRIOEw4IDVaTTEwIDhDMTAgNyAxMCA3IDExIDdDMTIgNyAxMiA3IDEyIDhDMTIgOSAxMiA5IDExIDlDMTAgOSAxMCA5IDEwIDhaTTE0IDEyQzE0IDExIDE0IDExIDE1IDExQzE2IDExIDE2IDExIDE2IDEyQzE2IDEzIDE2IDEzIDE1IDEzQzE0IDEzIDE0IDEzIDE0IDEyWk02IDEyQzYgMTEgNiAxMSA3IDExQzggMTEgOCAxMSA4IDEyQzggMTMgOCAxMyA3IDEzQzYgMTMgNiAxMyA2IDEyWiIgZmlsbD0idXJsKCNicmFpbkdyYWRpZW50KSIvPgo8IS0tIENoaXAgU2lkZSAoUmlnaHQpIC0tPgo8cGF0aCBkPSJNMjQgNUMyMiA1IDIwIDcgMjAgMTBDMjAgMTMgMjIgMTUgMjQgMTVIMzJDMzIgMTMgMzIgMTAgMzIgOEMzMiA2IDMwIDQgMjggNEgyNEwyNCA1Wk0yNiA4QzI2IDcgMjYgNyAyNyA3QzI4IDcgMjggNyAyOCA4QzI4IDkgMjggOSAyNyA5QzI2IDkgMjYgOSAyNiA4Wk0zMCAxMkMzMCAxMSAzMCAxMSAzMSAxMUMzMiAxMSAzMiAxMSAzMiAxMkMzMiAxMyAzMiAxMyAzMSAxM0MzMCAxMyAzMCAxMyAzMCAxMlpNMjIgMTJDMjIgMTEgMjIgMTEgMjMgMTFDMjQgMTEgMjQgMTEgMjQgMTJDMjQgMTMgMjQgMTMgMjMgMTNDMjIgMTMgMjIgMTMgMjIgMTJaIiBmaWxsPSJ1cmwoI2NoaXBHcmFkaWVudCkiLz4KPCEtLSBDb25uZWN0aW9uIExpbmVzIC0tPgo8bGluZSB4MT0iMTYiIHkxPSIxMCIgeDI9IjIwIiB5Mj0iMTAiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg=="
                alt="Business Logo"
                className="w-8 h-8"
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Create Account</h1>
            <p className="text-slate-400 mt-2">Join us and start your journey today</p>
          </div>

          {/* Social Signup */}
          <div className="space-y-3 mb-6">
            <button className="w-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl p-4 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium">Sign up with Google</span>
            </button>
            
            <button className="w-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl p-4 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="font-medium">Sign up with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-950 text-slate-400">Or sign up with email</span>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                <input 
                  name="firstName"
                  type="text" 
                  required
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 bg-transparent focus:border-[#f59794] focus:ring-2 focus:ring-[#f59794]/20 transition-all duration-300 placeholder-slate-500" 
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                <input 
                  name="lastName"
                  type="text" 
                  required
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 bg-transparent focus:border-[#f59794] focus:ring-2 focus:ring-[#f59794]/20 transition-all duration-300 placeholder-slate-500" 
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input 
                name="email"
                type="email" 
                required
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 bg-transparent focus:border-[#f59794] focus:ring-2 focus:ring-[#f59794]/20 transition-all duration-300 placeholder-slate-500" 
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input 
                name="password"
                type="password" 
                required
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 bg-transparent focus:border-[#f59794] focus:ring-2 focus:ring-[#f59794]/20 transition-all duration-300 placeholder-slate-500" 
                placeholder="Create a strong password"
              />
            </div>

            <div className="flex items-start">
              <input type="checkbox" required className="w-4 h-4 mt-1 rounded border-slate-600 bg-transparent text-[#f59794] focus:ring-[#f59794]" />
              <span className="ml-2 text-sm text-slate-400">
                I agree to the <Link href="#" className="text-[#f59794] hover:text-[#ff8a87]">Terms of Service</Link> and <Link href="#" className="text-[#f59794] hover:text-[#ff8a87]">Privacy Policy</Link>
              </span>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#f59794] to-[#ff8a87] hover:from-[#ff8a87] hover:to-[#f59794] disabled:opacity-50 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-[#f59794]/25"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-slate-400 mt-6">
            Already have an account? 
            <Link href="/auth/signin" className="text-[#f59794] hover:text-[#ff8a87] font-medium ml-1 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}