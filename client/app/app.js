import angular from 'angular';
import uiRouter from 'angular-ui-router';
import jQ from 'jquery';
import Rx from 'rx-dom';
import angularMaterial from 'angular-material';

// import guardianApi from 'guardian-js';
// const guardian = require('guardian-js'); 404 ??

import 'normalize.css';
// import './app.scss'
import guardianService from './services/guardianService';
import listModule from './components/list/listComponent';


angular.module('app', [uiRouter, listModule, guardianService])
  .config(($locationProvider, $stateProvider) => {
    "ngInject";

    $stateProvider.state('article', {
      url: '/test/:api/:apiUrl',
      template: `<div>
        <h3>loading article...</h3>
      </div>`,
      controller: function($stateParams, guardianService) {
        "ngInject";
        this.itemTitle = null;
        const {apiUrl} = $stateParams;
        guardianService.checkItem(apiUrl)
          .then( data => console.log("data:", data));
      }
    })

    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .component('app', {
    template: `<div class="app">
      <div ui-view></div> 

      <list></list>

    </div>`,
    restrict: 'E'
  })





