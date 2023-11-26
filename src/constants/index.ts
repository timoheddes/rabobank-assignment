export const Constants = {
  IO: {
    Errors: {
      file: (type: string = 'file') =>
        `Error reading ${type}${type === 'file' ? ' file' : ''}`,
      folder: 'Error reading directory',
    },
  },
  Records: {
    Errors: {
      duplicate: 'Duplicate reference',
      incorrectEndBalance: 'Incorrect end balance',
    },
  },
  Report: {
    Errors: {
      failed: 'Failed to generate report',
    },
  },
};
