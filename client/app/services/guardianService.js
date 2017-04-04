import angular from 'angular';

const DOMAINS = {'guardianapis':'http://content.guardianapis.com'};
const apiKeyVal = '2248788b-c2b4-4a83-81ac-998fee831795',
  apiKey = '&api-key='+ apiKeyVal,
  basicURL = 'http://content.guardianapis.com',
  action = '/search?',
  q = 'q=',
  section= 'news',
  searchParams = '',

  order='order-by=relevance&',
  showBlocks='show-blocks=all&',

  format = '&format=jsonp',
  jsonp = '&JSONPRequest=?',
  searchType='&search=reactive';

class Guardian {
	constructor($q, $http, $sce) {
		"ngInject";

		Object.assign(this, {$q, $http, $sce});
	}

	checkItem(url) {
    var _url = basicURL+"/"+url;
    this.$sce.trustAsResourceUrl(_url);
    return this.$http.get(_url, {
      params: {
        callback: 'JSON_CALLBACK',
        ['api-key']: apiKeyVal
      }
    })
  }

  queryApi(params) {
    var _url = basicURL+action+
      'section='+(params.section || section)+'&'+
      q+encodeURIComponent(params.searchFor)+
      apiKey;
    
    this.$sce.trustAsResourceUrl(_url)
    return this.$http.get(_url); 
  }
	
}

export default angular.module('guardian', [])
	.service('guardianService',  Guardian)
	.name;
