# Electrocom Portfolio Website

A modern, responsive portfolio website for Electrocom built with Next.js and Tailwind CSS.

## Features

- **Hero Section** with compelling headline and CTAs
- **About Us** section with company information, vision, and mission
- **Our Expertise** showcasing 4 main service categories
- **How We Work** process-driven approach
- **Past Projects** portfolio showcase
- **Industries We Serve** section
- **Contact Us** with contact information and social links
- **MSME Certified** badge in header
- Fully responsive design
- Modern UI with smooth transitions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with Header and Footer
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Navigation header with MSME badge
│   ├── Hero.tsx         # Hero section
│   ├── AboutUs.tsx      # About section
│   ├── OurExpertise.tsx # Services section
│   ├── HowWeWork.tsx    # Process section
│   ├── PastProjects.tsx # Projects showcase
│   ├── IndustriesWeServe.tsx # Industries section
│   ├── ContactUs.tsx    # Contact section
│   └── Footer.tsx       # Footer component
└── package.json
```

## Customization

- Update contact information in `components/ContactUs.tsx`
- Modify company details in `components/AboutUs.tsx`
- Add/remove projects in `components/PastProjects.tsx`
- Update social media links in `components/ContactUs.tsx` and `components/Footer.tsx`

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

