import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ToastProvider } from './hooks/useToast';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/ToastContainer';
import { LandingPage } from './pages/LandingPage';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { Dashboard } from './components/dashboard/Dashboard';
import { TicketManagement } from './components/tickets/TicketManagement';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen flex flex-col bg-bg-primary">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth/login" element={<LoginForm />} />
                <Route path="/auth/signup" element={<SignupForm />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tickets"
                  element={
                    <ProtectedRoute>
                      <TicketManagement />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
            <ToastContainer />
          </div>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;