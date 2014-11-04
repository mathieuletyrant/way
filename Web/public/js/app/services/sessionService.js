'use strict';

angular.module('app').factory('session', function($sessionStorage){
    return{
        saveUser: function(userInfo){
            $sessionStorage.user = {
                name: userInfo.name,
                facebook_id: userInfo.id,
                firstname: userInfo.first_name,
                lastname: userInfo.last_name,
                picture: userInfo.photo,
                sex: userInfo.gender
            };
        },
        deleteUser: function(){
            delete $sessionStorage.user;
        }
    }
});