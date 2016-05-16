 var kioskController = angular.module('kioskController', []);



//////////////////////////////////////////////////////////////////////////////
// Sidebar Controller 
///////////////////////////////////////////////////////////////////////////// 


     
      kioskController.controller('SideCtrl', function($scope){
        $(document).ready(function(){
          var menuItem = $('#menu').find('a');
          menuItem.on('click', function(){
            $('#menu a').removeClass('background');
            $(this).addClass('background');
          });
        });
      }); 


//////////////////////////////////////////////////////////////////////////////
// News Controller 
///////////////////////////////////////////////////////////////////////////// 



     
      kioskController.controller('NewsCtrl', function ($scope, $http){
        $http.get('data/news.json').success(function(data) {
          $scope.news = data;
        });
      });


//////////////////////////////////////////////////////////////////////////////
// Directory Controller 
/////////////////////////////////////////////////////////////////////////////  



      kioskController.controller('DirectoryCtrl', function ($scope, $http){

      //set default value for selected department
      $scope.selectedDepartment ="07A02D8A19BD81E8F8B10B691AB9BF58";  

      $scope.change = function(){
      $http({
        dataType: "json",
        url: "https://www.binghamton.edu/webapps/directory/dept/profile?id="+$scope.selectedDepartment+'"',
        // data: {
        //     dept: '07A02D8A19BD81E8F8B10B691AB9BF58',
        //     output: 'json',
        //     cols: 'ABHGCPQM',
        //     vkey: '9D6993EEC1865C161BF329FB7FC784FC'
        //     }
      }).success(function(data){

            $scope.employees = data.rows;
      }); 

   } 

   var search = $('#search'); 
   var searchBox = $('#search-box');
   search.on('click', function(){
    searchBox.toggle();
   });

   searchBox.find('input').on('change', function(){
    searchBox.toggle();
   });



// var searchSuccess = function(returnData){
//     var userRecord;
//     var dataSection = $('#data');
//     $.each(returnData.rows, function(key, value){
//         userRecord  = '<h2>' + value.FullName + '</h2>' + value.DirectoryNumber + '<br/><a href="mailto:'+value.Email+'">' + value.Email + '</a><br/>';
//         dataSection.append(userRecord);
//     });
// }   
      
});  



//////////////////////////////////////////////////////////////////////////////
// Map Controller 
///////////////////////////////////////////////////////////////////////////// 



      kioskController.controller('MapsCtrl', function($scope, $http, $routeParams) {

        angular.extend($scope, {
    center: {
      lat: 42.089118,
      lng: -75.966645,
      zoom: 17
    },
    layers: {
            baselayers: {
                googleHybrid: {
                    name: 'Google Hybrid',
                    layerType: 'HYBRID',
                    type: 'google'
                },
                googleRoadmap: {
                    name: 'Google Streets',
                    layerType: 'ROADMAP',
                    type: 'google'
                },
            },
            overlays:{}
        },
        layercontrol: {
                    icons: {
                      uncheck: "fa fa-toggle-off",
                      check: "fa fa-toggle-on"
                    }
               }         
  });

  $scope.markers = new Array();      

    $http.get("data/BUBuildings.json").success(function(data, status) {
            angular.extend($scope.layers.overlays, {
                buildings: {
                    name:'Buildings',
                    type: 'geoJSONShape',
                    data: data,
                    visible: true,
                    layerOptions: {
                        style: {
                                color: '#000',
                                fillColor: 'blue',
                                weight: 2.0,
                                opacity: 0.4,
                                fillOpacity: 0.2
                        }
                    }
                }
            });
        });
    $http.get("data/parkingLots.json").success(function(data, status) {
            angular.extend($scope.layers.overlays, {
                parking: {
                    name:'Parking Lots',
                    type: 'geoJSONShape',
                    data: data,
                    visible: true,
                    layerOptions: {
                        style: {
                                color: '#000',
                                fillColor: 'red',
                                weight: 2.0,
                                opacity: 0.4,
                                fillOpacity: 0.2
                        }
                    }
                }
            });
        });



        // $scope.onClick = function(event){
        //   $scope.name = event.feature.R.name;
        //   $scope.description = event.feature.R.description;
        //   console.log(event);
        // }


      $http.get("data/BUBuildings.json")
      .success(function(data) {
        $scope.buildings = data.features; 

           
      //get selected building if it is passed in from Directory
      if($routeParams.buildingId){
        $scope.selectedBuilding = $routeParams.buildingId;
          angular.forEach($scope.buildings, function(value, key) {
          if($scope.selectedBuilding == value.properties.abbr){ 
          $scope.name = value.properties.name;
          $scope.description = value.properties.description;
          $scope.center.lng =value.geometry.coordinates[0][0][0];
          $scope.center.lat =value.geometry.coordinates[0][0][1];
          $scope.center.zoom = 18;
          $scope.markers.push({
                    lng: value.geometry.coordinates[0][0][0],
                    lat: value.geometry.coordinates[0][0][1],
                    focus: true,
                    message: value.properties.name
                });
            };
         });
        }
      });

      //get selected building if selected from dropdown
       $scope.change = function(){ 
        angular.forEach($scope.buildings, function(value, key) {
          if($scope.selectedBuilding == value.properties.abbr){ 
          $scope.name = value.properties.name;
          $scope.description = value.properties.description;
          $scope.center.lng =value.geometry.coordinates[0][0][0];
          $scope.center.lat =value.geometry.coordinates[0][0][1];
          $scope.center.zoom = 18;
          $scope.markers.push({
                    lng: value.geometry.coordinates[0][0][0],
                    lat: value.geometry.coordinates[0][0][1],
                    focus: true,
                    message: value.properties.name
                });
              };
           });
          };
        });

//////////////////////////////////////////////////////////////////////////////
// Calendar Controller 
/////////////////////////////////////////////////////////////////////////////      


kioskController.controller('CalendarCtrl', function ($scope, $http) {
  $http.get('https://www.binghamton.edu/webapps/calendar/').success(function(data, status){
    $scope.calendar = data;
    console.log($scope.calendar);
  });
});   

      
      
      