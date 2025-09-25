import { useState } from 'react';
import { usePublications } from '@/hooks/usePublications';
import { SearchForm } from '@/components/search/SearchForm';
import { PublicationCard } from '@/components/publications';
import { SearchFilters, Publication } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const { publications, searchPublications, loading } = usePublications();
  const [searchResults, setSearchResults] = useState<Publication[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (filters: SearchFilters) => {
    setIsSearching(true);
    setHasSearched(true);

    // Simulate search delay
    setTimeout(() => {
      const results = searchPublications(filters);
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Búsqueda Avanzada</h1>
        <p className="text-gray-600">
          Encuentra publicaciones académicas utilizando múltiples filtros de búsqueda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Search Form */}
        <div className="lg:col-span-1">
          <SearchForm onSearch={handleSearch} loading={isSearching} />
        </div>

        {/* Search Results */}
        <div className="lg:col-span-2">
          {!hasSearched ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <SearchIcon className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Realiza una búsqueda
                </h3>
                <p className="text-gray-600 text-center">
                  Utiliza los filtros de la izquierda para encontrar publicaciones académicas específicas
                </p>
              </CardContent>
            </Card>
          ) : isSearching ? (
            <div className="space-y-6">
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-gray-200 h-48 rounded-lg"></div>
                ))}
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Resultados de Búsqueda</h2>
                <p className="text-gray-600">
                  Se encontraron {searchResults.length} publicaciones
                </p>
              </div>
              
              <div className="space-y-6">
                {searchResults.map(publication => (
                  <PublicationCard
                    key={publication.id}
                    publication={publication}
                    onExportPDF={handleExportPDF}
                    onExportWord={handleExportWord}
                  />
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <SearchIcon className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron resultados
                </h3>
                <p className="text-gray-600 text-center">
                  Intenta ajustar tus criterios de búsqueda o utilizar términos más generales
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}