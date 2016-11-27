; (function () {

    angular.module('bisualize')

        .component('empView', {
            controller: EmpViewController,
            templateUrl: '/app/components/emp-view/emp-view.html',
            controllerAs: 'evc'
        })

    EmpViewController.$inject = ['$scope', '$stateParams', 'BisualizeService']

    function EmpViewController($scope, $stateParams, BisualizeService) {
        let evc = this
        let employeeId = $stateParams.employeeId || '5bd5255b-e58b-476c-9b5b-f808403e4104' //Update this to CEO emp id
        evc.reports = [];
        evc.badges = [];
        evc.manager = {};


        function update() {
            for (let i = 0; i < evc.reports.length; i++) {
                if (evc.reports[i] === undefined) {
                    evc.reports.splice(i, 1);
                }
            }
            $scope.$evalAsync()
        }

        evc.getEmployee = function () {
            BisualizeService.getEmployee(employeeId)
                .then(data => {
                    evc.employee = data

                    evc.getReports()
                    evc.getBadges()
                    evc.getManager()
                })
                .catch(err => {
                    // console.log(err)
                })
        }


        // evc.getReports = function(){
        //     BisualizeService.getPosition(evc.employee.positionId)
        //     .then(data => {
        //         console.log('get reports')
        //         console.log(data)
        //     })

        // }

        evc.getReports = function () {
            var reports = evc.employee.position.reportIds;
            for (id in reports) {
                BisualizeService.getPosition(reports[id])
                    .then(data => {
                        evc.reports.push(data)

                        update()
                    })
            }
        }

        evc.getEmployee()

        // CODE FOR GETTING BADGES

        evc.getBadges = function () {
            BisualizeService.getAllBadges()
                .then(data => {
                    evc.badges = data
                    update()
                })
        }

        evc.getManager = function getManager(){
            BisualizeService.getPosition(evc.employee.position.managerPositionId)
            .then(data =>{
                evc.manager = data;
                update()
            })
        }

        evc.filterReports = function filterReports(item){
            if(item.employee.name){return item} //Makes sure employees are attached to reports
        }

    }





} ())