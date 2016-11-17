;(function (){

    angular.module('bisualize')

    .component('empView',{
        controller: EmpViewController,
        templateUrl: '/app/components/emp-view/emp-view.html'
    })

    
    EmpViewController.$inject = ['EmpService']

    function EmpViewController(){

        let evc = this

        evc.getEmployees = function(){
            EmpService.getById(function(res){
                console.log(res)
            })
        }



        

    }



    

}())