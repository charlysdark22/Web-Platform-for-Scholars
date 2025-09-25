import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff } from 'lucide-react';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    affiliation: '',
    role: 'autor' as 'autor' | 'revisor' | 'admin',
    googleScholar: '',
    orcid: '',
    researchGate: '',
    scopus: '',
    linkedin: '',
    otrasRedes: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.affiliation) {
      setError('Por favor, complete todos los campos obligatorios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al registrar usuario. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const validateName = (name: string) => {
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(name)) {
      setNameError('Solo se permiten letras y espacios');
      return false;
    }
    setNameError('');
    return true;
  };

  const validatePassword = (password: string) => {
    // Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password)) {
      setPasswordError('Debe tener 8+ caracteres, mayúscula, minúscula, número y símbolo');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (confirm: string, password: string) => {
    if (confirm !== password) {
      setConfirmPasswordError('Las contraseñas no coinciden');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'name') validateName(value);
    if (field === 'password') validatePassword(value);
    if (field === 'confirmPassword') validateConfirmPassword(value, formData.password);
    if (field === 'password' && formData.confirmPassword) validateConfirmPassword(formData.confirmPassword, value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Crear Cuenta</CardTitle>
          <CardDescription className="text-center">
            Únete a la comunidad académica de Biblioteca Académica
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Dr. Juan Pérez"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className={
                  nameError
                    ? 'border-red-500 focus:border-red-500'
                    : formData.name
                    ? 'border-green-500 focus:border-green-500'
                    : ''
                }
              />
              {nameError && (
                <span className="text-xs text-red-500">{nameError}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico *</Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@universidad.edu"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="affiliation">Afiliación Institucional *</Label>
              <Input
                id="affiliation"
                type="text"
                placeholder="Universidad Nacional de Colombia"
                value={formData.affiliation}
                onChange={(e) => handleInputChange('affiliation', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="autor">Autor</SelectItem>
                  <SelectItem value="revisor">Revisor</SelectItem>
                  <SelectItem value="admin">Investigador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="googleScholar">Google Scholar</Label>
              <Input
                id="googleScholar"
                type="text"
                placeholder="Enlace o ID de Google Scholar"
                value={formData.googleScholar}
                onChange={(e) => handleInputChange('googleScholar', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orcid">ORCID</Label>
              <Input
                id="orcid"
                type="text"
                placeholder="Enlace o ID de ORCID"
                value={formData.orcid}
                onChange={(e) => handleInputChange('orcid', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="researchGate">ResearchGate</Label>
              <Input
                id="researchGate"
                type="text"
                placeholder="Enlace o usuario de ResearchGate"
                value={formData.researchGate}
                onChange={(e) => handleInputChange('researchGate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scopus">Scopus</Label>
              <Input
                id="scopus"
                type="text"
                placeholder="Enlace o ID de Scopus"
                value={formData.scopus}
                onChange={(e) => handleInputChange('scopus', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                type="text"
                placeholder="Enlace de LinkedIn"
                value={formData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otrasRedes">Otras redes académicas</Label>
              <Input
                id="otrasRedes"
                type="text"
                placeholder="Enlaces o usuarios de otras redes"
                value={formData.otrasRedes}
                onChange={(e) => handleInputChange('otrasRedes', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className={
                    passwordError
                      ? 'border-red-500 focus:border-red-500'
                      : formData.password
                      ? 'border-green-500 focus:border-green-500'
                      : ''
                  }
                  onCopy={e => e.preventDefault()}
                  onPaste={e => e.preventDefault()}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordError && (
                <span className="text-xs text-red-500">{passwordError}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
                className={
                  confirmPasswordError
                    ? 'border-red-500 focus:border-red-500'
                    : formData.confirmPassword
                    ? 'border-green-500 focus:border-green-500'
                    : ''
                }
              />
              {confirmPasswordError && (
                <span className="text-xs text-red-500">{confirmPasswordError}</span>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creando Cuenta...' : 'Crear Cuenta'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Inicia sesión aquí
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};