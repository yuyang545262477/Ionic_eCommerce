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
    .controller('HomeCtrl', function ($scope) {
        $scope.name = 'hello';
        console.log($scope.name);
    })
    .controller('BrowserCtrl', function ($scope, WC) {
        $scope.offset = 0;
        $scope.getProducts = function () {
            var WooCommerce = WC.WC();
            WooCommerce.get('products', function (err, data, res) {
                if (err) {
                    console.log(err);
                }
                $scope.products = angular.fromJson(res).products;
                console.log($scope.products);
                $scope.offset += 10;
                $scope.hasMore = true;
            })
        };
        $scope.getProducts();
        $scope.doRefresh = function () {
            $scope.getProducts();
            $scope.$broadcast('scroll.refreshComplete');
        };
        $scope.loadMore = function () {
            var WooCommerce = WC.WC();
            WooCommerce.get('products?filter[offset]=' + $scope.offset, function (err, data, res) {
                if (err) return err;
                console.log(angular.isArray(angular.fromJson(res).products));
                console.log(angular.fromJson(res));
                angular.fromJson(res).products.forEach(function (ele) {
                    $scope.products.push(ele);
                });
                $scope.$broadcast('scroll.infiniteScrollComplete');
                if (angular.fromJson(res).products.leng < 10) {
                    $scope.hasMore = false;
                    console.log('no more products');
                    // return false;
                } else {
                    $scope.offset += 10;
                }
            })
        }


    });
