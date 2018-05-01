/**
 * Created by NEVHAV on 19/04/18.
 */
angular.module('abc-fe')
    .controller ('homeController', function ($scope, $http, $timeout,API_URL) {
        $scope.title = 'ABC - Trang chủ';
        $scope.phoneNumber = '(+84) 24-888-888';

        $(document).ready(function(){
            $('.slider').slider({
                height: 280,
                indicators: true
            });
        });

        setTimeout(function () {
            $(document).ready(function(){
                $('.tabs').tabs({
                    swipeable: false
                });
            });
        }, 1000);

        //content
        //get categories
        $http.get(API_URL + 'categories').then(function (response) {
            $scope.categories = response.data.data;
        }, function (error) {
            console.log('Categories error!');
        });

        //getsubcategories
        $scope.subcategories = [];
        $scope.getSubcategories = function (cateId) {
            $http.get(API_URL + 'subcategories/' + cateId).then(function (response) {
                $scope.subcategories[cateId] = response.data.data;
            }, function (error) {
                console.log('SubCategories error!');
            });
        };

        // getPost
        $scope.posts = [];
        $scope.catePosts = [];
        $scope.getPost = function (cateId, sub) {
            console.log(cateId + ',' + sub);
            if (sub !==0 ) {
                $http.get(API_URL + 'post/' + cateId + '/' + sub).then(function (response) {
                    $scope.posts[sub] = response.data.data;
                    // console.log($scope.posts[sub]);
                }, function (error) {
                    console.log('Post error!');
                });
            }
            else {
                $http.get(API_URL + 'post/' + cateId).then(function (response) {
                    $scope.catePosts[cateId] = response.data.data;
                }, function (error) {
                    console.log('Post error!');
                });
            }
        };
        $scope.show = function () {
            return true;
        };
        $scope.changeShow = function () {
            $scope.show = function () {
                return false;
            };
        };
        
        // getLatestPosts
        $http.get(API_URL + 'latestPosts/').then(function (response) {
            $scope.latestPosts = response.data.data;
        }, function (error) {
            console.log('Latest posts error!');
        })
});