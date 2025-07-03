// Database schema definitions
// Replace with your actual database schema (Prisma, Drizzle, etc.)

export const schemas = {
  users: {
    tableName: 'users',
    columns: {
      id: 'varchar(255) primary key',
      name: 'varchar(255) not null',
      email: 'varchar(255) unique not null',
      createdAt: 'timestamp default current_timestamp',
      updatedAt: 'timestamp default current_timestamp on update current_timestamp',
    },
  },
} as const;

export type SchemaType = typeof schemas;
