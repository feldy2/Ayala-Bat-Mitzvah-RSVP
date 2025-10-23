import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Home, Users } from 'lucide-react';

const Navigation: React.FC = () => {
  const router = useRouter();

  const navItems = [
    { href: '/', label: 'דף הבית', icon: Home },
    { href: '/admin', label: 'Admin', icon: Users },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 relative"
              style={{
                backgroundColor: '#fef7f0',
                borderRadius: '50%',
                padding: '2px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                background: 'linear-gradient(135deg, #fef7f0 0%, #fffbeb 100%)',
                border: '1px solid #fde68a'
              }}
            >
              <Image
                src="/logo.png"
                alt="Ayala's Bat Mitzvah Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 70px, 100px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary-700 font-display">
                בת מצווה לאילה רחל מימון
              </span>
            </div>
          </div>
          
          <div className="flex space-x-8">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = router.pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
