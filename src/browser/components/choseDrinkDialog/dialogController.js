module.exports = function ($scope, $mdDialog,data) {
  $scope.data = data;
  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };
};

module.exports.$inject = ["$scope","$mdDialog","data"];