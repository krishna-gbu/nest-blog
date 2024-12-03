import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export class mongoose_exception {
  static handle(error: any): void {
    if (error.name === 'ValidationError') {
      const message = this.formatValidationError(error);
      throw new BadRequestException(`Validation Error: ${message}`);
    }

    if (error.code === 11000) {
      const duplicatedKey = JSON.stringify(error.keyValue);
      throw new BadRequestException(`Duplicate key error: ${duplicatedKey}`);
    }

    if (error.name === 'CastError') {
      throw new BadRequestException(`Invalid ${error.path}: ${error.value}`);
    }

    // Handle custom service errors (e.g., "Name is required")
    if (error.message) {
      throw new BadRequestException(error.message);
    }

    // Generic fallback
    throw new InternalServerErrorException('An unexpected error occurred');
  }

  private static formatValidationError(error: any): string {
    return Object.values(error.errors || {})
      .map((err: any) => err.message)
      .join(', ');
  }
}
