import { NotFoundException } from '@nestjs/common';

/**
 * This function checks if the value is empty. If it is empty, it throws a NotFoundException.
 * @param value any value to check if it is empty
 * @returns the value if it is not empty
 * @throws {NotFoundException} if the value is empty
 */
export const ifEmpty = (value: unknown) => {
  if (
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  ) {
    throw new NotFoundException('Data not found.');
  }
  return value;
};
