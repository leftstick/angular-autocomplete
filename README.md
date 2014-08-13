# angular-autocomplete #

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


## `h-auto` configuration

| Attribute        | Type           | Required  | Description |
| :------------- |:-------------| :-----:| :-----|
| init-items | array | No | initialized search items. If you need a `lazy-load` mechanism depends on user's input, leave this option |
| item-select(item, index) | function | No | callback while you select one item from search result, and the `item` is the object/string you selected, and `index` is position of this item in this result. Note: `item` and `index` has to be defined in html, otherwise, you won't get them from controller |
| value | string\|object | No | callback while you select one item from search result, and the `item` is the object\|string you selected, and `index` is position of this item in this result. Note: `item` and `index` has to be defined in html, otherwise, you won't get them from controller |



## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/angular-autocomplete/master/LICENSE)



[expression]: https://docs.angularjs.org/guide/expression





