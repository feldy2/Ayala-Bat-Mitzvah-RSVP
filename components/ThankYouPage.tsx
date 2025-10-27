import React from 'react';
import { CheckCircle, Heart, Star } from 'lucide-react';

interface ThankYouPageProps {
  guestName?: string;
  hasEmail?: boolean;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ guestName, hasEmail = false }) => {
  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="card p-12 animate-fade-in">
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-primary-700 mb-4">
              תודה שאישרתם את הגעתכם!
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
              {hasEmail && (
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    בקרוב תקבלו מייל עם פרטי האירוע
                  </p>
                </div>
              )}
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
              מחכים לראותכם!
            </p>
            <Heart className="h-5 w-5" />
          </div>

          <div className="flex flex-col space-y-4 items-center mt-8">
            <button
              onClick={() => window.location.href = '/'}
              className="btn-secondary w-full sm:w-auto"
              aria-label="חזרה לדף הבית"
            >
              חזרה לדף הבית
            </button>
            
            <div
              tabIndex={0}
              role="link"
              aria-label="Add Bat Mitzvah event to calendar"
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 rounded-lg px-4 py-2"
              onClick={() => window.open('https://www.google.com/calendar/render?action=TEMPLATE&text=Ayala%27s+Bat+Mitzvah+Celebration&dates=20241215T140000Z/20241215T200000Z&details=Join+us+for+Ayala%27s+Bat+Mitzvah+celebration!&location=Temple+Beth+El%2C+123+Main+St%2C+City%2C+State', '_blank')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.open('https://www.google.com/calendar/render?action=TEMPLATE&text=Ayala%27s+Bat+Mitzvah+Celebration&dates=20241215T140000Z/20241215T200000Z&details=Join+us+for+Ayala%27s+Bat+Mitzvah+celebration!&location=Temple+Beth+El%2C+123+Main+St%2C+City%2C+State', '_blank');
                }
              }}
            >
              <span>📅</span>
              <span className="underline">הוסף ליומן</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
