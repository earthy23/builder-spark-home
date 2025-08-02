import { Newspaper, Calendar, User, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  featured: boolean;
  image?: string;
}

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'UEC Launcher 2.0 - Major Update Released!',
    excerpt: 'We are excited to announce the release of UEC Launcher 2.0 with improved performance, new features, and better user experience.',
    content: 'Full article content...',
    author: 'UEC Team',
    publishedAt: '2024-01-15T12:00:00Z',
    category: 'Updates',
    featured: true
  },
  {
    id: '2',
    title: 'New Eaglercraft 1.8.8 Server Online',
    excerpt: 'A new high-performance Eaglercraft 1.8.8 server is now available with enhanced features and plugins.',
    content: 'Full article content...',
    author: 'Server Admin',
    publishedAt: '2024-01-14T10:30:00Z',
    category: 'Servers',
    featured: false
  },
  {
    id: '3',
    title: 'Community Event: Building Competition',
    excerpt: 'Join our monthly building competition! Show off your creativity and win amazing prizes.',
    content: 'Full article content...',
    author: 'Community Manager',
    publishedAt: '2024-01-13T16:45:00Z',
    category: 'Events',
    featured: false
  }
];

export default function News() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'updates': return 'bg-blue-600/20 text-blue-400';
      case 'servers': return 'bg-green-600/20 text-green-400';
      case 'events': return 'bg-purple-600/20 text-purple-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-16 z-40 bg-black/90 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Newspaper className="w-6 h-6 text-uec-accent" />
                  UEC News
                </h1>
                <p className="text-gray-400 text-sm">Latest updates and announcements</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Featured Article */}
          {mockNews.find(article => article.featured) && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured</h2>
              {mockNews.filter(article => article.featured).map(article => (
                <div key={article.id} className="card">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                          {article.category}
                        </span>
                        <span className="text-gray-400 text-sm">Featured</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{article.title}</h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                      </div>
                      <button className="button-primary px-6 py-3 flex items-center gap-2">
                        Read More
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-gray-800 rounded-lg flex items-center justify-center">
                      <Newspaper className="w-24 h-24 text-gray-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* All Articles */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockNews.filter(article => !article.featured).map(article => (
                <div key={article.id} className="card hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                  <div className="mb-4 bg-gray-800 rounded-lg h-48 flex items-center justify-center">
                    <Newspaper className="w-16 h-16 text-gray-600" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{article.author}</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  
                  <button className="button-secondary w-full py-2 text-sm">
                    Read Article
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="button-secondary px-8 py-3">
              Load More Articles
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
