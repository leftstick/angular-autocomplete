(function() {
    'use strict';
    var demo = angular.module('demo', ['hAuto']);

    demo.controller('DemoController', ['$scope', function($scope) {
            $scope.data = ['Bhutan', 'Denmark', 'Japan', 'Bahrain', 'Tonga', 'Fang'];
            $scope.onSelect = function(item, index) {
                alert(item + ' is selected! and index is = '+ index);
            };
    }]);

}());