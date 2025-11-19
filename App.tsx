
import React, { useState, useEffect } from 'react';
import { User, ViewState } from './types.ts';
import Navbar from './components/Navbar.tsx';
import Sidebar from './components/Sidebar.tsx';
import BillingSection from './components/BillingSection.tsx';
import SavedBillsSection from './components/SavedBillsSection.tsx';
import AdminSection from './components/AdminSection.tsx';
import LoginModal from './components/LoginModal.tsx';
import { Toaster } from 'react-hot-toast';
import { auth } from './firebaseConfig.ts';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const App: React.FC = () => {
  // State
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('billing');
  const [authLoading, setAuthLoading] = useState(true);

  // Real Firebase Auth Listener
  useEffect(() => {
    if (!auth) {
      // Fallback to local mode if firebase failed to init
      const storedUser = localStorage.getItem('npp_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setAuthLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          email: firebaseUser.email || '',
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || 'Admin'
        });
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fallback login for local mode (simulated)
  const handleLocalLogin = (email: string) => {
    const dummyUser: User = {
      email,
      uid: 'local_user',
      displayName: 'Local Admin'
    };
    setUser(dummyUser);
    localStorage.setItem('npp_user', JSON.stringify(dummyUser));
  };

  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Logout error", error);
      }
    } else {
      // Local fallback
      setUser(null);
      localStorage.removeItem('npp_user');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1605545077339-925c0475c342?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <LoginModal onLocalLogin={handleLocalLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      <Toaster position="top-right" />
      
      {/* Top Navigation */}
      <Navbar 
        onLogout={handleLogout} 
        userEmail={user?.email || ''} 
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          currentView={currentView} 
          onChangeView={setCurrentView} 
        />

        {/* Dynamic View Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">
          {currentView === 'billing' && <BillingSection adminName={user?.displayName || 'Admin'} />}
          {currentView === 'saved' && <SavedBillsSection />}
          {currentView === 'admin' && <AdminSection />}
        </main>
      </div>
    </div>
  );
};

export default App;
