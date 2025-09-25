// Solo para pruebas internas
import { testUsePublications } from './testUsePublications';
import { useState, useEffect } from 'react';
import { Publication, SearchFilters } from '@/types';

// Mock data for publications
const mockPublications: Publication[] = [
  {
    id: '1',
    userId: '1',
    title: 'Machine Learning Applications in Healthcare: A Comprehensive Review',
    abstract: 'Este artículo presenta una revisión exhaustiva de las aplicaciones de machine learning en el sector sanitario, analizando las principales técnicas utilizadas y sus impactos en el diagnóstico médico.',
    content: '<h2>Introducción</h2><p>El machine learning ha revolucionado múltiples sectores, siendo la medicina uno de los más beneficiados...</p>',
    authors: [{
      id: '1',
      name: 'Dr. María García',
      email: 'maria.garcia@universidad.edu',
      affiliation: 'Universidad Nacional',
      role: 'autor' as const,
      createdAt: new Date(),
    }],
    year: 2023,
    doi: '10.1234/example.2023.001',
    journal: 'Journal of Medical AI',
    keywords: ['machine learning', 'healthcare', 'artificial intelligence', 'diagnosis'],
    categories: ['Inteligencia Artificial', 'Medicina'],
    status: 'published' as const,
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-06-15'),
  },
  {
    id: '2',
    userId: '2',
    title: 'Sustainable Software Development: Best Practices and Methodologies',
    abstract: 'Un análisis de las mejores prácticas para el desarrollo de software sostenible, incluyendo metodologías ágiles y técnicas de green computing.',
    content: '<h2>Metodologías Sostenibles</h2><p>El desarrollo sostenible de software requiere un enfoque holístico...</p>',
    authors: [{
      id: '2',
      name: 'Dr. Carlos Rodríguez',
      email: 'carlos.rodriguez@tech.edu',
      affiliation: 'Instituto Tecnológico',
      role: 'autor' as const,
      createdAt: new Date(),
    }],
    year: 2024,
    journal: 'Software Engineering Quarterly',
    keywords: ['sustainable development', 'software engineering', 'agile', 'green computing'],
    categories: ['Ingeniería de Software', 'Sostenibilidad'],
    status: 'published' as const,
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: '3',
    userId: '1',
    title: 'Redes Neuronales y su Impacto en la Industria',
    abstract: 'Exploración de cómo las redes neuronales están transformando procesos industriales y automatización.',
    content: '<h2>Redes Neuronales</h2><p>Las redes neuronales han permitido avances significativos en la industria...</p>',
    authors: [{
      id: '1',
      name: 'Dr. María García',
      email: 'maria.garcia@universidad.edu',
      affiliation: 'Universidad Nacional',
      role: 'autor' as const,
      createdAt: new Date(),
    }],
    year: 2025,
    journal: 'Revista de Innovación Industrial',
    keywords: ['redes neuronales', 'industria', 'automatización'],
    categories: ['Inteligencia Artificial', 'Industria'],
    status: 'published' as const,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-10'),
  },
  {
    id: '4',
    userId: '3',
    title: 'Blockchain en la Educación Superior',
    abstract: 'Un estudio sobre la aplicación de blockchain para la certificación académica y la gestión de credenciales.',
    content: '<h2>Blockchain y Educación</h2><p>El blockchain ofrece nuevas oportunidades para la gestión segura de credenciales...</p>',
    authors: [{
      id: '3',
      name: 'Dra. Laura Pérez',
      email: 'laura.perez@edu.org',
      affiliation: 'Universidad Digital',
      role: 'autor' as const,
      createdAt: new Date(),
    }],
    year: 2025,
    journal: 'Journal of EdTech',
    keywords: ['blockchain', 'educación', 'certificación'],
    categories: ['Tecnología Educativa', 'Blockchain'],
    status: 'published' as const,
    createdAt: new Date('2025-05-05'),
    updatedAt: new Date('2025-05-05'),
  },
];

export const usePublications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/publications')
            .then(res => res.json())
            .then(publications => {
                if (Array.isArray(publications) && publications.length > 0) {
                    setPublications(publications);
                } else {
                    setPublications(mockPublications);
                }
                setLoading(false);
            })
            .catch(() => {
                setPublications(mockPublications);
                setLoading(false);
            });
    }, []);

  const searchPublications = (filters: SearchFilters): Publication[] => {
    return publications.filter(pub => {
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const matchesTitle = pub.title.toLowerCase().includes(query);
        const matchesAbstract = pub.abstract.toLowerCase().includes(query);
        const matchesKeywords = pub.keywords.some(keyword => 
          keyword.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesAbstract && !matchesKeywords) {
          return false;
        }
      }

      if (filters.author) {
        const authorMatch = pub.authors.some(author =>
          author.name.toLowerCase().includes(filters.author!.toLowerCase())
        );
        if (!authorMatch) return false;
      }

      if (filters.yearFrom && pub.year < filters.yearFrom) return false;
      if (filters.yearTo && pub.year > filters.yearTo) return false;

      if (filters.categories && filters.categories.length > 0) {
        const categoryMatch = filters.categories.some(cat =>
          pub.categories.includes(cat)
        );
        if (!categoryMatch) return false;
      }

      return true;
    });
  };

  const addPublication = (publication: Omit<Publication, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPublication: Publication = {
      ...publication,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setPublications(prev => [newPublication, ...prev]);
    return newPublication;
  };

  const updatePublication = (id: string, updates: Partial<Publication>) => {
    setPublications(prev =>
      prev.map(pub =>
        pub.id === id
          ? { ...pub, ...updates, updatedAt: new Date() }
          : pub
      )
    );
  };

  const deletePublication = (id: string) => {
    setPublications(prev => prev.filter(pub => pub.id !== id));
  };

  return {
    publications,
    loading,
    error,
    searchPublications,
    addPublication,
    updatePublication,
    deletePublication,
  };
};