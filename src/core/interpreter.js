/**
 * @file interpreter.js
 * Contains logic for the interpreter
 */

import state from './state.js';
import util from './util.js';

/**
 * Receives an event and an array of Bindings (element -> gesture handler) to determine
 * what event will be emitted. Called from the arbiter.
 * @param {Array} bindings - An array containing Binding objects that associate the element to an event handler.
 * @param {Object} event - The event emitted from the window.
 * @returns {null|Object} - null if a gesture will not be emitted, otherwise an Object with information
 * for the dispatcher.
 */
function interpreter(bindings, event) {
  var evType = util.normalizeEvent(event.type);
  var candidates = [];
  bindings.forEach(function (binding) {
    let result = binding.gesture[evType](state.inputs);
    if (result) {
      candidates.push({
        binding: binding,
        data: result
      });
    }
  });

  //TODO : Determine which gesture to emit, or all.
  if (candidates.length > 0) {
    return candidates[0];
  } else {
    return null;
  }

}

export default interpreter;