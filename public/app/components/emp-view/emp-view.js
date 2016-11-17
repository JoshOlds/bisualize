;(function (){

    angular.module('bisualize')

    .component('empView',{
        controller: EmpViewController,
        templateUrl: '/app/components/emp-view/emp-view.html'
    })

    EmpViewController.$inject = ['EmpService']

    function EmpViewController(EmpService){
        let evc = this

        evc.getAllEmployees = function(){
            debugger
            EmpService.getAllEmployees(function(res){
                console.log(res)
            })
        }



        

    }



    

}())