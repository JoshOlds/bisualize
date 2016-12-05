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

        rvc.activeView = 'Project Details'
        rvc.subActiveView = 'My Page'
        rvc.views = [{
                name: 'Project Details'
            },{
                name: 'How To Use'
            }]



    }



    

}())