(function() {
    'use strict';
    var demo = angular.module('demo', ['hAuto']);

    demo.controller('BasicController', ['$scope', function($scope) {
            $scope.data = ['Bhutan', 'Denmark', 'Japan', 'Bahrain', 'Tonga', 'Fang'];
            $scope.onSelect = function(item, index) {
                alert(item + ' is selected! and index is = ' + index);
            };

            $scope.displayValue = function() {
                alert($scope.valueOne);
            };
    }]);

    demo.controller('LazyController', ['$scope', '$timeout', function($scope, $timeout) {
            $scope.data = ['Bhutan', 'Denmark', 'Japan', 'Bahrain', 'Tonga', 'Fang'];
            $scope.onSelect = function(item, index) {
                alert(item + ' is selected! and index is = ' + index);
            };

            $scope.loading = function(handler) {
                $timeout(function() {
                    handler($scope.data);
                }, 1000);
            };

            $scope.displayValue = function() {
                alert($scope.valueOne);
            };
    }]);

    demo.controller('ObjectController', ['$scope', '$timeout', function($scope, $timeout) {
            $scope.data2 = [{
                name: 'Bhutan',
                size: 'big'
                }, {
                name: 'Denmark',
                size: 'middle'
                }, {
                name: 'Japan',
                size: 'small'
                }, {
                name: 'Bahrain',
                size: 'huge'
                }, {
                name: 'Tonga',
                size: 'small'
                }, {
                name: 'Fang',
                size: 'middle'
            }];
            $scope.onSelect = function(item, index) {
                alert(item.name + ' is selected! and index is = ' + index);
            };

            $scope.displayValue = function() {
                alert($scope.valueOne);
            };
    }]);

    demo.controller('FormatterController', ['$scope', '$timeout', function($scope, $timeout) {
            $scope.data2 = [{
                name: 'Bhutan',
                size: 'big'
                }, {
                name: 'Denmark',
                size: 'middle'
                }, {
                name: 'Japan',
                size: 'small'
                }, {
                name: 'Bahrain',
                size: 'huge'
                }, {
                name: 'Tonga',
                size: 'small'
                }, {
                name: 'Fang',
                size: 'middle'
            }];
            $scope.onSelect = function(item, index) {
                alert(item.name + ' is selected! and index is = ' + index);
            };

            $scope.displayValue = function() {
                alert($scope.valueOne);
            };
            $scope.formatter = function() {
                return function(item) {
                    return item.name + '--' + item.size;
                };
            };
    }]);

}());