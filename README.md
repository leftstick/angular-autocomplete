# angular-autocomplete ![](http://img.shields.io/badge/bower_module-v1.0.1-green.svg?style=flat) #

Create autocomplete component within five minutes.


![](https://raw.githubusercontent.com/leftstick/angular-autocomplete/master/docs/img/demo.png)

Try it: [plunker](http://plnkr.co/edit/vDmK3tXj4i2JX7ONiF9s?p=preview)


## Requirement ##

- [angularjs](http://angularjs.org/) (1.2.0+)

## UI dependency(optional) ##

- [bootstrapjs](http://getbootstrap.com) (3.2.0+)
- [fontawesome](http://fontawesome.io/) (4.1.0+)

## Install ##

```JavaScript
bower install angular-h-autocomplete --save
```

## Basic Usage ##



- Include `hAuto.js` into your `index.html` by using `script` tag, or you have other way to import dependency(For example: requirejs), like following:
```HTML
<script type="text/javascript" src="[location]/hAuto.js"></script>
```
- Add `hAuto` module as your angular app's dependency
```JavaScript
var demo = angular.module('demo', ['hAuto']);
```
- Use `h-auto` tag in your html
```HTML
<div ng-controller="BasicController">
    <h-auto value="valueOne" init-items="data" item-select="onSelect(item, index)"></h-auto>
</div>
```
- Writing `BasicController`
```JavaScript
demo.controller('BasicController', ['$scope', function($scope) {
    $scope.data = ['Bhutan', 'Denmark', 'Japan', 'Bahrain', 'Tonga', 'Fang'];
    $scope.onSelect = function(item, index) {
        alert(item + ' is selected! and index is = ' + index);
    };
}]);
``` 


## `h-auto` configuration ##

| Attribute        | Type           | Required  | Description |
| :------------- |:-------------| :-----:| :-----|
| init-items | array([expression]) | No | initialized search items. If you need a `lazy-load` mechanism depends on user's input, leave this option |
| lazy-load(handler,searchTxt) | function([expression]) | No | callback called after user stop typing for 1 sec, and you could fetch data from other place asynchronously and send back the data as search items to `hAuto` by calling `handler(data)`, `searchTxt` is a string which user typed. see demo: `Advanced lazy-loading`|
| item-select(item, index) | function([expression]) | No | callback while you select one item from search result, and the `item` is the object/string you selected, and `index` is position of this item in this result. Note: `item` and `index` has to be defined in html, otherwise, you won't get them from controller |
| value | string/object([expression]) | No | the selected string/object will be stored in this [expression], you can get selected item by calling `$scope.[value]` in your controller|
| display-field | string | No | specify what property should be displayed in for each search result, only works if data from `init-items` or `lazy-load` is array of object, and `display-field` take higher priority than `display-formatter`. So if you set both those attribute in html, only `display-field` works |
| display-formatter | function([expression]) | No | a `handler` should be returned in this function, like demo: `specify formatter for each item in search result`. And the `handler` has the `item` as only one parameter. Only works if data from `init-items` or `lazy-load` is array of object |
| input-class | string | No | class will be set to to search input tag. `form-control` as default |
| spinner-class | string | No | class will be set to to loading `i` tag. `fa fa-spinner fa-spin fa-lg` as default |
| items-class | string | No | class will be set to to search results `div` tag. `list-group` as default |
| item-class | string | No | class will be set to to each search result `a` tag. `list-group-item` as default |

## build-in class ##

### `spinner-position` ###

The loading icon `i` tag has a `div` wrapper with `spinner-position` class, you can write your own css implementation to place the loading icon.

### `active` ###

The `active` class will be added on the selected item when you press `key_up` or `key_down` to navigate between each result.

## How it works? ##

This directive generates some html for you, and some logic control come along with the html, the generated html as following:

```HTML
<h-auto value="valueOne" input-class="form-control" init-items="data" item-select="onSelect(item, index)" class="ng-isolate-scope" spinner-class="fa fa-spinner fa-spin fa-lg" items-class="list-group" item-class="list-group-item">
    <input type="text" ng-class="inputClass" ng-model="searchTxt" class="ng-valid form-control ng-dirty">
    <!-- ngIf: loading --><!-- ngIf: list.length !== 0 -->
    <div ng-if="list.length !== 0" ng-class="itemsClass" class="ng-scope list-group" style="position: absolute; width: 1108px;">
        <!-- ngRepeat: li in list -->
        <a ng-repeat="li in list" href="" ng-click="selectItem($index, $event);" class="list-group-item" ng-class="{active: $index === $curIndex}">Denmark</a>
        <!-- end ngRepeat: li in list -->
    </div>
    <!-- end ngIf: list.length !== 0 -->
</h-auto>
```


## run demo locally ##

### Install npm dependency ###
```Shell
npm install
```

### Install bower dependency ###
```Shell
bower install
```

### run demo ###
```Shell
gulp demo
```


## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/angular-autocomplete/master/LICENSE)



[expression]: https://docs.angularjs.org/guide/expression





