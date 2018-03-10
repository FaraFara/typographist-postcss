const getNamesOfBreakpoints = require('./');
const { userConfig } = require('../../mocks');

describe('Utils of breakpoints', () => {
  describe('getNamesOfBreakpoints', () => {
    it('should get names of breakpoints', () => {
      expect(getNamesOfBreakpoints(userConfig)).toEqual([
        'tablet',
        'desktop',
        'lgDesktop',
        'xlDesktop',
      ]);
    });
  });
});