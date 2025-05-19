import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { createPool } from "mysql2/promise";

// import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  trustedOrigins: [process.env.AUTH_URL || ""],
  //   database: drizzleAdapter(db, {
  //     provider: "pg",
  //     usePlural: true,
  //   }),
  database: createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT),
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [openAPI()],
});
