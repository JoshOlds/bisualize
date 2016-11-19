; (function () {

    angular.module('bisualize')

        .component('adminView', {
            controller: AdminViewController,
            templateUrl: '/app/components/admin-view/admin-view.html',
            controllerAs: 'avc'
        })

    AdminViewController.$inject = ['$scope', 'BisualizeService']

    function AdminViewController($scope, BisualizeService) {

        let avc = this;
        avc.BisualizeService = BisualizeService;

        avc.positions = []
        avc.employees = []
        avc.jobs = []
        avc.badges = []
        
        avc.BisualizeService.getAllPositions().then(data => { avc.positions = data })
        avc.BisualizeService.getAllEmployees().then(data => { avc.employees = data })
        avc.BisualizeService.getAllJobs().then(data => { avc.jobs = data })
        avc.BisualizeService.getAllBadges().then(data => { avc.badges = data })

        avc.activeView = 'Employees'
        avc.subActiveView = 'New'
        avc.views = [{
            name: 'Employees',
            },{
            name: 'Positions'
            },{
            name: 'Jobs'
            },{
            name: 'Badges'
            }]

        avc.name = ''
        avc.image = ''
        avc.jobId = ''
        avc.positionId = ''
        avc.badgeId = ''
        avc.title = ''
        avc.description = ''
        avc.managerPositionId = ''

        //Shows results of Posts and Puts to Server
        avc.feedbackSuccess = false
        avc.feedbackFail = false
        avc.feedback

        //Updates screen right away Required due to Angular Update frequency 
        function update() {
            $scope.$evalAsync()
        }
        //Renews active data after "new" things are added to each array
        avc.renewData = function(){
            avc.BisualizeService.getAllJobs().then(data => { avc.jobs = data; update()})
            avc.BisualizeService.getAllEmployees().then(data => { avc.employees = data; update() })
            avc.BisualizeService.getAllJobs().then(data => { avc.jobs = data; update() })
            avc.BisualizeService.getAllBadges().then(data => { avc.badges = data; update() })
        }

        avc.updateJob = function (id, currentJob) {
            avc.BisualizeService.updateJob(id, currentJob)
                .then(function (data) {
                    if (data.message) {
                        avc.feedbackSuccess = true
                        avc.feedback = data.message
                        console.log(data.message)
                        avc.showFeedback()
                    } else {
                        avc.feedbackFail = true
                        avc.feedback = data.error
                        console.log(data.error)
                        avc.showFeedback()
                    }
                })
        }

        avc.updateBadge = function (id, currentBadge) {
            avc.BisualizeService.updateBadge(id, currentBadge)
                .then(function (data) {
                    if (data.message) {
                        avc.feedbackSuccess = true
                        avc.feedback = data.message
                        console.log(data.message)
                        avc.showFeedback()
                    } else {
                        avc.feedbackFail = true
                        avc.feedback = data.error
                        console.log(data.error)
                        avc.showFeedback()
                    }
                })
        }

        avc.updateEmployee = function (id, currentEmployee) {
            avc.BisualizeService.updateEmployee(id, currentEmployee)
                .then(function (data) {
                    if (data.message) {
                        avc.feedbackSuccess = true
                        avc.feedback = data.message
                        console.log(data.message)
                        avc.showFeedback()
                    } else {
                        avc.feedbackFail = true
                        avc.feedback = data.error
                        console.log(data.error)
                        avc.showFeedback()
                    }
                })
        }

        //Shows feedback message for 5 seconds
        avc.showFeedback = function () {            
            update();
            setTimeout(function () {
                avc.feedbackFail = false;
                avc.feedbackSuccess = false;
                update();
            }, 5000)
        }



    }





} ())