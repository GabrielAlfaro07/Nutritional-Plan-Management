# Nutritional Plan Management System
ITCR - IC4810 - Project

A web application designed to help nutritionists manage their clients' nutritional plans efficiently. The app allows the management of patient profiles, including personal information, health objectives, and appointment tracking. It integrates Firebase for authentication and data storage, with plans to move to Auth0 for authentication.

## Features

- **Dashboard**: View and manage all patients from a single page.
- **Patient Profiles**: Create, edit, and delete patient profiles with personal details, nutrition goals, and health metrics.
- **Appointment Tracking**: Keep track of patients' next appointments.
- **Authentication**: Secure login and registration using Firebase (moving to Auth0).
- **Responsive Design**: Optimized for both desktop and mobile use.

## Tech Stack

- **Frontend**: React.js with TypeScript, TailwindCSS for styling
- **Backend**: Firebase for authentication and Firestore for data storage
- **Deployment**: Deployed via Vercel

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)
- **Firebase CLI** (for local testing): Install using `npm install -g firebase-tools`

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   cd your-repository-name
   ```
   
2. **Install dependencies**: Install the required Node.js packages using npm or yarn
   ```bash
   npm install
   # or
   yarn install
   ```
   
3. **Set Up Firebase**: Ensure you have Firebase credentials set up. Create a .env file in the root directory and add your Firebase environment variables:
   ```bash
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-firebase-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
   ```
   
4. **Start the Development Server**: Once the environment variables are set, run the following command to start the development server:
   ```bash
   npm run dev
   ```
   
### Deployment
The app can be deployed on Vercel:
- Sign in to Vercel and connect your GitHub repository.
- Configure environment variables in Vercel's project settings using the same variables as in your .env file.
- Deploy the project directly from Vercel.

### Usage
- Dashboard: View patient summaries and access detailed profiles.
- Add/Edit Patient: Create or modify patient profiles with name, birthdate, contact info, objectives, and upcoming appointments.
- Authentication: Log in and out using Firebase authentication.

### Firebase Setup
Make sure to set your Authorized Domains in Firebase:
1. Go to your Firebase project.
2. Navigate to Authentication > Sign-in Method > Authorized Domains.
3. Add your deployment domain (e.g., your-app-name.vercel.app).
