import { mongoose_exception } from '../filters/mongoose_exception.filter';

export function ErrorWrapper(): MethodDecorator {
  return (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ): void => {
    const originalMethod = descriptor.value;

    if (typeof originalMethod === 'function') {
      descriptor.value = async function (...args: any[]) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          // Delegate error handling to MongooseErrorHandler
          mongoose_exception.handle(error);
        }
      };
    }
  };
}
