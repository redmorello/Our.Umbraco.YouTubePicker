angular.module("umbraco")
    .controller("Our.Umbraco.YouTubePicker.Overlay", function ($scope, videoResource) {

        $scope.onChange = function () {
            //console.log($scope.model);
            $scope.model.showResults = false;
            $scope.model.startNumber = 1; 
            $scope.model.currentLocation = currentLocation(null);
            $scope.model.totalResults = 0;
            $scope.model.selectedId = null;
            $scope.model.hideSubmitButton = true;
            $scope.model.nextPageToken = null;
            $scope.model.previousPageToken = null;

            if ($scope.model.selectedOption === 'Videos') {
                getAll(null, null);
            } else if ($scope.model.selectedOption === 'Playlists') {
                getAllPlaylists(null, null);
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

        $scope.clickPager = function(token, direction) {
            if ($scope.model.selectedOption === 'Videos') {
                getAll(token, direction);
            } else if ($scope.model.selectedOption === 'Playlists') {
                getAllPlaylists(token, direction);
            }
        };

        function getAll(token, direction) {
            videoResource.getAll($scope.model.apikey, $scope.model.channelId, $scope.model.perPage, token).then(function (response) {
                $scope.model.items = response.items;
                //console.log($scope.model.items);
                $scope.model.totalResults = response.pageInfo.totalResults;
                $scope.model.currentLocation = currentLocation(direction);
                $scope.model.nextPageToken = response.nextPageToken;
                $scope.model.previousPageToken = response.prevPageToken;
                $scope.model.showResults = true;
                $scope.model.type = 'video';
            });
        }

        function getAllPlaylists(token, direction) {
            videoResource.getAllPlaylists($scope.model.apikey, $scope.model.channelId, $scope.model.perPage, token).then(function (response) {
                $scope.model.items = response.items;
                //console.log($scope.model.items);
                $scope.model.totalResults = response.pageInfo.totalResults;
                $scope.model.currentLocation = currentLocation(direction);
                $scope.model.previousPageToken = response.prevPageToken;
                $scope.model.showResults = true;
                $scope.model.type = 'playlist';
            });
        }

        function currentLocation(direction) {
            var end;
            if (direction === 0) {
                $scope.model.startNumber = Number($scope.model.startNumber) - Number($scope.model.perPage);
                end = $scope.model.startNumber + Number($scope.model.perPage);
                return $scope.model.startNumber + ' of ' + end;
            } else if (direction === 1) {
                $scope.model.startNumber = Number($scope.model.startNumber) + Number($scope.model.perPage);
                end = $scope.model.startNumber + Number($scope.model.perPage);
                end = end > totalResults ? totalResults : end;
                return $scope.model.startNumber + ' of ' + end;
            } else {
                return '1 of ' + $scope.model.perPage;
            }
        }
    });