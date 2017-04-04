import angular from 'angular';
import template from './list.html';


class ListController {
	constructor(guardianService) {
    "ngInject";

		this.name = 'list';
		this.guardianService = guardianService;
		this.collection = null;
		this.searchText = '';
		this.section = '';
	}

	fetchCollection() {
	  this.guardianService.queryApi({
	    searchFor: this.searchText,
	    section: 'news'
	  })
	  .then( res => {
	    this.collection = res.data.response.results;
	    console.log("this.collection:", this.collection);
	  });
	}

}

let listConfig = {
	restrict: 'E',
	bindings: {},
	template,
	controller: ListController,
	controllerAs: 'listCtrl'
}

let listModule = angular.module('list', [])
	.component('list', listConfig)
	.name;

export default listModule;
	
