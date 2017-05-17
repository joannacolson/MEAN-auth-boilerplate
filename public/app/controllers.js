angular.module('RqwertyCtrls', ['RqwertyServices'])
    .controller('HomeCtrl', ['$scope', 'Rqwerty', function($scope, Rqwerty) {
        $scope.rqwertys = [];

        Rqwerty.query(function success(data) {
            $scope.rqwertys = data;
        }, function error(data) {
            console.log(data);
        });

        $scope.deleteRqwerty = function(id, rqwertysIdx) {
            Rqwerty.delete({ id: id }, function success(data) {
                $scope.rqwertys.splice(rqwertysIdx, 1);
            }, function error(data) {
                console.log(data);
            });
        };
    }])
    .controller('ShowCtrl', ['$scope', '$stateParams', 'Rqwerty', function($scope, $stateParams, Rqwerty) {
        $scope.rqwerty = {};

        Rqwerty.get({ id: $stateParams.id }, function success(data) {
            $scope.rqwerty = data;
        }, function error(data) {
            console.log(data);
        });
    }])
    .controller('NewCtrl', ['$scope', '$location', 'Rqwerty', function($scope, $location, Rqwerty) {
        $scope.rqwerty = {
            title: '',
            description: '',
            image: ''
        };

        $scope.createRqwerty = function() {
            Rqwerty.save($scope.rqwerty, function success(data) {
                $location.path('/');
            }, function error(data) {
                console.log(data);
            });
        };
    }])
    .controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
        $scope.isLoggedIn = function() {
            return Auth.isLoggedIn();
        }

        $scope.logout = function() {
            Auth.removeToken();
        };
    }])
    .controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.userSignup = function() {
            $http.post('/api/users', $scope.user).then(function success(res) {
                console.log('successfully created a new user', res);
                $location.path('/'); //relocate to the home page
            }, function error(res) {
                console.log('Error while signing up', res);
            });
        };
    }])
    .controller('LoginCtrl', ['$scope', '$timeout', 'Auth', '$http', '$location', 'Alerts', function($scope, $timeout, Auth, $http, $location, Alerts) {
        $scope.user = {
            email: '',
            password: ''
        };
        var clearAlerts = function() {
            Alerts.clear();
        }

        $scope.userLogin = function() {
            $http.post('/api/auth', $scope.user).then(function success(res) {
                console.log('response from server when loggin in:', res);
                Auth.saveToken(res.data.token);
                Alerts.add('success', 'You are now logged in, congrats.');
                $timeout(clearAlerts, 1500);
                $location.path('/'); //redirect to home
            }, function error(res) {
                console.log('Something went wrong', res);
                Alerts.add('error', 'Bad Login Info, Please Try Again!!');
                $timeout(clearAlerts, 1500);
            });
        };
    }])
    .controller('AlertsController', ['$scope', 'Alerts', function($scope, Alerts) {
        $scope.alerts = function() {
            return Alerts.get();
        }
    }]);
