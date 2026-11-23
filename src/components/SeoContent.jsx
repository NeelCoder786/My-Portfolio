/**
 * SeoContent — Hidden semantic HTML for search engines & AI crawlers.
 * 
 * This component renders keyword-rich, structured text that search engines
 * and AI bots can crawl, even when the visual content is animated/JS-driven.
 * It's visually hidden but fully accessible to screen readers and crawlers.
 */
export default function SeoContent() {
  return (
    <div
      className="sr-only"
      aria-hidden="false"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Force rebuild */}
      <h1 itemProp="name">Neel Sharma - Portfolio</h1>
      
      <p itemProp="description">
        AI and Machine Learning engineer specializing in predictive modeling, deep learning, computer vision, natural language processing, generative AI, and MLOps.
        I build data-driven machine learning systems from collection and feature engineering through training, evaluation, deployment, and monitoring.
      </p>

      <p itemProp="jobTitle">AI & Machine Learning Engineer</p>

      <section aria-label="Services">
        <h2>Services — Hire Neel Sharma</h2>
        
        <article>
          <h3>Machine Learning & Predictive Analytics</h3>
          <p>
            Neel Sharma develops supervised and unsupervised learning solutions for classification, regression, clustering, forecasting, and data-driven decisions using Python and scikit-learn.
          </p>
        </article>

        <article>
          <h3>Deep Learning & Computer Vision</h3>
          <p>
            Neel Sharma builds neural networks, image classification systems, object detection pipelines, and computer vision applications using TensorFlow, PyTorch, Keras, and OpenCV.
          </p>
        </article>

        <article>
          <h3>Natural Language Processing & Generative AI</h3>
          <p>
            Neel Sharma develops NLP solutions, embeddings, transformers, RAG systems, AI agents, and LLM applications using Hugging Face, PyTorch, Python, and modern prompt engineering.
          </p>
        </article>

        <article>
          <h3>MLOps & Model Deployment</h3>
          <p>
            Neel Sharma builds reproducible ML pipelines, APIs, Dockerized model services, monitoring workflows, and deployment systems for reliable production AI.
          </p>
        </article>
      </section>

      <section aria-label="Portfolio Statistics">
        <h2>Portfolio Statistics</h2>
        <ul>
          <li>Machine learning and predictive analytics</li>
          <li>Deep learning and neural networks</li>
          <li>Computer vision and NLP</li>
          <li>Generative AI and MLOps</li>
        </ul>
      </section>

      <section aria-label="Technical Skills">
        <h2>Technical Skills</h2>
        <p itemProp="knowsAbout">
          Python, NumPy, Pandas, SQL, scikit-learn, TensorFlow, PyTorch, Keras, OpenCV,
          Hugging Face, Transformers, NLP, embeddings, RAG, LLMs, prompt engineering,
          model evaluation, feature engineering, Docker, Git, MLOps, PostgreSQL, and API deployment
        </p>
      </section>

      <section aria-label="About Neel Sharma - Portfolio">
        <h2>Neel Sharma – AI &amp; Machine Learning Engineer</h2>
        <p>
          Neel Sharma is a B.Tech student in Artificial Intelligence & Machine Learning from Rajasthan, India, focused on building data-driven, ethical, and practical intelligent systems. He combines academic training, statistical analysis, machine learning, deep learning, and software engineering to create solutions for prediction, automation, computer vision, and natural language processing.
        </p>
        
        <h3>Skills and Expertise:</h3>
        <ul>
          <li>Machine Learning</li>
          <li>Deep Learning</li>
          <li>Computer Vision</li>
          <li>Natural Language Processing</li>
          <li>Generative AI</li>
          <li>MLOps and Deployment</li>
          <li>Data Analysis</li>
          <li>Feature Engineering</li>
          <li>Deep Learning</li>
          <li>Computer Vision</li>
          <li>Natural Language Processing</li>
          <li>Generative AI</li>
          <li>Artificial Intelligence</li>
          <li>Machine Learning Systems</li>
          <li>Deep Learning</li>
          <li>Computer Vision</li>
          <li>Natural Language Processing</li>
          <li>Generative AI</li>
          <li>Data Science</li>
          <li>MLOps</li>
        </ul>
        
        <p>
          Neel Sharma continues to develop modern digital experiences focused on creativity, performance, storytelling, and visual identity. His goal is to create meaningful digital work that combines design, technology, and emotional impact into a single creative experience.
        </p>
      </section>

      <section aria-label="Contact">
        <h2>Hire Neel Sharma — Contact Information</h2>
        <p>
          <span itemProp="url">https://sarang-space.site</span> |
          <span itemProp="email">neelsharma332713@gmail.com</span> |
          Available for AI project collaboration and opportunities
        </p>
      </section>
    </div>
  );
}
