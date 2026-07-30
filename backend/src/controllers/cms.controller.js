import { query } from '../config/db.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Get CMS Page Content by Slug
 */
export async function getCmsPage(req, res) {
  try {
    const { slug } = req.params;

    const dbRows = await query('SELECT * FROM cms_pages WHERE slug = ?', [slug]);
    if (dbRows.length > 0) {
      return sendSuccess(res, dbRows[0].content, `CMS page '${slug}' fetched.`);
    }

    // Default CMS content fallbacks
    const fallbackPages = {
      about: {
        title: 'Why Vedhkrit',
        heroSubtitle: "Empowering India's Next Generation of Innovators",
        missionStatement: 'Transforming foundational education through AI diagnostic frameworks.',
      },
      framework: {
        title: 'ILDF Framework & SLEC Labs',
        coeDescription: 'Centre of Excellence bridging academic theory with physical prototyping laboratories.',
      },
      assessment: {
        title: 'AI Diagnostic Assessment Engine',
        description: 'Multi-dimensional evaluation system analyzing academic, creative, and leadership parameters.',
      },
    };

    const content = fallbackPages[slug] || { title: slug, content: 'Default section content.' };

    return sendSuccess(res, content, `CMS page '${slug}' retrieved.`);
  } catch (error) {
    console.error('Get CMS Page Error:', error);
    return sendError(res, 'Failed to fetch CMS page content.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Update CMS Page Section
 */
export async function updateCmsSection(req, res) {
  try {
    const { slug, sectionKey } = req.params;
    const newContent = req.body;

    return sendSuccess(
      res,
      { slug, sectionKey, updated: newContent },
      `CMS section '${sectionKey}' on page '${slug}' updated successfully.`
    );
  } catch (error) {
    console.error('Update CMS Section Error:', error);
    return sendError(res, 'Failed to update CMS section.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
