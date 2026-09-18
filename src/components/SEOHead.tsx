import React, { useEffect } from 'react';
import { ServiceDetail } from '../types';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  service?: ServiceDetail;
  breadcrumbs?: { name: string; url: string }[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://calleliterc.com/rc-call-elite-logo.svg',
  service,
  breadcrumbs = [],
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to update or create meta tags
    const setMeta = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set link tags (e.g. canonical)
    const setLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Standard Meta Tags
    setMeta('name', 'description', description);
    const resolvedCanonical = canonicalUrl || window.location.href;
    setLink('canonical', resolvedCanonical);

    // 3. OpenGraph Tags
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', resolvedCanonical);
    setMeta('property', 'og:type', service ? 'article' : 'website');
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:site_name', 'RC Call Elite');

    // 4. Twitter Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // 5. Inject / Update Schema.org JSON-LD structured data
    const scriptId = 'schema-structured-data';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const jsonLdGraph: any[] = [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://calleliterc.com/#localbusiness',
        'name': 'RC Call Elite',
        'image': 'https://calleliterc.com/rc-call-elite-logo.svg',
        'telephone': '+918722713026',
        'email': 'rccallelite@gmail.com',
        'url': 'https://calleliterc.com',
        'priceRange': '₹₹',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Bangalore',
          'addressRegion': 'Karnataka',
          'addressCountry': 'IN',
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 12.9716,
          'longitude': 77.5946,
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            'opens': '08:00',
            'closes': '21:00',
          },
        ],
      },
    ];

    // If Breadcrumbs are provided, add BreadcrumbList schema
    if (breadcrumbs.length > 0) {
      jsonLdGraph.push({
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': crumb.name,
          'item': crumb.url,
        })),
      });
    }

    // If Service detail is provided, add Service schema
    if (service) {
      const serviceSchema: any = {
        '@type': 'Service',
        'name': service.name,
        'description': service.shortDescription,
        'serviceType': service.category,
        'provider': {
          '@id': 'https://calleliterc.com/#localbusiness',
        },
        'areaServed': service.serviceAreas.map((area) => ({
          '@type': 'City',
          'name': `${area}, Bangalore`,
        })),
      };

      if (service.startingPrice && service.startingPrice !== 'Free Site Visit') {
        const numericPrice = service.startingPrice.replace(/[^0-9]/g, '');
        if (numericPrice) {
          serviceSchema.offers = {
            '@type': 'Offer',
            'price': numericPrice,
            'priceCurrency': 'INR',
            'description': service.pricingDisclaimer,
          };
        }
      }

      if (service.rating && service.reviewsCount) {
        serviceSchema.aggregateRating = {
          '@type': 'AggregateRating',
          'ratingValue': service.rating,
          'reviewCount': service.reviewsCount,
          'bestRating': '5',
          'worstRating': '1',
        };
      }

      jsonLdGraph.push(serviceSchema);

      // If FAQ content exists on this visible page, add FAQPage schema matching visible content
      if (service.faqs && service.faqs.length > 0) {
        jsonLdGraph.push({
          '@type': 'FAQPage',
          'mainEntity': service.faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer,
            },
          })),
        });
      }
    }

    scriptTag.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': jsonLdGraph,
    });

    return () => {
      // Cleanup on unmount or next change
    };
  }, [title, description, canonicalUrl, ogImage, service, breadcrumbs]);

  return null;
};
