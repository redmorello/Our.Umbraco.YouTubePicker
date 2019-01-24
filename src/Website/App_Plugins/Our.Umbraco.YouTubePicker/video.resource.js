// adds the resource to umbraco.resources module:
angular.module('umbraco.resources').factory('videoResource', 
    function($q, $http, umbRequestHelper) {
        // the factory object returned
        return {
            getAll: function (apikey, channelId, perPage, pageToken) {
                return umbRequestHelper.resourcePromise(
                    $http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=" + apikey + "&channelId=" + channelId + '&maxResults=' + perPage + (pageToken !== null ? '&pageToken=' + pageToken : '')),
                    "Failed to retrieve the list of Videos");
            },
            getAllPlaylists: function (apikey, channelId, perPage, pageToken) {
                return umbRequestHelper.resourcePromise(
                    $http.get("https://www.googleapis.com/youtube/v3/playlists?part=snippet&key=" + apikey + "&channelId=" + channelId + '&maxResults=' + perPage + (pageToken !== null ? '&pageToken=' + pageToken : '')),
                    "Failed to retrieve the list of Playlists");
            }
        };
    }
); 