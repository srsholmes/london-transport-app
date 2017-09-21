const mock = {
  json() {
    return {
      ok: true,
      data: {
        test: 'data'
      }
    };
  },
};

global.fetch = jest.fn().mockImplementation(() => Promise.resolve(mock));
