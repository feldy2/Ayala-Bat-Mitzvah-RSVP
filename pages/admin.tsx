import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { RSVPFormData } from '@/types';
import { Users, Calendar, Mail, MessageSquare, Lock, Download } from 'lucide-react';

interface RSVPData extends RSVPFormData {
  id: string;
  submittedAt: string;
}

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'yes' | 'no'>('all');

  // Admin password - in a real app, this would be stored securely on the server
  const ADMIN_PASSWORD = 'feldy6350';

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    
    // Load RSVPs from localStorage
    const storedRSVPs = localStorage.getItem('rsvps');
    if (storedRSVPs) {
      setRsvps(JSON.parse(storedRSVPs));
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
    } else {
      setLoginError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    setPassword('');
  };

  const exportToExcel = () => {
    // Load SheetJS library dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    script.onload = () => {
      // Prepare data for export
      const exportData = filteredRSVPs.map(rsvp => ({
        'Full Name': rsvp.fullName,
        'Phone': rsvp.phone,
        'Email': rsvp.email || 'N/A',
        'Attending': rsvp.attending === 'yes' ? 'Yes' : 'No',
        'Number of Guests': rsvp.attending === 'yes' ? rsvp.guests : '0',
        'Dietary Restrictions': rsvp.dietaryRestrictions || 'None',
        'Message': rsvp.message || 'None',
        'Submitted Date': new Date(rsvp.submittedAt).toLocaleString()
      }));

      // Create workbook and worksheet
      const wb = (window as any).XLSX.utils.book_new();
      const ws = (window as any).XLSX.utils.json_to_sheet(exportData);
      
      // Add worksheet to workbook
      (window as any).XLSX.utils.book_append_sheet(wb, ws, 'Guest List');
      
      // Generate filename with current date
      const today = new Date().toISOString().split('T')[0];
      const filename = `Ayala_Bat_Mitzvah_Guest_List_${today}.xlsx`;
      
      // Save file
      (window as any).XLSX.writeFile(wb, filename);
    };
    document.head.appendChild(script);
  };

  const exportToCSV = () => {
    // Prepare CSV data
    const headers = ['Full Name', 'Phone', 'Email', 'Attending', 'Number of Guests', 'Dietary Restrictions', 'Message', 'Submitted Date'];
    const csvData = filteredRSVPs.map(rsvp => [
      rsvp.fullName,
      rsvp.phone,
      rsvp.email || 'N/A',
      rsvp.attending === 'yes' ? 'Yes' : 'No',
      rsvp.attending === 'yes' ? rsvp.guests : '0',
      rsvp.dietaryRestrictions || 'None',
      rsvp.message || 'None',
      new Date(rsvp.submittedAt).toLocaleString()
    ]);

    // Create CSV content
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    const today = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `Ayala_Bat_Mitzvah_Guest_List_${today}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <Layout 
        title="Admin Login - Ayala's Bat Mitzvah" 
        description="Admin login for Bat Mitzvah RSVP management"
      >
        <main className="min-h-screen flex items-center justify-center py-8 px-4">
          <div className="max-w-md w-full">
            <div className="card-elegant p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-primary-600" />
                </div>
                <h1 className="text-3xl font-bold text-primary-700 mb-2">
                  Admin Access
                </h1>
                <p className="text-gray-600">
                  Enter password to access RSVP management
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="Enter admin password"
                    required
                    autoFocus
                  />
                </div>

                {loginError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  Login
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => window.location.href = '/'}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  ← Back to Home
                </button>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout 
      title="RSVP Admin - Ayala's Bat Mitzvah" 
      description="Admin panel for managing Bat Mitzvah RSVPs"
    >
      <main className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-3">
                <button
                  onClick={exportToExcel}
                  className="btn-gold text-sm flex items-center space-x-2"
                  disabled={filteredRSVPs.length === 0}
                >
                  <Download className="h-4 w-4" />
                  <span>Export Excel</span>
                </button>
                <button
                  onClick={exportToCSV}
                  className="btn-secondary text-sm flex items-center space-x-2"
                  disabled={filteredRSVPs.length === 0}
                >
                  <Download className="h-4 w-4" />
                  <span>Export CSV</span>
                </button>
              </div>
              <h1 className="text-4xl font-bold text-primary-700">
                RSVP Management
              </h1>
              <button
                onClick={handleLogout}
                className="btn-secondary text-sm"
              >
                Logout
              </button>
            </div>
            <p className="text-gray-600">
              View and manage all RSVP responses for Ayala's Bat Mitzvah
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
