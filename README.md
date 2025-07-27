# 10 Minute School Product Page Assessment

This project is a Next.js application designed to display a product page for the "IELTS Course by Munzereen Shahid," fetching data from a public API. It focuses on demonstrating key frontend development practices including responsive design, internationalization, server-side rendering, and efficient state management.

## Features

*   **Dynamic Content:** Fetches product details (title, description, sections, media, checklist, CTA text) from the provided API endpoint.
*   **Internationalization (i18n):** Supports language switching between English (`en`) and Bengali (`bn`) via a URL query parameter (`?lang=en` or `?lang=bn`).
*   **Server-Side Rendering (SSR):** All data fetching for the main product page (`app/page.tsx`) occurs on the server, ensuring fast initial load times and SEO friendliness.
*   **Incremental Static Regeneration (ISR):** Configured to revalidate data every 60 seconds, balancing static performance with fresh content.
*   **Responsive Design:** Utilizes Tailwind CSS to provide an adaptive layout for various screen sizes (desktop, tablet, mobile).
*   **SEO Optimization:** Dynamically generates page metadata (title, description, keywords, Open Graph images) based on API data.
*   **Modular Components:** The UI is broken down into reusable React components (e.g., `Header`, `Hero`, `InstructorSection`, `VideoPlayer`, `CTASection`, `ChecklistSection`, `FeaturesSection`, `PointersSection`, `AboutSection`, `CourseExclusiveSection`, `Footer`).
*   **YouTube Video Player:** Integrates a video player for the product trailer, handling thumbnails and embedding.
*   **Fixed Price:** Displays a hardcoded price of `1000` as per requirements.

## Technologies Used

*   **Next.js 14+ (App Router):** React framework for building server-rendered React applications.
*   **React:** JavaScript library for building user interfaces.
*   **TypeScript:** Superset of JavaScript that adds static typing.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **Lucide React:** A collection of beautiful and customizable open-source icons.

## Project Structure

\`\`\`
.
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx         # Root layout for the application
│   └── page.tsx           # Main product page, handles data fetching and section rendering
├── components/
│   ├── AboutSection.tsx
│   ├── ChecklistSection.tsx
│   ├── CourseExclusiveSection.tsx
│   ├── CTASection.tsx
│   ├── CTASectionMobile.tsx
│   ├── FeaturesSection.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── InstructorSection.tsx
│   ├── MobileHeroContent.tsx
│   ├── PointersSection.tsx
│   └── VideoPlayer.tsx
├── lib/
│   ├── api.ts             # Data fetching logic for the product API
│   └── utils.ts           # Utility functions (e.g., `cn` for Tailwind class merging)
├── types/
│   └── product.ts         # TypeScript interfaces for API response data
├── Dockerfile             # Docker configuration for containerization
└── README.md              # This file
\`\`\`

## Getting Started

### Prerequisites

*   Node.js (v18.x or later)
*   npm or yarn

### Installation

1.  Clone the repository:
    \`\`\`bash
    git clone <your-repo-url>
    cd <your-repo-name>
    \`\`\`
2.  Install dependencies:
    \`\`\`bash
    npm install
    # or
    yarn install
    \`\`\`

### Running the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

To test localization, append `?lang=bn` to the URL: [http://localhost:3000?lang=bn](http://localhost:3000?lang=bn)

### Building for Production

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

This command builds the application for production to the `.next` folder.

### Running in Production Mode

\`\`\`bash
npm run start
# or
yarn start
\`\`\`

This will start the Next.js production server.

### Docker

A `Dockerfile` is included for containerizing the application.

1.  Build the Docker image:
    \`\`\`bash
    docker build -t 10ms-product-page .
    \`\`\`
2.  Run the Docker container:
    \`\`\`bash
    docker run -p 3000:3000 10ms-product-page
    \`\`\`
    The application will be accessible at `http://localhost:3000`.

## API Integration

The application fetches product data from:
`https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course`

It uses the `lang` query parameter (`en` or `bn`) and the `X-TENMS-SOURCE-PLATFORM: web` header for SEO data.

## Key Focus Areas Addressed

*   **Design and Implementation:** The project closely follows the design principles observed on the reference page, providing a clean, responsive, and user-friendly interface.
*   **State and Props Management:** State is managed locally within components where necessary (e.g., `VideoPlayer`, `AboutSection` for accordion, `Header` for mobile menu/dropdowns). Data is passed down efficiently via props from the main `page.tsx` Server Component.
*   **TypeScript:** The entire codebase is written in TypeScript, with interfaces defined for API responses (`types/product.ts`) to ensure type safety and improve developer experience.
*   **Server-side Rendering (SSR):** Achieved by fetching data directly in the `app/page.tsx` Server Component.
*   **Code Splitting and Reusable Components:** The application is broken down into small, focused, and reusable React components, promoting maintainability and code organization.
