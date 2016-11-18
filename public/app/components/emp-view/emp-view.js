; (function () {

    angular.module('bisualize')

        .component('empView', {
            controller: EmpViewController,
            templateUrl: '/app/components/emp-view/emp-view.html',
            controllerAs: 'evc'
        })

    EmpViewController.$inject = ['$scope', 'BisualizeService']

    function EmpViewController($scope, BisualizeService) {
        let evc = this


        function update() {
            $scope.$evalAsync()
        }

        evc.getAllEmployees = function () {
            debugger
            BisualizeService.getEmployee('2878a62f-3a7c-4c0b-a4fc-6d6edd968b93')
                .then(data => {
                    evc.employee = data
                    console.log(evc.employee)
                    update()
                })
                .catch(err => {
                    console.log(err)
                })
        }


    }





} ())