import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, Tag, Mail, MessageSquare, Check, X, Shield, Sparkles } from 'lucide-react';
import { BLOG_POSTS, CLINIC_DATA } from '../data/clinicData';
import { BlogPost } from '../types';

export const HospitalBlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [commentName, setCommentName] = useState('');
  const [commentRole, setCommentRole] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const categories = [
    'All',
    'Healthcare Sector & Policy',
    'Preventive Medicine',
    'Patient Experience',
    'Medical Innovation',
  ];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const handleOpenArticle = (post: BlogPost) => {
    setActiveArticle(post);
    setCommentSubmitted(false);
    setCommentText('');
  };

  const handleSendPerspectiveViaEmail = (post: BlogPost) => {
    const subject = encodeURIComponent(`Health Sector Discussion: ${post.title}`);
    const body = encodeURIComponent(
      `Hello Dantora Health Editorial & Policy Board,\n\nI am writing in response to the article: "${post.title}"\n\nName: ${commentName || 'Healthcare Participant'}\nRole / Background: ${commentRole || 'Patient / Healthcare Professional'}\n\nMy Thoughts & Ideas for Improving the Health Sector:\n${commentText || 'I would like to share feedback on healthcare systemic improvements.'}\n\nKind regards,\n${commentName || ''}`
    );
    window.location.href = `mailto:${CLINIC_DATA.feedbackEmail}?subject=${subject}&body=${body}`;
    setCommentSubmitted(true);
  };

  return (
    <section id="blog" className="relative py-20 bg-stone-50/80 border-t border-stone-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-emerald-900/5 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-900">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Dantora Hospital Health Journal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-stone-900 leading-tight">
              Health, Medicine & <br />
              <span className="font-semibold text-[#1e3d2c]">Bettering the Healthcare Sector</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Thought leadership from our Australian physicians and radiologists exploring patient literacy, shorter waiting times, preventive genomics, and systemic hospital reforms.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500 bg-white border border-stone-200 px-4 py-2.5 rounded-2xl shadow-2xs">
            <Shield className="h-4 w-4 text-emerald-800 flex-shrink-0" />
            <span>Peer-reviewed clinical essays published from Sydney, NSW</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#244836] text-white shadow-xs font-semibold'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col justify-between rounded-3xl bg-white p-6 border border-stone-200/80 shadow-xs hover:shadow-md hover:border-emerald-800/40 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Category & Read Time */}
                <div className="flex items-center justify-between gap-2 text-xs text-stone-500">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-900">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-stone-400" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-medium text-stone-900 group-hover:text-emerald-900 transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Key Takeaways summary pill */}
                <div className="rounded-2xl bg-stone-50 p-3 border border-stone-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 mb-1 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-emerald-700" />
                    <span>Key Sector Reform</span>
                  </div>
                  <p className="text-xs text-stone-600 italic">
                    "{post.keySectorTakeaways[0]}"
                  </p>
                </div>
              </div>

              {/* Author and Action */}
              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-8 w-8 rounded-full object-cover border border-stone-200 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-stone-900 truncate">
                      {post.author.name}
                    </div>
                    <div className="text-[10px] text-stone-500 truncate">
                      {post.publishedDate}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenArticle(post)}
                  className="inline-flex items-center gap-1 rounded-full bg-stone-100 hover:bg-[#244836] hover:text-white px-3.5 py-1.5 text-xs font-semibold text-stone-800 transition-all flex-shrink-0"
                >
                  <span>Read</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Policy & Community Note */}
        <div className="mt-12 rounded-3xl bg-emerald-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 max-w-2xl">
            <h4 className="text-lg sm:text-xl font-medium text-lime-300">
              Contribute to the Australian Health Sector Dialogue
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Are you an Australian clinician, researcher, or patient with insights on improving hospital workflows and patient communication? We welcome guest contributions and policy proposals strictly via email.
            </p>
          </div>
          <a
            href={`mailto:${CLINIC_DATA.feedbackEmail}?subject=Healthcare%20Reform%20Proposal`}
            className="inline-flex items-center gap-2 rounded-full bg-lime-300 hover:bg-lime-400 text-emerald-950 px-5 py-2.5 text-xs font-bold transition-all shadow-xs flex-shrink-0"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Email editorial team</span>
          </a>
        </div>

      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-10 shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-colors"
              aria-label="Close article"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header info */}
            <div className="space-y-3 pb-6 border-b border-stone-100">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-900">
                  {activeArticle.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-stone-400" />
                  {activeArticle.publishedDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-stone-400" />
                  {activeArticle.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-medium text-stone-900 leading-tight">
                {activeArticle.title}
              </h2>

              {/* Author profile */}
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={activeArticle.author.avatar}
                  alt={activeArticle.author.name}
                  className="h-11 w-11 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <div className="text-sm font-semibold text-stone-900">
                    {activeArticle.author.name}
                  </div>
                  <div className="text-xs text-stone-500">
                    {activeArticle.author.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Content body */}
            <div className="py-6 space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx} className="font-normal">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Health Sector Recommendations Box */}
            <div className="my-6 rounded-2xl bg-stone-50 p-5 sm:p-6 border border-stone-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-emerald-800" />
                <span>Sector Reform Takeaways & Action Points</span>
              </h4>
              <ul className="space-y-2.5">
                {activeArticle.keySectorTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                    <Check className="h-4 w-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pb-6 border-b border-stone-100">
              <Tag className="h-3.5 w-3.5 text-stone-400 mr-1" />
              {activeArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-medium text-stone-600"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Discussion & Feedback via Strictly Email */}
            <div className="pt-6 space-y-4">
              <div>
                <h4 className="text-base font-bold text-stone-900">
                  Discuss This Topic With Our Medical Board
                </h4>
                <p className="text-xs text-stone-500">
                  Share your ideas on how to better this aspect of healthcare. Responses are delivered strictly via email to our clinical directorate.
                </p>
              </div>

              {commentSubmitted ? (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-900 flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-700 flex-shrink-0" />
                  <span>Your email draft has been generated for the editorial team. Thank you for contributing to healthcare sector improvement.</span>
                </div>
              ) : (
                <div className="space-y-3 bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name (Optional)"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-emerald-700"
                    />
                    <input
                      type="text"
                      placeholder="Your Role / Affiliation"
                      value={commentRole}
                      onChange={(e) => setCommentRole(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Your suggestions or comments for improving healthcare in this area..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-emerald-700 resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSendPerspectiveViaEmail(activeArticle)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#244836] hover:bg-[#1a3527] text-white px-4 py-2 text-xs font-semibold shadow-2xs"
                    >
                      <Mail className="h-3.5 w-3.5 text-lime-300" />
                      <span>Email perspective to medical board</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
