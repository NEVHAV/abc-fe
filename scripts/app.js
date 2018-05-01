/**
 * Created by NEVHAV on 19/04/18.
 */
angular.module('abc-fe', [
    'oc.lazyLoad',
    'ui.router'
])
    .constant('API_URL', 'http://localhost:8080/abc/')
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
    }]);