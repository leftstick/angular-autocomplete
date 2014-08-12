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
                    $scope.selectItem($scope.$curIndex);
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
                'initItems': '=',
                'itemSelect': '&',
                'lazyLoad': '&'
            },
            link: function($scope, element, attrs) {
                var winEl = angular.element(window);
                var binded = false;
                var promise;
                $scope.loading = false;

                var handler = keyBoardHandler($scope);

                var reset = function() {
                    $scope.$curIndex = -1;
                    $scope.list = [];
                };

                var bindHandler = function() {
                    if (!binded) {
                        winEl.on('keyup', handler);
                        winEl.on('keydown', disablePointerHandler);
                        binded = true;
                    }
                };

                var unbindHandler = function() {
                    winEl.off('keyup', handler);
                    winEl.off('keydown', disablePointerHandler);
                    binded = false;
                };

                var filtering = function(items) {
                    if (!$scope.searchTxt) {
                        $scope.list = [];
                    } else {
                        $scope.list = $filter('filter')(items, $scope.searchTxt);
                    }
                    var inputEl = element.find('input');
                    $timeout(function() {
                        element.find('div').css({
                            'position': 'absolute',
                            'width': inputEl.prop('offsetWidth') + 'px'
                        });
                    });

                    bindHandler();
                };

                var lazyDataHandler = function(data) {
                    filtering(data);
                    $scope.loading = false;
                    $scope.$apply();
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

                $scope.selectItem = function(index, $event) {
                    if (index < 0) {
                        if ($event) {
                            $event.preventDefault();
                            $event.stopPropagation();
                        }
                        return;
                    }
                    var item = $scope.list[index];
                    if (attrs.itemSelect) {
                        $scope.itemSelect({
                            item: item,
                            index: index
                        });
                    }
                    $scope.searchTxt = item;
                    $scope.selected = true;
                    if ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                    }

                };

                $scope.$watch('searchTxt', function(newValue, oldValue) {
                    if (!newValue || $scope.selected) {
                        reset();
                        unbindHandler();
                        if ($scope.selected) {
                            $scope.selected = false;
                        }
                        return;
                    }

                    if (attrs.lazyLoad) {
                        if (promise) {
                            $timeout.cancel([promise]);
                        }
                        reset();
                        $scope.loading = true;
                        $timeout(function() {
                            var inputEl = element.find('input');
                            element.find('div').css({
                                'position': 'absolute',
                                'width': inputEl.prop('offsetWidth') + 'px'
                            });
                        });

                        promise = $timeout(function() {
                            $scope.lazyLoad({
                                handler: lazyDataHandler
                            });
                        }, 1000);

                        return;
                    }

                    filtering($scope.initItems);

                });


                $scope.$on('$destroy', function() {
                    unbindHandler();
                });

            },
            template: '<input type="text" class="form-control" ng-model="searchTxt"/><div class="text-center" ng-if="loading"><i class="fa fa-spinner fa-spin fa-lg"></i></div><div ng-if="list.length !== 0" class="list-group"><a ng-repeat="li in list" class="list-group-item" href ng-click="selectItem($index, $event);" ng-class="{active: $index === $curIndex}">{{li}}</a></div>'
        };
    };

    hAuto.directive('hAuto', ['$filter', '$timeout', hAutoDir]);

}(angular, window));