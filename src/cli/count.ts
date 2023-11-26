import chalk from 'chalk';

/**
 * Utility function to format a count string.
 * @param count - The count to display.
 * @param type - The type of the count, will be written plural if count > 1.
 * @returns The formatted count string.
 */
export const count = (count: number, type: string) =>
  `${chalk.bold(`${chalk.yellow(count)} ${type}${count > 1 ? 's' : ''}`)}`;
