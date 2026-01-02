// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/guards/admin-action.guard.ts
// Generated: 2025-12-31T15:40:29.220Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

/**
 * Guard to ensure only ADMIN or SUPER_ADMIN users can perform certain actions
 * Use this guard on routes that modify media approval status, publish, or delete
 *
 * Usage:
 * @UseGuards(JwtAuthGuard, AdminActionGuard)
 * @Post('genres/:id/images/:imageId/approve')
 * async approveGenreImage() { ... }
 */
@Injectable()
export class AdminActionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Only ADMIN or SUPER_ADMIN can perform admin actions
    const isAdmin =
      user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN;

    if (!isAdmin) {
      throw new ForbiddenException(
        'Only administrators can approve, publish, or delete media',
      );
    }

    return true;
  }
}
