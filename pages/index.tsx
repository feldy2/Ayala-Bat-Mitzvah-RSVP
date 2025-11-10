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
  date: "ה' בכסלו תשפ'ו",
  date2: "26.11.2025",
  time: "חברות 18:00",
  time2: "משפחה 19:00",
  location: "בית ספר יבנה",
  address: " אליעזר אלתר 30, חיפה",
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
      
      // Send email if email is provided
      if (formData.email) {
        try {
          console.log('Attempting to send email to:', formData.email);
          const emailResponse = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: formData.email,
              name: formData.fullName,
              attending: formData.attending,
              guests: formData.guests
            })
          });
          
          const emailResult = await emailResponse.json();
          console.log('Email response:', emailResult);
          
          if (!emailResponse.ok) {
            console.error('Email failed:', emailResult.message);
          }
        } catch (emailError) {
          console.error('Error sending email:', emailError);
          // Don't block the success flow if email fails
        }
      }
      
      // Redirect based on attendance
      const params = new URLSearchParams({
        name: formData.fullName,
        hasEmail: formData.email ? 'true' : 'false'
      });

      const targetPath = formData.attending === 'yes'
        ? `/thank-you?${params.toString()}`
        : `/sorry?${params.toString()}`;

      router.push(targetPath);
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
              <div className="flex justify-center mb-4">
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 relative"
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
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 70px, 100px"
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
              <div className="space-y-6 text-gray-700 md:flex md:space-y-0 md:space-x-8 md:justify-center">
                {/* First contact */}
                <div className="space-y-2">
                  <p><strong>איש קשר:</strong> מוריה</p>
                  <p><strong>טלפון:</strong> 050-8551995</p>
                  <p><strong>אימייל:</strong> feldy2@gmail.com</p>
                </div>
                {/* Add more space between the two contacts */}
                <div className="h-8 md:h-0 md:w-16"></div>
                {/* Second contact */}
                <div className="space-y-2">
                  <p><strong>איש קשר:</strong> עדי</p>
                  <p><strong>טלפון:</strong> 054-5991336</p>
                  <p><strong>אימייל:</strong> mywitnes@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
