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

        function showTree() {

            let chartConfig = {};
            let nodeStructure = {};
            let topPosition = {};

            chartConfig.chart = {
                container: "#tree-simple",
                node: {
                    collapsable: true   
                },
                connectors: {
                    type: 'step'
                }
            }

            ovc.positions.forEach(pos => {
                if (pos.managerPositionId == '-1') {
                    topPosition = pos;
                }
            })

            nodeStructure = buildNodeStructure(topPosition, nodeStructure);
            chartConfig.nodeStructure = nodeStructure;
            let chart = new Treant(chartConfig, function () { console.log("Tree loaded.") }, $);

        }

        function buildNodeStructure(pos, nodeStructure) {
            nodeStructure = nodeStructure || pos;

            nodeStructure.text = {
                name: pos.employee.name || 'No Employee',
                title: pos.job.title || 'No Job'
            }
            nodeStructure.image = pos.employee.image || '//placehold.it/75x75'
            nodeStructure.link = {
                href : `/#/mypage/${pos.employee.id}` || '/#/mypage',
                target: '_blank'
            }
            

            nodeStructure.children = [];
            if (pos.reportIds) {
                if(pos == nodeStructure){nodeStructure.collapsed = true}
                ovc.positions.forEach(item => {
                    for(id in pos.reportIds){
                        if (id == item.id) {
                            nodeStructure.children.push(item);
                        }
                    }
                })
            }

            nodeStructure.children.forEach(child => {
                buildNodeStructure(child);
            })

            return nodeStructure;
        }

        

    }





} ())