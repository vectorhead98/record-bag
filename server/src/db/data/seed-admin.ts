import db from "../sqlite"

// from root dir. => bun server/src/db/data/seed-admin.ts

const { email, username, password, country } = {
  email: process.env.SEED_ADMIN_EMAIL,
  username: process.env.SEED_ADMIN_USERNAME,
  password: process.env.SEED_ADMIN_PASSWORD,
  country: process.env.SEED_ADMIN_COUNTRY,
}

if (!email || !username || !password || !country) {
  throw new Error(`Missing seed credentials`)
}

const passwordHash = await Bun.password.hash(password)

db.run(
  `
  INSERT OR IGNORE INTO users (email, username, password_hash, country, admin)
  VALUES (?, ?, ?, ?, '1')
  `,
  [email, username, passwordHash, country]
)
