import { Suspense } from "react";
import Cursor from "../../components/Cursor";
import Navbar from "../../components/Navbar";
import ProjectsPage from "../../views/projects";

export const metadata = {
  title:       "Projects — AI, Machine Learning & Data Science Work by Neel Sharma",
  description: "Explore AI, machine learning, deep learning, computer vision, NLP, and MLOps projects built by Neel Sharma.",
  keywords:    ["AI projects", "machine learning projects", "computer vision", "NLP", "MLOps", "case studies"],
  alternates:  { canonical: "https://sarang-space.site/projects" },
  openGraph: {
    title: "Projects - Neel Sharma - Portfolio",
    description: "Detailed case studies of machine learning, deep learning, computer vision, NLP, and MLOps projects.",
  },
};

export default function Page() {
  return (
    <main>
      <div className="grain-overlay" />
      <Cursor />
      <Navbar />
      <div className="relative z-10">
        <Suspense fallback={<div className="min-h-screen bg-[#060606]" />}>
          <ProjectsPage />
        </Suspense>
      </div>
    </main>
  );
}
