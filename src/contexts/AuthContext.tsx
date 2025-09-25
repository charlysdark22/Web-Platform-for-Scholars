import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check for stored auth data on app load
    const storedToken = localStorage.getItem('scholarhub_token');
    const storedUser = localStorage.getItem('scholarhub_user');
    
    if (storedToken && storedUser) {
      setAuthState({
        token: storedToken,
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Lógica real: llamar API de backend
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Credenciales incorrectas. Intente nuevamente.');
    }
    const data = await response.json();
    setAuthState({
      user: data.user,
      token: data.access_token,
      isAuthenticated: true,
    });
    localStorage.setItem('scholarhub_token', data.access_token);
    localStorage.setItem('scholarhub_user', JSON.stringify(data.user));
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    // Lógica real: llamar API de backend
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Error al registrar usuario. Intente nuevamente.');
    }
    const data = await response.json();
    setAuthState({
      user: data,
      token: null, // El endpoint /users no devuelve token, solo el usuario creado
      isAuthenticated: false,
    });
    localStorage.setItem('scholarhub_user', JSON.stringify(data));
  };

  const logout = () => {
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });

    localStorage.removeItem('scholarhub_token');
    localStorage.removeItem('scholarhub_user');
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));

      localStorage.setItem('scholarhub_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};