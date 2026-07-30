import http from 'http';

const BASE_URL = 'http://localhost:5000/api/v1';

async function makeRequest(path, method = 'GET', body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${BASE_URL}${path}`);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTestSuite() {
  console.log('🧪 Starting VEDHKRIT Master Backend Integration Test Suite (Super Admin Control Center)...\n');
  let passed = 0;
  let failed = 0;

  async function assertTest(name, fn) {
    try {
      await fn();
      console.log(`  ✅ [PASS] ${name}`);
      passed++;
    } catch (error) {
      console.error(`  ❌ [FAIL] ${name}: ${error.message}`);
      failed++;
    }
  }

  // 1. Health Check
  await assertTest('Health Check Endpoint (/api/v1/health)', async () => {
    const res = await makeRequest('/health');
    if (res.status !== 200 || res.body.data?.status !== 'UP') {
      throw new Error(`Expected HTTP 200 UP, got ${res.status}`);
    }
  });

  // 2. Student Dashboard Gateway Endpoint
  await assertTest('Student Dashboard Gateway Aggregator (/api/v1/gateway/dashboard/student/student-123)', async () => {
    const res = await makeRequest('/gateway/dashboard/student/student-123');
    if (res.status !== 200 || !res.body.data?.profile?.schoolName || !Array.isArray(res.body.data?.todaysLessons)) {
      throw new Error(`Expected complete StudentDashboardResponse payload, got status ${res.status}`);
    }
  });

  // 3. Parent Overview Endpoint
  await assertTest('Parent Dashboard Overview (/api/v1/parent/overview)', async () => {
    const res = await makeRequest('/parent/overview');
    if (res.status !== 200 || !res.body.data?.studentName || !Array.isArray(res.body.data?.upcomingEvents)) {
      throw new Error(`Expected complete ParentOverview payload, got status ${res.status}`);
    }
  });

  // 4. Teacher Overview Endpoint
  await assertTest('Teacher Dashboard Overview (/api/v1/teacher/overview)', async () => {
    const res = await makeRequest('/teacher/overview');
    if (res.status !== 200 || !res.body.data?.teacherName || !Array.isArray(res.body.data?.assignedCohorts)) {
      throw new Error(`Expected complete TeacherOverview payload, got status ${res.status}`);
    }
  });

  // 5. School Admin Overview Endpoint
  await assertTest('School Admin Dashboard (/api/v1/admin/dashboard)', async () => {
    const res = await makeRequest('/admin/dashboard');
    if (res.status !== 200 || !res.body.data?.stats?.totalStudents || !Array.isArray(res.body.data?.monthlyGrowth)) {
      throw new Error(`Expected complete AdminDashboard payload, got status ${res.status}`);
    }
  });

  // 6. Super Admin Control Center Endpoint
  await assertTest('Super Admin Control Center (/api/v1/super-admin/dashboard)', async () => {
    const res = await makeRequest('/super-admin/dashboard');
    if (res.status !== 200 || !res.body.data?.stats?.mrr || !Array.isArray(res.body.data?.organizations)) {
      throw new Error(`Expected complete PlatformDashboard payload, got status ${res.status}`);
    }
  });

  // 7. Super Admin System Health Endpoint
  await assertTest('Super Admin System Health (/api/v1/super-admin/system-health)', async () => {
    const res = await makeRequest('/super-admin/system-health');
    if (res.status !== 200 || !res.body.data?.databaseHealth) {
      throw new Error(`Expected system health telemetry, got status ${res.status}`);
    }
  });

  // 8. Feature Flags
  await assertTest('Feature Flags Endpoint (/api/v1/config/flags)', async () => {
    const res = await makeRequest('/config/flags');
    if (res.status !== 200 || !res.body.success) {
      throw new Error(`Expected HTTP 200, got ${res.status}`);
    }
  });

  // 9. OpenAPI Docs JSON
  await assertTest('OpenAPI 3.0 Docs Spec (/api/v1/docs/json)', async () => {
    const res = await makeRequest('/docs/json');
    if (res.status !== 200 || res.body.openapi !== '3.0.3') {
      throw new Error(`Expected OpenAPI 3.0.3 spec, got status ${res.status}`);
    }
  });

  // 10. Prometheus Telemetry Metrics
  await assertTest('Prometheus Telemetry Metrics (/api/v1/metrics)', async () => {
    const res = await makeRequest('/metrics');
    if (res.status !== 200 || typeof res.body !== 'string' || !res.body.includes('node_process_uptime_seconds')) {
      throw new Error(`Expected Prometheus metrics text, got status ${res.status}`);
    }
  });

  console.log(`\n📊 Master Test Suite Results: ${passed} PASSED, ${failed} FAILED.`);
  process.exit(failed > 0 ? 1 : 0);
}

runTestSuite();
