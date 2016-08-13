'use strict';
var _ = require("lodash");
module.exports = {
  templateUrl: 'newsListComponent.html',
  controller: ["socket", "News", "$scope", function (socket, News, $scope) {
    var $ctrl = this;
    socket.on("news", function (data) {
      data.reverse()
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
          if(olderNews.news.length === 0){
            $ctrl.isPending = true;
            $ctrl.showLoadingIndicator = false;
          }else{
            $ctrl.isPending  = false;
          }

        });
    };
    function getNews(offset) {
      return new News()
        .$get({offset: offset});
    }
    getNews(0).then(function (news) {
      $ctrl.news = news.news;
      $ctrl.showLoadingIndicator = !_.isEmpty(news.news);
    });
    
    $ctrl.isPending = false;
    $ctrl.news = [];

  }]
};