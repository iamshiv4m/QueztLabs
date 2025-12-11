# Quezt Labs - Premium Technology Studio Landing Page

A premium landing page for a technology studio built with Next.js 15, TypeScript, TailwindCSS, and Framer Motion.

## Features

- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **Performance Focused**: SSG/ISR, next/image optimization, lazy loading
- **Accessible**: Semantic HTML, ARIA attributes, keyboard navigation
- **Responsive**: Mobile-first design, works on all devices
- **Animated**: Subtle Framer Motion animations throughout

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Fonts**: Inter, Playfair Display

## Project Structure

\`\`\`
├── app/
│ ├── api/
│ │ └── contact/ # Contact form API route
│ ├── blog/
│ │ ├── [slug]/ # Dynamic blog post pages
│ │ └── page.tsx # Blog index
│ ├── case-studies/
│ │ ├── [slug]/ # Dynamic case study pages
│ │ └── page.tsx # Case studies index
│ ├── globals.css # Theme configuration
│ ├── layout.tsx # Root layout with metadata
│ ├── page.tsx # Homepage
│ ├── sitemap.ts # Dynamic sitemap generation
│ └── robots.ts # Robots.txt configuration
├── components/
│ ├── layout/ # Header, Footer
│ ├── sections/ # Hero, Services, Portfolio, etc.
│ ├── seo/ # JSON-LD structured data
│ └── ui/ # Reusable UI components
├── lib/
│ └── data.ts # Seed content and configuration
└── public/ # Static assets
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a \`.env.local\` file with:

\`\`\`env

# Optional: Analytics

NEXT_PUBLIC_GA_ID=your-ga-id

# Optional: Contact form integration

RESEND_API_KEY=your-resend-key
\`\`\`

## Customization

### Branding & Theme

1. **Colors**: Edit \`app/globals.css\` - modify the CSS custom properties in \`:root\` and \`.dark\`
2. **Fonts**: Update \`app/layout.tsx\` - change the font imports and variables
3. **Logo**: Replace the logo in \`components/layout/header.tsx\` and \`components/layout/footer.tsx\`

### Content

All content is centralized in \`lib/data.ts\`:

- \`company\`: Company info, social links
- \`navigation\`: Menu items
- \`services\`: Service offerings
- \`caseStudies\`: Portfolio items
- \`blogPosts\`: Blog content
- \`testimonials\`: Client quotes
- \`pricingTiers\`: Pricing options
- \`faqs\`: FAQ content

### Adding New Pages

1. Create a new file in \`app/your-page/page.tsx\`
2. Import and use existing components from \`components/\`
3. Add navigation link in \`lib/data.ts\`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy!

### Other Platforms

\`\`\`bash
npm run build
npm run start
\`\`\`

## Performance

This template is optimized for Lighthouse scores:

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## License

MIT License - feel free to use for personal and commercial projects.

## Support

For questions or issues, please open a GitHub issue.
\`\`\`
