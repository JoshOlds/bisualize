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
        avc.BisualizeService.getAllEmployees().then(data => { isActive(data, 'employees') })
        avc.BisualizeService.getAllJobs().then(data => { isActive(data, 'jobs') })
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

            Promise.all([
                avc.BisualizeService.getAllPositions(),
                avc.BisualizeService.getAllEmployees(),
                avc.BisualizeService.getAllJobs(),
                avc.BisualizeService.getAllBadges()
            ])
            .then(data =>{
                avc.positions = data[0];
                isActive(data[1], 'employees');
                isActive(data[2], 'jobs'),
                avc.badges = data[3]
                update()
            })
        }

        avc.updateJob = function (id, currentJob) {
            if (currentJob.terminate) {
                avc.BisualizeService.deleteJob(id)
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
            if (currentBadge.terminate) {
                avc.BisualizeService.deleteBadge(id)
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
                return
            }
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
            if (currentEmployee.terminate) {// Add alert here
                if (!confirm('Are you sure you want to terminate employee?')) { return; }
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

        avc.updatePosition = function updatePosition(id, currentPosition) {
            if (currentPosition.terminate) {
                if (!confirm('Are you sure you want to delete this position?')) { return; }
                avc.BisualizeService.deletePosition(id)
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
                return
            }
            if (currentPosition.employeeId == '') { currentPosition.employeeId = '-1'; }
            avc.BisualizeService.updatePosition(id, currentPosition)
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

        avc.addPosition = function (managerPositionId, jobId) {
            avc.BisualizeService.addPosition(managerPositionId, jobId)
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

        //Shows feedback message for 3 seconds
        avc.showFeedback = function () {
            update()

            setTimeout(avc.renewData, 1500);
            setTimeout(function () {
                avc.feedbackFail = false;
                avc.feedbackSuccess = false;
                update()
            }, 3000)
        }

        //hides inactive objects
        function isActive(data, type) {
            let tempArr = []
            for (var i = 0; i < data.length; i++) {
                var object = data[i];
                if (object.active) {
                    tempArr.push(object)
                }
            }
            avc[type] = tempArr
            avc[type].unshift({ id: '-1', name: 'None', title: 'None' })
        }

        avc.occupied = function occupied(item) {
            if (item.employeeId == '-1' || item.id == avc.currentEmployee.positionId) { return item }
        }

        avc.getManagerObj = function getManagerObj(manId) {
            var manObj = {}
            avc.positions.forEach(item => {
                if (item.id == manId) { manObj = item }
            })
            return manObj;
        }

        avc.sortByName = function sortByName(a, b){
            if(a.name > b.name){return 1}
            if(a.name < b.name){return -1}
            return 0;
        }
        avc.sortByTitle = function sortByTitle(a, b){
            if(a.title > b.title){return 1}
            if(a.title < b.title){return -1}
            return 0;
        }
        avc.sortByPosEmpName = function sortByPosEmpName(a, b){
            if(a.employee.name > b.employee.name){return 1}
            if(a.employee.name < b.employee.name){return -1}
            return 0;
        }
        avc.sortByJobTitle = function sortByJobTitle(a, b){
            if(a.job.title > b.job.title){return 1}
            if(a.job.title < b.job.title){return -1}
            return 0;
        }


    }





} ())