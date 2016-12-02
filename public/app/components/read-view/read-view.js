;(function (){

    angular.module('bisualize')

    .component('readView',{
        controller: ReadViewController,
        templateUrl: '/app/components/read-view/read-view.html',
        controllerAs: 'rvc'
    })


ReadViewController.$inject = ['BisualizeService']

    function ReadViewController(BisualizeService){

        let rvc = this;

        rvc.activeView = 'How To Use'
        rvc.subActiveView = 'My Page'
        rvc.views = [{
                name: 'How To Use'
            },{
                name: 'Project Details'
            }]



    }



    

}())