/**
 * ******************************************************************************************************
 *
 *  angular based directive for auto-complete stuff
 *
 *  @author  Howard.Zuo
 *  @date    Nov 11th, 2014
 *
 * ******************************************************************************************************
 */
(function (global, angular, factory) {
    'use strict';

    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        global.hAuto = factory();
    }

}(window, angular, function () {
    'use strict';

    if (typeof angular === 'undefined') {
        throw new Error('hAuto requires angular');
    }

    var mod = angular.module('hAuto', []);

    var hAutoDir = function ($filter, $timeout) {
        return {
            restrict: 'AE',
            scope: {
                placeholder: '@'
            },
            link: function ($scope, element, attrs) {
                if (!$scope.placeholder) {
                    attrs.$set('placeholder', 'Typing...');
                }

                $scope.list = ['nanfeng', 'beifeng', 'dongfeng'];

            },
            template: '<input type="text" placeholder="{{ placeholder }}" class="auto-input" ng-model="searchTxt"/><i class="auto-input-i" ng-click="onSubmit($event)"></i><ul ng-if="list.length !== 0" class="auto-dropdown"><li ng-repeat="li in list" ng-click="selectItem(li, $event);" ng-class="{selected: $index === $curIndex}">{{ li }}</li></ul>'
        };
    };

    mod.directive('hAuto', ['$filter', '$timeout', hAutoDir]);

    return mod;
}));