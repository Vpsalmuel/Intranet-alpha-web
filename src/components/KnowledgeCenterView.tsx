import React, { useState, useMemo } from 'react';
import { KnowledgeArticle } from '../types';
import { BookOpen, Search, Filter, Clock, Eye, Tag, ChevronRight, FileText } from 'lucide-react';

interface KnowledgeCenterViewProps {
  articles: KnowledgeArticle[];
}

export default function KnowledgeCenterView({ articles }: KnowledgeCenterViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);

  const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];

  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      const matchesSearch = 
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        a.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [articles, searchTerm, selectedCategory]);

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in font-sans pb-12">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="text-sm font-bold text-slate-500 hover:text-brand-blue flex items-center gap-1 transition-colors"
        >
          ← Back to Knowledge Center
        </button>
        
        <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2.5 py-1 bg-brand-blue/10 text-brand-blue border border-brand-blue/20 text-xs font-bold rounded-md">
              {selectedArticle.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{selectedArticle.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 mb-8 pb-8 border-b border-slate-100">
            <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> By {selectedArticle.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Updated {selectedArticle.lastUpdated}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {selectedArticle.views} views</span>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-6">{selectedArticle.excerpt}</p>
            {/* Split content by newline to create basic paragraphs for mock data */}
            {selectedArticle.content.split('\\n').map((paragraph, idx) => (
              <p key={idx} className="text-slate-700 leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>
          
          <div className="mt-12 pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {selectedArticle.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-slate-400" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in font-sans pb-12">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-brand-orange" />
              Knowledge Center
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl">
              Your company Wikipedia. Find guides, SOPs, policies, and answers to frequently asked questions.
            </p>
          </div>
          <div className="w-full md:w-80 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search knowledge base..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-2">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Filter className="w-4 h-4 text-brand-blue" /> Browse Categories
          </h3>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-brand-blue text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map(article => (
            <div 
              key={article.id} 
              onClick={() => setSelectedArticle(article)}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-blue/40 hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                  <Eye className="w-3 h-3" /> {article.views}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-brand-blue transition-colors leading-tight">
                {article.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-600">
                    {article.author.charAt(0)}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{article.author}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-blue transition-colors" />
              </div>
            </div>
          ))}
          {filteredArticles.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white border border-slate-200 rounded-xl">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900">No articles found</h3>
              <p className="text-slate-500">Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
