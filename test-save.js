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

async function testSaveIntegration() {
  const dbUrl = getDatabaseUrl();
  const sql = postgres(dbUrl);
  
  try {
    const users = await sql`SELECT id FROM users LIMIT 1`;
    if (users.length === 0) {
      console.error('No users found to test with');
      return;
    }
    const userId = users[0].id;
    console.log('Testing with user ID:', userId);

    await sql`
      INSERT INTO integrations (user_id, provider, access_token, refresh_token, expires_at)
      VALUES (${userId}, 'spotify', 'test_access', 'test_refresh', ${new Date(Date.now() + 3600000)})
      ON CONFLICT (user_id, provider)
      DO UPDATE SET
        access_token = EXCLUDED.access_token,
        refresh_token = EXCLUDED.refresh_token,
        expires_at = EXCLUDED.expires_at,
        updated_at = NOW()
    `;
    
    console.log('Integration saved successfully in test script');
    const check = await sql`SELECT * FROM integrations WHERE user_id = ${userId} AND provider = 'spotify'`;
    console.log('Verification check:', check);

    // Clean up
    await sql`DELETE FROM integrations WHERE user_id = ${userId} AND provider = 'spotify'`;
    console.log('Test record cleaned up');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await sql.end();
  }
}

testSaveIntegration();
