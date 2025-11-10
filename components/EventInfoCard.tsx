import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { EventDetails } from '@/types';

interface EventInfoCardProps {
  event: EventDetails;
}

const EventInfoCard: React.FC<EventInfoCardProps> = ({ event }) => {
  return (
    <div className="card-elegant p-8 mb-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gold-700 mb-4 hebrew-title text-right">פרטי האירוע</h2>
        <p className="text-gray-600 text-lg mb-4 text-right">{event.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-primary-50 to-gold-50 rounded-xl border border-primary-100">
          <Calendar className="h-8 w-8 text-primary-600" />
          <div>
            <p className="font-semibold text-gray-800 mb-1">תאריך</p>
            <div>
              <p className="text-gray-600">{event.date}</p>
              <p className="text-sm text-gray-500">{event.date2}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-gold-50 to-accent-50 rounded-xl border border-gold-100">
          <Clock className="h-8 w-8 text-gold-600" />
          <div>
            <p className="font-semibold text-gray-800 mb-1">שעה</p>
            <div>
              <p className="text-gray-600">{event.time}</p>
              <p className="text-gray-600">{event.time2}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl border border-accent-100 md:col-span-2">
          <MapPin className="h-8 w-8 text-accent-600" />
          <div>
            <p className="font-semibold text-gray-800 mb-1">מיקום</p>
            <p className="text-gray-600">{event.location}</p>
            <p className="text-sm text-gray-500">{event.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfoCard;
