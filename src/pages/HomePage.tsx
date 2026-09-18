import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { ServiceCategories } from '../components/ServiceCategories';
import { PopularServices } from '../components/PopularServices';
import { HowItWorks } from '../components/HowItWorks';
import { BookingPreview } from '../components/BookingPreview';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ServiceTypeCards } from '../components/ServiceTypeCards';
import { InteriorConstructionBanner } from '../components/InteriorConstructionBanner';
import { CustomerTrust } from '../components/CustomerTrust';
import { CTASection } from '../components/CTASection';
import { SEOHead } from '../components/SEOHead';
import { useCMS } from '../context/CMSContext';

interface HomePageProps {
  onOpenBooking: (service?: string, type?: 'appointment' | 'consultation') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();
  const { homepageContent, pages } = useCMS();

  const handleBookingPreviewContinue = (data: { serviceName: string; date: string; slot: string }) => {
    onOpenBooking(data.serviceName, 'appointment');
  };

  const homeSEO = pages['home']?.seo;

  // Map section keys to React nodes
  const renderSection = (sectionId: string) => {
    // Check visibility toggle from CMS
    if (homepageContent.sectionVisibility[sectionId] === false) {
      return null;
    }

    switch (sectionId) {
      case 'hero':
        return (
          <HeroSection
            key="hero"
            onOpenBooking={() => onOpenBooking()}
            onExploreServices={() => navigate('/services')}
            onSelectService={(serviceName) => onOpenBooking(serviceName, 'appointment')}
          />
        );

      case 'categories':
        return (
          <ServiceCategories
            key="categories"
            onExploreAll={() => navigate('/services')}
          />
        );

      case 'popular':
        return <PopularServices key="popular" />;

      case 'how-it-works':
        return <HowItWorks key="how-it-works" />;

      case 'booking-preview':
        return (
          <BookingPreview
            key="booking-preview"
            onContinueBooking={handleBookingPreviewContinue}
          />
        );

      case 'why-choose':
        return <WhyChooseUs key="why-choose" />;

      case 'service-types':
        return (
          <ServiceTypeCards
            key="service-types"
            onBookAppointment={() => onOpenBooking('Appliance Service', 'appointment')}
            onBookConsultation={() => onOpenBooking('Interior Consultation', 'consultation')}
          />
        );

      case 'interior-banner':
        return (
          <InteriorConstructionBanner
            key="interior-banner"
            onExploreInteriors={() => navigate('/services/interior-design')}
            onExploreConstruction={() => navigate('/services/interior-construction')}
          />
        );

      case 'trust':
        return <CustomerTrust key="trust" />;

      case 'cta':
        return (
          <CTASection
            key="cta"
            onBookService={() => onOpenBooking()}
            onContactUs={() => navigate('/contact')}
          />
        );

      default:
        return null;
    }
  };

  // Default fallback order if empty
  const defaultOrder = [
    'hero',
    'categories',
    'popular',
    'how-it-works',
    'booking-preview',
    'why-choose',
    'service-types',
    'interior-banner',
    'trust',
    'cta',
  ];

  const orderToRender = homepageContent.sectionsOrder?.length
    ? homepageContent.sectionsOrder
    : defaultOrder;

  return (
    <>
      <SEOHead
        title={homeSEO?.title || "RC Call Elite | Home Services, Appliance Care & Turnkey Interiors Bangalore"}
        description={homeSEO?.metaDescription || "Bangalore's trusted home service marketplace. AC service, washing machine repair, TV repair, refrigerator service, bike service, painting and interior design."}
        canonicalUrl={homeSEO?.canonicalUrl || "https://calleliterc.com/"}
        breadcrumbs={[
          { name: 'Home', url: 'https://calleliterc.com/' }
        ]}
      />

      {/* RENDER SECTIONS DYNAMICALLY IN ORDER CONTROLLED BY CMS */}
      {orderToRender.map(secId => renderSection(secId))}
    </>
  );
};
