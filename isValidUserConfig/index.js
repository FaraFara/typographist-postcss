const { flatten } = require('lodash');
const { isValidRatios } = require('./isValidRatioField');
const { findAll } = require('../helpers');
const {
  isBaseString,
  isBaseContainPxOrEm,
  isValidBases,
} = require('./isValidBaseField');
const isValidLineHeightField = require('./isValidLineHeightField');
const {
  breakpointIsString,
  breakpointHasPxOrEm,
  isValidBreakpointsField,
  getBreakpoints,
  breakpointHasBreakpointKey,
} = require('./isValidBreakpointsField');

/**
 * @param {array<object>}
 * @return {boolean}
 */
const isValidUserConfig = config => {
  const bases = flatten(findAll(config, 'base'));
  const lineHeights = findAll(config, 'lineHeight');
  const ratios = findAll(config, 'ratio');
  const breaks = findAll(config, 'breakpoint');
  const breakpoints = getBreakpoints(config);

  return [
    isValidBases(bases, isBaseString),
    isValidBases(bases, isBaseContainPxOrEm),
    isValidLineHeightField(lineHeights),
    isValidRatios(ratios),
    isValidBreakpointsField(breakpoints, breakpointHasBreakpointKey),
    isValidBreakpointsField(breaks, breakpointIsString),
    isValidBreakpointsField(breaks, breakpointHasPxOrEm),
  ].every(Boolean);
};

module.exports = isValidUserConfig;
