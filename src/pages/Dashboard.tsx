import { useAuth } from '@/contexts/AuthContext';
import { usePublications } from '@/hooks/usePublications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PublicationCard } from '@/components/publications';
import { BookOpen, FileText, Eye, TrendingUp, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import translations from '@/lib/translations';

export default function Dashboard() {
  const { user } = useAuth();
  const { publications, loading } = usePublications();
  const { lang } = useLanguage();
  const t = translations[lang];
  // Solo publicaciones subidas por el usuario autenticado
  const userPublications = publications.filter(pub => pub.userId === user?.id);

  const publishedCount = userPublications.filter(pub => pub.status === 'published').length;
  const draftCount = userPublications.filter(pub => pub.status === 'draft').length;
  const underReviewCount = userPublications.filter(pub => pub.status === 'under_review').length;

  const totalViews = userPublications.reduce((acc, pub) => acc + Math.floor(Math.random() * 500), 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {lang === 'es' ? `Bienvenido, ${user?.name}` : `Welcome, ${user?.name}`}
        </h1>
        <p className="text-gray-600">
          {lang === 'es' ? 'Gestiona tus publicaciones académicas y revisa tu actividad reciente' : 'Manage your academic publications and review your recent activity'}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publicaciones</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedCount}</div>
            <p className="text-xs text-muted-foreground">
              publicadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Borradores</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftCount}</div>
            <p className="text-xs text-muted-foreground">
              en progreso
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Revisión</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{underReviewCount}</div>
            <p className="text-xs text-muted-foreground">
              pendientes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizaciones</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
            <p className="text-xs text-muted-foreground">
              este mes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>
            Accede rápidamente a las funciones más utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link to="/create">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Publicación
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/publications">
                <BookOpen className="h-4 w-4 mr-2" />
                Ver Mis Publicaciones
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/search">
                <Eye className="h-4 w-4 mr-2" />
                Explorar Publicaciones
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Publications */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Publicaciones Recientes</h2>
          <Button variant="outline" asChild>
            <Link to="/publications">Ver Todas</Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : userPublications.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userPublications.slice(0, 4).map(publication => (
              <PublicationCard
                key={publication.id}
                publication={publication}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tienes publicaciones aún
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Comienza creando tu primera publicación académica
              </p>
              <Button asChild>
                <Link to="/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Publicación
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}