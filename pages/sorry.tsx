import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const SorryPage: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <Layout
      title="מצטערים שלא תוכלו להגיע"
      description="מצטערים שלא תוכלו להגיע לבת המצווה של אילה רחל מימון"
      showNavigation={false}
    >
      <div className="min-h-screen flex items-center justify-center py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card p-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-primary-700 mb-4">
              מצטערים שלא תוכלו להגיע
            </h1>
            {name && (
              <p className="text-xl text-gray-600 mb-6">
                {name as string},
              </p>
            )}
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
            מצטערים שלא תוכלו להצטרף אלינו לחגיגה, נשמח לחגוג יחד באירועים הבאים!
            </p>
            <p className="text-primary-600 text-lg font-medium">
              ניפגש בשמחות 🤍
            </p>

            <div className="mt-10 flex flex-col items-center space-y-4">
              <button
                onClick={() => router.push('/')}
                className="btn-secondary w-full sm:w-auto"
                aria-label="חזרה לדף הבית"
              >
                חזרה לדף הבית
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SorryPage;

