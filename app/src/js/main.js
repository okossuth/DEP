// Generated by CoffeeScript 1.6.2
requirejs.config({
  paths: {
    'underscore': '../../lib/underscore',
    'backbone': '../../lib/backbone',
    'handlebars': '../../lib/handlebars',
    'ovivo': '../../dist/ovivo-desktop-employee',
    'jquery': '../../lib/jquery-1.9.1',
    'templates': '../../dist/templates',
    'fastclick': '../../lib/fastclick',
    'airbrake': '../../lib/airbrake',
    'date': '../../lib/date',
    'pickadate': '../../lib/pickadate.legacy'
  },
  shim: {
    'ovivo': {
      deps: ['templates']
    },
    'templates': {
      deps: ['handlebars']
    },
    'handlebars': {
      deps: ['backbone']
    },
    'backbone': {
      deps: ['underscore']
    },
    'underscore': {
      deps: ['pickadate']
    },
    'pickadate': {
      deps: ['jquery']
    },
    'jquery': {
      deps: ['date']
    },
    'date': {
      deps: []
    }
  }
});

require(['models/resources/User', 'views/popups/EditPopupResourceNeed', 'views/popups/CreateNewPopup', 'collections/Pages', 'models/pages/Calendar', 'models/pages/Resources', 'models/pages/Settings', 'views/SideBar', 'collections/resources/ResourceNeeds', 'collections/resources/Templates', 'collections/resources/Periods', 'collections/resources/Skills', 'collections/resources/Municipalities', 'collections/resources/PrimaryDepartments', 'collections/resources/Groups', 'collections/resources/Availabilities', 'collections/resources/Users', '_features/socket.io', 'ovivo'], function(User, EditPopupResourceNeed, CreateNewPopup, Pages, CalendarPage, ResourcesPage, SettingsPage, SideBar, ResourceNeeds, Templates, Periods, Skills, Municipalities, PrimaryDepartments, Groups, Availabilities, Users, socketIO) {
  $(function() {
    socketIO.init();
    ovivo.desktop.pages = new Pages();
    ovivo.desktop.resources = {};
    $.when.apply($, _.map(['User', 'ResourceNeeds', 'Templates', 'Periods', 'Skills', 'Municipalities', 'PrimaryDepartments', 'Groups', 'Availabilities', 'Users'], function(resourceName) {
      var _resourceInstanceName;

      _resourceInstanceName = resourceName.slice(0, 1).toLowerCase() + resourceName.slice(1);
      ovivo.desktop.resources[_resourceInstanceName] = new (eval(resourceName))();
      return ovivo.desktop.resources[_resourceInstanceName].def;
    })).then(function() {
      return ovivo.desktop.pages.calendar.show();
    });
    ovivo.desktop.sideBar = new SideBar();
    _.each(['Calendar', 'Resources', 'Settings'], function(pageVarName) {
      var _page, _pageInstanceName;

      _pageInstanceName = pageVarName.slice(0, 1).toLowerCase() + pageVarName.slice(1);
      _page = ovivo.desktop.pages.addPage(eval(pageVarName + 'Page'), _pageInstanceName);
      return true;
    });
    ovivo.desktop.popups = {};
    _.each(['EditPopupResourceNeed', 'CreateNewPopup'], function(popupName) {
      var _popupInstanceName;

      _popupInstanceName = popupName.slice(0, 1).toLowerCase() + popupName.slice(1);
      return ovivo.desktop.popups[_popupInstanceName] = new (eval(popupName))();
    });
    _.each(ovivo.desktop.resources, (function() {
      var _complete, _num, _total;

      _num = 0;
      _total = 0;
      _complete = function() {
        _num += 1;
        return console.log('Resources loading: ' + Math.round(35 + 65 * _num / _total) + '%');
      };
      return function(value, name) {
        var _res;

        _res = value.initFetch();
        if (_res.then != null) {
          _total += 1;
          return _res.then(_complete);
        }
      };
    })());
    return true;
  });
  true;
  return true;
});
