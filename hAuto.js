(function(angular, window) {
    'use strict';

    if (typeof angular === 'undefined') {
        throw new Error('hAuto requires angular');
    }


    var keyBoardHandler = function($scope) {
        return function(e) {
            switch (e.keyCode) {
                case 38:
                    $scope.moveUp();
                    $scope.$apply();
                    break;
                case 40:
                    $scope.moveDown();
                    $scope.$apply();
                    break;
                case 13:
                    $scope.selectItem();
                    $scope.$apply();
                    break;
            }
            e.preventDefault();
            return;
        };
    };

    var disablePointerHandler = function(e) {
        switch (e.keyCode) {
            case 38:
            case 40:
                e.preventDefault();
                return;
        }
    };

    var hAuto = angular.module('hAuto', []);

    var hAutoDir = function($filter, $timeout) {
        return {
            restrict: 'AE',
            scope: {
                'inputClass': '@',
                'listClass': '@',
                'itemClass': '@',
                'items': '=',
                'itemSelect': '&'
            },
            link: function($scope, element, attrs) {
                var winEl = angular.element(window);

                var handler = keyBoardHandler($scope);

                var reset = function() {
                    $scope.$curIndex = -1;
                    $scope.list = [];
                };

                reset();

                $scope.moveUp = function() {
                    if ($scope.$curIndex > 0) {
                        $scope.$curIndex--;
                    }
                };

                $scope.moveDown = function() {
                    if (($scope.$curIndex + 1) < $scope.list.length) {
                        $scope.$curIndex++;
                    }
                };

                $scope.selectItem = function() {
                    if ($scope.$curIndex < 0) {
                        return;
                    }
                    if ($scope.itemSelect && $scope.itemSelect.call) {
                        var item = $scope.list[$scope.$curIndex];
                        $scope.itemSelect({
                            item: item,
                            index: $scope.$curIndex
                        });
                        $scope.searchTxt = item;
                        reset();
                    }
                };

                $scope.$watch('searchTxt', function(newValue, oldValue) {
                    if (!newValue) {
                        reset();
                        winEl.off('keyup', handler);
                        winEl.off('keydown', disablePointerHandler);
                        return;
                    }

                    $scope.list = $filter('filter')($scope.items, $scope.searchTxt);
                    var inputEl = element.find('input');
                    $timeout(function() {
                        element.find('div').css({
                            'position': 'absolute',
                            'width': inputEl.prop('offsetWidth') + 'px'
                        });
                    });

                    winEl.on('keyup', handler);
                    winEl.on('keydown', disablePointerHandler);
                });

            },
            template: '<input type="text" class="{{inputClass}}" ng-model="searchTxt"/><div ng-if="list.length !== 0" class="{{listClass}}"><a ng-repeat="li in list" class="{{itemClass}}" ng-class="{active: $index === $curIndex}">{{li}}</a></div>'
        };
    };

    hAuto.directive('hAuto', ['$filter', '$timeout', hAutoDir]);

}(angular, window));