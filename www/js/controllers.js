angular.module('starter.controller', [])
    .controller('AppCtrl', function ($scope, WC) {
        var WooCommerce = WC.WC();
        WooCommerce.get('products/categories', function (err, data, res) {
            // console.log(res);
            $scope.categories = (JSON.parse(res)).product_categories;
            $scope.mainCategories = [];
            $scope.categories.forEach(function (element) {
                if (element.parent === 0) {
                    $scope.mainCategories.push(element);
                }
            });
        })
    })
    .controller('HomeCtrl', ['$scope', function ($scope) {
        $scope.name = 'hello';
        console.log($scope.name);
    }]);
