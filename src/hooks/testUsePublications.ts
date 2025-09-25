import { usePublications } from './usePublications';

// Prueba interna para verificar que el hook y los datos funcionan correctamente
export function testUsePublications() {
  const { publications, searchPublications } = usePublications();

  // Prueba 1: Debe haber al menos 4 publicaciones
  if (publications.length < 4) {
    throw new Error('No se cargaron todas las publicaciones de prueba');
  }

  // Prueba 2: Buscar por autor
  const mariaPubs = searchPublications({ author: 'María García' });
  if (mariaPubs.length === 0) {
    throw new Error('No se encontraron publicaciones de María García');
  }

  // Prueba 3: Buscar por categoría
  const iaPubs = searchPublications({ categories: ['Inteligencia Artificial'] });
  if (iaPubs.length === 0) {
    throw new Error('No se encontraron publicaciones de Inteligencia Artificial');
  }

  // Prueba 4: Buscar por año
  const yearPubs = searchPublications({ yearFrom: 2024 });
  if (yearPubs.length === 0) {
    throw new Error('No se encontraron publicaciones desde 2024');
  }

  // Si todo pasa
  return 'Todas las pruebas pasaron correctamente';
}
