import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_CONNECTION_STRING!);


// See https://neon.com/docs/serverless/serverless-driver
// for more information