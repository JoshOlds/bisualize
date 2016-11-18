; (function () {

    angular.module('bisualize')

        .component('adminView', {
            controller: AdminViewController,
            templateUrl: '/app/components/admin-view/admin-view.html',
            controllerAs: 'avc'
        })

    AdminViewController.$inject = ['BisualizeService']

    function AdminViewController(BisualizeService) {

        let avc = this;
        avc.BisualizeService = BisualizeService;

        let positions = []
        let employees = []
        let jobs = []
        let badges = []
        avc.BisualizeService.getAllPositions().then(data => { positions = data })
        avc.BisualizeService.getAllEmployees().then(data => { employees = data })
        avc.BisualizeService.getAllJobs().then(data => { jobs = data })
        avc.BisualizeService.getAllBadges().then(data => { badges = data })

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
        }, {
            name: 'Positions'
        },
        {
            name: 'Jobs'
        },
        {
            name: 'Badges'
        }]

    }





} ())