'use strict';

angular.module('app').factory('session', function ($sessionStorage) {
    return {

        loggedUser: function (value) {
            $sessionStorage.logged = value;
        },

        getLogged: function () {
            return $sessionStorage.logged;
        },

        getUser: function () {
            return $sessionStorage.user;
        },

        getSexe: function(){
            return $sessionStorage.user.sex;
        },

        setUserCategory: function (categoryName) {
            $sessionStorage.user.category_name = categoryName;
        },

        setTimeStamp: function () {
            $sessionStorage.time = new Date();
        },

        getTimeStamp: function () {
            return $sessionStorage.time;
        },

        deleteTimeSamp: function () {
            delete $sessionStorage.time;
        },

        setCategory: function(category){
          $sessionStorage.user.category_name = category;
        },

        saveUser: function (userInfo) {
            $sessionStorage.user = {
                name            : userInfo.firstname+' '+userInfo.lastname,
                facebook_id     : userInfo.facebook_id,
                firstname       : userInfo.firstname,
                lastname        : userInfo.lastname,
                picture         : userInfo.picture,
                sex             : userInfo.sex,
                category_name   : userInfo.category_name
            };
        },

        deleteUser: function () {
            delete $sessionStorage.time;
            delete $sessionStorage.user;
            delete $sessionStorage.logged;
        }
    }
});