import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const md = new MarkdownIt()

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

async function writeJson(filePath, data) {
  const json = JSON.stringify(data, null, 2)
  await ensureDir(path.dirname(filePath))
  await fs.writeFile(filePath, json, 'utf8')
}

async function copyDir(src, dest) {
  await ensureDir(dest)
  const entries = await fs.readdir(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath)
    }
  }
}

function parseDate(value) {
  // Expecting YYYY-MM-DD; fall back to Date parse
  try {
    const [y, m, d] = String(value).split('-').map(Number)
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
      return new Date(Date.UTC(y, m - 1, d))
    }
  } catch {}
  const dt = new Date(value)
  return isNaN(dt.getTime()) ? new Date(0) : dt
}

async function generatePosts(contentDir, outDir) {
  const postsDir = path.join(contentDir, 'posts')
  const files = await fs.readdir(postsDir)
  const posts = []

  for (const file of files) {
    if (!file.endsWith('.md')) continue
    const full = path.join(postsDir, file)
    const raw = await fs.readFile(full, 'utf8')
    const fm = matter(raw)
    const meta = fm.data || {}
    if (meta.id == null) continue
    const content_html = md.render(fm.content || '')
    const post = {
      id: String(meta.id),
      title: String(meta.title || ''),
      excerpt: String(meta.excerpt || ''),
      category: String(meta.category || ''),
      date: parseDate(meta.date).toISOString().slice(0, 10),
      featured: Boolean(meta.featured || false),
      content_html,
    }
    posts.push(post)

    // Write individual post file
    await writeJson(path.join(outDir, 'posts', `${post.id}.json`), post)
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  await writeJson(path.join(outDir, 'posts.json'), posts)
}

async function readJsonIfExists(p) {
  try {
    const raw = await fs.readFile(p, 'utf8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function generateProjects(contentDir, outDir) {
  const projectsFile = path.join(contentDir, 'projects.json')
  const experimentalFile = path.join(contentDir, 'experimental.json')

  const projects = await readJsonIfExists(projectsFile)
  const experimental = await readJsonIfExists(experimentalFile)
  for (const item of experimental) {
    if (!('kind' in item)) item.kind = 'experimental'
  }
  const combined = [...projects, ...experimental]

  await writeJson(path.join(outDir, 'projects.json'), combined)
  for (const item of combined) {
    if (!('id' in item)) continue
    await writeJson(path.join(outDir, 'projects', `${String(item.id)}.json`), item)
  }
}

async function generateResume(contentDir, outDir) {
  const resumeDir = path.join(contentDir, 'resume')
  const resumeJsonPath = path.join(resumeDir, 'resume.json')
  const resumeDestDir = path.join(outDir, '..', 'resume')
  
  try {
    // Read resume metadata
    const resumeData = await readJsonIfExists(resumeJsonPath)
    if (!resumeData || !resumeData.current_version) {
      console.log('No resume metadata found, skipping resume generation')
      return
    }

    // Ensure resume output directory exists
    await ensureDir(resumeDestDir)

    // Copy all PDF files from resume directory
    const files = await fs.readdir(resumeDir)
    for (const file of files) {
      if (file.endsWith('.pdf')) {
        const srcPath = path.join(resumeDir, file)
        const destPath = path.join(resumeDestDir, file)
        await fs.copyFile(srcPath, destPath)
      }
    }

    // Copy resume metadata
    await writeJson(path.join(resumeDestDir, 'resume.json'), resumeData)

    // Create latest symlink/copy
    const currentVersion = resumeData.current_version
    const currentFile = resumeData.versions.find(v => v.version === currentVersion)?.filename
    if (currentFile) {
      const latestPath = path.join(resumeDestDir, 'resume-latest.pdf')
      const currentPath = path.join(resumeDestDir, currentFile)
      await fs.copyFile(currentPath, latestPath)
    }

    console.log('Resume files generated successfully')
  } catch (error) {
    console.log('Resume generation skipped:', error.message)
  }
}

async function generateTimeline(contentDir, outDir) {
  const timelineSrc = path.join(contentDir, 'timeline.json')
  const timeline = await readJsonIfExists(timelineSrc)
  await writeJson(path.join(outDir, 'timeline.json'), timeline)
}

async function generate() {
  const repoRoot = path.resolve(__dirname, '..')
  const contentDir = path.resolve(__dirname, '../../backend/app/content')
  const publicApiDir = path.join(repoRoot, 'public', 'api')

  await ensureDir(publicApiDir)
  await generatePosts(contentDir, publicApiDir)
  await generateProjects(contentDir, publicApiDir)
  await generateResume(contentDir, publicApiDir)
  await generateTimeline(contentDir, publicApiDir)

  // Copy media directory
  const mediaSrc = path.join(contentDir, 'media')
  const mediaDest = path.join(repoRoot, 'public', 'media')
  try {
    await copyDir(mediaSrc, mediaDest)
  } catch {
    // ignore if no media dir
  }
}

generate().catch((err) => {
  console.error(err)
  process.exit(1)
})


