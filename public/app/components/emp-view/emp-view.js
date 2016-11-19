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
        let employeeId = $stateParams.employeeId || '2878a62f-3a7c-4c0b-a4fc-6d6edd968b93'
        evc.reports = [];

        function update() {
            evc.getReports()
            $scope.$evalAsync()
        }

        evc.getEmployee = function () {
            BisualizeService.getEmployee(employeeId)
                .then(data => {
                    evc.employee = data
                    console.log(evc.employee)
                    update()
                })
                .catch(err => {
                    console.log(err)
                })
        }


// evc.getReports = function(){
//     BisualizeService.getPosition(evc.employee.positionId)
//     .then(data => {
//         console.log('get reports')
//         console.log(data)
//     })

// }

       evc.getReports = function(){
           var reports = evc.employee.position.reportIds;
            for(id in reports){
                BisualizeService.getPosition(reports[id])
                .then(data =>{
                    debugger
                    evc.reports.push(data.employee)
                    console.log(evc.reports)
                })
            }
       }

        evc.getEmployee()

        




    }





} ())