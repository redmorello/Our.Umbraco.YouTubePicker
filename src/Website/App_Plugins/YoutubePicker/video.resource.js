// adds the resource to umbraco.resources module:
angular.module('umbraco.resources').factory('videoResource', 
    function($q, $http, umbRequestHelper) {
        // the factory object returned
        return {
            getAll: function (apikey, channelId) {
                return umbRequestHelper.resourcePromise(
                    $http.get("backoffice/YoutubePicker/YoutubeApi/GetAll/?apikey=" + apikey + "&channelId=" + channelId),
                    "Failed to retrieve the list of Videos");
            },
            getAllPlaylists: function (apikey, channelId) {
                return umbRequestHelper.resourcePromise(
                    $http.get("backoffice/YoutubePicker/YoutubeApi/GetAllPlaylists/?apikey=" + apikey + "&channelId=" + channelId),
                    "Failed to retrieve the list of Playlists");
            }
        };
    }
); 