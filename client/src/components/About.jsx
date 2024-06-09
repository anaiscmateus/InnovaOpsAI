// About.jsx
function About() {
  return (
    <section id="about" data-testid="about">
      <h2 className="text-xl font-semibold mb-4" role="heading">Introducing OptimOps.ai</h2>
      <p className="mb-4">
        Welcome to <span className="font-semibold">OptimOps.ai</span>, your
        trusted partner in transforming the way you do business through
        cutting-edge AI, MLOps, DevOps and Agile. Based in the USA and China,
        OptimOps.ai is dedicated to delivering exceptional consulting services
        and innovative products that streamline your operations, enhance
        efficiency, and drive innovation.
      </p>
      <ul className="space-y-4" role="list">
        <li role="listitem">
          <h3 className="font-semibold" role="heading">MLOps Solutions</h3>
          <p>
            Bridge the gap between AI data science and operations. Our MLOps
            services ensure that your machine learning models are deployed,
            monitored, and maintained effectively, allowing you to leverage AI
            for competitive advantage.
          </p>
        </li>
        <li role="listitem">
          <h3 className="font-semibold">DevOps Strategy and Implementation:</h3>
          <p>
            Automate and optimize your software delivery processes with our
            expert DevOps consulting. We build robust CI/CD pipelines, integrate
            advanced automation tools, and ensure seamless cloud infrastructure
            management.
          </p>
        </li>
        <li role="listitem">
          <h3 className="font-semibold">Agile Transformation</h3>
          <p>
            Transition to Agile methodologies with confidence. Our Agile experts
            help you adopt Scrum, Kanban, and other Agile frameworks, enhancing
            team productivity and accelerating project delivery.
          </p>
        </li>
      </ul>
    </section>
  );
}

export default About;
