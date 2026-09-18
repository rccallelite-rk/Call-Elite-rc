import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle2, X, ArrowRight } from 'lucide-react';
import { SERVICE_CATEGORIES, POPULAR_SERVICES } from '../data/servicesData';

interface SearchBarProps {
  onSelectService?: (serviceName: string, categoryId?: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSelectService }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter categories and popular services
  const filteredCategories = SERVICE_CATEGORIES.filter(cat =>
    cat.name.toLowerCase().includes(query.toLowerCase()) ||
    (cat.subtitle && cat.subtitle.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredPopular = POPULAR_SERVICES.filter(pop =>
    pop.title.toLowerCase().includes(query.toLowerCase()) ||
    pop.description.toLowerCase().includes(query.toLowerCase()) ||
    pop.category.toLowerCase().includes(query.toLowerCase())
  );

  const hasResults = query.trim().length > 0 && (filteredCategories.length > 0 || filteredPopular.length > 0);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigateSlug = (slug: string) => {
    setQuery('');
    setIsOpen(false);
    navigate(`/services/${slug}`);
  };

  const handleSearchSubmit = () => {
    if (!query.trim()) return;
    
    // Find closest match
    const matchCat = SERVICE_CATEGORIES.find(c => 
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      query.toLowerCase().includes(c.name.toLowerCase())
    );
    if (matchCat) {
      handleNavigateSlug(matchCat.slug);
      return;
    }

    const matchPop = POPULAR_SERVICES.find(p =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      query.toLowerCase().includes(p.title.toLowerCase())
    );
    if (matchPop) {
      handleNavigateSlug(matchPop.slug);
      return;
    }

    // Default to first service or general search
    handleNavigateSlug('home-plumbing');
  };

  const quickPills = [
    { label: 'AC Service', slug: 'ac-service' },
    { label: 'Washing Machine', slug: 'washing-machine-repair' },
    { label: 'TV Repair', slug: 'tv-repair' },
    { label: 'Bike Service', slug: 'bike-service' },
    { label: 'Home Painting', slug: 'home-painting' },
    { label: 'Interior Design', slug: 'interior-design' },
  ];

  return (
    <div className="w-full max-w-2xl relative" ref={dropdownRef} id="hero-search-wrapper">
      {/* Search Input Box */}
      <div className="relative flex items-center bg-white rounded-2xl p-2 sm:p-2.5 shadow-lg shadow-slate-900/5 border border-slate-200/90 focus-within:border-[#0A192F] focus-within:ring-4 focus-within:ring-slate-900/5 transition-all duration-200">
        <div className="pl-3.5 pr-2 text-slate-400">
          <Search className="w-5 h-5 text-slate-500" />
        </div>

        <input
          id="service-search-input"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit();
            }
          }}
          placeholder="Search services (e.g. AC, Washing Machine, Painting)..."
          className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none py-1.5"
          autoComplete="off"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 mr-1"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={handleSearchSubmit}
          className="shrink-0 bg-[#0A192F] hover:bg-[#14284b] text-white px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm flex items-center gap-1.5"
        >
          <span>Search</span>
          <ArrowRight className="w-3.5 h-3.5 hidden sm:inline-block" />
        </button>
      </div>

      {/* Live Dropdown Results */}
      {isOpen && (query.trim().length > 0 || hasResults) && (
        <div
          id="search-results-dropdown"
          className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-30 p-2 animate-in fade-in zoom-in-95 duration-150 max-h-80 overflow-y-auto"
        >
          {hasResults ? (
            <div className="space-y-2">
              {filteredCategories.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Service Categories
                  </div>
                  {filteredCategories.slice(0, 5).map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleNavigateSlug(cat.slug)}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#E53935]"></span>
                        <span className="text-sm font-medium text-slate-800 group-hover:text-[#0A192F]">
                          {cat.name}
                        </span>
                        <span className="text-xs text-slate-400 font-normal">
                          {cat.subtitle}
                        </span>
                      </div>
                      <span className="text-xs text-[#E53935] font-semibold flex items-center gap-1">
                        Open Page →
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {filteredPopular.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-t border-slate-100 mt-1">
                    Specific Solutions
                  </div>
                  {filteredPopular.slice(0, 3).map(pop => (
                    <button
                      key={pop.id}
                      type="button"
                      onClick={() => handleNavigateSlug(pop.slug)}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 flex items-center justify-between group transition-colors"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-800 group-hover:text-[#0A192F]">
                          {pop.title}
                        </div>
                        <div className="text-xs text-slate-500">
                          {pop.description} • Starts {pop.startingPrice}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#E53935] bg-red-50 px-2.5 py-1 rounded-md">
                        View Page
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-slate-500 text-sm">
              No exact match for "{query}". Try searching "AC", "Washing Machine", "Painting", or "Interiors".
            </div>
          )}
        </div>
      )}

      {/* Quick Search Chips */}
      <div className="flex items-center gap-1.5 sm:gap-2 mt-3 flex-wrap">
        <span className="text-xs font-medium text-slate-500 mr-1">Popular:</span>
        {quickPills.map((pill) => (
          <button
            key={pill.slug}
            type="button"
            onClick={() => handleNavigateSlug(pill.slug)}
            className="text-xs bg-white hover:bg-slate-100/90 text-slate-700 hover:text-[#0A192F] border border-slate-200/80 px-2.5 py-1 rounded-full font-medium transition-all shadow-2xs hover:border-slate-300"
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Three Trust Points Below Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 mt-6 pt-5 border-t border-slate-200/70 text-slate-700">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A192F]">
          <CheckCircle2 className="w-4 h-4 text-[#E53935] shrink-0" />
          <span>Verified Professionals</span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A192F]">
          <CheckCircle2 className="w-4 h-4 text-[#E53935] shrink-0" />
          <span>Easy Scheduling</span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A192F]">
          <CheckCircle2 className="w-4 h-4 text-[#E53935] shrink-0" />
          <span>Convenient Home Visits</span>
        </div>
      </div>
    </div>
  );
};
