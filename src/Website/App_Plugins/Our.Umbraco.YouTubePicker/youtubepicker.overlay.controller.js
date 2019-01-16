angular.module("umbraco")
    .controller("Our.Umbraco.YouTubePicker.Overlay", function ($scope, videoResource) {

        $scope.onChange = function () {
            //console.log($scope.model);
            $scope.model.showResults = false;
            $scope.model.selectedId = null;
            $scope.model.hideSubmitButton = true;

            if ($scope.model.selectedOption === 'Videos') {
                videoResource.getAll($scope.model.apikey, $scope.model.channelId).then(function (response) {
                    $scope.model.items = response.items;
                    //console.log($scope.model.items);
                    $scope.model.showResults = true;
                    $scope.model.type = 'video';
                });
            } else if ($scope.model.selectedOption === 'Playlists') {
                videoResource.getAllPlaylists($scope.model.apikey, $scope.model.channelId).then(function (response) {
                    $scope.model.items = response.items;
                    //console.log($scope.model.items);
                    $scope.model.showResults = true;
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
                if ($scope.model.type === 'playlist') {
                    $scope.model.selectedId = item.id;
                } else {
                    $scope.model.selectedId = item.id.videoId;
                }
                
                $scope.model.hideSubmitButton = false;
            }
            return item;
        };
    });