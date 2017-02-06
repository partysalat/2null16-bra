'use strict';
module.exports = {
  templateUrl: 'refreshButtonComponent.html',
  controller: ["$state",function ($state) {
    this.refresh = $state.reload;
  }]
};