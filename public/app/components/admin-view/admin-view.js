;(function (){

    angular.module('bisualize')

    .component('adminView',{
        controller: AdminViewController,
        templateUrl: '/app/components/admin-view/admin-view.html',
        controllerAs: 'avc'
    })

    function AdminViewController(){

        let avc = this;

        avc.activeView = 'Employees'
        avc.subActiveView = 'New'

        avc.name = ''
        avc.image = ''
        avc.jobId = ''
        avc.positionId = ''
        avc.badgeId = ''
        avc.title = ''
        avc.description = ''
        avc.managerPositionId = ''


        avc.views = [{
            name: 'Employees',
        },{
            name: 'Positions'
        },
        {
            name: 'Jobs'
        },
        {
            name: 'Badges'
        }]



    }



    

}())