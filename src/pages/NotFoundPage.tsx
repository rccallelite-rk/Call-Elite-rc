import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, AlertCircle, Phone } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/servicesData';
import { SEOHead } from '../components/SEOHead';
import { AnimatedSection } from '../components/motion';

export const NotFoundPage: React.FC = () => {
  return (
    <AnimatedSection className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-slate-50/50">
      <SEOHead
        title="Page Not Found | RC Call Elite"
        description="The requested page could not be found. Explore our home appliance repair, bike service, plumbing, painting, and interior services in Bangalore."
      />

      <div className="w-16 h-16 rounded-full bg-red-100 text-[#E53935] flex items-center justify-center mb-5 shadow-xs">
        <AlertCircle className="w-8 h-8" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-[#0A192F] mb-3">
        Page Not Found (404)
      </h1>

      <p className="text-slate-600 text-sm sm:text-base max-w-md mb-8">
        We couldn’t find the page or service URL you were looking for. Explore our top home service categories below.
      </p>

      {/* Popular category links */}
      <div className="interactive-card max-w-2xl w-full bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-8">
        <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#E53935] mb-4">
          Popular Services in Bangalore
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-left">
          {SERVICE_CATEGORIES.slice(0, 9).map((cat) => (
            <Link
              key={cat.id}
              to={`/services/${cat.slug}`}
              className="interactive-card p-2.5 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/50 text-xs font-bold text-slate-700 hover:text-[#E53935] transition-all flex items-center justify-between"
            >
              <span>{cat.name}</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="interactive-btn inline-flex items-center gap-2 bg-[#0A192F] hover:bg-[#E53935] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>
        <a
          href="tel:8722713026"
          className="interactive-btn inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 px-5 py-3 rounded-xl font-bold text-sm transition-colors"
        >
          <Phone className="w-4 h-4 text-emerald-600" />
          <span>Call 8722713026</span>
        </a>
      </div>
    </AnimatedSection>
  );
};
