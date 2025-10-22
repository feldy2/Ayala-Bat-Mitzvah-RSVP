import React from 'react';
import { CheckCircle, Heart, Star } from 'lucide-react';

interface ThankYouPageProps {
  guestName?: string;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ guestName }) => {
  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="card p-12 animate-fade-in">
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-primary-700 mb-4">
              Thank You for RSVPing!
            </h1>
            {guestName && (
              <p className="text-xl text-gray-600 mb-6">
                Dear {guestName},
              </p>
            )}
            <p className="text-lg text-gray-700 leading-relaxed">
              We are absolutely thrilled that you'll be joining us for Sarah's Bat Mitzvah celebration! 
              Your presence will make this special day even more meaningful.
            </p>
          </div>

          <div className="bg-primary-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-primary-700 mb-4">
              What's Next?
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <Star className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  You'll receive a confirmation email shortly with event details
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Please arrive 15 minutes early for the ceremony
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Contact us if you have any questions or need to make changes
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-primary-600">
            <Heart className="h-5 w-5" />
            <p className="text-lg font-medium">
              We can't wait to celebrate with you!
            </p>
            <Heart className="h-5 w-5" />
          </div>

          <div className="mt-8">
            <button
              onClick={() => window.location.href = '/'}
              className="btn-secondary"
              aria-label="Return to home page"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
