-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "timescaledb" CASCADE;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255),
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

-- Sessions table (for NextAuth)
CREATE TABLE IF NOT EXISTS sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP NOT NULL,
  session_token VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires ON sessions(expires);

-- Integrations table
CREATE TABLE IF NOT EXISTS integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL,
  access_token VARCHAR(500),
  refresh_token VARCHAR(500),
  expires_at TIMESTAMP,
  connected_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, provider)
);

CREATE INDEX idx_integrations_user_id ON integrations(user_id);
CREATE INDEX idx_integrations_provider ON integrations(provider);

-- Spotify events table (TimescaleDB hypertable)
CREATE TABLE IF NOT EXISTS spotify_events (
  time TIMESTAMP NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  track_id VARCHAR(255),
  track_name VARCHAR(255),
  artist_name VARCHAR(255),
  album_name VARCHAR(255),
  album_image_url VARCHAR(500),
  duration_ms INTEGER,
  played_at TIMESTAMP,
  features JSONB
);

SELECT create_hypertable('spotify_events', 'time', if_not_exists => TRUE);
CREATE INDEX idx_spotify_events_user_id ON spotify_events(user_id);

-- Metrics table (TimescaleDB hypertable)
CREATE TABLE IF NOT EXISTS metrics (
  time TIMESTAMP NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  energy_level INTEGER,
  mood VARCHAR(50),
  coding_minutes INTEGER,
  meeting_count INTEGER,
  focus_score INTEGER
);

SELECT create_hypertable('metrics', 'time', if_not_exists => TRUE);
CREATE INDEX idx_metrics_user_id ON metrics(user_id);

-- Sync logs table
CREATE TABLE IF NOT EXISTS sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider VARCHAR(50),
  last_synced_at TIMESTAMP,
  next_sync_at TIMESTAMP,
  event_count INTEGER,
  status VARCHAR(50),
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sync_logs_user_id ON sync_logs(user_id);
CREATE INDEX idx_sync_logs_provider ON sync_logs(provider);
