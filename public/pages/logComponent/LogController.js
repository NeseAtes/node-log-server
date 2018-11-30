app.controller('LogController', function($scope, $http, SERVICE_URL, DTOptionsBuilder, DTColumnDefBuilder, $location) {
    
    $scope.logs = [];
    $scope.filters = [];

    if ($location.path() == '/log') {
        $scope.dtOptions = { responsive: true, scrollX: "auto" };

        $http.get(SERVICE_URL + '/log')
        .then(
            function(response) 
            {
                if (response.data.error)
                    console.log(response.data.error);
                    $scope.logs = response.data.data;
                    //console.log("logs", $scope.logs);

            },
            function(response) {
                console.log(response);
            }
        );
    }
    

    $scope.getFilteredData = function()
    {


        if($scope.filters.app_name === undefined || $scope.filters.app_name =="")
        {
            var filterStr = '?date='+$scope.filters.date+'&log_level='+$scope.filters.log_level;
        }


        //var filterStr = '?app_name='+$scope.filters.app_name+'&date='+$scope.filters.date+'&log_level='+$scope.filters.log_level;
        console.log(filterStr);
        $http.get(SERVICE_URL + '/log'+ filterStr)
        .then(
            function(response) {
                if (response.data.error)
                    console.log(response.data.error);
                    $scope.logs = response.data.data;
                    //console.log("logs", $scope.logs);

            },
            function(response) {
                console.log(response);
            }
            );
    }

});


  