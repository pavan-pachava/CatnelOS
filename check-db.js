const postgres = require('postgres');
const fs = require('fs');

function getDatabaseUrl() {
  try {
    const envLocal = fs.readFileSync('.env.local', 'utf8');
    const match = envLocal.match(/DATABASE_URL=(.*)/);
    return match ? match[1].trim() : null;
  } catch (e) {
    return null;
  }
}

async function checkIntegrations() {
  const dbUrl = getDatabaseUrl();
  if (!dbUrl) {
    console.error('DATABASE_URL not found in .env.local');
    return;
  }

  const sql = postgres(dbUrl);
  try {
    const integrations = await sql`SELECT * FROM integrations`;
    console.log('Current Integrations count:', integrations.length);
    console.log('Integrations:', integrations);
    
    const users = await sql`SELECT id, email FROM users`;
    console.log('Users count:', users.length);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await sql.end();
  }
}

checkIntegrations();
