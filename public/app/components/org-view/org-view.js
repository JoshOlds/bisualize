; (function () {

    angular.module('bisualize')

        .component('orgView', {
            controller: OrgViewController,
            templateUrl: '/app/components/org-view/org-view.html',
            controllerAs: 'ovc'
        })

    OrgViewController.$inject = ['$scope', 'BisualizeService']

    function OrgViewController($scope, BisualizeService) {
        let ovc = this;
        ovc.positions = [];

        BisualizeService.getAllPositions().then(data => {
            ovc.positions = data;
            showTree();
        })

        function showTree(){

            let chartConfig = {};
            let nodeStructure = {};
            let toDoArr = [];

            chartConfig.chart = {
                container: "#tree-simple"
            }

            let topPosition = {};
            ovc.positions.forEach(pos =>{
                if(pos.managerPositionId == '-1'){
                    topPosition = pos;
                }
            })

            toDoArr.push(topPosition);

            processChildren(toDoArr){
                
            }


        }

        function processChildren(toDoArray){

        }

        simple_chart_config = {
            chart: {
                container: "#tree-simple",
                
            },

            nodeStructure: {
                text: { name: "Parent node" },
                children: [
                    {
                        text: { name: "First child" },
                        children: [
                            {
                                text: {name: "Josh"}
                            },
                            {
                                text: {name: "Dustin"}
                            }
                        ]
                    },
                    {
                        text: { name: "Second child" }
                    }
                ]
            }
        };

        var chart = new Treant(simple_chart_config, function () { console.log("Tree loaded.")}, $);

    }





} ())