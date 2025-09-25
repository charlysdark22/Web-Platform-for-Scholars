import { useState } from 'react';
import { SearchFilters } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  loading?: boolean;
}

const categories = [
  'Inteligencia Artificial',
  'Machine Learning',
  'Ingeniería de Software',
  'Ciencias de la Computación',
  'Medicina',
  'Sostenibilidad',
  'Educación',
  'Investigación',
];

export const SearchForm = ({ onSearch, loading }: SearchFormProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    author: '',
    yearFrom: undefined,
    yearTo: undefined,
    categories: [],
    keywords: [],
  });

  const [keywordInput, setKeywordInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !filters.keywords?.includes(keywordInput.trim())) {
      setFilters(prev => ({
        ...prev,
        keywords: [...(prev.keywords || []), keywordInput.trim()],
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFilters(prev => ({
      ...prev,
      keywords: prev.keywords?.filter(k => k !== keyword) || [],
    }));
  };

  const addCategory = (category: string) => {
    if (!filters.categories?.includes(category)) {
      setFilters(prev => ({
        ...prev,
        categories: [...(prev.categories || []), category],
      }));
    }
  };

  const removeCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories?.filter(c => c !== category) || [],
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      author: '',
      yearFrom: undefined,
      yearTo: undefined,
      categories: [],
      keywords: [],
    });
    setKeywordInput('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="h-5 w-5 mr-2" />
          Búsqueda Avanzada
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Query */}
          <div className="space-y-2">
            <Label htmlFor="query">Búsqueda General</Label>
            <Input
              id="query"
              type="text"
              placeholder="Título, resumen o contenido..."
              value={filters.query}
              onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author">Autor</Label>
            <Input
              id="author"
              type="text"
              placeholder="Nombre del autor..."
              value={filters.author}
              onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
            />
          </div>

          {/* Year Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="yearFrom">Año Desde</Label>
              <Input
                id="yearFrom"
                type="number"
                placeholder="2020"
                min="1900"
                max={new Date().getFullYear()}
                value={filters.yearFrom || ''}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  yearFrom: e.target.value ? parseInt(e.target.value) : undefined 
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearTo">Año Hasta</Label>
              <Input
                id="yearTo"
                type="number"
                placeholder="2024"
                min="1900"
                max={new Date().getFullYear()}
                value={filters.yearTo || ''}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  yearTo: e.target.value ? parseInt(e.target.value) : undefined 
                }))}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <Label>Categorías</Label>
            <Select onValueChange={addCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {filters.categories && filters.categories.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {filters.categories.map(category => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {category}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeCategory(category)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <Label>Palabras Clave</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Agregar palabra clave..."
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
              />
              <Button type="button" onClick={addKeyword} size="sm">
                Agregar
              </Button>
            </div>
            {filters.keywords && filters.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {filters.keywords.map(keyword => (
                  <Badge key={keyword} variant="outline" className="flex items-center gap-1">
                    {keyword}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeKeyword(keyword)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={clearFilters}>
              Limpiar Filtros
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};