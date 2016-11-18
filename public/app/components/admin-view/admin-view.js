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

        avc.positions = []
        avc.employees = []
        avc.jobs = []
        avc.badges = []
        // avc.currentBadge = {}
        avc.BisualizeService.getAllPositions().then(data => { avc.positions = data })
        avc.BisualizeService.getAllEmployees().then(data => { avc.employees = data })
        avc.BisualizeService.getAllJobs().then(data => { avc.jobs = data })
        avc.BisualizeService.getAllBadges().then(data => { avc.badges = data })

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