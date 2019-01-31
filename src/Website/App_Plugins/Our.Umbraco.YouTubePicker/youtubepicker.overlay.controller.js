angular.module("umbraco")
    .controller("Our.Umbraco.YouTubePicker.Overlay", function ($scope, videoResource) {

        $scope.onChange = function() {
            if ($scope.model.selectedOption === 'Videos') {
                $scope.model.submitDisabled = false;
            } else if ($scope.model.selectedOption === 'Playlists') {
                $scope.model.submitDisabled = false;
            }
        }

        $scope.onClick = function () {
            console.log($scope.model);
            $scope.model.showResults = false;
            $scope.model.startNumber = 1; 
            $scope.model.currentLocation = currentLocation(null);
            $scope.model.totalResults = 0;
            $scope.model.selectedId = null;
            $scope.model.hideSubmitButton = true;
            $scope.model.nextPageToken = null;
            $scope.model.previousPageToken = null;

            if ($scope.model.selectedOption === 'Videos') {
                search('video', null, null);
            } else if ($scope.model.selectedOption === 'Playlists') {
                search('playlist', null, null);
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
                    $scope.model.selectedId = item.id.playlistId;
                } else {
                    $scope.model.selectedId = item.id.videoId;
                }
                
                $scope.model.hideSubmitButton = false;
            }
            return item;
        };

        $scope.clickPager = function (token, direction) {
            search($scope.model.type, token, direction);
        };

        function search(type, token, direction) {
            videoResource.search($scope.model.apikey, $scope.model.channelId, type, $scope.model.perPage, token, $scope.model.query).then(function (response) {
                $scope.model.items = response.items;
                //console.log($scope.model.items);
                $scope.model.totalResults = response.pageInfo.totalResults;
                $scope.model.currentLocation = currentLocation(direction);
                $scope.model.nextPageToken = response.nextPageToken;
                $scope.model.previousPageToken = response.prevPageToken;
                $scope.model.showResults = true;
                $scope.model.type = type;
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
                end = $scope.model.startNumber + Number($scope.model.perPage - 1);
                end = end > $scope.model.totalResults ? $scope.model.totalResults : end;
                return $scope.model.startNumber + ' of ' + end;
            } else {
                return '1 of ' + $scope.model.perPage;
            }
        }
    });