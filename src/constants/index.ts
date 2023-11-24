export const Constants = {
  Errors: {
    file: (type: string = 'file') =>
      `Error reading ${type}${type === 'file' ? ' file' : ''}`,
    folder: 'Error reading directory',
  },
  Records: {
    Errors: {
      duplicate: 'Duplicate reference',
      incorrectEndBalance: 'Incorrect end balance',
    },
  },
};
