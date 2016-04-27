 var kioskController = angular.module('kioskController', []);
     
      kioskController.controller('SideCtrl', function($scope){
        $(document).ready(function(){
          var menuItem = $('#menu').find('a');
          menuItem.on('click', function(){
            $('#menu a').removeClass('background');
            $(this).addClass('background');
          });
        });
      }); 
     
      kioskController.controller('NewsCtrl', function ($scope, $http){
        $http.get('data/news.json').success(function(data) {
          $scope.news = data;
        });
      });

      kioskController.controller('DirectoryCtrl', function ($scope, $http, $location, $anchorScroll){
        $scope.scrollTo = function(id) {
          var old = $location.hash();
          $location.hash(id);
          $anchorScroll();
          //reset to old to keep any additional routing logic from kicking in
          $location.hash(old);
        };
        $scope.alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        $http.get('data/people.json').success(function(data) {
          $scope.people = data;
        });
      }); 

      kioskController.controller('DetailsCtrl', function ($scope, $http, $routeParams) {
        $http.get('data/people.json').success(function(data) {
         $scope.people = data;
         $scope.whichItem = $routeParams.itemId;
        });
      });  

      kioskController.controller('MapsCtrl', function(NgMap, $scope, $http) {
        

        //set default values for map
        $scope.valuex = 42.089118;
        $scope.valuey = -75.966645;
        $scope.zoom = 17;


      //get map information 
        // NgMap.getMap().then(function(map){
        //   $scope.map = map;
        // });

        $scope.onClick = function(event){
          $scope.name = event.feature.R.name;
          $scope.description = event.feature.R.description;
          console.log(event);
        }


      $http.get("data/BUBuildings.json")
      .success(function(data) {
        $scope.maps = data.features; 

      //Get array of building names from JSON file
      var names = [];
      //var buildingList =[];
      for (var i = 0; i < $scope.maps.length; i++) {
        var mapItem = $scope.maps[i];
        var mapBuildName = mapItem.properties.name;
        names.push(mapBuildName);
      }
    
      //Sort array of building names alphabetically
        names.sort();

      //Assign building names to scope variable
        $scope.buildings = names;
        });

        $scope.selectedBuilding;

       $scope.change = function(){ 
        angular.forEach($scope.maps, function(value, key) {
          if($scope.selectedBuilding == value.properties.name){ 
          $scope.name = value.properties.name;
          $scope.description = value.properties.description;
          $scope.icon = "img/marker.png";
          $scope.valuey =value.geometry.coordinates[0][0][0];
          $scope.valuex =value.geometry.coordinates[0][0][1];
          $scope.valuez = value.geometry.coordinates[0][0][2];
        };
      });

      };
    });


//code for Modal window;

//   kioskController.controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

//   $scope.items = ['item1', 'item2', 'item3'];

//   $scope.animationsEnabled = true;

//   $scope.open = function () {

//     var modalInstance = $uibModal.open({
//       animation: $scope.animationsEnabled,
//       templateUrl: 'myModalContent.html',
//       controller: 'ModalInstanceCtrl',
//       size: 'small',
//       resolve: {
//         items: function () {
//           return $scope.items;
//         }
//       }
//     });

//     modalInstance.result.then(function (selectedItem) {
//       $scope.selected = selectedItem;
//     }, function () {
//       $log.info('Modal dismissed at: ' + new Date());
//     });
//   };

//   $scope.toggleAnimation = function () {
//     $scope.animationsEnabled = !$scope.animationsEnabled;
//   };

// });

        

      

//       kioskController.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

//         $scope.items = items;
//         $scope.selected = {
//           item: $scope.items[0]
//         };

//         $scope.ok = function () {
//           $uibModalInstance.close($scope.selected.item);
//         };

//         $scope.cancel = function () {
//           $uibModalInstance.dismiss('cancel');
//         };
//       });


      kioskController.controller('CalendarCtrl', function ($scope) {
      })   
      
      
      
      