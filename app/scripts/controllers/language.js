/*global angular*/

/**
 * Header Controller
 *
 * Set language.
 *
 * @see  index.html
 */
angular.module('webwalletApp').controller('LanguageCtrl', function (
	$rootScope,
    $scope,
    $translate) {

    'use strict';

	angular.element("#nav-language").click(function () {
		$scope.toggleLanguage();
		return false;
	});

    $rootScope.$on('$translateChangeEnd', function (event, args) {
        console.log('[LanguageCtrl] current language: ', args.language);
        $rootScope.language = args.language;
        
        $translate('logo-img').then(function (translation) {
            angular.element("#logo-img").attr('src', translation);
        });
        
        $translate(['nav-wallet', 'nav-what', 'nav-news', 'nav-help', 'nav-support', 'nav-language']).then(function (translations) {
            for ( var t in translations ){
            	angular.element("#" + t).html(translations[t]);
            }
        });
    });

    $scope.toggleLanguage = function () {
    	if ($rootScope.language == 'en')
            $translate.use('zh');
        else 
            $translate.use('en');
    }
});
