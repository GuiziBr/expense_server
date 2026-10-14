import { createParamDecorator } from "@nestjs/common";
export const CurrentUser = createParamDecorator((_data, context) => context.switchToHttp().getRequest().userId);
//# sourceMappingURL=current-user.decorator.js.map