import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runSetup() {
  console.log('🚀 Starting VEDHKRIT Database Full Setup...\n');

  const conn = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'vedhkrit_db',
  });

  // Disable FK checks to allow out-of-order table creation
  await conn.query('SET FOREIGN_KEY_CHECKS = 0;');
  await conn.query('SET SESSION sql_mode = "NO_ENGINE_SUBSTITUTION";');

  const schemaPath = path.join(__dirname, 'src', 'config', 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

  // Parse statements properly — split on ; but avoid comment lines
  const statements = schemaSql
    .split('\n')
    .filter(line => !line.trim().startsWith('--') && !line.trim().startsWith('#'))
    .join('\n')
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  console.log(`📋 Executing ${statements.length} schema statements (FK checks disabled)...`);
  let ok = 0;
  let failed = 0;
  for (const stmt of statements) {
    try {
      await conn.query(stmt);
      ok++;
    } catch (e) {
      if (!e.message.includes('already exists')) {
        console.warn(`  ⚠️ Warning [${e.code}]: ${e.message.substring(0, 100)}`);
        failed++;
      } else {
        ok++;
      }
    }
  }

  // Re-enable FK checks
  await conn.query('SET FOREIGN_KEY_CHECKS = 1;');
  console.log(`  ✅ Schema: ${ok} succeeded, ${failed} errors.\n`);

  // List all tables created
  const [tables] = await conn.query('SHOW TABLES;');
  const tableNames = tables.map(t => Object.values(t)[0]);
  console.log(`📊 All tables now in vedhkrit_db (${tableNames.length} total):`);
  tableNames.forEach((name, i) => console.log(`  ${i + 1}. ${name}`));

  // Run Seed if present
  const seedPath = path.join(__dirname, 'src', 'config', 'seed.sql');
  if (fs.existsSync(seedPath)) {
    const seedSql = fs.readFileSync(seedPath, 'utf-8');
    const seedStatements = seedSql
      .split('\n')
      .filter(line => !line.trim().startsWith('--') && !line.trim().startsWith('#'))
      .join('\n')
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (seedStatements.length > 0) {
      console.log(`\n🌱 Executing ${seedStatements.length} seed statements...`);
      let seedOk = 0;
      for (const stmt of seedStatements) {
        try {
          await conn.query(stmt);
          seedOk++;
        } catch (e) {
          if (!e.message.includes('Duplicate entry')) {
            console.warn(`  ⚠️ Seed warning: ${e.message.substring(0, 80)}`);
          } else {
            seedOk++;
          }
        }
      }
      console.log(`  ✅ Seed: ${seedOk} succeeded.\n`);
    }
  }

  await conn.end();
  console.log('\n🎉 VEDHKRIT Database fully initialized and ready for connections!');
}

runSetup().catch((e) => {
  console.error('❌ Setup failed:', e.message);
  process.exit(1);
});
