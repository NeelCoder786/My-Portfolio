import PageShell from "@/components/PageShell";
import AboutPage from "@/views/about";

export const metadata = {
  title:       "About — AI & Machine Learning Engineer from India",
  description: "Meet Neel Sharma — an AI and Machine Learning engineer from India specializing in Python, TensorFlow, PyTorch, computer vision, NLP, predictive analytics, and generative AI.",
  keywords:    ["AI engineer India", "machine learning engineer", "Python engineer", "deep learning", "computer vision", "NLP", "Neel Sharma about"],
  alternates:  { canonical: "https://sarang-space.site/about" },
  openGraph: {
    title: "About Neel Sharma - Portfolio",
    description: "AI and Machine Learning engineer from India specializing in Python, deep learning, computer vision, NLP, predictive analytics, and generative AI.",
  },
};

export default function Page() {
  return (
    <PageShell>
      <style>{`.bottom-blur { display: none !important; }`}</style>
      <AboutPage />
    </PageShell>
  );
}
