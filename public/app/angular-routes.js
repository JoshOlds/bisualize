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
                name: 'album',
                url: '/album/:albumId',
                template: '<album></album>'         
            })


            $urlRouterProvider.otherwise('/mypage')



    })





    
})();