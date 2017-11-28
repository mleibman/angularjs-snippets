function countWatchers() {
  var root = angular.element(document).injector().get('$rootScope');
  var count = root.$$watchers ? root.$$watchers.length : 0; // include the current scope
  var pendingChildHeads = [root.$$childHead];
  var currentScope;

  while (pendingChildHeads.length) {
    currentScope = pendingChildHeads.shift();

    while (currentScope) {
      count += currentScope.$$watchers ? currentScope.$$watchers.length : 0;
      pendingChildHeads.push(currentScope.$$childHead);
      currentScope = currentScope.$$nextSibling;
    }
  }

  return count;
}

countWatchers();
