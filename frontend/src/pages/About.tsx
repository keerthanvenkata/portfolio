import Timeline from '../components/Timeline'
import GitHubContributions from '../components/GitHubContributions'

const TECH_SECTION_TITLE = 'Technology and Tools'

type TechItem = { name: string; logo?: string; url?: string }

// Logos live in public/tech-logos/ (normalized filenames). Items without logo show initial letter.
const TECH_STACK: TechItem[] = [
  // Languages
  { name: 'Python', logo: '/tech-logos/python.svg', url: 'https://www.python.org' },
  { name: 'C++', logo: '/tech-logos/cpp.svg', url: 'https://isocpp.org' },
  { name: 'JavaScript', logo: '/tech-logos/javascript.svg', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'TypeScript', logo: '/tech-logos/typescript.svg', url: 'https://www.typescriptlang.org' },
  { name: 'SQL', url: 'https://en.wikipedia.org/wiki/SQL' },
  // Web & frontend
  { name: 'HTML5', logo: '/tech-logos/html5.svg', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS3', logo: '/tech-logos/css3.svg', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'React', logo: '/tech-logos/react.svg', url: 'https://react.dev' },
  { name: 'Vite', logo: '/tech-logos/vite.svg', url: 'https://vitejs.dev' },
  { name: 'Node.js', logo: '/tech-logos/nodejs.svg', url: 'https://nodejs.org' },
  // Backend & APIs
  { name: 'FastAPI', logo: '/tech-logos/fastapi.svg', url: 'https://fastapi.tiangolo.com' },
  { name: 'GraphQL', logo: '/tech-logos/graphql.svg', url: 'https://graphql.org' },
  // Data & databases
  { name: 'PostgreSQL', logo: '/tech-logos/postgresql.svg', url: 'https://www.postgresql.org' },
  { name: 'MongoDB', logo: '/tech-logos/mongodb.svg', url: 'https://www.mongodb.com' },
  { name: 'Redis', logo: '/tech-logos/redis.svg', url: 'https://redis.io' },
  { name: 'InfluxDB', logo: '/tech-logos/influxdb.svg', url: 'https://www.influxdata.com' },
  // ML & data science
  { name: 'PyTorch', logo: '/tech-logos/pytorch.svg', url: 'https://pytorch.org' },
  { name: 'Scikit-learn', url: 'https://scikit-learn.org' },
  { name: 'NLTK', url: 'https://www.nltk.org' },
  { name: 'OpenCV', logo: '/tech-logos/opencv.svg', url: 'https://opencv.org' },
  { name: 'Jupyter', logo: '/tech-logos/jupyter.svg', url: 'https://jupyter.org' },
  { name: 'Anaconda', logo: '/tech-logos/anaconda.svg', url: 'https://www.anaconda.com' },
  // AI / agents
  { name: 'LangGraph', url: 'https://langchain.com/langgraph' },
  { name: 'Vertex AI', url: 'https://cloud.google.com/vertex-ai' },
  { name: 'Gemini', url: 'https://ai.google.dev/gemini' },
  { name: 'Google Agents SDK', url: 'https://ai.google.dev' },
  // Cloud & infra
  { name: 'GCP', logo: '/tech-logos/gcp.svg', url: 'https://cloud.google.com' },
  { name: 'AWS', logo: '/tech-logos/aws.svg', url: 'https://aws.amazon.com' },
  { name: 'Vercel', logo: '/tech-logos/vercel.svg', url: 'https://vercel.com' },
  { name: 'Docker', logo: '/tech-logos/docker.svg', url: 'https://www.docker.com' },
  { name: 'Kubernetes', logo: '/tech-logos/kubernetes.svg', url: 'https://kubernetes.io' },
  { name: 'Kafka', logo: '/tech-logos/kafka.svg', url: 'https://kafka.apache.org' },
  // Orchestration & automation
  { name: 'Prefect', url: 'https://www.prefect.io' },
  { name: 'n8n', url: 'https://n8n.io' },
  { name: 'Streamlit', logo: '/tech-logos/streamlit.svg', url: 'https://streamlit.io' },
  // Version control & collaboration
  { name: 'Git', logo: '/tech-logos/git.svg', url: 'https://git-scm.com' },
  { name: 'GitHub', logo: '/tech-logos/github.svg', url: 'https://github.com' },
  { name: 'Jira', logo: '/tech-logos/jira.svg', url: 'https://www.atlassian.com/software/jira' },
  { name: 'Trello', logo: '/tech-logos/trello.svg', url: 'https://trello.com' },
  // Documentation & design
  { name: 'LaTeX', logo: '/tech-logos/latex.svg', url: 'https://www.latex-project.org' },
  { name: 'UML', logo: '/tech-logos/uml.svg', url: 'https://www.omg.org/spec/UML' },
  // OS & editors
  { name: 'Linux', logo: '/tech-logos/linux.svg', url: 'https://www.linux.org' },
  { name: 'Windows', logo: '/tech-logos/windows.svg', url: 'https://www.microsoft.com/windows' },
  { name: 'VS Code', logo: '/tech-logos/vscode.svg', url: 'https://code.visualstudio.com' },
  { name: 'Cursor', url: 'https://cursor.com' },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold gradient-text-purple mb-4">About Me</h1>
        <p className="text-gray-300 mt-2 text-lg">Career trajectory, education, and highlights.</p>
      </div>

      <Timeline />

      <div className="mt-10">
        <GitHubContributions />
      </div>

      <section className="mt-12 pt-12 border-t border-violet/30">
        <h2 className="text-2xl font-heading font-bold gradient-text-purple mb-6">{TECH_SECTION_TITLE}</h2>
        <p className="text-gray-400 mb-6">Languages, frameworks, and platforms I use or have experience with.</p>
        <div className="flex flex-wrap gap-6 items-center">
          {TECH_STACK.map(({ name, logo, url }) => {
            const content = (
              <>
                {logo ? (
                  <img src={logo} alt={name} className="h-8 w-8 object-contain flex-shrink-0" />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded bg-violet/20 text-violet text-sm font-semibold flex-shrink-0">
                    {name.slice(0, 1)}
                  </span>
                )}
                <span className="text-gray-300 font-medium">{name}</span>
              </>
            )
            return url ? (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-violet/20 hover:border-violet/50 hover:bg-white/10 transition-colors"
                title={`${name} (opens in new tab)`}
              >
                {content}
              </a>
            ) : (
              <div
                key={name}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-violet/20"
                title={name}
              >
                {content}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
