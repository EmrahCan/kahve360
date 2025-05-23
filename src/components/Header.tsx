import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <Image 
                src="/logo.png" 
                alt="CafeConnect Logo" 
                width={40} 
                height={40} 
                className="rounded-full"
              />
            </div>
            <span className="text-xl font-heading font-bold text-primary">Cafe<span className="text-secondary">Connect</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/brands" className="text-gray-700 hover:text-primary font-medium">
              Markalar
            </Link>
            <Link href="/campaigns" className="text-gray-700 hover:text-primary font-medium">
              Kampanyalar
            </Link>
            <Link href="/map" className="text-gray-700 hover:text-primary font-medium">
              Şube Bulucu
            </Link>
            <Link href="/loyalty" className="text-gray-700 hover:text-primary font-medium">
              Sadakat Kartlarım
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-medium">{user.name.split(' ')[0]}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profilim
                    </Link>
                    <Link href="/loyalty" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Sadakat Kartlarım
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-primary font-medium hover:text-primary-dark">
                  Giriş Yap
                </Link>
                <Link href="/auth/register" className="btn btn-primary py-2">
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link href="/brands" className="text-gray-700 hover:text-primary font-medium">
                Markalar
              </Link>
              <Link href="/campaigns" className="text-gray-700 hover:text-primary font-medium">
                Kampanyalar
              </Link>
              <Link href="/map" className="text-gray-700 hover:text-primary font-medium">
                Şube Bulucu
              </Link>
              <Link href="/loyalty" className="text-gray-700 hover:text-primary font-medium">
                Sadakat Kartlarım
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                {user ? (
                  <>
                    <Link href="/profile" className="text-gray-700 hover:text-primary font-medium">
                      Profilim
                    </Link>
                    <Link href="/loyalty" className="text-gray-700 hover:text-primary font-medium">
                      Sadakat Kartlarım
                    </Link>
                    <button 
                      onClick={logout}
                      className="text-primary font-medium hover:text-primary-dark text-left"
                    >
                      Çıkış Yap
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="text-primary font-medium hover:text-primary-dark">
                      Giriş Yap
                    </Link>
                    <Link href="/auth/register" className="btn btn-primary w-full text-center">
                      Kayıt Ol
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
