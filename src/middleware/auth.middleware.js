import { UnauthorizedException } from '@nestjs/common';

class AuthorizationMiddleware {
  use(req, res, next) {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }
    

    next();
  }
}

export default { AuthorizationMiddleware };