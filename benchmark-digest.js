angular.element(document).injector().invoke(function($rootScope) { 
 const iterations = 100;
 console.profile('digest');
 for (var i = 0; i < iterstions; i++) { $rootScope.$apply(); }
 console.profileEnd('digest');
})
