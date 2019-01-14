angular.module("umbraco")
    .controller("Our.Umbraco.YoutubePicker.VideoPicker", function ($scope, videoResource) {

        function setupViewModel() {
            if ($scope.model.value) {
                $scope.model.value = $scope.model.value;
                $scope.video = true;
            } else {
                $scope.video = false;
                $scope.model.value = null;
            }
        };

        setupViewModel();

        $scope.removeVideo = function() {
            $scope.model.value = null;
            $scope.video = false;
        };

        $scope.selectVideo = function () {
            $scope.overlay = {
                view: "/App_Plugins/OurUmbracoYoutubePicker/youtubeView.html",
                title: "Select a Video or Playlist",
                show: true,

                apikey: $scope.model.config.apikey,
                channelId: $scope.model.config.channelId,
                options: ['Please select...', 'Videos', 'Playlists'],
                selectedOption: 'Please select...',
                videos: [],
                playlists: [],
                showVideos: false,
                showPlaylists: false,
                selectedId: null,
                type: null,

                hideSubmitButton: true,
                submit: function (model) {
					// do submit magic here
                    $scope.overlay.show = false;
                    $scope.overlay = null;
                    $scope.video = true;
                    if (model.type === 'video') {
                        $scope.model.value = 'https://www.youtube.com/embed/' + model.selectedId + '?rel=0&modestbranding=1';
                    } else if (model.type === 'playlist') {
                        $scope.model.value = 'https://www.youtube.com/embed/?list=' + model.selectedId + '&listType=playlist&rel=0&modestbranding=1';
                    }
                    //$scope.model.value = model.selectedId;
                    //$scope.videoUrl = 'https://via.placeholder.com/150';
                },
                close: function (oldModel) {
					// do close magic here
                    $scope.overlay.show = false;
                    $scope.overlay = null;
                }
            };
        };
    });