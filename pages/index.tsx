import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '@/components/Layout';
import EventInfoCard from '@/components/EventInfoCard';
import RSVPForm from '@/components/RSVPForm';
import Alert from '@/components/Alert';
import { RSVPFormData, EventDetails } from '@/types';

const eventDetails: EventDetails = {
  name: "בת מצווה לאילה רחל מימון",
  date: "????",
  time: "?????",
  location: "???????",
  address: "??????",
  description: "בואו לחגוג איתנו את הגעתה של אילה רחל לגיל מצוות"
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
      <main className="min-h-screen py-8 px-4" style={{backgroundColor: '#fef7f0'}}>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <div 
                  className="w-16 h-16 md:w-20 md:h-20"
                  style={{
                    backgroundColor: '#fef7f0',
                    borderRadius: '50%',
                    padding: '4px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    background: 'linear-gradient(135deg, #fef7f0 0%, #fffbeb 100%)',
                    border: '1px solid #fde68a'
                  }}
                >
                  <Image
                    src="/logo.png"
                    alt="Ayala's Bat Mitzvah Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-primary-700 mb-4 font-display">
              בת מצווה לאילה רחל
              </h1>
            </div>
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
                שאלות או צריכים עזרה?
              </h3>
              <p className="text-gray-500 mb-6 hebrew-text">
                אם יש לכם שאלות לגבי האירוע או זקוקים לעזרה עם אישור ההגעה, 
                אנא אל תהססו לפנות אלינו.
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Contact:</strong> מוריה</p>
                <p><strong>Phone:</strong> 050-8551995</p>
                <p><strong>Email:</strong> feldy2@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
