import type { ControllerMethodPreRequestHandler } from '@bcms/selfhosted-backend/_server/rest/controller';
import { HttpStatus } from '@bcms/selfhosted-backend/_server/http-error';

import { JWTError } from '@bcms/selfhosted-backend/_server/modules/jwt/error';
import { JWTManager } from '@bcms/selfhosted-backend/_server/modules/jwt/manager';
import type { JWT } from '@bcms/selfhosted-backend/_server/modules/jwt/models';

export interface JwtPreRequestHandlerResult<Props = unknown> {
    token: JWT<Props>;
}

export function createJwtPreRequestHandler<Props = unknown>(config: {
    roles: string[];
}): ControllerMethodPreRequestHandler<JwtPreRequestHandlerResult<Props>> {
    return async ({ errorHandler, request }) => {
        const token = JWTManager.get<Props>({
            token: request.headers.authorization || '',
            roles: config.roles,
        });
        if (token instanceof JWTError) {
            throw errorHandler(HttpStatus.Forbidden, token.message);
        }
        return { token };
    };
}
