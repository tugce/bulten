var bulten = angular.module('bulten', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all bultens and show them
    $http.get('/api/bultens')
        .success(function(data) {
            $scope.bultens = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.createBulten = function() {
        $http.post('/api/bultens', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.bultens = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a bulten
    $scope.deleteBulten = function(id) {
        $http.delete('/api/bultens/' + id)
            .success(function(data) {
                $scope.bultens = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
