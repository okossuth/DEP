requirejs.config({
  paths: {
    'underscore': '../../lib/underscore',
    'backbone': '../../lib/backbone',
    'handlebars': '../../lib/handlebars',
    'ovivo': '../../dist/script-nomodule',
    'jquery': '../../lib/jquery-1.9.1',
    'templates': '../../dist/templates',
    'fastclick': '../../lib/fastclick',
    'airbrake': '../../lib/airbrake',
    'date': '../../lib/date',
    'pickadate': '../../lib/pickadate.legacy',
    'modernizr': '../../lib/modernizr',
    'srgs-parser': '../../lib/srgs-parser',
    'alert': '../../lib/alert'
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
      deps: ['alert']
    },
    'alert': {
      deps: ['modernizr']
    },
    'modernizr': {
      deps: []
    }
  }
});

require(['routers/main', 'models/resources/User', 'models/resources/Communication', 'views/popups/EditPopupWorkingHour', 'views/popups/EditPopupTimeoff', 'views/popups/CreateNewPopup', 'collections/Pages', 'models/pages/Calendar', 'models/pages/Settings', 'models/pages/Feedback', 'models/pages/Help', 'models/pages/Notifications', 'models/pages/EventDetails', 'models/pages/EditWorkingHours', 'models/pages/EditInactivity', 'models/VoiceRecognition', 'views/SideBar', 'collections/resources/Notifications', 'collections/resources/Events', 'collections/resources/Municipalities', 'collections/resources/PrimaryDepartments', 'collections/resources/Groups', 'collections/resources/GroupRelations', 'collections/resources/WorkingHours', 'collections/resources/Inactivities', 'collections/ApiErrors', '_features/socket.io', 'ovivo'], function(routerMain, User, Communication, EditPopupWorkingHour, EditPopupTimeoff, CreateNewPopup, Pages, CalendarPage, SettingsPage, FeedbackPage, HelpPage, NotificationsPage, EventDetailsPage, EditWorkingHoursPage, EditInactivityPage, VoiceRecognition, SideBar, Notifications, Events, Municipalities, PrimaryDepartments, Groups, GroupRelations, WorkingHours, Inactivities, ApiErrors, socketIO) {
  $(function() {
    socketIO.init();
    ovivo.desktop.routers = {};
    ovivo.desktop.routers.main = routerMain;
    ovivo.desktop.pages = new Pages();
    ovivo.desktop.resources = {};
    new VoiceRecognition();
    $.when.apply($, _.map([
      {
        name: 'notifications',
        constr: Notifications
      }, {
        name: 'municipalities',
        constr: Municipalities
      }, {
        name: 'primaryDepartments',
        constr: PrimaryDepartments
      }, {
        name: 'groups',
        constr: Groups
      }, {
        name: 'user',
        constr: User
      }, {
        name: 'communication',
        constr: Communication
      }, {
        name: 'groupRelations',
        constr: GroupRelations
      }, {
        name: 'workingHours',
        constr: WorkingHours
      }, {
        name: 'inactivities',
        constr: Inactivities
      }, {
        name: 'events',
        constr: Events
      }, {
        name: 'apiErrors',
        constr: ApiErrors
      }
    ], function(o) {
      ovivo.desktop.resources[o.name] = new o.constr();
      return ovivo.desktop.resources[o.name].def;
    })).then(function() {
      ovivo.desktop.pages.calendar.show();
      return Backbone.history.start({
        pushState: true
      });
    });
    ovivo.desktop.sideBar = new SideBar();
    _.each([
      {
        name: 'calendar',
        constr: CalendarPage
      }, {
        name: 'settings',
        constr: SettingsPage
      }, {
        name: 'feedback',
        constr: FeedbackPage
      }, {
        name: 'help',
        constr: HelpPage
      }, {
        name: 'notifications',
        constr: NotificationsPage
      }, {
        name: 'eventDetails',
        constr: EventDetailsPage
      }, {
        name: 'editWorkingHours',
        constr: EditWorkingHoursPage
      }, {
        name: 'editInactivity',
        constr: EditInactivityPage
      }
    ], function(o) {
      var _page;
      _page = ovivo.desktop.pages.addPage(o.constr, o.name);
      return true;
    });
    ovivo.desktop.popups = {};
    ovivo.desktop.popups.shown = {};
    _.each([
      {
        name: 'editPopupWorkingHour',
        constr: EditPopupWorkingHour
      }, {
        name: 'editPopupTimeoff',
        constr: EditPopupTimeoff
      }, {
        name: 'createNewPopup',
        constr: CreateNewPopup
      }
    ], function(o) {
      return ovivo.desktop.popups[o.name] = new o.constr();
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
