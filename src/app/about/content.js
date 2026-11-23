// ─────────────────────────────────────────────
//  ABOUT SECTION — edit everything here
// ─────────────────────────────────────────────

import {
  SiReact, SiNextdotjs, SiJavascript, SiPython,
  SiTypescript,
  SiGit, SiDocker, SiNodedotjs, SiMongodb, SiPostgresql, SiMysql, SiRedis,
  SiPostman,
  SiTensorflow, SiPytorch, SiScikitlearn, SiOpencv, SiPandas, SiNumpy,
  SiKeras, SiJupyter, SiHuggingface,
} from "react-icons/si";
import {
  TbSql,
} from "react-icons/tb";

export const SECTION = {
  label: "About Me",
};

export const HEADING = {
  line1: "Building",
  line2: "intelligent",
  line3: "systems.",   // ghost (outline) style
};

// *word* = highlighted/bold in BlurText
export const BIO = [
  "I am a *B.Tech student* in *Artificial Intelligence & Machine Learning* from *Rajasthan*. I combine academic knowledge, machine learning, data science, and software engineering to build intelligent systems that turn complex data into practical decisions.",
  "I work across the complete ML lifecycle, including *data collection*, *data cleaning*, *feature engineering*, *model training*, *evaluation*, deployment, and monitoring. I focus on building reliable solutions that solve real problems rather than models that only perform well in experiments.",
  "My core expertise includes *supervised and unsupervised learning*, deep learning, computer vision, natural language processing, statistical modeling, and predictive analytics. I use Python and modern ML frameworks to transform ideas into measurable, production-ready systems.",
  "I build machine learning models with frameworks such as *TensorFlow*, *PyTorch*, *Keras*, and *scikit-learn*. I use NumPy and pandas for data analysis, OpenCV for visual intelligence, and Hugging Face for modern NLP and transformer workflows.",
  "I am also interested in *generative AI*, large language models, AI agents, retrieval-augmented generation, prompt engineering, and model optimization. I explore how these technologies can improve automation, search, analysis, and decision-making.",
  "My B.Tech curriculum and software engineering experience help me turn models into complete applications. I work with Python APIs, databases, Docker, Git, and deployment platforms to build scalable AI pipelines and accessible end-user tools.",
  "My approach to AI engineering is grounded in *accuracy*, *ethical use*, *data privacy*, reproducibility, and continuous evaluation. I design systems with clear metrics, responsible safeguards, and a focus on real-world reliability.",
  "Through continuous learning and experimentation, I am expanding my expertise across MLOps, model deployment, LLM systems, reinforcement learning, multimodal AI, and applied machine learning for healthcare, security, finance, and automation.",
];

export const RESUME_URL = "/resume.pdf";

export const TECH = [
  { name: "Python",         icon: SiPython },
  { name: "TensorFlow",     icon: SiTensorflow },
  { name: "PyTorch",        icon: SiPytorch },
  { name: "scikit-learn",   icon: SiScikitlearn },
  { name: "Keras",          icon: SiKeras },
  { name: "NumPy",          icon: SiNumpy },
  { name: "Pandas",         icon: SiPandas },
  { name: "OpenCV",         icon: SiOpencv },
  { name: "Hugging Face",   icon: SiHuggingface },
  { name: "Jupyter",        icon: SiJupyter },
  { name: "JavaScript",     icon: SiJavascript },
  { name: "TypeScript",     icon: SiTypescript },
  { name: "React",          icon: SiReact },
  { name: "Next.js",        icon: SiNextdotjs },
  { name: "Node.js",        icon: SiNodedotjs },
  { name: "SQL",            icon: TbSql },
  { name: "MongoDB",        icon: SiMongodb },
  { name: "PostgreSQL",     icon: SiPostgresql },
  { name: "MySQL",          icon: SiMysql },
  { name: "Redis",          icon: SiRedis },
  { name: "Git",            icon: SiGit },
  { name: "Docker",         icon: SiDocker },
  { name: "Postman",        icon: SiPostman },
];

export const CREATIVE = [
  { name: "Machine Learning",       icon: SiScikitlearn },
  { name: "Deep Learning",          icon: SiPytorch },
  { name: "Computer Vision",        icon: SiOpencv },
  { name: "Natural Language Processing", icon: SiHuggingface },
  { name: "Generative AI",          icon: SiTensorflow },
  { name: "Data Analysis",          icon: SiPandas },
  { name: "Model Deployment",       icon: SiDocker },
  { name: "MLOps",                  icon: SiJupyter },
];

export const EXPERIENCE = [
  { role: "AI & Machine Learning Engineer", period: "Present" },
  { role: "Python Developer",                period: "Present" },
];
