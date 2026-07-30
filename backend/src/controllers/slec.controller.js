import { query } from '../config/db.js';
import { cryptoNativeUuid } from '../utils/helpers.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Get All SLEC Physical Prototyping Laboratories
 */
export async function getLabs(req, res) {
  try {
    const dbLabs = await query('SELECT * FROM slec_labs ORDER BY created_at ASC');

    const fallbackLabs = [
      { id: 'lab-1', name: 'robotics-ai', title: 'Robotics & Artificial Intelligence Lab', description: 'Autonomous rover navigation, Computer Vision models, and robotic arm assembly.', image_url: '/assets/images/classroom-sec.png', active_projects_count: 12 },
      { id: 'lab-2', name: 'iot-embedded', title: 'IoT & Smart Sensors Studio', description: 'Microcontroller circuits, environmental telemetry, and smart city prototyping.', image_url: '/assets/images/hero-bg-4.png', active_projects_count: 8 },
      { id: 'lab-3', name: 'design-fab', title: '3D Design & Rapid Fabrication Workshop', description: 'CAD modeling, resin 3D printing, and laser CNC fabrication.', image_url: '/assets/images/classroom-sec.png', active_projects_count: 15 },
      { id: 'lab-4', name: 'biotech', title: 'Biotechnology & Environmental Lab', description: 'Hydroponics automation, micro-algae filtration, and DNA extraction setups.', image_url: '/assets/images/hero-bg-4.png', active_projects_count: 6 },
      { id: 'lab-5', name: 'ar-vr', title: 'AR/VR Spatial Simulation Studio', description: 'Unity 3D simulations, virtual surgery walkthroughs, and spatial physics modeling.', image_url: '/assets/images/classroom-sec.png', active_projects_count: 9 },
      { id: 'lab-6', name: 'energy', title: 'Renewable Energy & Clean Tech Studio', description: 'Solar tracker circuits, hydrogen fuel cell models, and kinetic energy harvesting.', image_url: '/assets/images/hero-bg-4.png', active_projects_count: 7 },
    ];

    const labs = dbLabs.length > 0 ? dbLabs : fallbackLabs;

    return sendSuccess(res, labs, 'SLEC labs fetched successfully.');
  } catch (error) {
    console.error('Get Labs Error:', error);
    return sendError(res, 'Failed to fetch SLEC laboratories.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Get Specific Lab Detail by ID or Name
 */
export async function getLabById(req, res) {
  try {
    const { id } = req.params;

    const dbRows = await query('SELECT * FROM slec_labs WHERE id = ? OR name = ?', [id, id]);
    if (dbRows.length > 0) {
      const lab = dbRows[0];
      const projects = await query('SELECT * FROM slec_projects WHERE lab_id = ? ORDER BY created_at DESC', [lab.id]);
      return sendSuccess(res, { ...lab, projects }, 'SLEC lab details retrieved.');
    }

    const mockLab = {
      id,
      name: 'robotics-ai',
      title: 'Robotics & Artificial Intelligence Lab',
      description: 'Autonomous rover navigation, Computer Vision models, and robotic arm assembly.',
      image_url: '/assets/images/classroom-sec.png',
      active_projects_count: 12,
      equipment: ['NVIDIA Jetson Nano Kits', '6-DOF Robotic Arms', 'LiDAR Sensor Arrays', '3D Scanners'],
      projects: [
        { id: 'p1', title: 'Autonomous Trash Sorting Rover', progress: 85, status: 'TESTING' },
        { id: 'p2', title: 'Gesture-Controlled Drone Assembly', progress: 40, status: 'PROTOTYPING' },
      ],
    };

    return sendSuccess(res, mockLab, 'SLEC lab details retrieved.');
  } catch (error) {
    console.error('Get Lab Detail Error:', error);
    return sendError(res, 'Failed to fetch lab details.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Get Logged-In Student's Prototyping Projects
 */
export async function getMyProjects(req, res) {
  try {
    const userId = req.user.id;

    const projects = await query(
      `SELECT p.id, p.title, p.description, p.status, p.progress, p.created_at, l.title as lab_name
       FROM slec_projects p
       JOIN slec_labs l ON p.lab_id = l.id
       WHERE p.user_id = ?
       ORDER BY p.created_at DESC`,
      [userId]
    );

    const fallbackProjects = [
      { id: 'p1', title: 'Autonomous Trash Sorting Rover', lab_name: 'Robotics & Artificial Intelligence Lab', progress: 85, status: 'TESTING' },
      { id: 'p2', title: 'Solar Tracker Array Controller', lab_name: 'Renewable Energy & Clean Tech Studio', progress: 100, status: 'COMPLETED' },
    ];

    return sendSuccess(res, projects.length > 0 ? projects : fallbackProjects, 'My prototyping projects retrieved.');
  } catch (error) {
    console.error('Get My Projects Error:', error);
    return sendError(res, 'Failed to fetch projects.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Submit New Prototyping Project
 */
export async function createProject(req, res) {
  try {
    const userId = req.user.id;
    const { labId, title, description } = req.body;

    if (!labId || !title) {
      return sendError(res, 'Laboratory ID and Project Title are required.', 400, 'VALIDATION_ERROR');
    }

    const projectId = cryptoNativeUuid();

    await query(
      `INSERT INTO slec_projects (id, user_id, lab_id, title, description, status, progress) VALUES (?, ?, ?, ?, ?, 'PROTOTYPING', 0)`,
      [projectId, userId, labId, title.trim(), description ? description.trim() : null]
    );

    // Increment lab project counter
    await query('UPDATE slec_labs SET active_projects_count = active_projects_count + 1 WHERE id = ?', [labId]);

    const newProject = {
      id: projectId,
      userId,
      labId,
      title: title.trim(),
      description,
      status: 'PROTOTYPING',
      progress: 0,
    };

    return sendSuccess(res, newProject, 'SLEC prototyping project created successfully.', 201);
  } catch (error) {
    console.error('Create Project Error:', error);
    return sendError(res, 'Failed to create project.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
