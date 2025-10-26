import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import ThankYouPage from '@/components/ThankYouPage';

const ThankYou: React.FC = () => {
  const router = useRouter();
  const { name, hasEmail } = router.query;

  return (
    <Layout 
      title="תודה רבה שאישרתם את ההגעה" 
      description="תודה רבה שאישרתם את ההגעה לבת מצווה של אילה רחל"
      showNavigation={false}
    >
      <ThankYouPage 
        guestName={name as string} 
        hasEmail={hasEmail === 'true'}
      />
    </Layout>
  );
};

export default ThankYou;
