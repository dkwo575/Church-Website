# Church Website

A modern, responsive website and administration portal for a church, built with Next.js, React, Tailwind CSS, and Firebase.

## Features

- **Public Features:** Home, Announcements, Sermons, Service times, Verses, Gallery, and Contact information.
- **Admin Dashboard:** Secure area for managing website content (like Announcements and Sermons) protected by Firebase Authentication.
- **Interactive UI:** Features a comment section, scroll reveal animations, and a fully responsive navigation bar.
- **Dynamic Content:** Real-time data fetching and updates powered by Firebase Firestore.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Frontend library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend & Database:** [Firebase](https://firebase.google.com/) (Firestore, Authentication, Storage)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- `npm` (comes with Node.js)

### Installation

1. Clone the repository and navigate into the project directory (if not already there):

```bash
cd Church-Website
```

2. Install the dependencies:

```bash
npm install
```

3. Configure Firebase:

The project connects to a Firebase backend. The client configuration is located at `lib/firebase.ts`. Ensure your Firebase project is actively running with Firestore, Authentication, and Storage enabled.

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the outcome. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

- `app/`: Next.js App Router pages and layouts. Contains all route pages such as `admin`, `announcements`, `sermons`, `gallery`, `contact`, etc.
- `components/`: Reusable React UI components, including `Navbar`, `HeroBanner`, `AuthGuard`, `CommentSection`, and `ScrollReveal`.
- `lib/`: Utility functions and essential configuration files (e.g., `firebase.ts`).
- `public/`: Static assets like images and fonts.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
