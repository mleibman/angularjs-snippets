/**
 * Instrument route resolvers to time them and visualize on the performance timeline in Chrome DevTools.
 */

angular.element(document).injector().invoke(($injector, $rootScope) => {
  const patchedSymbol = Symbol('patched');
  
  $rootScope.$on('$routeChangeStart', (e, next, current) => {
    if (!next.resolve) return;
    
    Object.keys(next.resolve).forEach(key => {
      const resolver = next.resolve[key];
      if (resolver[patchedSymbol]) return;
      
      next.resolve[key] = () => {
        const name = `resolve: ${key}`;
        console.time(name);
        
        const result = angular.isString(resolver) ?
          $injector.get(resolver) :
          $injector.invoke(resolver, null, null, key);
          
          if (result && result.then) {
            result.then(() => console.timeEnd(name));
          } else {
            console.timeEnd(name)
          }
          
        return result;
      };
      next.resolve[key][patchedSymbol] = true;
    });
  });
});
