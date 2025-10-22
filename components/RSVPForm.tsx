import React, { useState } from 'react';
import { RSVPFormData } from '@/types';
import Alert from './Alert';

interface RSVPFormProps {
  onSubmit: (data: RSVPFormData) => void;
  isLoading?: boolean;
}

const initialFormData: RSVPFormData = {
  fullName: '',
  email: '',
  attending: '',
  guests: '',
  dietaryRestrictions: '',
  message: '',
};

const RSVPForm: React.FC<RSVPFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<RSVPFormData>(initialFormData);
  const [formError, setFormError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formError) setFormError('');
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setFormError('Full name is required.');
      return false;
    }
    if (!formData.email.trim() || !/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setFormError('A valid email address is required.');
      return false;
    }
    if (!formData.attending) {
      setFormError('Please select your attendance.');
      return false;
    }
    if (formData.attending === 'yes' && (!formData.guests || parseInt(formData.guests) < 1)) {
      setFormError('Please specify the number of guests.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handlePressEnterOrSpace = (
    e: React.KeyboardEvent<HTMLElement>,
    callback: () => void
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  };

  return (
    <div className="card p-8 animate-slide-up">
      <header className="mb-8">
        <h2 className="text-3xl font-bold mb-3 text-primary-700">RSVP Form</h2>
        <p className="text-gray-600 text-lg">
          We are so excited to celebrate with you! Please RSVP below:
        </p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit} aria-label="RSVP Form">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleInputChange}
            className="input-field"
            aria-label="Full Name"
            autoComplete="name"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="input-field"
            aria-label="Email address"
            autoComplete="email"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="attending" className="block text-sm font-semibold text-gray-700 mb-2">
            Will you attend? <span className="text-red-500">*</span>
          </label>
          <select
            id="attending"
            name="attending"
            required
            value={formData.attending}
            onChange={handleInputChange}
            className="input-field bg-white"
            aria-label="Attending Option"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="yes">Yes, I will attend</option>
            <option value="no">No, I can't make it</option>
          </select>
        </div>

        {formData.attending === 'yes' && (
          <div>
            <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2">
              How many guests (including you)? <span className="text-red-500">*</span>
            </label>
            <input
              id="guests"
              name="guests"
              type="number"
              min="1"
              max="10"
              value={formData.guests}
              onChange={handleInputChange}
              className="input-field"
              aria-label="Guest Count"
              placeholder="Number of guests"
            />
          </div>
        )}

        <div>
          <label htmlFor="dietaryRestrictions" className="block text-sm font-semibold text-gray-700 mb-2">
            Dietary Restrictions
          </label>
          <input
            id="dietaryRestrictions"
            name="dietaryRestrictions"
            type="text"
            value={formData.dietaryRestrictions}
            onChange={handleInputChange}
            className="input-field"
            aria-label="Dietary Restrictions"
            placeholder="e.g., vegetarian, nut allergy, kosher"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            Message for the family
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="input-field resize-none"
            aria-label="Message for the family"
            rows={4}
            placeholder="Share a special message or well wishes..."
          />
        </div>

        {formError && <Alert type="error" message={formError} />}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full text-lg py-4"
          aria-label="Submit RSVP"
        >
          {isLoading ? 'Submitting...' : 'Submit RSVP'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <div
          tabIndex={0}
          role="link"
          aria-label="Add Bat Mitzvah event to calendar"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 rounded-lg px-4 py-2"
          onClick={() => window.open('https://www.google.com/calendar/render?action=TEMPLATE&text=Sarah%27s+Bat+Mitzvah+Celebration&dates=20241215T140000Z/20241215T200000Z&details=Join+us+for+Sarah%27s+Bat+Mitzvah+celebration!&location=Temple+Beth+El%2C+123+Main+St%2C+City%2C+State', '_blank')}
          onKeyDown={(e) =>
            handlePressEnterOrSpace(e, () =>
              window.open('https://www.google.com/calendar/render?action=TEMPLATE&text=Sarah%27s+Bat+Mitzvah+Celebration&dates=20241215T140000Z/20241215T200000Z&details=Join+us+for+Sarah%27s+Bat+Mitzvah+celebration!&location=Temple+Beth+El%2C+123+Main+St%2C+City%2C+State', '_blank')
            )
          }
        >
          <span>📅</span>
          <span className="underline">Add to Calendar</span>
        </div>
      </div>
    </div>
  );
};

export default RSVPForm;
