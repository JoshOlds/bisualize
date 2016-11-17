(function(){
     angular.module('bisualize')
         .service('AdminService', function($http){
             var ads = this;
             // ADD HEROKU URL IN PLACE OF LOCAL HOST!!!
             var baseUrl = 'http://localhost:8080/api'
             var employees = '/employees'
 
         
             ads.getAllEmployees = function(cb){
                 $http.get(baseUrl + employees).then(cb)
             }

 })
}())