import { testUsePublications } from './testUsePublications';

// Ejecuta la prueba y muestra el resultado en consola
try {
  const result = testUsePublications();
  // eslint-disable-next-line no-console
  console.log('Resultado de testUsePublications:', result);
} catch (e) {
  // eslint-disable-next-line no-console
  console.error('Error en testUsePublications:', e);
}
