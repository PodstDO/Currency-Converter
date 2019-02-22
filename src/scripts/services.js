app.constant('baseURL', 'https://free.currencyconverterapi.com/api/v6/');
app.constant('APIkey', '4483a148b31992545c54');
app.constant('defaultFrom', 'EUR');
app.constant('defaultTo', 'UAH');
app.constant('commissionPercantage', [0, 2, 5, 10]);
app.constant('defaultPercantage', 0);

app.service('getListOfCurrencies', ['$http', 'baseURL', 'APIkey', function($http, baseURL, APIkey) {
  this.getData = () => {
    return $http({
      method: 'GET',
      url: `${baseURL}currencies?apiKey=${APIkey}`
    }).then(({data}) => {
        this.listOfCurrencies = data.results;
      return this.listOfCurrencies;
    });
  }
}]);

app.service('getCurrency', ['$http', 'baseURL', 'APIkey', function($http, baseURL, APIkey) {
  this.getData = (curFrom, curTo) => {
    return $http({
      method: 'GET',
      url: `${baseURL}convert?apiKey=${APIkey}&q=${curFrom}_${curTo}&compact=ultra`
    }).then(({data}) => {
        this.data = data
      return this.data;
    });
  }
}]);

app.filter('excludeFrom',[function(){
  return function(array,expression,comparator){
      return array.filter(function(item){
          return !expression || !angular.equals(item,expression);
      });
  };
}]);
