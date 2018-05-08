/**
 * Created by NEVHAV on 19/04/18.
 */
angular.module('abc-fe')
    .controller ('homeController', function ($scope, $http, $timeout, API_URL, $state, $cookieStore, $cacheFactory,test) {
        // materialize option
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

        $scope.title = 'ABC - Trang chủ';
        $scope.phoneNumber = '(+84) 24-888-888';

        //language
        $scope.lang = $cookieStore.get('lang');
        if ($scope.lang !== 'vn' && $scope.lang !== 'jp' ){
            $scope.lang = 'vn';
        }
        $cookieStore.put('lang', $scope.lang);
        console.log($scope.lang);
        $scope.changeLang = function (id_lang) {
            if ($scope.lang !== id_lang){
                $scope.lang = id_lang;
                console.log($scope.lang);
                $cookieStore.put('lang', $scope.lang);
                $state.reload();
            }
        };

        //content
        //get categories
        $http.get( API_URL + $scope.lang + '/' + 'categories').then(function (response) {
            $scope.categories = response.data.data;
        }, function (error) {
            console.log('Categories error!');
        });

        //getsubcategories
        $scope.subcategories = [];
        $scope.getSubcategories = function (cateId) {
            $http.get(API_URL + $scope.lang + '/' + 'subcategories/' + cateId).then(function (response) {
                $scope.subcategories[cateId] = response.data.data;
            }, function (error) {
                console.log('SubCategories error!');
            });
        };

        // getPosts
        $scope.posts = [];
        $scope.catePosts = [];
        $scope.getPost = function (cateId, sub) {
            // console.log(cateId + ',' + sub);
            if (sub !==0 ) {
                $http.get(API_URL + $scope.lang + '/' + 'posts/' + cateId + '/' + sub).then(function (response) {
                    $scope.posts[sub] = response.data.data;
                }, function (error) {
                    console.log('Posts error!');
                });
            }
            else {
                $http.get(API_URL + $scope.lang + '/' + 'posts/' + cateId).then(function (response) {
                    $scope.catePosts[cateId] = response.data.data;
                }, function (error) {
                    console.log('Posts error!');
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
        $http.get(API_URL + $scope.lang + '/' + 'latestPosts/').then(function (response) {
            $scope.latestPosts = response.data.data;
        }, function (error) {
            console.log('Latest posts error!');
        });

        //show post
        $scope.showPost = function ($postId, $title, $subId) {
            $cookieStore.put('postId', $postId);
            $cookieStore.put('postTitle', $title);
            $cookieStore.put('subId', $subId);
            $state.go('post.detail', {title: $title});
        };

        //show submenu
        $scope.showSubmenu = function ($subId, $subname) {
            $cookieStore.put('subId', $subId);
            $cookieStore.put('subname', $subname);
            $state.go('submenu.detail', {subcate: $subname});
        };

        //test
        $scope.test2 = function () {
            console.log(test.value);
            test.value = 'value';
            console.log(test.value);
            $state.go('post.detail', {cate: 1, subcate: 1});
        }
});