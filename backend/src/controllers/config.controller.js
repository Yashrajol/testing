import { query } from '../config/db.js';
import { cryptoNativeUuid } from '../utils/helpers.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Get All System Configurations & Feature Flags
 */
export async function getFeatureFlags(req, res) {
  try {
    const dbConfigs = await query('SELECT config_key, config_value, description FROM system_configs');

    const fallbackFlags = {
      enable_slec_booking: true,
      enable_ai_diagnostic_v2: true,
      maintenance_mode: false,
      max_upload_size_mb: 25,
    };

    const flagsMap = {};
    if (dbConfigs.length > 0) {
      dbConfigs.forEach((cfg) => {
        flagsMap[cfg.config_key] = cfg.config_value === 'true' ? true : cfg.config_value === 'false' ? false : cfg.config_value;
      });
    }

    return sendSuccess(res, dbConfigs.length > 0 ? flagsMap : fallbackFlags, 'System feature flags retrieved.');
  } catch (error) {
    console.error('Get Feature Flags Error:', error);
    return sendError(res, 'Failed to fetch feature flags.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Create or Update Feature Flag
 */
export async function updateFeatureFlag(req, res) {
  try {
    const { key, value, description } = req.body;

    if (!key || value === undefined) {
      return sendError(res, 'Configuration key and value are required.', 400, 'VALIDATION_ERROR');
    }

    const strValue = String(value);
    const existing = await query('SELECT id FROM system_configs WHERE config_key = ?', [key.trim()]);

    if (existing.length > 0) {
      await query('UPDATE system_configs SET config_value = ?, description = COALESCE(?, description) WHERE config_key = ?', [
        strValue,
        description || null,
        key.trim(),
      ]);
    } else {
      const cfgId = cryptoNativeUuid();
      await query(
        'INSERT INTO system_configs (id, config_key, config_value, description) VALUES (?, ?, ?, ?)',
        [cfgId, key.trim(), strValue, description ? description.trim() : null]
      );
    }

    return sendSuccess(res, { key: key.trim(), value: strValue }, 'Feature flag updated successfully.');
  } catch (error) {
    console.error('Update Feature Flag Error:', error);
    return sendError(res, 'Failed to update feature flag.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
