import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import archiver from 'archiver';

export const templatesRouter = Router();

const TEMPLATES_DIR = path.join(__dirname, '../templates');

interface TemplateMeta {
  id: string;
  name: string;
  description: string;
  stack: string;
  capabilities: string[];
  author: string;
  preview_url?: string;
}

// Helper: Get template metadata from directory
async function getTemplateMeta(templateId: string): Promise<TemplateMeta | null> {
  const templatePath = path.join(TEMPLATES_DIR, templateId);

  try {
    await fs.access(templatePath);

    // Try to read meta.json if it exists
    try {
      const metaPath = path.join(templatePath, 'meta.json');
      const metaContent = await fs.readFile(metaPath, 'utf-8');
      return JSON.parse(metaContent);
    } catch {
      // Detect template type by checking for key files
      let isReactNative = false;
      let stack = 'next+tailwind+shadcn+magicui';
      let author = 'MagicUI Design';

      try {
        const packagePath = path.join(templatePath, 'package.json');
        const packageContent = await fs.readFile(packagePath, 'utf-8');
        const packageJson = JSON.parse(packageContent);

        // Check for React Native / Expo
        if (packageJson.dependencies?.expo || packageJson.dependencies?.['react-native']) {
          isReactNative = true;
          stack = 'react-native+expo+nativewind';
          author = packageJson.name || 'React Native Community';
        }
      } catch {
        // Fallback to filename-based detection
      }

      // Generate basic meta from directory
      const isPortfolio = templateId.includes('portfolio');
      const isStartup = templateId.includes('startup');
      const isSaas = templateId.includes('saas');
      const isAgent = templateId.includes('agent');
      const isDevtool = templateId.includes('devtool');
      const isMobile = templateId.includes('mobile') || isReactNative;

      let capabilities: string[] = [];
      if (isReactNative) {
        // React Native specific capabilities
        capabilities = ['mobile-app', 'cross-platform', 'native'];
        if (templateId === 'luna') capabilities.push('fitness', 'health');
        else if (templateId === 'multia') capabilities.push('social', 'media');
        else if (templateId === 'feedy') capabilities.push('feed', 'social');
        else if (templateId === 'velora') capabilities.push('ecommerce', 'shopping');
        else if (templateId === 'propia') capabilities.push('real-estate', 'listings');
        else if (templateId === 'caloria-v2') capabilities.push('health', 'nutrition');
        else if (templateId === 'walley') capabilities.push('finance', 'wallet');
      } else if (isPortfolio) capabilities = ['landing', 'portfolio', 'blog'];
      else if (isStartup) capabilities = ['landing', 'marketing'];
      else if (isSaas) capabilities = ['landing', 'dashboard', 'auth'];
      else if (isAgent) capabilities = ['landing', 'ai-agent', 'chat'];
      else if (isDevtool) capabilities = ['landing', 'devtool', 'docs'];
      else if (isMobile) capabilities = ['landing', 'mobile-first', 'pwa'];
      else capabilities = ['landing'];

      const description = isReactNative
        ? `${capabilities.join(' + ')} mobile app built with React Native, Expo, and NativeWind`
        : `${capabilities.join(' + ')} template built with Next.js, shadcn/ui, and MagicUI`;

      return {
        id: templateId,
        name: templateId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description,
        stack,
        capabilities,
        author: templateId.startsWith('dillionverma') ? 'Dillion Verma' : author,
        preview_url: `https://ui-template-api-production.up.railway.app/screenshots/${templateId}-preview.png`
      };
    }
  } catch {
    return null;
  }
}

// GET /api/templates - List all templates
templatesRouter.get('/', async (req, res) => {
  try {
    const entries = await fs.readdir(TEMPLATES_DIR);
    const templates: TemplateMeta[] = [];

    for (const entry of entries) {
      const meta = await getTemplateMeta(entry);
      if (meta) templates.push(meta);
    }

    res.json({
      ok: true,
      count: templates.length,
      templates
    });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

// GET /api/templates/:id - Get template metadata
templatesRouter.get('/:id', async (req, res) => {
  try {
    const meta = await getTemplateMeta(req.params.id);

    if (!meta) {
      return res.status(404).json({
        ok: false,
        error: 'Template not found'
      });
    }

    res.json({
      ok: true,
      template: meta
    });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

// GET /api/templates/:id/download - Download template as ZIP
templatesRouter.get('/:id/download', async (req, res) => {
  try {
    const templateId = req.params.id;
    const templatePath = path.join(TEMPLATES_DIR, templateId);

    // Check if template exists
    try {
      await fs.access(templatePath);
    } catch {
      return res.status(404).json({
        ok: false,
        error: 'Template not found'
      });
    }

    // Set headers for ZIP download
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${templateId}.zip"`);

    // Create ZIP archive
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.on('error', (err) => {
      throw err;
    });

    // Pipe archive to response
    archive.pipe(res);

    // Add template directory to archive
    archive.directory(templatePath, false);

    // Finalize archive
    await archive.finalize();

  } catch (error: any) {
    if (!res.headersSent) {
      res.status(500).json({
        ok: false,
        error: error.message
      });
    }
  }
});

// GET /api/templates/:id/files - List template files
templatesRouter.get('/:id/files', async (req, res) => {
  try {
    const templateId = req.params.id;
    const templatePath = path.join(TEMPLATES_DIR, templateId);

    // Check if template exists
    try {
      await fs.access(templatePath);
    } catch {
      return res.status(404).json({
        ok: false,
        error: 'Template not found'
      });
    }

    // Recursively list files
    async function listFiles(dir: string, baseDir: string = dir): Promise<string[]> {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      const files: string[] = [];

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
            files.push(...await listFiles(fullPath, baseDir));
          }
        } else {
          files.push(path.relative(baseDir, fullPath));
        }
      }

      return files;
    }

    const files = await listFiles(templatePath);

    res.json({
      ok: true,
      template_id: templateId,
      file_count: files.length,
      files: files.sort()
    });

  } catch (error: any) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});
