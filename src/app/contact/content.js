// ─────────────────────────────────────────────
//  CONTACT SECTION — edit everything here
// ─────────────────────────────────────────────

import {
  SiPython, SiTensorflow, SiPytorch, SiScikitlearn, SiOpencv, SiPandas, SiNumpy,
  SiKeras, SiJupyter, SiHuggingface, SiGit, SiDocker, SiNodedotjs,
  SiMongodb, SiPostgresql, SiMysql, SiRedis, SiPostman,
} from "react-icons/si";
import {
  TbSql,
} from "react-icons/tb";

export const SECTION = {
  label: "Get In Touch",
};

// Add / remove countries as needed. code = dial prefix (no +).
export const COUNTRIES = [
  { code: "91",  name: "India",         flag: "🇮🇳" },
  { code: "1",   name: "US / Canada",   flag: "🇺🇸" },
  { code: "44",  name: "UK",            flag: "🇬🇧" },
  { code: "971", name: "UAE",           flag: "🇦🇪" },
  { code: "966", name: "Saudi Arabia",  flag: "🇸🇦" },
  { code: "974", name: "Qatar",         flag: "🇶🇦" },
  { code: "92",  name: "Pakistan",      flag: "🇵🇰" },
  { code: "880", name: "Bangladesh",    flag: "🇧🇩" },
  { code: "94",  name: "Sri Lanka",     flag: "🇱🇰" },
  { code: "60",  name: "Malaysia",      flag: "🇲🇾" },
  { code: "65",  name: "Singapore",     flag: "🇸🇬" },
  { code: "61",  name: "Australia",     flag: "🇦🇺" },
  { code: "49",  name: "Germany",       flag: "🇩🇪" },
  { code: "33",  name: "France",        flag: "🇫🇷" },
  { code: "39",  name: "Italy",         flag: "🇮🇹" },
  { code: "34",  name: "Spain",         flag: "🇪🇸" },
  { code: "55",  name: "Brazil",        flag: "🇧🇷" },
  { code: "81",  name: "Japan",         flag: "🇯🇵" },
  { code: "82",  name: "South Korea",   flag: "🇰🇷" },
  { code: "86",  name: "China",         flag: "🇨🇳" },
  { code: "7",   name: "Russia",        flag: "🇷🇺" },
];

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
  { name: "Machine Learning", icon: SiScikitlearn },
  { name: "Deep Learning", icon: SiPytorch },
  { name: "Computer Vision", icon: SiOpencv },
  { name: "Natural Language Processing", icon: SiHuggingface },
  { name: "Generative AI", icon: SiTensorflow },
  { name: "Data Analysis", icon: SiPandas },
  { name: "Model Deployment", icon: SiDocker },
  { name: "MLOps", icon: SiJupyter },
];
