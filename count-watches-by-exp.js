// Counts active watches and prints them out grouped by expression / function.
// Useful for analyzing the biggest contributors.


function countWatchers() {
  window.watchersByExp = {};
  window.watchersByFn = {};

  var root = angular.element(document).injector().get('$rootScope');
  var count = root.$$watchers ? root.$$watchers.length : 0; // include the current scope
  appendWatchers(root);
  var pendingChildHeads = [root.$$childHead];
  var currentScope;

  while (pendingChildHeads.length) {
    currentScope = pendingChildHeads.shift();

    while (currentScope) {
      appendWatchers(currentScope);
      count += currentScope.$$watchers ? currentScope.$$watchers.length : 0;
      pendingChildHeads.push(currentScope.$$childHead);
      currentScope = currentScope.$$nextSibling;
    }
  }

  console.log('Total watchers: ' + count);
  console.log('Watchers by exp:');
  console.table(Object.entries(window.watchersByExp));
  console.log('Watchers by fn:');
  console.table(Object.entries(window.watchersByFn));  
}


function appendWatchers(scope) {
  if (scope.$$watchers == null) { return; }
  scope.$$watchers.forEach(w => {
    window.watchersByExp[w.exp] = (window.watchersByExp[w.exp] || 0) + 1;
    window.watchersByFn[w.fn] = (window.watchersByFn[w.fn] || 0) + 1;
  });
};


countWatchers();
