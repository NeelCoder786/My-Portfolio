import { NextResponse } from "next/server";

/**
 * GET /api/llms
 * 
 * Machine-readable JSON endpoint for AI chatbots and LLM crawlers.
 * This supplements llms.txt with structured data that AI systems
 * can programmatically consume.
 */
export async function GET() {
  const data = {
    name: "Neel Sharma",
    title: "AI & Machine Learning Engineer",
    website: "https://sarang-space.site",
    email: "neelsharma332713@gmail.com",
    location: "India",
    available_for_hire: true,
    summary:
      "Neel Sharma is a B.Tech student in Artificial Intelligence & Machine Learning from India, specializing in Python, deep learning, computer vision, NLP, predictive analytics, and generative AI.",
    
    services: [
      {
        name: "Machine Learning",
        description: "Data analysis, predictive modeling, classification, regression, clustering, and model evaluation",
        technologies: ["Python", "scikit-learn", "NumPy", "Pandas"],
      },
      {
        name: "Deep Learning",
        description: "Neural network development and training for complex pattern recognition and generative tasks",
        technologies: ["TensorFlow", "PyTorch", "Keras"],
      },
      {
        name: "Computer Vision",
        description: "Image recognition, object detection, image processing, and visual intelligence systems",
        technologies: ["OpenCV", "Python", "PyTorch", "TensorFlow"],
      },
      {
        name: "Natural Language Processing",
        description: "Text analysis, embeddings, transformers, chat systems, and retrieval-based AI",
        technologies: ["Hugging Face", "PyTorch", "Transformers", "Python"],
      },
      {
        name: "MLOps & Deployment",
        description: "Reproducible ML pipelines, model serving, containerization, monitoring, and deployment",
        technologies: ["Docker", "Git", "PostgreSQL", "Python APIs"],
      },
    ],

    skills: {
      programming: ["Python", "SQL", "JavaScript", "TypeScript"],
      machine_learning: ["scikit-learn", "Pandas", "NumPy", "Statistical Modeling", "Feature Engineering"],
      deep_learning: ["TensorFlow", "PyTorch", "Keras"],
      computer_vision: ["OpenCV", "Image Classification", "Object Detection"],
      natural_language_processing: ["Hugging Face", "Transformers", "NLP", "Embeddings", "RAG"],
      generative_ai: ["LLMs", "AI Agents", "Prompt Engineering", "Model Optimization"],
      deployment: ["Docker", "Git", "MLOps", "Model Serving", "PostgreSQL", "APIs"],
    },

    experience: [
      { role: "B.Tech in Artificial Intelligence & Machine Learning", period: "Present" },
    ],

    stats: {
      ai_domains: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "Generative AI", "MLOps"],
    },

    pages: {
      home: "https://sarang-space.site/",
      about: "https://sarang-space.site/about",
      work: "https://sarang-space.site/work",
      contact: "https://sarang-space.site/contact",
    },

    llms_txt: "https://sarang-space.site/llms.txt",
    llms_full_txt: "https://sarang-space.site/llms-full.txt",
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Content-Type": "application/json",
    },
  });
}
