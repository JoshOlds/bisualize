(function () {

angular.module('bisualize')
    .config(function($stateProvider, $sceProvider, $urlRouterProvider) {
            $sceProvider.enabled(false);

        $stateProvider
            .state({
                name: 'empView',
                url: '/mypage',
                template: '<emp-view></emp-view>' 
            })

            .state({
                name: 'adminView',
                url: '/admin',
                template: '<admin-view></admin-view>'         
            })


            $urlRouterProvider.otherwise('/mypage')



    })





    
})();