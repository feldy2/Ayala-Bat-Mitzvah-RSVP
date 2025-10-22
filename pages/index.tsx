import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import EventInfoCard from '@/components/EventInfoCard';
import RSVPForm from '@/components/RSVPForm';
import Alert from '@/components/Alert';
import { RSVPFormData, EventDetails } from '@/types';

const eventDetails: EventDetails = {
  name: "Ayala's Bat Mitzvah Celebration",
  date: "Saturday, December 14th, 2024",
  time: "2:00 PM - 8:00 PM",
  location: "Temple Beth El",
  address: "123 Main Street, City, State 12345",
  description: "Join us as we celebrate Ayala's journey into Jewish adulthood. This special day will include the Bat Mitzvah ceremony, followed by a festive reception with family and friends."
};

const HomePage: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleRSVPSubmit = async (formData: RSVPFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would send this data to your backend
      console.log('RSVP Data:', formData);
      
      // Store in localStorage for demo purposes
      const existingRSVPs = JSON.parse(localStorage.getItem('rsvps') || '[]');
      const newRSVP = {
        ...formData,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
      };
      existingRSVPs.push(newRSVP);
      localStorage.setItem('rsvps', JSON.stringify(existingRSVPs));
      
      // Redirect to thank you page
      router.push(`/thank-you?name=${encodeURIComponent(formData.fullName)}`);
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        message: 'There was an error submitting your RSVP. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout 
      title="Ayala's Bat Mitzvah - RSVP" 
      description="Join us for Ayala's Bat Mitzvah celebration on December 14th, 2024. Please RSVP to confirm your attendance."
    >
      <main className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-primary-700 mb-4 font-display">
                Ayala's Bat Mitzvah
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-gold-600 mb-6 hebrew-title">
                בת מצווה עיילה
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
              Join us in celebrating this beautiful milestone in Ayala's journey. 
              Your presence will make this special day even more meaningful.
            </p>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed hebrew-text">
              הצטרפו אלינו לחגוג את המאורע המיוחד הזה בחייה של עיילה. נוכחותכם תהפוך את היום המיוחד הזה למשמעותי עוד יותר.
            </p>
          </div>

          {/* Event Information */}
          <EventInfoCard event={eventDetails} />

          {/* RSVP Form */}
          <div className="max-w-2xl mx-auto">
            {submitMessage && (
              <div className="mb-6">
                <Alert type={submitMessage.type} message={submitMessage.message} />
              </div>
            )}
            <RSVPForm onSubmit={handleRSVPSubmit} isLoading={isSubmitting} />
          </div>

          {/* Additional Information */}
          <div className="mt-16 text-center">
            <div className="card-elegant p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-primary-700 mb-4 font-display">
                Questions or Need Help?
              </h3>
              <h4 className="text-xl font-semibold text-gold-600 mb-4 hebrew-title">
                שאלות או צריכים עזרה?
              </h4>
              <p className="text-gray-600 mb-6">
                If you have any questions about the event or need assistance with your RSVP, 
                please don't hesitate to reach out to us.
              </p>
              <p className="text-gray-500 mb-6 hebrew-text">
                אם יש לכם שאלות לגבי האירוע או זקוקים לעזרה עם אישור ההגעה, 
                אנא אל תהססו לפנות אלינו.
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Contact:</strong> Ayala's Family</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Email:</strong> ayala.batmitzvah@email.com</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
