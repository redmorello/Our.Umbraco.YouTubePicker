angular.module("umbraco")
    .config(['$routeProvider', '$sceDelegateProvider', function ($routeProvider, $sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from YouTube domain.
            new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
            // Allow loading from YouTube nocookie domain.
            new RegExp('^(http[s]?):\/\/(w{3}.)?youtube-nocookie\.com/.+$'),
            ]);
        }])

    .controller("Our.Umbraco.YouTubePicker.VideoPicker", function ($scope, editorService) {

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

        $scope.selectVideo = function() {

            var youTubePicker = {
                view: "/App_Plugins/Our.Umbraco.YouTubePicker/youtubeView.html",
                title: "Select a Video or Playlist",
                perPage: $scope.model.config.perPage > 50 ? 50 : $scope.model.config.perPage,
                options: ['Please select...', 'Videos', 'Playlists'],
                selectedOption: 'Please select...',
                items: [],
                showResults: false,
                selectedId: null,
                type: null,
                totalResults: 0,
                totalPages: 0,
                query: null,
                submitDisabled: true,
                hideSubmitButton: true,
                config: $scope.model.config,

                submit: function (model) {
                    $scope.video = true;

                    if ($scope.model.config.alloweditors === "1") {
                        $scope.model.value = model.value;
                    } else {
                        var rel = "rel=" + ($scope.model.config.rel === "1" ? "1" : "0");
                        var modestbranding = "modestbranding=" + ($scope.model.config.modestbranding === "1" ? "1" : "0");
                        var autoplay = "autoplay=" + ($scope.model.config.autoplay === "1" ? "1" : "0");
                        var fs = "fs=" + ($scope.model.config.fs === "1" ? "1" : "0");
                        var qs = "&" + rel + "&" + modestbranding + "&" + autoplay + "&" + fs;

                        var playerUrl = ($scope.model.config.nocookie === "1" ? "https://www.youtube-nocookie.com/embed/" : "https://www.youtube.com/embed/");

                        if (model.type === 'video') {
                            $scope.model.value = playerUrl + model.selectedId + '?' + qs;
                        } else if (model.type === 'playlist') {
                            $scope.model.value = playerUrl + '?list=' + model.selectedId + qs;
                        }
                    }                    

                    editorService.closeAll();
                },
                close: function (oldModel) {
                    editorService.close();
                }
            };

            editorService.open(youTubePicker);

        };
    });