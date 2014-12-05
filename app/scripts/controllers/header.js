/*global angular*/

/**
 * Header Controller
 *
 * Set language.
 *
 * @see  index.html
 */
angular.module('webwalletApp').controller('HeaderCtrl', function (
	$rootScope,
    $scope,
    $translate) {

    'use strict';

    $rootScope.$on('$translateChangeEnd', function (event, args) {
        console.log('[HeaderCtrl] current language: ', args.language);
        $scope.language = args.language;
    });

    $scope.toggleLanguage = function () {
    	if ($scope.language == 'en')
            $translate.use('zh');
        else 
            $translate.use('en');
    }
});
