angular.module("umbraco")
    .controller("Our.Umbraco.YoutubePicker.Overlay", function ($scope, videoResource) {

        $scope.onChange = function () {
            console.log($scope.model);

            if ($scope.model.selectedOption === 'Videos') {
                $scope.model.showPlaylists = false;
                videoResource.getAll($scope.model.apikey, $scope.model.channelId).then(function (response) {
                    $scope.model.videos = response;
                    console.log($scope.model.videos);
                    $scope.model.showVideos = true;
                    $scope.model.type = 'video';
                });
            } else if ($scope.model.selectedOption === 'Playlists') {
                $scope.model.showVideos = false;
                videoResource.getAllPlaylists($scope.model.apikey, $scope.model.channelId).then(function (response) {
                    $scope.model.playlists = response;
                    //console.log($scope.model.playlists);
                    $scope.model.showPlaylists = true;
                    $scope.model.type = 'playlist';
                });
            }
        };

        $scope.clickItem = function (item, items, $index) {
            for (i = 0; i < items.length; i++) {
                if (i != $index) {
                    var it = items[i];
                    if (it.selected) {
                        it.selected = false;
                    }
                }
            }
            if (item.selected) {
                item.selected = false;
                $scope.model.selectedId = null;
                $scope.model.hideSubmitButton = true;
            } else {
                item.selected = true;
                $scope.model.selectedId = item.id;
                $scope.model.hideSubmitButton = false;
            }
            return item;
        };
    });