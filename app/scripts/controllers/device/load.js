/*global angular*/

angular.module('webwalletApp').controller('DeviceLoadCtrl', function (
    flash,
    $scope,
    $rootScope,
    $location) {

    'use strict';

    $scope.settings = {
        pin_protection: true,
        language: 'en'
    };
    
    if ($rootScope.language) {
    	$scope.settings.language = $rootScope.language;
    }
    $rootScope.$on('$translateChangeEnd', function (event, args) {
        $scope.settings.language = args.language;
    });
    $scope.languages = [{code: 'en', label: 'English'}, {code: 'zh', label: '中文'}];

    $scope.loadDevice = function () {
        var set = $scope.settings,
            dev = $scope.device;
        alert(set.language);

        if (set.label)
            set.label = set.label.trim();
        set.payload = set.payload.trim();

        dev.load(set).then(
            function () { $location.path('/device/' + dev.id); },
            function (err) { flash.error(err.message || 'Importing failed'); }
        );
    };

});
