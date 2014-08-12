(function() {
    'use strict';
    var demo = angular.module('demo', ['hAuto']);

    demo.controller('DemoController', ['$scope', '$timeout', function($scope, $timeout) {
            $scope.data = ['Bhutan', 'Denmark', 'Japan', 'Bahrain', 'Tonga', 'Fang'];
            $scope.onSelect = function(item, index) {
                alert(item + ' is selected! and index is = ' + index);
            };

            $scope.loading = function(handler) {
                // $timeout(function() {
                //     handler($scope.data);
                // }, 1000);
                setTimeout(function() {
                    handler($scope.data);
                }, 1000);
            };
    }]);

}());