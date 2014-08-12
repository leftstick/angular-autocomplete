(function(angular) {

    if (typeof angular === 'undefined') {
        throw new Error('hAuto requires angular');
    }

    var hAuto = angular.module('hAuto', []);

    var hAutoDir = function() {
        return {
            restrict: 'AE',
            link: function($scope, element, attrs) {
                $scope.$watch('searchTxt', function(newValue, oldValue) {
                    console.log(newValue);
                });
            },
            template: '<input type="text" class="form-control" ng-model="searchTxt"/>'
        };
    };

    hAuto.directive('hAuto', [hAutoDir]);

}(angular));