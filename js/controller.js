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



      kioskController.controller('MapsCtrl', function(NgMap, $scope, $http, $routeParams) {
        
        //set default values for map
        $scope.valuex = 42.089118;
        $scope.valuey = -75.966645;
        $scope.zoom = 17;


        $scope.onClick = function(event){
          $scope.name = event.feature.R.name;
          $scope.description = event.feature.R.description;
          console.log(event);
        }


      $http.get("data/BUBuildings.json")
      .success(function(data) {
        $scope.buildings = data.features; 

           
      //get selected building if it is passed in from Directory
      if($routeParams.buildingId){
        $scope.selectedBuilding = $routeParams.buildingId;
          angular.forEach($scope.buildings, function(value, key) {
            console.log(key);
          if($scope.selectedBuilding == value.properties.abbr){ 
          $scope.name = value.properties.name;
          $scope.description = value.properties.description;
          $scope.icon = "img/marker.png";
          $scope.valuey =value.geometry.coordinates[0][0][0];
          $scope.valuex =value.geometry.coordinates[0][0][1];
          $scope.valuez = value.geometry.coordinates[0][0][2];
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
          $scope.icon = "img/marker.png";
          $scope.valuey =value.geometry.coordinates[0][0][0];
          $scope.valuex =value.geometry.coordinates[0][0][1];
          $scope.valuez = value.geometry.coordinates[0][0][2];
        };
      });

      };
    });



//////////////////////////////////////////////////////////////////////////////
// Calendar Controller 
/////////////////////////////////////////////////////////////////////////////      


kioskController.controller('CalendarCtrl', function ($scope) {
})   

      
      
      