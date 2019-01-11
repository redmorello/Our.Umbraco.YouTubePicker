angular.module("umbraco")
    .controller("Our.Umbraco.YoutubePicker.VideoPicker", function ($scope, videoResource) {
        videoResource.getAll().then(function (response) {

            $scope.videos = response;

            console.log($scope.videos);
        });

        $scope.onChange = function (selected) {
            alert('changed');

            if (selected === 'videos') {
                videoResource.getAll().then(function (response) {
                    $scope.overlay.videos = response;
                    console.log($scope.overlay.videos);
                });
            } else if (selected === 'playlists') {
                videoResource.getAllPlaylists().then(function (response) {
                    $scope.overlay.playlists = response;
                    console.log($scope.overlay.playlists);
                });
            }

        };
    });