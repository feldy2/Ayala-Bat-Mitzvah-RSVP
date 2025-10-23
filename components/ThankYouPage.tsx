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
              תודה שאישרתם ההגעה!
            </h1>
            {guestName && (
              <p className="text-xl text-gray-600 mb-6">
                {guestName},
              </p>
            )}
            <p className="text-lg text-gray-700 leading-relaxed">
              אנו מתרגשים מאוד שתגיעו! 
            </p>
          </div>

          <div className="bg-primary-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-primary-700 mb-4">
              מה עכשיו?
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <Star className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                בקרוב תקבלו מייל עם פרטי האירוע
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  אנא צרו איתנו קשר אם יש לכם שאלות
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-primary-600">
            <Heart className="h-5 w-5" />
            <p className="text-lg font-medium">
              מחכים לראות אותכם!
            </p>
            <Heart className="h-5 w-5" />
          </div>

          <div className="mt-8">
            <button
              onClick={() => window.location.href = '/'}
              className="btn-secondary"
              aria-label="חזרה לדף הבית"
            >
              חזרה לדף הבית
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
