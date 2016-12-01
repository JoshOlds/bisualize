;(function (){

    angular.module('bisualize')

    .component('readView',{
        controller: ReadViewController,
        templateUrl: '/app/components/read-view/read-view.html',
        controllerAs: 'rvc'
    })


AdminViewController.$inject = ['BisualizeService']

    function ReadViewController(BisualizeService){

        let rvc = this;

        rvc.views = [
            {
                name: 'How To Guide'
            },
            {
                name: 'Project Description'
            }
        ]



    }



    

}())