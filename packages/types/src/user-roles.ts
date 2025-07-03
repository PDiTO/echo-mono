// New file to test auto-rebuild functionality

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

// Note: UserWithRole will be defined when User interface is available
// For now, just export the enum
export interface RolePermissions {
  role: UserRole;
  permissions: string[];
}
// Adding a comment to trigger rebuild
