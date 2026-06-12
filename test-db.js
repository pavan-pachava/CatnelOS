const postgres = require('postgres');

async function testConnection() {
  const sql = postgres({
    host: '127.0.0.1',
    port: 5444,
    database: 'pulseos',
    username: 'postgres',
    password: 'Pavan@12345'
  });
  
  try {
    const result = await sql`SELECT current_database(), current_user`;
    console.log('Success! Result:', result[0]);
    
    const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    console.log('Tables found:', tables.map(t => t.table_name).join(', '));
  } catch (err) {
    console.error('Connection failed:', err.message);
  } finally {
    await sql.end();
  }
}

testConnection();
