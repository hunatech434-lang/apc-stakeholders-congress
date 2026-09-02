import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, BreadcrumbItem } from '@/lib/seo';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

export default function Breadcrumbs({
  items,
  className = '',
  showHomeIcon = true,
}: BreadcrumbsProps) {
  const fullItems: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    ...items,
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(fullItems);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap py-1 ${className}`}
      >
        <ol className="flex items-center space-x-1.5 sm:space-x-2">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;

            return (
              <li key={item.path} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1 flex-shrink-0" aria-hidden="true" />
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-[320px]"
                  >
                    {index === 0 && showHomeIcon ? (
                      <span className="flex items-center gap-1">
                        <Home className="w-3.5 h-3.5" />
                        <span>Home</span>
                      </span>
                    ) : (
                      item.name
                    )}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="hover:text-brand-700 transition flex items-center gap-1 hover:underline"
                  >
                    {index === 0 && showHomeIcon ? (
                      <>
                        <Home className="w-3.5 h-3.5" />
                        <span>Home</span>
                      </>
                    ) : (
                      item.name
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
