# Bat Mitzvah RSVP Project

A beautiful, responsive RSVP application built with Next.js, TypeScript, and TailwindCSS for Ayala's Bat Mitzvah celebration.

## Features

- 🎉 **Beautiful UI/UX**: Modern, responsive design with smooth animations
- 📱 **Mobile-First**: Fully responsive design that works on all devices
- ♿ **Accessible**: Built with accessibility in mind (ARIA labels, keyboard navigation)
- 📝 **Form Validation**: Client-side validation with helpful error messages
- 💾 **Data Persistence**: RSVPs stored in localStorage (demo) - easily replaceable with backend
- 📊 **Admin Panel**: View and manage all RSVP responses
- 🎨 **Custom Styling**: Beautiful gradient backgrounds and custom Tailwind components
- ⚡ **Fast Performance**: Optimized with Next.js and TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bat-mitzvah-rsvp-project
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── components/          # Reusable React components
│   ├── Alert.tsx       # Alert/notification component
│   ├── EventInfoCard.tsx # Event details display
│   ├── RSVPForm.tsx    # Main RSVP form
│   └── ThankYouPage.tsx # Thank you page component
├── pages/              # Next.js pages
│   ├── _app.tsx       # App wrapper
│   ├── _document.tsx  # Document wrapper
│   ├── index.tsx      # Home page
│   ├── admin.tsx      # Admin panel
│   └── thank-you.tsx  # Thank you page
├── styles/            # Global styles
│   └── globals.css    # TailwindCSS imports and custom styles
├── types/             # TypeScript type definitions
│   └── index.ts       # Shared types
└── public/            # Static assets
```

## Customization

### Event Details
Update the event information in `pages/index.tsx`:

```typescript
const eventDetails: EventDetails = {
  name: "Ayala's Bat Mitzvah Celebration",
  date: "Saturday, December 14th, 2024",
  time: "2:00 PM - 8:00 PM",
  location: "Temple Beth El",
  address: "123 Main Street, City, State 12345",
  description: "Join us as we celebrate Sarah's journey..."
};
```

### Styling
The project uses TailwindCSS with custom configuration in `tailwind.config.js`. You can:
- Modify the color scheme in the `colors` section
- Add custom animations in the `keyframes` section
- Update component styles in `styles/globals.css`

### Form Fields
Add or modify form fields in `components/RSVPForm.tsx` and update the `RSVPFormData` type in `types/index.ts`.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Heroku

## Backend Integration

Currently, RSVPs are stored in localStorage for demo purposes. To integrate with a backend:

1. Replace the `handleRSVPSubmit` function in `pages/index.tsx`
2. Add API routes in `pages/api/`
3. Update the admin panel to fetch from your API

Example API integration:
```typescript
const handleRSVPSubmit = async (formData: RSVPFormData) => {
  try {
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      router.push(`/thank-you?name=${encodeURIComponent(formData.fullName)}`);
    }
  } catch (error) {
    setSubmitMessage({ type: 'error', message: 'Failed to submit RSVP' });
  }
};
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please contact the development team or create an issue in the repository.
