'use strict';
var _ = require("lodash");
module.exports = {
  templateUrl: 'newsListComponent.html',
  controller: ["socket", "News", "$scope", function (socket, News, $scope) {
    var $ctrl = this;
    socket.on("news", function (data) {
      data.reverse()
        .map(mapDate)
        .forEach(function (news) {
        $ctrl.news.unshift(news);
      });
      $scope.$apply();
    });
    socket.on("news.delete", function (id) {
      _.remove($ctrl.news, function (newsItem) {
        return newsItem.id === id;
      });
      $scope.$apply();
    });
    $ctrl.addItems = function () {
      $ctrl.isPending = true;
      getNews($ctrl.news.length)
        .then(function (olderNews) {
          olderNews.news.forEach(function (news) {
            $ctrl.news.push(news);
          });
          $ctrl.isPending = olderNews.news.length === 0;
        });
    };
    function getNews(offset) {
      return new News()
        .$get({offset: offset})
        .then(function(list){
          list.news = list.news.map(mapDate);
          return list;
        });
    }
    function mapDate(item){
      item.createdAt = new Date(item.createdAt);
      return item;
    }
    getNews(0).then(function (news) {
      $ctrl.news = news.news;
    });
    
    $ctrl.isPending = false;
    $ctrl.news = [];
  }]
};