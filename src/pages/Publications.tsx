import { useState } from 'react';
import { usePublications } from '@/hooks/usePublications';
import { PublicationCard } from '@/components/publications';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Publication } from '@/types';
import { Search, Filter, Download, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import translations from '@/lib/translations';

export default function Publications() {
  const { publications, loading } = usePublications();
  const { lang } = useLanguage();
  const t = translations[lang];
  // Filtrar solo publicaciones que tengan un id numérico (simula solo las de la base de datos)
  const dbPublications = publications.filter(pub => !isNaN(Number(pub.id)));
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  const filteredPublications = dbPublications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pub.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || pub.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedPublications = [...filteredPublications].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'year':
        return b.year - a.year;
      default:
        return 0;
    }
  });

  const handleExportPDF = (publication: Publication) => {
    // Mock PDF export
    const element = document.createElement('a');
    const file = new Blob([`Título: ${publication.title}\n\nAutores: ${publication.authors.map(a => a.name).join(', ')}\n\nResumen: ${publication.abstract}`], 
      { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${publication.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExportWord = (publication: Publication) => {
    // Mock Word export
    const element = document.createElement('a');
    const file = new Blob([`Título: ${publication.title}\n\nAutores: ${publication.authors.map(a => a.name).join(', ')}\n\nResumen: ${publication.abstract}`], 
      { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    element.href = URL.createObjectURL(file);
    element.download = `${publication.title.replace(/[^a-zA-Z0-9]/g, '_')}.docx`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{lang === 'es' ? 'Publicaciones' : 'Publications'}</h1>
          <p className="text-gray-600">
            {lang === 'es' ? 'Explora todas las publicaciones académicas disponibles' : 'Explore all available academic publications'}
          </p>
        </div>
        <Button asChild>
          <Link to="/create">
            <Plus className="h-4 w-4 mr-2" />
            {lang === 'es' ? 'Nueva Publicación' : 'New Publication'}
          </Link>
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar publicaciones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                  <SelectItem value="under_review">En Revisión</SelectItem>
                  <SelectItem value="draft">Borrador</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Más reciente</SelectItem>
                  <SelectItem value="oldest">Más antiguo</SelectItem>
                  <SelectItem value="title">Título A-Z</SelectItem>
                  <SelectItem value="year">Año</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Mostrando {sortedPublications.length} de {publications.length} publicaciones
        </p>
      </div>

      {/* Publications List */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : sortedPublications.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedPublications.map(publication => (
            <PublicationCard
              key={publication.id}
              publication={publication}
              onExportPDF={handleExportPDF}
              onExportWord={handleExportWord}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron publicaciones
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Intenta ajustar tus filtros de búsqueda o crear una nueva publicación
            </p>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setSortBy('recent');
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Limpiar Filtros
              </Button>
              <Button asChild>
                <Link to="/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Publicación
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}