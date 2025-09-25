import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePublications } from '@/hooks/usePublications';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Publication } from '@/types';
import { Save, Send, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import translations from '@/lib/translations';

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

export const CreatePublicationForm = () => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const t = translations[lang];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    content: '',
    year: new Date().getFullYear(),
    doi: '',
    journal: '',
    keywords: [] as string[],
    categories: [] as string[],
    status: 'draft' as 'draft' | 'published' | 'under_review',
  });
  const [file, setFile] = useState<File | null>(null);

  const [keywordInput, setKeywordInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.abstract) {
      setError(t.createPubRequiredFields);
      return;
    }
    if (!file) {
      setError(t.createPubFileRequired);
      return;
    }
    if (!user) {
      setError(t.createPubAuthRequired);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('abstract', formData.abstract);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('year', formData.year.toString());
      formDataToSend.append('doi', formData.doi);
      formDataToSend.append('journal', formData.journal);
      formDataToSend.append('keywords', JSON.stringify(formData.keywords));
      formDataToSend.append('categories', JSON.stringify(formData.categories));
      formDataToSend.append('status', formData.status);
      formDataToSend.append('file', file);
      formDataToSend.append('userId', user?.id || '');

      // Llamada directa al backend
      const response = await fetch('http://localhost:3000/publications', {
        method: 'POST',
        body: formDataToSend,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t.createPubError);
      }
      navigate('/publications');
    } catch (err: any) {
      setError(err.message || t.createPubError);
    } finally {
      setLoading(false);
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()],
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword),
    }));
  };

  const addCategory = (category: string) => {
    if (!formData.categories.includes(category)) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, category],
      }));
    }
  };

  const removeCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category),
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.createPubTitle}</h1>
          <p className="text-gray-600">
            {t.createPubSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Adjuntar archivo PDF o Word */}
          <Card>
            <CardHeader>
          <CardTitle>{t.createPubFileTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">{t.createPubFileLabel}</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  required
                  onChange={e => {
                    const selectedFile = e.target.files?.[0] || null;
                    setFile(selectedFile);
                  }}
                />
                {file && <span className="text-green-600">{t.createPubFileSelected}: {file.name}</span>}
              </div>
            </CardContent>
          </Card>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Basic Information */}
          <Card>
            <CardHeader>
          <CardTitle>{t.createPubBasicInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">{t.createPubFieldTitle}</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={t.createPubFieldTitlePh}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="abstract">{t.createPubFieldAbstract}</Label>
                <Textarea
                  id="abstract"
                  value={formData.abstract}
                  onChange={(e) => setFormData(prev => ({ ...prev, abstract: e.target.value }))}
                  placeholder={t.createPubFieldAbstractPh}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">{t.createPubFieldContent}</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder={t.createPubFieldContentPh}
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>

          {/* Publication Details */}
          <Card>
            <CardHeader>
          <CardTitle>{t.createPubDetails}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">{t.createPubFieldYear}</Label>
                  <Input
                    id="year"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doi">{t.createPubFieldDOI}</Label>
                  <Input
                    id="doi"
                    value={formData.doi}
                    onChange={(e) => setFormData(prev => ({ ...prev, doi: e.target.value }))}
                  placeholder={t.createPubFieldDOIPh}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="journal">{t.createPubFieldJournal}</Label>
                <Input
                  id="journal"
                  value={formData.journal}
                  onChange={(e) => setFormData(prev => ({ ...prev, journal: e.target.value }))}
                  placeholder={t.createPubFieldJournalPh}
                />
              </div>
            </CardContent>
          </Card>

          {/* Categories and Keywords */}
          <Card>
            <CardHeader>
          <CardTitle>{t.createPubClassification}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Categories */}
              <div className="space-y-2">
                <Label>{t.createPubCategories}</Label>
                <Select onValueChange={addCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.createPubCategoriesPh} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.categories.map(category => (
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
                <Label>{t.createPubKeywords}</Label>
                <div className="flex gap-2">
                  <Input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder={t.createPubKeywordsPh}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  />
                  <Button type="button" onClick={addKeyword} size="sm">
                    {t.createPubKeywordsAdd}
                  </Button>
                </div>
                {formData.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.keywords.map(keyword => (
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
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate('/publications')}>
              {t.cancel}
            </Button>
            
            <div className="flex gap-2">
              <Button
                type="submit"
                variant="outline"
                disabled={loading}
                onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
              >
                <Save className="h-4 w-4 mr-2" />
                {t.createPubSaveDraft}
              </Button>
              <Button
                type="submit"
                disabled={loading}
                onClick={() => setFormData(prev => ({ ...prev, status: 'published' }))}
              >
                <Send className="h-4 w-4 mr-2" />
                {loading ? t.createPubPublishing : t.createPubPublish}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};