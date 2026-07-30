-- VEDHKRIT Learner Development OS - Initial Data Seed Script

-- 1. Default Diagnostic Assessments
INSERT IGNORE INTO assessments (id, title, category, description, duration_minutes, total_questions) VALUES
('asm-1', 'Cognitive & Learning Style Diagnostic', 'Foundational', 'Analyzes visual, auditory, and kinesthetic learning tendencies.', 20, 15),
('asm-2', 'SLEC STEM Aptitude Index', 'Technical Focus', 'Measures logical reasoning, mathematical pattern recognition, and problem solving.', 30, 20),
('asm-3', 'Leadership & Emotional Quotient (EQ)', 'Soft Skills', 'Evaluates peer interaction skills, emotional resilience, and team dynamics.', 25, 12);

-- 2. Default CMS Page Data
INSERT IGNORE INTO cms_pages (id, slug, title, content) VALUES
('cms-1', 'about', 'Why Vedhkrit', JSON_OBJECT(
  'heroTitle', 'Empowering India''s Next Generation of Innovators',
  'heroSubtitle', 'AI-Powered Learner Development Operating System',
  'mission', 'Transforming foundational education through holistic SLEC diagnostic frameworks.'
)),
('cms-2', 'framework', 'ILDF Framework & SLEC Labs', JSON_OBJECT(
  'title', 'Integrated Learner Development Framework',
  'description', 'Bridging academic theory with physical prototyping laboratories across 6 specialized SLEC labs.'
)),
('cms-3', 'assessment', 'AI Diagnostic Assessment Engine', JSON_OBJECT(
  'title', 'Multi-Dimensional Growth Diagnostics',
  'description', 'Comprehensive 360-degree evaluation system mapping cognitive agility, consistency, and leadership.'
));

-- 3. Default SLEC Prototyping Laboratories
INSERT IGNORE INTO slec_labs (id, name, title, description, image_url, active_projects_count) VALUES
('lab-1', 'robotics-ai', 'Robotics & Artificial Intelligence Lab', 'Autonomous rover navigation, Computer Vision models, and robotic arm assembly.', '/assets/images/classroom-sec.png', 12),
('lab-2', 'iot-embedded', 'IoT & Smart Sensors Studio', 'Microcontroller circuits, environmental telemetry, and smart city prototyping.', '/assets/images/hero-bg-4.png', 8),
('lab-3', 'design-fab', '3D Design & Rapid Fabrication Workshop', 'CAD modeling, resin 3D printing, and laser CNC fabrication.', '/assets/images/classroom-sec.png', 15),
('lab-4', 'biotech', 'Biotechnology & Environmental Lab', 'Hydroponics automation, micro-algae filtration, and DNA extraction setups.', '/assets/images/hero-bg-4.png', 6),
('lab-5', 'ar-vr', 'AR/VR Spatial Simulation Studio', 'Unity 3D simulations, virtual surgery walkthroughs, and spatial physics modeling.', '/assets/images/classroom-sec.png', 9),
('lab-6', 'energy', 'Renewable Energy & Clean Tech Studio', 'Solar tracker circuits, hydrogen fuel cell models, and kinetic energy harvesting.', '/assets/images/hero-bg-4.png', 7);

-- 4. Default System Configuration & Feature Flags
INSERT IGNORE INTO system_configs (id, config_key, config_value, description) VALUES
('cfg-1', 'enable_slec_booking', 'true', 'Allows students to submit projects and book SLEC lab slots'),
('cfg-2', 'enable_ai_diagnostic_v2', 'true', 'Enables 360-degree radar score calculation engine'),
('cfg-3', 'maintenance_mode', 'false', 'Global maintenance mode status indicator');


