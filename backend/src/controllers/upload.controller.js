import { query } from '../config/db.js';
import { cryptoNativeUuid } from '../utils/helpers.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Handle Media Upload Metadata Service
 */
export async function handleUpload(req, res) {
  try {
    const userId = req.user?.id || 'ANONYMOUS';
    const { fileName = 'upload.png', mimeType = 'image/png', fileSize = 102400, fileData } = req.body;

    const fileId = cryptoNativeUuid();
    // Host mock asset URL
    const fileUrl = `/assets/uploads/${fileId}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    if (userId !== 'ANONYMOUS') {
      await query(
        `INSERT INTO media_uploads (id, user_id, file_name, file_url, mime_type, file_size) VALUES (?, ?, ?, ?, ?, ?)`,
        [fileId, userId, fileName, fileUrl, mimeType, fileSize]
      );
    }

    return sendSuccess(
      res,
      {
        id: fileId,
        fileName,
        fileUrl,
        mimeType,
        fileSize,
        uploadedAt: new Date().toISOString(),
      },
      'File uploaded successfully.',
      201
    );
  } catch (error) {
    console.error('Upload Error:', error);
    return sendError(res, 'Failed to process file upload.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
