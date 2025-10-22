import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import ThankYouPage from '@/components/ThankYouPage';

const ThankYou: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <Layout 
      title="Thank You - Sarah's Bat Mitzvah" 
      description="Thank you for RSVPing to Sarah's Bat Mitzvah celebration!"
      showNavigation={false}
    >
      <ThankYouPage guestName={name as string} />
    </Layout>
  );
};

export default ThankYou;
