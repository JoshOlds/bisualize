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
        avc.BisualizeService.getAllEmployees().then(data => {  avc.employees = data })
        avc.BisualizeService.getAllJobs().then(data => { avc.jobs = data })
        avc.BisualizeService.getAllBadges().then(data => { avc.badges = data })

        avc.activeView = 'Employees'
        avc.subActiveView = 'New'
        avc.views = [{
            name: 'Employees',
        }, {
            name: 'Positions'
        }, {
            name: 'Jobs'
        }, {
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
        avc.renewData = function () {
            avc.BisualizeService.getAllJobs().then(isActive(data, avc.jobs))
            avc.BisualizeService.getAllEmployees().then(isActive(data, avc.employees))
            avc.BisualizeService.getAllPositions().then(isActive(data, avc.positions))
            avc.BisualizeService.getAllBadges().then(isActive(data, avc.badges))
        }

        avc.updateJob = function (id, currentJob) {
            avc.BisualizeService.updateJob(id, currentJob)
                .then(function (data) {
                    if (data.message) {
                        avc.feedbackSuccess = true
                        avc.feedback = data.message
                        avc.showFeedback()
                    } else {
                        avc.feedbackFail = true
                        avc.feedback = data.error
                        avc.showFeedback()
                    }
                })
        }

        avc.addJob = function (title, description) {
            avc.BisualizeService.addJob(title, description)
                .then(function (data) {
                    if (data.message) {
                        avc.feedbackSuccess = true
                        avc.feedback = data.message
                        avc.showFeedback()
                    } else {
                        avc.feedbackFail = true
                        avc.feedback = data.error
                        avc.showFeedback()
                    }
                })
                .catch(function (data) {
                    avc.feedbackFail = true
                    avc.feedback = data.error
                    avc.showFeedback()
                })
        }

        avc.updateBadge = function (id, currentBadge) {
            avc.BisualizeService.updateBadge(id, currentBadge)
                .then(function (data) {
                    if (data.message) {
                        avc.feedbackSuccess = true
                        avc.feedback = data.message
                        avc.showFeedback()
                    } else {
                        avc.feedbackFail = true
                        avc.feedback = data.error
                        avc.showFeedback()
                    }
                })
        }

        avc.addBadge = function (title, description, image) {
            avc.BisualizeService.addBadge(title, description, image)
                .then(function (data) {
                    debugger
                    if (data.message) {
                        avc.feedbackSuccess = true
                        avc.feedback = data.message
                        avc.showFeedback()
                    } else {
                        avc.feedbackFail = true
                        avc.feedback = data.error
                        avc.showFeedback()
                    }
                })
                .catch(function (data) {
                    avc.feedbackFail = true
                    avc.feedback = data.error
                    avc.showFeedback()
                })
        }

        avc.updateEmployee = function (id, currentEmployee) {
            if (currentEmployee.terminate) {
                avc.BisualizeService.deleteEmployee(id)
                    .then(function (data) {
                        if (data.message) {
                            avc.feedbackSuccess = true
                            avc.feedback = data.message
                            avc.showFeedback()
                        } else {
                            avc.feedbackFail = true
                            avc.feedback = data.error
                            avc.showFeedback()
                        }
                    })
            }
            avc.BisualizeService.updateEmployee(id, currentEmployee)
                .then(function (data) {
                    if (data.message) {
                        avc.feedbackSuccess = true
                        avc.feedback = data.message
                        avc.showFeedback()
                    } else {
                        avc.feedbackFail = true
                        avc.feedback = data.error
                        avc.showFeedback()
                    }
                })
        }

        avc.addEmployee = function (name, image) {
            avc.BisualizeService.addEmployee(name, image)
                .then(function (data) {
                    if (data.message) {
                        avc.feedbackSuccess = true
                        avc.feedback = data.message
                        avc.showFeedback();
                    } else {
                        avc.feedbackFail = true
                        avc.feedback = data.error
                        avc.showFeedback()
                    }
                })
                .catch(function (data) {
                    avc.feedbackFail = true
                    avc.feedback = data.error
                    avc.showFeedback()
                })
        }

        avc.updatePosition = function updatePosition(id, updateData) {
            avc.BisualizeService.updatePosition(id, updateData)
                .then(function (data) {
                    debugger
                    if (data.message) {
                        avc.feedbackSuccess = true
                        avc.feedback = data.message
                        avc.showFeedback()
                    } else {
                        avc.feedbackFail = true
                        avc.feedback = data.error
                        avc.showFeedback()
                    }
                })
        }

        avc.addPosition = function (managerPositionId) {
            avc.BisualizeService.addPosition(managerPositionId)
                .then(function (data) {
                    debugger
                    if (data.message) {
                        avc.feedbackSuccess = true
                        avc.feedback = data.message
                        avc.showFeedback();
                    } else {
                        avc.feedbackFail = true
                        avc.feedback = data.error
                        avc.showFeedback()
                    }
                })
                .catch(function (data) {
                    avc.feedbackFail = true
                    avc.feedback = data.error
                    avc.showFeedback()
                })
        }

        //Shows feedback message for 5 seconds
        avc.showFeedback = function () {
            update()
            setTimeout(function () {
                avc.feedbackFail = false;
                avc.feedbackSuccess = false;
                update()
                avc.renewData()
            }, 5000)
        }

        //hides inactive objects
        function isActive(data, type){
            for (var i = 0; i < data.length; i++) {
                var object = data[i];
                if(object.active){
                    avc.type.push(object)
                }
            }
        }
        


    }





} ())