import { Publication } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Download, Eye, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface PublicationCardProps {
  publication: Publication;
  onExportPDF?: (publication: Publication) => void;
  onExportWord?: (publication: Publication) => void;
}

const PublicationCard = ({ 
  publication, 
  onExportPDF, 
  onExportWord 
}: PublicationCardProps) => {
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    if (!comment.trim()) return;
    setComments(prev => [
      { id: Date.now().toString(), content: comment.trim(), createdAt: new Date(), user: { name: 'Tú' } },
      ...prev
    ]);
    setComment('');
    setShowComment(false);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 hover:text-blue-600 cursor-pointer">
              <Link to={`/publications/${publication.id}`}>
                {publication.title}
              </Link>
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 line-clamp-3">
              {publication.abstract}
            </CardDescription>
          </div>
          <Badge
            variant={publication.status === 'published' ? 'default' : 'secondary'}
            className="ml-2"
          >
            {publication.status === 'published' ? 'Publicado' : 
             publication.status === 'under_review' ? 'En Revisión' : 'Borrador'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Authors */}
          <div className="flex items-center text-sm text-gray-600">
            <User className="h-4 w-4 mr-2" />
            <span>
              {publication.authors.map(author => author.name).join(', ')}
            </span>
          </div>

          {/* Publication details */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{publication.year}</span>
              {publication.journal && (
                <span className="ml-2">• {publication.journal}</span>
              )}
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-1">
            {publication.keywords.slice(0, 4).map((keyword, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
            {publication.keywords.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{publication.keywords.length - 4} más
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" asChild>
                <Link to={`/publications/${publication.id}`}>
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Link>
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowComment(v => !v)}>
                <MessageCircle className="h-4 w-4 mr-1" />
                Comentar
              </Button>
            </div>

            <div className="flex space-x-2">
              {onExportPDF && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onExportPDF(publication)}
                  title="Exportar a PDF"
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
              {onExportWord && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onExportWord(publication)}
                  title="Exportar a Word"
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Modal simple para comentar */}
        {showComment && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-lg w-80">
              <h4 className="font-semibold mb-2">Agregar comentario</h4>
              <textarea
                className="w-full border rounded p-2 mb-2"
                rows={3}
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Escribe tu comentario..."
              />
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="secondary" onClick={() => setShowComment(false)}>Cancelar</Button>
                <Button size="sm" onClick={handleAddComment}>Comentar</Button>
              </div>
            </div>
          </div>
        )}

        {/* Lista de comentarios */}
        {comments.length > 0 && (
          <div className="mt-4 space-y-2">
            {comments.map(c => (
              <div key={c.id} className="bg-gray-100 rounded p-2">
                <span className="font-medium">{c.user.name}:</span> {c.content}
                <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { PublicationCard };