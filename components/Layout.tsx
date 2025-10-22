import React from 'react';
import Head from 'next/head';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "Sarah's Bat Mitzvah - RSVP", 
  description = "Join us for Sarah's Bat Mitzvah celebration! Please RSVP to confirm your attendance.",
  showNavigation = true
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      {showNavigation && <Navigation />}
      {children}
    </>
  );
};

export default Layout;
