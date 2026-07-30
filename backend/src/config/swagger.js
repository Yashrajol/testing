/**
 * OpenAPI 3.0 Specification Definition for VEDHKRIT Backend Service
 */
export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'VEDHKRIT Learner Development OS — Backend API',
    version: '1.0.0',
    description:
      "Production-ready Node.js & MySQL RESTful API suite for India's AI-Powered Learner Development Operating System.",
    contact: {
      name: 'VEDHKRIT Engineering Team',
      email: 'tech@vedhkrit.edu',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000/api/v1',
      description: 'Local Development Server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ApiResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: { type: 'object', nullable: true },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phoneNumber: { type: 'string', nullable: true },
          role: {
            type: 'string',
            enum: ['STUDENT', 'PARENT', 'TEACHER', 'MENTOR', 'SCHOOL_ADMIN', 'SUPERADMIN'],
          },
          status: { type: 'string', enum: ['PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED'] },
        },
      },
      Goal: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          category: { type: 'string' },
          progress: { type: 'integer', minimum: 0, maximum: 100 },
          status: { type: 'string', enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'] },
        },
      },
      SlecLab: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          activeProjectsCount: { type: 'integer' },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        summary: 'Service Health Check',
        responses: {
          200: { description: 'Server operational status' },
        },
      },
    },
    '/auth/register': {
      post: {
        summary: 'Register New Multi-Role User Account',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password', 'role'],
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                  role: { type: 'string', example: 'STUDENT' },
                },
              },
            },
          },
        },
        responses: { 201: { description: 'Account registered and OTP dispatched' } },
      },
    },
    '/auth/login': {
      post: {
        summary: 'User Login & Access Token Generation',
        responses: { 200: { description: 'Authenticated successfully with JWT tokens' } },
      },
    },
    '/student-portal/{id}/overview': {
      get: {
        summary: 'Get Student Dashboard Overview Metrics',
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'Growth score, radar metrics, and active goals' } },
      },
    },
    '/slec/labs': {
      get: {
        summary: 'List All 6 Physical SLEC Laboratories',
        responses: { 200: { description: 'Array of SLEC prototyping labs' } },
      },
    },
    '/mentoring/mentors': {
      get: {
        summary: 'List Available Mentors',
        responses: { 200: { description: 'Array of active mentors' } },
      },
    },
    '/config/flags': {
      get: {
        summary: 'Get Runtime System Feature Flags',
        responses: { 200: { description: 'Map of feature flags' } },
      },
    },
  },
};
