angular.module("umbraco")
    .controller("Our.Umbraco.YouTubePicker.Overlay", function ($scope, videoResource, editorService, $timeout) {

        $scope.onChange = function () {
            if ($scope.model.selectedOption === 'Videos') {
                $scope.model.submitDisabled = false;
            } else if ($scope.model.selectedOption === 'Playlists') {
                $scope.model.submitDisabled = false;
            }
        };

        $scope.onClick = function () {
            //console.log($scope.model);
            $scope.model.loading = true;
            $scope.model.showResults = false;
            $scope.model.startNumber = 1; 
            $scope.model.currentLocation = currentLocation(null);
            $scope.model.totalResults = 0;
            $scope.model.totalPages = 0;
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

        $timeout(function () {
            $scope.clickItem = function (item, items, $index) {
                for (i = 0; i < items.length; i++) {
                    if (i !== $index) {
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

                if ($scope.model.config.alloweditors === "0") {
                    if ($scope.model.submit) {
                        $scope.model.submit($scope.model);
                    }
                } else {
                    var youTubeOptions = {
                        view: "/App_Plugins/Our.Umbraco.YouTubePicker/youtubeOptions.html",
                        title: "Select Video Options",
                        //selectedId: null,
                        //type: null,
                        submitDisabled: false,
                        hideSubmitButton: true,

                        nocookie: false,
                        rel: false,
                        modestbranding: false,
                        autoplay: false,
                        fs: false,
                        type: $scope.model.type,
                        selectedId: $scope.model.selectedId,

                        submit: function (model) {
                            if ($scope.model.submit) {
                                $scope.model.submit(model);
                            }
                        },

                        close: function (oldModel) {
                            editorService.close();
                        }
                    };

                    editorService.open(youTubeOptions);
                }
            };
        });        

        $scope.close = function () {
            if ($scope.model.close) {
                $scope.model.close();
            }
        };

        $scope.clickPager = function (token, direction) {
            $scope.model.loading = true;
            search($scope.model.type, token, direction);
        };

        $timeout(function () {
            $scope.onOptionsSelect = function () {
                var rel = "rel=" + ($scope.model.rel === true ? "1" : "0");
                var modestbranding = "modestbranding=" + ($scope.model.modestbranding === true ? "1" : "0");
                var autoplay = "autoplay=" + ($scope.model.autoplay === true ? "1" : "0");
                var fs = "fs=" + ($scope.model.fs === true ? "1" : "0");
                var qs = "&" + rel + "&" + modestbranding + "&" + autoplay + "&" + fs;

                var playerUrl = ($scope.model.nocookie === true ? "https://www.youtube-nocookie.com/embed/" : "https://www.youtube.com/embed/");

                if ($scope.model.type === 'video') {
                    $scope.model.value = playerUrl + $scope.model.selectedId + '?' + qs;
                } else if ($scope.model.type === 'playlist') {
                    $scope.model.value = playerUrl + '?list=' + $scope.model.selectedId + qs;
                }

                editorService.closeAll();

                if ($scope.model.submit) {
                    $scope.model.submit($scope.model);
                }
            };
        });

        

        function search(type, token, direction) {
            videoResource.search($scope.model.config.apikey, $scope.model.config.channelId, type, $scope.model.perPage, token, $scope.model.query).then(function (response) {
                $scope.model.items = response.items;
                //console.log($scope.model.items);
                $scope.model.totalResults = response.pageInfo.totalResults;
                $scope.model.totalPages = Math.ceil($scope.model.totalResults / $scope.model.perPage);
                $scope.model.currentLocation = currentLocation(direction);
                $scope.model.nextPageToken = response.nextPageToken;
                $scope.model.previousPageToken = response.prevPageToken;
                $scope.model.showResults = true;
                $scope.model.type = type;
                $scope.model.loading = false;
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