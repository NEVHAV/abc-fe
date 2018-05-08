/**
 * Created by NEVHAV on 19/04/18.
 */
angular.module('abc-fe', [
    'oc.lazyLoad',
    'ui.router',
    'ngCookies'
])
    .constant('API_URL', 'http://localhost:8080/abc/api/')
    .value('test', {value: '0'})
    .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'components/home/homeView.html',
                controller: 'homeController',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load (
                            {
                                files: ['components/home/homeController.js']
                            }
                        )
                    }
                }
            })

            .state('post', {
                abstract: true,
                url: '/post',
                templateUrl: 'components/post/postView.html',
                controller: 'postController',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load (
                            {
                                files: ['components/post/postController.js']
                            }
                        )
                    }
                }
            })
            .state('post.detail', {
                url: '/:title',
                templateUrl: 'components/post/postView.html',
                controller: 'postController',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load (
                            {
                                files: ['components/post/postController.js']
                            }
                        )
                    }
                }
            })

            .state('submenu', {
                abstract: true,
                url: '/submenu',
                templateUrl: 'components/submenu/submenuView.html',
                controller: 'submenuController',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load (
                            {
                                files: ['components/submenu/submenuController.js']
                            }
                        )
                    }
                }
            })
            .state('submenu.detail', {
                url: '/:subcate',
                templateUrl: 'components/submenu/submenuView.html',
                controller: 'submenuController',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load (
                            {
                                files: ['components/submenu/submenuController.js']
                            }
                        )
                    }
                }
            })
    }]);