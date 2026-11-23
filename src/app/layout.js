import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import TrackVisit from "@/components/TrackVisit";
import { Analytics } from "@vercel/analytics/next";
import NewsletterPopup from "@/components/NewsletterPopup";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap"
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const viewport = {
  themeColor: "#ff6b1a",
};

export const metadata = {
  metadataBase: new URL(BASE),

  title: {
    default: "Neel Sharma - Portfolio",
    template: "%s - Neel Sharma - Portfolio",
  },
  description:
    "AI and Machine Learning engineer specializing in machine learning, deep learning, computer vision, NLP, predictive analytics, and generative AI.",
  keywords: [
    "AI Engineer", "Machine Learning Engineer", "Data Scientist",
    "Deep Learning", "Computer Vision", "Natural Language Processing",
    "Generative AI", "Python Developer", "MLOps"
  ],
  authors: [{ name: "Neel Sharma", url: BASE }],
  creator: "Neel Sharma",
  publisher: "Neel Sharma",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE,
    siteName: "Neel Sharma - Portfolio",
    title: "Neel Sharma - Portfolio",
    description: "AI and Machine Learning engineer specializing in machine learning, deep learning, computer vision, NLP, generative AI, and MLOps.",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Neel Sharma - Portfolio",
    }],
  },

  twitter: {
    card: "summary_large_image",
    title: "Neel Sharma - Portfolio",
    description: "AI and Machine Learning engineer specializing in machine learning, deep learning, computer vision, NLP, generative AI, and MLOps.",
    images: ["/og-image.png"],
    creator: "@neelsharma",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/photo/favicon.png", type: "image/png" },
    ],
    apple: "/photo/favicon.png",
    shortcut: "/photo/favicon.png",
  },

  manifest: "/manifest.webmanifest",

  alternates: { canonical: BASE },

  category: "portfolio",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE}/#person`,
      "name": "Neel Sharma",
      "url": BASE,
      "jobTitle": "AI & Machine Learning Engineer",
      "description": "AI and Machine Learning engineer building predictive, deep learning, computer vision, NLP, generative AI, and MLOps solutions.",
      "knowsAbout": [
        "Python", "NumPy", "Pandas", "SQL", "scikit-learn",
        "TensorFlow", "PyTorch", "Keras", "OpenCV",
        "Natural Language Processing", "Transformers", "Hugging Face",
        "Generative AI", "LLMs", "RAG", "Machine Learning", "Deep Learning",
        "Feature Engineering", "Model Evaluation", "Docker", "MLOps", "PostgreSQL"
      ],
      "hasOccupation": [
        {
          "@type": "Occupation",
          "name": "Machine Learning Engineer",
          "occupationLocation": { "@type": "Country", "name": "India" },
          "skills": "Python, scikit-learn, Pandas, NumPy, SQL, feature engineering"
        },
        {
          "@type": "Occupation",
          "name": "Deep Learning Engineer",
          "skills": "TensorFlow, PyTorch, Keras, computer vision, NLP"
        },
        {
          "@type": "Occupation",
          "name": "MLOps Engineer",
          "skills": "Docker, model deployment, API development, monitoring, PostgreSQL"
        }
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Machine Learning Development",
            "description": "Predictive models, classification, forecasting, clustering, and data-driven AI applications"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Deep Learning & Computer Vision",
            "description": "Neural networks, image classification, object detection, and visual intelligence systems"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Natural Language Processing",
            "description": "Text analysis, embeddings, transformers, RAG systems, chatbots, and AI agents"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Generative AI Development",
            "description": "LLM applications, prompt engineering, model integration, and generative AI workflows"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "MLOps & Model Deployment",
            "description": "Dockerized model services, APIs, monitoring, and scalable ML deployment"
          }
        }
      ],
      "sameAs": [],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE}/#localbusiness`,
      "name": "Neel Sharma - Portfolio",
      "image": `${BASE}/og-image.png`,
      "url": BASE,
      "telephone": "+91-0000000000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "India",
        "addressCountry": "IN"
      },
      "priceRange": "$$",
      "description": "AI and Machine Learning engineer specializing in predictive analytics, deep learning, NLP, and computer vision.",
      "founder": { "@id": `${BASE}/#person` }
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      "url": BASE,
      "name": "Neel Sharma - Portfolio",
      "description": "Portfolio of Neel Sharma, an AI and Machine Learning engineer building predictive, deep learning, NLP, and computer vision solutions.",
      "publisher": { "@id": `${BASE}/#person` },
      "inLanguage": "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${BASE}/#profilepage`,
      "url": BASE,
      "name": "Neel Sharma - Portfolio",
      "isPartOf": { "@id": `${BASE}/#website` },
      "about": { "@id": `${BASE}/#person` },
      "mainEntity": { "@id": `${BASE}/#person` },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Projects", "item": `${BASE}/projects` },
          { "@type": "ListItem", "position": 3, "name": "Work", "item": `${BASE}/work` },
          { "@type": "ListItem", "position": 4, "name": "About", "item": `${BASE}/about` },
          { "@type": "ListItem", "position": 5, "name": "Contact", "item": `${BASE}/contact` },
        ],
      },
    },
    {
      "@type": "ItemList",
      "name": "Portfolio Services",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Machine Learning Development",
          "description": "Building predictive models and data-driven systems using Python, scikit-learn, feature engineering, and statistical analysis",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Deep Learning & Computer Vision",
          "description": "Developing neural networks, image classification, object detection, and visual intelligence systems using TensorFlow, PyTorch, and OpenCV",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "MLOps & Model Deployment",
          "description": "Deploying reproducible, monitored, and scalable machine learning systems using Docker, APIs, databases, and modern MLOps workflows",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does Neel Sharma offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Neel Sharma offers machine learning, deep learning, computer vision, natural language processing, generative AI, and MLOps development."
          }
        },
        {
          "@type": "Question",
          "name": "How can I hire Neel Sharma for a project?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can reach out through the contact form at sarang-space.site/contact or email neelsharma332713@gmail.com. Neel Sharma is available for AI project collaboration and opportunities."
          }
        },
        {
          "@type": "Question",
          "name": "What technologies does Neel Sharma work with?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Neel Sharma works with Python, NumPy, Pandas, SQL, scikit-learn, TensorFlow, PyTorch, Keras, OpenCV, Hugging Face, Transformers, Docker, Git, MLOps, and PostgreSQL."
          }
        },
        {
          "@type": "Question",
          "name": "Where is Neel Sharma based and does he work remotely?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Neel Sharma is a B.Tech Artificial Intelligence & Machine Learning student based in India, available for remote AI project collaboration."
          }
        },
        {
          "@type": "Question",
          "name": "How long does a typical project take with Neel Sharma?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Project timelines depend on scope and data requirements. A machine learning prototype may take 2–4 weeks, while a deployed AI system or MLOps pipeline may take 6–12 weeks. Contact Neel Sharma at sarang-space.site/contact for a specific estimate."
          }
        },
        {
          "@type": "Question",
          "name": "What makes Neel Sharma's AI profile distinctive?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Neel Sharma focuses on practical, measurable AI engineering across machine learning, deep learning, computer vision, NLP, generative AI, and MLOps."
          }
        },
        {
          "@type": "Question",
          "name": "What is Neel Sharma's background and education?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Neel Sharma is a B.Tech student in Artificial Intelligence & Machine Learning from India, specializing in Python, TensorFlow, PyTorch, scikit-learn, OpenCV, NLP, generative AI, and MLOps."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Collaborate with Neel Sharma on an AI Project",
      "description": "Steps to collaborate with Neel Sharma on machine learning, deep learning, NLP, computer vision, generative AI, or MLOps work",
      "totalTime": "PT5M",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Visit the contact page",
          "text": "Go to sarang-space.site/contact to find the contact form and inquiry options.",
          "url": `${BASE}/contact`
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Describe your project",
          "text": "Fill out the contact form with your AI project type, dataset or data source, rough scope, and timeline.",
          "url": `${BASE}/contact`
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Receive a response",
          "text": "Neel Sharma responds within 24 hours to discuss requirements, timeline, and pricing."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Start the project",
          "text": "Once scope and pricing are agreed upon, work begins with regular updates and delivery milestones."
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": `${BASE}/#webpage`,
      "url": BASE,
      "name": "Neel Sharma - Portfolio",
      "isPartOf": { "@id": `${BASE}/#website` },
      "about": { "@id": `${BASE}/#person` },
      "description": "Portfolio of Neel Sharma — an AI and Machine Learning engineer building predictive models, deep learning systems, NLP applications, computer vision solutions, and MLOps pipelines.",
      "inLanguage": "en-US",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2", ".hero-tagline", ".about-summary", "article p"]
      }
    }
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* ── Resource hints ── */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://ip-api.com" />

        {/* ── Structured Data for Google + AI bots ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ── LLMs.txt discovery (AI chatbot standard) ── */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable site info" />

        {/* ── Custom Search/Keywords XML index for AEO ── */}
        <link rel="search" type="application/xml" href="/searchwords.xml" title="Search Keywords" />

        {/* ── Google Search Console verification ── */}
        {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
        )}

        {/* ── Bing Webmaster Tools verification ── */}
        {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
          <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
        )}
      </head>
      <body>
        <TrackVisit />
        <div className="bottom-blur" aria-hidden="true" />
        {children}
        <Analytics />
        <NewsletterPopup />
      </body>
    </html>
  );
}

