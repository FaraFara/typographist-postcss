const { mediaAtrule } = require('../../atrules');
const cleanNode = require('../../utils/cleanNode');
const {
  getFirstBreakpoint,
  removeRoundBrackets,
} = require('../../../api/breakpoints');

const { variableDecl, fontSizeDecl } = require('../../decls');
const getRootRule = require('./getRootRule');
const { percentage } = require('../../../helpers');

/**
 * @param {Object} atrule @t-root atrule.
 * @param {Array<Object>} breakpoints Array of breakpoints object.
 * @return {void}
 */
module.exports = (atrule, breakpoints) => {
  const { parent } = atrule;
  const firstBreakpoint = getFirstBreakpoint(breakpoints);

  breakpoints
    .filter(b => b.value !== '0px')
    .reverse()
    .map(b =>
      parent.after(
        mediaAtrule({
          minWidth: b.value,
          nestedRule: getRootRule().append(
            fontSizeDecl(`${percentage(b.root)}%`),
          ),
        }),
      ),
    );
  breakpoints.filter(b => b.value !== '0px').map(b =>
    atrule.before(
      variableDecl({
        name: b.name,
        value: b.value,
      }),
    ),
  );

  const fontSize = `${percentage(firstBreakpoint.root)}%`;
  atrule.replaceWith(fontSizeDecl(fontSize));
};

/**
 * Let us know if the atrule name contains the value @t-root.
 * Is it specified without parameters, and whether its parent selector contains the value "root".
 *
 * @param {Object} atrule Css object.
 * @return {boolean} Contains or not.
 */
module.exports.test = atrule => {
  const { parent, params } = atrule;
  const isRootRule = parent.selector === ':root';
  const isEmptyParams = removeRoundBrackets(params) === '';

  return [parent, isRootRule, isEmptyParams].every(Boolean);
};
