/**
 * Created by NEVHAV on 03/05/18.
 */
angular.module('abc-fe')
    .controller ('postController', function ($scope, $http, $timeout, $state, $stateParams, API_URL, $cookieStore, test) {
        //materialize option
        setTimeout(function () {
            $(document).ready(function(){
                $('.tabs').tabs({
                    swipeable: false
                });
            });
        }, 1000);

        //header
        $scope.postId = $cookieStore.get('postId');
        $scope.title = $cookieStore.get('postTitle');
        $scope.IdSub = $cookieStore.get('subId');

        $scope.title = 'ABC - ' + $scope.title;
        $scope.phoneNumber = '(+84) 24-888-888';

        //get post detail
        $http.get(API_URL + 'postDetail/' + $scope.postId).then(function (response) {
            $scope.post = response.data.data[0];
        }, function (error) {
            console.log('Post detail error!');
        });

        //get categories
        $http.get(API_URL + 'categories').then(function (response) {
            $scope.categories = response.data.data;
        }, function (error) {
            console.log('Categories error!');
        });

        //show submenu
        $scope.showSubmenu = function ($subId, $subname) {
            $cookieStore.put('subId', $subId);
            $cookieStore.put('subname', $subname);
            $state.go('submenu.detail', {subcate: $subname});
        };

        //show post
        $scope.showPost = function ($postId, $title, $subId) {
            $cookieStore.put('postId', $postId);
            $cookieStore.put('postTitle', $title);
            $cookieStore.put('subId', $subId);
            $state.go('post.detail', {title: $title}, {reload: true});
        };

        // getLatestPosts
        $http.get(API_URL + 'latestPosts/').then(function (response) {
            $scope.latestPosts = response.data.data;
        }, function (error) {
            console.log('Latest posts error!');
        });

        //getBreadcrumbs
        $http.get(API_URL + 'breadcrumbs/' + $scope.IdSub).then(function (response) {
            $scope.breadcrumbs = response.data.data;
        }, function (error) {
            console.log('Breadbrumbs error!');
        });
    });