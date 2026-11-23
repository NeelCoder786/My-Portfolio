import PageShell from "@/components/PageShell";
import ContactPage from "@/views/contact";

export const metadata = {
  title:       "Contact — Hire an AI & Machine Learning Engineer",
  description: "Get in touch with Neel Sharma for machine learning, deep learning, computer vision, NLP, generative AI, and MLOps projects.",
  keywords:    ["hire AI engineer", "hire machine learning engineer", "hire deep learning engineer", "hire NLP engineer", "hire MLOps engineer"],
  alternates:  { canonical: "https://sarang-space.site/contact" },
  openGraph: {
    title: "Hire Neel Sharma - Portfolio",
    description: "Contact Neel Sharma for machine learning, deep learning, computer vision, NLP, generative AI, and MLOps projects.",
  },
};

export default function Page() {
  return (
    <PageShell>
      <ContactPage />
    </PageShell>
  );
}
