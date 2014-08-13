/**
 * ******************************************************************************************************
 *
 *  angular based directive for auto-complete stuff
 *
 *  @author  Howard.Zuo
 *  @date    Aug 13th, 2014
 *
 * ******************************************************************************************************
 */
(function(angular, window) {
    'use strict';

    if (typeof angular === 'undefined') {
        throw new Error('hAuto requires angular');
    }

    //default classes for directive
    var inputClass = 'form-control';
    var spinnerClass = 'fa fa-spinner fa-spin fa-lg';
    var itemsClass = 'list-group';
    var itemClass = 'list-group-item';

    //default formatter used for display object item
    var formatter = function(item) {
        return item;
    };

    var assignOpts = function($scope, attrs, key, defaultValue) {
        if (!attrs[key]) {
            $scope[key] = defaultValue;
        } else {
            $scope[key] = attrs[key];
        }
    };


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
                'displayFormatter': '&',
                'displayField': '@',
                'value': '=',
                'initItems': '=',
                'itemSelect': '&',
                'lazyLoad': '&'
            },
            link: function($scope, element, attrs) {
                var winEl = angular.element(window);
                var binded = false;
                var promise;
                //set loading with falsy since not need to display spinner at the begining
                $scope.loading = false;
                assignOpts($scope, attrs, 'inputClass', inputClass);
                assignOpts($scope, attrs, 'spinnerClass', spinnerClass);
                assignOpts($scope, attrs, 'itemsClass', itemsClass);
                assignOpts($scope, attrs, 'itemClass', itemClass);
                assignOpts($scope, attrs, 'inputAddonTxt', '');
                if (attrs.displayFormatter) {
                    $scope.formatter = $scope.displayFormatter();
                } else {
                    $scope.formatter = formatter;
                }

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

                var getSpecifiedDiv = function(cssName) {
                    var children = element.children();
                    var el;
                    for (var i = 0; i < children.length; i++) {
                        el = angular.element(children[i]);
                        if (el.hasClass(cssName)) {
                            return el;
                        }
                    }
                    return;
                };

                var filtering = function(items) {
                    if (!$scope.searchTxt) {
                        $scope.list = [];
                    } else {
                        $scope.list = $filter('filter')(items, $scope.searchTxt);
                    }
                    var inputEl = element.find('input');
                    $timeout(function() {
                        var el = getSpecifiedDiv($scope.itemsClass);
                        if (el) {
                            el.css({
                                'position': 'absolute',
                                'width': inputEl.prop('offsetWidth') + 'px'
                            });
                        }
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
                    $scope.value = item;
                    $scope.searchTxt = $scope.displayField ? item[$scope.displayField] : $scope.formatter(item);
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
                            getSpecifiedDiv('spinner-position').css({
                                'position': 'absolute',
                                'width': inputEl.prop('offsetWidth') + 'px'
                            });
                        });

                        promise = $timeout(function() {
                            $scope.lazyLoad({
                                handler: lazyDataHandler,
                                searchTxt: newValue
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
            template: '<input type="text" ng-class="inputClass" ng-model="searchTxt"/><div class="spinner-position" ng-if="loading"><i ng-class="spinnerClass"></i></div><div ng-if="list.length !== 0" ng-class="itemsClass"><a ng-repeat="li in list" href ng-click="selectItem($index, $event);" class="{{itemClass}}" ng-class="{active: $index === $curIndex}">{{ displayField ? li[displayField] : formatter(li) }}</a></div>'
        };
    };

    hAuto.directive('hAuto', ['$filter', '$timeout', hAutoDir]);

}(angular, window));