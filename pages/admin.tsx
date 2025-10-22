import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { RSVPFormData } from '@/types';
import { Users, Calendar, Mail, MessageSquare } from 'lucide-react';

interface RSVPData extends RSVPFormData {
  id: string;
  submittedAt: string;
}

const AdminPage: React.FC = () => {
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'yes' | 'no'>('all');

  useEffect(() => {
    // Load RSVPs from localStorage
    const storedRSVPs = localStorage.getItem('rsvps');
    if (storedRSVPs) {
      setRsvps(JSON.parse(storedRSVPs));
    }
    setLoading(false);
  }, []);

  const filteredRSVPs = rsvps.filter(rsvp => {
    if (filter === 'all') return true;
    return rsvp.attending === filter;
  });

  const attendingCount = rsvps.filter(rsvp => rsvp.attending === 'yes').length;
  const totalGuests = rsvps
    .filter(rsvp => rsvp.attending === 'yes')
    .reduce((sum, rsvp) => sum + parseInt(rsvp.guests || '0'), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading RSVPs...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout 
      title="RSVP Admin - Sarah's Bat Mitzvah" 
      description="Admin panel for managing Bat Mitzvah RSVPs"
    >
      <main className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary-700 mb-4">
              RSVP Management
            </h1>
            <p className="text-gray-600">
              View and manage all RSVP responses for Sarah's Bat Mitzvah
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card p-6 text-center">
              <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-primary-700">{attendingCount}</h3>
              <p className="text-gray-600">Attending</p>
            </div>
            <div className="card p-6 text-center">
              <Calendar className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-primary-700">{totalGuests}</h3>
              <p className="text-gray-600">Total Guests</p>
            </div>
            <div className="card p-6 text-center">
              <Mail className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-primary-700">{rsvps.length}</h3>
              <p className="text-gray-600">Total RSVPs</p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All ({rsvps.length})
            </button>
            <button
              onClick={() => setFilter('yes')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'yes'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Attending ({attendingCount})
            </button>
            <button
              onClick={() => setFilter('no')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'no'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Not Attending ({rsvps.length - attendingCount})
            </button>
          </div>

          {/* RSVP List */}
          <div className="space-y-4">
            {filteredRSVPs.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-gray-600">No RSVPs found for the selected filter.</p>
              </div>
            ) : (
              filteredRSVPs.map((rsvp) => (
                <div key={rsvp.id} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {rsvp.fullName}
                      </h3>
                      <p className="text-gray-600">{rsvp.email}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          rsvp.attending === 'yes'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {rsvp.attending === 'yes' ? 'Attending' : 'Not Attending'}
                      </span>
                      {rsvp.attending === 'yes' && rsvp.guests && (
                        <p className="text-sm text-gray-600 mt-1">
                          {rsvp.guests} guest{parseInt(rsvp.guests) > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rsvp.dietaryRestrictions && (
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Dietary Restrictions:</h4>
                        <p className="text-gray-600">{rsvp.dietaryRestrictions}</p>
                      </div>
                    )}
                    {rsvp.message && (
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1 flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message:
                        </h4>
                        <p className="text-gray-600">{rsvp.message}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Submitted: {new Date(rsvp.submittedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.href = '/'}
              className="btn-secondary"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default AdminPage;
