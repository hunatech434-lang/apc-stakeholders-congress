import React from 'react';

interface JsonLdProps {
  data: Record<string, any> | Array<Record<string, any>>;
}

/**
 * Renders safe JSON-LD structured data with XSS escaping.
 */
export default function JsonLd({ data }: JsonLdProps) {
  // Serialize and sanitize JSON to prevent script injection
  const serialized = JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
