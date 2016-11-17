(function(){
     angular.module('bisualize')
         .service('EmpService', function($http){
             var ems = this;
              var empService = new BisualizeService()

 
         
             ems.getAllEmployees = function(){
                 debugger
                 empService.getAllPositions()
                    .then(data =>{console.log(data)})
                    .catch(error =>{console.log(error)})
                 
             }

 })
}())