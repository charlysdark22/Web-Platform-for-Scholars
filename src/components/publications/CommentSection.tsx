import { useState } from 'react';
import { Comment, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CommentSectionProps {
  publicationId: string;
  user: User;
  comments: Comment[];
  onAddComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
}

export const CommentSection = ({ publicationId, user, comments, onAddComment }: CommentSectionProps) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAddComment({
      publicationId,
      userId: user.id,
      user,
      content: content.trim(),
    });
    setContent('');
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Comentarios</h3>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <Input
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Escribe un comentario..."
        />
        <Button type="submit">Comentar</Button>
      </form>
      <div className="space-y-2">
        {comments.length === 0 && <p className="text-gray-500 text-sm">No hay comentarios aún.</p>}
        {comments.map(comment => (
          <div key={comment.id} className="bg-gray-100 rounded p-2">
            <span className="font-medium">{comment.user.name}:</span> {comment.content}
            <div className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
