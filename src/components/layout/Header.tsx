import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ticket, User, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../hooks/useToast';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { success } = useToast();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: '/', label: 'Home' },
    ...(user ? [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/tickets', label: 'Tickets' },
    ] : [])
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    success('Logged out', 'You have been successfully logged out.');
  };

  return (
    <header className="bg-bg-card border-b border-color-border sticky top-0 z-30">
  <div className="container">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <Ticket className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-text-primary">TicketFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path) 
                    ? 'text-accent bg-bg-hover' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-text-secondary">
                  <User size={16} />
                  <span className="text-sm">{user.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <div className="flex items-center space-x-2 text-text-secondary mr-2">
                <User size={16} />
                <span className="text-sm">{user.name}</span>
              </div>
            )}
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-color-border overflow-hidden"
            >
              <nav className="px-2 pt-2 pb-3 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-accent bg-bg-hover'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Auth Section */}
                <div className="pt-2 border-t border-color-border">
                  {user ? (
                    <button
                      onClick={() => {
                        closeMobileMenu();
                        handleLogout();
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
                    >
                      Logout
                    </button>
                  ) : (
                    <div className="flex flex-col space-y-2 px-2">
                      <Link to="/auth/login" onClick={closeMobileMenu}>
                        <Button variant="outline" size="sm" className="w-full justify-center">
                          Login
                        </Button>
                      </Link>
                      <Link to="/auth/signup" onClick={closeMobileMenu}>
                        <Button size="sm" className="w-full justify-center">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};