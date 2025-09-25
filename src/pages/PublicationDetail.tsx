import { useParams, Link } from 'react-router-dom';
import { usePublications } from '@/hooks/usePublications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Calendar, User, Download, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { CommentSection } from '@/components/publications/CommentSection';
import { useAuth } from '@/contexts/AuthContext';

export default function PublicationDetail() {
  const { id } = useParams<{ id: string }>();
  const { publications } = usePublications();
  const { user } = useAuth();
  const publication = publications.find(pub => pub.id === id);

  // Comentarios locales (mock, no persistente)
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const handleDownload = (type: 'pdf' | 'word') => {
    if (!publication) return;
    const content = `Título: ${publication.title}\n\nAutores: ${publication.authors.map(a => a.name).join(', ')}\n\nResumen: ${publication.abstract}\n\nContenido: ${publication.content?.replace(/<[^>]+>/g, '')}`;
    const blob = new Blob([
      content
    ], { type: type === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${publication.title.replace(/[^a-zA-Z0-9]/g, '_')}.${type === 'pdf' ? 'pdf' : 'docx'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleAddComment = (comment) => {
    setComments(prev => [
      { ...comment, id: Date.now().toString(), createdAt: new Date(), user },
      ...prev
    ]);
  };

  if (!publication) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Publicación no encontrada</h1>
          <p className="text-gray-600 mb-6">La publicación que buscas no existe o ha sido eliminada.</p>
          <Button asChild>
            <Link to="/publications">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Publicaciones
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/publications">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Link>
          </Button>
        </div>

        {/* Publication Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-4">{publication.title}</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  {publication.abstract}
                </CardDescription>
              </div>
              <Badge
                variant={publication.status === 'published' ? 'default' : 'secondary'}
                className="ml-4"
              >
                {publication.status === 'published' ? 'Publicado' : 
                 publication.status === 'under_review' ? 'En Revisión' : 'Borrador'}
              </Badge>
            </div>

            {/* Authors */}
            <div className="flex items-center space-x-4 pt-4 border-t">
              {publication.authors.map((author, index) => (
                <div key={author.id} className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={author.profileImage} />
                    <AvatarFallback>
                      {author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{author.name}</p>
                    <p className="text-sm text-gray-600">{author.affiliation}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Publication Details */}
            <div className="flex items-center space-x-6 pt-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{publication.year}</span>
              </div>
              {publication.journal && (
                <span>• {publication.journal}</span>
              )}
              {publication.doi && (
                <span>• DOI: {publication.doi}</span>
              )}
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-1 pt-4">
              {publication.keywords.map((keyword, index) => (
                <Badge key={index} variant="outline">
                  {keyword}
                </Badge>
              ))}
            </div>

            {/* Categorías */}
            <div className="flex flex-wrap gap-1 pt-4">
              {publication.categories && publication.categories.map((cat, idx) => (
                <Badge key={idx} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Content */}
        {publication.content && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Contenido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: publication.content }} />
            </CardContent>
          </Card>
        )}

        {/* Archivo adjunto */}
        {publication.fileName && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Archivo Adjunto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{publication.fileName}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => handleDownload('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              Descargar PDF
            </Button>
            <Button variant="outline" onClick={() => handleDownload('word')}>
              <Download className="h-4 w-4 mr-2" />
              Descargar Word
            </Button>
          </div>

          <Button variant="outline" onClick={() => setShowComments(v => !v)}>
            <MessageCircle className="h-4 w-4 mr-2" />
            {showComments ? 'Ocultar comentarios' : 'Comentarios'}
          </Button>
        </div>

        {/* Sección de comentarios */}
        {showComments && user && (
          <CommentSection
            publicationId={publication.id}
            user={user}
            comments={comments}
            onAddComment={handleAddComment}
          />
        )}
      </div>
    </div>
  );
}