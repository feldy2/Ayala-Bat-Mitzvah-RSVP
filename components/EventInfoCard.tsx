import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { EventDetails } from '@/types';

interface EventInfoCardProps {
  event: EventDetails;
}

const EventInfoCard: React.FC<EventInfoCardProps> = ({ event }) => {
  return (
    <div className="card p-6 mb-8 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-primary-700 mb-2">{event.name}</h2>
        <p className="text-gray-600 text-lg">{event.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg">
          <Calendar className="h-6 w-6 text-primary-600" />
          <div>
            <p className="font-semibold text-gray-800">Date</p>
            <p className="text-gray-600">{event.date}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg">
          <Clock className="h-6 w-6 text-primary-600" />
          <div>
            <p className="font-semibold text-gray-800">Time</p>
            <p className="text-gray-600">{event.time}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg md:col-span-2">
          <MapPin className="h-6 w-6 text-primary-600" />
          <div>
            <p className="font-semibold text-gray-800">Location</p>
            <p className="text-gray-600">{event.location}</p>
            <p className="text-sm text-gray-500">{event.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfoCard;
