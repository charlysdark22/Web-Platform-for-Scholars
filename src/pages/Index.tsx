import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Search, Users, FileText, Award, Globe, Library, GraduationCap, Globe2, BarChart2 } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sección Acerca de Nosotros (Nueva) */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Acerca de Biblioteca Académica
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Biblioteca Académica es la plataforma integral diseñada por académicos para académicos, 
              que transforma la manera en que gestionas, compartes y descubres conocimiento científico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-blue-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <Library className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Nuestra Misión</h3>
              </div>
              <p className="text-gray-600">
                Democratizar el acceso al conocimiento académico y facilitar la colaboración 
                entre investigadores de todo el mundo.
              </p>
            </div>

            <div className="bg-indigo-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold">Lo que Ofrecemos</h3>
              </div>
              <p className="text-gray-600">
                Herramientas profesionales para gestión de publicaciones, búsqueda avanzada, 
                métricas de impacto y networking académico.
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <Globe2 className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold">Nuestra Comunidad</h3>
              </div>
              <p className="text-gray-600">
                Más de 50,000 investigadores de 120 países confían en Biblioteca Académica para 
                compartir su trabajo y conectar con colegas.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">En números</h3>
                <p className="mb-6">
                  Biblioteca Académica en cifras: impacto real en la comunidad académica
                </p>
                <Button variant="secondary" asChild>
                  <Link to="/about">
                    Conoce más
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold mb-1">50K+</p>
                  <p className="text-sm">Publicaciones</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold mb-1">120+</p>
                  <p className="text-sm">Países</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold mb-1">1M+</p>
                  <p className="text-sm">Citas</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold mb-1">30+</p>
                  <p className="text-sm">Disciplinas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section (Original reposicionada) */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Biblioteca Académica
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            La plataforma académica más completa para gestionar, difundir y descubrir investigación de calidad.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/register">
                Comenzar Ahora
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">
                Acceso Investigadores
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Nuestras Funcionalidades
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Gestión de Publicaciones</CardTitle>
                <CardDescription>
                  Sube y organiza tus trabajos con nuestro sistema de versionado y herramientas de edición colaborativa
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Search className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Búsqueda Inteligente</CardTitle>
                <CardDescription>
                  Motor de búsqueda semántica con filtros avanzados por disciplina, institución y métricas de impacto
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Red Académica</CardTitle>
                <CardDescription>
                  Conecta con colegas, forma grupos de investigación y participa en discusiones especializadas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart2 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Analíticas Avanzadas</CardTitle>
                <CardDescription>
                  Panel con métricas de impacto, citaciones y alcance de tus publicaciones
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle>Formatos Académicos</CardTitle>
                <CardDescription>
                  Exporta en APA, MLA, Chicago o IEEE con un clic. Compatible con Zotero y Mendeley
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <CardTitle>Difusión Global</CardTitle>
                <CardDescription>
                  Integración con ORCID, Google Scholar y repositorios institucionales
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Únete a la revolución académica
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Regístrate ahora y accede a todas las herramientas profesionales para investigadores
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/register">
                Crear Cuenta Gratis
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/demo">
                Ver Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}