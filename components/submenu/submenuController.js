/**
 * Created by NEVHAV on 07/05/18.
 */
angular.module('abc-fe')
    .controller ('submenuController', function ($scope, $http, $timeout, $state, $stateParams, API_URL, $cookieStore, test) {
        //materialize option
        setTimeout(function () {
            $(document).ready(function(){
                $('.tabs').tabs({
                    swipeable: false
                });
            });
        }, 1000);

        //language
        $scope.lang = $cookieStore.get('lang');
        if ($scope.lang !== 'vn' && $scope.lang !== 'jp'){
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

        $scope.subId = $cookieStore.get('subId');
        $scope.subname = $cookieStore.get('subname');

        $scope.title = 'ABC - ' + $scope.subname;
        $scope.phoneNumber = '(+84) 24-888-888';

        //get submenu
        $http.get(API_URL + $scope.lang + '/' + 'submenu/' + $scope.subId).then(function (response) {
            $scope.submenus = response.data.data;
        }, function (error) {
            console.log('Submenus error!');
        });

        //get categories
        $http.get(API_URL + $scope.lang + '/' + 'categories').then(function (response) {
            $scope.categories = response.data.data;
        }, function (error) {
            console.log('Categories error!');
        });

        //show post
        $scope.showPost = function ($post) {
            $cookieStore.put('post', $post);
            $state.go('post.detail', {title: $post.title});
        };

        //show post
        $scope.showPost = function ($postId, $title, $subId) {
            $cookieStore.put('postId', $postId);
            $cookieStore.put('postTitle', $title);
            $cookieStore.put('subId', $subId);
            $state.go('post.detail', {title: $title});
        };

        // getLatestPosts
        $http.get(API_URL + $scope.lang + '/' + 'latestPosts/').then(function (response) {
            $scope.latestPosts = response.data.data;
        }, function (error) {
            console.log('Latest posts error!');
        });
    });