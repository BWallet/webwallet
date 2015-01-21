/*global angular*/

/**
 * Error Controller
 *
 * Assign properties that show if the Transport was loaded successfully and
 * if the plugin is up to date to the Angular scope.
 *
 * @see  index.html
 * @see  error.html
 * @see  error.install.html
 */
angular.module('webwalletApp').controller('ErrorCtrl', function (
    config,
    trezor,
    trezorApi,
    trezorError,
    $scope,
    $translate) {

    'use strict';

    try {
        $scope.installers = trezorApi.installers();
        $scope.installers.forEach(function (inst) {
            if (inst.preferred) {
                $scope.selectedInstaller = inst;
            }
        });
    } catch (e) {
        trezorError = trezorError || e;

        console.error('[ErrorCtrl] Error occured while rendering the error ' +
            'view.');
        console.error(e.message);
    }

    if (trezorError === null) {
        $scope.error = false;

        if (trezor instanceof trezorApi.PluginTransport) {
            $scope.deprecatePlugin = config.deprecatePlugin;
            $scope.usingPluginTransport = true;
        }
    } else {
        $scope.error = true;
        $scope.installed = trezorError.installed !== false;
        if (trezorError.installed == false) {
            $scope.javaLink = trezorError.javaLink;
        }
        var installMessageKey = 'error.install.message';
        var pluginMessageKey = 'error.plugin-message';
        var env = trezorError.env;
        if (env.ie10) {
        	installMessageKey += '-ie10';
        	pluginMessageKey += '-ie10';
        }
        if (env.os64) {
        	installMessageKey += '-os64';
        	if (env.browser64)
        		installMessageKey += '-b64';
        	else 
        		installMessageKey += '-b32';
        } else {
        	installMessageKey += '-os32';
        }
        $scope.installMessageKey = installMessageKey;
        $scope.pluginMessageKey = pluginMessageKey;
        
        var guideUrl = 'http://mybwallet.com/docs/java-guide/zh/';
        var guidePlatformUrl = guideUrl;
        if (env.os.indexOf('Win') >= 0) {
            guidePlatformUrl += 'win';
            if (env.browser == 'IE')
                guidePlatformUrl += '-ie.html';
            else if (env.browser == 'Firefox') 
                guidePlatformUrl += '-firefox.html';
            else 
            	guidePlatformUrl += '-chrome.html';
        } else {
            guidePlatformUrl += 'osx';
            if (env.browser == 'Safari')
                guidePlatformUrl += '-safari.html';
            else if (env.browser == 'Firefox') 
                guidePlatformUrl += '-firefox.html';
            else 
            	guidePlatformUrl += '-chrome.html';
        }
        
        var guideEnableUrl = guidePlatformUrl + "#enable-java";
        var guideEnableAppletUrl = guidePlatformUrl + "#enable-applet";
        var guideSuitableUrl = guideUrl + "suitable-java.html";
        $scope.guideURLs = {};
        $scope.guideURLs.platform = guidePlatformUrl;
        $scope.guideURLs.enable = guideEnableUrl;
        $scope.guideURLs.enableApplet = guideEnableAppletUrl;
        $scope.guideURLs.suitable = guideSuitableUrl;
    }
});
