using System;
using System.Collections.Generic;
using System.Linq;
using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;
using Newtonsoft.Json;
using Umbraco.Core.Logging;
using Umbraco.Web.Editors;
using Umbraco.Web.Mvc;

namespace Our.Umbraco.YoutubePicker.Controllers
{
    [PluginController("Our.Umbraco.YoutubePicker")]
    public class YoutubeApiController : UmbracoAuthorizedJsonController
    {
        public List<Video> GetAll(string apikey, string channelId)
        {
            if (string.IsNullOrEmpty(apikey) || string.IsNullOrEmpty(channelId))
            {
                LogHelper.Error<YoutubeApiController>("Youtube API Key or Channel ID is missing", new Exception());
                return null;
            }

            var youtubeService = new YouTubeService(new BaseClientService.Initializer()
            {
                ApiKey = apikey,
                ApplicationName = GetType().ToString()
            });

            SearchResource.ListRequest searchListRequest = youtubeService.Search.List("snippet");
            searchListRequest.ChannelId = channelId;
            searchListRequest.MaxResults = 50;
            searchListRequest.Type = "video";
            SearchListResponse response = searchListRequest.Execute();

            if (response.Items.Any())
            {
                var videos = new List<Video>();
                foreach (var searchResult in response.Items)
                {
                    videos.Add(new Video
                    {
                        Id = searchResult.Id.VideoId,
                        Title = searchResult.Snippet.Title,
                        Thumbnail = new Thumbnail
                        {
                            Height = searchResult.Snippet.Thumbnails.High.Height.ToString(),
                            Width = searchResult.Snippet.Thumbnails.High.Width.ToString(),
                            Url = searchResult.Snippet.Thumbnails.High.Url,
                        }
                    });
                }

                return videos;
            }
            return null;
        }

        public IEnumerable<Google.Apis.YouTube.v3.Data.Playlist> GetAllPlaylists(string apikey, string channelId)
        {
            if (string.IsNullOrEmpty(apikey) || string.IsNullOrEmpty(channelId))
            {
                LogHelper.Error<YoutubeApiController>("Youtube API Key or Channel ID is missing", new Exception());
                return null;
            }

            var youtubeService = new YouTubeService(new BaseClientService.Initializer()
            {
                ApiKey = apikey,
                ApplicationName = GetType().ToString()
            });

            PlaylistsResource.ListRequest playlistsListByChannelIdRequest = youtubeService.Playlists.List("snippet,contentDetails");
            playlistsListByChannelIdRequest.ChannelId = channelId;
            playlistsListByChannelIdRequest.MaxResults = 50;

            PlaylistListResponse response = playlistsListByChannelIdRequest.Execute();

            if (response.Items.Any())
            {
                return response.Items;
            }
            return null;
        }
    }

    public class Video
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("thumbnail")]
        public Thumbnail Thumbnail { get; set; }
    }
    public class Playlist
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
    }

    public class Thumbnail
    {
        [JsonProperty("url")]
        public string Url { get; set; }
        [JsonProperty("width")]
        public string Width { get; set; }
        [JsonProperty("height")]
        public string Height { get; set; }
    }
}