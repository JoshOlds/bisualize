(function () {

angular.module('bisualize')
    .config(function($stateProvider, $sceProvider, $urlRouterProvider) {
            $sceProvider.enabled(false);

        $stateProvider
            .state({
                name: 'empView',
                url: '/mypage/?employeeId',
                template: '<emp-view></emp-view>' 
            })

            .state({
                name: 'adminView',
                url: '/admin',
                template: '<admin-view></admin-view>'         
            })

              .state({
                name: 'orgView',
                url: '/orgchart',
                template: '<org-view></org-view>'         
            })

            .state({
                name: 'readView',
                url: '/readme',
                template: '<read-view></read-view>'         
            })

            // $urlRouterProvider.otherwise('/mypage')



    })





    
})();