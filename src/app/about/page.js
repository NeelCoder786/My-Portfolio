import PageShell from "@/components/PageShell";
import AboutPage from "@/views/about";
import { supabase } from "@/lib/supabase";

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

export const dynamic = "force-dynamic";

export default async function Page() {
  let initialProfileImage = "/photo/neel-profile.png";
  if (supabase) {
    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "profile_image")
      .maybeSingle();
    if (!error && data?.value) {
      let value = data.value;
      if (typeof value === 'string') {
        try {
          value = JSON.parse(value);
        } catch {
          value = null;
        }
      }
      if (value?.profile) initialProfileImage = value.profile;
    }
  }

  return (
    <PageShell>
      <style>{`.bottom-blur { display: none !important; }`}</style>
      <AboutPage initialProfileImage={initialProfileImage} />
    </PageShell>
  );
}
