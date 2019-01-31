angular.module("umbraco")
    .controller("Our.Umbraco.YouTubePicker.VideoPicker", function ($scope) {

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
                view: "/App_Plugins/Our.Umbraco.YouTubePicker/youtubeView.html",
                title: "Select a Video or Playlist",
                show: true,

                apikey: $scope.model.config.apikey,
                channelId: $scope.model.config.channelId,
                perPage: $scope.model.config.perPage > 50 ? 50 : $scope.model.config.perPage,
                options: ['Please select...', 'Videos', 'Playlists'],
                selectedOption: 'Please select...',
                items: [],
                showResults: false,
                selectedId: null,
                type: null,
                totalResults: 0,
                query: null,
                submitDisabled: true,

                hideSubmitButton: true,
                submit: function (model) {
					// do submit magic here
                    $scope.overlay.show = false;
                    $scope.overlay = null;
                    $scope.video = true;

                    var rel = "rel=" + ($scope.model.config.rel === "1" ? "1" : "0");
                    var modestbranding = "modestbranding=" + ($scope.model.config.modestbranding === "1" ? "1" : "0");
                    var autoplay = "autoplay=" + ($scope.model.config.autoplay === "1" ? "1" : "0");
                    var fs = "fs=" + ($scope.model.config.fs === "1" ? "1" : "0");
                    var qs = rel + "&" + modestbranding + "&" + autoplay + "&" + fs;

                    var playerUrl = ($scope.model.config.nocookie === "1" ? "https://www.youtube-nocookie.com/embed/" : "https://www.youtube.com/embed/");
                    
                    if (model.type === 'video') {
                        $scope.model.value = playerUrl + model.selectedId + '?' + qs;
                    } else if (model.type === 'playlist') {
                        $scope.model.value = playerUrl + '?list=' + model.selectedId + qs;
                    }
                },
                close: function (oldModel) {
					// do close magic here
                    $scope.overlay.show = false;
                    $scope.overlay = null;
                }
            };

        };
    });