
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-cssanimations-prefixed-testprop-testallprops-domprefixes
 */
;window.Modernizr=function(a,b,c){function w(a){i.cssText=a}function x(a,b){return w(prefixes.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b){for(var d in a){var e=a[d];if(!z(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}function C(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+m.join(d+" ")+d).split(" ");return y(b,"string")||y(b,"undefined")?A(e,b):(e=(a+" "+n.join(d+" ")+d).split(" "),B(e,b,c))}var d="2.6.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l="Webkit Moz O ms",m=l.split(" "),n=l.toLowerCase().split(" "),o={},p={},q={},r=[],s=r.slice,t,u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=s.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(s.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(s.call(arguments)))};return e}),o.cssanimations=function(){return C("animationName")};for(var D in o)v(o,D)&&(t=D.toLowerCase(),e[t]=o[D](),r.push((e[t]?"":"no-")+t));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),h=j=null,e._version=d,e._domPrefixes=n,e._cssomPrefixes=m,e.testProp=function(a){return A([a])},e.testAllProps=C,e.prefixed=function(a,b,c){return b?C(a,b,c):C(a,"pfx")},e}(this,this.document);
define("modernizr", function(){});

;(function(process){  require.m = { 0:[function(require,module,exports){ window.playAlert = require('./');
 },{"./":1}],1:[function(require,module,exports){ var play    = require('play-audio'),
    content = require('./content'),
    playing = play().autoplay();

module.exports = playAlert;
module.exports.content = content;
module.exports.volume = playing.volume;
module.exports.player = playing;

function playAlert(name){
  name || ( name = 'bottle' );

  if (!content[name]) return;

  playing.src(content[name]);
}
 },{"./content":2,"play-audio":3}],2:[function(require,module,exports){ module.exports = {
  bottle: ['http://i.cloudup.com/y29czRwU3R.m4a', 'http://i.cloudup.com/baNnhH1I7M.ogg'],
  funk: ['http://i.cloudup.com/KkfWRzYC77.m4a', 'http://i.cloudup.com/7SSbOm5XZS.ogg'],
  glass: ['http://i.cloudup.com/E021I9zUG3.m4a', 'http://i.cloudup.com/3gveeCqUD6.ogg'],
  morse: ['http://i.cloudup.com/h7r7MsF4q3.m4a', 'http://i.cloudup.com/b0EXCVaceT.ogg'],
  pop: ['http://i.cloudup.com/vTka9yOizT.m4a', 'http://i.cloudup.com/4TnDj0v9GE.ogg'],
  purr: ['http://i.cloudup.com/5HJSHCtOzZ.m4a', 'http://i.cloudup.com/YdDNGA0sj5.ogg'],
  submarine: ['http://i.cloudup.com/r4ZENSF0Hu.m4a', 'http://i.cloudup.com/2OPb5OYAI2.ogg'],
  tink: ['http://i.cloudup.com/nCtoNq3kJN.m4a', 'http://i.cloudup.com/SNi1RX8iwb.ogg']
};
 },{}],3:[function(require,module,exports){ module.exports = require('./lib/player');
 },{"./lib/player":4}],4:[function(require,module,exports){ var newChain  = require('new-chain'),
    src = require('./src'),
    render = require('./render');

module.exports = play;

function play(urls, dom){
  var el, chain, url;

  dom || ( dom = document.documentElement );
  el = render();
  dom.appendChild(el);

  chain = newChain({
    autoplay: bool('autoplay'),
    controls: bool('controls'),
    load: method('load'),
    loop: bool('loop'),
    muted: bool('muted'),
    on: on,
    pause: method('pause'),
    play: method('play'),
    preload: bool('preload')
  });

  chain.currentTime = attr('currentTime');
  chain.element = element;
  chain.src = src.attr(el);
  chain.volume = attr('volume');
  chain.remove = remove;

  chain.src(urls);

  return chain;

  function attr(name){
    return function(value){
      if ( arguments.length ) {
        el[name] = value;
        return chain;
      }

      return el[name];
    };
  }

  function bool(name){
    return function(value){
      if (value === false) {
        return el[name] = false;
      }

      return el[name] = true;
    };
  }

  function element(){
    return el;
  }

  function on(event, callback){
    el.addEventListener(event, callback, false);
  }

  function method(name){
    return function(){
      return el[name].apply(el, arguments);
    };
  }

  function remove(){
    return el.parentNode.removeChild(el);
  }

}
 },{"./src":5,"./render":7,"new-chain":10}],5:[function(require,module,exports){ var mimeOf = require("./mime");

module.exports = {
  attr: attr,
  pick: pick
};

function attr(el){
  var value;

  return function(urls){
    if (arguments.length) {
      value = urls;
      el.setAttribute('src', pick(el, value));
    }

    return value;
  };
}

function pick(el, urls){
  if(!urls) return;

  if(typeof urls == 'string'){
    return urls;
  }

  return urls.filter(function(url){
    return !!el.canPlayType(mimeOf(url));
  })[0];
}
 },{"./mime":6}],7:[function(require,module,exports){ var domify = require('domify'),
    templates = require("./templates");

module.exports = render;

function render(src){
  return domify(templates['audio.html']);
}
 },{"./templates":8,"domify":9}],8:[function(require,module,exports){ exports["audio.html"] = "<audio preload=\"auto\" /></audio>" },{}],6:[function(require,module,exports){ var table = {
  aif  : "audio/x-aiff",
  aiff : "audio/x-aiff",
  wav  : "audio/x-wav",
  mp3  : 'audio/mpeg',
  m3u  : "audio/x-mpegurl",
  mid  : "audio/midi",
  midi : "audio/midi",
  m4a  : 'audio/m4a',
  ogg  : 'audio/ogg'
};

module.exports = mimeOf;

function mimeOf(url){
  return table[ url.split('.').slice(-1)[0] ];
}
 },{}],10:[function(require,module,exports){ module.exports = newChain;
module.exports.from = from;

function from(chain){

  return function(){
    var m, i;

    m = methods.apply(undefined, arguments);
    i   = m.length;

    while ( i -- ) {
      chain[ m[i].name ] = m[i].fn;
    }

    m.forEach(function(method){
      chain[ method.name ] = function(){
        method.fn.apply(this, arguments);
        return chain;
      };
    });

    return chain;
  };

}

function methods(){
  var all, el, i, len, result, key;

  all    = Array.prototype.slice.call(arguments);
  result = [];
  i      = all.length;

  while ( i -- ) {
    el = all[i];

    if ( typeof el == 'function' ) {
      result.push({ name: el.name, fn: el });
      continue;
    }

    if ( typeof el != 'object' ) continue;

    for ( key in el ) {
      result.push({ name: key, fn: el[key] });
    }
  }

  return result;
}

function newChain(){
  return from({}).apply(undefined, arguments);
}
 },{}],9:[function(require,module,exports){ 
/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Wrap map from jquery.
 */

var map = {
  option: [1, '<select multiple="multiple">', '</select>'],
  optgroup: [1, '<select multiple="multiple">', '</select>'],
  legend: [1, '<fieldset>', '</fieldset>'],
  thead: [1, '<table>', '</table>'],
  tbody: [1, '<table>', '</table>'],
  tfoot: [1, '<table>', '</table>'],
  colgroup: [1, '<table>', '</table>'],
  caption: [1, '<table>', '</table>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
  th: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  _default: [0, '', '']
};

/**
 * Parse `html` and return the children.
 *
 * @param {String} html
 * @return {Array}
 * @api private
 */

function parse(html) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) throw new Error('No elements were generated.');
  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = document.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = document.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  var els = el.children;
  if (1 == els.length) {
    return el.removeChild(els[0]);
  }

  var fragment = document.createDocumentFragment();
  while (els.length) {
    fragment.appendChild(el.removeChild(els[0]));
  }

  return fragment;
}
 },{}] }; function require(o){ if(o[2]) return o[2].exports; o[0](function(u){ if(!require.m[o[1][u]]) { throw new Error('Cannot find module "' + u + '"'); } return require(require.m[o[1][u]]); }, o[2] = { exports: {} }, o[2].exports); return o[2].exports; };  return require(require.m[0]); }({ env:{} }));
define("alert", ["modernizr"], function(){});

/**
 * @version: 1.0 Alpha-1
 * @author: Coolite Inc. http://www.coolite.com/
 * @date: 2008-05-13
 * @copyright: Copyright (c) 2006-2008, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * @website: http://www.datejs.com/
 */
Date.CultureInfo={name:"da-DK",englishName:"Danish (Denmark)",nativeName:"dansk (Danmark)",dayNames:["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],abbreviatedDayNames:["sø","ma","ti","on","to","fr","lø"],shortestDayNames:["sø","ma","ti","on","to","fr","lø"],firstLetterDayNames:["s","m","t","o","t","f","l"],monthNames:["januar","februar","marts","april","maj","juni","juli","august","september","oktober","november","december"],abbreviatedMonthNames:["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"],amDesignator:"",pmDesignator:"",firstDayOfWeek:1,twoDigitYearMax:2029,dateElementOrder:"dmy",formatPatterns:{shortDate:"dd-MM-yyyy",longDate:"d. MMMM yyyy",shortTime:"HH:mm",longTime:"HH:mm:ss",fullDateTime:"d. MMMM yyyy HH:mm:ss",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"d. MMMM",yearMonth:"MMMM yyyy"},regexPatterns:{jan:/^jan(uar)?/i,feb:/^feb(ruar)?/i,mar:/^mar(ts)?/i,apr:/^apr(il)?/i,may:/^maj/i,jun:/^jun(i)?/i,jul:/^jul(i)?/i,aug:/^aug(ust)?/i,sep:/^sep(t(ember)?)?/i,oct:/^okt(ober)?/i,nov:/^nov(ember)?/i,dec:/^dec(ember)?/i,sun:/^søndag/i,mon:/^mandag/i,tue:/^tirsdag/i,wed:/^onsdag/i,thu:/^torsdag/i,fri:/^fredag/i,sat:/^lørdag/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|aft(er)?|from|hence)/i,subtract:/^(\-|bef(ore)?|ago)/i,yesterday:/^yes(terday)?/i,today:/^t(od(ay)?)?/i,tomorrow:/^tom(orrow)?/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^mn|min(ute)?s?/i,hour:/^h(our)?s?/i,week:/^w(eek)?s?/i,month:/^m(onth)?s?/i,day:/^d(ay)?s?/i,year:/^y(ear)?s?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a(?!u|p)|p)/i},timezones:[{name:"UTC",offset:"-000"},{name:"GMT",offset:"-000"},{name:"EST",offset:"-0500"},{name:"EDT",offset:"-0400"},{name:"CST",offset:"-0600"},{name:"CDT",offset:"-0500"},{name:"MST",offset:"-0700"},{name:"MDT",offset:"-0600"},{name:"PST",offset:"-0800"},{name:"PDT",offset:"-0700"}]};
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,p=function(s,l){if(!l){l=2;}
return("000"+s).slice(l*-1);};$P.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;};$P.setTimeToNow=function(){var n=new Date();this.setHours(n.getHours());this.setMinutes(n.getMinutes());this.setSeconds(n.getSeconds());this.setMilliseconds(n.getMilliseconds());return this;};$D.today=function(){return new Date().clearTime();};$D.compare=function(date1,date2){if(isNaN(date1)||isNaN(date2)){throw new Error(date1+" - "+date2);}else if(date1 instanceof Date&&date2 instanceof Date){return(date1<date2)?-1:(date1>date2)?1:0;}else{throw new TypeError(date1+" - "+date2);}};$D.equals=function(date1,date2){return(date1.compareTo(date2)===0);};$D.getDayNumberFromName=function(name){var n=$C.dayNames,m=$C.abbreviatedDayNames,o=$C.shortestDayNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s||o[i].toLowerCase()==s){return i;}}
return-1;};$D.getMonthNumberFromName=function(name){var n=$C.monthNames,m=$C.abbreviatedMonthNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};$D.isLeapYear=function(year){return((year%4===0&&year%100!==0)||year%400===0);};$D.getDaysInMonth=function(year,month){return[31,($D.isLeapYear(year)?29:28),31,30,31,30,31,31,30,31,30,31][month];};$D.getTimezoneAbbreviation=function(offset){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].offset===offset){return z[i].name;}}
return null;};$D.getTimezoneOffset=function(name){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].name===name.toUpperCase()){return z[i].offset;}}
return null;};$P.clone=function(){return new Date(this.getTime());};$P.compareTo=function(date){return Date.compare(this,date);};$P.equals=function(date){return Date.equals(this,date||new Date());};$P.between=function(start,end){return this.getTime()>=start.getTime()&&this.getTime()<=end.getTime();};$P.isAfter=function(date){return this.compareTo(date||new Date())===1;};$P.isBefore=function(date){return(this.compareTo(date||new Date())===-1);};$P.isToday=function(){return this.isSameDay(new Date());};$P.isSameDay=function(date){return this.clone().clearTime().equals(date.clone().clearTime());};$P.addMilliseconds=function(value){this.setMilliseconds(this.getMilliseconds()+value);return this;};$P.addSeconds=function(value){return this.addMilliseconds(value*1000);};$P.addMinutes=function(value){return this.addMilliseconds(value*60000);};$P.addHours=function(value){return this.addMilliseconds(value*3600000);};$P.addDays=function(value){this.setDate(this.getDate()+value);return this;};$P.addWeeks=function(value){return this.addDays(value*7);};$P.addMonths=function(value){var n=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+value);this.setDate(Math.min(n,$D.getDaysInMonth(this.getFullYear(),this.getMonth())));return this;};$P.addYears=function(value){return this.addMonths(value*12);};$P.add=function(config){if(typeof config=="number"){this._orient=config;return this;}
var x=config;if(x.milliseconds){this.addMilliseconds(x.milliseconds);}
if(x.seconds){this.addSeconds(x.seconds);}
if(x.minutes){this.addMinutes(x.minutes);}
if(x.hours){this.addHours(x.hours);}
if(x.weeks){this.addWeeks(x.weeks);}
if(x.months){this.addMonths(x.months);}
if(x.years){this.addYears(x.years);}
if(x.days){this.addDays(x.days);}
return this;};var $y,$m,$d;$P.getWeek=function(){var a,b,c,d,e,f,g,n,s,w;$y=(!$y)?this.getFullYear():$y;$m=(!$m)?this.getMonth()+1:$m;$d=(!$d)?this.getDate():$d;if($m<=2){a=$y-1;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=0;f=$d-1+(31*($m-1));}else{a=$y;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=s+1;f=$d+((153*($m-3)+2)/5)+58+s;}
g=(a+b)%7;d=(f+g-e)%7;n=(f+3-d)|0;if(n<0){w=53-((g-s)/5|0);}else if(n>364+s){w=1;}else{w=(n/7|0)+1;}
$y=$m=$d=null;return w;};$P.getISOWeek=function(){$y=this.getUTCFullYear();$m=this.getUTCMonth()+1;$d=this.getUTCDate();return p(this.getWeek());};$P.setWeek=function(n){return this.moveToDayOfWeek(1).addWeeks(n-this.getWeek());};$D._validate=function(n,min,max,name){if(typeof n=="undefined"){return false;}else if(typeof n!="number"){throw new TypeError(n+" is not a Number.");}else if(n<min||n>max){throw new RangeError(n+" is not a valid value for "+name+".");}
return true;};$D.validateMillisecond=function(value){return $D._validate(value,0,999,"millisecond");};$D.validateSecond=function(value){return $D._validate(value,0,59,"second");};$D.validateMinute=function(value){return $D._validate(value,0,59,"minute");};$D.validateHour=function(value){return $D._validate(value,0,23,"hour");};$D.validateDay=function(value,year,month){return $D._validate(value,1,$D.getDaysInMonth(year,month),"day");};$D.validateMonth=function(value){return $D._validate(value,0,11,"month");};$D.validateYear=function(value){return $D._validate(value,0,9999,"year");};$P.set=function(config){if($D.validateMillisecond(config.millisecond)){this.addMilliseconds(config.millisecond-this.getMilliseconds());}
if($D.validateSecond(config.second)){this.addSeconds(config.second-this.getSeconds());}
if($D.validateMinute(config.minute)){this.addMinutes(config.minute-this.getMinutes());}
if($D.validateHour(config.hour)){this.addHours(config.hour-this.getHours());}
if($D.validateMonth(config.month)){this.addMonths(config.month-this.getMonth());}
if($D.validateYear(config.year)){this.addYears(config.year-this.getFullYear());}
if($D.validateDay(config.day,this.getFullYear(),this.getMonth())){this.addDays(config.day-this.getDate());}
if(config.timezone){this.setTimezone(config.timezone);}
if(config.timezoneOffset){this.setTimezoneOffset(config.timezoneOffset);}
if(config.week&&$D._validate(config.week,0,53,"week")){this.setWeek(config.week);}
return this;};$P.moveToFirstDayOfMonth=function(){return this.set({day:1});};$P.moveToLastDayOfMonth=function(){return this.set({day:$D.getDaysInMonth(this.getFullYear(),this.getMonth())});};$P.moveToNthOccurrence=function(dayOfWeek,occurrence){var shift=0;if(occurrence>0){shift=occurrence-1;}
else if(occurrence===-1){this.moveToLastDayOfMonth();if(this.getDay()!==dayOfWeek){this.moveToDayOfWeek(dayOfWeek,-1);}
return this;}
return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek,+1).addWeeks(shift);};$P.moveToDayOfWeek=function(dayOfWeek,orient){var diff=(dayOfWeek-this.getDay()+7*(orient||+1))%7;return this.addDays((diff===0)?diff+=7*(orient||+1):diff);};$P.moveToMonth=function(month,orient){var diff=(month-this.getMonth()+12*(orient||+1))%12;return this.addMonths((diff===0)?diff+=12*(orient||+1):diff);};$P.getOrdinalNumber=function(){return Math.ceil((this.clone().clearTime()-new Date(this.getFullYear(),0,1))/86400000)+1;};$P.getTimezone=function(){return $D.getTimezoneAbbreviation(this.getUTCOffset());};$P.setTimezoneOffset=function(offset){var here=this.getTimezoneOffset(),there=Number(offset)*-6/10;return this.addMinutes(there-here);};$P.setTimezone=function(offset){return this.setTimezoneOffset($D.getTimezoneOffset(offset));};$P.hasDaylightSavingTime=function(){return(Date.today().set({month:0,day:1}).getTimezoneOffset()!==Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.isDaylightSavingTime=function(){return(this.hasDaylightSavingTime()&&new Date().getTimezoneOffset()===Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.getUTCOffset=function(){var n=this.getTimezoneOffset()*-10/6,r;if(n<0){r=(n-10000).toString();return r.charAt(0)+r.substr(2);}else{r=(n+10000).toString();return"+"+r.substr(1);}};$P.getElapsed=function(date){return(date||new Date())-this;};if(!$P.toISOString){$P.toISOString=function(){function f(n){return n<10?'0'+n:n;}
return'"'+this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z"';};}
$P._toString=$P.toString;$P.toString=function(format){var x=this;if(format&&format.length==1){var c=$C.formatPatterns;x.t=x.toString;switch(format){case"d":return x.t(c.shortDate);case"D":return x.t(c.longDate);case"F":return x.t(c.fullDateTime);case"m":return x.t(c.monthDay);case"r":return x.t(c.rfc1123);case"s":return x.t(c.sortableDateTime);case"t":return x.t(c.shortTime);case"T":return x.t(c.longTime);case"u":return x.t(c.universalSortableDateTime);case"y":return x.t(c.yearMonth);}}
var ord=function(n){switch(n*1){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};return format?format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g,function(m){if(m.charAt(0)==="\\"){return m.replace("\\","");}
x.h=x.getHours;switch(m){case"hh":return p(x.h()<13?(x.h()===0?12:x.h()):(x.h()-12));case"h":return x.h()<13?(x.h()===0?12:x.h()):(x.h()-12);case"HH":return p(x.h());case"H":return x.h();case"mm":return p(x.getMinutes());case"m":return x.getMinutes();case"ss":return p(x.getSeconds());case"s":return x.getSeconds();case"yyyy":return p(x.getFullYear(),4);case"yy":return p(x.getFullYear());case"dddd":return $C.dayNames[x.getDay()];case"ddd":return $C.abbreviatedDayNames[x.getDay()];case"dd":return p(x.getDate());case"d":return x.getDate();case"MMMM":return $C.monthNames[x.getMonth()];case"MMM":return $C.abbreviatedMonthNames[x.getMonth()];case"MM":return p((x.getMonth()+1));case"M":return x.getMonth()+1;case"t":return x.h()<12?$C.amDesignator.substring(0,1):$C.pmDesignator.substring(0,1);case"tt":return x.h()<12?$C.amDesignator:$C.pmDesignator;case"S":return ord(x.getDate());default:return m;}}):this._toString();};}());
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,$N=Number.prototype;$P._orient=+1;$P._nth=null;$P._is=false;$P._same=false;$P._isSecond=false;$N._dateElement="day";$P.next=function(){this._orient=+1;return this;};$D.next=function(){return $D.today().next();};$P.last=$P.prev=$P.previous=function(){this._orient=-1;return this;};$D.last=$D.prev=$D.previous=function(){return $D.today().last();};$P.is=function(){this._is=true;return this;};$P.same=function(){this._same=true;this._isSecond=false;return this;};$P.today=function(){return this.same().day();};$P.weekday=function(){if(this._is){this._is=false;return(!this.is().sat()&&!this.is().sun());}
return false;};$P.at=function(time){return(typeof time==="string")?$D.parse(this.toString("d")+" "+time):this.set(time);};$N.fromNow=$N.after=function(date){var c={};c[this._dateElement]=this;return((!date)?new Date():date.clone()).add(c);};$N.ago=$N.before=function(date){var c={};c[this._dateElement]=this*-1;return((!date)?new Date():date.clone()).add(c);};var dx=("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),mx=("january february march april may june july august september october november december").split(/\s/),px=("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),pxf=("Milliseconds Seconds Minutes Hours Date Week Month FullYear").split(/\s/),nth=("final first second third fourth fifth").split(/\s/),de;$P.toObject=function(){var o={};for(var i=0;i<px.length;i++){o[px[i].toLowerCase()]=this["get"+pxf[i]]();}
return o;};$D.fromObject=function(config){config.week=null;return Date.today().set(config);};var df=function(n){return function(){if(this._is){this._is=false;return this.getDay()==n;}
if(this._nth!==null){if(this._isSecond){this.addSeconds(this._orient*-1);}
this._isSecond=false;var ntemp=this._nth;this._nth=null;var temp=this.clone().moveToLastDayOfMonth();this.moveToNthOccurrence(n,ntemp);if(this>temp){throw new RangeError($D.getDayName(n)+" does not occur "+ntemp+" times in the month of "+$D.getMonthName(temp.getMonth())+" "+temp.getFullYear()+".");}
return this;}
return this.moveToDayOfWeek(n,this._orient);};};var sdf=function(n){return function(){var t=$D.today(),shift=n-t.getDay();if(n===0&&$C.firstDayOfWeek===1&&t.getDay()!==0){shift=shift+7;}
return t.addDays(shift);};};for(var i=0;i<dx.length;i++){$D[dx[i].toUpperCase()]=$D[dx[i].toUpperCase().substring(0,3)]=i;$D[dx[i]]=$D[dx[i].substring(0,3)]=sdf(i);$P[dx[i]]=$P[dx[i].substring(0,3)]=df(i);}
var mf=function(n){return function(){if(this._is){this._is=false;return this.getMonth()===n;}
return this.moveToMonth(n,this._orient);};};var smf=function(n){return function(){return $D.today().set({month:n,day:1});};};for(var j=0;j<mx.length;j++){$D[mx[j].toUpperCase()]=$D[mx[j].toUpperCase().substring(0,3)]=j;$D[mx[j]]=$D[mx[j].substring(0,3)]=smf(j);$P[mx[j]]=$P[mx[j].substring(0,3)]=mf(j);}
var ef=function(j){return function(){if(this._isSecond){this._isSecond=false;return this;}
if(this._same){this._same=this._is=false;var o1=this.toObject(),o2=(arguments[0]||new Date()).toObject(),v="",k=j.toLowerCase();for(var m=(px.length-1);m>-1;m--){v=px[m].toLowerCase();if(o1[v]!=o2[v]){return false;}
if(k==v){break;}}
return true;}
if(j.substring(j.length-1)!="s"){j+="s";}
return this["add"+j](this._orient);};};var nf=function(n){return function(){this._dateElement=n;return this;};};for(var k=0;k<px.length;k++){de=px[k].toLowerCase();$P[de]=$P[de+"s"]=ef(px[k]);$N[de]=$N[de+"s"]=nf(de);}
$P._ss=ef("Second");var nthfn=function(n){return function(dayOfWeek){if(this._same){return this._ss(arguments[0]);}
if(dayOfWeek||dayOfWeek===0){return this.moveToNthOccurrence(dayOfWeek,n);}
this._nth=n;if(n===2&&(dayOfWeek===undefined||dayOfWeek===null)){this._isSecond=true;return this.addSeconds(this._orient);}
return this;};};for(var l=0;l<nth.length;l++){$P[nth[l]]=(l===0)?nthfn(-1):nthfn(l);}}());
(function(){Date.Parsing={Exception:function(s){this.message="Parse error at '"+s.substring(0,10)+" ...'";}};var $P=Date.Parsing;var _=$P.Operators={rtoken:function(r){return function(s){var mx=s.match(r);if(mx){return([mx[0],s.substring(mx[0].length)]);}else{throw new $P.Exception(s);}};},token:function(s){return function(s){return _.rtoken(new RegExp("^\s*"+s+"\s*"))(s);};},stoken:function(s){return _.rtoken(new RegExp("^"+s));},until:function(p){return function(s){var qx=[],rx=null;while(s.length){try{rx=p.call(this,s);}catch(e){qx.push(rx[0]);s=rx[1];continue;}
break;}
return[qx,s];};},many:function(p){return function(s){var rx=[],r=null;while(s.length){try{r=p.call(this,s);}catch(e){return[rx,s];}
rx.push(r[0]);s=r[1];}
return[rx,s];};},optional:function(p){return function(s){var r=null;try{r=p.call(this,s);}catch(e){return[null,s];}
return[r[0],r[1]];};},not:function(p){return function(s){try{p.call(this,s);}catch(e){return[null,s];}
throw new $P.Exception(s);};},ignore:function(p){return p?function(s){var r=null;r=p.call(this,s);return[null,r[1]];}:null;},product:function(){var px=arguments[0],qx=Array.prototype.slice.call(arguments,1),rx=[];for(var i=0;i<px.length;i++){rx.push(_.each(px[i],qx));}
return rx;},cache:function(rule){var cache={},r=null;return function(s){try{r=cache[s]=(cache[s]||rule.call(this,s));}catch(e){r=cache[s]=e;}
if(r instanceof $P.Exception){throw r;}else{return r;}};},any:function(){var px=arguments;return function(s){var r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){r=null;}
if(r){return r;}}
throw new $P.Exception(s);};},each:function(){var px=arguments;return function(s){var rx=[],r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){throw new $P.Exception(s);}
rx.push(r[0]);s=r[1];}
return[rx,s];};},all:function(){var px=arguments,_=_;return _.each(_.optional(px));},sequence:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;if(px.length==1){return px[0];}
return function(s){var r=null,q=null;var rx=[];for(var i=0;i<px.length;i++){try{r=px[i].call(this,s);}catch(e){break;}
rx.push(r[0]);try{q=d.call(this,r[1]);}catch(ex){q=null;break;}
s=q[1];}
if(!r){throw new $P.Exception(s);}
if(q){throw new $P.Exception(q[1]);}
if(c){try{r=c.call(this,r[1]);}catch(ey){throw new $P.Exception(r[1]);}}
return[rx,(r?r[1]:s)];};},between:function(d1,p,d2){d2=d2||d1;var _fn=_.each(_.ignore(d1),p,_.ignore(d2));return function(s){var rx=_fn.call(this,s);return[[rx[0][0],r[0][2]],rx[1]];};},list:function(p,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return(p instanceof Array?_.each(_.product(p.slice(0,-1),_.ignore(d)),p.slice(-1),_.ignore(c)):_.each(_.many(_.each(p,_.ignore(d))),px,_.ignore(c)));},set:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return function(s){var r=null,p=null,q=null,rx=null,best=[[],s],last=false;for(var i=0;i<px.length;i++){q=null;p=null;r=null;last=(px.length==1);try{r=px[i].call(this,s);}catch(e){continue;}
rx=[[r[0]],r[1]];if(r[1].length>0&&!last){try{q=d.call(this,r[1]);}catch(ex){last=true;}}else{last=true;}
if(!last&&q[1].length===0){last=true;}
if(!last){var qx=[];for(var j=0;j<px.length;j++){if(i!=j){qx.push(px[j]);}}
p=_.set(qx,d).call(this,q[1]);if(p[0].length>0){rx[0]=rx[0].concat(p[0]);rx[1]=p[1];}}
if(rx[1].length<best[1].length){best=rx;}
if(best[1].length===0){break;}}
if(best[0].length===0){return best;}
if(c){try{q=c.call(this,best[1]);}catch(ey){throw new $P.Exception(best[1]);}
best[1]=q[1];}
return best;};},forward:function(gr,fname){return function(s){return gr[fname].call(this,s);};},replace:function(rule,repl){return function(s){var r=rule.call(this,s);return[repl,r[1]];};},process:function(rule,fn){return function(s){var r=rule.call(this,s);return[fn.call(this,r[0]),r[1]];};},min:function(min,rule){return function(s){var rx=rule.call(this,s);if(rx[0].length<min){throw new $P.Exception(s);}
return rx;};}};var _generator=function(op){return function(){var args=null,rx=[];if(arguments.length>1){args=Array.prototype.slice.call(arguments);}else if(arguments[0]instanceof Array){args=arguments[0];}
if(args){for(var i=0,px=args.shift();i<px.length;i++){args.unshift(px[i]);rx.push(op.apply(null,args));args.shift();return rx;}}else{return op.apply(null,arguments);}};};var gx="optional not ignore cache".split(/\s/);for(var i=0;i<gx.length;i++){_[gx[i]]=_generator(_[gx[i]]);}
var _vector=function(op){return function(){if(arguments[0]instanceof Array){return op.apply(null,arguments[0]);}else{return op.apply(null,arguments);}};};var vx="each any all".split(/\s/);for(var j=0;j<vx.length;j++){_[vx[j]]=_vector(_[vx[j]]);}}());(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo;var flattenAndCompact=function(ax){var rx=[];for(var i=0;i<ax.length;i++){if(ax[i]instanceof Array){rx=rx.concat(flattenAndCompact(ax[i]));}else{if(ax[i]){rx.push(ax[i]);}}}
return rx;};$D.Grammar={};$D.Translator={hour:function(s){return function(){this.hour=Number(s);};},minute:function(s){return function(){this.minute=Number(s);};},second:function(s){return function(){this.second=Number(s);};},meridian:function(s){return function(){this.meridian=s.slice(0,1).toLowerCase();};},timezone:function(s){return function(){var n=s.replace(/[^\d\+\-]/g,"");if(n.length){this.timezoneOffset=Number(n);}else{this.timezone=s.toLowerCase();}};},day:function(x){var s=x[0];return function(){this.day=Number(s.match(/\d+/)[0]);};},month:function(s){return function(){this.month=(s.length==3)?"jan feb mar apr may jun jul aug sep oct nov dec".indexOf(s)/4:Number(s)-1;};},year:function(s){return function(){var n=Number(s);this.year=((s.length>2)?n:(n+(((n+2000)<$C.twoDigitYearMax)?2000:1900)));};},rday:function(s){return function(){switch(s){case"yesterday":this.days=-1;break;case"tomorrow":this.days=1;break;case"today":this.days=0;break;case"now":this.days=0;this.now=true;break;}};},finishExact:function(x){x=(x instanceof Array)?x:[x];for(var i=0;i<x.length;i++){if(x[i]){x[i].call(this);}}
var now=new Date();if((this.hour||this.minute)&&(!this.month&&!this.year&&!this.day)){this.day=now.getDate();}
if(!this.year){this.year=now.getFullYear();}
if(!this.month&&this.month!==0){this.month=now.getMonth();}
if(!this.day){this.day=1;}
if(!this.hour){this.hour=0;}
if(!this.minute){this.minute=0;}
if(!this.second){this.second=0;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.day>$D.getDaysInMonth(this.year,this.month)){throw new RangeError(this.day+" is not a valid value for days.");}
var r=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);if(this.timezone){r.set({timezone:this.timezone});}else if(this.timezoneOffset){r.set({timezoneOffset:this.timezoneOffset});}
return r;},finish:function(x){x=(x instanceof Array)?flattenAndCompact(x):[x];if(x.length===0){return null;}
for(var i=0;i<x.length;i++){if(typeof x[i]=="function"){x[i].call(this);}}
var today=$D.today();if(this.now&&!this.unit&&!this.operator){return new Date();}else if(this.now){today=new Date();}
var expression=!!(this.days&&this.days!==null||this.orient||this.operator);var gap,mod,orient;orient=((this.orient=="past"||this.operator=="subtract")?-1:1);if(!this.now&&"hour minute second".indexOf(this.unit)!=-1){today.setTimeToNow();}
if(this.month||this.month===0){if("year day hour minute second".indexOf(this.unit)!=-1){this.value=this.month+1;this.month=null;expression=true;}}
if(!expression&&this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(!this.month){this.month=temp.getMonth();}
this.year=temp.getFullYear();}
if(expression&&this.weekday&&this.unit!="month"){this.unit="day";gap=($D.getDayNumberFromName(this.weekday)-today.getDay());mod=7;this.days=gap?((gap+(orient*mod))%mod):(orient*mod);}
if(this.month&&this.unit=="day"&&this.operator){this.value=(this.month+1);this.month=null;}
if(this.value!=null&&this.month!=null&&this.year!=null){this.day=this.value*1;}
if(this.month&&!this.day&&this.value){today.set({day:this.value*1});if(!expression){this.day=this.value*1;}}
if(!this.month&&this.value&&this.unit=="month"&&!this.now){this.month=this.value;expression=true;}
if(expression&&(this.month||this.month===0)&&this.unit!="year"){this.unit="month";gap=(this.month-today.getMonth());mod=12;this.months=gap?((gap+(orient*mod))%mod):(orient*mod);this.month=null;}
if(!this.unit){this.unit="day";}
if(!this.value&&this.operator&&this.operator!==null&&this[this.unit+"s"]&&this[this.unit+"s"]!==null){this[this.unit+"s"]=this[this.unit+"s"]+((this.operator=="add")?1:-1)+(this.value||0)*orient;}else if(this[this.unit+"s"]==null||this.operator!=null){if(!this.value){this.value=1;}
this[this.unit+"s"]=this.value*orient;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(temp.getMonth()!==today.getMonth()){this.month=temp.getMonth();}}
if((this.month||this.month===0)&&!this.day){this.day=1;}
if(!this.orient&&!this.operator&&this.unit=="week"&&this.value&&!this.day&&!this.month){return Date.today().setWeek(this.value);}
if(expression&&this.timezone&&this.day&&this.days){this.day=this.days;}
return(expression)?today.add(this):today.set(this);}};var _=$D.Parsing.Operators,g=$D.Grammar,t=$D.Translator,_fn;g.datePartDelimiter=_.rtoken(/^([\s\-\.\,\/\x27]+)/);g.timePartDelimiter=_.stoken(":");g.whiteSpace=_.rtoken(/^\s*/);g.generalDelimiter=_.rtoken(/^(([\s\,]|at|@|on)+)/);var _C={};g.ctoken=function(keys){var fn=_C[keys];if(!fn){var c=$C.regexPatterns;var kx=keys.split(/\s+/),px=[];for(var i=0;i<kx.length;i++){px.push(_.replace(_.rtoken(c[kx[i]]),kx[i]));}
fn=_C[keys]=_.any.apply(null,px);}
return fn;};g.ctoken2=function(key){return _.rtoken($C.regexPatterns[key]);};g.h=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/),t.hour));g.hh=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/),t.hour));g.H=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/),t.hour));g.HH=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/),t.hour));g.m=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.minute));g.mm=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.minute));g.s=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.second));g.ss=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.second));g.hms=_.cache(_.sequence([g.H,g.m,g.s],g.timePartDelimiter));g.t=_.cache(_.process(g.ctoken2("shortMeridian"),t.meridian));g.tt=_.cache(_.process(g.ctoken2("longMeridian"),t.meridian));g.z=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zz=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zzz=_.cache(_.process(g.ctoken2("timezone"),t.timezone));g.timeSuffix=_.each(_.ignore(g.whiteSpace),_.set([g.tt,g.zzz]));g.time=_.each(_.optional(_.ignore(_.stoken("T"))),g.hms,g.timeSuffix);g.d=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.dd=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.ddd=g.dddd=_.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"),function(s){return function(){this.weekday=s;};}));g.M=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/),t.month));g.MM=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/),t.month));g.MMM=g.MMMM=_.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"),t.month));g.y=_.cache(_.process(_.rtoken(/^(\d\d?)/),t.year));g.yy=_.cache(_.process(_.rtoken(/^(\d\d)/),t.year));g.yyy=_.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/),t.year));g.yyyy=_.cache(_.process(_.rtoken(/^(\d\d\d\d)/),t.year));_fn=function(){return _.each(_.any.apply(null,arguments),_.not(g.ctoken2("timeContext")));};g.day=_fn(g.d,g.dd);g.month=_fn(g.M,g.MMM);g.year=_fn(g.yyyy,g.yy);g.orientation=_.process(g.ctoken("past future"),function(s){return function(){this.orient=s;};});g.operator=_.process(g.ctoken("add subtract"),function(s){return function(){this.operator=s;};});g.rday=_.process(g.ctoken("yesterday tomorrow today now"),t.rday);g.unit=_.process(g.ctoken("second minute hour day week month year"),function(s){return function(){this.unit=s;};});g.value=_.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/),function(s){return function(){this.value=s.replace(/\D/g,"");};});g.expression=_.set([g.rday,g.operator,g.value,g.unit,g.orientation,g.ddd,g.MMM]);_fn=function(){return _.set(arguments,g.datePartDelimiter);};g.mdy=_fn(g.ddd,g.month,g.day,g.year);g.ymd=_fn(g.ddd,g.year,g.month,g.day);g.dmy=_fn(g.ddd,g.day,g.month,g.year);g.date=function(s){return((g[$C.dateElementOrder]||g.mdy).call(this,s));};g.format=_.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(fmt){if(g[fmt]){return g[fmt];}else{throw $D.Parsing.Exception(fmt);}}),_.process(_.rtoken(/^[^dMyhHmstz]+/),function(s){return _.ignore(_.stoken(s));}))),function(rules){return _.process(_.each.apply(null,rules),t.finishExact);});var _F={};var _get=function(f){return _F[f]=(_F[f]||g.format(f)[0]);};g.formats=function(fx){if(fx instanceof Array){var rx=[];for(var i=0;i<fx.length;i++){rx.push(_get(fx[i]));}
return _.any.apply(null,rx);}else{return _get(fx);}};g._formats=g.formats(["\"yyyy-MM-ddTHH:mm:ssZ\"","yyyy-MM-ddTHH:mm:ssZ","yyyy-MM-ddTHH:mm:ssz","yyyy-MM-ddTHH:mm:ss","yyyy-MM-ddTHH:mmZ","yyyy-MM-ddTHH:mmz","yyyy-MM-ddTHH:mm","ddd, MMM dd, yyyy H:mm:ss tt","ddd MMM d yyyy HH:mm:ss zzz","MMddyyyy","ddMMyyyy","Mddyyyy","ddMyyyy","Mdyyyy","dMyyyy","yyyy","Mdyy","dMyy","d"]);g._start=_.process(_.set([g.date,g.time,g.expression],g.generalDelimiter,g.whiteSpace),t.finish);g.start=function(s){try{var r=g._formats.call({},s);if(r[1].length===0){return r;}}catch(e){}
return g._start.call({},s);};$D._parse=$D.parse;$D.parse=function(s){var r=null;if(!s){return null;}
if(s instanceof Date){return s;}
try{r=$D.Grammar.start.call({},s.replace(/^\s*(\S*(\s+\S+)*)\s*$/,"$1"));}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};$D.getParseFunction=function(fx){var fn=$D.Grammar.formats(fx);return function(s){var r=null;try{r=fn.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};};$D.parseExact=function(s,fx){return $D.getParseFunction(fx)(s);};}());
define("date", ["alert"], function(){});

/*!
 * jQuery JavaScript Library v1.9.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-2-4
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//
var
    // The deferred used on DOM ready
    readyList,

    // A central reference to the root jQuery(document)
    rootjQuery,

    // Support: IE<9
    // For `typeof node.method` instead of `node.method !== undefined`
    core_strundefined = typeof undefined,

    // Use the correct document accordingly with window argument (sandbox)
    document = window.document,
    location = window.location,

    // Map over jQuery in case of overwrite
    _jQuery = window.jQuery,

    // Map over the $ in case of overwrite
    _$ = window.$,

    // [[Class]] -> type pairs
    class2type = {},

    // List of deleted data cache ids, so we can reuse them
    core_deletedIds = [],

    core_version = "1.9.1",

    // Save a reference to some core methods
    core_concat = core_deletedIds.concat,
    core_push = core_deletedIds.push,
    core_slice = core_deletedIds.slice,
    core_indexOf = core_deletedIds.indexOf,
    core_toString = class2type.toString,
    core_hasOwn = class2type.hasOwnProperty,
    core_trim = core_version.trim,

    // Define a local copy of jQuery
    jQuery = function( selector, context ) {
        // The jQuery object is actually just the init constructor 'enhanced'
        return new jQuery.fn.init( selector, context, rootjQuery );
    },

    // Used for matching numbers
    core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

    // Used for splitting on whitespace
    core_rnotwhite = /\S+/g,

    // Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    // Strict HTML recognition (#11290: must start with <)
    rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,

    // Match a standalone tag
    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

    // JSON RegExp
    rvalidchars = /^[\],:{}\s]*$/,
    rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
    rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

    // Matches dashed string for camelizing
    rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,

    // Used by jQuery.camelCase as callback to replace()
    fcamelCase = function( all, letter ) {
        return letter.toUpperCase();
    },

    // The ready event handler
    completed = function( event ) {

        // readyState === "complete" is good enough for us to call the dom ready in oldIE
        if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
            detach();
            jQuery.ready();
        }
    },
    // Clean-up method for dom ready events
    detach = function() {
        if ( document.addEventListener ) {
            document.removeEventListener( "DOMContentLoaded", completed, false );
            window.removeEventListener( "load", completed, false );

        } else {
            document.detachEvent( "onreadystatechange", completed );
            window.detachEvent( "onload", completed );
        }
    };

jQuery.fn = jQuery.prototype = {
    // The current version of jQuery being used
    jquery: core_version,

    constructor: jQuery,
    init: function( selector, context, rootjQuery ) {
        var match, elem;

        // HANDLE: $(""), $(null), $(undefined), $(false)
        if ( !selector ) {
            return this;
        }

        // Handle HTML strings
        if ( typeof selector === "string" ) {
            if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
                // Assume that strings that start and end with <> are HTML and skip the regex check
                match = [ null, selector, null ];

            } else {
                match = rquickExpr.exec( selector );
            }

            // Match html or make sure no context is specified for #id
            if ( match && (match[1] || !context) ) {

                // HANDLE: $(html) -> $(array)
                if ( match[1] ) {
                    context = context instanceof jQuery ? context[0] : context;

                    // scripts is true for back-compat
                    jQuery.merge( this, jQuery.parseHTML(
                        match[1],
                        context && context.nodeType ? context.ownerDocument || context : document,
                        true
                    ) );

                    // HANDLE: $(html, props)
                    if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
                        for ( match in context ) {
                            // Properties of context are called as methods if possible
                            if ( jQuery.isFunction( this[ match ] ) ) {
                                this[ match ]( context[ match ] );

                            // ...and otherwise set as attributes
                            } else {
                                this.attr( match, context[ match ] );
                            }
                        }
                    }

                    return this;

                // HANDLE: $(#id)
                } else {
                    elem = document.getElementById( match[2] );

                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document #6963
                    if ( elem && elem.parentNode ) {
                        // Handle the case where IE and Opera return items
                        // by name instead of ID
                        if ( elem.id !== match[2] ) {
                            return rootjQuery.find( selector );
                        }

                        // Otherwise, we inject the element directly into the jQuery object
                        this.length = 1;
                        this[0] = elem;
                    }

                    this.context = document;
                    this.selector = selector;
                    return this;
                }

            // HANDLE: $(expr, $(...))
            } else if ( !context || context.jquery ) {
                return ( context || rootjQuery ).find( selector );

            // HANDLE: $(expr, context)
            // (which is just equivalent to: $(context).find(expr)
            } else {
                return this.constructor( context ).find( selector );
            }

        // HANDLE: $(DOMElement)
        } else if ( selector.nodeType ) {
            this.context = this[0] = selector;
            this.length = 1;
            return this;

        // HANDLE: $(function)
        // Shortcut for document ready
        } else if ( jQuery.isFunction( selector ) ) {
            return rootjQuery.ready( selector );
        }

        if ( selector.selector !== undefined ) {
            this.selector = selector.selector;
            this.context = selector.context;
        }

        return jQuery.makeArray( selector, this );
    },

    // Start with an empty selector
    selector: "",

    // The default length of a jQuery object is 0
    length: 0,

    // The number of elements contained in the matched element set
    size: function() {
        return this.length;
    },

    toArray: function() {
        return core_slice.call( this );
    },

    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function( num ) {
        return num == null ?

            // Return a 'clean' array
            this.toArray() :

            // Return just the object
            ( num < 0 ? this[ this.length + num ] : this[ num ] );
    },

    // Take an array of elements and push it onto the stack
    // (returning the new matched element set)
    pushStack: function( elems ) {

        // Build a new jQuery matched element set
        var ret = jQuery.merge( this.constructor(), elems );

        // Add the old object onto the stack (as a reference)
        ret.prevObject = this;
        ret.context = this.context;

        // Return the newly-formed element set
        return ret;
    },

    // Execute a callback for every element in the matched set.
    // (You can seed the arguments with an array of args, but this is
    // only used internally.)
    each: function( callback, args ) {
        return jQuery.each( this, callback, args );
    },

    ready: function( fn ) {
        // Add the callback
        jQuery.ready.promise().done( fn );

        return this;
    },

    slice: function() {
        return this.pushStack( core_slice.apply( this, arguments ) );
    },

    first: function() {
        return this.eq( 0 );
    },

    last: function() {
        return this.eq( -1 );
    },

    eq: function( i ) {
        var len = this.length,
            j = +i + ( i < 0 ? len : 0 );
        return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
    },

    map: function( callback ) {
        return this.pushStack( jQuery.map(this, function( elem, i ) {
            return callback.call( elem, i, elem );
        }));
    },

    end: function() {
        return this.prevObject || this.constructor(null);
    },

    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push: core_push,
    sort: [].sort,
    splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
    var src, copyIsArray, copy, name, options, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    if ( length === i ) {
        target = this;
        --i;
    }

    for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        if ( (options = arguments[ i ]) != null ) {
            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];

                    } else {
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = jQuery.extend( deep, clone, copy );

                // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

jQuery.extend({
    noConflict: function( deep ) {
        if ( window.$ === jQuery ) {
            window.$ = _$;
        }

        if ( deep && window.jQuery === jQuery ) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    },

    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,

    // A counter to track how many items to wait for before
    // the ready event fires. See #6781
    readyWait: 1,

    // Hold (or release) the ready event
    holdReady: function( hold ) {
        if ( hold ) {
            jQuery.readyWait++;
        } else {
            jQuery.ready( true );
        }
    },

    // Handle when the DOM is ready
    ready: function( wait ) {

        // Abort if there are pending holds or we're already ready
        if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
            return;
        }

        // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
        if ( !document.body ) {
            return setTimeout( jQuery.ready );
        }

        // Remember that the DOM is ready
        jQuery.isReady = true;

        // If a normal DOM Ready event fired, decrement, and wait if need be
        if ( wait !== true && --jQuery.readyWait > 0 ) {
            return;
        }

        // If there are functions bound, to execute
        readyList.resolveWith( document, [ jQuery ] );

        // Trigger any bound ready events
        if ( jQuery.fn.trigger ) {
            jQuery( document ).trigger("ready").off("ready");
        }
    },

    // See test/unit/core.js for details concerning isFunction.
    // Since version 1.3, DOM methods and functions like alert
    // aren't supported. They return false on IE (#2968).
    isFunction: function( obj ) {
        return jQuery.type(obj) === "function";
    },

    isArray: Array.isArray || function( obj ) {
        return jQuery.type(obj) === "array";
    },

    isWindow: function( obj ) {
        return obj != null && obj == obj.window;
    },

    isNumeric: function( obj ) {
        return !isNaN( parseFloat(obj) ) && isFinite( obj );
    },

    type: function( obj ) {
        if ( obj == null ) {
            return String( obj );
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[ core_toString.call(obj) ] || "object" :
            typeof obj;
    },

    isPlainObject: function( obj ) {
        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
            return false;
        }

        try {
            // Not own constructor property must be Object
            if ( obj.constructor &&
                !core_hasOwn.call(obj, "constructor") &&
                !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
                return false;
            }
        } catch ( e ) {
            // IE8,9 Will throw exceptions on certain host objects #9897
            return false;
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.

        var key;
        for ( key in obj ) {}

        return key === undefined || core_hasOwn.call( obj, key );
    },

    isEmptyObject: function( obj ) {
        var name;
        for ( name in obj ) {
            return false;
        }
        return true;
    },

    error: function( msg ) {
        throw new Error( msg );
    },

    // data: string of html
    // context (optional): If specified, the fragment will be created in this context, defaults to document
    // keepScripts (optional): If true, will include scripts passed in the html string
    parseHTML: function( data, context, keepScripts ) {
        if ( !data || typeof data !== "string" ) {
            return null;
        }
        if ( typeof context === "boolean" ) {
            keepScripts = context;
            context = false;
        }
        context = context || document;

        var parsed = rsingleTag.exec( data ),
            scripts = !keepScripts && [];

        // Single tag
        if ( parsed ) {
            return [ context.createElement( parsed[1] ) ];
        }

        parsed = jQuery.buildFragment( [ data ], context, scripts );
        if ( scripts ) {
            jQuery( scripts ).remove();
        }
        return jQuery.merge( [], parsed.childNodes );
    },

    parseJSON: function( data ) {
        // Attempt to parse using the native JSON parser first
        if ( window.JSON && window.JSON.parse ) {
            return window.JSON.parse( data );
        }

        if ( data === null ) {
            return data;
        }

        if ( typeof data === "string" ) {

            // Make sure leading/trailing whitespace is removed (IE can't handle it)
            data = jQuery.trim( data );

            if ( data ) {
                // Make sure the incoming data is actual JSON
                // Logic borrowed from http://json.org/json2.js
                if ( rvalidchars.test( data.replace( rvalidescape, "@" )
                    .replace( rvalidtokens, "]" )
                    .replace( rvalidbraces, "")) ) {

                    return ( new Function( "return " + data ) )();
                }
            }
        }

        jQuery.error( "Invalid JSON: " + data );
    },

    // Cross-browser xml parsing
    parseXML: function( data ) {
        var xml, tmp;
        if ( !data || typeof data !== "string" ) {
            return null;
        }
        try {
            if ( window.DOMParser ) { // Standard
                tmp = new DOMParser();
                xml = tmp.parseFromString( data , "text/xml" );
            } else { // IE
                xml = new ActiveXObject( "Microsoft.XMLDOM" );
                xml.async = "false";
                xml.loadXML( data );
            }
        } catch( e ) {
            xml = undefined;
        }
        if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
            jQuery.error( "Invalid XML: " + data );
        }
        return xml;
    },

    noop: function() {},

    // Evaluates a script in a global context
    // Workarounds based on findings by Jim Driscoll
    // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
    globalEval: function( data ) {
        if ( data && jQuery.trim( data ) ) {
            // We use execScript on Internet Explorer
            // We use an anonymous function so that context is window
            // rather than jQuery in Firefox
            ( window.execScript || function( data ) {
                window[ "eval" ].call( window, data );
            } )( data );
        }
    },

    // Convert dashed to camelCase; used by the css and data modules
    // Microsoft forgot to hump their vendor prefix (#9572)
    camelCase: function( string ) {
        return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
    },

    nodeName: function( elem, name ) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },

    // args is for internal usage only
    each: function( obj, callback, args ) {
        var value,
            i = 0,
            length = obj.length,
            isArray = isArraylike( obj );

        if ( args ) {
            if ( isArray ) {
                for ( ; i < length; i++ ) {
                    value = callback.apply( obj[ i ], args );

                    if ( value === false ) {
                        break;
                    }
                }
            } else {
                for ( i in obj ) {
                    value = callback.apply( obj[ i ], args );

                    if ( value === false ) {
                        break;
                    }
                }
            }

        // A special, fast, case for the most common use of each
        } else {
            if ( isArray ) {
                for ( ; i < length; i++ ) {
                    value = callback.call( obj[ i ], i, obj[ i ] );

                    if ( value === false ) {
                        break;
                    }
                }
            } else {
                for ( i in obj ) {
                    value = callback.call( obj[ i ], i, obj[ i ] );

                    if ( value === false ) {
                        break;
                    }
                }
            }
        }

        return obj;
    },

    // Use native String.trim function wherever possible
    trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
        function( text ) {
            return text == null ?
                "" :
                core_trim.call( text );
        } :

        // Otherwise use our own trimming functionality
        function( text ) {
            return text == null ?
                "" :
                ( text + "" ).replace( rtrim, "" );
        },

    // results is for internal usage only
    makeArray: function( arr, results ) {
        var ret = results || [];

        if ( arr != null ) {
            if ( isArraylike( Object(arr) ) ) {
                jQuery.merge( ret,
                    typeof arr === "string" ?
                    [ arr ] : arr
                );
            } else {
                core_push.call( ret, arr );
            }
        }

        return ret;
    },

    inArray: function( elem, arr, i ) {
        var len;

        if ( arr ) {
            if ( core_indexOf ) {
                return core_indexOf.call( arr, elem, i );
            }

            len = arr.length;
            i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

            for ( ; i < len; i++ ) {
                // Skip accessing in sparse arrays
                if ( i in arr && arr[ i ] === elem ) {
                    return i;
                }
            }
        }

        return -1;
    },

    merge: function( first, second ) {
        var l = second.length,
            i = first.length,
            j = 0;

        if ( typeof l === "number" ) {
            for ( ; j < l; j++ ) {
                first[ i++ ] = second[ j ];
            }
        } else {
            while ( second[j] !== undefined ) {
                first[ i++ ] = second[ j++ ];
            }
        }

        first.length = i;

        return first;
    },

    grep: function( elems, callback, inv ) {
        var retVal,
            ret = [],
            i = 0,
            length = elems.length;
        inv = !!inv;

        // Go through the array, only saving the items
        // that pass the validator function
        for ( ; i < length; i++ ) {
            retVal = !!callback( elems[ i ], i );
            if ( inv !== retVal ) {
                ret.push( elems[ i ] );
            }
        }

        return ret;
    },

    // arg is for internal usage only
    map: function( elems, callback, arg ) {
        var value,
            i = 0,
            length = elems.length,
            isArray = isArraylike( elems ),
            ret = [];

        // Go through the array, translating each of the items to their
        if ( isArray ) {
            for ( ; i < length; i++ ) {
                value = callback( elems[ i ], i, arg );

                if ( value != null ) {
                    ret[ ret.length ] = value;
                }
            }

        // Go through every key on the object,
        } else {
            for ( i in elems ) {
                value = callback( elems[ i ], i, arg );

                if ( value != null ) {
                    ret[ ret.length ] = value;
                }
            }
        }

        // Flatten any nested arrays
        return core_concat.apply( [], ret );
    },

    // A global GUID counter for objects
    guid: 1,

    // Bind a function to a context, optionally partially applying any
    // arguments.
    proxy: function( fn, context ) {
        var args, proxy, tmp;

        if ( typeof context === "string" ) {
            tmp = fn[ context ];
            context = fn;
            fn = tmp;
        }

        // Quick check to determine if target is callable, in the spec
        // this throws a TypeError, but we will just return undefined.
        if ( !jQuery.isFunction( fn ) ) {
            return undefined;
        }

        // Simulated bind
        args = core_slice.call( arguments, 2 );
        proxy = function() {
            return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
        };

        // Set the guid of unique handler to the same of original handler, so it can be removed
        proxy.guid = fn.guid = fn.guid || jQuery.guid++;

        return proxy;
    },

    // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
        var i = 0,
            length = elems.length,
            bulk = key == null;

        // Sets many values
        if ( jQuery.type( key ) === "object" ) {
            chainable = true;
            for ( i in key ) {
                jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
            }

        // Sets one value
        } else if ( value !== undefined ) {
            chainable = true;

            if ( !jQuery.isFunction( value ) ) {
                raw = true;
            }

            if ( bulk ) {
                // Bulk operations run against the entire set
                if ( raw ) {
                    fn.call( elems, value );
                    fn = null;

                // ...except when executing function values
                } else {
                    bulk = fn;
                    fn = function( elem, key, value ) {
                        return bulk.call( jQuery( elem ), value );
                    };
                }
            }

            if ( fn ) {
                for ( ; i < length; i++ ) {
                    fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
                }
            }
        }

        return chainable ?
            elems :

            // Gets
            bulk ?
                fn.call( elems ) :
                length ? fn( elems[0], key ) : emptyGet;
    },

    now: function() {
        return ( new Date() ).getTime();
    }
});

jQuery.ready.promise = function( obj ) {
    if ( !readyList ) {

        readyList = jQuery.Deferred();

        // Catch cases where $(document).ready() is called after the browser event has already occurred.
        // we once tried to use readyState "interactive" here, but it caused issues like the one
        // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
        if ( document.readyState === "complete" ) {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            setTimeout( jQuery.ready );

        // Standards-based browsers support DOMContentLoaded
        } else if ( document.addEventListener ) {
            // Use the handy event callback
            document.addEventListener( "DOMContentLoaded", completed, false );

            // A fallback to window.onload, that will always work
            window.addEventListener( "load", completed, false );

        // If IE event model is used
        } else {
            // Ensure firing before onload, maybe late but safe also for iframes
            document.attachEvent( "onreadystatechange", completed );

            // A fallback to window.onload, that will always work
            window.attachEvent( "onload", completed );

            // If IE and not a frame
            // continually check to see if the document is ready
            var top = false;

            try {
                top = window.frameElement == null && document.documentElement;
            } catch(e) {}

            if ( top && top.doScroll ) {
                (function doScrollCheck() {
                    if ( !jQuery.isReady ) {

                        try {
                            // Use the trick by Diego Perini
                            // http://javascript.nwbox.com/IEContentLoaded/
                            top.doScroll("left");
                        } catch(e) {
                            return setTimeout( doScrollCheck, 50 );
                        }

                        // detach all dom ready events
                        detach();

                        // and execute any waiting functions
                        jQuery.ready();
                    }
                })();
            }
        }
    }
    return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
    var length = obj.length,
        type = jQuery.type( obj );

    if ( jQuery.isWindow( obj ) ) {
        return false;
    }

    if ( obj.nodeType === 1 && length ) {
        return true;
    }

    return type === "array" || type !== "function" &&
        ( length === 0 ||
        typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
    var object = optionsCache[ options ] = {};
    jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
        object[ flag ] = true;
    });
    return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *  options: an optional list of space-separated options that will change how
 *          the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *  once:           will ensure the callback list can only be fired once (like a Deferred)
 *
 *  memory:         will keep track of previous values and will call any callback added
 *                  after the list has been fired right away with the latest "memorized"
 *                  values (like a Deferred)
 *
 *  unique:         will ensure a callback can only be added once (no duplicate in the list)
 *
 *  stopOnFalse:    interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    options = typeof options === "string" ?
        ( optionsCache[ options ] || createOptions( options ) ) :
        jQuery.extend( {}, options );

    var // Flag to know if list is currently firing
        firing,
        // Last fire value (for non-forgettable lists)
        memory,
        // Flag to know if list was already fired
        fired,
        // End of the loop when firing
        firingLength,
        // Index of currently firing callback (modified by remove if needed)
        firingIndex,
        // First callback to fire (used internally by add and fireWith)
        firingStart,
        // Actual callback list
        list = [],
        // Stack of fire calls for repeatable lists
        stack = !options.once && [],
        // Fire callbacks
        fire = function( data ) {
            memory = options.memory && data;
            fired = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            firing = true;
            for ( ; list && firingIndex < firingLength; firingIndex++ ) {
                if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
                    memory = false; // To prevent further calls using add
                    break;
                }
            }
            firing = false;
            if ( list ) {
                if ( stack ) {
                    if ( stack.length ) {
                        fire( stack.shift() );
                    }
                } else if ( memory ) {
                    list = [];
                } else {
                    self.disable();
                }
            }
        },
        // Actual Callbacks object
        self = {
            // Add a callback or a collection of callbacks to the list
            add: function() {
                if ( list ) {
                    // First, we save the current length
                    var start = list.length;
                    (function add( args ) {
                        jQuery.each( args, function( _, arg ) {
                            var type = jQuery.type( arg );
                            if ( type === "function" ) {
                                if ( !options.unique || !self.has( arg ) ) {
                                    list.push( arg );
                                }
                            } else if ( arg && arg.length && type !== "string" ) {
                                // Inspect recursively
                                add( arg );
                            }
                        });
                    })( arguments );
                    // Do we need to add the callbacks to the
                    // current firing batch?
                    if ( firing ) {
                        firingLength = list.length;
                    // With memory, if we're not firing then
                    // we should call right away
                    } else if ( memory ) {
                        firingStart = start;
                        fire( memory );
                    }
                }
                return this;
            },
            // Remove a callback from the list
            remove: function() {
                if ( list ) {
                    jQuery.each( arguments, function( _, arg ) {
                        var index;
                        while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
                            list.splice( index, 1 );
                            // Handle firing indexes
                            if ( firing ) {
                                if ( index <= firingLength ) {
                                    firingLength--;
                                }
                                if ( index <= firingIndex ) {
                                    firingIndex--;
                                }
                            }
                        }
                    });
                }
                return this;
            },
            // Check if a given callback is in the list.
            // If no argument is given, return whether or not list has callbacks attached.
            has: function( fn ) {
                return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
            },
            // Remove all callbacks from the list
            empty: function() {
                list = [];
                return this;
            },
            // Have the list do nothing anymore
            disable: function() {
                list = stack = memory = undefined;
                return this;
            },
            // Is it disabled?
            disabled: function() {
                return !list;
            },
            // Lock the list in its current state
            lock: function() {
                stack = undefined;
                if ( !memory ) {
                    self.disable();
                }
                return this;
            },
            // Is it locked?
            locked: function() {
                return !stack;
            },
            // Call all callbacks with the given context and arguments
            fireWith: function( context, args ) {
                args = args || [];
                args = [ context, args.slice ? args.slice() : args ];
                if ( list && ( !fired || stack ) ) {
                    if ( firing ) {
                        stack.push( args );
                    } else {
                        fire( args );
                    }
                }
                return this;
            },
            // Call all the callbacks with the given arguments
            fire: function() {
                self.fireWith( this, arguments );
                return this;
            },
            // To know if the callbacks have already been called at least once
            fired: function() {
                return !!fired;
            }
        };

    return self;
};
jQuery.extend({

    Deferred: function( func ) {
        var tuples = [
                // action, add listener, listener list, final state
                [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
                [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
                [ "notify", "progress", jQuery.Callbacks("memory") ]
            ],
            state = "pending",
            promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    deferred.done( arguments ).fail( arguments );
                    return this;
                },
                then: function( /* fnDone, fnFail, fnProgress */ ) {
                    var fns = arguments;
                    return jQuery.Deferred(function( newDefer ) {
                        jQuery.each( tuples, function( i, tuple ) {
                            var action = tuple[ 0 ],
                                fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
                            // deferred[ done | fail | progress ] for forwarding actions to newDefer
                            deferred[ tuple[1] ](function() {
                                var returned = fn && fn.apply( this, arguments );
                                if ( returned && jQuery.isFunction( returned.promise ) ) {
                                    returned.promise()
                                        .done( newDefer.resolve )
                                        .fail( newDefer.reject )
                                        .progress( newDefer.notify );
                                } else {
                                    newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
                                }
                            });
                        });
                        fns = null;
                    }).promise();
                },
                // Get a promise for this deferred
                // If obj is provided, the promise aspect is added to the object
                promise: function( obj ) {
                    return obj != null ? jQuery.extend( obj, promise ) : promise;
                }
            },
            deferred = {};

        // Keep pipe for back-compat
        promise.pipe = promise.then;

        // Add list-specific methods
        jQuery.each( tuples, function( i, tuple ) {
            var list = tuple[ 2 ],
                stateString = tuple[ 3 ];

            // promise[ done | fail | progress ] = list.add
            promise[ tuple[1] ] = list.add;

            // Handle state
            if ( stateString ) {
                list.add(function() {
                    // state = [ resolved | rejected ]
                    state = stateString;

                // [ reject_list | resolve_list ].disable; progress_list.lock
                }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
            }

            // deferred[ resolve | reject | notify ]
            deferred[ tuple[0] ] = function() {
                deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
                return this;
            };
            deferred[ tuple[0] + "With" ] = list.fireWith;
        });

        // Make the deferred a promise
        promise.promise( deferred );

        // Call given func if any
        if ( func ) {
            func.call( deferred, deferred );
        }

        // All done!
        return deferred;
    },

    // Deferred helper
    when: function( subordinate /* , ..., subordinateN */ ) {
        var i = 0,
            resolveValues = core_slice.call( arguments ),
            length = resolveValues.length,

            // the count of uncompleted subordinates
            remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

            // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
            deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

            // Update function for both resolve and progress values
            updateFunc = function( i, contexts, values ) {
                return function( value ) {
                    contexts[ i ] = this;
                    values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
                    if( values === progressValues ) {
                        deferred.notifyWith( contexts, values );
                    } else if ( !( --remaining ) ) {
                        deferred.resolveWith( contexts, values );
                    }
                };
            },

            progressValues, progressContexts, resolveContexts;

        // add listeners to Deferred subordinates; treat others as resolved
        if ( length > 1 ) {
            progressValues = new Array( length );
            progressContexts = new Array( length );
            resolveContexts = new Array( length );
            for ( ; i < length; i++ ) {
                if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
                    resolveValues[ i ].promise()
                        .done( updateFunc( i, resolveContexts, resolveValues ) )
                        .fail( deferred.reject )
                        .progress( updateFunc( i, progressContexts, progressValues ) );
                } else {
                    --remaining;
                }
            }
        }

        // if we're not waiting on anything, resolve the master
        if ( !remaining ) {
            deferred.resolveWith( resolveContexts, resolveValues );
        }

        return deferred.promise();
    }
});
jQuery.support = (function() {

    var support, all, a,
        input, select, fragment,
        opt, eventName, isSupported, i,
        div = document.createElement("div");

    // Setup
    div.setAttribute( "className", "t" );
    div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

    // Support tests won't run in some limited or non-browser environments
    all = div.getElementsByTagName("*");
    a = div.getElementsByTagName("a")[ 0 ];
    if ( !all || !a || !all.length ) {
        return {};
    }

    // First batch of tests
    select = document.createElement("select");
    opt = select.appendChild( document.createElement("option") );
    input = div.getElementsByTagName("input")[ 0 ];

    a.style.cssText = "top:1px;float:left;opacity:.5";
    support = {
        // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
        getSetAttribute: div.className !== "t",

        // IE strips leading whitespace when .innerHTML is used
        leadingWhitespace: div.firstChild.nodeType === 3,

        // Make sure that tbody elements aren't automatically inserted
        // IE will insert them into empty tables
        tbody: !div.getElementsByTagName("tbody").length,

        // Make sure that link elements get serialized correctly by innerHTML
        // This requires a wrapper element in IE
        htmlSerialize: !!div.getElementsByTagName("link").length,

        // Get the style information from getAttribute
        // (IE uses .cssText instead)
        style: /top/.test( a.getAttribute("style") ),

        // Make sure that URLs aren't manipulated
        // (IE normalizes it by default)
        hrefNormalized: a.getAttribute("href") === "/a",

        // Make sure that element opacity exists
        // (IE uses filter instead)
        // Use a regex to work around a WebKit issue. See #5145
        opacity: /^0.5/.test( a.style.opacity ),

        // Verify style float existence
        // (IE uses styleFloat instead of cssFloat)
        cssFloat: !!a.style.cssFloat,

        // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
        checkOn: !!input.value,

        // Make sure that a selected-by-default option has a working selected property.
        // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
        optSelected: opt.selected,

        // Tests for enctype support on a form (#6743)
        enctype: !!document.createElement("form").enctype,

        // Makes sure cloning an html5 element does not cause problems
        // Where outerHTML is undefined, this still works
        html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

        // jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
        boxModel: document.compatMode === "CSS1Compat",

        // Will be defined later
        deleteExpando: true,
        noCloneEvent: true,
        inlineBlockNeedsLayout: false,
        shrinkWrapBlocks: false,
        reliableMarginRight: true,
        boxSizingReliable: true,
        pixelPosition: false
    };

    // Make sure checked status is properly cloned
    input.checked = true;
    support.noCloneChecked = input.cloneNode( true ).checked;

    // Make sure that the options inside disabled selects aren't marked as disabled
    // (WebKit marks them as disabled)
    select.disabled = true;
    support.optDisabled = !opt.disabled;

    // Support: IE<9
    try {
        delete div.test;
    } catch( e ) {
        support.deleteExpando = false;
    }

    // Check if we can trust getAttribute("value")
    input = document.createElement("input");
    input.setAttribute( "value", "" );
    support.input = input.getAttribute( "value" ) === "";

    // Check if an input maintains its value after becoming a radio
    input.value = "t";
    input.setAttribute( "type", "radio" );
    support.radioValue = input.value === "t";

    // #11217 - WebKit loses check when the name is after the checked attribute
    input.setAttribute( "checked", "t" );
    input.setAttribute( "name", "t" );

    fragment = document.createDocumentFragment();
    fragment.appendChild( input );

    // Check if a disconnected checkbox will retain its checked
    // value of true after appended to the DOM (IE6/7)
    support.appendChecked = input.checked;

    // WebKit doesn't clone checked state correctly in fragments
    support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

    // Support: IE<9
    // Opera does not clone events (and typeof div.attachEvent === undefined).
    // IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
    if ( div.attachEvent ) {
        div.attachEvent( "onclick", function() {
            support.noCloneEvent = false;
        });

        div.cloneNode( true ).click();
    }

    // Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
    // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP), test/csp.php
    for ( i in { submit: true, change: true, focusin: true }) {
        div.setAttribute( eventName = "on" + i, "t" );

        support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
    }

    div.style.backgroundClip = "content-box";
    div.cloneNode( true ).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";

    // Run tests that need a body at doc ready
    jQuery(function() {
        var container, marginDiv, tds,
            divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
            body = document.getElementsByTagName("body")[0];

        if ( !body ) {
            // Return for frameset docs that don't have a body
            return;
        }

        container = document.createElement("div");
        container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

        body.appendChild( container ).appendChild( div );

        // Support: IE8
        // Check if table cells still have offsetWidth/Height when they are set
        // to display:none and there are still other visible table cells in a
        // table row; if so, offsetWidth/Height are not reliable for use when
        // determining if an element has been hidden directly using
        // display:none (it is still safe to use offsets if a parent element is
        // hidden; don safety goggles and see bug #4512 for more information).
        div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
        tds = div.getElementsByTagName("td");
        tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
        isSupported = ( tds[ 0 ].offsetHeight === 0 );

        tds[ 0 ].style.display = "";
        tds[ 1 ].style.display = "none";

        // Support: IE8
        // Check if empty table cells still have offsetWidth/Height
        support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

        // Check box-sizing and margin behavior
        div.innerHTML = "";
        div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
        support.boxSizing = ( div.offsetWidth === 4 );
        support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

        // Use window.getComputedStyle because jsdom on node.js will break without it.
        if ( window.getComputedStyle ) {
            support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
            support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

            // Check if div with explicit width and no margin-right incorrectly
            // gets computed margin-right based on width of container. (#3333)
            // Fails in WebKit before Feb 2011 nightlies
            // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
            marginDiv = div.appendChild( document.createElement("div") );
            marginDiv.style.cssText = div.style.cssText = divReset;
            marginDiv.style.marginRight = marginDiv.style.width = "0";
            div.style.width = "1px";

            support.reliableMarginRight =
                !parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
        }

        if ( typeof div.style.zoom !== core_strundefined ) {
            // Support: IE<8
            // Check if natively block-level elements act like inline-block
            // elements when setting their display to 'inline' and giving
            // them layout
            div.innerHTML = "";
            div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
            support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

            // Support: IE6
            // Check if elements with layout shrink-wrap their children
            div.style.display = "block";
            div.innerHTML = "<div></div>";
            div.firstChild.style.width = "5px";
            support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

            if ( support.inlineBlockNeedsLayout ) {
                // Prevent IE 6 from affecting layout for positioned elements #11048
                // Prevent IE from shrinking the body in IE 7 mode #12869
                // Support: IE<8
                body.style.zoom = 1;
            }
        }

        body.removeChild( container );

        // Null elements to avoid leaks in IE
        container = div = tds = marginDiv = null;
    });

    // Null elements to avoid leaks in IE
    all = select = fragment = opt = a = input = null;

    return support;
})();

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    rmultiDash = /([A-Z])/g;

function internalData( elem, name, data, pvt /* Internal Use Only */ ){
    if ( !jQuery.acceptData( elem ) ) {
        return;
    }

    var thisCache, ret,
        internalKey = jQuery.expando,
        getByName = typeof name === "string",

        // We have to handle DOM nodes and JS objects differently because IE6-7
        // can't GC object references properly across the DOM-JS boundary
        isNode = elem.nodeType,

        // Only DOM nodes need the global jQuery cache; JS object data is
        // attached directly to the object so GC can occur automatically
        cache = isNode ? jQuery.cache : elem,

        // Only defining an ID for JS objects if its cache already exists allows
        // the code to shortcut on the same path as a DOM node with no cache
        id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

    // Avoid doing any more work than we need to when trying to get data on an
    // object that has no data at all
    if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
        return;
    }

    if ( !id ) {
        // Only DOM nodes need a new unique ID for each element since their data
        // ends up in the global cache
        if ( isNode ) {
            elem[ internalKey ] = id = core_deletedIds.pop() || jQuery.guid++;
        } else {
            id = internalKey;
        }
    }

    if ( !cache[ id ] ) {
        cache[ id ] = {};

        // Avoids exposing jQuery metadata on plain JS objects when the object
        // is serialized using JSON.stringify
        if ( !isNode ) {
            cache[ id ].toJSON = jQuery.noop;
        }
    }

    // An object can be passed to jQuery.data instead of a key/value pair; this gets
    // shallow copied over onto the existing cache
    if ( typeof name === "object" || typeof name === "function" ) {
        if ( pvt ) {
            cache[ id ] = jQuery.extend( cache[ id ], name );
        } else {
            cache[ id ].data = jQuery.extend( cache[ id ].data, name );
        }
    }

    thisCache = cache[ id ];

    // jQuery data() is stored in a separate object inside the object's internal data
    // cache in order to avoid key collisions between internal data and user-defined
    // data.
    if ( !pvt ) {
        if ( !thisCache.data ) {
            thisCache.data = {};
        }

        thisCache = thisCache.data;
    }

    if ( data !== undefined ) {
        thisCache[ jQuery.camelCase( name ) ] = data;
    }

    // Check for both converted-to-camel and non-converted data property names
    // If a data property was specified
    if ( getByName ) {

        // First Try to find as-is property data
        ret = thisCache[ name ];

        // Test for null|undefined property data
        if ( ret == null ) {

            // Try to find the camelCased property
            ret = thisCache[ jQuery.camelCase( name ) ];
        }
    } else {
        ret = thisCache;
    }

    return ret;
}

function internalRemoveData( elem, name, pvt ) {
    if ( !jQuery.acceptData( elem ) ) {
        return;
    }

    var i, l, thisCache,
        isNode = elem.nodeType,

        // See jQuery.data for more information
        cache = isNode ? jQuery.cache : elem,
        id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

    // If there is already no cache entry for this object, there is no
    // purpose in continuing
    if ( !cache[ id ] ) {
        return;
    }

    if ( name ) {

        thisCache = pvt ? cache[ id ] : cache[ id ].data;

        if ( thisCache ) {

            // Support array or space separated string names for data keys
            if ( !jQuery.isArray( name ) ) {

                // try the string as a key before any manipulation
                if ( name in thisCache ) {
                    name = [ name ];
                } else {

                    // split the camel cased version by spaces unless a key with the spaces exists
                    name = jQuery.camelCase( name );
                    if ( name in thisCache ) {
                        name = [ name ];
                    } else {
                        name = name.split(" ");
                    }
                }
            } else {
                // If "name" is an array of keys...
                // When data is initially created, via ("key", "val") signature,
                // keys will be converted to camelCase.
                // Since there is no way to tell _how_ a key was added, remove
                // both plain key and camelCase key. #12786
                // This will only penalize the array argument path.
                name = name.concat( jQuery.map( name, jQuery.camelCase ) );
            }

            for ( i = 0, l = name.length; i < l; i++ ) {
                delete thisCache[ name[i] ];
            }

            // If there is no data left in the cache, we want to continue
            // and let the cache object itself get destroyed
            if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
                return;
            }
        }
    }

    // See jQuery.data for more information
    if ( !pvt ) {
        delete cache[ id ].data;

        // Don't destroy the parent cache unless the internal data object
        // had been the only thing left in it
        if ( !isEmptyDataObject( cache[ id ] ) ) {
            return;
        }
    }

    // Destroy the cache
    if ( isNode ) {
        jQuery.cleanData( [ elem ], true );

    // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
    } else if ( jQuery.support.deleteExpando || cache != cache.window ) {
        delete cache[ id ];

    // When all else fails, null
    } else {
        cache[ id ] = null;
    }
}

jQuery.extend({
    cache: {},

    // Unique for each copy of jQuery on the page
    // Non-digits removed to match rinlinejQuery
    expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

    // The following elements throw uncatchable exceptions if you
    // attempt to add expando properties to them.
    noData: {
        "embed": true,
        // Ban all objects except for Flash (which handle expandos)
        "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
        "applet": true
    },

    hasData: function( elem ) {
        elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
        return !!elem && !isEmptyDataObject( elem );
    },

    data: function( elem, name, data ) {
        return internalData( elem, name, data );
    },

    removeData: function( elem, name ) {
        return internalRemoveData( elem, name );
    },

    // For internal use only.
    _data: function( elem, name, data ) {
        return internalData( elem, name, data, true );
    },

    _removeData: function( elem, name ) {
        return internalRemoveData( elem, name, true );
    },

    // A method for determining if a DOM node can handle the data expando
    acceptData: function( elem ) {
        // Do not set data on non-element because it will not be cleared (#8335).
        if ( elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9 ) {
            return false;
        }

        var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

        // nodes accept data unless otherwise specified; rejection can be conditional
        return !noData || noData !== true && elem.getAttribute("classid") === noData;
    }
});

jQuery.fn.extend({
    data: function( key, value ) {
        var attrs, name,
            elem = this[0],
            i = 0,
            data = null;

        // Gets all values
        if ( key === undefined ) {
            if ( this.length ) {
                data = jQuery.data( elem );

                if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
                    attrs = elem.attributes;
                    for ( ; i < attrs.length; i++ ) {
                        name = attrs[i].name;

                        if ( !name.indexOf( "data-" ) ) {
                            name = jQuery.camelCase( name.slice(5) );

                            dataAttr( elem, name, data[ name ] );
                        }
                    }
                    jQuery._data( elem, "parsedAttrs", true );
                }
            }

            return data;
        }

        // Sets multiple values
        if ( typeof key === "object" ) {
            return this.each(function() {
                jQuery.data( this, key );
            });
        }

        return jQuery.access( this, function( value ) {

            if ( value === undefined ) {
                // Try to fetch any internally stored data first
                return elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
            }

            this.each(function() {
                jQuery.data( this, key, value );
            });
        }, null, value, arguments.length > 1, null, true );
    },

    removeData: function( key ) {
        return this.each(function() {
            jQuery.removeData( this, key );
        });
    }
});

function dataAttr( elem, key, data ) {
    // If nothing was found internally, try to fetch any
    // data from the HTML5 data-* attribute
    if ( data === undefined && elem.nodeType === 1 ) {

        var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

        data = elem.getAttribute( name );

        if ( typeof data === "string" ) {
            try {
                data = data === "true" ? true :
                    data === "false" ? false :
                    data === "null" ? null :
                    // Only convert to a number if it doesn't change the string
                    +data + "" === data ? +data :
                    rbrace.test( data ) ? jQuery.parseJSON( data ) :
                        data;
            } catch( e ) {}

            // Make sure we set the data so it isn't changed later
            jQuery.data( elem, key, data );

        } else {
            data = undefined;
        }
    }

    return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
    var name;
    for ( name in obj ) {

        // if the public data object is empty, the private is still empty
        if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
            continue;
        }
        if ( name !== "toJSON" ) {
            return false;
        }
    }

    return true;
}
jQuery.extend({
    queue: function( elem, type, data ) {
        var queue;

        if ( elem ) {
            type = ( type || "fx" ) + "queue";
            queue = jQuery._data( elem, type );

            // Speed up dequeue by getting out quickly if this is just a lookup
            if ( data ) {
                if ( !queue || jQuery.isArray(data) ) {
                    queue = jQuery._data( elem, type, jQuery.makeArray(data) );
                } else {
                    queue.push( data );
                }
            }
            return queue || [];
        }
    },

    dequeue: function( elem, type ) {
        type = type || "fx";

        var queue = jQuery.queue( elem, type ),
            startLength = queue.length,
            fn = queue.shift(),
            hooks = jQuery._queueHooks( elem, type ),
            next = function() {
                jQuery.dequeue( elem, type );
            };

        // If the fx queue is dequeued, always remove the progress sentinel
        if ( fn === "inprogress" ) {
            fn = queue.shift();
            startLength--;
        }

        hooks.cur = fn;
        if ( fn ) {

            // Add a progress sentinel to prevent the fx queue from being
            // automatically dequeued
            if ( type === "fx" ) {
                queue.unshift( "inprogress" );
            }

            // clear up the last queue stop function
            delete hooks.stop;
            fn.call( elem, next, hooks );
        }

        if ( !startLength && hooks ) {
            hooks.empty.fire();
        }
    },

    // not intended for public consumption - generates a queueHooks object, or returns the current one
    _queueHooks: function( elem, type ) {
        var key = type + "queueHooks";
        return jQuery._data( elem, key ) || jQuery._data( elem, key, {
            empty: jQuery.Callbacks("once memory").add(function() {
                jQuery._removeData( elem, type + "queue" );
                jQuery._removeData( elem, key );
            })
        });
    }
});

jQuery.fn.extend({
    queue: function( type, data ) {
        var setter = 2;

        if ( typeof type !== "string" ) {
            data = type;
            type = "fx";
            setter--;
        }

        if ( arguments.length < setter ) {
            return jQuery.queue( this[0], type );
        }

        return data === undefined ?
            this :
            this.each(function() {
                var queue = jQuery.queue( this, type, data );

                // ensure a hooks for this queue
                jQuery._queueHooks( this, type );

                if ( type === "fx" && queue[0] !== "inprogress" ) {
                    jQuery.dequeue( this, type );
                }
            });
    },
    dequeue: function( type ) {
        return this.each(function() {
            jQuery.dequeue( this, type );
        });
    },
    // Based off of the plugin by Clint Helfers, with permission.
    // http://blindsignals.com/index.php/2009/07/jquery-delay/
    delay: function( time, type ) {
        time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
        type = type || "fx";

        return this.queue( type, function( next, hooks ) {
            var timeout = setTimeout( next, time );
            hooks.stop = function() {
                clearTimeout( timeout );
            };
        });
    },
    clearQueue: function( type ) {
        return this.queue( type || "fx", [] );
    },
    // Get a promise resolved when queues of a certain type
    // are emptied (fx is the type by default)
    promise: function( type, obj ) {
        var tmp,
            count = 1,
            defer = jQuery.Deferred(),
            elements = this,
            i = this.length,
            resolve = function() {
                if ( !( --count ) ) {
                    defer.resolveWith( elements, [ elements ] );
                }
            };

        if ( typeof type !== "string" ) {
            obj = type;
            type = undefined;
        }
        type = type || "fx";

        while( i-- ) {
            tmp = jQuery._data( elements[ i ], type + "queueHooks" );
            if ( tmp && tmp.empty ) {
                count++;
                tmp.empty.add( resolve );
            }
        }
        resolve();
        return defer.promise( obj );
    }
});
var nodeHook, boolHook,
    rclass = /[\t\r\n]/g,
    rreturn = /\r/g,
    rfocusable = /^(?:input|select|textarea|button|object)$/i,
    rclickable = /^(?:a|area)$/i,
    rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
    ruseDefault = /^(?:checked|selected)$/i,
    getSetAttribute = jQuery.support.getSetAttribute,
    getSetInput = jQuery.support.input;

jQuery.fn.extend({
    attr: function( name, value ) {
        return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
    },

    removeAttr: function( name ) {
        return this.each(function() {
            jQuery.removeAttr( this, name );
        });
    },

    prop: function( name, value ) {
        return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
    },

    removeProp: function( name ) {
        name = jQuery.propFix[ name ] || name;
        return this.each(function() {
            // try/catch handles cases where IE balks (such as removing a property on window)
            try {
                this[ name ] = undefined;
                delete this[ name ];
            } catch( e ) {}
        });
    },

    addClass: function( value ) {
        var classes, elem, cur, clazz, j,
            i = 0,
            len = this.length,
            proceed = typeof value === "string" && value;

        if ( jQuery.isFunction( value ) ) {
            return this.each(function( j ) {
                jQuery( this ).addClass( value.call( this, j, this.className ) );
            });
        }

        if ( proceed ) {
            // The disjunction here is for better compressibility (see removeClass)
            classes = ( value || "" ).match( core_rnotwhite ) || [];

            for ( ; i < len; i++ ) {
                elem = this[ i ];
                cur = elem.nodeType === 1 && ( elem.className ?
                    ( " " + elem.className + " " ).replace( rclass, " " ) :
                    " "
                );

                if ( cur ) {
                    j = 0;
                    while ( (clazz = classes[j++]) ) {
                        if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
                            cur += clazz + " ";
                        }
                    }
                    elem.className = jQuery.trim( cur );

                }
            }
        }

        return this;
    },

    removeClass: function( value ) {
        var classes, elem, cur, clazz, j,
            i = 0,
            len = this.length,
            proceed = arguments.length === 0 || typeof value === "string" && value;

        if ( jQuery.isFunction( value ) ) {
            return this.each(function( j ) {
                jQuery( this ).removeClass( value.call( this, j, this.className ) );
            });
        }
        if ( proceed ) {
            classes = ( value || "" ).match( core_rnotwhite ) || [];

            for ( ; i < len; i++ ) {
                elem = this[ i ];
                // This expression is here for better compressibility (see addClass)
                cur = elem.nodeType === 1 && ( elem.className ?
                    ( " " + elem.className + " " ).replace( rclass, " " ) :
                    ""
                );

                if ( cur ) {
                    j = 0;
                    while ( (clazz = classes[j++]) ) {
                        // Remove *all* instances
                        while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
                            cur = cur.replace( " " + clazz + " ", " " );
                        }
                    }
                    elem.className = value ? jQuery.trim( cur ) : "";
                }
            }
        }

        return this;
    },

    toggleClass: function( value, stateVal ) {
        var type = typeof value,
            isBool = typeof stateVal === "boolean";

        if ( jQuery.isFunction( value ) ) {
            return this.each(function( i ) {
                jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
            });
        }

        return this.each(function() {
            if ( type === "string" ) {
                // toggle individual class names
                var className,
                    i = 0,
                    self = jQuery( this ),
                    state = stateVal,
                    classNames = value.match( core_rnotwhite ) || [];

                while ( (className = classNames[ i++ ]) ) {
                    // check each className given, space separated list
                    state = isBool ? state : !self.hasClass( className );
                    self[ state ? "addClass" : "removeClass" ]( className );
                }

            // Toggle whole class name
            } else if ( type === core_strundefined || type === "boolean" ) {
                if ( this.className ) {
                    // store className if set
                    jQuery._data( this, "__className__", this.className );
                }

                // If the element has a class name or if we're passed "false",
                // then remove the whole classname (if there was one, the above saved it).
                // Otherwise bring back whatever was previously saved (if anything),
                // falling back to the empty string if nothing was stored.
                this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
            }
        });
    },

    hasClass: function( selector ) {
        var className = " " + selector + " ",
            i = 0,
            l = this.length;
        for ( ; i < l; i++ ) {
            if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
                return true;
            }
        }

        return false;
    },

    val: function( value ) {
        var ret, hooks, isFunction,
            elem = this[0];

        if ( !arguments.length ) {
            if ( elem ) {
                hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

                if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
                    return ret;
                }

                ret = elem.value;

                return typeof ret === "string" ?
                    // handle most common string cases
                    ret.replace(rreturn, "") :
                    // handle cases where value is null/undef or number
                    ret == null ? "" : ret;
            }

            return;
        }

        isFunction = jQuery.isFunction( value );

        return this.each(function( i ) {
            var val,
                self = jQuery(this);

            if ( this.nodeType !== 1 ) {
                return;
            }

            if ( isFunction ) {
                val = value.call( this, i, self.val() );
            } else {
                val = value;
            }

            // Treat null/undefined as ""; convert numbers to string
            if ( val == null ) {
                val = "";
            } else if ( typeof val === "number" ) {
                val += "";
            } else if ( jQuery.isArray( val ) ) {
                val = jQuery.map(val, function ( value ) {
                    return value == null ? "" : value + "";
                });
            }

            hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

            // If set returns undefined, fall back to normal setting
            if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
                this.value = val;
            }
        });
    }
});

jQuery.extend({
    valHooks: {
        option: {
            get: function( elem ) {
                // attributes.value is undefined in Blackberry 4.7 but
                // uses .value. See #6932
                var val = elem.attributes.value;
                return !val || val.specified ? elem.value : elem.text;
            }
        },
        select: {
            get: function( elem ) {
                var value, option,
                    options = elem.options,
                    index = elem.selectedIndex,
                    one = elem.type === "select-one" || index < 0,
                    values = one ? null : [],
                    max = one ? index + 1 : options.length,
                    i = index < 0 ?
                        max :
                        one ? index : 0;

                // Loop through all the selected options
                for ( ; i < max; i++ ) {
                    option = options[ i ];

                    // oldIE doesn't update selected after form reset (#2551)
                    if ( ( option.selected || i === index ) &&
                            // Don't return options that are disabled or in a disabled optgroup
                            ( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
                            ( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

                        // Get the specific value for the option
                        value = jQuery( option ).val();

                        // We don't need an array for one selects
                        if ( one ) {
                            return value;
                        }

                        // Multi-Selects return an array
                        values.push( value );
                    }
                }

                return values;
            },

            set: function( elem, value ) {
                var values = jQuery.makeArray( value );

                jQuery(elem).find("option").each(function() {
                    this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
                });

                if ( !values.length ) {
                    elem.selectedIndex = -1;
                }
                return values;
            }
        }
    },

    attr: function( elem, name, value ) {
        var hooks, notxml, ret,
            nType = elem.nodeType;

        // don't get/set attributes on text, comment and attribute nodes
        if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
            return;
        }

        // Fallback to prop when attributes are not supported
        if ( typeof elem.getAttribute === core_strundefined ) {
            return jQuery.prop( elem, name, value );
        }

        notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

        // All attributes are lowercase
        // Grab necessary hook if one is defined
        if ( notxml ) {
            name = name.toLowerCase();
            hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
        }

        if ( value !== undefined ) {

            if ( value === null ) {
                jQuery.removeAttr( elem, name );

            } else if ( hooks && notxml && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
                return ret;

            } else {
                elem.setAttribute( name, value + "" );
                return value;
            }

        } else if ( hooks && notxml && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
            return ret;

        } else {

            // In IE9+, Flash objects don't have .getAttribute (#12945)
            // Support: IE9+
            if ( typeof elem.getAttribute !== core_strundefined ) {
                ret =  elem.getAttribute( name );
            }

            // Non-existent attributes return null, we normalize to undefined
            return ret == null ?
                undefined :
                ret;
        }
    },

    removeAttr: function( elem, value ) {
        var name, propName,
            i = 0,
            attrNames = value && value.match( core_rnotwhite );

        if ( attrNames && elem.nodeType === 1 ) {
            while ( (name = attrNames[i++]) ) {
                propName = jQuery.propFix[ name ] || name;

                // Boolean attributes get special treatment (#10870)
                if ( rboolean.test( name ) ) {
                    // Set corresponding property to false for boolean attributes
                    // Also clear defaultChecked/defaultSelected (if appropriate) for IE<8
                    if ( !getSetAttribute && ruseDefault.test( name ) ) {
                        elem[ jQuery.camelCase( "default-" + name ) ] =
                            elem[ propName ] = false;
                    } else {
                        elem[ propName ] = false;
                    }

                // See #9699 for explanation of this approach (setting first, then removal)
                } else {
                    jQuery.attr( elem, name, "" );
                }

                elem.removeAttribute( getSetAttribute ? name : propName );
            }
        }
    },

    attrHooks: {
        type: {
            set: function( elem, value ) {
                if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
                    // Setting the type on a radio button after the value resets the value in IE6-9
                    // Reset value to default in case type is set after value during creation
                    var val = elem.value;
                    elem.setAttribute( "type", value );
                    if ( val ) {
                        elem.value = val;
                    }
                    return value;
                }
            }
        }
    },

    propFix: {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    },

    prop: function( elem, name, value ) {
        var ret, hooks, notxml,
            nType = elem.nodeType;

        // don't get/set properties on text, comment and attribute nodes
        if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
            return;
        }

        notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

        if ( notxml ) {
            // Fix name and attach hooks
            name = jQuery.propFix[ name ] || name;
            hooks = jQuery.propHooks[ name ];
        }

        if ( value !== undefined ) {
            if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
                return ret;

            } else {
                return ( elem[ name ] = value );
            }

        } else {
            if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
                return ret;

            } else {
                return elem[ name ];
            }
        }
    },

    propHooks: {
        tabIndex: {
            get: function( elem ) {
                // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                var attributeNode = elem.getAttributeNode("tabindex");

                return attributeNode && attributeNode.specified ?
                    parseInt( attributeNode.value, 10 ) :
                    rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
                        0 :
                        undefined;
            }
        }
    }
});

// Hook for boolean attributes
boolHook = {
    get: function( elem, name ) {
        var
            // Use .prop to determine if this attribute is understood as boolean
            prop = jQuery.prop( elem, name ),

            // Fetch it accordingly
            attr = typeof prop === "boolean" && elem.getAttribute( name ),
            detail = typeof prop === "boolean" ?

                getSetInput && getSetAttribute ?
                    attr != null :
                    // oldIE fabricates an empty string for missing boolean attributes
                    // and conflates checked/selected into attroperties
                    ruseDefault.test( name ) ?
                        elem[ jQuery.camelCase( "default-" + name ) ] :
                        !!attr :

                // fetch an attribute node for properties not recognized as boolean
                elem.getAttributeNode( name );

        return detail && detail.value !== false ?
            name.toLowerCase() :
            undefined;
    },
    set: function( elem, value, name ) {
        if ( value === false ) {
            // Remove boolean attributes when set to false
            jQuery.removeAttr( elem, name );
        } else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
            // IE<8 needs the *property* name
            elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

        // Use defaultChecked and defaultSelected for oldIE
        } else {
            elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
        }

        return name;
    }
};

// fix oldIE value attroperty
if ( !getSetInput || !getSetAttribute ) {
    jQuery.attrHooks.value = {
        get: function( elem, name ) {
            var ret = elem.getAttributeNode( name );
            return jQuery.nodeName( elem, "input" ) ?

                // Ignore the value *property* by using defaultValue
                elem.defaultValue :

                ret && ret.specified ? ret.value : undefined;
        },
        set: function( elem, value, name ) {
            if ( jQuery.nodeName( elem, "input" ) ) {
                // Does not return so that setAttribute is also used
                elem.defaultValue = value;
            } else {
                // Use nodeHook if defined (#1954); otherwise setAttribute is fine
                return nodeHook && nodeHook.set( elem, value, name );
            }
        }
    };
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

    // Use this for any attribute in IE6/7
    // This fixes almost every IE6/7 issue
    nodeHook = jQuery.valHooks.button = {
        get: function( elem, name ) {
            var ret = elem.getAttributeNode( name );
            return ret && ( name === "id" || name === "name" || name === "coords" ? ret.value !== "" : ret.specified ) ?
                ret.value :
                undefined;
        },
        set: function( elem, value, name ) {
            // Set the existing or create a new attribute node
            var ret = elem.getAttributeNode( name );
            if ( !ret ) {
                elem.setAttributeNode(
                    (ret = elem.ownerDocument.createAttribute( name ))
                );
            }

            ret.value = value += "";

            // Break association with cloned elements by also using setAttribute (#9646)
            return name === "value" || value === elem.getAttribute( name ) ?
                value :
                undefined;
        }
    };

    // Set contenteditable to false on removals(#10429)
    // Setting to empty string throws an error as an invalid value
    jQuery.attrHooks.contenteditable = {
        get: nodeHook.get,
        set: function( elem, value, name ) {
            nodeHook.set( elem, value === "" ? false : value, name );
        }
    };

    // Set width and height to auto instead of 0 on empty string( Bug #8150 )
    // This is for removals
    jQuery.each([ "width", "height" ], function( i, name ) {
        jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
            set: function( elem, value ) {
                if ( value === "" ) {
                    elem.setAttribute( name, "auto" );
                    return value;
                }
            }
        });
    });
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
    jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
        jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
            get: function( elem ) {
                var ret = elem.getAttribute( name, 2 );
                return ret == null ? undefined : ret;
            }
        });
    });

    // href/src property should get the full normalized URL (#10299/#12915)
    jQuery.each([ "href", "src" ], function( i, name ) {
        jQuery.propHooks[ name ] = {
            get: function( elem ) {
                return elem.getAttribute( name, 4 );
            }
        };
    });
}

if ( !jQuery.support.style ) {
    jQuery.attrHooks.style = {
        get: function( elem ) {
            // Return undefined in the case of empty string
            // Note: IE uppercases css property names, but if we were to .toLowerCase()
            // .cssText, that would destroy case senstitivity in URL's, like in "background"
            return elem.style.cssText || undefined;
        },
        set: function( elem, value ) {
            return ( elem.style.cssText = value + "" );
        }
    };
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
    jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
        get: function( elem ) {
            var parent = elem.parentNode;

            if ( parent ) {
                parent.selectedIndex;

                // Make sure that it also works with optgroups, see #5701
                if ( parent.parentNode ) {
                    parent.parentNode.selectedIndex;
                }
            }
            return null;
        }
    });
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
    jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
    jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[ this ] = {
            get: function( elem ) {
                // Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
                return elem.getAttribute("value") === null ? "on" : elem.value;
            }
        };
    });
}
jQuery.each([ "radio", "checkbox" ], function() {
    jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
        set: function( elem, value ) {
            if ( jQuery.isArray( value ) ) {
                return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
            }
        }
    });
});
var rformElems = /^(?:input|select|textarea)$/i,
    rkeyEvent = /^key/,
    rmouseEvent = /^(?:mouse|contextmenu)|click/,
    rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
    rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
    return true;
}

function returnFalse() {
    return false;
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

    global: {},

    add: function( elem, types, handler, data, selector ) {
        var tmp, events, t, handleObjIn,
            special, eventHandle, handleObj,
            handlers, type, namespaces, origType,
            elemData = jQuery._data( elem );

        // Don't attach events to noData or text/comment nodes (but allow plain objects)
        if ( !elemData ) {
            return;
        }

        // Caller can pass in an object of custom data in lieu of the handler
        if ( handler.handler ) {
            handleObjIn = handler;
            handler = handleObjIn.handler;
            selector = handleObjIn.selector;
        }

        // Make sure that the handler has a unique ID, used to find/remove it later
        if ( !handler.guid ) {
            handler.guid = jQuery.guid++;
        }

        // Init the element's event structure and main handler, if this is the first
        if ( !(events = elemData.events) ) {
            events = elemData.events = {};
        }
        if ( !(eventHandle = elemData.handle) ) {
            eventHandle = elemData.handle = function( e ) {
                // Discard the second event of a jQuery.event.trigger() and
                // when an event is called after a page has unloaded
                return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
                    jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
                    undefined;
            };
            // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
            eventHandle.elem = elem;
        }

        // Handle multiple events separated by a space
        // jQuery(...).bind("mouseover mouseout", fn);
        types = ( types || "" ).match( core_rnotwhite ) || [""];
        t = types.length;
        while ( t-- ) {
            tmp = rtypenamespace.exec( types[t] ) || [];
            type = origType = tmp[1];
            namespaces = ( tmp[2] || "" ).split( "." ).sort();

            // If event changes its type, use the special event handlers for the changed type
            special = jQuery.event.special[ type ] || {};

            // If selector defined, determine special event api type, otherwise given type
            type = ( selector ? special.delegateType : special.bindType ) || type;

            // Update special based on newly reset type
            special = jQuery.event.special[ type ] || {};

            // handleObj is passed to all event handlers
            handleObj = jQuery.extend({
                type: type,
                origType: origType,
                data: data,
                handler: handler,
                guid: handler.guid,
                selector: selector,
                needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
                namespace: namespaces.join(".")
            }, handleObjIn );

            // Init the event handler queue if we're the first
            if ( !(handlers = events[ type ]) ) {
                handlers = events[ type ] = [];
                handlers.delegateCount = 0;

                // Only use addEventListener/attachEvent if the special events handler returns false
                if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
                    // Bind the global event handler to the element
                    if ( elem.addEventListener ) {
                        elem.addEventListener( type, eventHandle, false );

                    } else if ( elem.attachEvent ) {
                        elem.attachEvent( "on" + type, eventHandle );
                    }
                }
            }

            if ( special.add ) {
                special.add.call( elem, handleObj );

                if ( !handleObj.handler.guid ) {
                    handleObj.handler.guid = handler.guid;
                }
            }

            // Add to the element's handler list, delegates in front
            if ( selector ) {
                handlers.splice( handlers.delegateCount++, 0, handleObj );
            } else {
                handlers.push( handleObj );
            }

            // Keep track of which events have ever been used, for event optimization
            jQuery.event.global[ type ] = true;
        }

        // Nullify elem to prevent memory leaks in IE
        elem = null;
    },

    // Detach an event or set of events from an element
    remove: function( elem, types, handler, selector, mappedTypes ) {
        var j, handleObj, tmp,
            origCount, t, events,
            special, handlers, type,
            namespaces, origType,
            elemData = jQuery.hasData( elem ) && jQuery._data( elem );

        if ( !elemData || !(events = elemData.events) ) {
            return;
        }

        // Once for each type.namespace in types; type may be omitted
        types = ( types || "" ).match( core_rnotwhite ) || [""];
        t = types.length;
        while ( t-- ) {
            tmp = rtypenamespace.exec( types[t] ) || [];
            type = origType = tmp[1];
            namespaces = ( tmp[2] || "" ).split( "." ).sort();

            // Unbind all events (on this namespace, if provided) for the element
            if ( !type ) {
                for ( type in events ) {
                    jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
                }
                continue;
            }

            special = jQuery.event.special[ type ] || {};
            type = ( selector ? special.delegateType : special.bindType ) || type;
            handlers = events[ type ] || [];
            tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

            // Remove matching events
            origCount = j = handlers.length;
            while ( j-- ) {
                handleObj = handlers[ j ];

                if ( ( mappedTypes || origType === handleObj.origType ) &&
                    ( !handler || handler.guid === handleObj.guid ) &&
                    ( !tmp || tmp.test( handleObj.namespace ) ) &&
                    ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
                    handlers.splice( j, 1 );

                    if ( handleObj.selector ) {
                        handlers.delegateCount--;
                    }
                    if ( special.remove ) {
                        special.remove.call( elem, handleObj );
                    }
                }
            }

            // Remove generic event handler if we removed something and no more handlers exist
            // (avoids potential for endless recursion during removal of special event handlers)
            if ( origCount && !handlers.length ) {
                if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
                    jQuery.removeEvent( elem, type, elemData.handle );
                }

                delete events[ type ];
            }
        }

        // Remove the expando if it's no longer used
        if ( jQuery.isEmptyObject( events ) ) {
            delete elemData.handle;

            // removeData also checks for emptiness and clears the expando if empty
            // so use it instead of delete
            jQuery._removeData( elem, "events" );
        }
    },

    trigger: function( event, data, elem, onlyHandlers ) {
        var handle, ontype, cur,
            bubbleType, special, tmp, i,
            eventPath = [ elem || document ],
            type = core_hasOwn.call( event, "type" ) ? event.type : event,
            namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

        cur = tmp = elem = elem || document;

        // Don't do events on text and comment nodes
        if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
            return;
        }

        // focus/blur morphs to focusin/out; ensure we're not firing them right now
        if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
            return;
        }

        if ( type.indexOf(".") >= 0 ) {
            // Namespaced trigger; create a regexp to match event type in handle()
            namespaces = type.split(".");
            type = namespaces.shift();
            namespaces.sort();
        }
        ontype = type.indexOf(":") < 0 && "on" + type;

        // Caller can pass in a jQuery.Event object, Object, or just an event type string
        event = event[ jQuery.expando ] ?
            event :
            new jQuery.Event( type, typeof event === "object" && event );

        event.isTrigger = true;
        event.namespace = namespaces.join(".");
        event.namespace_re = event.namespace ?
            new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
            null;

        // Clean up the event in case it is being reused
        event.result = undefined;
        if ( !event.target ) {
            event.target = elem;
        }

        // Clone any incoming data and prepend the event, creating the handler arg list
        data = data == null ?
            [ event ] :
            jQuery.makeArray( data, [ event ] );

        // Allow special events to draw outside the lines
        special = jQuery.event.special[ type ] || {};
        if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
            return;
        }

        // Determine event propagation path in advance, per W3C events spec (#9951)
        // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
        if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

            bubbleType = special.delegateType || type;
            if ( !rfocusMorph.test( bubbleType + type ) ) {
                cur = cur.parentNode;
            }
            for ( ; cur; cur = cur.parentNode ) {
                eventPath.push( cur );
                tmp = cur;
            }

            // Only add window if we got to document (e.g., not plain obj or detached DOM)
            if ( tmp === (elem.ownerDocument || document) ) {
                eventPath.push( tmp.defaultView || tmp.parentWindow || window );
            }
        }

        // Fire handlers on the event path
        i = 0;
        while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

            event.type = i > 1 ?
                bubbleType :
                special.bindType || type;

            // jQuery handler
            handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
            if ( handle ) {
                handle.apply( cur, data );
            }

            // Native handler
            handle = ontype && cur[ ontype ];
            if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
                event.preventDefault();
            }
        }
        event.type = type;

        // If nobody prevented the default action, do it now
        if ( !onlyHandlers && !event.isDefaultPrevented() ) {

            if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
                !(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

                // Call a native DOM method on the target with the same name name as the event.
                // Can't use an .isFunction() check here because IE6/7 fails that test.
                // Don't do default actions on window, that's where global variables be (#6170)
                if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

                    // Don't re-trigger an onFOO event when we call its FOO() method
                    tmp = elem[ ontype ];

                    if ( tmp ) {
                        elem[ ontype ] = null;
                    }

                    // Prevent re-triggering of the same event, since we already bubbled it above
                    jQuery.event.triggered = type;
                    try {
                        elem[ type ]();
                    } catch ( e ) {
                        // IE<9 dies on focus/blur to hidden element (#1486,#12518)
                        // only reproducible on winXP IE8 native, not IE9 in IE8 mode
                    }
                    jQuery.event.triggered = undefined;

                    if ( tmp ) {
                        elem[ ontype ] = tmp;
                    }
                }
            }
        }

        return event.result;
    },

    dispatch: function( event ) {

        // Make a writable jQuery.Event from the native event object
        event = jQuery.event.fix( event );

        var i, ret, handleObj, matched, j,
            handlerQueue = [],
            args = core_slice.call( arguments ),
            handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
            special = jQuery.event.special[ event.type ] || {};

        // Use the fix-ed jQuery.Event rather than the (read-only) native event
        args[0] = event;
        event.delegateTarget = this;

        // Call the preDispatch hook for the mapped type, and let it bail if desired
        if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
            return;
        }

        // Determine handlers
        handlerQueue = jQuery.event.handlers.call( this, event, handlers );

        // Run delegates first; they may want to stop propagation beneath us
        i = 0;
        while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
            event.currentTarget = matched.elem;

            j = 0;
            while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

                // Triggered event must either 1) have no namespace, or
                // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
                if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

                    event.handleObj = handleObj;
                    event.data = handleObj.data;

                    ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
                            .apply( matched.elem, args );

                    if ( ret !== undefined ) {
                        if ( (event.result = ret) === false ) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                }
            }
        }

        // Call the postDispatch hook for the mapped type
        if ( special.postDispatch ) {
            special.postDispatch.call( this, event );
        }

        return event.result;
    },

    handlers: function( event, handlers ) {
        var sel, handleObj, matches, i,
            handlerQueue = [],
            delegateCount = handlers.delegateCount,
            cur = event.target;

        // Find delegate handlers
        // Black-hole SVG <use> instance trees (#13180)
        // Avoid non-left-click bubbling in Firefox (#3861)
        if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

            for ( ; cur != this; cur = cur.parentNode || this ) {

                // Don't check non-elements (#13208)
                // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
                    matches = [];
                    for ( i = 0; i < delegateCount; i++ ) {
                        handleObj = handlers[ i ];

                        // Don't conflict with Object.prototype properties (#13203)
                        sel = handleObj.selector + " ";

                        if ( matches[ sel ] === undefined ) {
                            matches[ sel ] = handleObj.needsContext ?
                                jQuery( sel, this ).index( cur ) >= 0 :
                                jQuery.find( sel, this, null, [ cur ] ).length;
                        }
                        if ( matches[ sel ] ) {
                            matches.push( handleObj );
                        }
                    }
                    if ( matches.length ) {
                        handlerQueue.push({ elem: cur, handlers: matches });
                    }
                }
            }
        }

        // Add the remaining (directly-bound) handlers
        if ( delegateCount < handlers.length ) {
            handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
        }

        return handlerQueue;
    },

    fix: function( event ) {
        if ( event[ jQuery.expando ] ) {
            return event;
        }

        // Create a writable copy of the event object and normalize some properties
        var i, prop, copy,
            type = event.type,
            originalEvent = event,
            fixHook = this.fixHooks[ type ];

        if ( !fixHook ) {
            this.fixHooks[ type ] = fixHook =
                rmouseEvent.test( type ) ? this.mouseHooks :
                rkeyEvent.test( type ) ? this.keyHooks :
                {};
        }
        copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

        event = new jQuery.Event( originalEvent );

        i = copy.length;
        while ( i-- ) {
            prop = copy[ i ];
            event[ prop ] = originalEvent[ prop ];
        }

        // Support: IE<9
        // Fix target property (#1925)
        if ( !event.target ) {
            event.target = originalEvent.srcElement || document;
        }

        // Support: Chrome 23+, Safari?
        // Target should not be a text node (#504, #13143)
        if ( event.target.nodeType === 3 ) {
            event.target = event.target.parentNode;
        }

        // Support: IE<9
        // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
        event.metaKey = !!event.metaKey;

        return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
    },

    // Includes some event props shared by KeyEvent and MouseEvent
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

    fixHooks: {},

    keyHooks: {
        props: "char charCode key keyCode".split(" "),
        filter: function( event, original ) {

            // Add which for key events
            if ( event.which == null ) {
                event.which = original.charCode != null ? original.charCode : original.keyCode;
            }

            return event;
        }
    },

    mouseHooks: {
        props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
        filter: function( event, original ) {
            var body, eventDoc, doc,
                button = original.button,
                fromElement = original.fromElement;

            // Calculate pageX/Y if missing and clientX/Y available
            if ( event.pageX == null && original.clientX != null ) {
                eventDoc = event.target.ownerDocument || document;
                doc = eventDoc.documentElement;
                body = eventDoc.body;

                event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
                event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
            }

            // Add relatedTarget, if necessary
            if ( !event.relatedTarget && fromElement ) {
                event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
            }

            // Add which for click: 1 === left; 2 === middle; 3 === right
            // Note: button is not normalized, so don't use it
            if ( !event.which && button !== undefined ) {
                event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
            }

            return event;
        }
    },

    special: {
        load: {
            // Prevent triggered image.load events from bubbling to window.load
            noBubble: true
        },
        click: {
            // For checkbox, fire native event so checked state will be right
            trigger: function() {
                if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
                    this.click();
                    return false;
                }
            }
        },
        focus: {
            // Fire native event if possible so blur/focus sequence is correct
            trigger: function() {
                if ( this !== document.activeElement && this.focus ) {
                    try {
                        this.focus();
                        return false;
                    } catch ( e ) {
                        // Support: IE<9
                        // If we error on focus to hidden element (#1486, #12518),
                        // let .trigger() run the handlers
                    }
                }
            },
            delegateType: "focusin"
        },
        blur: {
            trigger: function() {
                if ( this === document.activeElement && this.blur ) {
                    this.blur();
                    return false;
                }
            },
            delegateType: "focusout"
        },

        beforeunload: {
            postDispatch: function( event ) {

                // Even when returnValue equals to undefined Firefox will still show alert
                if ( event.result !== undefined ) {
                    event.originalEvent.returnValue = event.result;
                }
            }
        }
    },

    simulate: function( type, elem, event, bubble ) {
        // Piggyback on a donor event to simulate a different one.
        // Fake originalEvent to avoid donor's stopPropagation, but if the
        // simulated event prevents default then we do the same on the donor.
        var e = jQuery.extend(
            new jQuery.Event(),
            event,
            { type: type,
                isSimulated: true,
                originalEvent: {}
            }
        );
        if ( bubble ) {
            jQuery.event.trigger( e, null, elem );
        } else {
            jQuery.event.dispatch.call( elem, e );
        }
        if ( e.isDefaultPrevented() ) {
            event.preventDefault();
        }
    }
};

jQuery.removeEvent = document.removeEventListener ?
    function( elem, type, handle ) {
        if ( elem.removeEventListener ) {
            elem.removeEventListener( type, handle, false );
        }
    } :
    function( elem, type, handle ) {
        var name = "on" + type;

        if ( elem.detachEvent ) {

            // #8545, #7054, preventing memory leaks for custom events in IE6-8
            // detachEvent needed property on element, by name of that event, to properly expose it to GC
            if ( typeof elem[ name ] === core_strundefined ) {
                elem[ name ] = null;
            }

            elem.detachEvent( name, handle );
        }
    };

jQuery.Event = function( src, props ) {
    // Allow instantiation without the 'new' keyword
    if ( !(this instanceof jQuery.Event) ) {
        return new jQuery.Event( src, props );
    }

    // Event object
    if ( src && src.type ) {
        this.originalEvent = src;
        this.type = src.type;

        // Events bubbling up the document may have been marked as prevented
        // by a handler lower down the tree; reflect the correct value.
        this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
            src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

    // Event type
    } else {
        this.type = src;
    }

    // Put explicitly provided properties onto the event object
    if ( props ) {
        jQuery.extend( this, props );
    }

    // Create a timestamp if incoming event doesn't have one
    this.timeStamp = src && src.timeStamp || jQuery.now();

    // Mark it as fixed
    this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,

    preventDefault: function() {
        var e = this.originalEvent;

        this.isDefaultPrevented = returnTrue;
        if ( !e ) {
            return;
        }

        // If preventDefault exists, run it on the original event
        if ( e.preventDefault ) {
            e.preventDefault();

        // Support: IE
        // Otherwise set the returnValue property of the original event to false
        } else {
            e.returnValue = false;
        }
    },
    stopPropagation: function() {
        var e = this.originalEvent;

        this.isPropagationStopped = returnTrue;
        if ( !e ) {
            return;
        }
        // If stopPropagation exists, run it on the original event
        if ( e.stopPropagation ) {
            e.stopPropagation();
        }

        // Support: IE
        // Set the cancelBubble property of the original event to true
        e.cancelBubble = true;
    },
    stopImmediatePropagation: function() {
        this.isImmediatePropagationStopped = returnTrue;
        this.stopPropagation();
    }
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
}, function( orig, fix ) {
    jQuery.event.special[ orig ] = {
        delegateType: fix,
        bindType: fix,

        handle: function( event ) {
            var ret,
                target = this,
                related = event.relatedTarget,
                handleObj = event.handleObj;

            // For mousenter/leave call the handler if related is outside the target.
            // NB: No relatedTarget if the mouse left/entered the browser window
            if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
                event.type = handleObj.origType;
                ret = handleObj.handler.apply( this, arguments );
                event.type = fix;
            }
            return ret;
        }
    };
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

    jQuery.event.special.submit = {
        setup: function() {
            // Only need this for delegated form submit events
            if ( jQuery.nodeName( this, "form" ) ) {
                return false;
            }

            // Lazy-add a submit handler when a descendant form may potentially be submitted
            jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
                // Node name check avoids a VML-related crash in IE (#9807)
                var elem = e.target,
                    form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
                if ( form && !jQuery._data( form, "submitBubbles" ) ) {
                    jQuery.event.add( form, "submit._submit", function( event ) {
                        event._submit_bubble = true;
                    });
                    jQuery._data( form, "submitBubbles", true );
                }
            });
            // return undefined since we don't need an event listener
        },

        postDispatch: function( event ) {
            // If form was submitted by the user, bubble the event up the tree
            if ( event._submit_bubble ) {
                delete event._submit_bubble;
                if ( this.parentNode && !event.isTrigger ) {
                    jQuery.event.simulate( "submit", this.parentNode, event, true );
                }
            }
        },

        teardown: function() {
            // Only need this for delegated form submit events
            if ( jQuery.nodeName( this, "form" ) ) {
                return false;
            }

            // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
            jQuery.event.remove( this, "._submit" );
        }
    };
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

    jQuery.event.special.change = {

        setup: function() {

            if ( rformElems.test( this.nodeName ) ) {
                // IE doesn't fire change on a check/radio until blur; trigger it on click
                // after a propertychange. Eat the blur-change in special.change.handle.
                // This still fires onchange a second time for check/radio after blur.
                if ( this.type === "checkbox" || this.type === "radio" ) {
                    jQuery.event.add( this, "propertychange._change", function( event ) {
                        if ( event.originalEvent.propertyName === "checked" ) {
                            this._just_changed = true;
                        }
                    });
                    jQuery.event.add( this, "click._change", function( event ) {
                        if ( this._just_changed && !event.isTrigger ) {
                            this._just_changed = false;
                        }
                        // Allow triggered, simulated change events (#11500)
                        jQuery.event.simulate( "change", this, event, true );
                    });
                }
                return false;
            }
            // Delegated event; lazy-add a change handler on descendant inputs
            jQuery.event.add( this, "beforeactivate._change", function( e ) {
                var elem = e.target;

                if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
                    jQuery.event.add( elem, "change._change", function( event ) {
                        if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
                            jQuery.event.simulate( "change", this.parentNode, event, true );
                        }
                    });
                    jQuery._data( elem, "changeBubbles", true );
                }
            });
        },

        handle: function( event ) {
            var elem = event.target;

            // Swallow native change events from checkbox/radio, we already triggered them above
            if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
                return event.handleObj.handler.apply( this, arguments );
            }
        },

        teardown: function() {
            jQuery.event.remove( this, "._change" );

            return !rformElems.test( this.nodeName );
        }
    };
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
    jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

        // Attach a single capturing handler while someone wants focusin/focusout
        var attaches = 0,
            handler = function( event ) {
                jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
            };

        jQuery.event.special[ fix ] = {
            setup: function() {
                if ( attaches++ === 0 ) {
                    document.addEventListener( orig, handler, true );
                }
            },
            teardown: function() {
                if ( --attaches === 0 ) {
                    document.removeEventListener( orig, handler, true );
                }
            }
        };
    });
}

jQuery.fn.extend({

    on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
        var type, origFn;

        // Types can be a map of types/handlers
        if ( typeof types === "object" ) {
            // ( types-Object, selector, data )
            if ( typeof selector !== "string" ) {
                // ( types-Object, data )
                data = data || selector;
                selector = undefined;
            }
            for ( type in types ) {
                this.on( type, selector, data, types[ type ], one );
            }
            return this;
        }

        if ( data == null && fn == null ) {
            // ( types, fn )
            fn = selector;
            data = selector = undefined;
        } else if ( fn == null ) {
            if ( typeof selector === "string" ) {
                // ( types, selector, fn )
                fn = data;
                data = undefined;
            } else {
                // ( types, data, fn )
                fn = data;
                data = selector;
                selector = undefined;
            }
        }
        if ( fn === false ) {
            fn = returnFalse;
        } else if ( !fn ) {
            return this;
        }

        if ( one === 1 ) {
            origFn = fn;
            fn = function( event ) {
                // Can use an empty set, since event contains the info
                jQuery().off( event );
                return origFn.apply( this, arguments );
            };
            // Use same guid so caller can remove using origFn
            fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
        }
        return this.each( function() {
            jQuery.event.add( this, types, fn, data, selector );
        });
    },
    one: function( types, selector, data, fn ) {
        return this.on( types, selector, data, fn, 1 );
    },
    off: function( types, selector, fn ) {
        var handleObj, type;
        if ( types && types.preventDefault && types.handleObj ) {
            // ( event )  dispatched jQuery.Event
            handleObj = types.handleObj;
            jQuery( types.delegateTarget ).off(
                handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                handleObj.selector,
                handleObj.handler
            );
            return this;
        }
        if ( typeof types === "object" ) {
            // ( types-object [, selector] )
            for ( type in types ) {
                this.off( type, selector, types[ type ] );
            }
            return this;
        }
        if ( selector === false || typeof selector === "function" ) {
            // ( types [, fn] )
            fn = selector;
            selector = undefined;
        }
        if ( fn === false ) {
            fn = returnFalse;
        }
        return this.each(function() {
            jQuery.event.remove( this, types, fn, selector );
        });
    },

    bind: function( types, data, fn ) {
        return this.on( types, null, data, fn );
    },
    unbind: function( types, fn ) {
        return this.off( types, null, fn );
    },

    delegate: function( selector, types, data, fn ) {
        return this.on( types, selector, data, fn );
    },
    undelegate: function( selector, types, fn ) {
        // ( namespace ) or ( selector, types [, fn] )
        return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
    },

    trigger: function( type, data ) {
        return this.each(function() {
            jQuery.event.trigger( type, data, this );
        });
    },
    triggerHandler: function( type, data ) {
        var elem = this[0];
        if ( elem ) {
            return jQuery.event.trigger( type, data, elem, true );
        }
    }
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var i,
    cachedruns,
    Expr,
    getText,
    isXML,
    compile,
    hasDuplicate,
    outermostContext,

    // Local document vars
    setDocument,
    document,
    docElem,
    documentIsXML,
    rbuggyQSA,
    rbuggyMatches,
    matches,
    contains,
    sortOrder,

    // Instance-specific data
    expando = "sizzle" + -(new Date()),
    preferredDoc = window.document,
    support = {},
    dirruns = 0,
    done = 0,
    classCache = createCache(),
    tokenCache = createCache(),
    compilerCache = createCache(),

    // General-purpose constants
    strundefined = typeof undefined,
    MAX_NEGATIVE = 1 << 31,

    // Array methods
    arr = [],
    pop = arr.pop,
    push = arr.push,
    slice = arr.slice,
    // Use a stripped-down indexOf if we can't use a native one
    indexOf = arr.indexOf || function( elem ) {
        var i = 0,
            len = this.length;
        for ( ; i < len; i++ ) {
            if ( this[i] === elem ) {
                return i;
            }
        }
        return -1;
    },


    // Regular expressions

    // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
    whitespace = "[\\x20\\t\\r\\n\\f]",
    // http://www.w3.org/TR/css3-syntax/#characters
    characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

    // Loosely modeled on CSS identifier characters
    // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
    // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
    identifier = characterEncoding.replace( "w", "w#" ),

    // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
    operators = "([*^$|!~]?=)",
    attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
        "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

    // Prefer arguments quoted,
    //   then not containing pseudos/brackets,
    //   then attribute selectors/non-parenthetical expressions,
    //   then anything else
    // These preferences are here to reduce the number of selectors
    //   needing tokenize in the PSEUDO preFilter
    pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

    // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
    rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

    rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
    rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
    rpseudo = new RegExp( pseudos ),
    ridentifier = new RegExp( "^" + identifier + "$" ),

    matchExpr = {
        "ID": new RegExp( "^#(" + characterEncoding + ")" ),
        "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
        "NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
        "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
        "ATTR": new RegExp( "^" + attributes ),
        "PSEUDO": new RegExp( "^" + pseudos ),
        "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
            "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
            "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
        // For use in libraries implementing .is()
        // We use this for POS matching in `select`
        "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
    },

    rsibling = /[\x20\t\r\n\f]*[+~]/,

    rnative = /^[^{]+\{\s*\[native code/,

    // Easily-parseable/retrievable ID or TAG or CLASS selectors
    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

    rinputs = /^(?:input|select|textarea|button)$/i,
    rheader = /^h\d$/i,

    rescape = /'|\\/g,
    rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

    // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
    runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
    funescape = function( _, escaped ) {
        var high = "0x" + escaped - 0x10000;
        // NaN means non-codepoint
        return high !== high ?
            escaped :
            // BMP codepoint
            high < 0 ?
                String.fromCharCode( high + 0x10000 ) :
                // Supplemental Plane codepoint (surrogate pair)
                String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
    };

// Use a stripped-down slice if we can't use a native one
try {
    slice.call( preferredDoc.documentElement.childNodes, 0 )[0].nodeType;
} catch ( e ) {
    slice = function( i ) {
        var elem,
            results = [];
        while ( (elem = this[i++]) ) {
            results.push( elem );
        }
        return results;
    };
}

/**
 * For feature detection
 * @param {Function} fn The function to test for native support
 */
function isNative( fn ) {
    return rnative.test( fn + "" );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *  deleting the oldest entry
 */
function createCache() {
    var cache,
        keys = [];

    return (cache = function( key, value ) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if ( keys.push( key += " " ) > Expr.cacheLength ) {
            // Only keep the most recent entries
            delete cache[ keys.shift() ];
        }
        return (cache[ key ] = value);
    });
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
    fn[ expando ] = true;
    return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
    var div = document.createElement("div");

    try {
        return fn( div );
    } catch (e) {
        return false;
    } finally {
        // release memory in IE
        div = null;
    }
}

function Sizzle( selector, context, results, seed ) {
    var match, elem, m, nodeType,
        // QSA vars
        i, groups, old, nid, newContext, newSelector;

    if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
        setDocument( context );
    }

    context = context || document;
    results = results || [];

    if ( !selector || typeof selector !== "string" ) {
        return results;
    }

    if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
        return [];
    }

    if ( !documentIsXML && !seed ) {

        // Shortcuts
        if ( (match = rquickExpr.exec( selector )) ) {
            // Speed-up: Sizzle("#ID")
            if ( (m = match[1]) ) {
                if ( nodeType === 9 ) {
                    elem = context.getElementById( m );
                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document #6963
                    if ( elem && elem.parentNode ) {
                        // Handle the case where IE, Opera, and Webkit return items
                        // by name instead of ID
                        if ( elem.id === m ) {
                            results.push( elem );
                            return results;
                        }
                    } else {
                        return results;
                    }
                } else {
                    // Context is not a document
                    if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
                        contains( context, elem ) && elem.id === m ) {
                        results.push( elem );
                        return results;
                    }
                }

            // Speed-up: Sizzle("TAG")
            } else if ( match[2] ) {
                push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
                return results;

            // Speed-up: Sizzle(".CLASS")
            } else if ( (m = match[3]) && support.getByClassName && context.getElementsByClassName ) {
                push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
                return results;
            }
        }

        // QSA path
        if ( support.qsa && !rbuggyQSA.test(selector) ) {
            old = true;
            nid = expando;
            newContext = context;
            newSelector = nodeType === 9 && selector;

            // qSA works strangely on Element-rooted queries
            // We can work around this by specifying an extra ID on the root
            // and working up from there (Thanks to Andrew Dupont for the technique)
            // IE 8 doesn't work on object elements
            if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
                groups = tokenize( selector );

                if ( (old = context.getAttribute("id")) ) {
                    nid = old.replace( rescape, "\\$&" );
                } else {
                    context.setAttribute( "id", nid );
                }
                nid = "[id='" + nid + "'] ";

                i = groups.length;
                while ( i-- ) {
                    groups[i] = nid + toSelector( groups[i] );
                }
                newContext = rsibling.test( selector ) && context.parentNode || context;
                newSelector = groups.join(",");
            }

            if ( newSelector ) {
                try {
                    push.apply( results, slice.call( newContext.querySelectorAll(
                        newSelector
                    ), 0 ) );
                    return results;
                } catch(qsaError) {
                } finally {
                    if ( !old ) {
                        context.removeAttribute("id");
                    }
                }
            }
        }
    }

    // All others
    return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
    // documentElement is verified for cases where it doesn't yet exist
    // (such as loading iframes in IE - #4833)
    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
    return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
    var doc = node ? node.ownerDocument || node : preferredDoc;

    // If no document and documentElement is available, return
    if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
        return document;
    }

    // Set our document
    document = doc;
    docElem = doc.documentElement;

    // Support tests
    documentIsXML = isXML( doc );

    // Check if getElementsByTagName("*") returns only elements
    support.tagNameNoComments = assert(function( div ) {
        div.appendChild( doc.createComment("") );
        return !div.getElementsByTagName("*").length;
    });

    // Check if attributes should be retrieved by attribute nodes
    support.attributes = assert(function( div ) {
        div.innerHTML = "<select></select>";
        var type = typeof div.lastChild.getAttribute("multiple");
        // IE8 returns a string for some attributes even when not present
        return type !== "boolean" && type !== "string";
    });

    // Check if getElementsByClassName can be trusted
    support.getByClassName = assert(function( div ) {
        // Opera can't find a second classname (in 9.6)
        div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
        if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
            return false;
        }

        // Safari 3.2 caches class attributes and doesn't catch changes
        div.lastChild.className = "e";
        return div.getElementsByClassName("e").length === 2;
    });

    // Check if getElementById returns elements by name
    // Check if getElementsByName privileges form controls or returns elements by ID
    support.getByName = assert(function( div ) {
        // Inject content
        div.id = expando + 0;
        div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
        docElem.insertBefore( div, docElem.firstChild );

        // Test
        var pass = doc.getElementsByName &&
            // buggy browsers will return fewer than the correct 2
            doc.getElementsByName( expando ).length === 2 +
            // buggy browsers will return more than the correct 0
            doc.getElementsByName( expando + 0 ).length;
        support.getIdNotName = !doc.getElementById( expando );

        // Cleanup
        docElem.removeChild( div );

        return pass;
    });

    // IE6/7 return modified attributes
    Expr.attrHandle = assert(function( div ) {
        div.innerHTML = "<a href='#'></a>";
        return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
            div.firstChild.getAttribute("href") === "#";
    }) ?
        {} :
        {
            "href": function( elem ) {
                return elem.getAttribute( "href", 2 );
            },
            "type": function( elem ) {
                return elem.getAttribute("type");
            }
        };

    // ID find and filter
    if ( support.getIdNotName ) {
        Expr.find["ID"] = function( id, context ) {
            if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
                var m = context.getElementById( id );
                // Check parentNode to catch when Blackberry 4.6 returns
                // nodes that are no longer in the document #6963
                return m && m.parentNode ? [m] : [];
            }
        };
        Expr.filter["ID"] = function( id ) {
            var attrId = id.replace( runescape, funescape );
            return function( elem ) {
                return elem.getAttribute("id") === attrId;
            };
        };
    } else {
        Expr.find["ID"] = function( id, context ) {
            if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
                var m = context.getElementById( id );

                return m ?
                    m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
                        [m] :
                        undefined :
                    [];
            }
        };
        Expr.filter["ID"] =  function( id ) {
            var attrId = id.replace( runescape, funescape );
            return function( elem ) {
                var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                return node && node.value === attrId;
            };
        };
    }

    // Tag
    Expr.find["TAG"] = support.tagNameNoComments ?
        function( tag, context ) {
            if ( typeof context.getElementsByTagName !== strundefined ) {
                return context.getElementsByTagName( tag );
            }
        } :
        function( tag, context ) {
            var elem,
                tmp = [],
                i = 0,
                results = context.getElementsByTagName( tag );

            // Filter out possible comments
            if ( tag === "*" ) {
                while ( (elem = results[i++]) ) {
                    if ( elem.nodeType === 1 ) {
                        tmp.push( elem );
                    }
                }

                return tmp;
            }
            return results;
        };

    // Name
    Expr.find["NAME"] = support.getByName && function( tag, context ) {
        if ( typeof context.getElementsByName !== strundefined ) {
            return context.getElementsByName( name );
        }
    };

    // Class
    Expr.find["CLASS"] = support.getByClassName && function( className, context ) {
        if ( typeof context.getElementsByClassName !== strundefined && !documentIsXML ) {
            return context.getElementsByClassName( className );
        }
    };

    // QSA and matchesSelector support

    // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
    rbuggyMatches = [];

    // qSa(:focus) reports false when true (Chrome 21),
    // no need to also add to buggyMatches since matches checks buggyQSA
    // A support test would require too much code (would include document ready)
    rbuggyQSA = [ ":focus" ];

    if ( (support.qsa = isNative(doc.querySelectorAll)) ) {
        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        assert(function( div ) {
            // Select is set to empty string on purpose
            // This is to test IE's treatment of not explictly
            // setting a boolean content attribute,
            // since its presence should be enough
            // http://bugs.jquery.com/ticket/12359
            div.innerHTML = "<select><option selected=''></option></select>";

            // IE8 - Some boolean attributes are not treated correctly
            if ( !div.querySelectorAll("[selected]").length ) {
                rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
            }

            // Webkit/Opera - :checked should return selected option elements
            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
            // IE8 throws error here and will not see later tests
            if ( !div.querySelectorAll(":checked").length ) {
                rbuggyQSA.push(":checked");
            }
        });

        assert(function( div ) {

            // Opera 10-12/IE8 - ^= $= *= and empty values
            // Should not select anything
            div.innerHTML = "<input type='hidden' i=''/>";
            if ( div.querySelectorAll("[i^='']").length ) {
                rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
            }

            // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
            // IE8 throws error here and will not see later tests
            if ( !div.querySelectorAll(":enabled").length ) {
                rbuggyQSA.push( ":enabled", ":disabled" );
            }

            // Opera 10-11 does not throw on post-comma invalid pseudos
            div.querySelectorAll("*,:x");
            rbuggyQSA.push(",.*:");
        });
    }

    if ( (support.matchesSelector = isNative( (matches = docElem.matchesSelector ||
        docElem.mozMatchesSelector ||
        docElem.webkitMatchesSelector ||
        docElem.oMatchesSelector ||
        docElem.msMatchesSelector) )) ) {

        assert(function( div ) {
            // Check to see if it's possible to do matchesSelector
            // on a disconnected node (IE 9)
            support.disconnectedMatch = matches.call( div, "div" );

            // This should fail with an exception
            // Gecko does not error, returns false instead
            matches.call( div, "[s!='']:x" );
            rbuggyMatches.push( "!=", pseudos );
        });
    }

    rbuggyQSA = new RegExp( rbuggyQSA.join("|") );
    rbuggyMatches = new RegExp( rbuggyMatches.join("|") );

    // Element contains another
    // Purposefully does not implement inclusive descendent
    // As in, an element does not contain itself
    contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
        function( a, b ) {
            var adown = a.nodeType === 9 ? a.documentElement : a,
                bup = b && b.parentNode;
            return a === bup || !!( bup && bup.nodeType === 1 && (
                adown.contains ?
                    adown.contains( bup ) :
                    a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
            ));
        } :
        function( a, b ) {
            if ( b ) {
                while ( (b = b.parentNode) ) {
                    if ( b === a ) {
                        return true;
                    }
                }
            }
            return false;
        };

    // Document order sorting
    sortOrder = docElem.compareDocumentPosition ?
    function( a, b ) {
        var compare;

        if ( a === b ) {
            hasDuplicate = true;
            return 0;
        }

        if ( (compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b )) ) {
            if ( compare & 1 || a.parentNode && a.parentNode.nodeType === 11 ) {
                if ( a === doc || contains( preferredDoc, a ) ) {
                    return -1;
                }
                if ( b === doc || contains( preferredDoc, b ) ) {
                    return 1;
                }
                return 0;
            }
            return compare & 4 ? -1 : 1;
        }

        return a.compareDocumentPosition ? -1 : 1;
    } :
    function( a, b ) {
        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [ a ],
            bp = [ b ];

        // Exit early if the nodes are identical
        if ( a === b ) {
            hasDuplicate = true;
            return 0;

        // Parentless nodes are either documents or disconnected
        } else if ( !aup || !bup ) {
            return a === doc ? -1 :
                b === doc ? 1 :
                aup ? -1 :
                bup ? 1 :
                0;

        // If the nodes are siblings, we can do a quick check
        } else if ( aup === bup ) {
            return siblingCheck( a, b );
        }

        // Otherwise we need full lists of their ancestors for comparison
        cur = a;
        while ( (cur = cur.parentNode) ) {
            ap.unshift( cur );
        }
        cur = b;
        while ( (cur = cur.parentNode) ) {
            bp.unshift( cur );
        }

        // Walk down the tree looking for a discrepancy
        while ( ap[i] === bp[i] ) {
            i++;
        }

        return i ?
            // Do a sibling check if the nodes have a common ancestor
            siblingCheck( ap[i], bp[i] ) :

            // Otherwise nodes in our document sort first
            ap[i] === preferredDoc ? -1 :
            bp[i] === preferredDoc ? 1 :
            0;
    };

    // Always assume the presence of duplicates if sort doesn't
    // pass them to our comparison function (as in Google Chrome).
    hasDuplicate = false;
    [0, 0].sort( sortOrder );
    support.detectDuplicates = hasDuplicate;

    return document;
};

Sizzle.matches = function( expr, elements ) {
    return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
    // Set document vars if needed
    if ( ( elem.ownerDocument || elem ) !== document ) {
        setDocument( elem );
    }

    // Make sure that attribute selectors are quoted
    expr = expr.replace( rattributeQuotes, "='$1']" );

    // rbuggyQSA always contains :focus, so no need for an existence check
    if ( support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr) ) {
        try {
            var ret = matches.call( elem, expr );

            // IE 9's matchesSelector returns false on disconnected nodes
            if ( ret || support.disconnectedMatch ||
                    // As well, disconnected nodes are said to be in a document
                    // fragment in IE 9
                    elem.document && elem.document.nodeType !== 11 ) {
                return ret;
            }
        } catch(e) {}
    }

    return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
    // Set document vars if needed
    if ( ( context.ownerDocument || context ) !== document ) {
        setDocument( context );
    }
    return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
    var val;

    // Set document vars if needed
    if ( ( elem.ownerDocument || elem ) !== document ) {
        setDocument( elem );
    }

    if ( !documentIsXML ) {
        name = name.toLowerCase();
    }
    if ( (val = Expr.attrHandle[ name ]) ) {
        return val( elem );
    }
    if ( documentIsXML || support.attributes ) {
        return elem.getAttribute( name );
    }
    return ( (val = elem.getAttributeNode( name )) || elem.getAttribute( name ) ) && elem[ name ] === true ?
        name :
        val && val.specified ? val.value : null;
};

Sizzle.error = function( msg ) {
    throw new Error( "Syntax error, unrecognized expression: " + msg );
};

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
    var elem,
        duplicates = [],
        i = 1,
        j = 0;

    // Unless we *know* we can detect duplicates, assume their presence
    hasDuplicate = !support.detectDuplicates;
    results.sort( sortOrder );

    if ( hasDuplicate ) {
        for ( ; (elem = results[i]); i++ ) {
            if ( elem === results[ i - 1 ] ) {
                j = duplicates.push( i );
            }
        }
        while ( j-- ) {
            results.splice( duplicates[ j ], 1 );
        }
    }

    return results;
};

function siblingCheck( a, b ) {
    var cur = b && a,
        diff = cur && ( ~b.sourceIndex || MAX_NEGATIVE ) - ( ~a.sourceIndex || MAX_NEGATIVE );

    // Use IE sourceIndex if available on both nodes
    if ( diff ) {
        return diff;
    }

    // Check if b follows a
    if ( cur ) {
        while ( (cur = cur.nextSibling) ) {
            if ( cur === b ) {
                return -1;
            }
        }
    }

    return a ? 1 : -1;
}

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
    return function( elem ) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
    };
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
    return function( elem ) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
    };
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
    return markFunction(function( argument ) {
        argument = +argument;
        return markFunction(function( seed, matches ) {
            var j,
                matchIndexes = fn( [], seed.length, argument ),
                i = matchIndexes.length;

            // Match elements found at the specified indexes
            while ( i-- ) {
                if ( seed[ (j = matchIndexes[i]) ] ) {
                    seed[j] = !(matches[j] = seed[j]);
                }
            }
        });
    });
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
    var node,
        ret = "",
        i = 0,
        nodeType = elem.nodeType;

    if ( !nodeType ) {
        // If no nodeType, this is expected to be an array
        for ( ; (node = elem[i]); i++ ) {
            // Do not traverse comment nodes
            ret += getText( node );
        }
    } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (see #11153)
        if ( typeof elem.textContent === "string" ) {
            return elem.textContent;
        } else {
            // Traverse its children
            for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                ret += getText( elem );
            }
        }
    } else if ( nodeType === 3 || nodeType === 4 ) {
        return elem.nodeValue;
    }
    // Do not include comment or processing instruction nodes

    return ret;
};

Expr = Sizzle.selectors = {

    // Can be adjusted by the user
    cacheLength: 50,

    createPseudo: markFunction,

    match: matchExpr,

    find: {},

    relative: {
        ">": { dir: "parentNode", first: true },
        " ": { dir: "parentNode" },
        "+": { dir: "previousSibling", first: true },
        "~": { dir: "previousSibling" }
    },

    preFilter: {
        "ATTR": function( match ) {
            match[1] = match[1].replace( runescape, funescape );

            // Move the given value to match[3] whether quoted or unquoted
            match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

            if ( match[2] === "~=" ) {
                match[3] = " " + match[3] + " ";
            }

            return match.slice( 0, 4 );
        },

        "CHILD": function( match ) {
            /* matches from matchExpr["CHILD"]
                1 type (only|nth|...)
                2 what (child|of-type)
                3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                4 xn-component of xn+y argument ([+-]?\d*n|)
                5 sign of xn-component
                6 x of xn-component
                7 sign of y-component
                8 y of y-component
            */
            match[1] = match[1].toLowerCase();

            if ( match[1].slice( 0, 3 ) === "nth" ) {
                // nth-* requires argument
                if ( !match[3] ) {
                    Sizzle.error( match[0] );
                }

                // numeric x and y parameters for Expr.filter.CHILD
                // remember that false/true cast respectively to 0/1
                match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
                match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

            // other types prohibit arguments
            } else if ( match[3] ) {
                Sizzle.error( match[0] );
            }

            return match;
        },

        "PSEUDO": function( match ) {
            var excess,
                unquoted = !match[5] && match[2];

            if ( matchExpr["CHILD"].test( match[0] ) ) {
                return null;
            }

            // Accept quoted arguments as-is
            if ( match[4] ) {
                match[2] = match[4];

            // Strip excess characters from unquoted arguments
            } else if ( unquoted && rpseudo.test( unquoted ) &&
                // Get excess from tokenize (recursively)
                (excess = tokenize( unquoted, true )) &&
                // advance to the next closing parenthesis
                (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

                // excess is a negative index
                match[0] = match[0].slice( 0, excess );
                match[2] = unquoted.slice( 0, excess );
            }

            // Return only captures needed by the pseudo filter method (type and argument)
            return match.slice( 0, 3 );
        }
    },

    filter: {

        "TAG": function( nodeName ) {
            if ( nodeName === "*" ) {
                return function() { return true; };
            }

            nodeName = nodeName.replace( runescape, funescape ).toLowerCase();
            return function( elem ) {
                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
            };
        },

        "CLASS": function( className ) {
            var pattern = classCache[ className + " " ];

            return pattern ||
                (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
                classCache( className, function( elem ) {
                    return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
                });
        },

        "ATTR": function( name, operator, check ) {
            return function( elem ) {
                var result = Sizzle.attr( elem, name );

                if ( result == null ) {
                    return operator === "!=";
                }
                if ( !operator ) {
                    return true;
                }

                result += "";

                return operator === "=" ? result === check :
                    operator === "!=" ? result !== check :
                    operator === "^=" ? check && result.indexOf( check ) === 0 :
                    operator === "*=" ? check && result.indexOf( check ) > -1 :
                    operator === "$=" ? check && result.slice( -check.length ) === check :
                    operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
                    operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
                    false;
            };
        },

        "CHILD": function( type, what, argument, first, last ) {
            var simple = type.slice( 0, 3 ) !== "nth",
                forward = type.slice( -4 ) !== "last",
                ofType = what === "of-type";

            return first === 1 && last === 0 ?

                // Shortcut for :nth-*(n)
                function( elem ) {
                    return !!elem.parentNode;
                } :

                function( elem, context, xml ) {
                    var cache, outerCache, node, diff, nodeIndex, start,
                        dir = simple !== forward ? "nextSibling" : "previousSibling",
                        parent = elem.parentNode,
                        name = ofType && elem.nodeName.toLowerCase(),
                        useCache = !xml && !ofType;

                    if ( parent ) {

                        // :(first|last|only)-(child|of-type)
                        if ( simple ) {
                            while ( dir ) {
                                node = elem;
                                while ( (node = node[ dir ]) ) {
                                    if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
                                        return false;
                                    }
                                }
                                // Reverse direction for :only-* (if we haven't yet done so)
                                start = dir = type === "only" && !start && "nextSibling";
                            }
                            return true;
                        }

                        start = [ forward ? parent.firstChild : parent.lastChild ];

                        // non-xml :nth-child(...) stores cache data on `parent`
                        if ( forward && useCache ) {
                            // Seek `elem` from a previously-cached index
                            outerCache = parent[ expando ] || (parent[ expando ] = {});
                            cache = outerCache[ type ] || [];
                            nodeIndex = cache[0] === dirruns && cache[1];
                            diff = cache[0] === dirruns && cache[2];
                            node = nodeIndex && parent.childNodes[ nodeIndex ];

                            while ( (node = ++nodeIndex && node && node[ dir ] ||

                                // Fallback to seeking `elem` from the start
                                (diff = nodeIndex = 0) || start.pop()) ) {

                                // When found, cache indexes on `parent` and break
                                if ( node.nodeType === 1 && ++diff && node === elem ) {
                                    outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            }

                        // Use previously-cached element index if available
                        } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
                            diff = cache[1];

                        // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                        } else {
                            // Use the same loop as above to seek `elem` from the start
                            while ( (node = ++nodeIndex && node && node[ dir ] ||
                                (diff = nodeIndex = 0) || start.pop()) ) {

                                if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
                                    // Cache the index of each encountered element
                                    if ( useCache ) {
                                        (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
                                    }

                                    if ( node === elem ) {
                                        break;
                                    }
                                }
                            }
                        }

                        // Incorporate the offset, then check against cycle size
                        diff -= last;
                        return diff === first || ( diff % first === 0 && diff / first >= 0 );
                    }
                };
        },

        "PSEUDO": function( pseudo, argument ) {
            // pseudo-class names are case-insensitive
            // http://www.w3.org/TR/selectors/#pseudo-classes
            // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
            // Remember that setFilters inherits from pseudos
            var args,
                fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
                    Sizzle.error( "unsupported pseudo: " + pseudo );

            // The user may use createPseudo to indicate that
            // arguments are needed to create the filter function
            // just as Sizzle does
            if ( fn[ expando ] ) {
                return fn( argument );
            }

            // But maintain support for old signatures
            if ( fn.length > 1 ) {
                args = [ pseudo, pseudo, "", argument ];
                return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
                    markFunction(function( seed, matches ) {
                        var idx,
                            matched = fn( seed, argument ),
                            i = matched.length;
                        while ( i-- ) {
                            idx = indexOf.call( seed, matched[i] );
                            seed[ idx ] = !( matches[ idx ] = matched[i] );
                        }
                    }) :
                    function( elem ) {
                        return fn( elem, 0, args );
                    };
            }

            return fn;
        }
    },

    pseudos: {
        // Potentially complex pseudos
        "not": markFunction(function( selector ) {
            // Trim the selector passed to compile
            // to avoid treating leading and trailing
            // spaces as combinators
            var input = [],
                results = [],
                matcher = compile( selector.replace( rtrim, "$1" ) );

            return matcher[ expando ] ?
                markFunction(function( seed, matches, context, xml ) {
                    var elem,
                        unmatched = matcher( seed, null, xml, [] ),
                        i = seed.length;

                    // Match elements unmatched by `matcher`
                    while ( i-- ) {
                        if ( (elem = unmatched[i]) ) {
                            seed[i] = !(matches[i] = elem);
                        }
                    }
                }) :
                function( elem, context, xml ) {
                    input[0] = elem;
                    matcher( input, null, xml, results );
                    return !results.pop();
                };
        }),

        "has": markFunction(function( selector ) {
            return function( elem ) {
                return Sizzle( selector, elem ).length > 0;
            };
        }),

        "contains": markFunction(function( text ) {
            return function( elem ) {
                return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
            };
        }),

        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        "lang": markFunction( function( lang ) {
            // lang value must be a valid identifider
            if ( !ridentifier.test(lang || "") ) {
                Sizzle.error( "unsupported lang: " + lang );
            }
            lang = lang.replace( runescape, funescape ).toLowerCase();
            return function( elem ) {
                var elemLang;
                do {
                    if ( (elemLang = documentIsXML ?
                        elem.getAttribute("xml:lang") || elem.getAttribute("lang") :
                        elem.lang) ) {

                        elemLang = elemLang.toLowerCase();
                        return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
                    }
                } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
                return false;
            };
        }),

        // Miscellaneous
        "target": function( elem ) {
            var hash = window.location && window.location.hash;
            return hash && hash.slice( 1 ) === elem.id;
        },

        "root": function( elem ) {
            return elem === docElem;
        },

        "focus": function( elem ) {
            return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },

        // Boolean properties
        "enabled": function( elem ) {
            return elem.disabled === false;
        },

        "disabled": function( elem ) {
            return elem.disabled === true;
        },

        "checked": function( elem ) {
            // In CSS3, :checked should return both checked and selected elements
            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
            var nodeName = elem.nodeName.toLowerCase();
            return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },

        "selected": function( elem ) {
            // Accessing this property makes selected-by-default
            // options in Safari work properly
            if ( elem.parentNode ) {
                elem.parentNode.selectedIndex;
            }

            return elem.selected === true;
        },

        // Contents
        "empty": function( elem ) {
            // http://www.w3.org/TR/selectors/#empty-pseudo
            // :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
            //   not comment, processing instructions, or others
            // Thanks to Diego Perini for the nodeName shortcut
            //   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
            for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
                    return false;
                }
            }
            return true;
        },

        "parent": function( elem ) {
            return !Expr.pseudos["empty"]( elem );
        },

        // Element/input types
        "header": function( elem ) {
            return rheader.test( elem.nodeName );
        },

        "input": function( elem ) {
            return rinputs.test( elem.nodeName );
        },

        "button": function( elem ) {
            var name = elem.nodeName.toLowerCase();
            return name === "input" && elem.type === "button" || name === "button";
        },

        "text": function( elem ) {
            var attr;
            // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
            // use getAttribute instead to test this case
            return elem.nodeName.toLowerCase() === "input" &&
                elem.type === "text" &&
                ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
        },

        // Position-in-collection
        "first": createPositionalPseudo(function() {
            return [ 0 ];
        }),

        "last": createPositionalPseudo(function( matchIndexes, length ) {
            return [ length - 1 ];
        }),

        "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
            return [ argument < 0 ? argument + length : argument ];
        }),

        "even": createPositionalPseudo(function( matchIndexes, length ) {
            var i = 0;
            for ( ; i < length; i += 2 ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        }),

        "odd": createPositionalPseudo(function( matchIndexes, length ) {
            var i = 1;
            for ( ; i < length; i += 2 ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        }),

        "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
            var i = argument < 0 ? argument + length : argument;
            for ( ; --i >= 0; ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        }),

        "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
            var i = argument < 0 ? argument + length : argument;
            for ( ; ++i < length; ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        })
    }
};

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
    Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
    Expr.pseudos[ i ] = createButtonPseudo( i );
}

function tokenize( selector, parseOnly ) {
    var matched, match, tokens, type,
        soFar, groups, preFilters,
        cached = tokenCache[ selector + " " ];

    if ( cached ) {
        return parseOnly ? 0 : cached.slice( 0 );
    }

    soFar = selector;
    groups = [];
    preFilters = Expr.preFilter;

    while ( soFar ) {

        // Comma and first run
        if ( !matched || (match = rcomma.exec( soFar )) ) {
            if ( match ) {
                // Don't consume trailing commas as valid
                soFar = soFar.slice( match[0].length ) || soFar;
            }
            groups.push( tokens = [] );
        }

        matched = false;

        // Combinators
        if ( (match = rcombinators.exec( soFar )) ) {
            matched = match.shift();
            tokens.push( {
                value: matched,
                // Cast descendant combinators to space
                type: match[0].replace( rtrim, " " )
            } );
            soFar = soFar.slice( matched.length );
        }

        // Filters
        for ( type in Expr.filter ) {
            if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
                (match = preFilters[ type ]( match ))) ) {
                matched = match.shift();
                tokens.push( {
                    value: matched,
                    type: type,
                    matches: match
                } );
                soFar = soFar.slice( matched.length );
            }
        }

        if ( !matched ) {
            break;
        }
    }

    // Return the length of the invalid excess
    // if we're just parsing
    // Otherwise, throw an error or return tokens
    return parseOnly ?
        soFar.length :
        soFar ?
            Sizzle.error( selector ) :
            // Cache the tokens
            tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
    var i = 0,
        len = tokens.length,
        selector = "";
    for ( ; i < len; i++ ) {
        selector += tokens[i].value;
    }
    return selector;
}

function addCombinator( matcher, combinator, base ) {
    var dir = combinator.dir,
        checkNonElements = base && dir === "parentNode",
        doneName = done++;

    return combinator.first ?
        // Check against closest ancestor/preceding element
        function( elem, context, xml ) {
            while ( (elem = elem[ dir ]) ) {
                if ( elem.nodeType === 1 || checkNonElements ) {
                    return matcher( elem, context, xml );
                }
            }
        } :

        // Check against all ancestor/preceding elements
        function( elem, context, xml ) {
            var data, cache, outerCache,
                dirkey = dirruns + " " + doneName;

            // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
            if ( xml ) {
                while ( (elem = elem[ dir ]) ) {
                    if ( elem.nodeType === 1 || checkNonElements ) {
                        if ( matcher( elem, context, xml ) ) {
                            return true;
                        }
                    }
                }
            } else {
                while ( (elem = elem[ dir ]) ) {
                    if ( elem.nodeType === 1 || checkNonElements ) {
                        outerCache = elem[ expando ] || (elem[ expando ] = {});
                        if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
                            if ( (data = cache[1]) === true || data === cachedruns ) {
                                return data === true;
                            }
                        } else {
                            cache = outerCache[ dir ] = [ dirkey ];
                            cache[1] = matcher( elem, context, xml ) || cachedruns;
                            if ( cache[1] === true ) {
                                return true;
                            }
                        }
                    }
                }
            }
        };
}

function elementMatcher( matchers ) {
    return matchers.length > 1 ?
        function( elem, context, xml ) {
            var i = matchers.length;
            while ( i-- ) {
                if ( !matchers[i]( elem, context, xml ) ) {
                    return false;
                }
            }
            return true;
        } :
        matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
    var elem,
        newUnmatched = [],
        i = 0,
        len = unmatched.length,
        mapped = map != null;

    for ( ; i < len; i++ ) {
        if ( (elem = unmatched[i]) ) {
            if ( !filter || filter( elem, context, xml ) ) {
                newUnmatched.push( elem );
                if ( mapped ) {
                    map.push( i );
                }
            }
        }
    }

    return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
    if ( postFilter && !postFilter[ expando ] ) {
        postFilter = setMatcher( postFilter );
    }
    if ( postFinder && !postFinder[ expando ] ) {
        postFinder = setMatcher( postFinder, postSelector );
    }
    return markFunction(function( seed, results, context, xml ) {
        var temp, i, elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,

            // Get initial elements from seed or context
            elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

            // Prefilter to get matcher input, preserving a map for seed-results synchronization
            matcherIn = preFilter && ( seed || !selector ) ?
                condense( elems, preMap, preFilter, context, xml ) :
                elems,

            matcherOut = matcher ?
                // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                    // ...intermediate processing is necessary
                    [] :

                    // ...otherwise use results directly
                    results :
                matcherIn;

        // Find primary matches
        if ( matcher ) {
            matcher( matcherIn, matcherOut, context, xml );
        }

        // Apply postFilter
        if ( postFilter ) {
            temp = condense( matcherOut, postMap );
            postFilter( temp, [], context, xml );

            // Un-match failing elements by moving them back to matcherIn
            i = temp.length;
            while ( i-- ) {
                if ( (elem = temp[i]) ) {
                    matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
                }
            }
        }

        if ( seed ) {
            if ( postFinder || preFilter ) {
                if ( postFinder ) {
                    // Get the final matcherOut by condensing this intermediate into postFinder contexts
                    temp = [];
                    i = matcherOut.length;
                    while ( i-- ) {
                        if ( (elem = matcherOut[i]) ) {
                            // Restore matcherIn since elem is not yet a final match
                            temp.push( (matcherIn[i] = elem) );
                        }
                    }
                    postFinder( null, (matcherOut = []), temp, xml );
                }

                // Move matched elements from seed to results to keep them synchronized
                i = matcherOut.length;
                while ( i-- ) {
                    if ( (elem = matcherOut[i]) &&
                        (temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

                        seed[temp] = !(results[temp] = elem);
                    }
                }
            }

        // Add elements to results, through postFinder if defined
        } else {
            matcherOut = condense(
                matcherOut === results ?
                    matcherOut.splice( preexisting, matcherOut.length ) :
                    matcherOut
            );
            if ( postFinder ) {
                postFinder( null, results, matcherOut, xml );
            } else {
                push.apply( results, matcherOut );
            }
        }
    });
}

function matcherFromTokens( tokens ) {
    var checkContext, matcher, j,
        len = tokens.length,
        leadingRelative = Expr.relative[ tokens[0].type ],
        implicitRelative = leadingRelative || Expr.relative[" "],
        i = leadingRelative ? 1 : 0,

        // The foundational matcher ensures that elements are reachable from top-level context(s)
        matchContext = addCombinator( function( elem ) {
            return elem === checkContext;
        }, implicitRelative, true ),
        matchAnyContext = addCombinator( function( elem ) {
            return indexOf.call( checkContext, elem ) > -1;
        }, implicitRelative, true ),
        matchers = [ function( elem, context, xml ) {
            return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                (checkContext = context).nodeType ?
                    matchContext( elem, context, xml ) :
                    matchAnyContext( elem, context, xml ) );
        } ];

    for ( ; i < len; i++ ) {
        if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
            matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
        } else {
            matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

            // Return special upon seeing a positional matcher
            if ( matcher[ expando ] ) {
                // Find the next relative operator (if any) for proper handling
                j = ++i;
                for ( ; j < len; j++ ) {
                    if ( Expr.relative[ tokens[j].type ] ) {
                        break;
                    }
                }
                return setMatcher(
                    i > 1 && elementMatcher( matchers ),
                    i > 1 && toSelector( tokens.slice( 0, i - 1 ) ).replace( rtrim, "$1" ),
                    matcher,
                    i < j && matcherFromTokens( tokens.slice( i, j ) ),
                    j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
                    j < len && toSelector( tokens )
                );
            }
            matchers.push( matcher );
        }
    }

    return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
    // A counter to specify which element is currently being matched
    var matcherCachedRuns = 0,
        bySet = setMatchers.length > 0,
        byElement = elementMatchers.length > 0,
        superMatcher = function( seed, context, xml, results, expandContext ) {
            var elem, j, matcher,
                setMatched = [],
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                outermost = expandContext != null,
                contextBackup = outermostContext,
                // We must always have either seed elements or context
                elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
                // Use integer dirruns iff this is the outermost matcher
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

            if ( outermost ) {
                outermostContext = context !== document && context;
                cachedruns = matcherCachedRuns;
            }

            // Add elements passing elementMatchers directly to results
            // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
            for ( ; (elem = elems[i]) != null; i++ ) {
                if ( byElement && elem ) {
                    j = 0;
                    while ( (matcher = elementMatchers[j++]) ) {
                        if ( matcher( elem, context, xml ) ) {
                            results.push( elem );
                            break;
                        }
                    }
                    if ( outermost ) {
                        dirruns = dirrunsUnique;
                        cachedruns = ++matcherCachedRuns;
                    }
                }

                // Track unmatched elements for set filters
                if ( bySet ) {
                    // They will have gone through all possible matchers
                    if ( (elem = !matcher && elem) ) {
                        matchedCount--;
                    }

                    // Lengthen the array for every element, matched or not
                    if ( seed ) {
                        unmatched.push( elem );
                    }
                }
            }

            // Apply set filters to unmatched elements
            matchedCount += i;
            if ( bySet && i !== matchedCount ) {
                j = 0;
                while ( (matcher = setMatchers[j++]) ) {
                    matcher( unmatched, setMatched, context, xml );
                }

                if ( seed ) {
                    // Reintegrate element matches to eliminate the need for sorting
                    if ( matchedCount > 0 ) {
                        while ( i-- ) {
                            if ( !(unmatched[i] || setMatched[i]) ) {
                                setMatched[i] = pop.call( results );
                            }
                        }
                    }

                    // Discard index placeholder values to get only actual matches
                    setMatched = condense( setMatched );
                }

                // Add matches to results
                push.apply( results, setMatched );

                // Seedless set matches succeeding multiple successful matchers stipulate sorting
                if ( outermost && !seed && setMatched.length > 0 &&
                    ( matchedCount + setMatchers.length ) > 1 ) {

                    Sizzle.uniqueSort( results );
                }
            }

            // Override manipulation of globals by nested matchers
            if ( outermost ) {
                dirruns = dirrunsUnique;
                outermostContext = contextBackup;
            }

            return unmatched;
        };

    return bySet ?
        markFunction( superMatcher ) :
        superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
    var i,
        setMatchers = [],
        elementMatchers = [],
        cached = compilerCache[ selector + " " ];

    if ( !cached ) {
        // Generate a function of recursive functions that can be used to check each element
        if ( !group ) {
            group = tokenize( selector );
        }
        i = group.length;
        while ( i-- ) {
            cached = matcherFromTokens( group[i] );
            if ( cached[ expando ] ) {
                setMatchers.push( cached );
            } else {
                elementMatchers.push( cached );
            }
        }

        // Cache the compiled function
        cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
    }
    return cached;
};

function multipleContexts( selector, contexts, results ) {
    var i = 0,
        len = contexts.length;
    for ( ; i < len; i++ ) {
        Sizzle( selector, contexts[i], results );
    }
    return results;
}

function select( selector, context, results, seed ) {
    var i, tokens, token, type, find,
        match = tokenize( selector );

    if ( !seed ) {
        // Try to minimize operations if there is only one group
        if ( match.length === 1 ) {

            // Take a shortcut and set the context if the root selector is an ID
            tokens = match[0] = match[0].slice( 0 );
            if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                    context.nodeType === 9 && !documentIsXML &&
                    Expr.relative[ tokens[1].type ] ) {

                context = Expr.find["ID"]( token.matches[0].replace( runescape, funescape ), context )[0];
                if ( !context ) {
                    return results;
                }

                selector = selector.slice( tokens.shift().value.length );
            }

            // Fetch a seed set for right-to-left matching
            i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
            while ( i-- ) {
                token = tokens[i];

                // Abort if we hit a combinator
                if ( Expr.relative[ (type = token.type) ] ) {
                    break;
                }
                if ( (find = Expr.find[ type ]) ) {
                    // Search, expanding context for leading sibling combinators
                    if ( (seed = find(
                        token.matches[0].replace( runescape, funescape ),
                        rsibling.test( tokens[0].type ) && context.parentNode || context
                    )) ) {

                        // If seed is empty or no tokens remain, we can return early
                        tokens.splice( i, 1 );
                        selector = seed.length && toSelector( tokens );
                        if ( !selector ) {
                            push.apply( results, slice.call( seed, 0 ) );
                            return results;
                        }

                        break;
                    }
                }
            }
        }
    }

    // Compile and execute a filtering function
    // Provide `match` to avoid retokenization if we modified the selector above
    compile( selector, match )(
        seed,
        context,
        documentIsXML,
        results,
        rsibling.test( selector )
    );
    return results;
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Easy API for creating new setFilters
function setFilters() {}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Initialize with the default document
setDocument();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
    rparentsprev = /^(?:parents|prev(?:Until|All))/,
    isSimple = /^.[^:#\[\.,]*$/,
    rneedsContext = jQuery.expr.match.needsContext,
    // methods guaranteed to produce a unique set when starting from a unique set
    guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
    };

jQuery.fn.extend({
    find: function( selector ) {
        var i, ret, self,
            len = this.length;

        if ( typeof selector !== "string" ) {
            self = this;
            return this.pushStack( jQuery( selector ).filter(function() {
                for ( i = 0; i < len; i++ ) {
                    if ( jQuery.contains( self[ i ], this ) ) {
                        return true;
                    }
                }
            }) );
        }

        ret = [];
        for ( i = 0; i < len; i++ ) {
            jQuery.find( selector, this[ i ], ret );
        }

        // Needed because $( selector, context ) becomes $( context ).find( selector )
        ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
        ret.selector = ( this.selector ? this.selector + " " : "" ) + selector;
        return ret;
    },

    has: function( target ) {
        var i,
            targets = jQuery( target, this ),
            len = targets.length;

        return this.filter(function() {
            for ( i = 0; i < len; i++ ) {
                if ( jQuery.contains( this, targets[i] ) ) {
                    return true;
                }
            }
        });
    },

    not: function( selector ) {
        return this.pushStack( winnow(this, selector, false) );
    },

    filter: function( selector ) {
        return this.pushStack( winnow(this, selector, true) );
    },

    is: function( selector ) {
        return !!selector && (
            typeof selector === "string" ?
                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                rneedsContext.test( selector ) ?
                    jQuery( selector, this.context ).index( this[0] ) >= 0 :
                    jQuery.filter( selector, this ).length > 0 :
                this.filter( selector ).length > 0 );
    },

    closest: function( selectors, context ) {
        var cur,
            i = 0,
            l = this.length,
            ret = [],
            pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
                jQuery( selectors, context || this.context ) :
                0;

        for ( ; i < l; i++ ) {
            cur = this[i];

            while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
                if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
                    ret.push( cur );
                    break;
                }
                cur = cur.parentNode;
            }
        }

        return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
    },

    // Determine the position of an element within
    // the matched set of elements
    index: function( elem ) {

        // No argument, return index in parent
        if ( !elem ) {
            return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
        }

        // index in selector
        if ( typeof elem === "string" ) {
            return jQuery.inArray( this[0], jQuery( elem ) );
        }

        // Locate the position of the desired element
        return jQuery.inArray(
            // If it receives a jQuery object, the first element is used
            elem.jquery ? elem[0] : elem, this );
    },

    add: function( selector, context ) {
        var set = typeof selector === "string" ?
                jQuery( selector, context ) :
                jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
            all = jQuery.merge( this.get(), set );

        return this.pushStack( jQuery.unique(all) );
    },

    addBack: function( selector ) {
        return this.add( selector == null ?
            this.prevObject : this.prevObject.filter(selector)
        );
    }
});

jQuery.fn.andSelf = jQuery.fn.addBack;

function sibling( cur, dir ) {
    do {
        cur = cur[ dir ];
    } while ( cur && cur.nodeType !== 1 );

    return cur;
}

jQuery.each({
    parent: function( elem ) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function( elem ) {
        return jQuery.dir( elem, "parentNode" );
    },
    parentsUntil: function( elem, i, until ) {
        return jQuery.dir( elem, "parentNode", until );
    },
    next: function( elem ) {
        return sibling( elem, "nextSibling" );
    },
    prev: function( elem ) {
        return sibling( elem, "previousSibling" );
    },
    nextAll: function( elem ) {
        return jQuery.dir( elem, "nextSibling" );
    },
    prevAll: function( elem ) {
        return jQuery.dir( elem, "previousSibling" );
    },
    nextUntil: function( elem, i, until ) {
        return jQuery.dir( elem, "nextSibling", until );
    },
    prevUntil: function( elem, i, until ) {
        return jQuery.dir( elem, "previousSibling", until );
    },
    siblings: function( elem ) {
        return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
    },
    children: function( elem ) {
        return jQuery.sibling( elem.firstChild );
    },
    contents: function( elem ) {
        return jQuery.nodeName( elem, "iframe" ) ?
            elem.contentDocument || elem.contentWindow.document :
            jQuery.merge( [], elem.childNodes );
    }
}, function( name, fn ) {
    jQuery.fn[ name ] = function( until, selector ) {
        var ret = jQuery.map( this, fn, until );

        if ( !runtil.test( name ) ) {
            selector = until;
        }

        if ( selector && typeof selector === "string" ) {
            ret = jQuery.filter( selector, ret );
        }

        ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

        if ( this.length > 1 && rparentsprev.test( name ) ) {
            ret = ret.reverse();
        }

        return this.pushStack( ret );
    };
});

jQuery.extend({
    filter: function( expr, elems, not ) {
        if ( not ) {
            expr = ":not(" + expr + ")";
        }

        return elems.length === 1 ?
            jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
            jQuery.find.matches(expr, elems);
    },

    dir: function( elem, dir, until ) {
        var matched = [],
            cur = elem[ dir ];

        while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
            if ( cur.nodeType === 1 ) {
                matched.push( cur );
            }
            cur = cur[dir];
        }
        return matched;
    },

    sibling: function( n, elem ) {
        var r = [];

        for ( ; n; n = n.nextSibling ) {
            if ( n.nodeType === 1 && n !== elem ) {
                r.push( n );
            }
        }

        return r;
    }
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

    // Can't pass null or undefined to indexOf in Firefox 4
    // Set to 0 to skip string check
    qualifier = qualifier || 0;

    if ( jQuery.isFunction( qualifier ) ) {
        return jQuery.grep(elements, function( elem, i ) {
            var retVal = !!qualifier.call( elem, i, elem );
            return retVal === keep;
        });

    } else if ( qualifier.nodeType ) {
        return jQuery.grep(elements, function( elem ) {
            return ( elem === qualifier ) === keep;
        });

    } else if ( typeof qualifier === "string" ) {
        var filtered = jQuery.grep(elements, function( elem ) {
            return elem.nodeType === 1;
        });

        if ( isSimple.test( qualifier ) ) {
            return jQuery.filter(qualifier, filtered, !keep);
        } else {
            qualifier = jQuery.filter( qualifier, filtered );
        }
    }

    return jQuery.grep(elements, function( elem ) {
        return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
    });
}
function createSafeFragment( document ) {
    var list = nodeNames.split( "|" ),
        safeFrag = document.createDocumentFragment();

    if ( safeFrag.createElement ) {
        while ( list.length ) {
            safeFrag.createElement(
                list.pop()
            );
        }
    }
    return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
        "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
    rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
    rleadingWhitespace = /^\s+/,
    rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    rtagName = /<([\w:]+)/,
    rtbody = /<tbody/i,
    rhtml = /<|&#?\w+;/,
    rnoInnerhtml = /<(?:script|style|link)/i,
    manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
    // checked="checked" or checked
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rscriptType = /^$|\/(?:java|ecma)script/i,
    rscriptTypeMasked = /^true\/(.*)/,
    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

    // We have to close these tags to support XHTML (#13200)
    wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

        // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
        // unless wrapped in a div with non-breaking characters in front of it.
        _default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
    },
    safeFragment = createSafeFragment( document ),
    fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
    text: function( value ) {
        return jQuery.access( this, function( value ) {
            return value === undefined ?
                jQuery.text( this ) :
                this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
        }, null, value, arguments.length );
    },

    wrapAll: function( html ) {
        if ( jQuery.isFunction( html ) ) {
            return this.each(function(i) {
                jQuery(this).wrapAll( html.call(this, i) );
            });
        }

        if ( this[0] ) {
            // The elements to wrap the target around
            var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

            if ( this[0].parentNode ) {
                wrap.insertBefore( this[0] );
            }

            wrap.map(function() {
                var elem = this;

                while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
                    elem = elem.firstChild;
                }

                return elem;
            }).append( this );
        }

        return this;
    },

    wrapInner: function( html ) {
        if ( jQuery.isFunction( html ) ) {
            return this.each(function(i) {
                jQuery(this).wrapInner( html.call(this, i) );
            });
        }

        return this.each(function() {
            var self = jQuery( this ),
                contents = self.contents();

            if ( contents.length ) {
                contents.wrapAll( html );

            } else {
                self.append( html );
            }
        });
    },

    wrap: function( html ) {
        var isFunction = jQuery.isFunction( html );

        return this.each(function(i) {
            jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
        });
    },

    unwrap: function() {
        return this.parent().each(function() {
            if ( !jQuery.nodeName( this, "body" ) ) {
                jQuery( this ).replaceWith( this.childNodes );
            }
        }).end();
    },

    append: function() {
        return this.domManip(arguments, true, function( elem ) {
            if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                this.appendChild( elem );
            }
        });
    },

    prepend: function() {
        return this.domManip(arguments, true, function( elem ) {
            if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                this.insertBefore( elem, this.firstChild );
            }
        });
    },

    before: function() {
        return this.domManip( arguments, false, function( elem ) {
            if ( this.parentNode ) {
                this.parentNode.insertBefore( elem, this );
            }
        });
    },

    after: function() {
        return this.domManip( arguments, false, function( elem ) {
            if ( this.parentNode ) {
                this.parentNode.insertBefore( elem, this.nextSibling );
            }
        });
    },

    // keepData is for internal use only--do not document
    remove: function( selector, keepData ) {
        var elem,
            i = 0;

        for ( ; (elem = this[i]) != null; i++ ) {
            if ( !selector || jQuery.filter( selector, [ elem ] ).length > 0 ) {
                if ( !keepData && elem.nodeType === 1 ) {
                    jQuery.cleanData( getAll( elem ) );
                }

                if ( elem.parentNode ) {
                    if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
                        setGlobalEval( getAll( elem, "script" ) );
                    }
                    elem.parentNode.removeChild( elem );
                }
            }
        }

        return this;
    },

    empty: function() {
        var elem,
            i = 0;

        for ( ; (elem = this[i]) != null; i++ ) {
            // Remove element nodes and prevent memory leaks
            if ( elem.nodeType === 1 ) {
                jQuery.cleanData( getAll( elem, false ) );
            }

            // Remove any remaining nodes
            while ( elem.firstChild ) {
                elem.removeChild( elem.firstChild );
            }

            // If this is a select, ensure that it displays empty (#12336)
            // Support: IE<9
            if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
                elem.options.length = 0;
            }
        }

        return this;
    },

    clone: function( dataAndEvents, deepDataAndEvents ) {
        dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
        deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

        return this.map( function () {
            return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
        });
    },

    html: function( value ) {
        return jQuery.access( this, function( value ) {
            var elem = this[0] || {},
                i = 0,
                l = this.length;

            if ( value === undefined ) {
                return elem.nodeType === 1 ?
                    elem.innerHTML.replace( rinlinejQuery, "" ) :
                    undefined;
            }

            // See if we can take a shortcut and just use innerHTML
            if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
                ( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
                ( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
                !wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

                value = value.replace( rxhtmlTag, "<$1></$2>" );

                try {
                    for (; i < l; i++ ) {
                        // Remove element nodes and prevent memory leaks
                        elem = this[i] || {};
                        if ( elem.nodeType === 1 ) {
                            jQuery.cleanData( getAll( elem, false ) );
                            elem.innerHTML = value;
                        }
                    }

                    elem = 0;

                // If using innerHTML throws an exception, use the fallback method
                } catch(e) {}
            }

            if ( elem ) {
                this.empty().append( value );
            }
        }, null, value, arguments.length );
    },

    replaceWith: function( value ) {
        var isFunc = jQuery.isFunction( value );

        // Make sure that the elements are removed from the DOM before they are inserted
        // this can help fix replacing a parent with child elements
        if ( !isFunc && typeof value !== "string" ) {
            value = jQuery( value ).not( this ).detach();
        }

        return this.domManip( [ value ], true, function( elem ) {
            var next = this.nextSibling,
                parent = this.parentNode;

            if ( parent ) {
                jQuery( this ).remove();
                parent.insertBefore( elem, next );
            }
        });
    },

    detach: function( selector ) {
        return this.remove( selector, true );
    },

    domManip: function( args, table, callback ) {

        // Flatten any nested arrays
        args = core_concat.apply( [], args );

        var first, node, hasScripts,
            scripts, doc, fragment,
            i = 0,
            l = this.length,
            set = this,
            iNoClone = l - 1,
            value = args[0],
            isFunction = jQuery.isFunction( value );

        // We can't cloneNode fragments that contain checked, in WebKit
        if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
            return this.each(function( index ) {
                var self = set.eq( index );
                if ( isFunction ) {
                    args[0] = value.call( this, index, table ? self.html() : undefined );
                }
                self.domManip( args, table, callback );
            });
        }

        if ( l ) {
            fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
            first = fragment.firstChild;

            if ( fragment.childNodes.length === 1 ) {
                fragment = first;
            }

            if ( first ) {
                table = table && jQuery.nodeName( first, "tr" );
                scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
                hasScripts = scripts.length;

                // Use the original fragment for the last item instead of the first because it can end up
                // being emptied incorrectly in certain situations (#8070).
                for ( ; i < l; i++ ) {
                    node = fragment;

                    if ( i !== iNoClone ) {
                        node = jQuery.clone( node, true, true );

                        // Keep references to cloned scripts for later restoration
                        if ( hasScripts ) {
                            jQuery.merge( scripts, getAll( node, "script" ) );
                        }
                    }

                    callback.call(
                        table && jQuery.nodeName( this[i], "table" ) ?
                            findOrAppend( this[i], "tbody" ) :
                            this[i],
                        node,
                        i
                    );
                }

                if ( hasScripts ) {
                    doc = scripts[ scripts.length - 1 ].ownerDocument;

                    // Reenable scripts
                    jQuery.map( scripts, restoreScript );

                    // Evaluate executable scripts on first document insertion
                    for ( i = 0; i < hasScripts; i++ ) {
                        node = scripts[ i ];
                        if ( rscriptType.test( node.type || "" ) &&
                            !jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

                            if ( node.src ) {
                                // Hope ajax is available...
                                jQuery.ajax({
                                    url: node.src,
                                    type: "GET",
                                    dataType: "script",
                                    async: false,
                                    global: false,
                                    "throws": true
                                });
                            } else {
                                jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
                            }
                        }
                    }
                }

                // Fix #11809: Avoid leaking memory
                fragment = first = null;
            }
        }

        return this;
    }
});

function findOrAppend( elem, tag ) {
    return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
    var attr = elem.getAttributeNode("type");
    elem.type = ( attr && attr.specified ) + "/" + elem.type;
    return elem;
}
function restoreScript( elem ) {
    var match = rscriptTypeMasked.exec( elem.type );
    if ( match ) {
        elem.type = match[1];
    } else {
        elem.removeAttribute("type");
    }
    return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
    var elem,
        i = 0;
    for ( ; (elem = elems[i]) != null; i++ ) {
        jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
    }
}

function cloneCopyEvent( src, dest ) {

    if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
        return;
    }

    var type, i, l,
        oldData = jQuery._data( src ),
        curData = jQuery._data( dest, oldData ),
        events = oldData.events;

    if ( events ) {
        delete curData.handle;
        curData.events = {};

        for ( type in events ) {
            for ( i = 0, l = events[ type ].length; i < l; i++ ) {
                jQuery.event.add( dest, type, events[ type ][ i ] );
            }
        }
    }

    // make the cloned public data object a copy from the original
    if ( curData.data ) {
        curData.data = jQuery.extend( {}, curData.data );
    }
}

function fixCloneNodeIssues( src, dest ) {
    var nodeName, e, data;

    // We do not need to do anything for non-Elements
    if ( dest.nodeType !== 1 ) {
        return;
    }

    nodeName = dest.nodeName.toLowerCase();

    // IE6-8 copies events bound via attachEvent when using cloneNode.
    if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
        data = jQuery._data( dest );

        for ( e in data.events ) {
            jQuery.removeEvent( dest, e, data.handle );
        }

        // Event data gets referenced instead of copied if the expando gets copied too
        dest.removeAttribute( jQuery.expando );
    }

    // IE blanks contents when cloning scripts, and tries to evaluate newly-set text
    if ( nodeName === "script" && dest.text !== src.text ) {
        disableScript( dest ).text = src.text;
        restoreScript( dest );

    // IE6-10 improperly clones children of object elements using classid.
    // IE10 throws NoModificationAllowedError if parent is null, #12132.
    } else if ( nodeName === "object" ) {
        if ( dest.parentNode ) {
            dest.outerHTML = src.outerHTML;
        }

        // This path appears unavoidable for IE9. When cloning an object
        // element in IE9, the outerHTML strategy above is not sufficient.
        // If the src has innerHTML and the destination does not,
        // copy the src.innerHTML into the dest.innerHTML. #10324
        if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
            dest.innerHTML = src.innerHTML;
        }

    } else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
        // IE6-8 fails to persist the checked state of a cloned checkbox
        // or radio button. Worse, IE6-7 fail to give the cloned element
        // a checked appearance if the defaultChecked value isn't also set

        dest.defaultChecked = dest.checked = src.checked;

        // IE6-7 get confused and end up setting the value of a cloned
        // checkbox/radio button to an empty string instead of "on"
        if ( dest.value !== src.value ) {
            dest.value = src.value;
        }

    // IE6-8 fails to return the selected option to the default selected
    // state when cloning options
    } else if ( nodeName === "option" ) {
        dest.defaultSelected = dest.selected = src.defaultSelected;

    // IE6-8 fails to set the defaultValue to the correct value when
    // cloning other types of input fields
    } else if ( nodeName === "input" || nodeName === "textarea" ) {
        dest.defaultValue = src.defaultValue;
    }
}

jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
}, function( name, original ) {
    jQuery.fn[ name ] = function( selector ) {
        var elems,
            i = 0,
            ret = [],
            insert = jQuery( selector ),
            last = insert.length - 1;

        for ( ; i <= last; i++ ) {
            elems = i === last ? this : this.clone(true);
            jQuery( insert[i] )[ original ]( elems );

            // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
            core_push.apply( ret, elems.get() );
        }

        return this.pushStack( ret );
    };
});

function getAll( context, tag ) {
    var elems, elem,
        i = 0,
        found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName( tag || "*" ) :
            typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll( tag || "*" ) :
            undefined;

    if ( !found ) {
        for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
            if ( !tag || jQuery.nodeName( elem, tag ) ) {
                found.push( elem );
            } else {
                jQuery.merge( found, getAll( elem, tag ) );
            }
        }
    }

    return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
        jQuery.merge( [ context ], found ) :
        found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
    if ( manipulation_rcheckableType.test( elem.type ) ) {
        elem.defaultChecked = elem.checked;
    }
}

jQuery.extend({
    clone: function( elem, dataAndEvents, deepDataAndEvents ) {
        var destElements, node, clone, i, srcElements,
            inPage = jQuery.contains( elem.ownerDocument, elem );

        if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
            clone = elem.cloneNode( true );

        // IE<=8 does not properly clone detached, unknown element nodes
        } else {
            fragmentDiv.innerHTML = elem.outerHTML;
            fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
        }

        if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
                (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

            // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
            destElements = getAll( clone );
            srcElements = getAll( elem );

            // Fix all IE cloning issues
            for ( i = 0; (node = srcElements[i]) != null; ++i ) {
                // Ensure that the destination node is not null; Fixes #9587
                if ( destElements[i] ) {
                    fixCloneNodeIssues( node, destElements[i] );
                }
            }
        }

        // Copy the events from the original to the clone
        if ( dataAndEvents ) {
            if ( deepDataAndEvents ) {
                srcElements = srcElements || getAll( elem );
                destElements = destElements || getAll( clone );

                for ( i = 0; (node = srcElements[i]) != null; i++ ) {
                    cloneCopyEvent( node, destElements[i] );
                }
            } else {
                cloneCopyEvent( elem, clone );
            }
        }

        // Preserve script evaluation history
        destElements = getAll( clone, "script" );
        if ( destElements.length > 0 ) {
            setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
        }

        destElements = srcElements = node = null;

        // Return the cloned set
        return clone;
    },

    buildFragment: function( elems, context, scripts, selection ) {
        var j, elem, contains,
            tmp, tag, tbody, wrap,
            l = elems.length,

            // Ensure a safe fragment
            safe = createSafeFragment( context ),

            nodes = [],
            i = 0;

        for ( ; i < l; i++ ) {
            elem = elems[ i ];

            if ( elem || elem === 0 ) {

                // Add nodes directly
                if ( jQuery.type( elem ) === "object" ) {
                    jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

                // Convert non-html into a text node
                } else if ( !rhtml.test( elem ) ) {
                    nodes.push( context.createTextNode( elem ) );

                // Convert html into DOM nodes
                } else {
                    tmp = tmp || safe.appendChild( context.createElement("div") );

                    // Deserialize a standard representation
                    tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
                    wrap = wrapMap[ tag ] || wrapMap._default;

                    tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

                    // Descend through wrappers to the right content
                    j = wrap[0];
                    while ( j-- ) {
                        tmp = tmp.lastChild;
                    }

                    // Manually add leading whitespace removed by IE
                    if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
                        nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
                    }

                    // Remove IE's autoinserted <tbody> from table fragments
                    if ( !jQuery.support.tbody ) {

                        // String was a <table>, *may* have spurious <tbody>
                        elem = tag === "table" && !rtbody.test( elem ) ?
                            tmp.firstChild :

                            // String was a bare <thead> or <tfoot>
                            wrap[1] === "<table>" && !rtbody.test( elem ) ?
                                tmp :
                                0;

                        j = elem && elem.childNodes.length;
                        while ( j-- ) {
                            if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
                                elem.removeChild( tbody );
                            }
                        }
                    }

                    jQuery.merge( nodes, tmp.childNodes );

                    // Fix #12392 for WebKit and IE > 9
                    tmp.textContent = "";

                    // Fix #12392 for oldIE
                    while ( tmp.firstChild ) {
                        tmp.removeChild( tmp.firstChild );
                    }

                    // Remember the top-level container for proper cleanup
                    tmp = safe.lastChild;
                }
            }
        }

        // Fix #11356: Clear elements from fragment
        if ( tmp ) {
            safe.removeChild( tmp );
        }

        // Reset defaultChecked for any radios and checkboxes
        // about to be appended to the DOM in IE 6/7 (#8060)
        if ( !jQuery.support.appendChecked ) {
            jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
        }

        i = 0;
        while ( (elem = nodes[ i++ ]) ) {

            // #4087 - If origin and destination elements are the same, and this is
            // that element, do not do anything
            if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
                continue;
            }

            contains = jQuery.contains( elem.ownerDocument, elem );

            // Append to fragment
            tmp = getAll( safe.appendChild( elem ), "script" );

            // Preserve script evaluation history
            if ( contains ) {
                setGlobalEval( tmp );
            }

            // Capture executables
            if ( scripts ) {
                j = 0;
                while ( (elem = tmp[ j++ ]) ) {
                    if ( rscriptType.test( elem.type || "" ) ) {
                        scripts.push( elem );
                    }
                }
            }
        }

        tmp = null;

        return safe;
    },

    cleanData: function( elems, /* internal */ acceptData ) {
        var elem, type, id, data,
            i = 0,
            internalKey = jQuery.expando,
            cache = jQuery.cache,
            deleteExpando = jQuery.support.deleteExpando,
            special = jQuery.event.special;

        for ( ; (elem = elems[i]) != null; i++ ) {

            if ( acceptData || jQuery.acceptData( elem ) ) {

                id = elem[ internalKey ];
                data = id && cache[ id ];

                if ( data ) {
                    if ( data.events ) {
                        for ( type in data.events ) {
                            if ( special[ type ] ) {
                                jQuery.event.remove( elem, type );

                            // This is a shortcut to avoid jQuery.event.remove's overhead
                            } else {
                                jQuery.removeEvent( elem, type, data.handle );
                            }
                        }
                    }

                    // Remove cache only if it was not already removed by jQuery.event.remove
                    if ( cache[ id ] ) {

                        delete cache[ id ];

                        // IE does not allow us to delete expando properties from nodes,
                        // nor does it have a removeAttribute function on Document nodes;
                        // we must handle all of these cases
                        if ( deleteExpando ) {
                            delete elem[ internalKey ];

                        } else if ( typeof elem.removeAttribute !== core_strundefined ) {
                            elem.removeAttribute( internalKey );

                        } else {
                            elem[ internalKey ] = null;
                        }

                        core_deletedIds.push( id );
                    }
                }
            }
        }
    }
});
var iframe, getStyles, curCSS,
    ralpha = /alpha\([^)]*\)/i,
    ropacity = /opacity\s*=\s*([^)]*)/,
    rposition = /^(top|right|bottom|left)$/,
    // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
    // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
    rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    rmargin = /^margin/,
    rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
    rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
    rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
    elemdisplay = { BODY: "block" },

    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
    cssNormalTransform = {
        letterSpacing: 0,
        fontWeight: 400
    },

    cssExpand = [ "Top", "Right", "Bottom", "Left" ],
    cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

    // shortcut for names that are not vendor prefixed
    if ( name in style ) {
        return name;
    }

    // check for vendor prefixed names
    var capName = name.charAt(0).toUpperCase() + name.slice(1),
        origName = name,
        i = cssPrefixes.length;

    while ( i-- ) {
        name = cssPrefixes[ i ] + capName;
        if ( name in style ) {
            return name;
        }
    }

    return origName;
}

function isHidden( elem, el ) {
    // isHidden might be called from jQuery#filter function;
    // in that case, element will be second argument
    elem = el || elem;
    return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
    var display, elem, hidden,
        values = [],
        index = 0,
        length = elements.length;

    for ( ; index < length; index++ ) {
        elem = elements[ index ];
        if ( !elem.style ) {
            continue;
        }

        values[ index ] = jQuery._data( elem, "olddisplay" );
        display = elem.style.display;
        if ( show ) {
            // Reset the inline display of this element to learn if it is
            // being hidden by cascaded rules or not
            if ( !values[ index ] && display === "none" ) {
                elem.style.display = "";
            }

            // Set elements which have been overridden with display: none
            // in a stylesheet to whatever the default browser style is
            // for such an element
            if ( elem.style.display === "" && isHidden( elem ) ) {
                values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
            }
        } else {

            if ( !values[ index ] ) {
                hidden = isHidden( elem );

                if ( display && display !== "none" || !hidden ) {
                    jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
                }
            }
        }
    }

    // Set the display of most of the elements in a second loop
    // to avoid the constant reflow
    for ( index = 0; index < length; index++ ) {
        elem = elements[ index ];
        if ( !elem.style ) {
            continue;
        }
        if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
            elem.style.display = show ? values[ index ] || "" : "none";
        }
    }

    return elements;
}

jQuery.fn.extend({
    css: function( name, value ) {
        return jQuery.access( this, function( elem, name, value ) {
            var len, styles,
                map = {},
                i = 0;

            if ( jQuery.isArray( name ) ) {
                styles = getStyles( elem );
                len = name.length;

                for ( ; i < len; i++ ) {
                    map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
                }

                return map;
            }

            return value !== undefined ?
                jQuery.style( elem, name, value ) :
                jQuery.css( elem, name );
        }, name, value, arguments.length > 1 );
    },
    show: function() {
        return showHide( this, true );
    },
    hide: function() {
        return showHide( this );
    },
    toggle: function( state ) {
        var bool = typeof state === "boolean";

        return this.each(function() {
            if ( bool ? state : isHidden( this ) ) {
                jQuery( this ).show();
            } else {
                jQuery( this ).hide();
            }
        });
    }
});

jQuery.extend({
    // Add in style property hooks for overriding the default
    // behavior of getting and setting a style property
    cssHooks: {
        opacity: {
            get: function( elem, computed ) {
                if ( computed ) {
                    // We should always get a number back from opacity
                    var ret = curCSS( elem, "opacity" );
                    return ret === "" ? "1" : ret;
                }
            }
        }
    },

    // Exclude the following css properties to add px
    cssNumber: {
        "columnCount": true,
        "fillOpacity": true,
        "fontWeight": true,
        "lineHeight": true,
        "opacity": true,
        "orphans": true,
        "widows": true,
        "zIndex": true,
        "zoom": true
    },

    // Add in properties whose names you wish to fix before
    // setting or getting the value
    cssProps: {
        // normalize float css property
        "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
    },

    // Get and set the style property on a DOM Node
    style: function( elem, name, value, extra ) {
        // Don't set styles on text and comment nodes
        if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
            return;
        }

        // Make sure that we're working with the right name
        var ret, type, hooks,
            origName = jQuery.camelCase( name ),
            style = elem.style;

        name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

        // gets hook for the prefixed version
        // followed by the unprefixed version
        hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

        // Check if we're setting a value
        if ( value !== undefined ) {
            type = typeof value;

            // convert relative number strings (+= or -=) to relative numbers. #7345
            if ( type === "string" && (ret = rrelNum.exec( value )) ) {
                value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
                // Fixes bug #9237
                type = "number";
            }

            // Make sure that NaN and null values aren't set. See: #7116
            if ( value == null || type === "number" && isNaN( value ) ) {
                return;
            }

            // If a number was passed in, add 'px' to the (except for certain CSS properties)
            if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
                value += "px";
            }

            // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
            // but it would mean to define eight (for every problematic property) identical functions
            if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
                style[ name ] = "inherit";
            }

            // If a hook was provided, use that value, otherwise just set the specified value
            if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

                // Wrapped to prevent IE from throwing errors when 'invalid' values are provided
                // Fixes bug #5509
                try {
                    style[ name ] = value;
                } catch(e) {}
            }

        } else {
            // If a hook was provided get the non-computed value from there
            if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
                return ret;
            }

            // Otherwise just get the value from the style object
            return style[ name ];
        }
    },

    css: function( elem, name, extra, styles ) {
        var num, val, hooks,
            origName = jQuery.camelCase( name );

        // Make sure that we're working with the right name
        name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

        // gets hook for the prefixed version
        // followed by the unprefixed version
        hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

        // If a hook was provided get the computed value from there
        if ( hooks && "get" in hooks ) {
            val = hooks.get( elem, true, extra );
        }

        // Otherwise, if a way to get the computed value exists, use that
        if ( val === undefined ) {
            val = curCSS( elem, name, styles );
        }

        //convert "normal" to computed value
        if ( val === "normal" && name in cssNormalTransform ) {
            val = cssNormalTransform[ name ];
        }

        // Return, converting to number if forced or a qualifier was provided and val looks numeric
        if ( extra === "" || extra ) {
            num = parseFloat( val );
            return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
        }
        return val;
    },

    // A method for quickly swapping in/out CSS properties to get correct calculations
    swap: function( elem, options, callback, args ) {
        var ret, name,
            old = {};

        // Remember the old values, and insert the new ones
        for ( name in options ) {
            old[ name ] = elem.style[ name ];
            elem.style[ name ] = options[ name ];
        }

        ret = callback.apply( elem, args || [] );

        // Revert the old values
        for ( name in options ) {
            elem.style[ name ] = old[ name ];
        }

        return ret;
    }
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
    getStyles = function( elem ) {
        return window.getComputedStyle( elem, null );
    };

    curCSS = function( elem, name, _computed ) {
        var width, minWidth, maxWidth,
            computed = _computed || getStyles( elem ),

            // getPropertyValue is only needed for .css('filter') in IE9, see #12537
            ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
            style = elem.style;

        if ( computed ) {

            if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
                ret = jQuery.style( elem, name );
            }

            // A tribute to the "awesome hack by Dean Edwards"
            // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
            // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
            // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
            if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

                // Remember the original values
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;

                // Put in the new values to get a computed value out
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;

                // Revert the changed values
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }

        return ret;
    };
} else if ( document.documentElement.currentStyle ) {
    getStyles = function( elem ) {
        return elem.currentStyle;
    };

    curCSS = function( elem, name, _computed ) {
        var left, rs, rsLeft,
            computed = _computed || getStyles( elem ),
            ret = computed ? computed[ name ] : undefined,
            style = elem.style;

        // Avoid setting ret to empty string here
        // so we don't default to auto
        if ( ret == null && style && style[ name ] ) {
            ret = style[ name ];
        }

        // From the awesome hack by Dean Edwards
        // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

        // If we're not dealing with a regular pixel number
        // but a number that has a weird ending, we need to convert it to pixels
        // but not position css attributes, as those are proportional to the parent element instead
        // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
        if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

            // Remember the original values
            left = style.left;
            rs = elem.runtimeStyle;
            rsLeft = rs && rs.left;

            // Put in the new values to get a computed value out
            if ( rsLeft ) {
                rs.left = elem.currentStyle.left;
            }
            style.left = name === "fontSize" ? "1em" : ret;
            ret = style.pixelLeft + "px";

            // Revert the changed values
            style.left = left;
            if ( rsLeft ) {
                rs.left = rsLeft;
            }
        }

        return ret === "" ? "auto" : ret;
    };
}

function setPositiveNumber( elem, value, subtract ) {
    var matches = rnumsplit.exec( value );
    return matches ?
        // Guard against undefined "subtract", e.g., when used as in cssHooks
        Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
        value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
    var i = extra === ( isBorderBox ? "border" : "content" ) ?
        // If we already have the right measurement, avoid augmentation
        4 :
        // Otherwise initialize for horizontal or vertical properties
        name === "width" ? 1 : 0,

        val = 0;

    for ( ; i < 4; i += 2 ) {
        // both box models exclude margin, so add it if we want it
        if ( extra === "margin" ) {
            val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
        }

        if ( isBorderBox ) {
            // border-box includes padding, so remove it if we want content
            if ( extra === "content" ) {
                val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
            }

            // at this point, extra isn't border nor margin, so remove border
            if ( extra !== "margin" ) {
                val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
            }
        } else {
            // at this point, extra isn't content, so add padding
            val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

            // at this point, extra isn't content nor padding, so add border
            if ( extra !== "padding" ) {
                val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
            }
        }
    }

    return val;
}

function getWidthOrHeight( elem, name, extra ) {

    // Start with offset property, which is equivalent to the border-box value
    var valueIsBorderBox = true,
        val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
        styles = getStyles( elem ),
        isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

    // some non-html elements return undefined for offsetWidth, so check for null/undefined
    // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
    // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
    if ( val <= 0 || val == null ) {
        // Fall back to computed then uncomputed css if necessary
        val = curCSS( elem, name, styles );
        if ( val < 0 || val == null ) {
            val = elem.style[ name ];
        }

        // Computed unit is not pixels. Stop here and return.
        if ( rnumnonpx.test(val) ) {
            return val;
        }

        // we need the check for style in case a browser which returns unreliable values
        // for getComputedStyle silently falls back to the reliable elem.style
        valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

        // Normalize "", auto, and prepare for extra
        val = parseFloat( val ) || 0;
    }

    // use the active box-sizing model to add/subtract irrelevant styles
    return ( val +
        augmentWidthOrHeight(
            elem,
            name,
            extra || ( isBorderBox ? "border" : "content" ),
            valueIsBorderBox,
            styles
        )
    ) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
    var doc = document,
        display = elemdisplay[ nodeName ];

    if ( !display ) {
        display = actualDisplay( nodeName, doc );

        // If the simple way fails, read from inside an iframe
        if ( display === "none" || !display ) {
            // Use the already-created iframe if possible
            iframe = ( iframe ||
                jQuery("<iframe frameborder='0' width='0' height='0'/>")
                .css( "cssText", "display:block !important" )
            ).appendTo( doc.documentElement );

            // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
            doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
            doc.write("<!doctype html><html><body>");
            doc.close();

            display = actualDisplay( nodeName, doc );
            iframe.detach();
        }

        // Store the correct default display
        elemdisplay[ nodeName ] = display;
    }

    return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
    var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
        display = jQuery.css( elem[0], "display" );
    elem.remove();
    return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
    jQuery.cssHooks[ name ] = {
        get: function( elem, computed, extra ) {
            if ( computed ) {
                // certain elements can have dimension info if we invisibly show them
                // however, it must have a current display style that would benefit from this
                return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
                    jQuery.swap( elem, cssShow, function() {
                        return getWidthOrHeight( elem, name, extra );
                    }) :
                    getWidthOrHeight( elem, name, extra );
            }
        },

        set: function( elem, value, extra ) {
            var styles = extra && getStyles( elem );
            return setPositiveNumber( elem, value, extra ?
                augmentWidthOrHeight(
                    elem,
                    name,
                    extra,
                    jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
                    styles
                ) : 0
            );
        }
    };
});

if ( !jQuery.support.opacity ) {
    jQuery.cssHooks.opacity = {
        get: function( elem, computed ) {
            // IE uses filters for opacity
            return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
                ( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
                computed ? "1" : "";
        },

        set: function( elem, value ) {
            var style = elem.style,
                currentStyle = elem.currentStyle,
                opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
                filter = currentStyle && currentStyle.filter || style.filter || "";

            // IE has trouble with opacity if it does not have layout
            // Force it by setting the zoom level
            style.zoom = 1;

            // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
            // if value === "", then remove inline opacity #12685
            if ( ( value >= 1 || value === "" ) &&
                    jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
                    style.removeAttribute ) {

                // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
                // if "filter:" is present at all, clearType is disabled, we want to avoid this
                // style.removeAttribute is IE Only, but so apparently is this code path...
                style.removeAttribute( "filter" );

                // if there is no filter style applied in a css rule or unset inline opacity, we are done
                if ( value === "" || currentStyle && !currentStyle.filter ) {
                    return;
                }
            }

            // otherwise, set new filter values
            style.filter = ralpha.test( filter ) ?
                filter.replace( ralpha, opacity ) :
                filter + " " + opacity;
        }
    };
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
    if ( !jQuery.support.reliableMarginRight ) {
        jQuery.cssHooks.marginRight = {
            get: function( elem, computed ) {
                if ( computed ) {
                    // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                    // Work around by temporarily setting element display to inline-block
                    return jQuery.swap( elem, { "display": "inline-block" },
                        curCSS, [ elem, "marginRight" ] );
                }
            }
        };
    }

    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
    // getComputedStyle returns percent when specified for top/left/bottom/right
    // rather than make the css module depend on the offset module, we just check for it here
    if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
        jQuery.each( [ "top", "left" ], function( i, prop ) {
            jQuery.cssHooks[ prop ] = {
                get: function( elem, computed ) {
                    if ( computed ) {
                        computed = curCSS( elem, prop );
                        // if curCSS returns percentage, fallback to offset
                        return rnumnonpx.test( computed ) ?
                            jQuery( elem ).position()[ prop ] + "px" :
                            computed;
                    }
                }
            };
        });
    }

});

if ( jQuery.expr && jQuery.expr.filters ) {
    jQuery.expr.filters.hidden = function( elem ) {
        // Support: Opera <= 12.12
        // Opera reports offsetWidths and offsetHeights less than zero on some elements
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
            (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
    };

    jQuery.expr.filters.visible = function( elem ) {
        return !jQuery.expr.filters.hidden( elem );
    };
}

// These hooks are used by animate to expand properties
jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
}, function( prefix, suffix ) {
    jQuery.cssHooks[ prefix + suffix ] = {
        expand: function( value ) {
            var i = 0,
                expanded = {},

                // assumes a single number if not a string
                parts = typeof value === "string" ? value.split(" ") : [ value ];

            for ( ; i < 4; i++ ) {
                expanded[ prefix + cssExpand[ i ] + suffix ] =
                    parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
            }

            return expanded;
        }
    };

    if ( !rmargin.test( prefix ) ) {
        jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
    }
});
var r20 = /%20/g,
    rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
    serialize: function() {
        return jQuery.param( this.serializeArray() );
    },
    serializeArray: function() {
        return this.map(function(){
            // Can add propHook for "elements" to filter or add form elements
            var elements = jQuery.prop( this, "elements" );
            return elements ? jQuery.makeArray( elements ) : this;
        })
        .filter(function(){
            var type = this.type;
            // Use .is(":disabled") so that fieldset[disabled] works
            return this.name && !jQuery( this ).is( ":disabled" ) &&
                rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
                ( this.checked || !manipulation_rcheckableType.test( type ) );
        })
        .map(function( i, elem ){
            var val = jQuery( this ).val();

            return val == null ?
                null :
                jQuery.isArray( val ) ?
                    jQuery.map( val, function( val ){
                        return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                    }) :
                    { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
        }).get();
    }
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
    var prefix,
        s = [],
        add = function( key, value ) {
            // If value is a function, invoke it and return its value
            value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
            s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
        };

    // Set traditional to true for jQuery <= 1.3.2 behavior.
    if ( traditional === undefined ) {
        traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }

    // If an array was passed in, assume that it is an array of form elements.
    if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
        // Serialize the form elements
        jQuery.each( a, function() {
            add( this.name, this.value );
        });

    } else {
        // If traditional, encode the "old" way (the way 1.3.2 or older
        // did it), otherwise encode params recursively.
        for ( prefix in a ) {
            buildParams( prefix, a[ prefix ], traditional, add );
        }
    }

    // Return the resulting serialization
    return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
    var name;

    if ( jQuery.isArray( obj ) ) {
        // Serialize array item.
        jQuery.each( obj, function( i, v ) {
            if ( traditional || rbracket.test( prefix ) ) {
                // Treat each array item as a scalar.
                add( prefix, v );

            } else {
                // Item is non-scalar (array or object), encode its numeric index.
                buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
            }
        });

    } else if ( !traditional && jQuery.type( obj ) === "object" ) {
        // Serialize object item.
        for ( name in obj ) {
            buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
        }

    } else {
        // Serialize scalar item.
        add( prefix, obj );
    }
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

    // Handle event binding
    jQuery.fn[ name ] = function( data, fn ) {
        return arguments.length > 0 ?
            this.on( name, null, data, fn ) :
            this.trigger( name );
    };
});

jQuery.fn.hover = function( fnOver, fnOut ) {
    return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
};
var
    // Document location
    ajaxLocParts,
    ajaxLocation,
    ajax_nonce = jQuery.now(),

    ajax_rquery = /\?/,
    rhash = /#.*$/,
    rts = /([?&])_=[^&]*/,
    rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
    // #7653, #8125, #8152: local protocol detection
    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,
    rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

    // Keep a copy of the old load method
    _load = jQuery.fn.load,

    /* Prefilters
     * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
     * 2) These are called:
     *    - BEFORE asking for a transport
     *    - AFTER param serialization (s.data is a string if s.processData is true)
     * 3) key is the dataType
     * 4) the catchall symbol "*" can be used
     * 5) execution will start with transport dataType and THEN continue down to "*" if needed
     */
    prefilters = {},

    /* Transports bindings
     * 1) key is the dataType
     * 2) the catchall symbol "*" can be used
     * 3) selection will start with transport dataType and THEN go to "*" if needed
     */
    transports = {},

    // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
    allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
    ajaxLocation = location.href;
} catch( e ) {
    // Use the href attribute of an A element
    // since IE will modify it given document.location
    ajaxLocation = document.createElement( "a" );
    ajaxLocation.href = "";
    ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

    // dataTypeExpression is optional and defaults to "*"
    return function( dataTypeExpression, func ) {

        if ( typeof dataTypeExpression !== "string" ) {
            func = dataTypeExpression;
            dataTypeExpression = "*";
        }

        var dataType,
            i = 0,
            dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

        if ( jQuery.isFunction( func ) ) {
            // For each dataType in the dataTypeExpression
            while ( (dataType = dataTypes[i++]) ) {
                // Prepend if requested
                if ( dataType[0] === "+" ) {
                    dataType = dataType.slice( 1 ) || "*";
                    (structure[ dataType ] = structure[ dataType ] || []).unshift( func );

                // Otherwise append
                } else {
                    (structure[ dataType ] = structure[ dataType ] || []).push( func );
                }
            }
        }
    };
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

    var inspected = {},
        seekingTransport = ( structure === transports );

    function inspect( dataType ) {
        var selected;
        inspected[ dataType ] = true;
        jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
            var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
            if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
                options.dataTypes.unshift( dataTypeOrTransport );
                inspect( dataTypeOrTransport );
                return false;
            } else if ( seekingTransport ) {
                return !( selected = dataTypeOrTransport );
            }
        });
        return selected;
    }

    return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
    var deep, key,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};

    for ( key in src ) {
        if ( src[ key ] !== undefined ) {
            ( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
        }
    }
    if ( deep ) {
        jQuery.extend( true, target, deep );
    }

    return target;
}

jQuery.fn.load = function( url, params, callback ) {
    if ( typeof url !== "string" && _load ) {
        return _load.apply( this, arguments );
    }

    var selector, response, type,
        self = this,
        off = url.indexOf(" ");

    if ( off >= 0 ) {
        selector = url.slice( off, url.length );
        url = url.slice( 0, off );
    }

    // If it's a function
    if ( jQuery.isFunction( params ) ) {

        // We assume that it's the callback
        callback = params;
        params = undefined;

    // Otherwise, build a param string
    } else if ( params && typeof params === "object" ) {
        type = "POST";
    }

    // If we have elements to modify, make the request
    if ( self.length > 0 ) {
        jQuery.ajax({
            url: url,

            // if "type" variable is undefined, then "GET" method will be used
            type: type,
            dataType: "html",
            data: params
        }).done(function( responseText ) {

            // Save response for use in complete callback
            response = arguments;

            self.html( selector ?

                // If a selector was specified, locate the right elements in a dummy div
                // Exclude scripts to avoid IE 'Permission Denied' errors
                jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

                // Otherwise use the full result
                responseText );

        }).complete( callback && function( jqXHR, status ) {
            self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
        });
    }

    return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
    jQuery.fn[ type ] = function( fn ){
        return this.on( type, fn );
    };
});

jQuery.each( [ "get", "post" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
        // shift arguments if data argument was omitted
        if ( jQuery.isFunction( data ) ) {
            type = type || callback;
            callback = data;
            data = undefined;
        }

        return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
        });
    };
});

jQuery.extend({

    // Counter for holding the number of active queries
    active: 0,

    // Last-Modified header cache for next request
    lastModified: {},
    etag: {},

    ajaxSettings: {
        url: ajaxLocation,
        type: "GET",
        isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
        global: true,
        processData: true,
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        /*
        timeout: 0,
        data: null,
        dataType: null,
        username: null,
        password: null,
        cache: null,
        throws: false,
        traditional: false,
        headers: {},
        */

        accepts: {
            "*": allTypes,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript"
        },

        contents: {
            xml: /xml/,
            html: /html/,
            json: /json/
        },

        responseFields: {
            xml: "responseXML",
            text: "responseText"
        },

        // Data converters
        // Keys separate source (or catchall "*") and destination types with a single space
        converters: {

            // Convert anything to text
            "* text": window.String,

            // Text to html (true = no transformation)
            "text html": true,

            // Evaluate text as a json expression
            "text json": jQuery.parseJSON,

            // Parse text as xml
            "text xml": jQuery.parseXML
        },

        // For options that shouldn't be deep extended:
        // you can add your own custom options here if
        // and when you create one that shouldn't be
        // deep extended (see ajaxExtend)
        flatOptions: {
            url: true,
            context: true
        }
    },

    // Creates a full fledged settings object into target
    // with both ajaxSettings and settings fields.
    // If target is omitted, writes into ajaxSettings.
    ajaxSetup: function( target, settings ) {
        return settings ?

            // Building a settings object
            ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

            // Extending ajaxSettings
            ajaxExtend( jQuery.ajaxSettings, target );
    },

    ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
    ajaxTransport: addToPrefiltersOrTransports( transports ),

    // Main method
    ajax: function( url, options ) {

        // If url is an object, simulate pre-1.5 signature
        if ( typeof url === "object" ) {
            options = url;
            url = undefined;
        }

        // Force options to be an object
        options = options || {};

        var // Cross-domain detection vars
            parts,
            // Loop variable
            i,
            // URL without anti-cache param
            cacheURL,
            // Response headers as string
            responseHeadersString,
            // timeout handle
            timeoutTimer,

            // To know if global events are to be dispatched
            fireGlobals,

            transport,
            // Response headers
            responseHeaders,
            // Create the final options object
            s = jQuery.ajaxSetup( {}, options ),
            // Callbacks context
            callbackContext = s.context || s,
            // Context for global events is callbackContext if it is a DOM node or jQuery collection
            globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
                jQuery( callbackContext ) :
                jQuery.event,
            // Deferreds
            deferred = jQuery.Deferred(),
            completeDeferred = jQuery.Callbacks("once memory"),
            // Status-dependent callbacks
            statusCode = s.statusCode || {},
            // Headers (they are sent all at once)
            requestHeaders = {},
            requestHeadersNames = {},
            // The jqXHR state
            state = 0,
            // Default abort message
            strAbort = "canceled",
            // Fake xhr
            jqXHR = {
                readyState: 0,

                // Builds headers hashtable if needed
                getResponseHeader: function( key ) {
                    var match;
                    if ( state === 2 ) {
                        if ( !responseHeaders ) {
                            responseHeaders = {};
                            while ( (match = rheaders.exec( responseHeadersString )) ) {
                                responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
                            }
                        }
                        match = responseHeaders[ key.toLowerCase() ];
                    }
                    return match == null ? null : match;
                },

                // Raw string
                getAllResponseHeaders: function() {
                    return state === 2 ? responseHeadersString : null;
                },

                // Caches the header
                setRequestHeader: function( name, value ) {
                    var lname = name.toLowerCase();
                    if ( !state ) {
                        name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
                        requestHeaders[ name ] = value;
                    }
                    return this;
                },

                // Overrides response content-type header
                overrideMimeType: function( type ) {
                    if ( !state ) {
                        s.mimeType = type;
                    }
                    return this;
                },

                // Status-dependent callbacks
                statusCode: function( map ) {
                    var code;
                    if ( map ) {
                        if ( state < 2 ) {
                            for ( code in map ) {
                                // Lazy-add the new callback in a way that preserves old ones
                                statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
                            }
                        } else {
                            // Execute the appropriate callbacks
                            jqXHR.always( map[ jqXHR.status ] );
                        }
                    }
                    return this;
                },

                // Cancel the request
                abort: function( statusText ) {
                    var finalText = statusText || strAbort;
                    if ( transport ) {
                        transport.abort( finalText );
                    }
                    done( 0, finalText );
                    return this;
                }
            };

        // Attach deferreds
        deferred.promise( jqXHR ).complete = completeDeferred.add;
        jqXHR.success = jqXHR.done;
        jqXHR.error = jqXHR.fail;

        // Remove hash character (#7531: and string promotion)
        // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
        // Handle falsy url in the settings object (#10093: consistency with old signature)
        // We also use the url parameter if available
        s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

        // Alias method option to type as per ticket #12004
        s.type = options.method || options.type || s.method || s.type;

        // Extract dataTypes list
        s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

        // A cross-domain request is in order when we have a protocol:host:port mismatch
        if ( s.crossDomain == null ) {
            parts = rurl.exec( s.url.toLowerCase() );
            s.crossDomain = !!( parts &&
                ( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
                    ( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
                        ( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
            );
        }

        // Convert data if not already a string
        if ( s.data && s.processData && typeof s.data !== "string" ) {
            s.data = jQuery.param( s.data, s.traditional );
        }

        // Apply prefilters
        inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

        // If request was aborted inside a prefilter, stop there
        if ( state === 2 ) {
            return jqXHR;
        }

        // We can fire global events as of now if asked to
        fireGlobals = s.global;

        // Watch for a new set of requests
        if ( fireGlobals && jQuery.active++ === 0 ) {
            jQuery.event.trigger("ajaxStart");
        }

        // Uppercase the type
        s.type = s.type.toUpperCase();

        // Determine if request has content
        s.hasContent = !rnoContent.test( s.type );

        // Save the URL in case we're toying with the If-Modified-Since
        // and/or If-None-Match header later on
        cacheURL = s.url;

        // More options handling for requests with no content
        if ( !s.hasContent ) {

            // If data is available, append data to url
            if ( s.data ) {
                cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
                // #9682: remove data so that it's not used in an eventual retry
                delete s.data;
            }

            // Add anti-cache in url if needed
            if ( s.cache === false ) {
                s.url = rts.test( cacheURL ) ?

                    // If there is already a '_' parameter, set its value
                    cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

                    // Otherwise add one to the end
                    cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
            }
        }

        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
        if ( s.ifModified ) {
            if ( jQuery.lastModified[ cacheURL ] ) {
                jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
            }
            if ( jQuery.etag[ cacheURL ] ) {
                jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
            }
        }

        // Set the correct header, if data is being sent
        if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
            jqXHR.setRequestHeader( "Content-Type", s.contentType );
        }

        // Set the Accepts header for the server, depending on the dataType
        jqXHR.setRequestHeader(
            "Accept",
            s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
                s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
                s.accepts[ "*" ]
        );

        // Check for headers option
        for ( i in s.headers ) {
            jqXHR.setRequestHeader( i, s.headers[ i ] );
        }

        // Allow custom headers/mimetypes and early abort
        if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
            // Abort if not done already and return
            return jqXHR.abort();
        }

        // aborting is no longer a cancellation
        strAbort = "abort";

        // Install callbacks on deferreds
        for ( i in { success: 1, error: 1, complete: 1 } ) {
            jqXHR[ i ]( s[ i ] );
        }

        // Get transport
        transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

        // If no transport, we auto-abort
        if ( !transport ) {
            done( -1, "No Transport" );
        } else {
            jqXHR.readyState = 1;

            // Send global event
            if ( fireGlobals ) {
                globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
            }
            // Timeout
            if ( s.async && s.timeout > 0 ) {
                timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout );
            }

            try {
                state = 1;
                transport.send( requestHeaders, done );
            } catch ( e ) {
                // Propagate exception as error if not done
                if ( state < 2 ) {
                    done( -1, e );
                // Simply rethrow otherwise
                } else {
                    throw e;
                }
            }
        }

        // Callback for when everything is done
        function done( status, nativeStatusText, responses, headers ) {
            var isSuccess, success, error, response, modified,
                statusText = nativeStatusText;

            // Called once
            if ( state === 2 ) {
                return;
            }

            // State is "done" now
            state = 2;

            // Clear timeout if it exists
            if ( timeoutTimer ) {
                clearTimeout( timeoutTimer );
            }

            // Dereference transport for early garbage collection
            // (no matter how long the jqXHR object will be used)
            transport = undefined;

            // Cache response headers
            responseHeadersString = headers || "";

            // Set readyState
            jqXHR.readyState = status > 0 ? 4 : 0;

            // Get response data
            if ( responses ) {
                response = ajaxHandleResponses( s, jqXHR, responses );
            }

            // If successful, handle type chaining
            if ( status >= 200 && status < 300 || status === 304 ) {

                // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                if ( s.ifModified ) {
                    modified = jqXHR.getResponseHeader("Last-Modified");
                    if ( modified ) {
                        jQuery.lastModified[ cacheURL ] = modified;
                    }
                    modified = jqXHR.getResponseHeader("etag");
                    if ( modified ) {
                        jQuery.etag[ cacheURL ] = modified;
                    }
                }

                // if no content
                if ( status === 204 ) {
                    isSuccess = true;
                    statusText = "nocontent";

                // if not modified
                } else if ( status === 304 ) {
                    isSuccess = true;
                    statusText = "notmodified";

                // If we have data, let's convert it
                } else {
                    isSuccess = ajaxConvert( s, response );
                    statusText = isSuccess.state;
                    success = isSuccess.data;
                    error = isSuccess.error;
                    isSuccess = !error;
                }
            } else {
                // We extract error from statusText
                // then normalize statusText and status for non-aborts
                error = statusText;
                if ( status || !statusText ) {
                    statusText = "error";
                    if ( status < 0 ) {
                        status = 0;
                    }
                }
            }

            // Set data for the fake xhr object
            jqXHR.status = status;
            jqXHR.statusText = ( nativeStatusText || statusText ) + "";

            // Success/Error
            if ( isSuccess ) {
                deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
            } else {
                deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
            }

            // Status-dependent callbacks
            jqXHR.statusCode( statusCode );
            statusCode = undefined;

            if ( fireGlobals ) {
                globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
                    [ jqXHR, s, isSuccess ? success : error ] );
            }

            // Complete
            completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

            if ( fireGlobals ) {
                globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
                // Handle the global AJAX counter
                if ( !( --jQuery.active ) ) {
                    jQuery.event.trigger("ajaxStop");
                }
            }
        }

        return jqXHR;
    },

    getScript: function( url, callback ) {
        return jQuery.get( url, undefined, callback, "script" );
    },

    getJSON: function( url, data, callback ) {
        return jQuery.get( url, data, callback, "json" );
    }
});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
    var firstDataType, ct, finalDataType, type,
        contents = s.contents,
        dataTypes = s.dataTypes,
        responseFields = s.responseFields;

    // Fill responseXXX fields
    for ( type in responseFields ) {
        if ( type in responses ) {
            jqXHR[ responseFields[type] ] = responses[ type ];
        }
    }

    // Remove auto dataType and get content-type in the process
    while( dataTypes[ 0 ] === "*" ) {
        dataTypes.shift();
        if ( ct === undefined ) {
            ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
        }
    }

    // Check if we're dealing with a known content-type
    if ( ct ) {
        for ( type in contents ) {
            if ( contents[ type ] && contents[ type ].test( ct ) ) {
                dataTypes.unshift( type );
                break;
            }
        }
    }

    // Check to see if we have a response for the expected dataType
    if ( dataTypes[ 0 ] in responses ) {
        finalDataType = dataTypes[ 0 ];
    } else {
        // Try convertible dataTypes
        for ( type in responses ) {
            if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
                finalDataType = type;
                break;
            }
            if ( !firstDataType ) {
                firstDataType = type;
            }
        }
        // Or just use first one
        finalDataType = finalDataType || firstDataType;
    }

    // If we found a dataType
    // We add the dataType to the list if needed
    // and return the corresponding response
    if ( finalDataType ) {
        if ( finalDataType !== dataTypes[ 0 ] ) {
            dataTypes.unshift( finalDataType );
        }
        return responses[ finalDataType ];
    }
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {
    var conv2, current, conv, tmp,
        converters = {},
        i = 0,
        // Work with a copy of dataTypes in case we need to modify it for conversion
        dataTypes = s.dataTypes.slice(),
        prev = dataTypes[ 0 ];

    // Apply the dataFilter if provided
    if ( s.dataFilter ) {
        response = s.dataFilter( response, s.dataType );
    }

    // Create converters map with lowercased keys
    if ( dataTypes[ 1 ] ) {
        for ( conv in s.converters ) {
            converters[ conv.toLowerCase() ] = s.converters[ conv ];
        }
    }

    // Convert to each sequential dataType, tolerating list modification
    for ( ; (current = dataTypes[++i]); ) {

        // There's only work to do if current dataType is non-auto
        if ( current !== "*" ) {

            // Convert response if prev dataType is non-auto and differs from current
            if ( prev !== "*" && prev !== current ) {

                // Seek a direct converter
                conv = converters[ prev + " " + current ] || converters[ "* " + current ];

                // If none found, seek a pair
                if ( !conv ) {
                    for ( conv2 in converters ) {

                        // If conv2 outputs current
                        tmp = conv2.split(" ");
                        if ( tmp[ 1 ] === current ) {

                            // If prev can be converted to accepted input
                            conv = converters[ prev + " " + tmp[ 0 ] ] ||
                                converters[ "* " + tmp[ 0 ] ];
                            if ( conv ) {
                                // Condense equivalence converters
                                if ( conv === true ) {
                                    conv = converters[ conv2 ];

                                // Otherwise, insert the intermediate dataType
                                } else if ( converters[ conv2 ] !== true ) {
                                    current = tmp[ 0 ];
                                    dataTypes.splice( i--, 0, current );
                                }

                                break;
                            }
                        }
                    }
                }

                // Apply converter (if not an equivalence)
                if ( conv !== true ) {

                    // Unless errors are allowed to bubble, catch and return them
                    if ( conv && s["throws"] ) {
                        response = conv( response );
                    } else {
                        try {
                            response = conv( response );
                        } catch ( e ) {
                            return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
                        }
                    }
                }
            }

            // Update prev for next iteration
            prev = current;
        }
    }

    return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
    accepts: {
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
        script: /(?:java|ecma)script/
    },
    converters: {
        "text script": function( text ) {
            jQuery.globalEval( text );
            return text;
        }
    }
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
    if ( s.cache === undefined ) {
        s.cache = false;
    }
    if ( s.crossDomain ) {
        s.type = "GET";
        s.global = false;
    }
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

    // This transport only deals with cross domain requests
    if ( s.crossDomain ) {

        var script,
            head = document.head || jQuery("head")[0] || document.documentElement;

        return {

            send: function( _, callback ) {

                script = document.createElement("script");

                script.async = true;

                if ( s.scriptCharset ) {
                    script.charset = s.scriptCharset;
                }

                script.src = s.url;

                // Attach handlers for all browsers
                script.onload = script.onreadystatechange = function( _, isAbort ) {

                    if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

                        // Handle memory leak in IE
                        script.onload = script.onreadystatechange = null;

                        // Remove the script
                        if ( script.parentNode ) {
                            script.parentNode.removeChild( script );
                        }

                        // Dereference the script
                        script = null;

                        // Callback if not abort
                        if ( !isAbort ) {
                            callback( 200, "success" );
                        }
                    }
                };

                // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
                // Use native DOM manipulation to avoid our domManip AJAX trickery
                head.insertBefore( script, head.firstChild );
            },

            abort: function() {
                if ( script ) {
                    script.onload( undefined, true );
                }
            }
        };
    }
});
var oldCallbacks = [],
    rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
        var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
        this[ callback ] = true;
        return callback;
    }
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

    var callbackName, overwritten, responseContainer,
        jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
            "url" :
            typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
        );

    // Handle iff the expected data type is "jsonp" or we have a parameter to set
    if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

        // Get callback name, remembering preexisting value associated with it
        callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
            s.jsonpCallback() :
            s.jsonpCallback;

        // Insert callback into url or form data
        if ( jsonProp ) {
            s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
        } else if ( s.jsonp !== false ) {
            s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
        }

        // Use data converter to retrieve json after script execution
        s.converters["script json"] = function() {
            if ( !responseContainer ) {
                jQuery.error( callbackName + " was not called" );
            }
            return responseContainer[ 0 ];
        };

        // force json dataType
        s.dataTypes[ 0 ] = "json";

        // Install callback
        overwritten = window[ callbackName ];
        window[ callbackName ] = function() {
            responseContainer = arguments;
        };

        // Clean-up function (fires after converters)
        jqXHR.always(function() {
            // Restore preexisting value
            window[ callbackName ] = overwritten;

            // Save back as free
            if ( s[ callbackName ] ) {
                // make sure that re-using the options doesn't screw things around
                s.jsonpCallback = originalSettings.jsonpCallback;

                // save the callback name for future use
                oldCallbacks.push( callbackName );
            }

            // Call if it was a function and we have a response
            if ( responseContainer && jQuery.isFunction( overwritten ) ) {
                overwritten( responseContainer[ 0 ] );
            }

            responseContainer = overwritten = undefined;
        });

        // Delegate to script
        return "script";
    }
});
var xhrCallbacks, xhrSupported,
    xhrId = 0,
    // #5280: Internet Explorer will keep connections alive if we don't abort on unload
    xhrOnUnloadAbort = window.ActiveXObject && function() {
        // Abort all pending requests
        var key;
        for ( key in xhrCallbacks ) {
            xhrCallbacks[ key ]( undefined, true );
        }
    };

// Functions to create xhrs
function createStandardXHR() {
    try {
        return new window.XMLHttpRequest();
    } catch( e ) {}
}

function createActiveXHR() {
    try {
        return new window.ActiveXObject("Microsoft.XMLHTTP");
    } catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
    /* Microsoft failed to properly
     * implement the XMLHttpRequest in IE7 (can't request local files),
     * so we use the ActiveXObject when it is available
     * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
     * we need a fallback.
     */
    function() {
        return !this.isLocal && createStandardXHR() || createActiveXHR();
    } :
    // For all other browsers, use the standard XMLHttpRequest object
    createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

    jQuery.ajaxTransport(function( s ) {
        // Cross domain only allowed if supported through XMLHttpRequest
        if ( !s.crossDomain || jQuery.support.cors ) {

            var callback;

            return {
                send: function( headers, complete ) {

                    // Get a new xhr
                    var handle, i,
                        xhr = s.xhr();

                    // Open the socket
                    // Passing null username, generates a login popup on Opera (#2865)
                    if ( s.username ) {
                        xhr.open( s.type, s.url, s.async, s.username, s.password );
                    } else {
                        xhr.open( s.type, s.url, s.async );
                    }

                    // Apply custom fields if provided
                    if ( s.xhrFields ) {
                        for ( i in s.xhrFields ) {
                            xhr[ i ] = s.xhrFields[ i ];
                        }
                    }

                    // Override mime type if needed
                    if ( s.mimeType && xhr.overrideMimeType ) {
                        xhr.overrideMimeType( s.mimeType );
                    }

                    // X-Requested-With header
                    // For cross-domain requests, seeing as conditions for a preflight are
                    // akin to a jigsaw puzzle, we simply never set it to be sure.
                    // (it can always be set on a per-request basis or even using ajaxSetup)
                    // For same-domain requests, won't change header if already provided.
                    if ( !s.crossDomain && !headers["X-Requested-With"] ) {
                        headers["X-Requested-With"] = "XMLHttpRequest";
                    }

                    // Need an extra try/catch for cross domain requests in Firefox 3
                    try {
                        for ( i in headers ) {
                            xhr.setRequestHeader( i, headers[ i ] );
                        }
                    } catch( err ) {}

                    // Do send the request
                    // This may raise an exception which is actually
                    // handled in jQuery.ajax (so no try/catch here)
                    xhr.send( ( s.hasContent && s.data ) || null );

                    // Listener
                    callback = function( _, isAbort ) {
                        var status, responseHeaders, statusText, responses;

                        // Firefox throws exceptions when accessing properties
                        // of an xhr when a network error occurred
                        // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
                        try {

                            // Was never called and is aborted or complete
                            if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

                                // Only called once
                                callback = undefined;

                                // Do not keep as active anymore
                                if ( handle ) {
                                    xhr.onreadystatechange = jQuery.noop;
                                    if ( xhrOnUnloadAbort ) {
                                        delete xhrCallbacks[ handle ];
                                    }
                                }

                                // If it's an abort
                                if ( isAbort ) {
                                    // Abort it manually if needed
                                    if ( xhr.readyState !== 4 ) {
                                        xhr.abort();
                                    }
                                } else {
                                    responses = {};
                                    status = xhr.status;
                                    responseHeaders = xhr.getAllResponseHeaders();

                                    // When requesting binary data, IE6-9 will throw an exception
                                    // on any attempt to access responseText (#11426)
                                    if ( typeof xhr.responseText === "string" ) {
                                        responses.text = xhr.responseText;
                                    }

                                    // Firefox throws an exception when accessing
                                    // statusText for faulty cross-domain requests
                                    try {
                                        statusText = xhr.statusText;
                                    } catch( e ) {
                                        // We normalize with Webkit giving an empty statusText
                                        statusText = "";
                                    }

                                    // Filter status for non standard behaviors

                                    // If the request is local and we have data: assume a success
                                    // (success with no data won't get notified, that's the best we
                                    // can do given current implementations)
                                    if ( !status && s.isLocal && !s.crossDomain ) {
                                        status = responses.text ? 200 : 404;
                                    // IE - #1450: sometimes returns 1223 when it should be 204
                                    } else if ( status === 1223 ) {
                                        status = 204;
                                    }
                                }
                            }
                        } catch( firefoxAccessException ) {
                            if ( !isAbort ) {
                                complete( -1, firefoxAccessException );
                            }
                        }

                        // Call complete if needed
                        if ( responses ) {
                            complete( status, statusText, responses, responseHeaders );
                        }
                    };

                    if ( !s.async ) {
                        // if we're in sync mode we fire the callback
                        callback();
                    } else if ( xhr.readyState === 4 ) {
                        // (IE6 & IE7) if it's in cache and has been
                        // retrieved directly we need to fire the callback
                        setTimeout( callback );
                    } else {
                        handle = ++xhrId;
                        if ( xhrOnUnloadAbort ) {
                            // Create the active xhrs callbacks list if needed
                            // and attach the unload handler
                            if ( !xhrCallbacks ) {
                                xhrCallbacks = {};
                                jQuery( window ).unload( xhrOnUnloadAbort );
                            }
                            // Add to list of active xhrs callbacks
                            xhrCallbacks[ handle ] = callback;
                        }
                        xhr.onreadystatechange = callback;
                    }
                },

                abort: function() {
                    if ( callback ) {
                        callback( undefined, true );
                    }
                }
            };
        }
    });
}
var fxNow, timerId,
    rfxtypes = /^(?:toggle|show|hide)$/,
    rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
    rrun = /queueHooks$/,
    animationPrefilters = [ defaultPrefilter ],
    tweeners = {
        "*": [function( prop, value ) {
            var end, unit,
                tween = this.createTween( prop, value ),
                parts = rfxnum.exec( value ),
                target = tween.cur(),
                start = +target || 0,
                scale = 1,
                maxIterations = 20;

            if ( parts ) {
                end = +parts[2];
                unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

                // We need to compute starting value
                if ( unit !== "px" && start ) {
                    // Iteratively approximate from a nonzero starting point
                    // Prefer the current property, because this process will be trivial if it uses the same units
                    // Fallback to end or a simple constant
                    start = jQuery.css( tween.elem, prop, true ) || end || 1;

                    do {
                        // If previous iteration zeroed out, double until we get *something*
                        // Use a string for doubling factor so we don't accidentally see scale as unchanged below
                        scale = scale || ".5";

                        // Adjust and apply
                        start = start / scale;
                        jQuery.style( tween.elem, prop, start + unit );

                    // Update scale, tolerating zero or NaN from tween.cur()
                    // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
                    } while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
                }

                tween.unit = unit;
                tween.start = start;
                // If a +=/-= token was provided, we're doing a relative animation
                tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
            }
            return tween;
        }]
    };

// Animations created synchronously will run synchronously
function createFxNow() {
    setTimeout(function() {
        fxNow = undefined;
    });
    return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
    jQuery.each( props, function( prop, value ) {
        var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
            index = 0,
            length = collection.length;
        for ( ; index < length; index++ ) {
            if ( collection[ index ].call( animation, prop, value ) ) {

                // we're done with this property
                return;
            }
        }
    });
}

function Animation( elem, properties, options ) {
    var result,
        stopped,
        index = 0,
        length = animationPrefilters.length,
        deferred = jQuery.Deferred().always( function() {
            // don't match elem in the :animated selector
            delete tick.elem;
        }),
        tick = function() {
            if ( stopped ) {
                return false;
            }
            var currentTime = fxNow || createFxNow(),
                remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
                // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
                temp = remaining / animation.duration || 0,
                percent = 1 - temp,
                index = 0,
                length = animation.tweens.length;

            for ( ; index < length ; index++ ) {
                animation.tweens[ index ].run( percent );
            }

            deferred.notifyWith( elem, [ animation, percent, remaining ]);

            if ( percent < 1 && length ) {
                return remaining;
            } else {
                deferred.resolveWith( elem, [ animation ] );
                return false;
            }
        },
        animation = deferred.promise({
            elem: elem,
            props: jQuery.extend( {}, properties ),
            opts: jQuery.extend( true, { specialEasing: {} }, options ),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function( prop, end ) {
                var tween = jQuery.Tween( elem, animation.opts, prop, end,
                        animation.opts.specialEasing[ prop ] || animation.opts.easing );
                animation.tweens.push( tween );
                return tween;
            },
            stop: function( gotoEnd ) {
                var index = 0,
                    // if we are going to the end, we want to run all the tweens
                    // otherwise we skip this part
                    length = gotoEnd ? animation.tweens.length : 0;
                if ( stopped ) {
                    return this;
                }
                stopped = true;
                for ( ; index < length ; index++ ) {
                    animation.tweens[ index ].run( 1 );
                }

                // resolve when we played the last frame
                // otherwise, reject
                if ( gotoEnd ) {
                    deferred.resolveWith( elem, [ animation, gotoEnd ] );
                } else {
                    deferred.rejectWith( elem, [ animation, gotoEnd ] );
                }
                return this;
            }
        }),
        props = animation.props;

    propFilter( props, animation.opts.specialEasing );

    for ( ; index < length ; index++ ) {
        result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
        if ( result ) {
            return result;
        }
    }

    createTweens( animation, props );

    if ( jQuery.isFunction( animation.opts.start ) ) {
        animation.opts.start.call( elem, animation );
    }

    jQuery.fx.timer(
        jQuery.extend( tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })
    );

    // attach callbacks from options
    return animation.progress( animation.opts.progress )
        .done( animation.opts.done, animation.opts.complete )
        .fail( animation.opts.fail )
        .always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
    var value, name, index, easing, hooks;

    // camelCase, specialEasing and expand cssHook pass
    for ( index in props ) {
        name = jQuery.camelCase( index );
        easing = specialEasing[ name ];
        value = props[ index ];
        if ( jQuery.isArray( value ) ) {
            easing = value[ 1 ];
            value = props[ index ] = value[ 0 ];
        }

        if ( index !== name ) {
            props[ name ] = value;
            delete props[ index ];
        }

        hooks = jQuery.cssHooks[ name ];
        if ( hooks && "expand" in hooks ) {
            value = hooks.expand( value );
            delete props[ name ];

            // not quite $.extend, this wont overwrite keys already present.
            // also - reusing 'index' from above because we have the correct "name"
            for ( index in value ) {
                if ( !( index in props ) ) {
                    props[ index ] = value[ index ];
                    specialEasing[ index ] = easing;
                }
            }
        } else {
            specialEasing[ name ] = easing;
        }
    }
}

jQuery.Animation = jQuery.extend( Animation, {

    tweener: function( props, callback ) {
        if ( jQuery.isFunction( props ) ) {
            callback = props;
            props = [ "*" ];
        } else {
            props = props.split(" ");
        }

        var prop,
            index = 0,
            length = props.length;

        for ( ; index < length ; index++ ) {
            prop = props[ index ];
            tweeners[ prop ] = tweeners[ prop ] || [];
            tweeners[ prop ].unshift( callback );
        }
    },

    prefilter: function( callback, prepend ) {
        if ( prepend ) {
            animationPrefilters.unshift( callback );
        } else {
            animationPrefilters.push( callback );
        }
    }
});

function defaultPrefilter( elem, props, opts ) {
    /*jshint validthis:true */
    var prop, index, length,
        value, dataShow, toggle,
        tween, hooks, oldfire,
        anim = this,
        style = elem.style,
        orig = {},
        handled = [],
        hidden = elem.nodeType && isHidden( elem );

    // handle queue: false promises
    if ( !opts.queue ) {
        hooks = jQuery._queueHooks( elem, "fx" );
        if ( hooks.unqueued == null ) {
            hooks.unqueued = 0;
            oldfire = hooks.empty.fire;
            hooks.empty.fire = function() {
                if ( !hooks.unqueued ) {
                    oldfire();
                }
            };
        }
        hooks.unqueued++;

        anim.always(function() {
            // doing this makes sure that the complete handler will be called
            // before this completes
            anim.always(function() {
                hooks.unqueued--;
                if ( !jQuery.queue( elem, "fx" ).length ) {
                    hooks.empty.fire();
                }
            });
        });
    }

    // height/width overflow pass
    if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
        // Make sure that nothing sneaks out
        // Record all 3 overflow attributes because IE does not
        // change the overflow attribute when overflowX and
        // overflowY are set to the same value
        opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

        // Set display property to inline-block for height/width
        // animations on inline elements that are having width/height animated
        if ( jQuery.css( elem, "display" ) === "inline" &&
                jQuery.css( elem, "float" ) === "none" ) {

            // inline-level elements accept inline-block;
            // block-level elements need to be inline with layout
            if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
                style.display = "inline-block";

            } else {
                style.zoom = 1;
            }
        }
    }

    if ( opts.overflow ) {
        style.overflow = "hidden";
        if ( !jQuery.support.shrinkWrapBlocks ) {
            anim.always(function() {
                style.overflow = opts.overflow[ 0 ];
                style.overflowX = opts.overflow[ 1 ];
                style.overflowY = opts.overflow[ 2 ];
            });
        }
    }


    // show/hide pass
    for ( index in props ) {
        value = props[ index ];
        if ( rfxtypes.exec( value ) ) {
            delete props[ index ];
            toggle = toggle || value === "toggle";
            if ( value === ( hidden ? "hide" : "show" ) ) {
                continue;
            }
            handled.push( index );
        }
    }

    length = handled.length;
    if ( length ) {
        dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
        if ( "hidden" in dataShow ) {
            hidden = dataShow.hidden;
        }

        // store state if its toggle - enables .stop().toggle() to "reverse"
        if ( toggle ) {
            dataShow.hidden = !hidden;
        }
        if ( hidden ) {
            jQuery( elem ).show();
        } else {
            anim.done(function() {
                jQuery( elem ).hide();
            });
        }
        anim.done(function() {
            var prop;
            jQuery._removeData( elem, "fxshow" );
            for ( prop in orig ) {
                jQuery.style( elem, prop, orig[ prop ] );
            }
        });
        for ( index = 0 ; index < length ; index++ ) {
            prop = handled[ index ];
            tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
            orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

            if ( !( prop in dataShow ) ) {
                dataShow[ prop ] = tween.start;
                if ( hidden ) {
                    tween.end = tween.start;
                    tween.start = prop === "width" || prop === "height" ? 1 : 0;
                }
            }
        }
    }
}

function Tween( elem, options, prop, end, easing ) {
    return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
    constructor: Tween,
    init: function( elem, options, prop, end, easing, unit ) {
        this.elem = elem;
        this.prop = prop;
        this.easing = easing || "swing";
        this.options = options;
        this.start = this.now = this.cur();
        this.end = end;
        this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
    },
    cur: function() {
        var hooks = Tween.propHooks[ this.prop ];

        return hooks && hooks.get ?
            hooks.get( this ) :
            Tween.propHooks._default.get( this );
    },
    run: function( percent ) {
        var eased,
            hooks = Tween.propHooks[ this.prop ];

        if ( this.options.duration ) {
            this.pos = eased = jQuery.easing[ this.easing ](
                percent, this.options.duration * percent, 0, 1, this.options.duration
            );
        } else {
            this.pos = eased = percent;
        }
        this.now = ( this.end - this.start ) * eased + this.start;

        if ( this.options.step ) {
            this.options.step.call( this.elem, this.now, this );
        }

        if ( hooks && hooks.set ) {
            hooks.set( this );
        } else {
            Tween.propHooks._default.set( this );
        }
        return this;
    }
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
    _default: {
        get: function( tween ) {
            var result;

            if ( tween.elem[ tween.prop ] != null &&
                (!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
                return tween.elem[ tween.prop ];
            }

            // passing an empty string as a 3rd parameter to .css will automatically
            // attempt a parseFloat and fallback to a string if the parse fails
            // so, simple values such as "10px" are parsed to Float.
            // complex values such as "rotate(1rad)" are returned as is.
            result = jQuery.css( tween.elem, tween.prop, "" );
            // Empty strings, null, undefined and "auto" are converted to 0.
            return !result || result === "auto" ? 0 : result;
        },
        set: function( tween ) {
            // use step hook for back compat - use cssHook if its there - use .style if its
            // available and use plain properties where available
            if ( jQuery.fx.step[ tween.prop ] ) {
                jQuery.fx.step[ tween.prop ]( tween );
            } else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
                jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
            } else {
                tween.elem[ tween.prop ] = tween.now;
            }
        }
    }
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function( tween ) {
        if ( tween.elem.nodeType && tween.elem.parentNode ) {
            tween.elem[ tween.prop ] = tween.now;
        }
    }
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
    var cssFn = jQuery.fn[ name ];
    jQuery.fn[ name ] = function( speed, easing, callback ) {
        return speed == null || typeof speed === "boolean" ?
            cssFn.apply( this, arguments ) :
            this.animate( genFx( name, true ), speed, easing, callback );
    };
});

jQuery.fn.extend({
    fadeTo: function( speed, to, easing, callback ) {

        // show any hidden elements after setting opacity to 0
        return this.filter( isHidden ).css( "opacity", 0 ).show()

            // animate to the value specified
            .end().animate({ opacity: to }, speed, easing, callback );
    },
    animate: function( prop, speed, easing, callback ) {
        var empty = jQuery.isEmptyObject( prop ),
            optall = jQuery.speed( speed, easing, callback ),
            doAnimation = function() {
                // Operate on a copy of prop so per-property easing won't be lost
                var anim = Animation( this, jQuery.extend( {}, prop ), optall );
                doAnimation.finish = function() {
                    anim.stop( true );
                };
                // Empty animations, or finishing resolves immediately
                if ( empty || jQuery._data( this, "finish" ) ) {
                    anim.stop( true );
                }
            };
            doAnimation.finish = doAnimation;

        return empty || optall.queue === false ?
            this.each( doAnimation ) :
            this.queue( optall.queue, doAnimation );
    },
    stop: function( type, clearQueue, gotoEnd ) {
        var stopQueue = function( hooks ) {
            var stop = hooks.stop;
            delete hooks.stop;
            stop( gotoEnd );
        };

        if ( typeof type !== "string" ) {
            gotoEnd = clearQueue;
            clearQueue = type;
            type = undefined;
        }
        if ( clearQueue && type !== false ) {
            this.queue( type || "fx", [] );
        }

        return this.each(function() {
            var dequeue = true,
                index = type != null && type + "queueHooks",
                timers = jQuery.timers,
                data = jQuery._data( this );

            if ( index ) {
                if ( data[ index ] && data[ index ].stop ) {
                    stopQueue( data[ index ] );
                }
            } else {
                for ( index in data ) {
                    if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
                        stopQueue( data[ index ] );
                    }
                }
            }

            for ( index = timers.length; index--; ) {
                if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
                    timers[ index ].anim.stop( gotoEnd );
                    dequeue = false;
                    timers.splice( index, 1 );
                }
            }

            // start the next in the queue if the last step wasn't forced
            // timers currently will call their complete callbacks, which will dequeue
            // but only if they were gotoEnd
            if ( dequeue || !gotoEnd ) {
                jQuery.dequeue( this, type );
            }
        });
    },
    finish: function( type ) {
        if ( type !== false ) {
            type = type || "fx";
        }
        return this.each(function() {
            var index,
                data = jQuery._data( this ),
                queue = data[ type + "queue" ],
                hooks = data[ type + "queueHooks" ],
                timers = jQuery.timers,
                length = queue ? queue.length : 0;

            // enable finishing flag on private data
            data.finish = true;

            // empty the queue first
            jQuery.queue( this, type, [] );

            if ( hooks && hooks.cur && hooks.cur.finish ) {
                hooks.cur.finish.call( this );
            }

            // look for any active animations, and finish them
            for ( index = timers.length; index--; ) {
                if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
                    timers[ index ].anim.stop( true );
                    timers.splice( index, 1 );
                }
            }

            // look for any animations in the old queue and finish them
            for ( index = 0; index < length; index++ ) {
                if ( queue[ index ] && queue[ index ].finish ) {
                    queue[ index ].finish.call( this );
                }
            }

            // turn off finishing flag
            delete data.finish;
        });
    }
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
    var which,
        attrs = { height: type },
        i = 0;

    // if we include width, step value is 1 to do all cssExpand values,
    // if we don't include width, step value is 2 to skip over Left and Right
    includeWidth = includeWidth? 1 : 0;
    for( ; i < 4 ; i += 2 - includeWidth ) {
        which = cssExpand[ i ];
        attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
    }

    if ( includeWidth ) {
        attrs.opacity = attrs.width = type;
    }

    return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: { opacity: "show" },
    fadeOut: { opacity: "hide" },
    fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
    jQuery.fn[ name ] = function( speed, easing, callback ) {
        return this.animate( props, speed, easing, callback );
    };
});

jQuery.speed = function( speed, easing, fn ) {
    var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
        complete: fn || !fn && easing ||
            jQuery.isFunction( speed ) && speed,
        duration: speed,
        easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
    };

    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
        opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

    // normalize opt.queue - true/undefined/null -> "fx"
    if ( opt.queue == null || opt.queue === true ) {
        opt.queue = "fx";
    }

    // Queueing
    opt.old = opt.complete;

    opt.complete = function() {
        if ( jQuery.isFunction( opt.old ) ) {
            opt.old.call( this );
        }

        if ( opt.queue ) {
            jQuery.dequeue( this, opt.queue );
        }
    };

    return opt;
};

jQuery.easing = {
    linear: function( p ) {
        return p;
    },
    swing: function( p ) {
        return 0.5 - Math.cos( p*Math.PI ) / 2;
    }
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
    var timer,
        timers = jQuery.timers,
        i = 0;

    fxNow = jQuery.now();

    for ( ; i < timers.length; i++ ) {
        timer = timers[ i ];
        // Checks the timer has not already been removed
        if ( !timer() && timers[ i ] === timer ) {
            timers.splice( i--, 1 );
        }
    }

    if ( !timers.length ) {
        jQuery.fx.stop();
    }
    fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
    if ( timer() && jQuery.timers.push( timer ) ) {
        jQuery.fx.start();
    }
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
    if ( !timerId ) {
        timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
    }
};

jQuery.fx.stop = function() {
    clearInterval( timerId );
    timerId = null;
};

jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    // Default speed
    _default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
    jQuery.expr.filters.animated = function( elem ) {
        return jQuery.grep(jQuery.timers, function( fn ) {
            return elem === fn.elem;
        }).length;
    };
}
jQuery.fn.offset = function( options ) {
    if ( arguments.length ) {
        return options === undefined ?
            this :
            this.each(function( i ) {
                jQuery.offset.setOffset( this, options, i );
            });
    }

    var docElem, win,
        box = { top: 0, left: 0 },
        elem = this[ 0 ],
        doc = elem && elem.ownerDocument;

    if ( !doc ) {
        return;
    }

    docElem = doc.documentElement;

    // Make sure it's not a disconnected DOM node
    if ( !jQuery.contains( docElem, elem ) ) {
        return box;
    }

    // If we don't have gBCR, just use 0,0 rather than error
    // BlackBerry 5, iOS 3 (original iPhone)
    if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
        box = elem.getBoundingClientRect();
    }
    win = getWindow( doc );
    return {
        top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
        left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
    };
};

jQuery.offset = {

    setOffset: function( elem, options, i ) {
        var position = jQuery.css( elem, "position" );

        // set position first, in-case top/left are set even on static elem
        if ( position === "static" ) {
            elem.style.position = "relative";
        }

        var curElem = jQuery( elem ),
            curOffset = curElem.offset(),
            curCSSTop = jQuery.css( elem, "top" ),
            curCSSLeft = jQuery.css( elem, "left" ),
            calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
            props = {}, curPosition = {}, curTop, curLeft;

        // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
        if ( calculatePosition ) {
            curPosition = curElem.position();
            curTop = curPosition.top;
            curLeft = curPosition.left;
        } else {
            curTop = parseFloat( curCSSTop ) || 0;
            curLeft = parseFloat( curCSSLeft ) || 0;
        }

        if ( jQuery.isFunction( options ) ) {
            options = options.call( elem, i, curOffset );
        }

        if ( options.top != null ) {
            props.top = ( options.top - curOffset.top ) + curTop;
        }
        if ( options.left != null ) {
            props.left = ( options.left - curOffset.left ) + curLeft;
        }

        if ( "using" in options ) {
            options.using.call( elem, props );
        } else {
            curElem.css( props );
        }
    }
};


jQuery.fn.extend({

    position: function() {
        if ( !this[ 0 ] ) {
            return;
        }

        var offsetParent, offset,
            parentOffset = { top: 0, left: 0 },
            elem = this[ 0 ];

        // fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
        if ( jQuery.css( elem, "position" ) === "fixed" ) {
            // we assume that getBoundingClientRect is available when computed position is fixed
            offset = elem.getBoundingClientRect();
        } else {
            // Get *real* offsetParent
            offsetParent = this.offsetParent();

            // Get correct offsets
            offset = this.offset();
            if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
                parentOffset = offsetParent.offset();
            }

            // Add offsetParent borders
            parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
            parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
        }

        // Subtract parent offsets and element margins
        // note: when an element has margin: auto the offsetLeft and marginLeft
        // are the same in Safari causing offset.left to incorrectly be 0
        return {
            top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
            left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
        };
    },

    offsetParent: function() {
        return this.map(function() {
            var offsetParent = this.offsetParent || document.documentElement;
            while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
                offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || document.documentElement;
        });
    }
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
    var top = /Y/.test( prop );

    jQuery.fn[ method ] = function( val ) {
        return jQuery.access( this, function( elem, method, val ) {
            var win = getWindow( elem );

            if ( val === undefined ) {
                return win ? (prop in win) ? win[ prop ] :
                    win.document.documentElement[ method ] :
                    elem[ method ];
            }

            if ( win ) {
                win.scrollTo(
                    !top ? val : jQuery( win ).scrollLeft(),
                    top ? val : jQuery( win ).scrollTop()
                );

            } else {
                elem[ method ] = val;
            }
        }, method, val, arguments.length, null );
    };
});

function getWindow( elem ) {
    return jQuery.isWindow( elem ) ?
        elem :
        elem.nodeType === 9 ?
            elem.defaultView || elem.parentWindow :
            false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
    jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
        // margin is only for outerHeight, outerWidth
        jQuery.fn[ funcName ] = function( margin, value ) {
            var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
                extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

            return jQuery.access( this, function( elem, type, value ) {
                var doc;

                if ( jQuery.isWindow( elem ) ) {
                    // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
                    // isn't a whole lot we can do. See pull request at this URL for discussion:
                    // https://github.com/jquery/jquery/pull/764
                    return elem.document.documentElement[ "client" + name ];
                }

                // Get document width or height
                if ( elem.nodeType === 9 ) {
                    doc = elem.documentElement;

                    // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
                    // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
                    return Math.max(
                        elem.body[ "scroll" + name ], doc[ "scroll" + name ],
                        elem.body[ "offset" + name ], doc[ "offset" + name ],
                        doc[ "client" + name ]
                    );
                }

                return value === undefined ?
                    // Get width or height on the element, requesting but not forcing parseFloat
                    jQuery.css( elem, type, extra ) :

                    // Set width or height on the element
                    jQuery.style( elem, type, value, extra );
            }, type, chainable ? margin : undefined, chainable, null );
        };
    });
});
// Limit scope pollution from any deprecated API
// (function() {

// })();
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
    define( "jquery", [], function () { return jQuery; } );
}

})( window );
/*!
 * pickadate.js v3.1.2, 2013/07/06
 * By Amsul, http://amsul.ca
 * Hosted on http://amsul.github.io/pickadate.js
 * Licensed under MIT
 */
window.Picker=function(e,t,n){function r(i,o,a,s){function c(){return r._.node("div",r._.node("div",r._.node("div",r._.node("div",f.component.nodes(u.open),m.box),m.wrap),m.frame),m.holder)}function l(e){e.stopPropagation(),"focus"==e.type&&f.$root.addClass(m.focused),f.open()}if(!i)return r;var u={id:Math.abs(~~(1e9*Math.random()))},d=a?e.extend(!0,{},a.defaults,s):s||{},m=e.extend({},r.klasses(),d.klass),p=e(i),h=function(){return this.start()},f=h.prototype={constructor:h,$node:p,start:function(){return u&&u.start?f:(u.methods={},u.start=!0,u.open=!1,u.type=i.type,i.autofocus=i==document.activeElement,i.type="text",i.readOnly=!0,f.component=new a(f,d),f.$root=e(r._.node("div",c(),m.picker)).on({focusin:function(e){f.$root.removeClass(m.focused),e.stopPropagation()},mousedown:function(e){e.target!=f.$root.children()[0]&&e.stopPropagation()},click:function(t){var n=t.target,o=n.attributes.length?e(n):e(n).closest("[data-pick]"),a=o.data();n!=f.$root.children()[0]&&(t.stopPropagation(),f.$root.find(document.activeElement).length||i.focus(),a.nav&&!o.hasClass(m.navDisabled)?f.set("highlight",f.component.item.highlight,{nav:a.nav}):r._.isInteger(a.pick)&&!o.hasClass(m.disabled)?f.set("select",a.pick).close(!0):a.clear&&f.clear().close(!0))}}),f._hidden=d.formatSubmit?e("<input type=hidden name="+i.name+(d.hiddenSuffix||"_submit")+(p.data("value")?' value="'+r._.trigger(f.component.formats.toString,f.component,[d.formatSubmit,f.component.item.select])+'"':"")+">")[0]:n,p.addClass(m.input).on("focus.P"+u.id+" click.P"+u.id,l).on("change.P"+u.id,function(){f._hidden&&(f._hidden.value=i.value?r._.trigger(f.component.formats.toString,f.component,[d.formatSubmit,f.component.item.select]):"")}).on("keydown.P"+u.id,function(e){var t=e.keyCode,r=/^(8|46)$/.test(t);return 27==t?(f.close(),!1):((32==t||r||!u.open&&f.component.key[t])&&(e.preventDefault(),e.stopPropagation(),r?f.clear().close():f.open()),n)}).val(p.data("value")?r._.trigger(f.component.formats.toString,f.component,[d.format,f.component.item.select]):i.value).after(f.$root,f._hidden).data(o,f),f.on({start:f.component.onStart,render:f.component.onRender,stop:f.component.onStop,open:f.component.onOpen,close:f.component.onClose,set:f.component.onSet}).on({start:d.onStart,render:d.onRender,stop:d.onStop,open:d.onOpen,close:d.onClose,set:d.onSet}),i.autofocus&&f.open(),f.trigger("start").trigger("render"))},render:function(){return f.$root.html(c()),f.trigger("render")},stop:function(){return u.start?(f.close(),f._hidden&&f._hidden.parentNode.removeChild(f._hidden),f.$root.remove(),p.removeClass(m.input).off(".P"+u.id).removeData(o),i.type=u.type,i.readOnly=!1,f.trigger("stop"),u.methods={},u.start=!1,f):f},open:function(e){return u.open?f:(p.addClass(m.active),f.$root.addClass(m.opened),e!==!1&&(u.open=!0,p.focus(),t.on("click.P"+u.id+" focusin.P"+u.id,function(e){e.target!=i&&e.target!=document&&f.close()}).on("keydown.P"+u.id,function(e){var t=e.keyCode,n=f.component.key[t],o=e.target;27==t?f.close(!0):o!=i||!n&&13!=t?f.$root.find(o).length&&13==t&&(e.preventDefault(),o.click()):(e.preventDefault(),n?r._.trigger(f.component.key.go,f,[n]):f.$root.find("."+m.highlighted).hasClass(m.disabled)||f.set("select",f.component.item.highlight).close())})),f.trigger("open"))},close:function(e){return e&&(p.off("focus.P"+u.id).focus(),setTimeout(function(){p.on("focus.P"+u.id,l)},0)),p.removeClass(m.active),f.$root.removeClass(m.opened+" "+m.focused),u.open&&(u.open=!1,t.off(".P"+u.id)),f.trigger("close")},clear:function(){return f.set("clear")},set:function(e,t,n){var i,o,a=r._.isObject(e),s=a?e:{};if(e){a||(s[e]=t);for(i in s)o=s[i],f.component.item[i]&&f.component.set(i,o,n||{}),("select"==i||"clear"==i)&&p.val("clear"==i?"":r._.trigger(f.component.formats.toString,f.component,[d.format,f.component.get(i)])).trigger("change");f.render()}return f.trigger("set",s)},get:function(e,t){return e=e||"value",null!=u[e]?u[e]:"value"==e?i.value:f.component.item[e]?"string"==typeof t?r._.trigger(f.component.formats.toString,f.component,[t,f.component.get(e)]):f.component.get(e):n},on:function(e,t){var n,i,o=r._.isObject(e),a=o?e:{};if(e){o||(a[e]=t);for(n in a)i=a[n],u.methods[n]=u.methods[n]||[],u.methods[n].push(i)}return f},trigger:function(e,t){var n=u.methods[e];return n&&n.map(function(e){r._.trigger(e,f,[t])}),f}};return new h}return r.klasses=function(e){return e=e||"picker",{picker:e,opened:e+"--opened",focused:e+"--focused",input:e+"__input",active:e+"__input--active",holder:e+"__holder",frame:e+"__frame",wrap:e+"__wrap",box:e+"__box"}},r._={group:function(e){for(var t,n="",i=r._.trigger(e.min,e);r._.trigger(e.max,e,[i])>=i;i+=e.i)t=r._.trigger(e.item,e,[i]),n+=r._.node(e.node,t[0],t[1],t[2]);return n},node:function(e,t,n,r){return t?(t=Array.isArray(t)?t.join(""):t,n=n?' class="'+n+'"':"",r=r?" "+r:"","<"+e+n+r+">"+t+"</"+e+">"):""},lead:function(e){return(10>e?"0":"")+e},trigger:function(e,t,n){return"function"==typeof e?e.apply(t,n||[]):e},digits:function(e){return/\d/.test(e[1])?2:1},isObject:function(e){return{}.toString.call(e).indexOf("Object")>-1},isDate:function(e){return{}.toString.call(e).indexOf("Date")>-1&&this.isInteger(e.getDate())},isInteger:function(e){return{}.toString.call(e).indexOf("Number")>-1&&0===e%1}},r.extend=function(t,n){e.fn[t]=function(i,o){var a=this.data(t);return"picker"==i?a:a&&"string"==typeof i?(r._.trigger(a[i],a,[o]),this):this.each(function(){var o=e(this);o.data(t)||new r(this,t,n,i)})},e.fn[t].defaults=n.defaults},r}(jQuery,jQuery(document));

/*!
 * Date picker for pickadate.js v3.1.2
 * http://amsul.github.io/pickadate.js/date.htm
 */
(function(){function e(e,t){var r=this,i=e.$node[0].value,n=e.$node.data("value"),a=n||i,o=n?t.formatSubmit:t.format;r.settings=t,r.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"navigate create validate",view:"create validate viewset",disable:"flipItem",enable:"flipItem"},r.item={},r.item.disable=(t.disable||[]).slice(0),r.item.enable=-function(e){return e[0]===!0?e.shift():-1}(r.item.disable),r.set("min",t.min).set("max",t.max).set("now").set("select",a||r.item.now,{format:o,data:function(e){return a&&(e.indexOf("mm")>-1||e.indexOf("m")>-1)}(r.formats.toArray(o))}),r.key={40:7,38:-7,39:1,37:-1,go:function(e){r.set("highlight",[r.item.highlight.year,r.item.highlight.month,r.item.highlight.date+e],{interval:e}),this.render()}},e.on("render",function(){e.$root.find("."+t.klass.selectMonth).on("change",function(){e.set("highlight",[e.get("view").year,this.value,e.get("highlight").date]),e.$root.find("."+t.klass.selectMonth).focus()}),e.$root.find("."+t.klass.selectYear).on("change",function(){e.set("highlight",[this.value,e.get("view").month,e.get("highlight").date]),e.$root.find("."+t.klass.selectYear).focus()})}).on("open",function(){e.$root.find("button, select").attr("disabled",!1)}).on("close",function(){e.$root.find("button, select").attr("disabled",!0)})}var t=7,r=6;e.prototype.set=function(e,t,r){var i=this;return i.item["enable"==e?"disable":"flip"==e?"enable":e]=i.queue[e].split(" ").map(function(n){return t=i[n](e,t,r)}).pop(),"select"==e?i.set("highlight",i.item.select,r):"highlight"==e?i.set("view",i.item.highlight,r):("flip"==e||"min"==e||"max"==e||"disable"==e||"enable"==e)&&i.item.select&&i.item.highlight&&i.set("select",i.item.select,r).set("highlight",i.item.highlight,r),i},e.prototype.get=function(e){return this.item[e]},e.prototype.create=function(e,t,r){var i,n=this;return t=void 0===t?e:t,t==-1/0||1/0==t?i=t:Picker._.isObject(t)&&Picker._.isInteger(t.pick)?t=t.obj:Array.isArray(t)?(t=new Date(t[0],t[1],t[2]),t=Picker._.isDate(t)?t:n.create().obj):t=Picker._.isInteger(t)||Picker._.isDate(t)?n.normalize(new Date(t),r):n.now(e,t,r),{year:i||t.getFullYear(),month:i||t.getMonth(),date:i||t.getDate(),day:i||t.getDay(),obj:i||t,pick:i||t.getTime()}},e.prototype.now=function(e,t,r){return t=new Date,r&&r.rel&&t.setDate(t.getDate()+r.rel),this.normalize(t,r)},e.prototype.navigate=function(e,t,r){if(Picker._.isObject(t)){for(var i=new Date(t.year,t.month+(r&&r.nav?r.nav:0),1),n=i.getFullYear(),a=i.getMonth(),o=t.date;Picker._.isDate(i)&&new Date(n,a,o).getMonth()!==a;)o-=1;t=[n,a,o]}return t},e.prototype.normalize=function(e){return e.setHours(0,0,0,0),e},e.prototype.measure=function(e,t){var r=this;return t?Picker._.isInteger(t)&&(t=r.now(e,t,{rel:t})):t="min"==e?-1/0:1/0,t},e.prototype.viewset=function(e,t){return this.create([t.year,t.month,1])},e.prototype.validate=function(e,t,r){var i,n,a,o,s=this,l=t,c=r&&r.interval?r.interval:1,u=-1===s.item.enable,d=s.item.min,h=s.item.max,m=u&&s.item.disable.filter(function(e){if(Array.isArray(e)){var r=s.create(e).pick;t.pick>r?i=!0:r>t.pick&&(n=!0)}return Picker._.isInteger(e)}).length;if(!r.nav&&(!u&&s.disabled(t)||u&&s.disabled(t)&&(m||i||n)||t.pick<=d.pick||t.pick>=h.pick))for(u&&!m&&(!n&&c>0||!i&&0>c)&&(c*=-1);s.disabled(t)&&(Math.abs(c)>1&&(t.month<l.month||t.month>l.month)&&(t=l,c=Math.abs(c)/c),t.pick<=d.pick?(a=!0,c=1):t.pick>=h.pick&&(o=!0,c=-1),!a||!o);)t=s.create([t.year,t.month,t.date+c]);return t},e.prototype.disabled=function(e){var t=this,r=t.item.disable.filter(function(r){return Picker._.isInteger(r)?e.day===(t.settings.firstDay?r:r-1)%7:Array.isArray(r)?e.pick===t.create(r).pick:void 0}).length;return e.pick<t.item.min.pick||e.pick>t.item.max.pick||-1===t.item.enable?!r:r},e.prototype.parse=function(e,t,r){var i=this,n={};if(!t||Picker._.isInteger(t)||Array.isArray(t)||Picker._.isDate(t)||Picker._.isObject(t)&&Picker._.isInteger(t.pick))return t;if(!r||!r.format)throw"Need a formatting option to parse this..";return i.formats.toArray(r.format).map(function(e){var r=i.formats[e],a=r?Picker._.trigger(r,i,[t,n]):e.replace(/^!/,"").length;r&&(n[e]=t.substr(0,a)),t=t.substr(a)}),[n.yyyy||n.yy,+(n.mm||n.m)-(r.data?1:0),n.dd||n.d]},e.prototype.formats=function(){function e(e,t,r){var i=e.match(/\w+/)[0];return r.mm||r.m||(r.m=t.indexOf(i)),i.length}function t(e){return e.match(/\w+/)[0].length}return{d:function(e,t){return e?Picker._.digits(e):t.date},dd:function(e,t){return e?2:Picker._.lead(t.date)},ddd:function(e,r){return e?t(e):this.settings.weekdaysShort[r.day]},dddd:function(e,r){return e?t(e):this.settings.weekdaysFull[r.day]},m:function(e,t){return e?Picker._.digits(e):t.month+1},mm:function(e,t){return e?2:Picker._.lead(t.month+1)},mmm:function(t,r){var i=this.settings.monthsShort;return t?e(t,i,r):i[r.month]},mmmm:function(t,r){var i=this.settings.monthsFull;return t?e(t,i,r):i[r.month]},yy:function(e,t){return e?2:(""+t.year).slice(2)},yyyy:function(e,t){return e?4:t.year},toArray:function(e){return e.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(e,t){var r=this;return r.formats.toArray(e).map(function(e){return Picker._.trigger(r.formats[e],r,[0,t])||e.replace(/^!/,"")}).join("")}}}(),e.prototype.flipItem=function(e,t){var r=this,i=r.item.disable,n=-1===r.item.enable;return"flip"==t?r.item.enable=n?1:-1:!n&&"enable"==e||n&&"disable"==e?i=r.removeDisabled(i,t):(!n&&"disable"==e||n&&"enable"==e)&&(i=r.addDisabled(i,t)),i},e.prototype.addDisabled=function(e,t){var r=this;return t.map(function(t){r.filterDisabled(e,t).length||e.push(t)}),e},e.prototype.removeDisabled=function(e,t){var r=this;return t.map(function(t){e=r.filterDisabled(e,t,1)}),e},e.prototype.filterDisabled=function(e,t,r){var i=Array.isArray(t);return e.filter(function(e){var n=!i&&t===e||i&&Array.isArray(e)&&""+t==""+e;return r?!n:n})},e.prototype.nodes=function(e){var i=this,n=i.settings,a=i.item.now,o=i.item.select,s=i.item.highlight,l=i.item.view,c=i.item.disable,u=i.item.min,d=i.item.max,h=function(e){return n.firstDay&&e.push(e.shift()),Picker._.node("thead",Picker._.group({min:0,max:t-1,i:1,node:"th",item:function(t){return[e[t],n.klass.weekdays]}}))}((n.showWeekdaysFull?n.weekdaysFull:n.weekdaysShort).slice(0)),m=function(e){return Picker._.node("div"," ",n.klass["nav"+(e?"Next":"Prev")]+(e&&l.year>=d.year&&l.month>=d.month||!e&&l.year<=u.year&&l.month<=u.month?" "+n.klass.navDisabled:""),"data-nav="+(e||-1))},p=function(t){return n.selectMonths?Picker._.node("select",Picker._.group({min:0,max:11,i:1,node:"option",item:function(e){return[t[e],0,"value="+e+(l.month==e?" selected":"")+(l.year==u.year&&u.month>e||l.year==d.year&&e>d.month?" disabled":"")]}}),n.klass.selectMonth,e?"":"disabled"):Picker._.node("div",t[l.month],n.klass.month)},y=function(){var t=l.year,r=n.selectYears===!0?5:~~(n.selectYears/2);if(r){var i=u.year,a=d.year,o=t-r,s=t+r;if(i>o&&(s+=i-o,o=i),s>a){var c=o-i,h=s-a;o-=c>h?h:c,s=a}return Picker._.node("select",Picker._.group({min:o,max:s,i:1,node:"option",item:function(e){return[e,0,"value="+e+(t==e?" selected":"")]}}),n.klass.selectYear,e?"":"disabled")}return Picker._.node("div",t,n.klass.year)};return Picker._.node("div",m()+m(1)+p(n.showMonthsShort?n.monthsShort:n.monthsFull)+y(),n.klass.header)+Picker._.node("table",h+Picker._.node("tbody",Picker._.group({min:0,max:r-1,i:1,node:"tr",item:function(e){var r=n.firstDay&&0===i.create([l.year,l.month,1]).day?-7:0;return[Picker._.group({min:t*e-l.day+r+1,max:function(){return this.min+t-1},i:1,node:"td",item:function(e){return e=i.create([l.year,l.month,e+(n.firstDay?1:0)]),[Picker._.node("div",e.date,function(t){return t.push(l.month==e.month?n.klass.infocus:n.klass.outfocus),a.pick==e.pick&&t.push(n.klass.now),o&&o.pick==e.pick&&t.push(n.klass.selected),s&&s.pick==e.pick&&t.push(n.klass.highlighted),(c&&i.disabled(e)||e.pick<u.pick||e.pick>d.pick)&&t.push(n.klass.disabled),t.join(" ")}([n.klass.day]),"data-pick="+e.pick)]}})]}})),n.klass.table)+Picker._.node("div",Picker._.node("button",n.today,n.klass.buttonToday,"data-pick="+a.pick+(e?"":" disabled"))+Picker._.node("button",n.clear,n.klass.buttonClear,"data-clear=1"+(e?"":" disabled")),n.klass.footer)},e.defaults=function(e){return{monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],today:"Today",clear:"Clear",format:"d mmmm, yyyy",klass:{table:e+"table",header:e+"header",navPrev:e+"nav--prev",navNext:e+"nav--next",navDisabled:e+"nav--disabled",month:e+"month",year:e+"year",selectMonth:e+"select--month",selectYear:e+"select--year",weekdays:e+"weekday",day:e+"day",disabled:e+"day--disabled",selected:e+"day--selected",highlighted:e+"day--highlighted",now:e+"day--today",infocus:e+"day--infocus",outfocus:e+"day--outfocus",footer:e+"footer",buttonClear:e+"button--clear",buttonToday:e+"button--today"}}}(Picker.klasses().picker+"__"),Picker.extend("pickadate",e)})();

/*!
 * Legacy browser support
 */
Array.isArray||(Array.isArray=function(t){return"[object Array]"=={}.toString.call(t)}),[].map||(Array.prototype.map=function(t,r){for(var e=this,n=e.length,i=Array(n),a=0;n>a;a++)a in e&&(i[a]=t.call(r,e[a],a,e));return i}),[].filter||(Array.prototype.filter=function(t){if(null==this)throw new TypeError;var r=Object(this),e=r.length>>>0;if("function"!=typeof t)throw new TypeError;for(var n=[],i=arguments[1],a=0;e>a;a++)if(a in r){var o=r[a];t.call(i,o,a,r)&&n.push(o)}return n}),[].indexOf||(Array.prototype.indexOf=function(t){if(null==this)throw new TypeError;var r=Object(this),e=r.length>>>0;if(0===e)return-1;var n=0;if(arguments.length>1&&(n=Number(arguments[1]),n!=n?n=0:0!==n&&1/0!=n&&n!=-1/0&&(n=(n>0||-1)*Math.floor(Math.abs(n)))),n>=e)return-1;for(var i=n>=0?n:Math.max(e-Math.abs(n),0);e>i;i++)if(i in r&&r[i]===t)return i;return-1});/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * http://blog.stevenlevithan.com/archives/cross-browser-split
 */
var nativeSplit=String.prototype.split,compliantExecNpcg=void 0===/()??/.exec("")[1];String.prototype.split=function(t,r){var e=this;if("[object RegExp]"!==Object.prototype.toString.call(t))return nativeSplit.call(e,t,r);var n,i,a,o,l=[],p=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.extended?"x":"")+(t.sticky?"y":""),c=0;for(t=RegExp(t.source,p+"g"),e+="",compliantExecNpcg||(n=RegExp("^"+t.source+"$(?!\\s)",p)),r=void 0===r?-1>>>0:r>>>0;(i=t.exec(e))&&(a=i.index+i[0].length,!(a>c&&(l.push(e.slice(c,i.index)),!compliantExecNpcg&&i.length>1&&i[0].replace(n,function(){for(var t=1;arguments.length-2>t;t++)void 0===arguments[t]&&(i[t]=void 0)}),i.length>1&&i.index<e.length&&Array.prototype.push.apply(l,i.slice(1)),o=i[0].length,c=a,l.length>=r)));)t.lastIndex===i.index&&t.lastIndex++;return c===e.length?(o||!t.test(""))&&l.push(""):l.push(e.slice(c)),l.length>r?l.slice(0,r):l};
define("pickadate", ["jquery"], function(){});

//     Underscore.js 1.4.4
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);
define("underscore", ["pickadate"], function(){});

//     Backbone.js 0.9.10

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to array methods.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.9.10';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
  Backbone.$ = root.jQuery || root.Zepto || root.ender;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
    } else if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
    } else {
      return true;
    }
  };

  // Optimized internal dispatch function for triggering events. Tries to
  // keep the usual cases speedy (most Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length;
    switch (args.length) {
    case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx);
    return;
    case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0]);
    return;
    case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1]);
    return;
    case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1], args[2]);
    return;
    default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind one or more space separated events, or an events map,
    // to a `callback` function. Passing `"all"` will bind the callback to
    // all events fired.
    on: function(name, callback, context) {
      if (!(eventsApi(this, 'on', name, [callback, context]) && callback)) return this;
      this._events || (this._events = {});
      var list = this._events[name] || (this._events[name] = []);
      list.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind events to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!(eventsApi(this, 'once', name, [callback, context]) && callback)) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      this.on(name, once, context);
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var list, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (list = this._events[name]) {
          events = [];
          if (callback || context) {
            for (j = 0, k = list.length; j < k; j++) {
              ev = list[j];
              if ((callback && callback !== ev.callback &&
                               callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                events.push(ev);
              }
            }
          }
          this._events[name] = events;
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // An inversion-of-control version of `on`. Tell *this* object to listen to
    // an event in another object ... keeping track of what it's listening to.
    listenTo: function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      obj.on(name, typeof name === 'object' ? this : callback, this);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeners = this._listeners;
      if (!listeners) return;
      if (obj) {
        obj.off(name, typeof name === 'object' ? this : callback, this);
        if (!name && !callback) delete listeners[obj._listenerId];
      } else {
        if (typeof name === 'object') callback = this;
        for (var id in listeners) {
          listeners[id].off(name, callback, this);
        }
        this._listeners = {};
      }
      return this;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var defaults;
    var attrs = attributes || {};
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options && options.collection) this.collection = options.collection;
    if (options && options.parse) attrs = this.parse(attrs, options) || {};
    if (defaults = _.result(this, 'defaults')) {
      attrs = _.defaults({}, attrs, defaults);
    }
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // ----------------------------------------------------------------------

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = true;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // ---------------------------------------------------------------------

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      options.success = function(model, resp, options) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, success, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      // If we're not waiting and attributes exist, save acts as `set(attr).save(null, opts)`.
      if (attrs && (!options || !options.wait) && !this.set(attrs, options)) return false;

      options = _.extend({validate: true}, options);

      // Do not persist invalid models.
      if (!this._validate(attrs, options)) return false;

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      success = options.success;
      options.success = function(model, resp, options) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
      };

      // Finish configuring and sending the Ajax request.
      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(model, resp, options) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
      };

      if (this.isNew()) {
        options.success(this, null, options);
        return false;
      }

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return !this.validate || !this.validate(this.attributes, options);
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire a general
    // `"error"` event and call the error callback, if specified.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, options || {});
      return false;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this.models = [];
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      models = _.isArray(models) ? models.slice() : [models];
      options || (options = {});
      var i, l, model, attrs, existing, doSort, add, at, sort, sortAttr;
      add = [];
      at = options.at;
      sort = this.comparator && (at == null) && options.sort != false;
      sortAttr = _.isString(this.comparator) ? this.comparator : null;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        if (!(model = this._prepareModel(attrs = models[i], options))) {
          this.trigger('invalid', this, attrs, options);
          continue;
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(model)) {
          if (options.merge) {
            existing.set(attrs === model ? model.attributes : attrs, options);
            if (sort && !doSort && existing.hasChanged(sortAttr)) doSort = true;
          }
          continue;
        }

        // This is a new model, push it to the `add` list.
        add.push(model);

        // Listen to added models' events, and index models for lookup by
        // `id` and by `cid`.
        model.on('all', this._onModelEvent, this);
        this._byId[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (add.length) {
        if (sort) doSort = true;
        this.length += add.length;
        if (at != null) {
          splice.apply(this.models, [at, 0].concat(add));
        } else {
          push.apply(this.models, add);
        }
      }

      // Silently sort the collection if appropriate.
      if (doSort) this.sort({silent: true});

      if (options.silent) return this;

      // Trigger `add` events.
      for (i = 0, l = add.length; i < l; i++) {
        (model = add[i]).trigger('add', model, this, options);
      }

      // Trigger `sort` if the collection was sorted.
      if (doSort) this.trigger('sort', this, options);

      return this;
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      models = _.isArray(models) ? models.slice() : [models];
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: this.length}, options));
      return model;
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: 0}, options));
      return model;
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function(begin, end) {
      return this.models.slice(begin, end);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      this._idAttr || (this._idAttr = this.model.prototype.idAttribute);
      return this._byId[obj.id || obj.cid || obj[this._idAttr] || obj];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of `filter`.
    where: function(attrs) {
      if (_.isEmpty(attrs)) return [];
      return this.filter(function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) {
        throw new Error('Cannot sort a set without a comparator');
      }
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Smartly update a collection with a change set of models, adding,
    // removing, and merging as necessary.
    update: function(models, options) {
      options = _.extend({add: true, merge: true, remove: true}, options);
      if (options.parse) models = this.parse(models, options);
      var model, i, l, existing;
      var add = [], remove = [], modelMap = {};

      // Allow a single model (or no argument) to be passed.
      if (!_.isArray(models)) models = models ? [models] : [];

      // Proxy to `add` for this case, no need to iterate...
      if (options.add && !options.remove) return this.add(models, options);

      // Determine which models to add and merge, and which to remove.
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i];
        existing = this.get(model);
        if (options.remove && existing) modelMap[existing.cid] = true;
        if ((options.add && !existing) || (options.merge && existing)) {
          add.push(model);
        }
      }
      if (options.remove) {
        for (i = 0, l = this.models.length; i < l; i++) {
          model = this.models[i];
          if (!modelMap[model.cid]) remove.push(model);
        }
      }

      // Remove models (if applicable) before we add and merge the rest.
      if (remove.length) this.remove(remove, options);
      if (add.length) this.add(add, options);
      return this;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.
    reset: function(models, options) {
      options || (options = {});
      if (options.parse) models = this.parse(models, options);
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      options.previousModels = this.models.slice();
      this._reset();
      if (models) this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `update: true` is passed, the response
    // data will be passed through the `update` method instead of `reset`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      options.success = function(collection, resp, options) {
        var method = options.update ? 'update' : 'reset';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp, options) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Reset all internal state. Called when the collection is reset.
    _reset: function() {
      this.length = 0;
      this.models.length = 0;
      this._byId  = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options || (options = {});
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model._validate(attrs, options)) return false;
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference: function(model) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    },

    sortedIndex: function (model, value, context) {
      value || (value = this.comparator);
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _.sortedIndex(this.models, model, iterator, context);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'indexOf', 'shuffle', 'lastIndexOf',
    'isEmpty', 'chain'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        this.trigger('route', name, args);
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional){
                     return optional ? match : '([^\/]+)';
                   })
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        this.location.replace(this.root + this.location.search + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = this.getHash().replace(routeStripper, '');
        this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(this.getHash());
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: options};
      fragment = this.getFragment(fragment || '');
      if (this.fragment === fragment) return;
      this.fragment = fragment;
      var url = this.root + fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Method "' + events[key] + '" does not exist');
        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure: function(options) {
      if (this.options) options = _.extend({}, _.result(this, 'options'), options);
      _.extend(this, _.pick(options, viewOptions));
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    var success = options.success;
    options.success = function(resp) {
      if (success) success(model, resp, options);
      model.trigger('sync', model, resp, options);
    };

    var error = options.error;
    options.error = function(xhr) {
      if (error) error(model, xhr, options);
      model.trigger('error', model, xhr, options);
    };

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);
define("backbone", ["underscore"], function(){});

/*

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/

// lib/handlebars/browser-prefix.js
(function(undefined) {
  var Handlebars = {};

  window.Handlebars = Handlebars;
;
// lib/handlebars/base.js

Handlebars.VERSION = "1.0.0";
Handlebars.COMPILER_REVISION = 4;

Handlebars.REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '>= 1.0.0'
};

Handlebars.helpers  = {};
Handlebars.partials = {};

var toString = Object.prototype.toString,
    functionType = '[object Function]',
    objectType = '[object Object]';

Handlebars.registerHelper = function(name, fn, inverse) {
  if (toString.call(name) === objectType) {
    if (inverse || fn) { throw new Handlebars.Exception('Arg not supported with multiple helpers'); }
    Handlebars.Utils.extend(this.helpers, name);
  } else {
    if (inverse) { fn.not = inverse; }
    this.helpers[name] = fn;
  }
};

Handlebars.registerPartial = function(name, str) {
  if (toString.call(name) === objectType) {
    Handlebars.Utils.extend(this.partials,  name);
  } else {
    this.partials[name] = str;
  }
};

Handlebars.registerHelper('helperMissing', function(arg) {
  if(arguments.length === 2) {
    return undefined;
  } else {
    throw new Error("Missing helper: '" + arg + "'");
  }
});

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  var inverse = options.inverse || function() {}, fn = options.fn;

  var type = toString.call(context);

  if(type === functionType) { context = context.call(this); }

  if(context === true) {
    return fn(this);
  } else if(context === false || context == null) {
    return inverse(this);
  } else if(type === "[object Array]") {
    if(context.length > 0) {
      return Handlebars.helpers.each(context, options);
    } else {
      return inverse(this);
    }
  } else {
    return fn(context);
  }
});

Handlebars.K = function() {};

Handlebars.createFrame = Object.create || function(object) {
  Handlebars.K.prototype = object;
  var obj = new Handlebars.K();
  Handlebars.K.prototype = null;
  return obj;
};

Handlebars.logger = {
  DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3,

  methodMap: {0: 'debug', 1: 'info', 2: 'warn', 3: 'error'},

  // can be overridden in the host environment
  log: function(level, obj) {
    if (Handlebars.logger.level <= level) {
      var method = Handlebars.logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, obj);
      }
    }
  }
};

Handlebars.log = function(level, obj) { Handlebars.logger.log(level, obj); };

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var i = 0, ret = "", data;

  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if (options.data) {
    data = Handlebars.createFrame(options.data);
  }

  if(context && typeof context === 'object') {
    if(context instanceof Array){
      for(var j = context.length; i<j; i++) {
        if (data) { data.index = i; }
        ret = ret + fn(context[i], { data: data });
      }
    } else {
      for(var key in context) {
        if(context.hasOwnProperty(key)) {
          if(data) { data.key = key; }
          ret = ret + fn(context[key], {data: data});
          i++;
        }
      }
    }
  }

  if(i === 0){
    ret = inverse(this);
  }

  return ret;
});

Handlebars.registerHelper('if', function(conditional, options) {
  var type = toString.call(conditional);
  if(type === functionType) { conditional = conditional.call(this); }

  if(!conditional || Handlebars.Utils.isEmpty(conditional)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('unless', function(conditional, options) {
  return Handlebars.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn});
});

Handlebars.registerHelper('with', function(context, options) {
  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if (!Handlebars.Utils.isEmpty(context)) return options.fn(context);
});

Handlebars.registerHelper('log', function(context, options) {
  var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
  Handlebars.log(level, context);
});
;
// lib/handlebars/compiler/parser.js
/* Jison generated parser */
var handlebars = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"program":4,"EOF":5,"simpleInverse":6,"statements":7,"statement":8,"openInverse":9,"closeBlock":10,"openBlock":11,"mustache":12,"partial":13,"CONTENT":14,"COMMENT":15,"OPEN_BLOCK":16,"inMustache":17,"CLOSE":18,"OPEN_INVERSE":19,"OPEN_ENDBLOCK":20,"path":21,"OPEN":22,"OPEN_UNESCAPED":23,"CLOSE_UNESCAPED":24,"OPEN_PARTIAL":25,"partialName":26,"params":27,"hash":28,"dataName":29,"param":30,"STRING":31,"INTEGER":32,"BOOLEAN":33,"hashSegments":34,"hashSegment":35,"ID":36,"EQUALS":37,"DATA":38,"pathSegments":39,"SEP":40,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"CLOSE_UNESCAPED",25:"OPEN_PARTIAL",31:"STRING",32:"INTEGER",33:"BOOLEAN",36:"ID",37:"EQUALS",38:"DATA",40:"SEP"},
productions_: [0,[3,2],[4,2],[4,3],[4,2],[4,1],[4,1],[4,0],[7,1],[7,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,3],[13,4],[6,2],[17,3],[17,2],[17,2],[17,1],[17,1],[27,2],[27,1],[30,1],[30,1],[30,1],[30,1],[30,1],[28,1],[34,2],[34,1],[35,3],[35,3],[35,3],[35,3],[35,3],[26,1],[26,1],[26,1],[29,2],[21,1],[39,3],[39,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2: this.$ = new yy.ProgramNode([], $$[$0]); 
break;
case 3: this.$ = new yy.ProgramNode($$[$0-2], $$[$0]); 
break;
case 4: this.$ = new yy.ProgramNode($$[$0-1], []); 
break;
case 5: this.$ = new yy.ProgramNode($$[$0]); 
break;
case 6: this.$ = new yy.ProgramNode([], []); 
break;
case 7: this.$ = new yy.ProgramNode([]); 
break;
case 8: this.$ = [$$[$0]]; 
break;
case 9: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 10: this.$ = new yy.BlockNode($$[$0-2], $$[$0-1].inverse, $$[$0-1], $$[$0]); 
break;
case 11: this.$ = new yy.BlockNode($$[$0-2], $$[$0-1], $$[$0-1].inverse, $$[$0]); 
break;
case 12: this.$ = $$[$0]; 
break;
case 13: this.$ = $$[$0]; 
break;
case 14: this.$ = new yy.ContentNode($$[$0]); 
break;
case 15: this.$ = new yy.CommentNode($$[$0]); 
break;
case 16: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1]); 
break;
case 17: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1]); 
break;
case 18: this.$ = $$[$0-1]; 
break;
case 19:
    // Parsing out the '&' escape token at this level saves ~500 bytes after min due to the removal of one parser node.
    this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], $$[$0-2][2] === '&');
  
break;
case 20: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], true); 
break;
case 21: this.$ = new yy.PartialNode($$[$0-1]); 
break;
case 22: this.$ = new yy.PartialNode($$[$0-2], $$[$0-1]); 
break;
case 23: 
break;
case 24: this.$ = [[$$[$0-2]].concat($$[$0-1]), $$[$0]]; 
break;
case 25: this.$ = [[$$[$0-1]].concat($$[$0]), null]; 
break;
case 26: this.$ = [[$$[$0-1]], $$[$0]]; 
break;
case 27: this.$ = [[$$[$0]], null]; 
break;
case 28: this.$ = [[$$[$0]], null]; 
break;
case 29: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 30: this.$ = [$$[$0]]; 
break;
case 31: this.$ = $$[$0]; 
break;
case 32: this.$ = new yy.StringNode($$[$0]); 
break;
case 33: this.$ = new yy.IntegerNode($$[$0]); 
break;
case 34: this.$ = new yy.BooleanNode($$[$0]); 
break;
case 35: this.$ = $$[$0]; 
break;
case 36: this.$ = new yy.HashNode($$[$0]); 
break;
case 37: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 38: this.$ = [$$[$0]]; 
break;
case 39: this.$ = [$$[$0-2], $$[$0]]; 
break;
case 40: this.$ = [$$[$0-2], new yy.StringNode($$[$0])]; 
break;
case 41: this.$ = [$$[$0-2], new yy.IntegerNode($$[$0])]; 
break;
case 42: this.$ = [$$[$0-2], new yy.BooleanNode($$[$0])]; 
break;
case 43: this.$ = [$$[$0-2], $$[$0]]; 
break;
case 44: this.$ = new yy.PartialNameNode($$[$0]); 
break;
case 45: this.$ = new yy.PartialNameNode(new yy.StringNode($$[$0])); 
break;
case 46: this.$ = new yy.PartialNameNode(new yy.IntegerNode($$[$0])); 
break;
case 47: this.$ = new yy.DataNode($$[$0]); 
break;
case 48: this.$ = new yy.IdNode($$[$0]); 
break;
case 49: $$[$0-2].push({part: $$[$0], separator: $$[$0-1]}); this.$ = $$[$0-2]; 
break;
case 50: this.$ = [{part: $$[$0]}]; 
break;
}
},
table: [{3:1,4:2,5:[2,7],6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],22:[1,14],23:[1,15],25:[1,16]},{1:[3]},{5:[1,17]},{5:[2,6],7:18,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,6],22:[1,14],23:[1,15],25:[1,16]},{5:[2,5],6:20,8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,5],22:[1,14],23:[1,15],25:[1,16]},{17:23,18:[1,22],21:24,29:25,36:[1,28],38:[1,27],39:26},{5:[2,8],14:[2,8],15:[2,8],16:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],25:[2,8]},{4:29,6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,7],22:[1,14],23:[1,15],25:[1,16]},{4:30,6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,7],22:[1,14],23:[1,15],25:[1,16]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],25:[2,12]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],25:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],25:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],25:[2,15]},{17:31,21:24,29:25,36:[1,28],38:[1,27],39:26},{17:32,21:24,29:25,36:[1,28],38:[1,27],39:26},{17:33,21:24,29:25,36:[1,28],38:[1,27],39:26},{21:35,26:34,31:[1,36],32:[1,37],36:[1,28],39:26},{1:[2,1]},{5:[2,2],8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,2],22:[1,14],23:[1,15],25:[1,16]},{17:23,21:24,29:25,36:[1,28],38:[1,27],39:26},{5:[2,4],7:38,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,4],22:[1,14],23:[1,15],25:[1,16]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],25:[2,9]},{5:[2,23],14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],25:[2,23]},{18:[1,39]},{18:[2,27],21:44,24:[2,27],27:40,28:41,29:48,30:42,31:[1,45],32:[1,46],33:[1,47],34:43,35:49,36:[1,50],38:[1,27],39:26},{18:[2,28],24:[2,28]},{18:[2,48],24:[2,48],31:[2,48],32:[2,48],33:[2,48],36:[2,48],38:[2,48],40:[1,51]},{21:52,36:[1,28],39:26},{18:[2,50],24:[2,50],31:[2,50],32:[2,50],33:[2,50],36:[2,50],38:[2,50],40:[2,50]},{10:53,20:[1,54]},{10:55,20:[1,54]},{18:[1,56]},{18:[1,57]},{24:[1,58]},{18:[1,59],21:60,36:[1,28],39:26},{18:[2,44],36:[2,44]},{18:[2,45],36:[2,45]},{18:[2,46],36:[2,46]},{5:[2,3],8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,3],22:[1,14],23:[1,15],25:[1,16]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],25:[2,17]},{18:[2,25],21:44,24:[2,25],28:61,29:48,30:62,31:[1,45],32:[1,46],33:[1,47],34:43,35:49,36:[1,50],38:[1,27],39:26},{18:[2,26],24:[2,26]},{18:[2,30],24:[2,30],31:[2,30],32:[2,30],33:[2,30],36:[2,30],38:[2,30]},{18:[2,36],24:[2,36],35:63,36:[1,64]},{18:[2,31],24:[2,31],31:[2,31],32:[2,31],33:[2,31],36:[2,31],38:[2,31]},{18:[2,32],24:[2,32],31:[2,32],32:[2,32],33:[2,32],36:[2,32],38:[2,32]},{18:[2,33],24:[2,33],31:[2,33],32:[2,33],33:[2,33],36:[2,33],38:[2,33]},{18:[2,34],24:[2,34],31:[2,34],32:[2,34],33:[2,34],36:[2,34],38:[2,34]},{18:[2,35],24:[2,35],31:[2,35],32:[2,35],33:[2,35],36:[2,35],38:[2,35]},{18:[2,38],24:[2,38],36:[2,38]},{18:[2,50],24:[2,50],31:[2,50],32:[2,50],33:[2,50],36:[2,50],37:[1,65],38:[2,50],40:[2,50]},{36:[1,66]},{18:[2,47],24:[2,47],31:[2,47],32:[2,47],33:[2,47],36:[2,47],38:[2,47]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],25:[2,10]},{21:67,36:[1,28],39:26},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],25:[2,11]},{14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],25:[2,16]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],25:[2,19]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],25:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],25:[2,21]},{18:[1,68]},{18:[2,24],24:[2,24]},{18:[2,29],24:[2,29],31:[2,29],32:[2,29],33:[2,29],36:[2,29],38:[2,29]},{18:[2,37],24:[2,37],36:[2,37]},{37:[1,65]},{21:69,29:73,31:[1,70],32:[1,71],33:[1,72],36:[1,28],38:[1,27],39:26},{18:[2,49],24:[2,49],31:[2,49],32:[2,49],33:[2,49],36:[2,49],38:[2,49],40:[2,49]},{18:[1,74]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],25:[2,22]},{18:[2,39],24:[2,39],36:[2,39]},{18:[2,40],24:[2,40],36:[2,40]},{18:[2,41],24:[2,41],36:[2,41]},{18:[2,42],24:[2,42],36:[2,42]},{18:[2,43],24:[2,43],36:[2,43]},{5:[2,18],14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],25:[2,18]}],
defaultActions: {17:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0: yy_.yytext = "\\"; return 14; 
break;
case 1:
                                   if(yy_.yytext.slice(-1) !== "\\") this.begin("mu");
                                   if(yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0,yy_.yyleng-1), this.begin("emu");
                                   if(yy_.yytext) return 14;
                                 
break;
case 2: return 14; 
break;
case 3:
                                   if(yy_.yytext.slice(-1) !== "\\") this.popState();
                                   if(yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0,yy_.yyleng-1);
                                   return 14;
                                 
break;
case 4: yy_.yytext = yy_.yytext.substr(0, yy_.yyleng-4); this.popState(); return 15; 
break;
case 5: return 25; 
break;
case 6: return 16; 
break;
case 7: return 20; 
break;
case 8: return 19; 
break;
case 9: return 19; 
break;
case 10: return 23; 
break;
case 11: return 22; 
break;
case 12: this.popState(); this.begin('com'); 
break;
case 13: yy_.yytext = yy_.yytext.substr(3,yy_.yyleng-5); this.popState(); return 15; 
break;
case 14: return 22; 
break;
case 15: return 37; 
break;
case 16: return 36; 
break;
case 17: return 36; 
break;
case 18: return 40; 
break;
case 19: /*ignore whitespace*/ 
break;
case 20: this.popState(); return 24; 
break;
case 21: this.popState(); return 18; 
break;
case 22: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\"/g,'"'); return 31; 
break;
case 23: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\'/g,"'"); return 31; 
break;
case 24: return 38; 
break;
case 25: return 33; 
break;
case 26: return 33; 
break;
case 27: return 32; 
break;
case 28: return 36; 
break;
case 29: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2); return 36; 
break;
case 30: return 'INVALID'; 
break;
case 31: return 5; 
break;
}
};
lexer.rules = [/^(?:\\\\(?=(\{\{)))/,/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\{\{>)/,/^(?:\{\{#)/,/^(?:\{\{\/)/,/^(?:\{\{\^)/,/^(?:\{\{\s*else\b)/,/^(?:\{\{\{)/,/^(?:\{\{&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{)/,/^(?:=)/,/^(?:\.(?=[}\/ ]))/,/^(?:\.\.)/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}\}\})/,/^(?:\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=[}\s]))/,/^(?:false(?=[}\s]))/,/^(?:-?[0-9]+(?=[}\s]))/,/^(?:[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.]))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
lexer.conditions = {"mu":{"rules":[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],"inclusive":false},"emu":{"rules":[3],"inclusive":false},"com":{"rules":[4],"inclusive":false},"INITIAL":{"rules":[0,1,2,31],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();;
// lib/handlebars/compiler/base.js

Handlebars.Parser = handlebars;

Handlebars.parse = function(input) {

  // Just return if an already-compile AST was passed in.
  if(input.constructor === Handlebars.AST.ProgramNode) { return input; }

  Handlebars.Parser.yy = Handlebars.AST;
  return Handlebars.Parser.parse(input);
};
;
// lib/handlebars/compiler/ast.js
Handlebars.AST = {};

Handlebars.AST.ProgramNode = function(statements, inverse) {
  this.type = "program";
  this.statements = statements;
  if(inverse) { this.inverse = new Handlebars.AST.ProgramNode(inverse); }
};

Handlebars.AST.MustacheNode = function(rawParams, hash, unescaped) {
  this.type = "mustache";
  this.escaped = !unescaped;
  this.hash = hash;

  var id = this.id = rawParams[0];
  var params = this.params = rawParams.slice(1);

  // a mustache is an eligible helper if:
  // * its id is simple (a single part, not `this` or `..`)
  var eligibleHelper = this.eligibleHelper = id.isSimple;

  // a mustache is definitely a helper if:
  // * it is an eligible helper, and
  // * it has at least one parameter or hash segment
  this.isHelper = eligibleHelper && (params.length || hash);

  // if a mustache is an eligible helper but not a definite
  // helper, it is ambiguous, and will be resolved in a later
  // pass or at runtime.
};

Handlebars.AST.PartialNode = function(partialName, context) {
  this.type         = "partial";
  this.partialName  = partialName;
  this.context      = context;
};

Handlebars.AST.BlockNode = function(mustache, program, inverse, close) {
  if(mustache.id.original !== close.original) {
    throw new Handlebars.Exception(mustache.id.original + " doesn't match " + close.original);
  }

  this.type = "block";
  this.mustache = mustache;
  this.program  = program;
  this.inverse  = inverse;

  if (this.inverse && !this.program) {
    this.isInverse = true;
  }
};

Handlebars.AST.ContentNode = function(string) {
  this.type = "content";
  this.string = string;
};

Handlebars.AST.HashNode = function(pairs) {
  this.type = "hash";
  this.pairs = pairs;
};

Handlebars.AST.IdNode = function(parts) {
  this.type = "ID";

  var original = "",
      dig = [],
      depth = 0;

  for(var i=0,l=parts.length; i<l; i++) {
    var part = parts[i].part;
    original += (parts[i].separator || '') + part;

    if (part === ".." || part === "." || part === "this") {
      if (dig.length > 0) { throw new Handlebars.Exception("Invalid path: " + original); }
      else if (part === "..") { depth++; }
      else { this.isScoped = true; }
    }
    else { dig.push(part); }
  }

  this.original = original;
  this.parts    = dig;
  this.string   = dig.join('.');
  this.depth    = depth;

  // an ID is simple if it only has one part, and that part is not
  // `..` or `this`.
  this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

  this.stringModeValue = this.string;
};

Handlebars.AST.PartialNameNode = function(name) {
  this.type = "PARTIAL_NAME";
  this.name = name.original;
};

Handlebars.AST.DataNode = function(id) {
  this.type = "DATA";
  this.id = id;
};

Handlebars.AST.StringNode = function(string) {
  this.type = "STRING";
  this.original =
    this.string =
    this.stringModeValue = string;
};

Handlebars.AST.IntegerNode = function(integer) {
  this.type = "INTEGER";
  this.original =
    this.integer = integer;
  this.stringModeValue = Number(integer);
};

Handlebars.AST.BooleanNode = function(bool) {
  this.type = "BOOLEAN";
  this.bool = bool;
  this.stringModeValue = bool === "true";
};

Handlebars.AST.CommentNode = function(comment) {
  this.type = "comment";
  this.comment = comment;
};
;
// lib/handlebars/utils.js

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

Handlebars.Exception = function(message) {
  var tmp = Error.prototype.constructor.apply(this, arguments);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }
};
Handlebars.Exception.prototype = new Error();

// Build out our basic SafeString type
Handlebars.SafeString = function(string) {
  this.string = string;
};
Handlebars.SafeString.prototype.toString = function() {
  return this.string.toString();
};

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

var escapeChar = function(chr) {
  return escape[chr] || "&amp;";
};

Handlebars.Utils = {
  extend: function(obj, value) {
    for(var key in value) {
      if(value.hasOwnProperty(key)) {
        obj[key] = value[key];
      }
    }
  },

  escapeExpression: function(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof Handlebars.SafeString) {
      return string.toString();
    } else if (string == null || string === false) {
      return "";
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = string.toString();

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  },

  isEmpty: function(value) {
    if (!value && value !== 0) {
      return true;
    } else if(toString.call(value) === "[object Array]" && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }
};
;
// lib/handlebars/compiler/compiler.js

/*jshint eqnull:true*/
var Compiler = Handlebars.Compiler = function() {};

// the foundHelper register will disambiguate helper lookup from finding a
// function in a context. This is necessary for mustache compatibility, which
// requires that context functions in blocks are evaluated by blockHelperMissing,
// and then proceed as if the resulting value was provided to blockHelperMissing.

Compiler.prototype = {
  compiler: Compiler,

  disassemble: function() {
    var opcodes = this.opcodes, opcode, out = [], params, param;

    for (var i=0, l=opcodes.length; i<l; i++) {
      opcode = opcodes[i];

      if (opcode.opcode === 'DECLARE') {
        out.push("DECLARE " + opcode.name + "=" + opcode.value);
      } else {
        params = [];
        for (var j=0; j<opcode.args.length; j++) {
          param = opcode.args[j];
          if (typeof param === "string") {
            param = "\"" + param.replace("\n", "\\n") + "\"";
          }
          params.push(param);
        }
        out.push(opcode.opcode + " " + params.join(" "));
      }
    }

    return out.join("\n");
  },
  equals: function(other) {
    var len = this.opcodes.length;
    if (other.opcodes.length !== len) {
      return false;
    }

    for (var i = 0; i < len; i++) {
      var opcode = this.opcodes[i],
          otherOpcode = other.opcodes[i];
      if (opcode.opcode !== otherOpcode.opcode || opcode.args.length !== otherOpcode.args.length) {
        return false;
      }
      for (var j = 0; j < opcode.args.length; j++) {
        if (opcode.args[j] !== otherOpcode.args[j]) {
          return false;
        }
      }
    }

    len = this.children.length;
    if (other.children.length !== len) {
      return false;
    }
    for (i = 0; i < len; i++) {
      if (!this.children[i].equals(other.children[i])) {
        return false;
      }
    }

    return true;
  },

  guid: 0,

  compile: function(program, options) {
    this.children = [];
    this.depths = {list: []};
    this.options = options;

    // These changes will propagate to the other compiler components
    var knownHelpers = this.options.knownHelpers;
    this.options.knownHelpers = {
      'helperMissing': true,
      'blockHelperMissing': true,
      'each': true,
      'if': true,
      'unless': true,
      'with': true,
      'log': true
    };
    if (knownHelpers) {
      for (var name in knownHelpers) {
        this.options.knownHelpers[name] = knownHelpers[name];
      }
    }

    return this.program(program);
  },

  accept: function(node) {
    return this[node.type](node);
  },

  program: function(program) {
    var statements = program.statements, statement;
    this.opcodes = [];

    for(var i=0, l=statements.length; i<l; i++) {
      statement = statements[i];
      this[statement.type](statement);
    }
    this.isSimple = l === 1;

    this.depths.list = this.depths.list.sort(function(a, b) {
      return a - b;
    });

    return this;
  },

  compileProgram: function(program) {
    var result = new this.compiler().compile(program, this.options);
    var guid = this.guid++, depth;

    this.usePartial = this.usePartial || result.usePartial;

    this.children[guid] = result;

    for(var i=0, l=result.depths.list.length; i<l; i++) {
      depth = result.depths.list[i];

      if(depth < 2) { continue; }
      else { this.addDepth(depth - 1); }
    }

    return guid;
  },

  block: function(block) {
    var mustache = block.mustache,
        program = block.program,
        inverse = block.inverse;

    if (program) {
      program = this.compileProgram(program);
    }

    if (inverse) {
      inverse = this.compileProgram(inverse);
    }

    var type = this.classifyMustache(mustache);

    if (type === "helper") {
      this.helperMustache(mustache, program, inverse);
    } else if (type === "simple") {
      this.simpleMustache(mustache);

      // now that the simple mustache is resolved, we need to
      // evaluate it by executing `blockHelperMissing`
      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);
      this.opcode('emptyHash');
      this.opcode('blockValue');
    } else {
      this.ambiguousMustache(mustache, program, inverse);

      // now that the simple mustache is resolved, we need to
      // evaluate it by executing `blockHelperMissing`
      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);
      this.opcode('emptyHash');
      this.opcode('ambiguousBlockValue');
    }

    this.opcode('append');
  },

  hash: function(hash) {
    var pairs = hash.pairs, pair, val;

    this.opcode('pushHash');

    for(var i=0, l=pairs.length; i<l; i++) {
      pair = pairs[i];
      val  = pair[1];

      if (this.options.stringParams) {
        if(val.depth) {
          this.addDepth(val.depth);
        }
        this.opcode('getContext', val.depth || 0);
        this.opcode('pushStringParam', val.stringModeValue, val.type);
      } else {
        this.accept(val);
      }

      this.opcode('assignToHash', pair[0]);
    }
    this.opcode('popHash');
  },

  partial: function(partial) {
    var partialName = partial.partialName;
    this.usePartial = true;

    if(partial.context) {
      this.ID(partial.context);
    } else {
      this.opcode('push', 'depth0');
    }

    this.opcode('invokePartial', partialName.name);
    this.opcode('append');
  },

  content: function(content) {
    this.opcode('appendContent', content.string);
  },

  mustache: function(mustache) {
    var options = this.options;
    var type = this.classifyMustache(mustache);

    if (type === "simple") {
      this.simpleMustache(mustache);
    } else if (type === "helper") {
      this.helperMustache(mustache);
    } else {
      this.ambiguousMustache(mustache);
    }

    if(mustache.escaped && !options.noEscape) {
      this.opcode('appendEscaped');
    } else {
      this.opcode('append');
    }
  },

  ambiguousMustache: function(mustache, program, inverse) {
    var id = mustache.id,
        name = id.parts[0],
        isBlock = program != null || inverse != null;

    this.opcode('getContext', id.depth);

    this.opcode('pushProgram', program);
    this.opcode('pushProgram', inverse);

    this.opcode('invokeAmbiguous', name, isBlock);
  },

  simpleMustache: function(mustache) {
    var id = mustache.id;

    if (id.type === 'DATA') {
      this.DATA(id);
    } else if (id.parts.length) {
      this.ID(id);
    } else {
      // Simplified ID for `this`
      this.addDepth(id.depth);
      this.opcode('getContext', id.depth);
      this.opcode('pushContext');
    }

    this.opcode('resolvePossibleLambda');
  },

  helperMustache: function(mustache, program, inverse) {
    var params = this.setupFullMustacheParams(mustache, program, inverse),
        name = mustache.id.parts[0];

    if (this.options.knownHelpers[name]) {
      this.opcode('invokeKnownHelper', params.length, name);
    } else if (this.options.knownHelpersOnly) {
      throw new Error("You specified knownHelpersOnly, but used the unknown helper " + name);
    } else {
      this.opcode('invokeHelper', params.length, name);
    }
  },

  ID: function(id) {
    this.addDepth(id.depth);
    this.opcode('getContext', id.depth);

    var name = id.parts[0];
    if (!name) {
      this.opcode('pushContext');
    } else {
      this.opcode('lookupOnContext', id.parts[0]);
    }

    for(var i=1, l=id.parts.length; i<l; i++) {
      this.opcode('lookup', id.parts[i]);
    }
  },

  DATA: function(data) {
    this.options.data = true;
    if (data.id.isScoped || data.id.depth) {
      throw new Handlebars.Exception('Scoped data references are not supported: ' + data.original);
    }

    this.opcode('lookupData');
    var parts = data.id.parts;
    for(var i=0, l=parts.length; i<l; i++) {
      this.opcode('lookup', parts[i]);
    }
  },

  STRING: function(string) {
    this.opcode('pushString', string.string);
  },

  INTEGER: function(integer) {
    this.opcode('pushLiteral', integer.integer);
  },

  BOOLEAN: function(bool) {
    this.opcode('pushLiteral', bool.bool);
  },

  comment: function() {},

  // HELPERS
  opcode: function(name) {
    this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
  },

  declare: function(name, value) {
    this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
  },

  addDepth: function(depth) {
    if(isNaN(depth)) { throw new Error("EWOT"); }
    if(depth === 0) { return; }

    if(!this.depths[depth]) {
      this.depths[depth] = true;
      this.depths.list.push(depth);
    }
  },

  classifyMustache: function(mustache) {
    var isHelper   = mustache.isHelper;
    var isEligible = mustache.eligibleHelper;
    var options    = this.options;

    // if ambiguous, we can possibly resolve the ambiguity now
    if (isEligible && !isHelper) {
      var name = mustache.id.parts[0];

      if (options.knownHelpers[name]) {
        isHelper = true;
      } else if (options.knownHelpersOnly) {
        isEligible = false;
      }
    }

    if (isHelper) { return "helper"; }
    else if (isEligible) { return "ambiguous"; }
    else { return "simple"; }
  },

  pushParams: function(params) {
    var i = params.length, param;

    while(i--) {
      param = params[i];

      if(this.options.stringParams) {
        if(param.depth) {
          this.addDepth(param.depth);
        }

        this.opcode('getContext', param.depth || 0);
        this.opcode('pushStringParam', param.stringModeValue, param.type);
      } else {
        this[param.type](param);
      }
    }
  },

  setupMustacheParams: function(mustache) {
    var params = mustache.params;
    this.pushParams(params);

    if(mustache.hash) {
      this.hash(mustache.hash);
    } else {
      this.opcode('emptyHash');
    }

    return params;
  },

  // this will replace setupMustacheParams when we're done
  setupFullMustacheParams: function(mustache, program, inverse) {
    var params = mustache.params;
    this.pushParams(params);

    this.opcode('pushProgram', program);
    this.opcode('pushProgram', inverse);

    if(mustache.hash) {
      this.hash(mustache.hash);
    } else {
      this.opcode('emptyHash');
    }

    return params;
  }
};

Handlebars.precompile = function(input, options) {
  if (input == null || (typeof input !== 'string' && input.constructor !== Handlebars.AST.ProgramNode)) {
    throw new Handlebars.Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
  }

  options = options || {};
  if (!('data' in options)) {
    options.data = true;
  }
  var ast = Handlebars.parse(input);
  var environment = new Compiler().compile(ast, options);
  return new Handlebars.JavaScriptCompiler().compile(environment, options);
};

Handlebars.compile = function(input, options) {
  if (input == null || (typeof input !== 'string' && input.constructor !== Handlebars.AST.ProgramNode)) {
    throw new Handlebars.Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
  }

  options = options || {};
  if (!('data' in options)) {
    options.data = true;
  }
  var compiled;
  function compile() {
    var ast = Handlebars.parse(input);
    var environment = new Compiler().compile(ast, options);
    var templateSpec = new Handlebars.JavaScriptCompiler().compile(environment, options, undefined, true);
    return Handlebars.template(templateSpec);
  }

  // Template is only compiled on first use and cached after that point.
  return function(context, options) {
    if (!compiled) {
      compiled = compile();
    }
    return compiled.call(this, context, options);
  };
};

;
// lib/handlebars/compiler/javascript-compiler.js
/*jshint eqnull:true*/

var Literal = function(value) {
  this.value = value;
};


var JavaScriptCompiler = Handlebars.JavaScriptCompiler = function() {};

JavaScriptCompiler.prototype = {
  // PUBLIC API: You can override these methods in a subclass to provide
  // alternative compiled forms for name lookup and buffering semantics
  nameLookup: function(parent, name /* , type*/) {
    if (/^[0-9]+$/.test(name)) {
      return parent + "[" + name + "]";
    } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
      return parent + "." + name;
    }
    else {
      return parent + "['" + name + "']";
    }
  },

  appendToBuffer: function(string) {
    if (this.environment.isSimple) {
      return "return " + string + ";";
    } else {
      return {
        appendToBuffer: true,
        content: string,
        toString: function() { return "buffer += " + string + ";"; }
      };
    }
  },

  initializeBuffer: function() {
    return this.quotedString("");
  },

  namespace: "Handlebars",
  // END PUBLIC API

  compile: function(environment, options, context, asObject) {
    this.environment = environment;
    this.options = options || {};

    Handlebars.log(Handlebars.logger.DEBUG, this.environment.disassemble() + "\n\n");

    this.name = this.environment.name;
    this.isChild = !!context;
    this.context = context || {
      programs: [],
      environments: [],
      aliases: { }
    };

    this.preamble();

    this.stackSlot = 0;
    this.stackVars = [];
    this.registers = { list: [] };
    this.compileStack = [];
    this.inlineStack = [];

    this.compileChildren(environment, options);

    var opcodes = environment.opcodes, opcode;

    this.i = 0;

    for(var l=opcodes.length; this.i<l; this.i++) {
      opcode = opcodes[this.i];

      if(opcode.opcode === 'DECLARE') {
        this[opcode.name] = opcode.value;
      } else {
        this[opcode.opcode].apply(this, opcode.args);
      }
    }

    return this.createFunctionContext(asObject);
  },

  nextOpcode: function() {
    var opcodes = this.environment.opcodes;
    return opcodes[this.i + 1];
  },

  eat: function() {
    this.i = this.i + 1;
  },

  preamble: function() {
    var out = [];

    if (!this.isChild) {
      var namespace = this.namespace;

      var copies = "helpers = this.merge(helpers, " + namespace + ".helpers);";
      if (this.environment.usePartial) { copies = copies + " partials = this.merge(partials, " + namespace + ".partials);"; }
      if (this.options.data) { copies = copies + " data = data || {};"; }
      out.push(copies);
    } else {
      out.push('');
    }

    if (!this.environment.isSimple) {
      out.push(", buffer = " + this.initializeBuffer());
    } else {
      out.push("");
    }

    // track the last context pushed into place to allow skipping the
    // getContext opcode when it would be a noop
    this.lastContext = 0;
    this.source = out;
  },

  createFunctionContext: function(asObject) {
    var locals = this.stackVars.concat(this.registers.list);

    if(locals.length > 0) {
      this.source[1] = this.source[1] + ", " + locals.join(", ");
    }

    // Generate minimizer alias mappings
    if (!this.isChild) {
      for (var alias in this.context.aliases) {
        if (this.context.aliases.hasOwnProperty(alias)) {
          this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
        }
      }
    }

    if (this.source[1]) {
      this.source[1] = "var " + this.source[1].substring(2) + ";";
    }

    // Merge children
    if (!this.isChild) {
      this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
    }

    if (!this.environment.isSimple) {
      this.source.push("return buffer;");
    }

    var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

    for(var i=0, l=this.environment.depths.list.length; i<l; i++) {
      params.push("depth" + this.environment.depths.list[i]);
    }

    // Perform a second pass over the output to merge content when possible
    var source = this.mergeSource();

    if (!this.isChild) {
      var revision = Handlebars.COMPILER_REVISION,
          versions = Handlebars.REVISION_CHANGES[revision];
      source = "this.compilerInfo = ["+revision+",'"+versions+"'];\n"+source;
    }

    if (asObject) {
      params.push(source);

      return Function.apply(this, params);
    } else {
      var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + source + '}';
      Handlebars.log(Handlebars.logger.DEBUG, functionSource + "\n\n");
      return functionSource;
    }
  },
  mergeSource: function() {
    // WARN: We are not handling the case where buffer is still populated as the source should
    // not have buffer append operations as their final action.
    var source = '',
        buffer;
    for (var i = 0, len = this.source.length; i < len; i++) {
      var line = this.source[i];
      if (line.appendToBuffer) {
        if (buffer) {
          buffer = buffer + '\n    + ' + line.content;
        } else {
          buffer = line.content;
        }
      } else {
        if (buffer) {
          source += 'buffer += ' + buffer + ';\n  ';
          buffer = undefined;
        }
        source += line + '\n  ';
      }
    }
    return source;
  },

  // [blockValue]
  //
  // On stack, before: hash, inverse, program, value
  // On stack, after: return value of blockHelperMissing
  //
  // The purpose of this opcode is to take a block of the form
  // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
  // replace it on the stack with the result of properly
  // invoking blockHelperMissing.
  blockValue: function() {
    this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

    var params = ["depth0"];
    this.setupParams(0, params);

    this.replaceStack(function(current) {
      params.splice(1, 0, current);
      return "blockHelperMissing.call(" + params.join(", ") + ")";
    });
  },

  // [ambiguousBlockValue]
  //
  // On stack, before: hash, inverse, program, value
  // Compiler value, before: lastHelper=value of last found helper, if any
  // On stack, after, if no lastHelper: same as [blockValue]
  // On stack, after, if lastHelper: value
  ambiguousBlockValue: function() {
    this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

    var params = ["depth0"];
    this.setupParams(0, params);

    var current = this.topStack();
    params.splice(1, 0, current);

    // Use the options value generated from the invocation
    params[params.length-1] = 'options';

    this.source.push("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
  },

  // [appendContent]
  //
  // On stack, before: ...
  // On stack, after: ...
  //
  // Appends the string value of `content` to the current buffer
  appendContent: function(content) {
    this.source.push(this.appendToBuffer(this.quotedString(content)));
  },

  // [append]
  //
  // On stack, before: value, ...
  // On stack, after: ...
  //
  // Coerces `value` to a String and appends it to the current buffer.
  //
  // If `value` is truthy, or 0, it is coerced into a string and appended
  // Otherwise, the empty string is appended
  append: function() {
    // Force anything that is inlined onto the stack so we don't have duplication
    // when we examine local
    this.flushInline();
    var local = this.popStack();
    this.source.push("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
    if (this.environment.isSimple) {
      this.source.push("else { " + this.appendToBuffer("''") + " }");
    }
  },

  // [appendEscaped]
  //
  // On stack, before: value, ...
  // On stack, after: ...
  //
  // Escape `value` and append it to the buffer
  appendEscaped: function() {
    this.context.aliases.escapeExpression = 'this.escapeExpression';

    this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
  },

  // [getContext]
  //
  // On stack, before: ...
  // On stack, after: ...
  // Compiler value, after: lastContext=depth
  //
  // Set the value of the `lastContext` compiler value to the depth
  getContext: function(depth) {
    if(this.lastContext !== depth) {
      this.lastContext = depth;
    }
  },

  // [lookupOnContext]
  //
  // On stack, before: ...
  // On stack, after: currentContext[name], ...
  //
  // Looks up the value of `name` on the current context and pushes
  // it onto the stack.
  lookupOnContext: function(name) {
    this.push(this.nameLookup('depth' + this.lastContext, name, 'context'));
  },

  // [pushContext]
  //
  // On stack, before: ...
  // On stack, after: currentContext, ...
  //
  // Pushes the value of the current context onto the stack.
  pushContext: function() {
    this.pushStackLiteral('depth' + this.lastContext);
  },

  // [resolvePossibleLambda]
  //
  // On stack, before: value, ...
  // On stack, after: resolved value, ...
  //
  // If the `value` is a lambda, replace it on the stack by
  // the return value of the lambda
  resolvePossibleLambda: function() {
    this.context.aliases.functionType = '"function"';

    this.replaceStack(function(current) {
      return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
    });
  },

  // [lookup]
  //
  // On stack, before: value, ...
  // On stack, after: value[name], ...
  //
  // Replace the value on the stack with the result of looking
  // up `name` on `value`
  lookup: function(name) {
    this.replaceStack(function(current) {
      return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
    });
  },

  // [lookupData]
  //
  // On stack, before: ...
  // On stack, after: data[id], ...
  //
  // Push the result of looking up `id` on the current data
  lookupData: function(id) {
    this.push('data');
  },

  // [pushStringParam]
  //
  // On stack, before: ...
  // On stack, after: string, currentContext, ...
  //
  // This opcode is designed for use in string mode, which
  // provides the string value of a parameter along with its
  // depth rather than resolving it immediately.
  pushStringParam: function(string, type) {
    this.pushStackLiteral('depth' + this.lastContext);

    this.pushString(type);

    if (typeof string === 'string') {
      this.pushString(string);
    } else {
      this.pushStackLiteral(string);
    }
  },

  emptyHash: function() {
    this.pushStackLiteral('{}');

    if (this.options.stringParams) {
      this.register('hashTypes', '{}');
      this.register('hashContexts', '{}');
    }
  },
  pushHash: function() {
    this.hash = {values: [], types: [], contexts: []};
  },
  popHash: function() {
    var hash = this.hash;
    this.hash = undefined;

    if (this.options.stringParams) {
      this.register('hashContexts', '{' + hash.contexts.join(',') + '}');
      this.register('hashTypes', '{' + hash.types.join(',') + '}');
    }
    this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
  },

  // [pushString]
  //
  // On stack, before: ...
  // On stack, after: quotedString(string), ...
  //
  // Push a quoted version of `string` onto the stack
  pushString: function(string) {
    this.pushStackLiteral(this.quotedString(string));
  },

  // [push]
  //
  // On stack, before: ...
  // On stack, after: expr, ...
  //
  // Push an expression onto the stack
  push: function(expr) {
    this.inlineStack.push(expr);
    return expr;
  },

  // [pushLiteral]
  //
  // On stack, before: ...
  // On stack, after: value, ...
  //
  // Pushes a value onto the stack. This operation prevents
  // the compiler from creating a temporary variable to hold
  // it.
  pushLiteral: function(value) {
    this.pushStackLiteral(value);
  },

  // [pushProgram]
  //
  // On stack, before: ...
  // On stack, after: program(guid), ...
  //
  // Push a program expression onto the stack. This takes
  // a compile-time guid and converts it into a runtime-accessible
  // expression.
  pushProgram: function(guid) {
    if (guid != null) {
      this.pushStackLiteral(this.programExpression(guid));
    } else {
      this.pushStackLiteral(null);
    }
  },

  // [invokeHelper]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of helper invocation
  //
  // Pops off the helper's parameters, invokes the helper,
  // and pushes the helper's return value onto the stack.
  //
  // If the helper is not found, `helperMissing` is called.
  invokeHelper: function(paramSize, name) {
    this.context.aliases.helperMissing = 'helpers.helperMissing';

    var helper = this.lastHelper = this.setupHelper(paramSize, name, true);
    var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');

    this.push(helper.name + ' || ' + nonHelper);
    this.replaceStack(function(name) {
      return name + ' ? ' + name + '.call(' +
          helper.callParams + ") " + ": helperMissing.call(" +
          helper.helperMissingParams + ")";
    });
  },

  // [invokeKnownHelper]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of helper invocation
  //
  // This operation is used when the helper is known to exist,
  // so a `helperMissing` fallback is not required.
  invokeKnownHelper: function(paramSize, name) {
    var helper = this.setupHelper(paramSize, name);
    this.push(helper.name + ".call(" + helper.callParams + ")");
  },

  // [invokeAmbiguous]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of disambiguation
  //
  // This operation is used when an expression like `{{foo}}`
  // is provided, but we don't know at compile-time whether it
  // is a helper or a path.
  //
  // This operation emits more code than the other options,
  // and can be avoided by passing the `knownHelpers` and
  // `knownHelpersOnly` flags at compile-time.
  invokeAmbiguous: function(name, helperCall) {
    this.context.aliases.functionType = '"function"';

    this.pushStackLiteral('{}');    // Hash value
    var helper = this.setupHelper(0, name, helperCall);

    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

    var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
    var nextStack = this.nextStack();

    this.source.push('if (' + nextStack + ' = ' + helperName + ') { ' + nextStack + ' = ' + nextStack + '.call(' + helper.callParams + '); }');
    this.source.push('else { ' + nextStack + ' = ' + nonHelper + '; ' + nextStack + ' = typeof ' + nextStack + ' === functionType ? ' + nextStack + '.apply(depth0) : ' + nextStack + '; }');
  },

  // [invokePartial]
  //
  // On stack, before: context, ...
  // On stack after: result of partial invocation
  //
  // This operation pops off a context, invokes a partial with that context,
  // and pushes the result of the invocation back.
  invokePartial: function(name) {
    var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];

    if (this.options.data) {
      params.push("data");
    }

    this.context.aliases.self = "this";
    this.push("self.invokePartial(" + params.join(", ") + ")");
  },

  // [assignToHash]
  //
  // On stack, before: value, hash, ...
  // On stack, after: hash, ...
  //
  // Pops a value and hash off the stack, assigns `hash[key] = value`
  // and pushes the hash back onto the stack.
  assignToHash: function(key) {
    var value = this.popStack(),
        context,
        type;

    if (this.options.stringParams) {
      type = this.popStack();
      context = this.popStack();
    }

    var hash = this.hash;
    if (context) {
      hash.contexts.push("'" + key + "': " + context);
    }
    if (type) {
      hash.types.push("'" + key + "': " + type);
    }
    hash.values.push("'" + key + "': (" + value + ")");
  },

  // HELPERS

  compiler: JavaScriptCompiler,

  compileChildren: function(environment, options) {
    var children = environment.children, child, compiler;

    for(var i=0, l=children.length; i<l; i++) {
      child = children[i];
      compiler = new this.compiler();

      var index = this.matchExistingProgram(child);

      if (index == null) {
        this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
        index = this.context.programs.length;
        child.index = index;
        child.name = 'program' + index;
        this.context.programs[index] = compiler.compile(child, options, this.context);
        this.context.environments[index] = child;
      } else {
        child.index = index;
        child.name = 'program' + index;
      }
    }
  },
  matchExistingProgram: function(child) {
    for (var i = 0, len = this.context.environments.length; i < len; i++) {
      var environment = this.context.environments[i];
      if (environment && environment.equals(child)) {
        return i;
      }
    }
  },

  programExpression: function(guid) {
    this.context.aliases.self = "this";

    if(guid == null) {
      return "self.noop";
    }

    var child = this.environment.children[guid],
        depths = child.depths.list, depth;

    var programParams = [child.index, child.name, "data"];

    for(var i=0, l = depths.length; i<l; i++) {
      depth = depths[i];

      if(depth === 1) { programParams.push("depth0"); }
      else { programParams.push("depth" + (depth - 1)); }
    }

    return (depths.length === 0 ? "self.program(" : "self.programWithDepth(") + programParams.join(", ") + ")";
  },

  register: function(name, val) {
    this.useRegister(name);
    this.source.push(name + " = " + val + ";");
  },

  useRegister: function(name) {
    if(!this.registers[name]) {
      this.registers[name] = true;
      this.registers.list.push(name);
    }
  },

  pushStackLiteral: function(item) {
    return this.push(new Literal(item));
  },

  pushStack: function(item) {
    this.flushInline();

    var stack = this.incrStack();
    if (item) {
      this.source.push(stack + " = " + item + ";");
    }
    this.compileStack.push(stack);
    return stack;
  },

  replaceStack: function(callback) {
    var prefix = '',
        inline = this.isInline(),
        stack;

    // If we are currently inline then we want to merge the inline statement into the
    // replacement statement via ','
    if (inline) {
      var top = this.popStack(true);

      if (top instanceof Literal) {
        // Literals do not need to be inlined
        stack = top.value;
      } else {
        // Get or create the current stack name for use by the inline
        var name = this.stackSlot ? this.topStackName() : this.incrStack();

        prefix = '(' + this.push(name) + ' = ' + top + '),';
        stack = this.topStack();
      }
    } else {
      stack = this.topStack();
    }

    var item = callback.call(this, stack);

    if (inline) {
      if (this.inlineStack.length || this.compileStack.length) {
        this.popStack();
      }
      this.push('(' + prefix + item + ')');
    } else {
      // Prevent modification of the context depth variable. Through replaceStack
      if (!/^stack/.test(stack)) {
        stack = this.nextStack();
      }

      this.source.push(stack + " = (" + prefix + item + ");");
    }
    return stack;
  },

  nextStack: function() {
    return this.pushStack();
  },

  incrStack: function() {
    this.stackSlot++;
    if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
    return this.topStackName();
  },
  topStackName: function() {
    return "stack" + this.stackSlot;
  },
  flushInline: function() {
    var inlineStack = this.inlineStack;
    if (inlineStack.length) {
      this.inlineStack = [];
      for (var i = 0, len = inlineStack.length; i < len; i++) {
        var entry = inlineStack[i];
        if (entry instanceof Literal) {
          this.compileStack.push(entry);
        } else {
          this.pushStack(entry);
        }
      }
    }
  },
  isInline: function() {
    return this.inlineStack.length;
  },

  popStack: function(wrapped) {
    var inline = this.isInline(),
        item = (inline ? this.inlineStack : this.compileStack).pop();

    if (!wrapped && (item instanceof Literal)) {
      return item.value;
    } else {
      if (!inline) {
        this.stackSlot--;
      }
      return item;
    }
  },

  topStack: function(wrapped) {
    var stack = (this.isInline() ? this.inlineStack : this.compileStack),
        item = stack[stack.length - 1];

    if (!wrapped && (item instanceof Literal)) {
      return item.value;
    } else {
      return item;
    }
  },

  quotedString: function(str) {
    return '"' + str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\u2028/g, '\\u2028')   // Per Ecma-262 7.3 + 7.8.4
      .replace(/\u2029/g, '\\u2029') + '"';
  },

  setupHelper: function(paramSize, name, missingParams) {
    var params = [];
    this.setupParams(paramSize, params, missingParams);
    var foundHelper = this.nameLookup('helpers', name, 'helper');

    return {
      params: params,
      name: foundHelper,
      callParams: ["depth0"].concat(params).join(", "),
      helperMissingParams: missingParams && ["depth0", this.quotedString(name)].concat(params).join(", ")
    };
  },

  // the params and contexts arguments are passed in arrays
  // to fill in
  setupParams: function(paramSize, params, useRegister) {
    var options = [], contexts = [], types = [], param, inverse, program;

    options.push("hash:" + this.popStack());

    inverse = this.popStack();
    program = this.popStack();

    // Avoid setting fn and inverse if neither are set. This allows
    // helpers to do a check for `if (options.fn)`
    if (program || inverse) {
      if (!program) {
        this.context.aliases.self = "this";
        program = "self.noop";
      }

      if (!inverse) {
       this.context.aliases.self = "this";
        inverse = "self.noop";
      }

      options.push("inverse:" + inverse);
      options.push("fn:" + program);
    }

    for(var i=0; i<paramSize; i++) {
      param = this.popStack();
      params.push(param);

      if(this.options.stringParams) {
        types.push(this.popStack());
        contexts.push(this.popStack());
      }
    }

    if (this.options.stringParams) {
      options.push("contexts:[" + contexts.join(",") + "]");
      options.push("types:[" + types.join(",") + "]");
      options.push("hashContexts:hashContexts");
      options.push("hashTypes:hashTypes");
    }

    if(this.options.data) {
      options.push("data:data");
    }

    options = "{" + options.join(",") + "}";
    if (useRegister) {
      this.register('options', options);
      params.push('options');
    } else {
      params.push(options);
    }
    return params.join(", ");
  }
};

var reservedWords = (
  "break else new var" +
  " case finally return void" +
  " catch for switch while" +
  " continue function this with" +
  " default if throw" +
  " delete in try" +
  " do instanceof typeof" +
  " abstract enum int short" +
  " boolean export interface static" +
  " byte extends long super" +
  " char final native synchronized" +
  " class float package throws" +
  " const goto private transient" +
  " debugger implements protected volatile" +
  " double import public let yield"
).split(" ");

var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

for(var i=0, l=reservedWords.length; i<l; i++) {
  compilerWords[reservedWords[i]] = true;
}

JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
  if(!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(name)) {
    return true;
  }
  return false;
};
;
// lib/handlebars/runtime.js

Handlebars.VM = {
  template: function(templateSpec) {
    // Just add water
    var container = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          programWrapper = Handlebars.VM.program(i, fn, data);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = Handlebars.VM.program(i, fn);
        }
        return programWrapper;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common) {
          ret = {};
          Handlebars.Utils.extend(ret, common);
          Handlebars.Utils.extend(ret, param);
        }
        return ret;
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop,
      compilerInfo: null
    };

    return function(context, options) {
      options = options || {};
      var result = templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);

      var compilerInfo = container.compilerInfo || [],
          compilerRevision = compilerInfo[0] || 1,
          currentRevision = Handlebars.COMPILER_REVISION;

      if (compilerRevision !== currentRevision) {
        if (compilerRevision < currentRevision) {
          var runtimeVersions = Handlebars.REVISION_CHANGES[currentRevision],
              compilerVersions = Handlebars.REVISION_CHANGES[compilerRevision];
          throw "Template was precompiled with an older version of Handlebars than the current runtime. "+
                "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").";
        } else {
          // Use the embedded version info since the runtime doesn't know about this revision yet
          throw "Template was precompiled with a newer version of Handlebars than the current runtime. "+
                "Please update your runtime to a newer version ("+compilerInfo[1]+").";
        }
      }

      return result;
    };
  },

  programWithDepth: function(i, fn, data /*, $depth */) {
    var args = Array.prototype.slice.call(arguments, 3);

    var program = function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
    program.program = i;
    program.depth = args.length;
    return program;
  },
  program: function(i, fn, data) {
    var program = function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
    program.program = i;
    program.depth = 0;
    return program;
  },
  noop: function() { return ""; },
  invokePartial: function(partial, name, context, helpers, partials, data) {
    var options = { helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Handlebars.Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    } else if (!Handlebars.compile) {
      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    } else {
      partials[name] = Handlebars.compile(partial, {data: data !== undefined});
      return partials[name](context, options);
    }
  }
};

Handlebars.template = Handlebars.VM.template;
;
}).call(this);
;

define("handlebars", ["backbone"], function(){});

this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["calendarMonth"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n            <tr class=\"row week-row\">\n                ";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  if (stack1 = helpers.cells) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.cells; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.cells) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tr>\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n                    <td class=\"cell";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  if (stack1 = helpers.disabled) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.disabled; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.disabled) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                        <div>\n                            <span class=\"date-value\">";
  if (stack1 = helpers.date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n                            <em class=\"events-counter\"></em>\n\n                            <strong class=\"week-number\">";
  if (stack1 = helpers.week_number) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.week_number; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong>\n\n                            <ul class=\"calendar-items\"></ul>\n                        </div>\n                    </td>\n                ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return " disabled";
  }

function program5(depth0,data) {
  
  
  return "Loading content";
  }

  buffer += "<section class=\"tablet-calendar\">\n    <table class=\"days-container\">\n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.rows) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.rows; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.rows) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </table>\n\n    <div class=\"overlay\">\n        <em>\n            <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span><br />\n            <img src=\"";
  if (stack1 = helpers.loaderUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.loaderUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n        </em>\n\n    </div>\n</section>";
  return buffer;
  });

this["Handlebars"]["templates"]["calendarMonth_group"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n\n<li id=\"element-view-";
  if (stack1 = helpers.pk) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pk; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.cid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <section class=\"tablet-calendar\">\n        <table class=\"days-container\">\n            ";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  if (stack1 = helpers.rows) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.rows; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.rows) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </table>\n\n        <div class=\"overlay\">\n            <em>\n                <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span><br />\n                <img src=\"";
  if (stack1 = helpers.loaderUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.loaderUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n            </em>\n\n        </div>\n    </section>\n</li>\n\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n                <tr class=\"row week-row\">\n                    ";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  if (stack1 = helpers.cells) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.cells; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.cells) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </tr>\n            ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n                        <td class=\"cell";
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data};
  if (stack1 = helpers.disabled) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.disabled; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.disabled) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                            <div>\n                                <span class=\"date-value\">";
  if (stack1 = helpers.date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n                                <em class=\"events-counter\"></em>\n\n                                <strong class=\"week-number\">";
  if (stack1 = helpers.week_number) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.week_number; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong>\n\n                                <ul class=\"calendar-items\"></ul>\n                            </div>\n                        </td>\n                    ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return " disabled";
  }

function program6(depth0,data) {
  
  
  return "Loading content";
  }

  buffer += "<ul>\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.elements) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.elements; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.elements) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</ul>";
  return buffer;
  });

this["Handlebars"]["templates"]["calendarWeek"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <td class=\"cell\">\n                        <div>\n                            <span class=\"date-value\">";
  if (stack1 = helpers.date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n                            <em class=\"events-counter\"></em>\n\n                            <ul class=\"calendar-items\"></ul>\n                        </div>\n                    </td>\n                ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "Loading content";
  }

  buffer += "<section class=\"tablet-calendar\">\n    <table class=\"days-container\">\n        <tbody>\n            <tr class=\"row week-row\">\n                ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.days) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.days; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.days) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tr>\n        </tbody>\n    </table>\n\n    <div class=\"overlay\">\n        <em>\n            <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span><br />\n            <img src=\"";
  if (stack1 = helpers.loaderUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.loaderUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n        </em>\n\n    </div>\n</section>";
  return buffer;
  });

this["Handlebars"]["templates"]["calendarWeek_group"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n\n<li id=\"element-view-";
  if (stack1 = helpers.pk) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pk; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.cid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <section class=\"tablet-calendar\">\n        <table class=\"days-container\">\n            <tbody>\n                <tr class=\"row week-row\">\n                    ";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  if (stack1 = helpers.days) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.days; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.days) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </tr>\n            </tbody>\n        </table>\n\n        <div class=\"overlay\">\n            <em>\n                <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span><br />\n                <img src=\"";
  if (stack1 = helpers.loaderUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.loaderUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n            </em>\n        </div>\n    </section>\n</li>\n\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <td class=\"cell\">\n                            <div>\n                                <span class=\"date-value\">";
  if (stack1 = helpers.date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n                                <em class=\"events-counter\"></em>\n\n                                <ul class=\"calendar-items\"></ul>\n                            </div>\n                        </td>\n                    ";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "Loading content";
  }

  buffer += "<ul>\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.elements) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.elements; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.elements) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</ul>";
  return buffer;
  });

this["Handlebars"]["templates"]["comment"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h2>\n    <span>";
  if (stack1 = helpers.commenter) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.commenter; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n</h2>\n<p class=\"message\">";
  if (stack1 = helpers.comment) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.comment; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n<p class=\"time\">";
  if (stack1 = helpers.pub_date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pub_date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>";
  return buffer;
  });

this["Handlebars"]["templates"]["comment_group"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n<li id=\"element-view-";
  if (stack1 = helpers.pk) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pk; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.cid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"comment\">\n    <h2>\n        <span>";
  if (stack1 = helpers.commenter) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.commenter; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </h2>\n    <p class=\"message\">";
  if (stack1 = helpers.comment) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.comment; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n    <p class=\"time\">";
  if (stack1 = helpers.pub_date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pub_date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n</li>\n\n";
  return buffer;
  }

  buffer += "<ul>\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.elements) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.elements; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.elements) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</ul>";
  return buffer;
  });

this["Handlebars"]["templates"]["event"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "hour|hours";
  }

function program3(depth0,data) {
  
  
  return "Created by";
  }

function program5(depth0,data) {
  
  
  return "Assigned";
  }

function program7(depth0,data) {
  
  
  return "Awaiting reply";
  }

function program9(depth0,data) {
  
  
  return "Make a bid";
  }

function program11(depth0,data) {
  
  
  return "Bidding closed";
  }

  buffer += "<div class=\"element-container\">\n    <div class=\"strip\"></div>\n\n    <div class=\"info\">\n        <h2>\n            <span>";
  if (stack1 = helpers.start_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.start_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> – <span>";
  if (stack1 = helpers.end_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.end_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> <em>(";
  if (stack1 = helpers.deltaHours) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.deltaHours; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.i18n || depth0.i18n),stack1 ? stack1.call(depth0, depth0.deltaHours, options) : helperMissing.call(depth0, "i18n", depth0.deltaHours, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ")</em>\n        </h2>\n\n        <h2>\n            <span>";
  if (stack2 = helpers.primaryDepartment) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.primaryDepartment; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span> → <span>";
  if (stack2 = helpers.groupChainName) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.groupChainName; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n        </h2>\n\n        <h3>\n            <span>";
  if (stack2 = helpers.municipality) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.municipality; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n        </h3>\n\n        <h4>\n            <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " ";
  if (stack2 = helpers.creator_name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.creator_name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " ";
  if (stack2 = helpers.creationTime) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.creationTime; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n        </h4>\n    </div>\n\n    <div class=\"buttons\">\n        <div class=\"button-element single type-button\">\n            <div class=\"button-background\">\n                <div></div>\n            </div>\n\n            <div class=\"button-inner label-closed\">\n                <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n            </div>\n\n            <div class=\"button-inner label-open-responses\">\n                <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n            </div>\n\n            <div class=\"button-inner label-open\">\n                <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n            </div>\n\n            <div class=\"button-inner label-bidding-closed\">\n                </i><span>";
  options = {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n            </div>\n        </div>\n    </div>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["eventDetails"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "hour|hours";
  }

function program3(depth0,data) {
  
  
  return "Created by";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <h4>\n            <span>";
  if (stack1 = helpers.comment) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.comment; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        </h4>\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "Bid status";
  }

function program9(depth0,data) {
  
  
  return "Assigned";
  }

function program11(depth0,data) {
  
  
  return "Awaiting reply";
  }

function program13(depth0,data) {
  
  
  return "Make a bid";
  }

function program15(depth0,data) {
  
  
  return "Bidding closed";
  }

  buffer += "<div class=\"element-container\">\n    <div class=\"strip\"></div>\n\n    <div class=\"info\">\n        <h2>\n            <span>";
  if (stack1 = helpers.primaryDepartment) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.primaryDepartment; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> → <span>";
  if (stack1 = helpers.groupChainName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.groupChainName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        </h2>\n\n        <h2>\n            <span>";
  if (stack1 = helpers.start_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.start_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> – <span>";
  if (stack1 = helpers.end_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.end_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> <em>(";
  if (stack1 = helpers.deltaHours) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.deltaHours; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.i18n || depth0.i18n),stack1 ? stack1.call(depth0, depth0.deltaHours, options) : helperMissing.call(depth0, "i18n", depth0.deltaHours, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ")</em>\n        </h2>\n\n        <h3>\n            <span>";
  if (stack2 = helpers.municipality) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.municipality; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n        </h3>\n\n        <h4>\n            <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " ";
  if (stack2 = helpers.creator_name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.creator_name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " ";
  if (stack2 = helpers.creationTime) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.creationTime; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n        </h4>\n\n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
  if (stack2 = helpers.hasComment) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.hasComment; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.hasComment) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n        <div class=\"switcher\">\n            <div class=\"handle\"></div>\n            <div class=\"status\">";
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ":</div>\n        </div>\n\n    </div>\n\n    <div class=\"buttons\">\n        <div class=\"button-element single type-button\">\n            <div class=\"button-background\">\n                <div></div>\n            </div>\n\n            <div class=\"button-inner label-closed\">\n                <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n            </div>\n\n            <div class=\"button-inner label-open-responses\">\n                <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n            </div>\n\n            <div class=\"button-inner label-open\">\n                <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n            </div>\n\n            <div class=\"button-inner label-bidding-closed\">\n                </i><span>";
  options = {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n            </div>\n        </div>\n    </div>\n</div>\n\n<ul class=\"comments\">\n</ul>";
  return buffer;
  });

this["Handlebars"]["templates"]["eventDetailsHeader"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "hour|hours";
  }

  if (stack1 = helpers.start_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.start_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " - ";
  if (stack1 = helpers.end_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.end_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " (";
  if (stack1 = helpers.deltaHours) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.deltaHours; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.i18n || depth0.i18n),stack1 ? stack1.call(depth0, depth0.deltaHours, options) : helperMissing.call(depth0, "i18n", depth0.deltaHours, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ")";
  return buffer;
  });

this["Handlebars"]["templates"]["event_group"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n\n<li id=\"element-view-";
  if (stack1 = helpers.pk) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pk; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.cid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"event element\">\n    <div class=\"element-container\">\n        <div class=\"strip\"></div>\n\n        <div class=\"info\">\n            <h2>\n                <span>";
  if (stack1 = helpers.start_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.start_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> – <span>";
  if (stack1 = helpers.end_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.end_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> <em>(";
  if (stack1 = helpers.deltaHours) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.deltaHours; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.i18n || depth0.i18n),stack1 ? stack1.call(depth0, depth0.deltaHours, options) : helperMissing.call(depth0, "i18n", depth0.deltaHours, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ")</em>\n            </h2>\n\n            <h2>\n                <span>";
  if (stack2 = helpers.primaryDepartment) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.primaryDepartment; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span> → <span>";
  if (stack2 = helpers.groupChainName) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.groupChainName; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n            </h2>\n\n            <h3>\n                <span>";
  if (stack2 = helpers.municipality) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.municipality; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n            </h3>\n\n            <h4>\n                <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " ";
  if (stack2 = helpers.creator_name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.creator_name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " ";
  if (stack2 = helpers.creationTime) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.creationTime; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n            </h4>\n        </div>\n\n        <div class=\"buttons\">\n            <div class=\"button-element single type-button\">\n                <div class=\"button-background\">\n                    <div></div>\n                </div>\n\n                <div class=\"button-inner label-closed\">\n                    <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n                </div>\n\n                <div class=\"button-inner label-open-responses\">\n                    <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n                </div>\n\n                <div class=\"button-inner label-open\">\n                    <span>";
  options = {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n                </div>\n\n                <div class=\"button-inner label-bidding-closed\">\n                    </i><span>";
  options = {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data};
  if (stack2 = helpers.i18n) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0.i18n; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers.i18n) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n                </div>\n            </div>\n        </div>\n    </div>\n</li>\n\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "hour|hours";
  }

function program4(depth0,data) {
  
  
  return "Created by";
  }

function program6(depth0,data) {
  
  
  return "Assigned";
  }

function program8(depth0,data) {
  
  
  return "Awaiting reply";
  }

function program10(depth0,data) {
  
  
  return "Make a bid";
  }

function program12(depth0,data) {
  
  
  return "Bidding closed";
  }

  buffer += "<ul>\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.elements) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.elements; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.elements) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<ul>";
  return buffer;
  });

this["Handlebars"]["templates"]["inactivity"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span class=\"reason\">";
  if (stack1 = helpers.reason) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.reason; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>";
  return buffer;
  });

this["Handlebars"]["templates"]["inactivityEdit"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "Status";
  }

function program3(depth0,data) {
  
  
  return "Date";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <li>\n            <strong>";
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n            <span>";
  if (stack1 = helpers.reason) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.reason; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        </li>\n        ";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "Note";
  }

function program8(depth0,data) {
  
  
  return "Edit";
  }

function program10(depth0,data) {
  
  
  return "Remove";
  }

  buffer += "<div class=\"wireframe\">\n    <div class=\"side-container\">\n        <i class=\"pending icon wait inline\"></i>\n        <i class=\"approved icon checked inline\"></i>\n        <i class=\"not-approved icon unchecked inline\"></i>\n    </div>\n\n    <ul class=\"attributes\">\n        <li>\n            <strong>";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n            <span>";
  if (stack1 = helpers.approved) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.approved; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        </li>\n        <li>\n            <strong>";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n            <span>";
  if (stack1 = helpers.start) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.start; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " – ";
  if (stack1 = helpers.end) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.end; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        </li>\n\n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
  if (stack1 = helpers.isReason) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.isReason; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.isReason) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n\n    <div class=\"edit-button\">\n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n    <div class=\"remove-button\">\n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["inactivityEdit_group"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n\n<li id=\"element-view-";
  if (stack1 = helpers.pk) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pk; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.cid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"working-hour element\">\n    <div class=\"wireframe\">\n        <div class=\"side-container\">\n            <i class=\"pending icon wait inline\"></i>\n            <i class=\"approved icon checked inline\"></i>\n            <i class=\"not-approved icon unchecked inline\"></i>\n        </div>\n\n        <ul class=\"attributes\">\n            <li>\n                <strong>";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n                <span>";
  if (stack1 = helpers.approved) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.approved; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n            </li>\n            <li>\n                <strong>";
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n                <span>";
  if (stack1 = helpers.start) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.start; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " – ";
  if (stack1 = helpers.end) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.end; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n            </li>\n\n            ";
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
  if (stack1 = helpers.isReason) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.isReason; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.isReason) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n\n        <div class=\"edit-button\">\n            ";
  options = {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n\n        <div class=\"remove-button\">\n            ";
  options = {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n</li>\n\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "Status";
  }

function program4(depth0,data) {
  
  
  return "Date";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n            <li>\n                <strong>";
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n                <span>";
  if (stack1 = helpers.reason) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.reason; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n            </li>\n            ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return "Note";
  }

function program9(depth0,data) {
  
  
  return "Edit";
  }

function program11(depth0,data) {
  
  
  return "Remove";
  }

  buffer += "<ul>\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.elements) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.elements; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.elements) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</ul>";
  return buffer;
  });

this["Handlebars"]["templates"]["inactivity_group"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n<li id=\"element-view-";
  if (stack1 = helpers.pk) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pk; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.cid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"inactivity\">\n    <span class=\"reason\">";
  if (stack1 = helpers.reason) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.reason; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n</li>\n\n";
  return buffer;
  }

  buffer += "<ul>\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.elements) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.elements; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.elements) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</ul>";
  return buffer;
  });

this["Handlebars"]["templates"]["notification"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>\n    <h2>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n    <p class=\"message\">";
  if (stack1 = helpers.summary) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.summary; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n    <p class=\"time\">";
  if (stack1 = helpers.timestamp) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.timestamp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n\n    <i class=\"mark\"></i>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["notificationMessage"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"notification-message\">\n    <div class=\"background\"></div>\n    <i class=\"icon-huge ok\"></i>\n    <span>";
  if (stack1 = helpers.text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["notification_group"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n<li id=\"element-view-";
  if (stack1 = helpers.pk) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pk; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.cid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"notification\">\n    <div>\n        <h2>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n        <p class=\"message\">";
  if (stack1 = helpers.summary) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.summary; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n        <p class=\"time\">";
  if (stack1 = helpers.timestamp) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.timestamp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n\n        <i class=\"mark\"></i>\n    </div>\n</li>\n\n";
  return buffer;
  }

  buffer += "<ul>\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.elements) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.elements; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.elements) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</ul>";
  return buffer;
  });

this["Handlebars"]["templates"]["speechResults"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"";
  if (stack1 = helpers.status) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</li>\n";
  return buffer;
  }

  buffer += "<ul class=\"results\">\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.results) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.results; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.results) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>";
  return buffer;
  });

this["Handlebars"]["templates"]["workingHour"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "hour|hours";
  }

  buffer += "<div class=\"element-container\">\n    <div class=\"strip\"></div>\n\n    <div class=\"info\">\n        <h2>\n            <span>";
  if (stack1 = helpers.start_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.start_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> – <span>";
  if (stack1 = helpers.end_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.end_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> <em>(";
  if (stack1 = helpers.deltaHours) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.deltaHours; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.i18n || depth0.i18n),stack1 ? stack1.call(depth0, depth0.deltaHours, options) : helperMissing.call(depth0, "i18n", depth0.deltaHours, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ")</em>\n        </h2>\n\n        <h2>\n            <span>";
  if (stack2 = helpers.available) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.available; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n        </h2>\n    </div>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["workingHourEdit"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "Time";
  }

function program3(depth0,data) {
  
  
  return "to";
  }

function program5(depth0,data) {
  
  
  return "Status";
  }

function program7(depth0,data) {
  
  
  return "Date";
  }

function program9(depth0,data) {
  
  
  return "Repeat";
  }

function program11(depth0,data) {
  
  
  return "Edit";
  }

function program13(depth0,data) {
  
  
  return "Remove";
  }

  buffer += "<div class=\"wireframe\">\n    <div class=\"side-container\">\n        <ul class=\"attributes\">\n            <li>\n                <strong>";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n                <span>";
  if (stack1 = helpers.start_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.start_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  if (stack1 = helpers.end_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.end_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n            </li>\n            <li>\n                <strong>";
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n                <span>";
  if (stack1 = helpers.available) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.available; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n            </li>\n            <li>\n                <strong>";
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n                <span>";
  if (stack1 = helpers.start_date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.start_date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1);
  if (stack1 = helpers.end_date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.end_date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n            </li>\n            <li>\n                <strong>";
  options = {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </strong>\n                <span>";
  if (stack1 = helpers.repeat) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.repeat; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n            </li>\n        </ul>\n    </div>\n\n    <ul class=\"columns weekdays\">\n        <li class=\"weekday\">\n            <i class=\"icon inline unchecked\"></i>\n            <i class=\"icon inline checked\"></i>\n        </li>\n\n        <li class=\"weekday\">\n            <i class=\"icon inline unchecked\"></i>\n            <i class=\"icon inline checked\"></i>\n        </li>\n\n        <li class=\"weekday\">\n            <i class=\"icon inline unchecked\"></i>\n            <i class=\"icon inline checked\"></i>\n        </li>\n\n        <li class=\"weekday\">\n            <i class=\"icon inline unchecked\"></i>\n            <i class=\"icon inline checked\"></i>\n        </li>\n\n        <li class=\"weekday\">\n            <i class=\"icon inline unchecked\"></i>\n            <i class=\"icon inline checked\"></i>\n        </li>\n\n        <li class=\"weekday\">\n            <i class=\"icon inline unchecked\"></i>\n            <i class=\"icon inline checked\"></i>\n        </li>\n\n        <li class=\"weekday\">\n            <i class=\"icon inline unchecked\"></i>\n            <i class=\"icon inline checked\"></i>\n        </li>\n    </ul>\n\n    <div class=\"edit-button\">\n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n    <div class=\"remove-button\">\n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["workingHourEdit_group"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n\n<li id=\"element-view-";
  if (stack1 = helpers.pk) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pk; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.cid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"working-hour element\">\n    <div class=\"wireframe\">\n        <div class=\"side-container\">\n            <ul class=\"attributes\">\n                <li>\n                    <strong>";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n                    <span>";
  if (stack1 = helpers.start_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.start_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  if (stack1 = helpers.end_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.end_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n                </li>\n                <li>\n                    <strong>";
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n                    <span>";
  if (stack1 = helpers.available) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.available; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n                </li>\n                <li>\n                    <strong>";
  options = {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n                    <span>";
  if (stack1 = helpers.start_date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.start_date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1);
  if (stack1 = helpers.end_date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.end_date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n                </li>\n                <li>\n                    <strong>";
  options = {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </strong>\n                    <span>";
  if (stack1 = helpers.repeat) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.repeat; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n                </li>\n            </ul>\n        </div>\n\n        <ul class=\"columns weekdays\">\n            <li class=\"weekday\">\n                <i class=\"icon inline unchecked\"></i>\n                <i class=\"icon inline checked\"></i>\n            </li>\n\n            <li class=\"weekday\">\n                <i class=\"icon inline unchecked\"></i>\n                <i class=\"icon inline checked\"></i>\n            </li>\n\n            <li class=\"weekday\">\n                <i class=\"icon inline unchecked\"></i>\n                <i class=\"icon inline checked\"></i>\n            </li>\n\n            <li class=\"weekday\">\n                <i class=\"icon inline unchecked\"></i>\n                <i class=\"icon inline checked\"></i>\n            </li>\n\n            <li class=\"weekday\">\n                <i class=\"icon inline unchecked\"></i>\n                <i class=\"icon inline checked\"></i>\n            </li>\n\n            <li class=\"weekday\">\n                <i class=\"icon inline unchecked\"></i>\n                <i class=\"icon inline checked\"></i>\n            </li>\n\n            <li class=\"weekday\">\n                <i class=\"icon inline unchecked\"></i>\n                <i class=\"icon inline checked\"></i>\n            </li>\n        </ul>\n\n        <div class=\"edit-button\">\n            ";
  options = {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n\n        <div class=\"remove-button\">\n            ";
  options = {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data};
  if (stack1 = helpers.i18n) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.i18n; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.i18n) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n</li>\n\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "Time";
  }

function program4(depth0,data) {
  
  
  return "to";
  }

function program6(depth0,data) {
  
  
  return "Status";
  }

function program8(depth0,data) {
  
  
  return "Date";
  }

function program10(depth0,data) {
  
  
  return "Repeat";
  }

function program12(depth0,data) {
  
  
  return "Edit";
  }

function program14(depth0,data) {
  
  
  return "Remove";
  }

  buffer += "<ul>\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.elements) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.elements; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.elements) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</ul>";
  return buffer;
  });

this["Handlebars"]["templates"]["workingHour_group"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n\n<li id=\"element-view-";
  if (stack1 = helpers.pk) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pk; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.cid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"working-hour element\">\n    <div class=\"element-container\">\n        <div class=\"strip\"></div>\n\n        <div class=\"info\">\n            <h2>\n                <span>";
  if (stack1 = helpers.start_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.start_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> – <span>";
  if (stack1 = helpers.end_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.end_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> <em>(";
  if (stack1 = helpers.deltaHours) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.deltaHours; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.i18n || depth0.i18n),stack1 ? stack1.call(depth0, depth0.deltaHours, options) : helperMissing.call(depth0, "i18n", depth0.deltaHours, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ")</em>\n            </h2>\n\n            <h2>\n                <span>";
  if (stack2 = helpers.available) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.available; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n            </h2>\n        </div>\n    </div>\n</li>\n\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "hour|hours";
  }

  buffer += "<ul>\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.elements) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.elements; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.elements) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</ul>";
  return buffer;
  });
define("templates", ["handlebars"], function(){});

define('_features/indicator',[], function() {
  return {
    start: function() {
      $(document.body).addClass('loading loading-running');
      return true;
    },
    success: function() {
      $(document.body).removeClass('loading');
      setTimeout((function() {
        return $(document.body).removeClass('loading-running error');
      }), 400);
      return true;
    },
    errorAction: function(url) {
      $(document.body).addClass('error');
      if (typeof url === 'function') {
        url = url();
      }
      return true;
    },
    error: function() {
      $(document.body).addClass('error');
      setTimeout((function() {
        return $(document.body).removeClass('loading');
      }), 800);
      setTimeout((function() {
        return $(document.body).removeClass('loading-running error');
      }), 1200);
      return true;
    }
  };
});

define('_features/localStorageCache',[], function() {
  return {
    _get: function(model, url) {
      var _str;
      if (typeof (_str = localStorage[url]) !== 'undefined') {
        return JSON.parse(localStorage[url]);
      } else {
        return null;
      }
    },
    allowed: function() {
      this.allowed = function() {
        return this._allowed;
      };
      this._allowed = typeof window.localStorage !== 'undefined';
      return this._allowed;
    },
    cache: function(model, url) {
      return localStorage[url] = JSON.stringify(((model instanceof Backbone.Model) || (model instanceof Backbone.Collection) ? model.toJSON() : model));
    },
    init: function(model, url) {
      if (model.initializeEmpty === true) {
        if (typeof localStorage[url] === 'undefined') {
          if (model instanceof Backbone.Model) {
            localStorage[url] = "{}";
          } else if (model instanceof Backbone.Collection) {
            localStorage[url] = "[]";
          }
        }
      }
      return true;
    },
    reset: function(model, url, options) {
      var _value;
      _value = this._get(model, url);
      if (_value !== null) {
        (model instanceof Backbone.Model ? model.set : model instanceof Backbone.Collection ? model.add : void 0).call(model, _value);
        options.resp = _value;
        return true;
      } else {
        return false;
      }
    }
  };
});

if (typeof window.ovivo === 'undefined') {
  window.ovivo = {};
}

if (typeof window.ovivo.desktop === 'undefined') {
  window.ovivo.desktop = {};
}

Date.parse = (function() {
  var _parse, _processors;
  _parse = Date.parse;
  _processors = [
    {
      regExp: /^\s*(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d).*Z\s*$/,
      processor: function(str) {
        var date, month, parts;
        parts = str.match(this.regExp);
        date = new Date(NaN);
        month = +parts[2];
        date.setUTCFullYear(parts[1], month - 1, parts[3]);
        date.setUTCHours(parts[4]);
        date.setUTCMinutes(parts[5]);
        date.setUTCSeconds(parts[6]);
        if (month !== date.getMonth() + 1) {
          date.setTime(NaN);
        }
        return date;
      }
    }, {
      regExp: /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
      processor: function(str) {
        var day, match, month, year, _ref;
        _ref = str.match(this.regExp), match = _ref[0], year = _ref[1], month = _ref[2], day = _ref[3];
        return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
      }
    }, {
      regExp: /^(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d).(\d\d\d\d\d\d)$/,
      processor: function(str) {
        var _day, _hours, _milliseconds, _minutes, _month, _ref, _ref1, _seconds, _year;
        _ref = str.match(this.regExp).slice(1), _year = _ref[0], _month = _ref[1], _day = _ref[2], _hours = _ref[3], _minutes = _ref[4], _seconds = _ref[5], _milliseconds = _ref[6];
        _ref1 = [parseInt(_year), parseInt(_month), parseInt(_day), parseInt(_hours), parseInt(_minutes), parseInt(_seconds), parseInt(_milliseconds)], _year = _ref1[0], _month = _ref1[1], _day = _ref1[2], _hours = _ref1[3], _minutes = _ref1[4], _seconds = _ref1[5], _milliseconds = _ref1[6];
        return new Date(_year, _month - 1, _day, _hours, _minutes, _seconds, _milliseconds);
      }
    }
  ];
  return function(str) {
    var _obj;
    _obj = _.find(_processors, function(obj) {
      return obj.regExp.test(str);
    });
    if (typeof _obj !== 'undefined') {
      return _obj.processor(str);
    } else {
      return _parse(str);
    }
  };
})();

Handlebars.registerHelper('i18n', function(value, options) {
  var _plural, _ref, _singular, _value;
  if (value === void 0) {
    value = options;
  }
  if (typeof value === 'function') {
    _value = value.call(this);
    _ref = options.fn().split('|'), _singular = _ref[0], _plural = _ref[1];
    return ngettext(_singular, _plural, _value);
  } else {
    return gettext(value.fn());
  }
});

ovivo.Y = function(f) {
  return (function(g) {
    return function(a, b) {
      return f(g(g))(a, b);
    };
  })(function(g) {
    return function(a, b) {
      return f(g(g))(a, b);
    };
  });
};

window.onerror = function() {
  return window.localStorage.clear();
};

ovivo.parseBoolean = function(str) {
  if (typeof str === 'boolean') {
    return str;
  }
  if (typeof str !== 'string') {
    return Boolean(str);
  }
  str = str.toLowerCase();
  if (str === 'false') {
    return false;
  }
  if (str === 'true') {
    return true;
  }
  return Boolean(str);
};

requirejs(['_features/indicator', '_features/localStorageCache'], function(indicator, localStorageCache) {
  return (function() {
    var _callbackCreatorCreator, _callsCounter, _errorCreator, _postProcess, _processFlag, _processLocalStorageCache, _processReadSuccess, _queue, _queueRules, _successCreator, _sync;
    _sync = Backbone.sync;
    _callsCounter = 0;
    _processFlag = false;
    _queue = {
      'read': [],
      'update': [],
      'delete': [],
      'create': []
    };
    _queueRules = {
      'read': false,
      'update': true,
      'delete': false,
      'create': false
    };
    _callbackCreatorCreator = function(action, done) {
      return function(originalCallback, method, model, options) {
        return function(model, resp) {
          var _curObj, _nextObj, _res;
          _callsCounter -= 1;
          if (typeof (_res = action(options._url, model, resp, method, options)) === 'object') {
            resp = _res;
          }
          if (_queueRules[method] === true) {
            _curObj = _queue[method].shift();
            _nextObj = _queue[method][0];
            if (model._syncStamp !== _curObj.stamp) {
              resp = {};
            }
            if (_queue[method].length > 0) {
              _sync.apply(_nextObj.context, _nextObj.args);
            }
          }
          if (_callsCounter === 0) {
            done();
          }
          return originalCallback != null ? originalCallback.apply(this, Array.prototype.slice.call(arguments, 0)) : void 0;
        };
      };
    };
    _processReadSuccess = function(url, model, resp, options) {
      if (model.preProcessJSON != null) {
        resp = model.preProcessJSON(resp);
      }
      localStorageCache.cache(resp, url);
      if ((model instanceof Backbone.Collection) && (resp instanceof Array)) {
        if (model.fullResponse === true) {
          _.each(_.without.apply(_, [model.pluck('pk')].concat(_.pluck(resp, 'pk'))), function(pk) {
            var _model;
            _model = model.get(pk);
            return model.remove(_model);
          });
        }
        _.each(resp, function(obj, i) {
          var _model;
          if ((_model = model.get(obj.pk)) != null) {
            _model.set(obj, {
              cache_update: true
            });
            return delete resp[i];
          }
        });
        resp = _.compact(resp);
      }
      return resp;
    };
    _successCreator = _callbackCreatorCreator((function(url, model, resp, method, options) {
      if (method === 'read') {
        return _processReadSuccess(url, model, resp, options);
      }
    }), indicator.success);
    _errorCreator = _callbackCreatorCreator((function(url, model, resp, method, options) {
      ovivo.desktop.resources.apiErrors.addError(url, model, resp, method, options);
      return indicator.errorAction();
    }), indicator.error);
    _postProcess = function(method, model, options) {
      if (((method === 'update') || (method === 'delete')) && typeof model.url === 'function') {
        model.url = model.url() + '/';
        model.url = model.url.replace('//', '/');
      }
      if (method === 'delete') {
        options.data = ' ';
      }
      return true;
    };
    _processLocalStorageCache = function(model, options) {
      var _ref;
      if (localStorageCache.allowed() === true) {
        if (localStorageCache.reset(model, options._url, options) === true) {
          if ((_ref = model.def) != null) {
            _ref.resolve(options.resp);
          }
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    };
    return Backbone.sync = function(method, model, options) {
      var _args, _call, _flag, _resp,
        _this = this;
      if (model.localStorageOnly !== true) {
        _callsCounter += 1;
      }
      _args = Array.prototype.slice.call(arguments, 0);
      options._url = ((function() {
        if (typeof model.url === 'function') {
          return model.url();
        } else {
          return model.url;
        }
      })()) + ((options.data != null) && (options.data !== '') ? "?" + options.data : '');
      _flag = method === 'read' ? _processLocalStorageCache(model, options) : model.localStorageOnly === true ? (_resp = model.toJSON(), method === 'create' ? _resp.pk = Date.now().valueOf() : void 0, options.success(model, _resp, options), model.trigger('sync', model, _resp, options), false) : true;
      _call = function() {
        var _stamp;
        _stamp = (new Date()).valueOf().toString() + _callsCounter.toString();
        model._syncStamp = _stamp;
        options.success = _successCreator.apply(null, [options.success].concat(_args));
        options.error = _errorCreator.apply(null, [options.error].concat(_args));
        _postProcess.apply(this, _args);
        indicator.start();
        if (_queueRules[method] === true) {
          _queue[method].push({
            stamp: _stamp,
            context: this,
            args: _args
          });
        }
        if ((_queueRules[method] === true) && (_queue[method].length === 1) || (_queueRules[method] === false)) {
          return _sync(method, model, options);
        } else {
          return true;
        }
      };
      if (model.localStorageOnly !== true) {
        if (_flag === true) {
          return _call.call(this);
        } else {
          return setTimeout((function() {
            return _call.call(_this);
          }), 300);
        }
      }
    };
  })();
});

if (window.ovivo == null) {
  window.ovivo = {};
}

if (!window.ovivo.config) {
  window.ovivo.config = {};
}

ovivo.config.API_URL_PREFIX = '/api/1.0/';

ovivo.config.API_URL_PREFIX_REGEXP = '\\/api\\/1\\.0';

ovivo.config.MONTHS = [gettext('January'), gettext('February'), gettext('March'), gettext('April'), gettext('May'), gettext('June'), gettext('July'), gettext('August'), gettext('September'), gettext('October'), gettext('November'), gettext('December')];

ovivo.config.DAYS = [gettext('Sunday'), gettext('Monday'), gettext('Tuesday'), gettext('Wednesday'), gettext('Thursday'), gettext('Friday'), gettext('Saturday'), gettext('Sunday')];

ovivo.config.DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

ovivo.config.HELP_URL = 'http://ovivo.desk.com';

ovivo.config.VALIDATION_REGEXP_TIME = /^(((\d\d):(\d\d))|((\d\d)\.(\d\d))|((\d\d)(\d\d)))$/;

ovivo.config.ANIMATION_END = (function() {
  var _animation;
  if ((_animation = Modernizr.prefixed('animation')) === false) {
    return false;
  }
  if (_animation === 'animation') {
    return 'animationend';
  }
  return (_animation + "End").replace(/^ms/, "MS").replace(/^Webkit/, "webkit").replace(/^Moz.*/, "animationend");
})();

if (ovivo._config != null) {
  ovivo.config = _.extend(ovivo.config, ovivo._config);
}
;
define("ovivo", ["templates"], function(){});

define('_common/ToolsBase',['ovivo'], function() {
  return {
    localStorageCacheFunc: function(funcName, func) {
      if (typeof window.localStorage === 'undefined') {
        return func;
      } else {
        return function() {
          var _args, _cached, _key, _res;
          _args = Array.prototype.slice.call(arguments, 0);
          _key = funcName + '-' + _.reduce(_args, (function(str, arg) {
            return str + '-' + arg;
          }), '').slice(1);
          if ((_cached = localStorage[_key]) != null) {
            return $.when(_cached);
          } else {
            _res = func.apply(this, _args);
            return $.when(_res).done(function(res) {
              return localStorage[_key] = res;
            });
          }
        };
      }
    },
    proxyCall: function(methodName, args) {
      var _args, _tail;
      _args = Array.prototype.slice.call(args, 0);
      _tail = Array.prototype.slice.call(arguments, 2);
      _args = _tail.concat(_args);
      return this._base.prototype[methodName].apply(this, _args);
    },
    once: function(funcName, func) {
      var _flagPropertyName;
      _flagPropertyName = "_callFlag-" + funcName;
      return function() {
        if (this[_flagPropertyName] !== true) {
          this[_flagPropertyName] = true;
          return func.apply(this, Array.prototype.slice.call(arguments, 0));
        } else {
          return void 0;
        }
      };
    },
    throttle: function(func, limit) {
      var _prevCall, _timeout;
      _prevCall = 0;
      _timeout = null;
      return function() {
        var _args, _this;
        _this = this;
        _args = Array.prototype.slice.call(arguments, 0);
        if (_timeout === null) {
          _timeout = setTimeout((function() {
            _timeout = null;
            return func.apply(_this, _args);
          }), limit);
        }
        return true;
      };
    },
    throttleGroup: function(funcName, groupFuncName, limit) {
      var _processGroupCall;
      _processGroupCall = function() {
        this[groupFuncName](this.common.calls);
        return delete this.common.timer;
      };
      return function() {
        var _args;
        _args = Array.prototype.slice.call(arguments, 0);
        if (this.doNotThrottleGroup === true) {
          return this["_" + funcName].apply(this, _args);
        } else if (typeof this.common.timer === 'undefined') {
          this["_" + funcName].apply(this, _args);
          this.common.calls = [];
          return this.common.timer = setTimeout(_.bind(_processGroupCall, this), 50);
        } else {
          return this.common.calls.push({
            ctx: this,
            args: _args
          });
        }
      };
    }
  };
});

define('models/resources/ResourceBase',['_common/ToolsBase', 'ovivo'], function(ToolsBase) {
  var _Base;
  _Base = Backbone.Model.extend(_.extend({}, ToolsBase, {
    idAttribute: 'pk',
    createGetters: ToolsBase.once('createGetters', function() {
      var _this = this;
      return _.each(this._gettersNames, function(name) {
        if (_this.constructor.prototype[name] == null) {
          return _this.constructor.prototype[name] = function() {
            return this.get(name);
          };
        }
      });
    }),
    addDay: function(day) {
      return this.calendarDays[day.cid] = day;
    },
    addDays: function(days) {
      return this.calendarDays = this.calendarDays.concat(days);
    },
    removeDay: function(day) {
      return delete this.calendarDays[day.cid];
    },
    getView: function() {
      return new this.View({
        model: this
      });
    },
    highlight: function() {
      var _this = this;
      return _.each(_.values(this.calendarDays), function(day) {
        return day.highlight(_this);
      });
    },
    removeHighlight: function() {
      var _this = this;
      return _.each(_.values(this.calendarDays), function(day) {
        return day.removeHighlight(_this);
      });
    },
    initialize: function(attrs, options) {
      this.calendarDays = {};
      this.createGetters();
      if (this.View != null) {
        this.view = new this.View({
          model: this
        });
      }
      return true;
    },
    setValue: function(name, value) {
      return this.set(name, value);
    }
  }));
  _Base.prototype._base = _Base;
  return _Base;
});

define('_features/trailZero',[], function() {
  return function(str) {
    return ("0" + str).slice(-2);
  };
});

define('_features/dateFormatter',['_features/trailZero', 'ovivo'], function(trailZero) {
  var NORMAL_DATE_RANGE, TIME_TITLES;
  TIME_TITLES = [[-10800000, gettext('just now')], [0, gettext('just now')], [1000, gettext('a second ago')], [60000, gettext('a minute ago')], [180000, gettext('few minutes ago')], [3600000, gettext('an hour ago')], [7200000, gettext('few hours ago')]];
  NORMAL_DATE_RANGE = 10800000;
  return function(date) {
    var delta, returnValue;
    if ((date instanceof Date) !== true) {
      date = new Date(Date.parse(date));
    }
    delta = (new Date()) - date + date.getTimezoneOffset() * 60 * 1000 + ovivo.config.TIMEZONE_OFFSET;
    if (delta > NORMAL_DATE_RANGE) {
      return "" + (ovivo.config.DAYS[date.getDay()].toLowerCase().slice(0, 1)) + ". " + (date.getDate()) + ". " + ovivo.config.MONTHS[date.getMonth()] + " " + (date.getFullYear()) + " " + (trailZero(date.getHours())) + ":" + (trailZero(date.getMinutes()));
    } else {
      returnValue = '';
      _.each(TIME_TITLES, function(title) {
        if (delta > title[0]) {
          return returnValue = title[1];
        }
      });
      return returnValue;
    }
  };
});

define('views/resources/ResourceBase',['_common/ToolsBase', 'ovivo'], function(ToolsBase) {
  var _Base;
  _Base = Backbone.View.extend(_.extend({}, ToolsBase, {
    _render: function() {
      this.$el.html(this.template(this));
      if (this.model.view == null) {
        this.model.view = this;
      }
      if (this.postRender != null) {
        this.postRender();
      }
      this.model.trigger('rendered');
      return true;
    },
    highlight: function() {
      return this.$el.addClass('highlight');
    },
    removeHighlight: function() {
      return this.$el.removeClass('highlight');
    },
    events: {},
    processRemove: function() {
      return this.model.destroy();
    },
    exposeAttrs: ToolsBase.once('exposeAttrs', function() {
      var _this = this;
      return _.each(this.model._gettersNames, function(name) {
        if (_this.constructor.prototype[name] == null) {
          return _this.constructor.prototype[name] = function() {
            return this.model[name]();
          };
        }
      });
    }),
    render: ToolsBase.throttleGroup('render', 'renderGroup', 50),
    _renderOnChange: function() {
      var _changed;
      if ((this._ignoreRender != null) && ((_changed = _.keys(this.model.changed)).length > 0) && (_.intersection(this._ignoreRender, _changed).length > 0)) {
        return;
      }
      return this.render.apply(this, arguments);
    },
    renderGroup: function(views) {
      var _DOM, _hash;
      views = _.pluck(views, 'ctx');
      _hash = {};
      views = _.filter(views, function(view) {
        if (_hash[view.cid] !== true) {
          _hash[view.cid] = true;
          return true;
        } else {
          return false;
        }
      });
      _DOM = $(this.groupTemplate({
        elements: views
      }));
      _.each(views, function(view) {
        var _elements;
        _elements = $('#element-view-' + view.model.pk() + '-' + view.cid, _DOM);
        view.$el.children().remove();
        view.$el.append(_elements.children());
        if (view.model.view == null) {
          view.model.view = this;
        }
        if (view.postRender != null) {
          view.postRender();
        }
        view.model.trigger('rendered');
        return true;
      });
      if (this.groupRenderComplete != null) {
        return this.groupRenderComplete();
      }
    },
    stopPropagation: function(e) {
      e.stopPropagation();
      return false;
    },
    _processRemove: function() {
      return this.remove();
    },
    initialize: function() {
      this.exposeAttrs();
      this.render();
      this.model.on('change', this._renderOnChange, this);
      this.model.on('remove', this._processRemove, this);
      return true;
    }
  }));
  _Base.prototype._base = _Base;
  return _Base;
});

define('views/resources/Comment',['_features/dateFormatter', 'views/resources/ResourceBase', 'ovivo'], function(dateFormatter, ResourceBase) {
  return ResourceBase.extend({
    common: {},
    tagName: 'li',
    className: 'comment',
    template: Handlebars.templates['comment'],
    groupTemplate: Handlebars.templates['comment_group'],
    pub_date: function() {
      var _pub_date;
      if ((_pub_date = this.model.pub_date()) != null) {
        return dateFormatter(this.model.pub_date());
      } else {
        return '';
      }
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('models/resources/Comment',['models/resources/ResourceBase', 'views/resources/Comment', 'ovivo'], function(ResourceBase, View) {
  return ResourceBase.extend({
    _gettersNames: ['commenter', 'pub_date', 'comment', 'reply_to', 'pk'],
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('_common/ResourceManagerBase',['_features/localStorageCache', '_common/ToolsBase', 'ovivo'], function(localStorageCache, ToolsBase) {
  return {
    _fetchSuccess: function() {
      return true;
    },
    _fetchError: function() {
      return this.def.reject();
    },
    _syncHandler: function() {
      return this.def.resolve();
    },
    _getQueryString: function(data) {
      return _.reduce(data, (function(memo, value, key) {
        return "" + memo + "&" + key + "=" + value;
      }), '');
    },
    initFetch: function() {
      return this._fetch();
    },
    _fetch: function(data) {
      var _queryStringFinal;
      _queryStringFinal = (this._getQueryString(data)).slice(1);
      this.fetch({
        update: true,
        remove: false,
        data: _queryStringFinal,
        error: _.bind(this._fetchError, this),
        success: _.bind(this._fetchSuccess, this)
      });
      return this.def;
    },
    setValue: function(name, value) {
      var _model;
      if (this instanceof Backbone.Model) {
        this.set(name, value);
      } else if (this instanceof Backbone.Collection) {
        _model = this.get(parseInt(name.split('-')[1]));
        _model.set('checked', !value);
        _model.save();
      }
      return true;
    },
    processModelChange: function(model, obj) {
      if (this._checkIfIgnore(model) === true) {
        return true;
      }
      if ((model.editCopy !== true) && (model.url != null) && (model.changed.pk == null) && (model.id != null) && (obj.socket_io !== true) && (obj.cache_update !== true) && (obj.update !== true)) {
        model.save();
      }
      return true;
    },
    _checkIfIgnore: function(model) {
      var _changed, _i;
      if (this._ignoreChange instanceof Array) {
        _i = 0;
        _changed = _.keys(model.changed);
        while (_i < _changed.length) {
          if (_.indexOf(this._ignoreChange, _changed[_i]) === -1) {
            return false;
          }
          _i += 1;
        }
        return true;
      } else {
        return false;
      }
    },
    cache: function() {
      return localStorageCache.cache(this, this._url);
    },
    changeCacheHandler: function(model) {
      if ((this._checkIfIgnore(model) === true) || (model.editCopy === true)) {
        return true;
      }
      return localStorageCache.cache(this, this._url);
    },
    attachProcessors: function() {
      if (this instanceof Backbone.Model) {
        this.on('change', this.changeCacheHandler, this);
        this.on('change', this.processModelChange, this);
      } else if (this instanceof Backbone.Collection) {
        this.on('add', this.cache, this);
        this.on('remove', this.cache, this);
        this.on('change', this.changeCacheHandler, this);
        this.on('change', this.processModelChange, this);
      }
      return true;
    },
    initResource: function() {
      var _this = this;
      this._url = (function() {
        if (typeof _this.url === 'function') {
          return _this.url();
        } else {
          return _this.url;
        }
      })();
      this.def = new $.Deferred();
      this.def.done(function() {
        return _this.attachProcessors();
      });
      this.on('sync', this._syncHandler, this);
      if (localStorageCache.allowed() === true) {
        localStorageCache.init(this, this._url);
      }
      return true;
    }
  };
});

define('collections/resources/Comments',['models/resources/Comment', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    url: function() {
      return "" + ovivo.config.API_URL_PREFIX + "events/" + this.event.id + "/comments/";
    },
    initialize: function(models, options) {
      _.extend(this, options);
      this.initResource();
      return true;
    }
  }));
});

define('_features/notificationMessage',['ovivo'], function() {
  var _template;
  _template = Handlebars.templates['notificationMessage'];
  return {
    post: function(selector, text) {
      var _message;
      _message = $(_template({
        text: text
      }));
      $(selector).append(_message);
      return setTimeout((function() {
        return _message.fadeOut(300, function() {
          return _message.remove();
        });
      }), 1000);
    }
  };
});

define('views/resources/Event',['_features/trailZero', '_features/notificationMessage', '_common/ToolsBase', 'views/resources/ResourceBase', 'ovivo'], function(trailZero, notificationMessage, ToolsBase, ResourceBase) {
  return ResourceBase.extend({
    common: {},
    tagName: 'li',
    className: 'event element',
    template: Handlebars.templates['event'],
    groupTemplate: Handlebars.templates['event_group'],
    events: {
      'click': 'processClick',
      'click .type-button': 'changeType'
    },
    _ignoreRender: ['has_applied', 'type'],
    processClick: function(e) {
      ovivo.desktop.routers.main.navigate("/events/" + this.model.id + "/", {
        trigger: true
      });
      e.stopPropagation();
      return false;
    },
    groupRenderComplete: function() {},
    group: function() {
      var _ref;
      return (_ref = ovivo.desktop.resources.groups.get(this.model.group())) != null ? _ref.name() : void 0;
    },
    groupChainName: function() {
      var _ref;
      return (_ref = ovivo.desktop.resources.groups.get(this.model.group())) != null ? _ref.chainName() : void 0;
    },
    primaryDepartment: function() {
      var _ref, _ref1;
      return (_ref = ovivo.desktop.resources.primaryDepartments.get((_ref1 = ovivo.desktop.resources.groups.get(this.model.group())) != null ? _ref1.primary_department() : void 0)) != null ? _ref.name() : void 0;
    },
    municipality: function() {
      var _ref, _ref1, _ref2;
      return (_ref = ovivo.desktop.resources.municipalities.get((_ref1 = ovivo.desktop.resources.primaryDepartments.get((_ref2 = ovivo.desktop.resources.groups.get(this.model.group())) != null ? _ref2.primary_department() : void 0)) != null ? _ref1.municipality() : void 0)) != null ? _ref.name() : void 0;
    },
    isClosed: function() {
      return this.type() === 'closed';
    },
    isOpen: function() {
      return this.type() === 'open';
    },
    isOpenResponses: function() {
      return this.type() === 'open-responses';
    },
    day: function() {
      return ovivo.config.DAYS[this.model.pub_date().getDay()].toLowerCase().slice(0, 1);
    },
    date: function() {
      return this.model.pub_date().getDate();
    },
    month: function() {
      return ovivo.config.MONTHS[this.model.pub_date().getMonth()];
    },
    year: function() {
      return this.model.pub_date().getFullYear();
    },
    time: function() {
      return this.model.pub_date().getHours() + ':' + this.model.pub_date().getMinutes();
    },
    creationTime: function() {
      var _date, _value;
      _value = this.model.pub_date();
      if (_value !== void 0) {
        _date = new Date(Date.parse(_value));
        return "" + (ovivo.config.DAYS[_date.getDay()].toLowerCase().slice(0, 1)) + ". " + (_date.getDate()) + ". " + ovivo.config.MONTHS[_date.getMonth()] + " " + (_date.getFullYear()) + " " + (trailZero(_date.getHours())) + ":" + (trailZero(_date.getMinutes()));
      } else {
        return '';
      }
    },
    startDateFormated: function() {
      var _date;
      _date = new Date(Date.parse(this.model.start_date()));
      return "" + (ovivo.config.DAYS[_date.getDay()].toLowerCase()) + ", " + (_date.getDate()) + ". " + ovivo.config.MONTHS[_date.getMonth()];
    },
    changeType: function(e) {
      if ((this._isActual() === true) && (this.type() !== 'closed')) {
        this.model.switchType();
      }
      return this.stopPropagation(e);
    },
    _isActual: function() {
      var _date, _now;
      _date = Date.parse(this.start_date());
      _now = new Date();
      _now = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate());
      if (_now > _date) {
        return false;
      } else {
        return true;
      }
    },
    _biddingClosed: function() {
      var _date, _now;
      _date = Date.parse(this.model.get('start_date'));
      _now = new Date();
      _now = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate());
      if ((_now > _date) && (this.model.get('type') !== 'closed')) {
        return true;
      } else {
        return false;
      }
    },
    hasComment: function() {
      var _comment;
      _comment = this.comment();
      return (typeof _comment === 'string') && (_comment !== '');
    },
    postRender: function() {
      this.$('.element-container').removeClass('open open-responses closed bidding-closed non-actual').addClass(this.type());
      if (this._biddingClosed() === true) {
        this.$('.element-container').addClass('bidding-closed');
      }
      if (this._isActual() !== true) {
        this.$('.element-container').addClass('non-actual');
      }
      return true;
    },
    processTypeChange: function() {
      return this.postRender();
    },
    initialize: function() {
      this.model.setDeltaHours();
      this.model.on('change:type', this.processTypeChange, this);
      this.biddingClosed = this._biddingClosed();
      this.proxyCall('initialize', arguments);
      if ((ovivo.desktop.resources.groups.def.state() !== 'resolved') || (ovivo.desktop.resources.municipalities.def.state() !== 'resolved') || (ovivo.desktop.resources.primaryDepartments.def.state() !== 'resolved')) {
        $.when(ovivo.desktop.resources.groups.def, ovivo.desktop.resources.municipalities.def, ovivo.desktop.resources.primaryDepartments.def).then(_.bind(this.render, this));
      }
      return true;
    }
  });
});

define('views/resources/EventDetails',['views/resources/Event', 'ovivo'], function(Event) {
  return Event.extend({
    tagName: 'div',
    doNotThrottleGroup: true,
    events: _.extend({}, Event.prototype.events, {
      'click .switcher': 'changeType'
    }),
    render: function() {
      var _comments;
      _comments = this.$('ul.comments').children();
      this.proxyCall('render', arguments);
      this.$('ul.comments').append(_comments);
      return true;
    },
    template: Handlebars.templates['eventDetails']
  });
});

define('models/resources/Event',['models/resources/ResourceBase', 'collections/resources/Comments', 'views/resources/Event', 'views/resources/EventDetails', '_features/notificationMessage', 'ovivo'], function(ResourceBase, Comments, View, DetailsView, notificationMessage) {
  return ResourceBase.extend({
    typeName: 'event',
    _gettersNames: ['pk', 'comment', 'start_time', 'has_applied', 'skill', 'group', 'num_comments', 'response_deadline', 'end_time', 'type', 'start_date', 'deltaHours', 'pub_date', 'creator_name', 'start_time_hours', 'start_time_minutes', 'end_time_hours', 'end_time_minutes'],
    start_time_hours: function() {
      var _ref;
      return (_ref = this.start_time()) != null ? _ref.split(':')[0] : void 0;
    },
    start_time_minutes: function() {
      var _ref;
      return (_ref = this.start_time()) != null ? _ref.split(':')[1] : void 0;
    },
    end_time_hours: function() {
      var _ref;
      return (_ref = this.end_time()) != null ? _ref.split(':')[0] : void 0;
    },
    end_time_minutes: function() {
      var _ref;
      return (_ref = this.end_time()) != null ? _ref.split(':')[1] : void 0;
    },
    getKey: function() {
      var date, month, year, _ref, _ref1;
      if (this.key != null) {
        return this.key;
      } else {
        _ref = this.start_date().split('-'), year = _ref[0], month = _ref[1], date = _ref[2];
        _ref1 = [parseInt(year), parseInt(month) - 1, parseInt(date)], year = _ref1[0], month = _ref1[1], date = _ref1[2];
        return this.key = "" + year + "-" + month + "-" + date;
      }
    },
    setDeltaHours: (function() {
      var _getMinutes;
      _getMinutes = function(str) {
        var hours, minutes, _ref, _ref1;
        _ref = _.compact(ovivo.config.VALIDATION_REGEXP_TIME.exec(str)).slice(-2), hours = _ref[0], minutes = _ref[1];
        _ref1 = [parseInt(hours), parseInt(minutes)], hours = _ref1[0], minutes = _ref1[1];
        return hours * 60 + minutes;
      };
      return function() {
        var _delta, _end, _start;
        _end = _getMinutes(this.end_time());
        _start = _getMinutes(this.start_time());
        if (_start <= _end) {
          _delta = (_end - _start) / 60;
        } else {
          _delta = (_end - _start) / 60 + 24;
        }
        return this.set('deltaHours', Math.round(_delta));
      };
    })(),
    switchType: function() {
      this.set('has_applied', !this.has_applied());
      return true;
    },
    createDetailsView: function() {
      if (this.detailsView == null) {
        this.detailsView = new DetailsView({
          model: this
        });
        this.comments.initFetch();
      }
      return true;
    },
    changeApplicationStatus: function(model, flag, obj) {
      if ((this.previous('has_applied') !== void 0) && (obj.fetching !== true) && (obj.socket_io !== true) && (obj.cache_update !== true)) {
        return this.save();
      }
    },
    processSync: function(event, events, options) {
      var _text;
      _text = event.has_applied() === true ? gettext('Your bid has now been received') : gettext('Your bid has been removed');
      if (options.fetching !== true) {
        return notificationMessage.post(ovivo.desktop.pages.calendar.view.$el, _text);
      }
    },
    initialize: function(attrs, options) {
      this.comments = new Comments([], {
        event: this
      });
      this.View = View;
      this.proxyCall('initialize', arguments);
      this.on('change:has_applied', this.changeApplicationStatus, this);
      this.on('sync', this.processSync, this);
      return true;
    }
  });
});

define('routers/main',['models/resources/Event', 'ovivo'], function(Event) {
  var _Router;
  _Router = Backbone.Router.extend({
    routes: {
      'events/:pk/': 'showEvent'
    },
    showEvent: function(pk) {
      var _def, _model;
      _model = ovivo.desktop.resources.events.get(pk);
      _def = (function() {
        if (_model === void 0) {
          _model = new Event({
            pk: pk
          });
          _model.url = "" + ovivo.config.API_URL_PREFIX + "users/" + ovivo.config.USER_ID + "/events/" + pk + "/";
          return _model.fetch({
            fetching: true
          });
        } else {
          return true;
        }
      })();
      return $.when(_def).then(function() {
        ovivo.desktop.resources.events.add(_model);
        _model.createDetailsView();
        ovivo.desktop.pages.eventDetails.set('event', _model);
        return ovivo.desktop.pages.eventDetails.view.showEl();
      });
    },
    initialize: function() {
      return true;
    }
  });
  return new _Router();
});

define('models/resources/User',['models/resources/ResourceBase', '_common/ResourceManagerBase', 'ovivo'], function(ResourceBase, ResourceManagerBase) {
  return ResourceBase.extend(_.extend({}, ResourceManagerBase, {
    name: 'user',
    url: function() {
      return "" + ovivo.config.API_URL_PREFIX + "users/" + ovivo.config.USER_ID + "/";
    },
    standaloneModel: true,
    _gettersNames: ['first_name', 'last_name', 'groups', 'skills', 'email', 'email_confirmed', 'mobile_phone_prefix', 'mobile_phone'],
    toJSON: function() {
      var _json;
      _json = Backbone.Model.prototype.toJSON.call(this);
      delete _json.groups;
      delete _json.skills;
      return _json;
    },
    initialize: function(attrs, options) {
      this.initResource();
      this.proxyCall('initialize', arguments);
      return true;
    }
  }));
});

define('models/resources/Communication',['models/resources/ResourceBase', '_common/ResourceManagerBase', 'ovivo'], function(ResourceBase, ResourceManagerBase) {
  return ResourceBase.extend(_.extend({}, ResourceManagerBase, {
    name: 'communication',
    url: function() {
      return "" + ovivo.config.API_URL_PREFIX + "users/" + ovivo.config.USER_ID + "/communication/";
    },
    standaloneModel: true,
    _gettersNames: ['event_urgent_within', 'activity_digest', 'response_confirmation', 'send_event_compilation_at', 'event_reminders', 'notify_sms', 'notify_email'],
    initialize: function(attrs, options) {
      this.initResource();
      this.proxyCall('initialize', arguments);
      this.id = 1;
      return true;
    }
  }));
});

define('_common/AnimationControl',[], function() {
  return {
    _attachHandlers: (function() {
      var _animationEnd;
      _animationEnd = function($el) {
        var _handler;
        _handler = function() {
          return $el.off(ovivo.config.ANIMATION_END, _handler);
        };
        return _handler;
      };
      return function($el) {
        return $el.on(ovivo.config.ANIMATION_END, _animationEnd($el));
      };
    })(),
    _attachHandler: function(handler) {
      return this.$el.on(ovivo.config.ANIMATION_END, this._wrapHanlder(handler, this.$el));
    },
    _wrapHanlder: function(handler) {
      var _argsOutter, _handler;
      _argsOutter = Array.prototype.slice.call(arguments, 1);
      return _handler = function() {
        var _args;
        _args = Array.prototype.slice.call(arguments, 0);
        return handler.apply(this, [_handler].concat(_argsOutter).concat(_args));
      };
    }
  };
});

define('views/popups/Popup',['_common/AnimationControl', 'ovivo'], function(AnimationControl) {
  var _Popup, _counter, _overlayClickHandler;
  _counter = 0;
  _Popup = Backbone.View.extend(_.extend({}, AnimationControl, {
    events: {
      'click .close': 'close'
    },
    close: function() {
      return this.hide();
    },
    _addShownState: function() {
      return ovivo.desktop.popups.shown[this.cid] = this;
    },
    _removeShownState: function() {
      return delete ovivo.desktop.popups.shown[this.cid];
    },
    show: function() {
      _counter += 1;
      this._addShownState();
      this.$el.show();
      return $('.popup-overlay').show();
    },
    hide: function() {
      _counter -= 1;
      this._removeShownState();
      this.$el.hide();
      if (_counter === 0) {
        $('.popup-overlay').hide();
        return $('.popup-overlay').removeClass('exit enter');
      }
    },
    _handlerEnterEnd: function(handler, $el, e) {
      $el.removeClass('enter');
      return $el.off(ovivo.config.ANIMATION_END, handler);
    },
    _handlerExitEnd: function(handler, $el, e) {
      _counter -= 1;
      $el.removeClass('exit');
      $el.hide();
      if (_counter === 0) {
        $('.popup-overlay').hide();
        $('.popup-overlay').removeClass('exit enter');
      }
      return $el.off(ovivo.config.ANIMATION_END, handler);
    },
    _animationShow: function() {
      this._addShownState();
      _counter += 1;
      this.$el.show();
      this._attachHandler(this._handlerEnterEnd);
      this.$el.addClass('enter');
      $('.popup-overlay').show();
      return $('.popup-overlay').removeClass('exit').addClass('enter');
    },
    _animationHide: function() {
      this._removeShownState();
      this._attachHandler(this._handlerExitEnd);
      this.$el.addClass('exit');
      if (_counter <= 1) {
        $('.popup-overlay').addClass('exit');
      }
      return true;
    },
    _initialize: function() {
      return true;
    }
  }));
  if (Modernizr.cssanimations === true) {
    _Popup.prototype.show = _Popup.prototype._animationShow;
    _Popup.prototype.hide = _Popup.prototype._animationHide;
  }
  _overlayClickHandler = function(e) {
    _.each(ovivo.desktop.popups.shown, function(popup) {
      return popup.hide();
    });
    return true;
  };
  this.$('.popup-overlay').on('click', _overlayClickHandler);
  return _Popup;
});

define('_common/ResourceEditCommon',[], function() {
  return {
    get: function(parentEvents) {
      return {
        events: _.extend({}, parentEvents, {
          'change .property-value': 'processPropertyChange',
          'keyup .property-value': 'processPropertyChange',
          'click .button-add': 'add',
          'click .button-save': 'save',
          'click .button-delete': 'delete'
        }),
        propertyRegExp: /\bproperty-value-(\w+)\b/,
        modes: ['edit', 'create'],
        processPropertyChange: function(e) {
          var _header, _input, _name, _picker, _val, _value;
          _input = $(e.target).closest('.property-value');
          _header = $(e.target).closest('.settings-item').children('.header');
          _name = this.propertyRegExp.exec(_input[0].className)[1];
          if ((_picker = _input.pickadate('picker')) != null) {
            _val = _picker.get('select', 'yyyy-mm-dd');
          } else {
            _val = _input.val();
          }
          _value = this.types[_name](_val);
          if (_value === this.original[_name]()) {
            _header.removeClass('changed');
          } else {
            _header.addClass('changed');
          }
          return this.model.set(_name, _value, {
            validate: true
          });
        },
        _getAddSyncHandler: function(collection, model, originalModel) {
          var _handler;
          _handler = function() {
            collection.add(model);
            model.off('sync', _handler);
            return delete model.url;
          };
          return _handler;
        },
        _getSaveSyncHandler: function(collection, model, originalModel) {
          var _handler, _this;
          _this = this;
          _handler = function() {
            _this.clearChangeState();
            originalModel.set(model.toJSON(), {
              update: true
            });
            model.off('sync', _handler);
            return delete model.url;
          };
          return _handler;
        },
        _syncProcessor: function(handlerGetter) {
          this.model.on('sync', handlerGetter.call(this, this.collection, this.model, this.original));
          if (this.model.standaloneModel !== true) {
            this.model.url = this.collection.url;
            if (this.model.id != null) {
              this.model.url += this.model.id + '/';
            }
          } else {
            this.model.url = this.original.url;
          }
          this.model.save();
          return this.close();
        },
        save: function() {
          return this._syncProcessor(this._getSaveSyncHandler);
        },
        add: function() {
          return this._syncProcessor(this._getAddSyncHandler);
        },
        "delete": function() {
          this.original.destroy();
          return this.close();
        },
        initMode: function(name) {
          var _hide,
            _this = this;
          _hide = _.without(this.modes, name);
          _.each(_hide, function(name) {
            return _this.$("." + name + "-mode").hide();
          });
          return this.$("." + name + "-mode").show();
        },
        create: function(obj, mode) {
          if (mode == null) {
            mode = 'create';
          }
          this.createNew(obj, mode);
          return this.initMode(mode);
        },
        edit: function(model, mode) {
          if (mode == null) {
            mode = 'edit';
          }
          this.setModel(model, mode);
          return this.initMode(mode);
        },
        _createEditCopy: function(model) {
          var _copy;
          _copy = new model.constructor(model.toJSON());
          _copy.editCopy = true;
          return _copy;
        },
        _initComponents: function() {
          var _this = this;
          this._components = {};
          _.each(this.fields, function(field, i) {
            if (typeof field === 'object') {
              return _this[field.init](field.name, i);
            } else {
              return _this._components[field] = _this.$(".property-value-" + field);
            }
          });
          return this._initComponents = function() {};
        },
        attachHandlers: function() {},
        detachHandlers: function() {},
        clearChangeState: function() {
          return this.$('.header.changed').removeClass('changed');
        },
        setModel: function(model, mode) {
          var _this = this;
          this.clearChangeState();
          this._initComponents();
          this.original = model;
          if (this.model != null) {
            this.detachHandlers(mode);
          }
          this.model = this._createEditCopy(model);
          this.attachHandlers(mode);
          this.trigger('change:model', this.model);
          return _.each(this.fields, function(field) {
            var _component, _date, _ref;
            if (typeof field === 'object') {
              _this[field.setValue](field.name, _this.model[field.name]());
              return true;
            }
            _component = _this._components[field];
            if (_component.hasClass('datepicker')) {
              _date = new Date(Date.parse(_this.model[field]()));
              _component.each(function(i, el) {
                return $(el).pickadate('picker').set('select', _date);
              });
            } else if (_component.hasClass('plain-value')) {
              $.when(_this.model.view[field]()).done(function(_str) {
                return _component.html(_str);
              });
            } else {
              _component.val((_ref = _this.model[field]()) != null ? _ref.toString() : void 0);
            }
            return true;
          });
        }
      };
    }
  };
});

define('views/popups/EditPopup',['views/popups/Popup', '_common/ResourceEditCommon', 'ovivo'], function(Popup, ResourceEditCommon) {
  return Popup.extend(ResourceEditCommon.get(Popup.prototype.events));
});

define('_common/WorkingHoursEdit',['_features/trailZero', 'ovivo'], function(trailZero) {
  return {
    fields: ['start_time', 'end_time', 'available', 'start_date', 'end_date', 'repeat'],
    types: {
      'start_time': String,
      'end_time': String,
      'available': ovivo.parseBoolean,
      'start_date': String,
      'end_date': String,
      'repeat': Number
    },
    modes: ['edit', 'create', 'create-single', 'edit-single'],
    startDateChangeHandler: function() {
      var _date, _day;
      _date = new Date(Date.parse(this.start_date()));
      this.set('end_date', this.start_date());
      _day = _date.getDay();
      if (_day === 0) {
        _day = 7;
      }
      return this.set('weekdays', _day.toString());
    },
    attachHandlers: function(mode) {
      if (mode.match(/single/) !== null) {
        this.model.on('change:start_date', this.startDateChangeHandler, this.model);
        return this.startDateChangeHandler.call(this.model);
      }
    },
    detachHandlers: function(mode) {
      return this.model.off('change:start_date', this.startDateChangeHandler);
    },
    createNew: function(obj, mode) {
      var _end, _now, _start;
      if (obj == null) {
        obj = {};
      }
      _now = Date.today();
      _now.moveToFirstDayOfMonth();
      _start = new Date(_now);
      _now.moveToLastDayOfMonth();
      _end = new Date(_now);
      return this.setModel(new this.collection.model(_.extend({
        start_date: "" + (_start.getFullYear()) + "-" + (trailZero(_start.getMonth() + 1)) + "-" + (trailZero(_start.getDate())),
        end_date: "" + (_end.getFullYear()) + "-" + (trailZero(_end.getMonth() + 1)) + "-" + (trailZero(_end.getDate())),
        start_time: '09:00',
        end_time: '17:00',
        available: true,
        repeat: 1,
        weekdays: '1,2,3,4,5,6,7'
      }, obj)), mode);
    },
    initializeEdit: function() {
      this.collection = ovivo.desktop.resources.workingHours;
      this.$('.datepicker').pickadate({
        format: 'd. mmmm',
        formatSubmit: 'yyyy-mm-dd',
        firstDay: 1
      });
      return true;
    }
  };
});

define('views/popups/EditPopupWorkingHour',['views/popups/EditPopup', '_common/WorkingHoursEdit', 'ovivo'], function(EditPopup, WorkingHoursEdit, trailZero) {
  return EditPopup.extend(_.extend(WorkingHoursEdit, {
    el: '.popup-working-hour',
    initialize: function() {
      this.initializeEdit();
      return this._initialize();
    }
  }));
});

define('_common/InactivityEdit',['_features/trailZero', 'ovivo'], function(trailZero) {
  return {
    fields: ['start', 'end', 'reason'],
    types: {
      'start': String,
      'end': String,
      'reason': String
    },
    modes: ['edit', 'create', 'create-single', 'edit-single'],
    startDateChangeHandler: function() {
      return this.set('end', this.start());
    },
    attachHandlers: function(mode) {
      if (mode.match(/single/) !== null) {
        return this.model.on('change:start', this.startDateChangeHandler, this.model);
      }
    },
    detachHandlers: function(mode) {
      return this.model.off('change:start', this.startDateChangeHandler);
    },
    createNew: function(obj, mode) {
      var _end, _now, _start;
      if (obj == null) {
        obj = {};
      }
      _now = Date.today();
      _now.setWeek(_now.getWeek() + 1);
      _now.moveToDayOfWeek(1);
      _start = new Date(_now);
      _now.moveToDayOfWeek(5);
      _end = new Date(_now);
      return this.setModel(new this.collection.model(_.extend({
        start: "" + (_start.getFullYear()) + "-" + (trailZero(_start.getMonth() + 1)) + "-" + (trailZero(_start.getDate())),
        end: "" + (_end.getFullYear()) + "-" + (trailZero(_end.getMonth() + 1)) + "-" + (trailZero(_end.getDate())),
        reason: '',
        municipality: ovivo.desktop.resources.municipalities.at(0).id
      }, obj)), mode);
    },
    initializeEdit: function() {
      var _min;
      this.collection = ovivo.desktop.resources.inactivities;
      _min = Date.today();
      _min.setDate(_min.getDate() + 1);
      this.$('.datepicker').pickadate({
        format: 'd. mmmm',
        formatSubmit: 'yyyy-mm-dd',
        firstDay: 1,
        min: 1,
        max: false
      });
      return true;
    }
  };
});

define('views/popups/EditPopupTimeoff',['views/popups/EditPopup', '_common/InactivityEdit', 'ovivo'], function(EditPopup, InactivityEdit) {
  return EditPopup.extend(_.extend(InactivityEdit, {
    el: '.popup-timeoff',
    initialize: function() {
      this.initializeEdit();
      return this._initialize();
    }
  }));
});

define('views/popups/CreateNewPopup',['views/popups/Popup', 'ovivo'], function(Popup) {
  return Popup.extend({
    el: '.popup-create-new',
    events: _.extend({}, Popup.prototype.events, {
      'click .button-create-time': 'createTime',
      'click .button-create-timeoff': 'createTimeoff'
    }),
    createTime: function() {
      var _obj;
      if (this.date != null) {
        _obj = {
          start_date: this.date,
          end_date: this.date
        };
      } else {
        _obj = {};
      }
      if (this.date == null) {
        ovivo.desktop.pages.settings.show();
        ovivo.desktop.pages.settings.view.showSubView('availability');
      }
      ovivo.desktop.popups.editPopupWorkingHour.create(_obj, this.mode);
      ovivo.desktop.popups.editPopupWorkingHour.show();
      return this.close();
    },
    createTimeoff: function() {
      var _obj;
      if (this.date != null) {
        _obj = {
          start: this.date,
          end: this.date
        };
      } else {
        _obj = {};
      }
      if (this.date == null) {
        ovivo.desktop.pages.settings.show();
        ovivo.desktop.pages.settings.view.showSubView('timeoff');
      }
      ovivo.desktop.popups.editPopupTimeoff.create(_obj, this.mode);
      ovivo.desktop.popups.editPopupTimeoff.show();
      return this.close();
    },
    show: function(singleFlag, date) {
      this.date = date;
      if (singleFlag === true) {
        this.mode = 'create-single';
      } else {
        this.mode = 'create';
      }
      return Popup.prototype.show.call(this);
    },
    initialize: function() {
      this._initialize();
      return true;
    }
  });
});

define('_features/transition',[], function() {
  var _animationEndGen;
  _animationEndGen = function(_def, enterClass, exitClass) {
    var _func;
    _func = function(e) {
      $(this).addClass('post-animation');
      _def.resolve();
      $(this).off(ovivo.config.ANIMATION_END, _func);
      $(this).css('z-index', '');
      return true;
    };
    return _func;
  };
  return {
    transit: function(prev, next, enterClass, exitClass, reverse) {
      var _def, _defNext, _defPrev,
        _this = this;
      _defNext = $.Deferred();
      _defPrev = $.Deferred();
      if (reverse === true) {
        $(next).css('z-index', 0);
        $(prev).css('z-index', 1);
      } else {
        $(next).css('z-index', 1);
        $(prev).css('z-index', 0);
      }
      if ((ovivo.config.PAGE_TRANSITION_ANIMATION === true) && (ovivo.config.ANIMATION_END !== false)) {
        $(next).on(ovivo.config.ANIMATION_END, _animationEndGen(_defNext, enterClass, exitClass));
        $(prev).on(ovivo.config.ANIMATION_END, _animationEndGen(_defPrev, enterClass, exitClass));
        if (reverse === true) {
          $(next).addClass('back');
          $(prev).addClass('back');
        }
        $(next).addClass(enterClass).addClass('transition').addClass('next-page');
        $(prev).addClass(exitClass).addClass('transition').addClass('prev-page');
        return $.when(_defNext, _defPrev).done(function() {
          $(next).removeClass("" + enterClass + " transition back next-page post-animation");
          return $(prev).removeClass("" + exitClass + " transition back prev-page post-animation");
        });
      } else {
        $(prev).addClass('hide');
        $(next).removeClass('hide');
        _def = new $.Deferred();
        _def.resolve();
        return _def;
      }
    }
  };
});

define('models/Page',['ovivo'], function() {
  return Backbone.Model.extend({
    forwardEvent: function() {
      var _args;
      _args = Array.prototype.slice.call(arguments, 0);
      _args.splice(1, 0, this);
      return this.trigger.apply(this, _args);
    },
    initialize: function(attrs, options) {
      this.page = new options.Page({
        name: options.name
      }, options.options);
      this.name = options.name;
      ovivo.desktop.pages[this.name] = this.page;
      this.page.on('all', this.forwardEvent, this);
      return true;
    }
  });
});

define('collections/Pages',['_features/transition', 'models/Page', 'ovivo'], function(transition, Model) {
  return Backbone.Collection.extend({
    model: Model,
    addPage: function(Page, name, options) {
      var _model;
      _model = new Model({}, {
        Page: Page,
        name: name,
        options: options
      });
      this.add(_model);
      return _model;
    },
    transition: function(source, target, _args) {
      var _sourceView, _targetView,
        _this = this;
      _sourceView = source.page.view;
      _targetView = target.page.view;
      _.each([_sourceView, _targetView], function(page) {
        page.showEl();
        return true;
      });
      _sourceView.transitionStart.apply(_sourceView, ['exit'].concat(_args));
      _targetView.transitionStart.apply(_targetView, ['enter'].concat(_args));
      transition.transit(_sourceView.el, _targetView.el, 'enter', 'exit', false).done(function() {
        _sourceView.transitionComplete.apply(_sourceView, ['exit'].concat(_args));
        _targetView.transitionComplete.apply(_targetView, ['enter'].concat(_args));
        return true;
      });
      return true;
    },
    processShow: function(page) {
      var _args;
      _args = Array.prototype.slice.call(arguments, 1);
      ovivo.desktop.sideBar.setPage(page.page.name);
      if (this.current !== page) {
        if ((this.current !== void 0) && (page.page.popup !== true)) {
          this.transition(this.current, page, _args);
        } else {
          page.page.view.showEl();
        }
        this.current = page;
      }
      return true;
    },
    resizeHandler: function() {
      return this.each(function(page) {
        return page.page.view.updateScrollProcessors();
      });
    },
    initialize: function() {
      this.on('show', this.processShow, this);
      $(window).on('resize', _.bind(this.resizeHandler, this));
      return true;
    }
  });
});

define('models/pages/PageBase',['_common/ToolsBase', 'ovivo'], function(ToolsBase) {
  var _Base;
  _Base = Backbone.Model.extend(_.extend({}, ToolsBase, {
    show: function() {
      return this.view.show.apply(this.view, Array.prototype.slice.call(arguments, 0));
    },
    processChange: function() {
      var _localStorage;
      if ((_localStorage = window.localStorage) != null) {
        _localStorage[this.id] = JSON.stringify(this.toJSON());
      }
      return true;
    },
    _getFromLocalStorage: function() {
      var _localStorage, _objStr;
      if (((_localStorage = window.localStorage) != null) && ((_objStr = _localStorage[this.id]) != null)) {
        this.set(JSON.parse(_objStr));
      }
      return true;
    },
    toJSON: function() {
      return {
        subView: this.get('subView')
      };
    },
    initialize: function(attrs, options) {
      var _obj;
      this.name = attrs.name;
      this.on('change:subView', this.processChange, this);
      this.id = "page-" + this.name;
      this._getFromLocalStorage();
      _obj = {
        model: this
      };
      if ((options != null ? options.el : void 0) != null) {
        _obj.el = options.el;
      }
      this.view = new this.View(_obj);
      return true;
    },
    clear: function() {
      if (this.view.clear != null) {
        return this.view.clear();
      }
    }
  }));
  _Base.prototype._base = _Base;
  return _Base;
});

define('views/pages/PageBase',['_common/ToolsBase', '_features/transition', 'ovivo'], function(ToolsBase, transition) {
  var _Base;
  _Base = Backbone.View.extend(_.extend({}, ToolsBase, {
    show: function() {
      this.model.trigger.apply(this.model, ['show'].concat(Array.prototype.slice.call(arguments, 0)));
      return true;
    },
    events: {
      'click .no-selection': 'clearSelection',
      'click .button-close': 'close'
    },
    clearSelection: function() {
      if (window.getSelection != null) {
        if (window.getSelection().empty != null) {
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges != null) {
          window.getSelection().removeAllRanges();
        }
      } else if (document.selection != null) {
        document.selection.empty();
      }
      return true;
    },
    close: function() {
      return this.hideEl();
    },
    showEl: function() {
      return this.$el.removeClass('hide');
    },
    hideEl: function() {
      return this.$el.addClass('hide');
    },
    transitionStart: function() {},
    transitionComplete: function(type) {
      if (type === 'exit') {
        this.hideEl();
      }
      if (type === 'enter') {
        this.showSubView(this.subView());
      }
      return true;
    },
    showSubView: function(name) {
      var _subView;
      if (name == null) {
        return;
      }
      _subView = this.subViews[name];
      _.each(_.without(this.subViews, this.subViews[name]), function(subView) {
        return this.$("." + subView.name + "-only").hide();
      });
      this.$("." + name + "-only").show();
      this.model.set('subView', name);
      this.processContentScrollBind.process(_subView.el);
      return _subView.trigger('show');
    },
    subView: function() {
      return this.model.get('subView');
    },
    transition: function(source, target) {
      var _this = this;
      _.each([source, target], function(page) {
        page.showEl();
        return true;
      });
      return transition.transit(source.el, target.el, 'enter', 'exit', false).done(function() {
        source.hideEl();
        return true;
      });
    },
    processSubView: function(page) {
      var _subView, _subViewName,
        _this = this;
      _subViewName = this.subView();
      _subView = this.subViews[_subViewName];
      if (_subView != null) {
        if (this.prevSubView != null) {
          this.transition(this.prevSubView, _subView).done(function() {
            _this.trigger('subViewChange', _subViewName);
            return _this.prevSubView = _subView;
          });
        } else {
          _subView.showEl();
          this.trigger('subViewChange', _subViewName);
          this.prevSubView = _subView;
        }
      }
      return true;
    },
    _initSubView: function() {
      var _subViewName;
      if ((_subViewName = this.subView()) == null) {
        this.model.set('subView', this.defaultSubView);
      } else {
        this.processSubView();
      }
      return true;
    },
    processContentScrollBind: (function() {
      var _cache, _checkScrollBottom, _checkScrollTop, _func, _initialHandler, _usualHandler;
      _checkScrollTop = function() {
        var _scrollTop;
        _scrollTop = this.el.scrollTop;
        if (_scrollTop !== 0) {
          if (!(this.$el.hasClass('scrolled-top'))) {
            this.$el.addClass('scrolled scrolled-top');
          }
        } else {
          this.$el.removeClass('scrolled-top');
          if (!this.$el.hasClass('scrolled-bottom')) {
            this.$el.removeClass('scrolled');
          }
        }
        return true;
      };
      _checkScrollBottom = function() {
        var _scrollTop;
        _scrollTop = this.el.scrollTop;
        if ((this.offsetHeight + _scrollTop) !== this.scrollHeight) {
          if (!(this.$el.hasClass('scrolled-bottom'))) {
            this.$el.addClass('scrolled scrolled-bottom');
          }
        } else {
          this.$el.removeClass('scrolled-bottom');
          if (!this.$el.hasClass('scrolled-top')) {
            this.$el.removeClass('scrolled');
          }
        }
        return true;
      };
      _usualHandler = function() {
        _checkScrollTop.call(this);
        _checkScrollBottom.call(this);
        return true;
      };
      _initialHandler = function(manualFlag) {
        this.offsetHeight = this.el.offsetHeight;
        this.scrollHeight = this.el.scrollHeight;
        if (manualFlag !== true) {
          this.handler = _usualHandler;
        }
        return _usualHandler.call(this);
      };
      _cache = [];
      _func = function($el, el) {
        var _ctx, _handler;
        _ctx = {
          handler: _initialHandler,
          el: el,
          $el: $el
        };
        _cache.push(_ctx);
        _handler = function() {
          _ctx.handler();
          return true;
        };
        _handler.update = function() {
          return _ctx.handler = _initialHandler;
        };
        return _handler;
      };
      _func.process = function(el) {
        var _ctx;
        if (!$(el).hasClass('scrollable')) {
          el = $('.scrollable', el)[0];
        }
        if (el == null) {
          return true;
        }
        _ctx = _.find(_cache, function(ctx) {
          return ctx.el === el;
        });
        if (_ctx != null) {
          _ctx.handler(true);
        }
        return true;
      };
      return _func;
    })(),
    updateScrollProcessors: function() {
      _.each(this.scrollProcessors, function(processor) {
        return processor.update();
      });
      return this.showSubView(this.subView());
    },
    initialize: function() {
      var _this = this;
      this.model.on('change:subView', this.processSubView, this);
      this.content = this.$('div.content');
      this.scrollProcessors = this.$('.scrollable').map(function(i, el) {
        var _processor;
        _processor = _this.processContentScrollBind(_this.$el, el);
        $(el).on('scroll', _processor);
        return _processor;
      });
      this.subViews = [];
      _.each(this.SubViews, function(SubView) {
        var _subView;
        _subView = new SubView();
        _subView.baseView = _this;
        _this.subViews[_subView.name] = _subView;
        return _this.subViews.push(_subView);
      });
      this._initSubView();
      return true;
    }
  }));
  _Base.prototype._base = _Base;
  return _Base;
});

define('views/pages/Calendar/DaysCollectorPage',['ovivo'], function() {
  return {
    navigate: function() {
      var _collector, _key;
      _key = this._getKey.apply(this, Array.prototype.slice.call(arguments, 0));
      if (this._isToday.apply(this, Array.prototype.slice.call(arguments, 0)) === true) {
        this.processToday();
      } else {
        this.processNotToday();
      }
      if ((_collector = this.collectors.get(_key)) == null) {
        _collector = this.collectors.addElement(this._getObj.apply(this, Array.prototype.slice.call(arguments, 0)));
      }
      this.collectors.show(_collector);
      return true;
    },
    processToday: function() {
      return this.todayButton.addClass('disabled');
    },
    processNotToday: function() {
      return this.todayButton.removeClass('disabled');
    },
    processCollectorAdd: function(collector, collectors) {
      return this.collectorsList.append(collector.view.el);
    },
    _initialize: function() {
      this.collectors = new this.Collectors();
      this.collectors.on('add', this.processCollectorAdd, this);
      this.collectors.on('show', this.processCollectorShow, this);
      this.collectors.on('hide', this.processCollectorHide, this);
      return true;
    }
  };
});

define('collections/calendar/Days',['ovivo'], function() {
  return Backbone.Collection.extend({
    comparator: function(day) {
      return day.dateObj();
    },
    initElements: function(elements, days) {
      var _this = this;
      return _.each(_.zip(elements, days), function(_arg) {
        var day, element;
        element = _arg[0], day = _arg[1];
        _this.add(day, {
          el: element
        });
        return _this;
      });
    },
    _addDayCache: function(day, cache, model) {
      var _arr, _key;
      _key = model.id;
      if ((_arr = cache[_key]) == null) {
        _arr = cache[_key] = [];
      }
      return _arr.push(day);
    },
    _getDaysCache: function(cache, model) {
      return cache[model.id];
    },
    _clearDayCache: function(cache, model) {
      return cache[model.id] = [];
    },
    processEventAdd: function(event) {
      var _day;
      _day = this.get(event.getKey());
      if (_day != null) {
        this._addDayCache(_day, this.eventsCache, event);
        _day.addEvent(event);
      }
      return true;
    },
    _rangeResultProcessor: function(rangeResult, hash, adderName) {
      var _this = this;
      return _.each(rangeResult, function(obj) {
        var _day, _key;
        _key = "" + (obj.date.getFullYear()) + "-" + (obj.date.getMonth()) + "-" + (obj.date.getDate());
        _day = _this.get(_key);
        if (_day != null) {
          _this._addDayCache(_day, hash, obj.model);
          return _day[adderName](obj.model, obj);
        }
      });
    },
    processWorkingHours: function(start, end) {
      return this._rangeResultProcessor(ovivo.desktop.resources.workingHours.processRange(start, end), this.workingHoursCache, 'addWorkingHour');
    },
    processInactivities: function(start, end) {
      return this._rangeResultProcessor(ovivo.desktop.resources.inactivities.processRange(start, end), this.inactivitiesCache, 'addInactivity');
    },
    processWorkingHourAdd: function(workingHour) {
      var end, start;
      start = this.first().dateObj();
      end = this.last().dateObj();
      return this._rangeResultProcessor(workingHour.processRange(start, end), this.workingHoursCache, 'addWorkingHour');
    },
    processInactivityAdd: function(workingHour) {
      var end, start;
      start = this.first().dateObj();
      end = this.last().dateObj();
      return this._rangeResultProcessor(workingHour.processRange(start, end), this.inactivitiesCache, 'addInactivity');
    },
    processEventRemove: function(model) {
      _.each(this._getDaysCache(this.eventsCache, model), function(day) {
        return day.removeEvent(model);
      });
      return this._clearDayCache(this.eventsCache, model);
    },
    processWorkingHourRemove: function(model) {
      _.each(this._getDaysCache(this.workingHoursCache, model), function(day) {
        return day.removeWorkingHour(model);
      });
      return this._clearDayCache(this.workingHoursCache, model);
    },
    processInactivityRemove: function(model) {
      _.each(this._getDaysCache(this.inactivitiesCache, model), function(day) {
        return day.removeInactivity(model);
      });
      return this._clearDayCache(this.inactivitiesCache, model);
    },
    processEventChange: function(model) {
      this.processEventRemove(model);
      return this.processEventAdd(model);
    },
    processWorkingHourChange: function(model) {
      this.processWorkingHourRemove(model);
      return this.processWorkingHourAdd(model);
    },
    processInactivityChange: function(model) {
      this.processInactivityRemove(model);
      return this.processInactivityAdd(model);
    },
    initialize: function(models, options) {
      _.extend(this, options);
      this.todayFound = false;
      this.workingHoursCache = {};
      this.eventsCache = {};
      this.inactivitiesCache = {};
      ovivo.desktop.resources.events.on('add', this.processEventAdd, this);
      ovivo.desktop.resources.workingHours.on('add', this.processWorkingHourAdd, this);
      ovivo.desktop.resources.inactivities.on('add', this.processInactivityAdd, this);
      ovivo.desktop.resources.events.on('remove', this.processEventRemove, this);
      ovivo.desktop.resources.workingHours.on('remove', this.processWorkingHourRemove, this);
      ovivo.desktop.resources.inactivities.on('remove', this.processInactivityRemove, this);
      ovivo.desktop.resources.events.on('change:type', this.processEventChange, this);
      ovivo.desktop.resources.workingHours.on('change', this.processWorkingHourChange, this);
      ovivo.desktop.resources.inactivities.on('change', this.processInactivityChange, this);
      return true;
    }
  });
});

define('collections/calendar/DaysCollectors',['_common/ToolsBase', 'collections/calendar/Days', 'ovivo'], function(ToolsBase, Days) {
  var _Base;
  _Base = Backbone.Collection.extend(_.extend({}, ToolsBase, {
    comparator: function(elem) {
      return elem.firstDate();
    },
    addElement: function(obj) {
      var _elem;
      _elem = new this.model(obj, {
        collection: this
      });
      this.add(_elem);
      return _elem;
    },
    show: function(elem) {
      if (this.prevElem != null) {
        this.prevElem.hide();
        this.trigger('hide', this.prevElem);
      }
      elem.show();
      this.trigger('show', elem);
      return this.prevElem = elem;
    },
    initialize: function(models, options) {
      _.extend(this, options);
      this.days = new Days([], {
        model: this.DayModel
      });
      return true;
    }
  }));
  _Base.prototype._base = _Base;
  return _Base;
});

define('_common/CalendarBase',[], function() {
  return {
    year: function() {
      return this.get('year');
    },
    month: function() {
      return this.get('month');
    },
    isLeap: function(year) {
      if ((year % 4) === 0) {
        if ((year % 100) === 0) {
          if ((year % 400) === 0) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    getNumberOfDaysInMonth: function(month, year) {
      if (month !== 1) {
        return ovivo.config.DAYS_IN_MONTH[month];
      } else if (this.isLeap(year)) {
        return 29;
      } else {
        return 28;
      }
    },
    setMonth: function(value) {
      value = value > 11 ? (this.setYear(this.year() + 1), value % 12) : value < 0 ? (this.setYear(this.year() - 1), value % 12 + 12) : value;
      return this.set('month', value);
    },
    setYear: function(value) {
      return this.set('year', value);
    },
    transformDayOfWeek: function(day) {
      return (day + 6) % 7;
    },
    _getWeekNumber: function(d) {
      var weekNo, yearStart;
      d = new Date(d);
      d.setHours(0, 0, 0);
      d.setDate(d.getDate() + 4 - (d.getDay() || 7));
      yearStart = new Date(d.getFullYear(), 0, 1);
      return weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    },
    getDaysArr: function(weeks) {
      return Array.prototype.concat.apply([], weeks);
    },
    getWeeksArr: function(year, month) {
      var _daysAfter, _daysBefore, _daysNum, _firstDayOfMonth, _i, _lastDayOfMonth, _month, _nextDaysNum, _nextMonth, _nextYear, _prevDaysNum, _prevMonth, _prevYear, _returnValue, _weeks, _year;
      _returnValue = [];
      _year = year != null ? year : this.year();
      _month = month != null ? month : this.month();
      _prevYear = _year;
      _nextYear = _year;
      _prevMonth = _month - 1;
      _nextMonth = _month + 1;
      if (_month === 0) {
        _prevYear = _year - 1;
        _prevMonth = 11;
      } else if (_month === 11) {
        _nextYear = _year + 1;
        _nextMonth = 0;
      }
      _prevDaysNum = this.getNumberOfDaysInMonth(_prevMonth, _prevYear);
      _nextDaysNum = this.getNumberOfDaysInMonth(_nextMonth, _nextYear);
      _daysNum = this.getNumberOfDaysInMonth(_month, _year);
      _weeks = [];
      _firstDayOfMonth = this.transformDayOfWeek((new Date(_year, _month, 1)).getDay());
      _lastDayOfMonth = this.transformDayOfWeek((new Date(_year, _month, _daysNum)).getDay());
      _daysBefore = _firstDayOfMonth;
      _daysAfter = 6 - _lastDayOfMonth;
      if (_daysBefore > 0) {
        _weeks = _weeks.concat((function() {
          var _j, _ref, _results;
          _results = [];
          for (_i = _j = _ref = _prevDaysNum - _daysBefore + 1; _ref <= _prevDaysNum ? _j <= _prevDaysNum : _j >= _prevDaysNum; _i = _ref <= _prevDaysNum ? ++_j : --_j) {
            _results.push({
              date: _i,
              month: _prevMonth,
              year: _prevYear,
              week_number: this._getWeekNumber(new Date(_prevYear, _prevMonth, _i)),
              disabled: true
            });
          }
          return _results;
        }).call(this));
      }
      _weeks = _weeks.concat((function() {
        var _j, _results;
        _results = [];
        for (_i = _j = 1; 1 <= _daysNum ? _j <= _daysNum : _j >= _daysNum; _i = 1 <= _daysNum ? ++_j : --_j) {
          _results.push({
            date: _i,
            month: _month,
            year: _year,
            week_number: this._getWeekNumber(new Date(_year, _month, _i)),
            disabled: false
          });
        }
        return _results;
      }).call(this));
      if (_daysAfter > 0) {
        _weeks = _weeks.concat((function() {
          var _j, _results;
          _results = [];
          for (_i = _j = 1; 1 <= _daysAfter ? _j <= _daysAfter : _j >= _daysAfter; _i = 1 <= _daysAfter ? ++_j : --_j) {
            _results.push({
              date: _i,
              month: _nextMonth,
              year: _nextYear,
              week_number: this._getWeekNumber(new Date(_nextYear, _nextMonth, _i)),
              disabled: true
            });
          }
          return _results;
        }).call(this));
      }
      if (_weeks.length === 35) {
        _weeks = _weeks.concat((function() {
          var _j, _results;
          _results = [];
          for (_i = _j = 1; _j <= 7; _i = ++_j) {
            _results.push({
              date: _daysAfter + _i,
              month: _nextMonth,
              year: _nextYear,
              week_number: this._getWeekNumber(new Date(_nextYear, _nextMonth, _daysAfter + _i)),
              disabled: true
            });
          }
          return _results;
        }).call(this));
      }
      _returnValue = (function() {
        var _j, _ref, _results;
        _results = [];
        for (_i = _j = 0, _ref = _weeks.length / 7; 0 <= _ref ? _j < _ref : _j > _ref; _i = 0 <= _ref ? ++_j : --_j) {
          _results.push(_weeks.slice(_i * 7, (_i + 1) * 7));
        }
        return _results;
      })();
      return _returnValue;
    }
  };
});

define('models/calendar/DaysCollector',['ovivo'], function() {
  return {
    firstDate: function() {
      return this._firstDate;
    },
    show: function() {
      return this.view.show();
    },
    hide: function() {
      return this.view.hide();
    },
    initResources: function() {
      var _end, _start,
        _this = this;
      _start = (function() {
        var _i;
        _i = 0;
        while (_this.days[_i].disabled === true) {
          _i += 1;
        }
        return _this.days[_i];
      })();
      _end = (function() {
        var _i;
        _i = _this.days.length - 1;
        while (_this.days[_i].disabled === true) {
          _i -= 1;
        }
        return _this.days[_i];
      })();
      _start = new Date(_start.year, _start.month, _start.date);
      _end = new Date(_end.year, _end.month, _end.date);
      this.collection.days.processWorkingHours(_start, _end);
      this.collection.days.processInactivities(_start, _end);
      return true;
    },
    initDays: function() {
      this.collection.days.initElements(this.view.dayElements, this.days);
      this.initResources();
      return true;
    },
    removeLoading: function() {
      return this.view.removeLoading();
    },
    _initialize: function(attrs, options) {
      this.on('rendered', this.initDays, this);
      return true;
    }
  };
});

define('views/calendar/DaysCollector',['ovivo'], function() {
  return {
    tagName: 'li',
    show: function() {
      return this.$el.removeClass('hide');
    },
    hide: function() {
      return this.$el.addClass('hide');
    },
    removeLoading: function() {
      return this.$('.overlay').remove();
    },
    loaderUrl: function() {
      return ovivo.config.LOADER_URL;
    },
    postRender: function() {
      this.dayElements = this.$('.days-container .week-row > td');
      return this.hide();
    }
  };
});

define('views/calendar/Month',['views/calendar/DaysCollector', 'views/resources/ResourceBase', 'ovivo'], function(DaysCollector, ResourceBase) {
  return ResourceBase.extend(_.extend({}, DaysCollector, {
    common: {},
    template: Handlebars.templates['calendarMonth'],
    groupTemplate: Handlebars.templates['calendarMonth_group'],
    events: {},
    month: function() {
      return ovivo.config.MONTHS[this.model.month()];
    },
    rows: function() {
      return _.map(this.model.weeks, function(week) {
        return {
          cells: week
        };
      });
    },
    postRender: function() {
      this.dayElements = this.$('.days-container .week-row > td');
      return this.hide();
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      return true;
    }
  }));
});

define('models/calendar/Month',['_common/CalendarBase', 'models/resources/ResourceBase', 'models/calendar/DaysCollector', 'views/calendar/Month', 'ovivo'], function(CalendarBase, ResourceBase, DaysCollector, View) {
  return ResourceBase.extend(_.extend({}, CalendarBase, DaysCollector, {
    _gettersNames: ['month', 'year', 'pk'],
    initialize: function(attrs, options) {
      this._initialize();
      this.View = View;
      this.set('pk', "" + (this.year()) + "-" + (this.month()));
      this._firstDate = new Date(this.year(), this.month(), 1);
      this.weeks = this.getWeeksArr(this.year(), this.month());
      this.days = this.getDaysArr(this.weeks);
      this.proxyCall('initialize', arguments);
      ovivo.desktop.resources.events.fetchMonth(this.month(), this.year()).done(_.bind(this.removeLoading, this));
      return true;
    }
  }));
});

define('models/calendar/Day',['ovivo'], function() {
  return {
    _gettersNames: ['date', 'disabled', 'month', 'week_number', 'year', 'dateObj'],
    addEvent: function(model) {
      var _view;
      _view = model.getView();
      return this.view.addEvent(_view, model);
    },
    removeEvent: function(model) {
      return this.view.removeEvent(model);
    },
    addWorkingHour: function(model) {
      var _view;
      _view = model.getView();
      return this.view.addWorkingHour(_view, model);
    },
    removeWorkingHour: function(model) {
      return this.view.removeWorkingHour(model);
    },
    addInactivity: function(model, obj) {
      var _view;
      _view = model.getView(obj);
      return this.view.addInactivity(_view, model);
    },
    removeInactivity: function(model) {
      return this.view.removeInactivity(model);
    },
    checkToday: function() {
      var _now;
      if (this.collection.todayFound !== true) {
        _now = Date.today();
        if ((_now - this.dateObj()) === 0) {
          this.view.setToday();
          return this.collection.todayFound = true;
        }
      }
    },
    highlight: function(model) {
      return this.view.highlight(model);
    },
    removeHighlight: function(model) {
      return this.view.removeHighlight(model);
    },
    initialize: function(attrs, options) {
      var _this = this;
      this.proxyCall('initialize', arguments);
      this.set('pk', "" + (this.year()) + "-" + (this.month()) + "-" + (this.date()) + (this.disabled() === true ? '-disabled' : ''));
      this.set('dateObj', new Date(this.year(), this.month(), this.date()));
      this.view = new this.View({
        model: this,
        el: options.el
      });
      this.checkToday();
      _.each(ovivo.desktop.resources.events.dateCache["" + (this.year()) + "-" + (this.month() + 1) + "-" + (this.date())], function(event) {
        return _this.addEvent(event);
      });
      return true;
    }
  };
});

define('_features/getDateString',['_features/trailZero'], function(trailZero) {
  return function(date) {
    return "" + (date.getFullYear()) + "-" + (trailZero(date.getMonth() + 1)) + "-" + (trailZero(date.getDate()));
  };
});

define('views/calendar/Day',['_features/getDateString', 'ovivo'], function(getDateString) {
  return {
    events: {
      'click': 'processDayClick'
    },
    processDayClick: function() {
      return ovivo.desktop.popups.createNewPopup.show(true, getDateString(this.dateObj()));
    },
    render: function() {
      return true;
    },
    _removeFromArr: function(elem, arr) {
      var _i;
      _i = _.indexOf(arr, elem);
      return arr.splice(_i, 1);
    },
    _insertBefore: function(elem, arr, next) {
      var _i;
      _i = _.indexOf(arr, next);
      return arr.splice(_i, 0, elem);
    },
    _getFromHash: function(elem) {
      var _name;
      _name = elem.typeName;
      if (_name === 'inactivity') {
        return this.inactivities[elem.id];
      } else if (_name === 'workingHour') {
        return this.workingHours[elem.id];
      } else if (_name === 'event') {
        return this.events_[elem.id];
      }
    },
    _removeModel: function(model, hash) {
      var _view;
      _view = hash[model.id];
      model.removeDay(this.model);
      if (_view != null) {
        _view.remove();
        delete hash[model.id];
        this._removeFromArr(model, this.elements);
      }
      return true;
    },
    _insertElement: (function() {
      var _compare, _eventTypeOrder, _order;
      _order = ['inactivity', 'workingHour', 'event'];
      _eventTypeOrder = ['closed', 'open-responses', 'open'];
      _compare = function(a, b) {
        var _delta, _eventOrderA, _eventOrderB, _orderA, _orderB, _timeA, _timeB;
        _orderA = _.indexOf(_order, a.typeName);
        _orderB = _.indexOf(_order, b.typeName);
        if (((_delta = _orderB - _orderA) !== 0) || (_orderA === 0)) {
          return _delta;
        } else {
          if (((_orderA === 2) && ((_eventOrderA = _.indexOf(_eventTypeOrder, a.type())) === (_eventOrderB = _.indexOf(_eventTypeOrder, b.type())))) || (_orderA !== 2)) {
            _timeA = new Date(Date.parse(a.start_time()));
            _timeB = new Date(Date.parse(b.start_time()));
            return _timeB - _timeA;
          } else {
            return _eventOrderB - _eventOrderA;
          }
        }
      };
      return function(model, view, hash) {
        var _element, _i;
        _i = 0;
        while ((_i < this.elements.length) && (_compare((_element = this.elements[_i]), model) > 0)) {
          _i += 1;
        }
        if (_i < this.elements.length) {
          this._getFromHash(_element).$el.before(view.el);
        } else {
          this.calendarItems.append(view.el);
        }
        return this.elements.splice(_i, 0, model);
      };
    })(),
    highlight: function(model) {
      return this._getFromHash(model).highlight();
    },
    removeHighlight: function(model) {
      return this._getFromHash(model).removeHighlight();
    },
    _addModel: function(model, view, hash) {
      hash[model.id] = view;
      model.addDay(this.model);
      return this._insertElement(model, view, hash);
    },
    addEvent: function(view, model) {
      this._addModel(model, view, this.events_);
      this.updateEventsCounter();
      return true;
    },
    removeEvent: function(model) {
      return this._removeModel(model, this.events_);
    },
    addWorkingHour: function(view, model) {
      return this._addModel(model, view, this.workingHours);
    },
    removeWorkingHour: function(model) {
      return this._removeModel(model, this.workingHours);
    },
    addInactivity: function(view, model) {
      return this._addModel(model, view, this.inactivities);
    },
    removeInactivity: function(model) {
      return this._removeModel(model, this.inactivities);
    },
    updateEventsCounter: function() {
      var _amount, _html;
      _amount = _.keys(this.events_).length;
      _html = _amount > 1 ? _amount + ' ' + ngettext('event', 'events', this.events_) : '';
      return this.events_Counter.html(_html);
    },
    setToday: function() {
      return this.$el.addClass('current');
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      this.events_ = {};
      this.workingHours = {};
      this.inactivities = {};
      this.elements = [];
      this.calendarItems = this.$('.calendar-items');
      this.events_Counter = this.$('.events-counter');
      this.delegateEvents();
      return true;
    }
  };
});

define('views/calendar/MonthDay',['views/calendar/Day', 'views/resources/ResourceBase', 'ovivo'], function(Day, ResourceBase) {
  return ResourceBase.extend(_.extend({}, Day, {}));
});

define('models/calendar/MonthDay',['models/calendar/Day', 'models/resources/ResourceBase', 'views/calendar/MonthDay', 'ovivo'], function(Day, ResourceBase, View) {
  return ResourceBase.extend(_.extend({}, Day, {
    View: View
  }));
});

define('collections/calendar/Months',['collections/calendar/DaysCollectors', 'models/calendar/Month', 'models/calendar/MonthDay', 'ovivo'], function(DaysCollectors, Model, MonthDay) {
  return DaysCollectors.extend({
    model: Model,
    DayModel: MonthDay,
    initialize: function(models, options) {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('views/pages/Calendar/Month',['views/pages/Calendar/DaysCollectorPage', 'views/pages/PageBase', 'collections/calendar/Months', 'ovivo'], function(DaysCollectorPage, PageBase, Months) {
  return PageBase.extend(_.extend({}, DaysCollectorPage, {
    el: '.page.page-calendar .month-view',
    name: 'month',
    Collectors: Months,
    events: {},
    _getKey: function(year, month) {
      return "" + year + "-" + month;
    },
    _getObj: function(year, month) {
      return {
        year: year,
        month: month
      };
    },
    prev: function() {
      this.current.setMonth(this.current.getMonth() - 1);
      return this.navigate(this.current.getFullYear(), this.current.getMonth());
    },
    next: function() {
      this.current.setMonth(this.current.getMonth() + 1);
      return this.navigate(this.current.getFullYear(), this.current.getMonth());
    },
    today: function() {
      var _today;
      _today = Date.today();
      this.current.setMonth(_today.getMonth());
      this.current.setFullYear(_today.getFullYear());
      this.navigate(this.current.getFullYear(), this.current.getMonth());
      return this.moveToday();
    },
    _isToday: function(year, month) {
      var _today;
      _today = Date.today();
      return (_today.getFullYear() === year) && (_today.getMonth() === month);
    },
    processCollectorShow: function(collector) {
      return this.title.html(ovivo.config.MONTHS[collector.month()] + ' ' + collector.year());
    },
    processCollectorHide: function(collector) {},
    moveToday: function() {
      var _currentTop;
      _currentTop = this.$('.cell.current').position().top;
      return this.$el.animate({
        scrollTop: _currentTop
      });
    },
    initialize: function() {
      var _now;
      this.current = _now = Date.today().moveToFirstDayOfMonth();
      this._initialize();
      this.title = $('.page.page-calendar header span.title.month-title');
      this.collectorsList = this.$('.months-list');
      this.todayButton = $('.page.page-calendar header .month-today');
      this.navigate(_now.getFullYear(), _now.getMonth());
      setTimeout(_.bind(this.moveToday, this), 1000);
      return true;
    }
  }));
});

define('views/calendar/Week',['views/calendar/DaysCollector', 'views/resources/ResourceBase', 'ovivo'], function(DaysCollector, ResourceBase) {
  return ResourceBase.extend(_.extend({}, DaysCollector, {
    common: {},
    template: Handlebars.templates['calendarWeek'],
    groupTemplate: Handlebars.templates['calendarWeek_group'],
    events: {},
    days: function() {
      return this.model.days;
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      return true;
    }
  }));
});

define('models/calendar/Week',['models/resources/ResourceBase', 'models/calendar/DaysCollector', 'views/calendar/Week', 'ovivo'], function(ResourceBase, DaysCollector, View) {
  return ResourceBase.extend(_.extend({}, DaysCollector, {
    _gettersNames: ['number', 'month', 'year', 'pk'],
    getDaysArr: function() {
      var _arr, _date;
      _arr = [];
      _date = new Date(this._firstDate);
      _date.moveToDayOfWeek(1, -1);
      _.each([1, 2, 3, 4, 5, 6, 7], function(i) {
        _arr.push({
          date: _date.getDate(),
          month: _date.getMonth(),
          year: _date.getFullYear(),
          week_number: _date.getWeek(),
          disabled: false
        });
        return _date.setDate(_date.getDate() + 1);
      });
      return _arr;
    },
    initialize: function(attrs, options) {
      this._initialize();
      this.View = View;
      this.set('pk', "" + attrs.year + "-" + attrs.number);
      this._firstDate = Date.today();
      this._firstDate.setFullYear(attrs.year);
      this._firstDate.setWeek(attrs.number);
      this._firstDate.moveToDayOfWeek(4);
      this.set('month', this._firstDate.getMonth());
      this.days = this.getDaysArr();
      this.proxyCall('initialize', arguments);
      ovivo.desktop.resources.events.fetchWeek(this.number(), this.year(), this._firstDate).done(_.bind(this.removeLoading, this));
      return true;
    }
  }));
});

define('views/calendar/WeekDay',['views/calendar/Day', 'views/resources/ResourceBase', 'ovivo'], function(Day, ResourceBase) {
  return ResourceBase.extend(_.extend({}, Day, {}));
});

define('models/calendar/WeekDay',['models/calendar/Day', 'models/resources/ResourceBase', 'views/calendar/WeekDay', 'ovivo'], function(Day, ResourceBase, View) {
  return ResourceBase.extend(_.extend({}, Day, {
    View: View
  }));
});

define('collections/calendar/Weeks',['collections/calendar/DaysCollectors', 'models/calendar/Week', 'models/calendar/WeekDay', 'ovivo'], function(DaysCollectors, Model, WeekDay) {
  return DaysCollectors.extend({
    model: Model,
    DayModel: WeekDay,
    initialize: function(models, options) {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('views/pages/Calendar/Week',['views/pages/Calendar/DaysCollectorPage', 'views/pages/PageBase', 'collections/calendar/Weeks', 'ovivo'], function(DaysCollectorPage, PageBase, Weeks) {
  return PageBase.extend(_.extend({}, DaysCollectorPage, {
    el: '.page.page-calendar .week-view',
    name: 'week',
    Collectors: Weeks,
    events: {},
    _getKey: function(year, number) {
      return "" + year + "-" + number;
    },
    _getObj: function(year, number) {
      return {
        year: year,
        number: number
      };
    },
    prev: function() {
      this.current.moveToDayOfWeek(4, -1);
      return this.navigate(this.current.getFullYear(), this.current.getWeek());
    },
    next: function() {
      this.current.moveToDayOfWeek(4, 1);
      return this.navigate(this.current.getFullYear(), this.current.getWeek());
    },
    today: function() {
      var _now;
      _now = Date.today();
      _now.setWeek(_now.getWeek());
      _now.moveToDayOfWeek(4);
      this.current = _now;
      return this.navigate(_now.getFullYear(), _now.getWeek());
    },
    _isToday: function(year, number) {
      var _now;
      _now = Date.today();
      _now.setWeek(_now.getWeek());
      _now.moveToDayOfWeek(4);
      return (_now.getFullYear() === year) && (_now.getWeek() === number);
    },
    processCollectorShow: function(collector) {
      return this.title.html(gettext('Week') + ' ' + collector.number() + '. ' + ovivo.config.MONTHS[collector.month()] + ' ' + collector.year());
    },
    processCollectorHide: function(month) {},
    initialize: function() {
      var _now;
      this.current = _now = new Date.today();
      _now.setWeek(_now.getWeek());
      _now.moveToDayOfWeek(4);
      this._initialize();
      this.title = $('.page.page-calendar header span.title.week-title');
      this.collectorsList = this.$('.weeks-list');
      this.todayButton = $('.page.page-calendar header .week-today');
      this.navigate(_now.getFullYear(), _now.getWeek());
      return true;
    }
  }));
});

define('_features/Switcher',['ovivo'], function() {
  var _Switcher;
  _Switcher = function(container, data, options) {
    this.container = container;
    container.children().each(function(i, el) {
      return $(el).addClass('switcher-option').data('value', data[i]);
    });
    container.on('click', _.bind(this._clickHandler, this));
    if (options != null) {
      _.extend(this, options);
    }
    return this;
  };
  _.extend(_Switcher.prototype, Backbone.Events);
  _Switcher.prototype.clear = function() {
    return $('.switcher-option.selected', this.container).removeClass('selected');
  };
  _Switcher.prototype._clickHandler = function(e) {
    var _el, _selected, _value;
    _el = $(e.target).closest('.switcher-option');
    if (_el.length > 0) {
      _selected = _el.hasClass('selected');
      this.clear();
      if (this.nullable === true && _selected === true) {
        _value = null;
      } else {
        _value = _el.data('value');
        _el.addClass('selected');
      }
      this.trigger('value', _value);
    }
    return true;
  };
  _Switcher.prototype.setValue = function(value) {
    this.clear();
    $('.switcher-option', this.container).filter(function(i, el) {
      return $(el).data('value') === value;
    }).addClass('selected');
    return this.trigger('value', value);
  };
  return _Switcher;
});

define('views/pages/Calendar/Page',['views/pages/PageBase', 'views/pages/Calendar/Month', 'views/pages/Calendar/Week', '_features/Switcher', 'ovivo'], function(PageBase, MonthView, WeekView, Switcher) {
  return PageBase.extend({
    el: '.page.page-calendar',
    events: function() {
      return _.extend({}, PageBase.prototype.events, {
        'click .navigate-left': 'prev',
        'click .navigate-right': 'next',
        'click .today': 'today',
        'click .button-create-new': 'createNew'
      });
    },
    prev: function() {
      return this.subViews[this.mode].prev();
    },
    next: function() {
      return this.subViews[this.mode].next();
    },
    today: function() {
      return this.subViews[this.mode].today();
    },
    createNew: function() {
      return ovivo.desktop.popups.createNewPopup.show();
    },
    transitionStart: function() {
      this.proxyCall('transitionStart', arguments);
      return true;
    },
    transitionComplete: function() {
      this.proxyCall('transitionComplete', arguments);
      return true;
    },
    processViewSwitcherValue: function(value) {
      return this.showSubView(value);
    },
    processEventsFilterSwitcherValue: function(value) {
      var _body;
      (_body = $('body')).removeClass('highlight-events open open-responses closed');
      if (value != null) {
        _body.addClass("highlight-events " + value);
        this._popupOverlay.show();
      } else {
        this._popupOverlay.hide();
      }
      return true;
    },
    processSubViewChange: function(name) {
      this.mode = name;
      this.viewSwitcher.setValue(name);
      return true;
    },
    clickOverlay: function() {
      return this.eventsFilterSwitcher.setValue(null);
    },
    initialize: function() {
      this.SubViews = [MonthView, WeekView];
      this.defaultSubView = 'week';
      this._popupOverlay = $('.popup-overlay');
      this._popupOverlay.on('click', _.bind(this.clickOverlay, this));
      this.on('subViewChange', this.processSubViewChange, this);
      this.viewSwitcher = new Switcher(this.$('.switcher-view'), ['week', 'month']);
      this.viewSwitcher.on('value', this.processViewSwitcherValue, this);
      this.eventsFilterSwitcher = new Switcher(this.$('.switcher-events-filter'), ['open', 'open-responses', 'closed'], {
        nullable: true
      });
      this.eventsFilterSwitcher.on('value', this.processEventsFilterSwitcherValue, this);
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('models/pages/Calendar',['models/pages/PageBase', 'views/pages/Calendar/Page', 'ovivo'], function(PageBase, View) {
  return PageBase.extend({
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('views/pages/Settings/General',['views/pages/PageBase', '_common/ResourceEditCommon', 'ovivo'], function(PageBase, ResourceEditCommon) {
  return PageBase.extend(_.extend({}, ResourceEditCommon.get({}), {
    el: '.page.page-settings .general-view',
    name: 'general',
    fields: ['first_name', 'last_name', 'mobile_phone', 'email'],
    types: {
      'first_name': String,
      'last_name': String,
      'mobile_phone': String,
      'email': String
    },
    saveHandler: function() {
      return this.save();
    },
    close: function() {},
    show: function() {
      var _this = this;
      return ovivo.desktop.resources.user.def.done(function() {
        return _this.setModel(ovivo.desktop.resources.user);
      });
    },
    initialize: function() {
      this.on('action:save', this.saveHandler, this);
      this.on('show', this.show, this);
      return true;
    }
  }));
});

define('views/pages/Settings/Notifications',['views/pages/PageBase', '_common/ResourceEditCommon', '_features/Switcher', 'ovivo'], function(PageBase, ResourceEditCommon, Switcher) {
  return PageBase.extend(_.extend({}, ResourceEditCommon.get({}), {
    el: '.page.page-settings .notifications-view',
    name: 'notifications',
    fields: [
      {
        name: 'notify_email',
        init: '_initSwitcher',
        setValue: '_setValue'
      }, {
        name: 'notify_sms',
        init: '_initSwitcher',
        setValue: '_setValue'
      }, {
        name: 'activity_digest',
        init: '_initSwitcher',
        setValue: '_setValue'
      }, {
        name: 'response_confirmation',
        init: '_initSwitcher',
        setValue: '_setValue'
      }, {
        name: 'event_reminders',
        init: '_initSwitcher',
        setValue: '_setValue'
      }, {
        name: 'event_urgent_within',
        init: '_initSwitcher',
        setValue: '_setValue'
      }
    ],
    types: [0, 0, 0, 0, 0, 1],
    variants: [[true, false], [3, 7, 14, null]],
    _initSwitcher: function(key, i) {
      var _switcher;
      _switcher = this.switchers[key] = new Switcher(this.$('.options-' + key), this.variants[this.types[i]]);
      return _switcher.on('value', this._valueHandlerCreator(key));
    },
    _setValue: function(name, value) {
      return this.switchers[name].setValue(value);
    },
    _valueHandlerCreator: function(key) {
      var _header, _this;
      _this = this;
      _header = this.$('.options-' + key).closest('.settings-item').children('.header');
      return function(value) {
        if (value === _this.original[key]()) {
          _header.removeClass('changed');
        } else {
          _header.addClass('changed');
        }
        return _this.model.set(key, value);
      };
    },
    saveHandler: function() {
      return this.save();
    },
    close: function() {},
    show: function() {
      var _this = this;
      return ovivo.desktop.resources.communication.def.done(function() {
        return _this.setModel(ovivo.desktop.resources.communication);
      });
    },
    initialize: function() {
      this.switchers = {};
      this.on('action:save', this.save, this);
      this.on('show', this.show, this);
      this.show();
      return true;
    }
  }));
});

define('views/pages/Settings/Availability',['views/pages/PageBase', 'ovivo'], function(PageBase) {
  return PageBase.extend({
    el: '.page.page-settings .availability-view',
    name: 'availability',
    events: {
      'click .button-add-new': 'addNew'
    },
    addNew: function() {
      ovivo.desktop.popups.editPopupWorkingHour.show();
      ovivo.desktop.popups.editPopupWorkingHour.create();
      return true;
    },
    addWorkingHour: function(workingHour) {
      return this.workingHours.append(workingHour.editView.el);
    },
    updateScrollers: function() {
      return this.baseView.updateScrollProcessors();
    },
    initialize: function() {
      var _this = this;
      this.workingHours = this.$('.working-hours');
      ovivo.desktop.resources.workingHours.on('add', this.addWorkingHour, this);
      ovivo.desktop.resources.workingHours.def.done(function() {
        ovivo.desktop.resources.workingHours.on('add', _this.updateScrollers, _this);
        return ovivo.desktop.resources.workingHours.on('remove', _this.updateScrollers, _this);
      });
      return true;
    }
  });
});

define('views/pages/Settings/Timeoff',['views/pages/PageBase', 'ovivo'], function(PageBase) {
  return PageBase.extend({
    el: '.page.page-settings .timeoff-view',
    name: 'timeoff',
    events: {
      'click .button-add-new': 'addNew'
    },
    addNew: function() {
      ovivo.desktop.popups.editPopupTimeoff.show();
      ovivo.desktop.popups.editPopupTimeoff.create();
      return true;
    },
    addInactivity: function(inactivity) {
      return this.inactivities.append(inactivity.editView.el);
    },
    updateScrollers: function() {
      return this.baseView.updateScrollProcessors();
    },
    initialize: function() {
      var _this = this;
      this.inactivities = this.$('.inactivities');
      ovivo.desktop.resources.inactivities.on('add', this.addInactivity, this);
      ovivo.desktop.resources.inactivities.def.done(function() {
        ovivo.desktop.resources.inactivities.on('add', _this.updateScrollers, _this);
        return ovivo.desktop.resources.inactivities.on('remove', _this.updateScrollers, _this);
      });
      return true;
    }
  });
});

define('_features/facebook',['_features/indicator', 'ovivo'], function(indicator) {
  return _.extend({}, Backbone.Events, {
    _set: function(name, value) {
      if (this[name] !== value) {
        this[name] = value;
        return this.trigger("change:" + name, value);
      }
    },
    _get: function(name) {
      return this[name];
    },
    processFBLoginStatus: function(obj) {
      var _ref, _ref1;
      this.signedRequest = obj != null ? (_ref = obj.authResponse) != null ? _ref.signedRequest : void 0 : void 0;
      this._set('fb-status', obj.status);
      if (obj.status === 'connected') {
        if ((_ref1 = this.connectFBdef) != null) {
          _ref1.resolve();
        }
      }
      return true;
    },
    _setHandlers: function() {
      return this.on('change:status', this.linkFacebook, this);
    },
    processAuth: function(data, textStatus, jqXHR) {
      indicator.success();
      if (jqXHR.status === 204) {
        this._set('status', false);
      } else if (jqXHR.status === 200) {
        this._set('status', true);
      }
      this.trigger('_setHandlers');
      return true;
    },
    initFB: function() {
      FB.init({
        appId: ovivo.config.FB_APP_ID,
        status: true,
        cookie: true,
        xfbml: true
      });
      indicator.start();
      $.ajax({
        url: '/api/1.0/authorize/connection/',
        success: _.bind(this.processAuth, this),
        error: indicator.error
      });
      return FB.getLoginStatus(_.bind(this.processFBLoginStatus, this));
    },
    processFBLogin: function(obj) {
      return this.processFBLoginStatus(obj);
    },
    processFBLogout: function(obj) {
      return this.processFBLoginStatus(obj);
    },
    connectFB: function() {
      var _this = this;
      this.connectFBdef = new $.Deferred();
      FB.login(function() {
        return FB.getLoginStatus(_.bind(_this.processFBLogin, _this), {
          redirect_uri: 'http://ovivo-mobile.eur00t.com'
        });
      });
      return this.connectFBdef;
    },
    disconnectFB: function() {
      var _this = this;
      return FB.logout(function() {
        return FB.getLoginStatus(_.bind(_this.processFBLogout, _this));
      });
    },
    linkFB: function() {
      indicator.start();
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          signed_request: this.signedRequest
        }),
        contentType: 'application/json',
        url: '/api/1.0/authorize/connection/',
        success: _.bind(this.processAuth, this),
        error: indicator.error
      });
      return true;
    },
    unlinkFB: function() {
      indicator.start();
      $.ajax({
        type: 'DELETE',
        data: ' ',
        url: '/api/1.0/authorize/connection/',
        success: _.bind(this.processAuth, this),
        error: indicator.error
      });
      return true;
    },
    linkFacebook: function() {
      var _FBStatus, _status,
        _this = this;
      _FBStatus = this._get('fb-status');
      _status = this._get('status');
      if (_FBStatus === 'connected') {
        if (_status === true) {
          this.linkFB();
        } else if (_status === false) {
          this.unlinkFB();
        }
      } else {
        if (_status === true) {
          this.connectFB().done(function() {
            return _this.linkFB();
          });
        } else if (_status === false) {
          this.unlinkFB();
          true;
        }
      }
      return false;
    },
    initialize: function() {
      var _this = this;
      this.once('_setHandlers', this._setHandlers, this);
      if (window.FB != null) {
        this.initFB();
      } else {
        window.fbAsyncInit = function() {
          return _this.initFB();
        };
      }
      return true;
    }
  });
});

define('views/pages/Settings/Connections',['views/pages/PageBase', '_features/Switcher', '_features/facebook', 'ovivo'], function(PageBase, Switcher, facebook) {
  var _processors;
  _processors = {
    'facebook': facebook
  };
  return PageBase.extend({
    el: '.page.page-settings .connections-view',
    name: 'connections',
    events: {},
    keys: ['facebook'],
    types: [0],
    variants: [[true, false]],
    _valueHandlerCreator: function(key, processor) {
      var _func;
      _func = function(value) {
        return processor._set('status', value);
      };
      return _.bind(_func, this);
    },
    _valueHandlerSetCreator: function(key) {
      var _connect, _disconnect, _func;
      _connect = this.$(".options-" + key + " .option-connect");
      _disconnect = this.$(".options-" + key + " .option-disconnect");
      _func = function(value) {
        if (value === true) {
          _connect.html(gettext('Connected'));
          _disconnect.html(gettext('Disconnect'));
        } else {
          _connect.html(gettext('Connect'));
          _disconnect.html(gettext('Disconnected'));
        }
        return this.switchers[key].setValue(value);
      };
      return _.bind(_func, this);
    },
    initialize: function() {
      var _this = this;
      this.switchers = {};
      _.each(this.keys, function(key, i) {
        var _processor, _switcher;
        _switcher = _this.switchers[key] = new Switcher(_this.$('.options-' + key), _this.variants[_this.types[i]]);
        _processor = _processors[key];
        _processor.initialize();
        _processor.on('change:status', _this._valueHandlerSetCreator(key));
        return _switcher.on('value', _this._valueHandlerCreator(key, _processor));
      });
      return true;
    }
  });
});

define('views/pages/Settings/Page',['views/pages/PageBase', 'views/pages/Settings/General', 'views/pages/Settings/Notifications', 'views/pages/Settings/Availability', 'views/pages/Settings/Timeoff', 'views/pages/Settings/Connections', 'ovivo'], function(PageBase, GeneralView, NotificationsView, AvailabilityView, TimeoffView, ConnectionsView) {
  return PageBase.extend({
    el: '.page.page-settings',
    events: function() {
      return _.extend({}, PageBase.prototype.events, {
        'click .sections-menu-item': 'menuClick',
        'click .button-save': 'save'
      });
    },
    menuRegExp: /\bsections-menu-item-(.+)\b/,
    menuClick: function(e) {
      var _item;
      _item = $(e.target).closest('.sections-menu-item');
      return this.showSubView(this.menuRegExp.exec(_item[0].className)[1]);
    },
    save: function() {
      return this.subViews[this.subView()].trigger('action:save');
    },
    transitionStart: function() {
      this.proxyCall('transitionStart', arguments);
      return true;
    },
    transitionComplete: function() {
      this.proxyCall('transitionComplete', arguments);
      return true;
    },
    changeName: function() {
      return this.$('header span.title').html(ovivo.desktop.resources.user.first_name() + ' ' + ovivo.desktop.resources.user.last_name());
    },
    initialize: function() {
      this.SubViews = [GeneralView, NotificationsView, AvailabilityView, TimeoffView, ConnectionsView];
      this.defaultSubView = 'general';
      this.proxyCall('initialize', arguments);
      ovivo.desktop.resources.user.on('change:first_name', this.changeName, this);
      ovivo.desktop.resources.user.on('change:last_name', this.changeName, this);
      return true;
    }
  });
});

define('models/pages/Settings',['models/pages/PageBase', 'views/pages/Settings/Page', 'ovivo'], function(PageBase, View) {
  return PageBase.extend({
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('views/pages/Feedback/Page',['_features/Switcher', '_features/indicator', 'views/pages/PageBase', '_features/notificationMessage', 'ovivo'], function(Switcher, indicator, PageBase, notificationMessage) {
  return PageBase.extend({
    el: '.page.page-feedback',
    events: function() {
      return _.extend({}, PageBase.prototype.events, {
        'click div.back-button': 'back',
        'click div.send-button': 'send',
        'keyup textarea': 'changeTextarea'
      });
    },
    back: function() {
      return ovivo.mobile.pages.options.show();
    },
    send: function() {
      if ((this.type !== null) && (this.text !== '')) {
        indicator.start();
        this.sendButton.addClass('disabled');
        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            category: this.type,
            feedback: this.text
          }),
          contentType: 'application/json',
          url: '/api/1.0/feedback/',
          success: _.bind(this.processSuccess, this),
          error: _.bind(this.processError, this)
        });
      }
      return true;
    },
    processSuccess: function() {
      indicator.success();
      ovivo.desktop.pages.calendar.show();
      notificationMessage.post(ovivo.desktop.pages.calendar.view.$el, gettext('Thanks for your feedback'));
      return true;
    },
    processError: function() {
      this.sendButton.removeClass('disabled');
      indicator.error();
      return true;
    },
    changeTextarea: function() {
      this.text = this.$('textarea').val();
      if (this.text === '') {
        return this.sendButton.addClass('disabled');
      } else if (this.type !== null) {
        return this.sendButton.removeClass('disabled');
      }
    },
    transitionStart: function() {
      this.proxyCall('transitionStart', arguments);
      return true;
    },
    transitionComplete: function() {
      this.proxyCall('transitionComplete', arguments);
      this.clear();
      return true;
    },
    processType: function(value) {
      this.type = value;
      if (this.text !== '') {
        return this.sendButton.removeClass('disabled');
      }
    },
    clear: function() {
      this.typeSwitcher.clear();
      this.type = null;
      this.$('textarea').val('');
      this.text = '';
      return this.sendButton.addClass('disabled');
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      this.typeSwitcher = new Switcher(this.$('.switcher-feedback-type'), ['error', 'comment', 'suggestion']);
      this.typeSwitcher.on('value', this.processType, this);
      this.sendButton = this.$('.send-button');
      this.clear();
      return true;
    }
  });
});

define('models/pages/Feedback',['models/pages/PageBase', 'views/pages/Feedback/Page', 'ovivo'], function(PageBase, View) {
  return PageBase.extend({
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('views/pages/Help/Page',['views/pages/PageBase', 'ovivo'], function(PageBase) {
  return PageBase.extend({
    el: '.page.page-help',
    events: function() {
      return _.extend({}, PageBase.prototype.events, {});
    },
    transitionStart: function() {
      this.proxyCall('transitionStart', arguments);
      return true;
    },
    transitionComplete: function(type) {
      this.proxyCall('transitionComplete', arguments);
      if ((type === 'enter') && (this.loaded === false)) {
        this.iframe.src = ovivo.config.HELP_URL;
      }
      return true;
    },
    iframeLoad: function() {
      return this.loaded = true;
    },
    initialize: function() {
      this.loaded = false;
      this.iframe = this.$('iframe')[0];
      this.iframe.onload = _.bind(this.iframeLoad, this);
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('models/pages/Help',['models/pages/PageBase', 'views/pages/Help/Page', 'ovivo'], function(PageBase, View) {
  return PageBase.extend({
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('views/pages/PageStandaloneAnimation',['_common/AnimationControl', 'ovivo'], function(AnimationControl) {
  var _obj;
  _obj = _.extend({}, AnimationControl, {
    _handlerEnterEnd: function(handler, $el, e) {
      $el.removeClass('enter');
      return $el.off(ovivo.config.ANIMATION_END, handler);
    },
    _handlerExitEnd: function(handler, $el, e) {
      $el.removeClass('exit');
      $el.addClass('hide');
      return $el.off(ovivo.config.ANIMATION_END, handler);
    },
    showEl: function() {
      this.$el.removeClass('hide');
      this._attachHandler(this._handlerEnterEnd);
      return this.$el.addClass('enter');
    },
    hideEl: function() {
      this._attachHandler(this._handlerExitEnd);
      return this.$el.addClass('exit');
    }
  });
  if (Modernizr.cssanimations === true) {
    return _obj;
  } else {
    return {};
  }
});

define('views/pages/Notifications/Page',['views/pages/PageBase', 'views/pages/PageStandaloneAnimation', 'ovivo'], function(PageBase, PageStandaloneAnimation) {
  return PageBase.extend(_.extend({}, PageStandaloneAnimation, {
    el: '.page.page-notifications',
    events: function() {
      return _.extend({}, PageBase.prototype.events, {
        'click div.done-button': 'list',
        'click .load-more-button': 'loadMoreClick'
      });
    },
    list: function() {
      ovivo.desktop.resources.notifications.readAll();
      return this.hideEl();
    },
    loadMoreClick: function() {
      return ovivo.desktop.resources.notifications.loadMore();
    },
    appendItem: function(item) {
      return this.$('.notifications-list').append(item);
    },
    prependItem: function(item) {
      return this.$('.notifications-list').prepend(item);
    },
    insertBefore: function(model, nextModel) {
      return nextModel.view.$el.before(model.view.$el);
    },
    checkLast: function() {
      if (ovivo.desktop.resources.notifications.isLast() === true) {
        return this.$('.load-more-button').hide();
      } else {
        return this.$('.load-more-button').show();
      }
    },
    resetHandler: function() {
      var _this = this;
      ovivo.desktop.resources.notifications.each(function(model) {
        return _this.appendItem(model.view.el);
      });
      this.checkLast();
      return true;
    },
    addHandler: function(model, collection, options) {
      var next, _i, _j;
      _i = collection.indexOf(model);
      _j = _i + 1;
      while (((next = collection.at(_j)) != null) && (next.inserted !== true)) {
        _j += 1;
      }
      if (next != null) {
        this.insertBefore(model, next);
      } else {
        this.appendItem(model.view.el);
      }
      this.checkLast();
      model.inserted = true;
      return true;
    },
    changeHandler: function() {
      return true;
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      ovivo.desktop.resources.notifications.on('reset', this.resetHandler, this);
      ovivo.desktop.resources.notifications.on('add', this.addHandler, this);
      ovivo.desktop.resources.notifications.on('change', this.changeHandler, this);
      return true;
    }
  }));
});

define('models/pages/Notifications',['models/pages/PageBase', 'views/pages/Notifications/Page', 'ovivo'], function(PageBase, View) {
  return PageBase.extend({
    popup: true,
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('views/pages/EventDetails/Page',['views/pages/PageBase', 'views/pages/PageStandaloneAnimation', 'models/resources/Comment', 'ovivo'], function(PageBase, PageStandaloneAnimation, Comment) {
  return PageBase.extend(_.extend({}, PageStandaloneAnimation, {
    el: '.page.page-event-details',
    events: function() {
      return _.extend({}, PageBase.prototype.events, {
        'click .post-comment': 'postComment',
        'keyup .comment-input': 'keyCommentInput'
      });
    },
    headerTemplate: Handlebars.templates['eventDetailsHeader'],
    transitionStart: function() {
      this.proxyCall('transitionStart', arguments);
      return true;
    },
    transitionComplete: function() {
      this.proxyCall('transitionComplete', arguments);
      return true;
    },
    postComment: function() {
      var _comment, _commentText;
      _commentText = this.$('.comment-input').val();
      if (_commentText !== '') {
        _comment = new Comment({
          comment: _commentText,
          reply_to: null
        });
        this.model.get('event').comments.add(_comment);
        _comment.save();
        this.clearInput();
      }
      return true;
    },
    keyCommentInput: function() {
      if (this.$('.comment-input').val() !== '') {
        this.$('footer').addClass('active');
      } else {
        this.clearInput();
      }
      return true;
    },
    clearInput: function() {
      this.$('footer').removeClass('active');
      return this.$('.comment-input').val('');
    },
    renderComments: function() {
      var _comments;
      _comments = this.model.get('event').comments;
      _comments.each(function(comment) {
        return this.$('ul.comments').append(comment.view.el);
      });
      return true;
    },
    addComment: function(comment) {
      this.$('ul.comments').append(comment.view.el);
      return true;
    },
    close: function() {
      ovivo.desktop.routers.main.navigate("/", {
        trigger: true
      });
      return this.hideEl();
    },
    changeEvent: function() {
      var _event, _eventDetailsView, _prevEvent,
        _this = this;
      this.clearInput();
      _event = this.model.get('event');
      _prevEvent = this.model.previous('event');
      _eventDetailsView = _event.detailsView;
      this.$('header span.title').html(_event.view.startDateFormated());
      this.$('.event-container').children().remove();
      this.$('.event-container').append(_eventDetailsView.el);
      _eventDetailsView.delegateEvents();
      _event.comments.on('add', this.addComment, this);
      if (_prevEvent != null) {
        _prevEvent.comments.off('add', this.addComment);
      }
      _event.comments.def.done(function() {
        return _this.renderComments();
      });
      return true;
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      this.model.on('change:event', this.changeEvent, this);
      return true;
    }
  }));
});

define('models/pages/EventDetails',['models/pages/PageBase', 'views/pages/EventDetails/Page', 'ovivo'], function(PageBase, View) {
  return PageBase.extend({
    popup: true,
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('views/pages/EditWorkingHours/Page',['views/pages/PageBase', 'views/pages/PageStandaloneAnimation', '_common/ResourceEditCommon', '_common/WorkingHoursEdit', 'ovivo'], function(PageBase, PageStandaloneAnimation, ResourceEditCommon, WorkingHoursEdit) {
  return PageBase.extend(_.extend({}, PageStandaloneAnimation, ResourceEditCommon.get(PageBase.prototype.events), WorkingHoursEdit, {
    el: '.page.page-edit-working-hours',
    initialize: function() {
      this.proxyCall('initialize', arguments);
      this.initializeEdit();
      return true;
    }
  }));
});

define('models/pages/EditWorkingHours',['models/pages/PageBase', 'views/pages/EditWorkingHours/Page', 'ovivo'], function(PageBase, View) {
  return PageBase.extend({
    popup: true,
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('views/pages/EditInactivity/Page',['views/pages/PageBase', 'views/pages/PageStandaloneAnimation', '_common/ResourceEditCommon', '_common/InactivityEdit', 'ovivo'], function(PageBase, PageStandaloneAnimation, ResourceEditCommon, InactivityEdit) {
  return PageBase.extend(_.extend({}, PageStandaloneAnimation, ResourceEditCommon.get(PageBase.prototype.events), InactivityEdit, {
    el: '.page.page-edit-inactivity',
    initialize: function() {
      this.proxyCall('initialize', arguments);
      this.initializeEdit();
      return true;
    }
  }));
});

define('models/pages/EditInactivity',['models/pages/PageBase', 'views/pages/EditInactivity/Page', 'ovivo'], function(PageBase, View) {
  return PageBase.extend({
    popup: true,
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('views/VoiceRecognition',['ovivo'], function() {
  return Backbone.View.extend({
    el: '#voice-recognition',
    processKey: function(e) {
      if (!((e.ctrlKey === true) && (e.shiftKey === true) && (e.keyCode === 19))) {
        return;
      }
      this.model.set('show', true);
      return this.model.set('processing', true);
    },
    resultsTemplate: Handlebars.templates['speechResults'],
    _clearState: function() {
      return this.$el.removeClass('initial processing result error');
    },
    changeShow: function() {
      var _this = this;
      if (this.model.show() === true) {
        this._clearState();
        this.$el.addClass('initial');
        this.$el.addClass('show');
      } else {
        setTimeout((function() {
          _this._clearState();
          return _this.$el.removeClass('show');
        }), 1000);
      }
      return true;
    },
    processStart: function() {
      this._clearState();
      return this.$el.addClass('processing');
    },
    processEnd: function() {},
    processResult: function(results) {
      var _this = this;
      this._clearState();
      this.$el.addClass('result');
      return this.$('.result').html(this.resultsTemplate({
        results: _.map(results, function(res) {
          return {
            status: res.flag === true ? 'success' : 'error',
            text: res.text
          };
        })
      }));
    },
    processError: function() {
      this._clearState();
      return this.$el.addClass('error');
    },
    initialize: function() {
      $(window).on('keypress', _.bind(this.processKey, this));
      this.model.on('change:show', this.changeShow, this);
      return true;
    }
  });
});

define('srgs-parser',[
    'ovivo'
], function () {
    //
    //  srgs.js
    //  Copyright (C) 2009, 2010, Peter Ljunglöf. All rights reserved.
    //
    /*
      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published 
      by the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
      
      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
      
      You should have received a copy of the GNU General Public License
      and the GNU Lesser General Public License along with this program.  
      If not, see <http://www.gnu.org/licenses/>.
    */

    //////////////////////////////////////////////////////////////////////
    // encoding SRGS grammars in javascript

    function Grammar(root) {
        this.$root = root;
        
        this.VOID = [OneOf([])];
        this.NULL = [];
        this.GARBAGE = []; 
        
        this.$check = function() {
            for (var i in this) {
                if (i !== "$root" && i !== "$check") {
                    try {
                        checkSequenceExpansion(this[i]);
                    } catch(err) {
                        throwRuleError("When checking grammar rule '" + i + "'", err);
                    }
                }
            }
        }
    }

    function WordSet(str) {
        var words = str.split(/ +/);
        var set = {};
        for (var i in words) {
            set[words[i]] = true;
        }
        return set;
    }


    //////////////////////////////////////////////////////////////////////
    // rule expansion constructors

    // sequences are ordinary arrays
    function Sequence(seq) {
        return seq;
    }

    function Ref(ref) {
        return new RefClass(ref);
    }

    function Tag(tag) {
        return new TagClass(tag);
    }

    function OneOf(alternatives) {
        return new OneOfClass(alternatives);
    }

    function Repeat(min, max, sequence) {
        return new RepeatClass(min, max, sequence);
    }

    function Optional(sequence) {
        return new RepeatClass(0, 1, sequence);
    }


    //////////////////////////////////////////////////////////////////////
    // rule expansion classes

    var RefClass = function (ruleref) {
        this.content = ruleref;
        this._string = "$" + ruleref;
        this.toString = function toString() {return this._string}
    }
        
    function TagClass(tag) {
        this.content = tag;
        this._string = "{" + tag + "}";
        this.toString = function toString() {return this._string}
    }

    function OneOfClass(alternatives) {
        this.content = alternatives;
        this._string = "(" + alternatives.join("|") + ")";
        this.toString = function toString() {return this._string}
    }

    function RepeatClass(min, max, sequence) {
        this.min = min;
        this.max = max;
        this.content = sequence;
        this._string = this.content + "<" + this.min + "-" + (this.max==Infinity ? "" : this.max) + ">"
        this.toString = function toString() {return this._string}
    }

    //////////////////////////////////////////////////////////////////////
    // checking rule expansions

    function throwRuleError(message, error) {
        if (error == undefined) {
            throw TypeError(message);
        } else {
            throw TypeError(message + "; " + error.message);
        }
    }

    function checkSequenceExpansion(sequence) {
        try {
            if (sequence.constructor !== Array) {
                throwRuleError("Expected Array, found " + sequence.constructor.name);
            }
            for (var i in sequence) {
                if (sequence[i].constructor == Array) {
                    checkSequenceExpansion(sequence[i]);
                } else if (sequence[i].constructor != String) {
                    sequence[i].checkExpansion();
                }
            }
        } catch(err) {
            throwRuleError("When checking sequence expansion", err);
        }
    }

    RefClass.prototype.checkExpansion = function checkExpansion() {
        if (this.content.constructor !== String) {
            throwRuleError("When checking Ref content; Expected String, found " + 
                           this.content.constructor.name);
        }
    }

    TagClass.prototype.checkExpansion = function checkExpansion() {
        if (this.content.constructor !== String) {
            throwRuleError("When checking Tag content; Expected String, found " + 
                           this.content.constructor.name);
        }
    }

    OneOfClass.prototype.checkExpansion = function checkExpansion() {
        try {
            if (this.content.constructor !== Array) {
                throwRuleError("Expected Array, found " + this.content.constructor.name);
            }
            for (var i in this.content) {
                checkSequenceExpansion(this.content[i]);
            }
        } catch(err) {
            throwRuleError("When checking OneOf content", err);
        }
    }

    RepeatClass.prototype.checkExpansion = function checkExpansion() {
        try {
            if (this.min.constructor !== Number || this.max.constructor !== Number) {
                throwRuleError("Expected min/max to be Number, found " + 
                               this.min.constructor.name + "/" + this.max.constructor.name);
            }
            if (!(0 <= this.min && this.min <= this.max)) {
                throwRuleError("Expected 0 <= min <= max, found " + this.min + "/" + this.max);
            }
            checkSequenceExpansion(this.content);
        } catch(err) {
            throwRuleError("When checking Repeat content", err);
        }
    }

    //
    //  chartparser.js
    //  Copyright (C) 2009, 2010, Peter Ljunglöf. All rights reserved.
    //
    /*
      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published 
      by the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
      
      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
      
      You should have received a copy of the GNU General Public License
      and the GNU Lesser General Public License along with this program.  
      If not, see <http://www.gnu.org/licenses/>.
    */


    //////////////////////////////////////////////////////////////////////
    // by default we do not produce debugging output:

    function LOG(str) {}

    // if you want to debug the parsing process, 
    // define the following before calling the parse() function:
    /* function LOG(msg) {console.log(String(msg));} */


    //////////////////////////////////////////////////////////////////////
    // by default we include parse trees in the parse results:

    function makeTree(label, children, data) {
        return {label: label, children: children, data: data};
    }

    // ...which can result in bigger parse charts and longer execution times.
    // if you don't want to include parse trees, 
    // define the following before calling the parse() function:
    /*
     makeTree = false;
     */


    //////////////////////////////////////////////////////////////////////
    // we need to be able to clone objects between different edges
    // borrowed from http://keithdevens.com/weblog/archive/2007/Jun/07/javascript.clone

    function clone(obj){
        if (obj == null || typeof(obj) != 'object') {
            return obj;
        }
        var temp = new obj.constructor(); 
        for (var key in obj) {
            temp[key] = clone(obj[key]);
        }
        return temp;
    }


    //////////////////////////////////////////////////////////////////////
    // objects are by default printed "[Object]"
    // to be able to use objects in hash tables, 
    // we need a better string representation

    function stringRepr(obj) {
        if (obj == null || typeof(obj) != 'object') {
            return String(obj);
        }
        var str = "{";
        for (var key in obj) {
            str += key + ":" + stringRepr(obj[key]) + ";";
        }
        return str + "}";
    }


    //////////////////////////////////////////////////////////////////////
    // parse chart
    // conceptually this is a set of edges, but it is optimized

    function Chart(numberOfWords) {
        this.numberOfWords = numberOfWords;
        this.passives = new Array(numberOfWords);
        this.actives = new Array(numberOfWords);
        for (var i = 0; i <= numberOfWords; i++) {
            this.passives[i] = {};
            this.actives[i] = {};
        }
        
        // Chart.add(edge)
        // add the edge to the chart, return true if the chart was changed 
        // (i.e. if the chart didn't already contain the edge)
        this.add = function add(edge) {
            var subchart, cat;
            if (edge.isPassive) {
                subchart = this.passives[edge.start];
                cat = edge.lhs;
            } else {
                subchart = this.actives[edge.end];
                cat = edge.next.content;
            }
            if (!(cat in subchart)) {
                subchart[cat] = {};
            }
            if (edge in subchart[cat]) {
                return false;
            } else {
                subchart[cat][edge] = edge;
                return true;
            }
        }
        
        // Chart.treesForRule(lhs, start, end)
        // return all parse trees for the given lhs, start, and end
        //  - start, end are optional; defaults to 0, numberOfWords
        this.treesForRule = function treesForRule(lhs, start, end) {
            start = start || 0;
            end = end || numberOfWords;
            var trees = [];
            var finalEdges = this.passives[start][lhs];
            for (var i in finalEdges) {
                if (finalEdges[i].end == end) {
                    trees.push(finalEdges[i].tree);
                }
            }
            return trees;
        }
        
        // Chart.allEdges() / Chart.allPassiveEdges() / Chart.allActiveEdges()
        // return an array of all (passive/active) edges in the chart
        this.allEdges = function allEdges() {
            return this.allPassiveEdges().concat(this.allActiveEdges());
        }
        this.allPassiveEdges = function allPassiveEdges() {
            var edges = [];
            for (var i in this.passives) 
                for (var j in this.passives[i]) 
                    for (var k in this.passives[i][j])
                        edges.push(this.passives[i][j][k]);
            return edges;
        }
        this.allActiveEdges = function allActiveEdges() {
            var edges = [];
            for (var i in this.actives) 
                for (var j in this.actives[i]) 
                    for (var k in this.actives[i][j])
                        edges.push(this.actives[i][j][k]);
            return edges;
        }
        
        // Chart.statistics()
        // return the number of edges in the chart
        this.statistics = function statistics() {
            var passives = this.allPassiveEdges().length;
            var actives = this.allActiveEdges().length;
            return {nrEdges: passives+actives, nrPassiveEdges: passives, nrActiveEdges: actives};
        }
    }


    //////////////////////////////////////////////////////////////////////
    // parse edges: passive and active

    function PassiveEdge(start, end, lhs, out, tree) {
        this.start = start;
        this.end = end;
        this.lhs = lhs;
        this.out = out;
        this.tree = tree;
        this.isPassive = true;
        
        var str = "[" + start + "-" + end + "] $" + lhs + " := " + 
                    stringRepr(out) + " / " + stringRepr(tree);
        this._string = str;
        this.toString = function toString() {return this._string;} 
    }

    function ActiveEdge(start, end, lhs, next, rest, out, rules, children) {
        this.start = start;
        this.end = end;
        this.lhs = lhs;
        this.next = next;
        this.rest = rest;
        this.out = out;
        this.rules = rules;
        this.children = children;
        this.isPassive = false;
        
        var str = "<" + start + "-" + end + "> $" + lhs + " -> " + next + 
                    ", " + rest + " := " + stringRepr(out) + " <- " + 
                    stringRepr(rules) + " / " + stringRepr(children);
        this._string = str;
        this.toString = function toString() {return this._string;} 
    }


    //////////////////////////////////////////////////////////////////////
    // the main parsing function: a simple top-down chartparser
    //  - 'words' is an array of strings
    //  - 'grammar' is a hash table of left-hand-sides mapping to arrays of right-hand-sides
    //  - 'root' is the starting category (a string)
    //    if unspecified, use the '$root' property of the grammar
    //  - 'filter' is an optional left-corner filter 
    //    (a mapping from categories/rule-refs to words)
    //    if specified, it is used when predicting new edges
    // returns the final chart

    function parse(words, grammar, root, filter) {
        if (!root) {
            root = grammar.$root;
        }
        var chart = new Chart(words.length);
        var agenda = [];
        
        var leftCornerFilter;
        if (filter == undefined) {
            leftCornerFilter = function() {return true};
        } else {
            leftCornerFilter = function leftCornerFilter(ruleref, position) {
                var leftCorners = filter[ruleref];
                return leftCorners ? words[position] in leftCorners : true;
            }
        }
        
        // add an edge to the chart and the agenda, if it does not already exist
        function addToChart(inference, start, end, lhs, rhs, out, rules, children) {
            var edge;
            if (rhs.length > 0) {
                var next = rhs[0];
                var rest = rhs.slice(1);
                switch (next.constructor) {
                        
                    case Array:
                        // the next symbol is a sequence
                        addToChart(inference+",SEQUENCE", start, end, lhs, 
                                   next.concat(rest), out, rules, children);
                        return;
                        
                    case RepeatClass:
                        // the next symbol is a repetition
                        var min = next.min;
                        var max = next.max;
                        // skip repeat 
                        if (min <= 0) {
                            addToChart(inference+",SKIP", start, end, lhs, 
                                       rest, out, rules, children);
                        }
                        // repeat 
                        if (max > 0) {
                            var content = next.content;
                            var rhs = [content];
                            if (max > 1) {
                                rhs.push(Repeat(min ? min-1 : min, max-1, content));
                            }
                            addToChart(inference+",REPEAT", start, end, lhs, 
                                       rhs.concat(rest), out, rules, children);
                        }
                        return;
                        
                    case OneOfClass:
                        // the next symbol is a disjunction
                        var oneof = next.content;
                        for (var i in oneof) {
                            var rhs = oneof[i].concat(rest);
                            addToChart(inference+",ONEOF", start, end, lhs, 
                                       rhs, out, rules, children);
                        } 
                        return;
                        
                    case TagClass:
                        // the next symbol is a semantic action
                        out = clone(out);
                        rules = clone(rules);
                        children = clone(children);
                        eval(next.content);
                        addToChart(inference+",TAG", start, end, lhs, 
                                   rest, out, rules, children);
                        return;
                }
                edge = new ActiveEdge(start, end, lhs, next, rest, out, rules, children);
                
            } else {
                var tree;
                if (makeTree) {
                    tree = makeTree(lhs, children, out);
                } else {
                    tree = out;
                }
                edge = new PassiveEdge(start, end, lhs, out, tree);
            }
            
            // try to add the edge; if successful, also add it to the agenda
            if (chart.add(edge)) {
                LOG("+ " + inference + ": " + edge);
                agenda.push(edge);
            }
        }
        
        // seed the agenda with the starting rule
        addToChart("INIT", 0, 0, root, grammar[root], {}, {}, []);
        
        // main loop
        while (agenda.length > 0) {
            var edge = agenda.pop();
            var start= edge.start;
            var end  = edge.end;
            var lhs  = edge.lhs;
            var next = edge.next;
            LOG(edge);
            
            if (edge.isPassive) {
                // combine
                var actives = chart.actives[start][lhs];
                for (var i in actives) {
                    var active = actives[i];
                    var rules = clone(active.rules);
                    rules[edge.lhs] = clone(edge.out);
                    var children;
                    if (makeTree) {
                        children = clone(active.children);
                        children.push(clone(edge.tree));
                    }
                    addToChart("COMBINE", active.start, end, active.lhs, 
                               
                               active.rest, active.out, rules, children);
                }
                
            } else if (next.constructor == RefClass) {
                var ref = next.content;
                // combine
                var passives = chart.passives[end][ref];
                for (var i in passives) {
                    var passive = passives[i];
                    var rules = clone(edge.rules);
                    rules[passive.lhs] = clone(passive.out);
                    var children;
                    if (makeTree) {
                        children = clone(edge.children);
                        children.push(clone(passive.tree));
                    }
                    addToChart("COMBINE", start, passive.end, lhs, 
                               edge.rest, edge.out, rules, children);
                }
                // predict
                if (ref in grammar) {
                    if (leftCornerFilter(ref, end)) {
                        addToChart("PREDICT", end, end, ref, 
                                   grammar[ref], {}, {}, []);
                    }
                }
                
            } else if (next == words[end]) {
                // scan
                var children;
                if (makeTree) {
                    children = clone(edge.children);
                    children.push(next);
                }
                addToChart("SCAN", start, end+1, lhs, 
                           edge.rest, edge.out, edge.rules, children);
            }
        }
        
        return chart;
    }

    var _returnObj = {
        Grammar: Grammar,
        Tag: Tag,
        OneOf: OneOf,
        Ref: Ref,
        RefClass: RefClass,
        parse: parse
    };

    return _returnObj;
});
define('_features/voiceRecognitionGrammar',['srgs-parser', 'ovivo'], function(parser) {
  return _.extend(new parser.Grammar('statement'), {
    statement: [parser.Ref('command'), parser.Tag('out = rules.command')],
    command: [parser.OneOf([[parser.Ref('commandOpen'), parser.Tag('out.type = \'open\''), parser.Tag('out.target = rules.commandOpen')], [parser.Ref('commandCreate'), parser.Tag('out.type = \'create\''), parser.Tag('out.target = rules.commandCreate')]])],
    commandOpen: [gettext('open'), parser.OneOf([[gettext('calendar'), parser.Tag('out = \'calendar\'')], [gettext('settings'), parser.Tag('out = \'settings\'')], [gettext('feedback'), parser.Tag('out = \'feedback\'')], [gettext('help'), parser.Tag('out = \'help\'')]])],
    commandCreate: [gettext('create'), parser.OneOf([['time', 'off', parser.Tag('out = \'inactivity\'')], ['timeoff', parser.Tag('out = \'inactivity\'')], ['inactivity', parser.Tag('out = \'inactivity\'')], ['working', 'hours', parser.Tag('out = \'working-hours\'')], ['working', 'hour', parser.Tag('out = \'working-hours\'')]])]
  });
});

define('models/VoiceRecognition',['models/resources/ResourceBase', 'views/VoiceRecognition', '_features/voiceRecognitionGrammar', 'srgs-parser', 'ovivo'], function(ResourceBase, View, voiceRecognitionGrammar, parser) {
  return ResourceBase.extend({
    _gettersNames: ['processing', 'show'],
    changeProcessing: function() {
      var _val;
      _val = this.processing();
      if (_val === false) {
        this.set('show', false);
        return;
      }
      if (_val === true) {
        this._recognition.start();
      }
      return true;
    },
    _applyGrammar: function(str) {
      return parser.parse(str.split(/\s+/), voiceRecognitionGrammar, voiceRecognitionGrammar.$root).treesForRule(voiceRecognitionGrammar.$root);
    },
    _analyseSpeech: (function() {
      return function(str) {
        var _tree;
        if ((_tree = this._applyGrammar(str)[0]) == null) {
          return false;
        }
        switch (_tree.data.type) {
          case 'open':
            ovivo.desktop.pages[_tree.data.target].show();
        }
        return true;
      };
    })(),
    processStart: function() {
      return this.view.processStart();
    },
    processEnd: function() {
      this.view.processEnd();
      return this.set('processing', false);
    },
    processResult: function(e) {
      var _this = this;
      this.view.processResult(_.flatten(_.map(e.originalEvent.results, function(res) {
        return _.map(res, function(res) {
          var _flag;
          _flag = _this._analyseSpeech(res.transcript);
          return {
            text: res.transcript,
            flag: _flag
          };
        });
      })));
      return true;
    },
    processError: function() {
      return this.view.processError();
    },
    initialize: function() {
      if (window.webkitSpeechRecognition === void 0) {
        return;
      }
      this._recognition = new webkitSpeechRecognition();
      this._recognition.lang = ovivo.config.LANG;
      $(this._recognition).on('start', _.bind(this.processStart, this));
      $(this._recognition).on('end', _.bind(this.processEnd, this));
      $(this._recognition).on('result', _.bind(this.processResult, this));
      $(this._recognition).on('error', _.bind(this.processError, this));
      this.on('change:processing', this.changeProcessing, this);
      this.View = View;
      return this.proxyCall('initialize', arguments);
    }
  });
});

define('views/SideBar',['ovivo'], function() {
  return Backbone.View.extend({
    el: '.side-bar',
    events: {
      'click .menu-item': 'processItemClick',
      'click .logo.title': 'showNotifications'
    },
    updateNotifications: function(model, collection, options) {
      var _unread,
        _this = this;
      _unread = ovivo.desktop.resources.notifications.unreadLength();
      this.$('.notifications-indicator-container').fadeOut(300).promise().then(function() {
        if (_unread !== 0) {
          _this.$('.notifications-indicator').html(_unread);
          return _this.$('.notifications-indicator-container').fadeIn(300);
        }
      });
      return true;
    },
    menuItemRegExp: /^menu-item-(.*)$/,
    showNotifications: function(e) {
      return ovivo.desktop.pages.notifications.view.showEl();
    },
    _processItem: function(item) {
      if (this.prev != null) {
        this.prev.removeClass('selected');
      } else {
        this.$('.selected').removeClass('selected');
      }
      item.addClass('selected');
      return this.prev = item;
    },
    processItemClick: function(e) {
      var _item;
      _item = $(e.target).closest('.menu-item');
      ovivo.desktop.pages[this.menuItemRegExp.exec(_item[0].id)[1]].show();
      this._processItem(_item);
      return true;
    },
    setPage: function(name) {
      var _item;
      _item = this.$('#menu-item-' + name);
      return this._processItem(_item);
    },
    initialize: function() {
      ovivo.desktop.resources.notifications.on('reset', this.updateNotifications, this);
      ovivo.desktop.resources.notifications.on('add', this.updateNotifications, this);
      return true;
    }
  });
});

define('views/resources/Notification',['_features/dateFormatter', 'views/resources/ResourceBase', 'ovivo'], function(dateFormatter, ResourceBase) {
  return ResourceBase.extend({
    common: {},
    tagName: 'li',
    className: 'notification',
    template: Handlebars.templates['notification'],
    groupTemplate: Handlebars.templates['notification_group'],
    name: function() {
      return this.model.summary().split(' ').slice(0, 2).join(' ');
    },
    summary: function() {
      return this.model.summary().split(' ').slice(2).join(' ');
    },
    timestamp: function() {
      return dateFormatter(this.model.timestamp());
    },
    postRender: function() {
      if (this.read() === true) {
        this.$el.addClass('visited');
      } else {
        this.$el.removeClass('visited');
      }
      return true;
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('models/resources/Notification',['models/resources/ResourceBase', 'views/resources/Notification', 'ovivo'], function(ResourceBase, View) {
  return ResourceBase.extend({
    _gettersNames: ['timestamp', 'link', 'summary', 'event_id', 'read', 'last', 'pk'],
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('collections/resources/Notifications',['models/resources/Notification', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    url: "" + ovivo.config.API_URL_PREFIX + "notifications/",
    comparator: function(notification) {
      return -Date.parse(notification.timestamp()).valueOf();
    },
    unreadLength: function() {
      return this.filter(function(model) {
        return model.read() === false;
      }).length;
    },
    isLast: function() {
      if ((this.length === 0) || ((this.find(function(notification) {
        return notification.last() === true;
      })) != null)) {
        return true;
      } else {
        return false;
      }
    },
    loadMore: function() {
      var _lastId;
      _lastId = this.last().id;
      return this._fetch({
        'start_pk': _lastId
      });
    },
    readAll: function() {
      var _jsonArr, _unread;
      _unread = this.filter(function(notification) {
        return notification.read() === false;
      });
      _jsonArr = [];
      _.each(_unread, function(notification) {
        notification.set('read', true);
        _jsonArr.push(notification.toJSON());
        return true;
      });
      ovivo.desktop.sideBar.updateNotifications();
      if (_jsonArr.length > 0) {
        return $.ajax({
          url: this.url,
          type: 'PUT',
          data: JSON.stringify(_jsonArr),
          contentType: 'application/json'
        });
      } else {
        return true;
      }
    },
    initialize: function() {
      this.initResource();
      return true;
    }
  }));
});

define('collections/resources/CachableCollection',['ovivo'], function() {
  return Backbone.Collection.extend({
    _getCacheDateString: function(model) {
      var _day, _month, _ref, _year;
      _ref = model.start_date().split('-'), _year = _ref[0], _month = _ref[1], _day = _ref[2];
      return "" + (parseInt(_year)) + "-" + (parseInt(_month)) + "-" + (parseInt(_day));
    },
    addCacheHandler: function(model, collection) {
      var _hash;
      if (model.start_date() !== void 0) {
        _hash = this._getCacheDateString(model);
        if (typeof this.dateCache[_hash] === 'undefined') {
          this.dateCache[_hash] = [];
        }
        this.dateCache[_hash].push(model);
      }
      return true;
    },
    removeCacheHandler: function(model, collection) {
      var _array, _hash, _i;
      _hash = this._getCacheDateString(model);
      _array = this.dateCache[_hash];
      _i = _.indexOf(_array, model);
      if (_i !== -1) {
        _array.splice(_i, 1);
        if (_array.length === 0) {
          this.dateCache[_hash] = void 0;
        }
      }
      return true;
    },
    initCache: function() {
      this.dateCache = {};
      this.on('add', this.addCacheHandler, this);
      this.on('remove', this.removeCacheHandler, this);
      return true;
    }
  });
});

define('collections/CollectionBase',[], function() {
  return {
    clear: function() {
      return this.remove(this.models);
    }
  };
});

define('collections/resources/Events',['_features/localStorageCache', 'collections/resources/CachableCollection', 'collections/CollectionBase', 'models/resources/Event', 'ovivo'], function(localStorageCache, CachableCollection, CollectionBase, Event) {
  return CachableCollection.extend(_.extend({}, CollectionBase, {
    model: Event,
    url: function() {
      return "" + ovivo.config.API_URL_PREFIX + "users/" + ovivo.config.USER_ID + "/events/";
    },
    template: Handlebars.templates['events'],
    comparator: function(event) {
      return new Date(event.start_date());
    },
    _getQueryString: function(data) {
      return _.reduce(data, (function(memo, value, key) {
        return "" + memo + "&" + key + "=" + value;
      }), '');
    },
    _getTypeQueryString: function(data) {
      return _.reduce(data, (function(memo, value, key) {
        if (value === true) {
          return "" + memo + "&type=" + key;
        } else {
          return memo;
        }
      }), '');
    },
    _fetch: function(data) {
      var _callObj, _def, _queryStringFinal,
        _this = this;
      _queryStringFinal = (this._getQueryString(data) + this._getTypeQueryString(this.type)).slice(1);
      if (this.def.state() === 'resolved') {
        this.def = new $.Deferred();
      }
      _def = new $.Deferred();
      _callObj = {
        update: true,
        remove: false,
        data: _queryStringFinal,
        success: function(col, response) {
          _this.def.resolve(response);
          _def.resolve(response);
          return true;
        },
        error: function() {
          _this.def.reject();
          _def.reject();
          return true;
        }
      };
      if (this._ready === true) {
        this.fetch(_callObj);
      } else {
        this._calls.push(_callObj);
      }
      return this.def;
    },
    fetchMonth: function(month, year) {
      var _def,
        _this = this;
      _def = new $.Deferred();
      if (typeof this.monthCache["" + year + "-" + month] !== 'undefined') {
        _def.resolve();
      } else {
        this.monthCache["" + year + "-" + month] = true;
        (this._fetch({
          month: month + 1,
          year: year
        })).then(function() {
          _def.resolve();
          return true;
        });
      }
      return _def;
    },
    fetchWeek: function(number, year, date) {
      return this.fetchMonth(date.getMonth(), year);
    },
    fetchBetween: function(start_pk, end_pk) {
      return this._fetch({
        start_pk: start_pk,
        end_pk: end_pk
      });
    },
    fetchNext: function(limit) {
      var _this = this;
      if (limit == null) {
        limit = 10;
      }
      return this._fetch((function() {
        var _obj, _ref;
        _obj = {
          start_pk: (_ref = _this.last()) != null ? _ref.pk() : void 0,
          limit: limit
        };
        if (_obj.start_pk == null) {
          delete _obj.start_pk;
        }
        return _obj;
      })());
    },
    clear: function() {
      this.monthCache = {};
      this.dateCache = {};
      this.reset();
      return true;
    },
    initFetch: function() {
      var _this = this;
      this._ready = true;
      _.each(this._calls, function(callObj) {
        return _this.fetch(callObj);
      });
      this._calls = [];
      return true;
    },
    renderGroup: function(views) {
      var _DOM, _hash;
      _hash = {};
      views = _.filter(views, function(view) {
        if (_hash[view.model.id] !== true) {
          _hash[view.model.id] = true;
          return true;
        } else {
          return false;
        }
      });
      _DOM = $(this.template({
        events: views
      }));
      return _.each(views, function(view) {
        var _elements;
        _elements = $('#event-view-' + view.model.pk(), _DOM);
        view.$el.children().remove();
        view.$el.append(_elements.children());
        view.postRender();
        return true;
      });
    },
    cache: function() {},
    initialize: function(models, options) {
      this._ready = false;
      this._calls = [];
      this.type = {
        'open': true,
        'open-responses': true,
        'closed': true
      };
      _.extend(this, options);
      this.on('change', this.cache, this);
      this.def = new $.Deferred();
      this.monthCache = {};
      this.initCache();
      return true;
    }
  }));
});

define('models/resources/Municipality',['models/resources/ResourceBase', 'ovivo'], function(ResourceBase, View) {
  return ResourceBase.extend({
    _gettersNames: ['name', 'pk'],
    initialize: function(attrs, options) {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('collections/resources/Municipalities',['models/resources/Municipality', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    url: "" + ovivo.config.API_URL_PREFIX + "departments/municipalities/",
    initialize: function() {
      this.initResource();
      return true;
    }
  }));
});

define('models/resources/PrimaryDepartment',['models/resources/ResourceBase', 'ovivo'], function(ResourceBase) {
  return ResourceBase.extend({
    _gettersNames: ['name', 'municipality', 'pk'],
    initialize: function(attrs, options) {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('collections/resources/PrimaryDepartments',['models/resources/PrimaryDepartment', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    url: "" + ovivo.config.API_URL_PREFIX + "departments/primary_departments/",
    initialize: function() {
      this.initResource();
      return true;
    }
  }));
});

define('models/resources/Group',['models/resources/ResourceBase', 'ovivo'], function(ResourceBase, View) {
  return ResourceBase.extend({
    _gettersNames: ['name', 'chainName', 'parent', 'primary_department', 'children', 'allowed', 'pk'],
    setChainName: function() {
      var _cur, _str;
      _str = this.name();
      _cur = this;
      while ((_cur = this.collection.get(_cur.parent())) != null) {
        _str = _cur.name() + ' → ' + _str;
      }
      this.set('chainName', _str);
      return true;
    },
    initialize: function(attrs, options) {
      this.set('children', []);
      this.proxyCall('initialize', arguments);
      this.setChainName();
      return true;
    }
  });
});

define('collections/resources/Groups',['models/resources/Group', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    url: "" + ovivo.config.API_URL_PREFIX + "groups/",
    postProcess: function() {
      var _this = this;
      return this.each(function(group) {
        var _parent;
        if ((_parent = group.parent()) != null) {
          _this.get(_parent).get('children').push(group);
        }
        return group.setChainName();
      });
    },
    _ignoreChange: ['chainName', 'children', 'allowed'],
    initialize: function() {
      this.initResource();
      this.def.then(_.bind(this.postProcess, this));
      return true;
    }
  }));
});

define('models/resources/GroupRelation',['models/resources/ResourceBase', 'ovivo'], function(ResourceBase, View) {
  return ResourceBase.extend({
    _gettersNames: ['checked', 'parent', 'children', 'primary_department', 'pk'],
    initialize: function(attrs, options) {
      this.set('children', []);
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('collections/resources/GroupRelations',['models/resources/GroupRelation', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    url: function() {
      return "" + ovivo.config.API_URL_PREFIX + "users/" + ovivo.config.USER_ID + "/groups/";
    },
    postProcess: function() {
      var _allowed;
      _allowed = this.pluck('pk');
      return _.each(ovivo.desktop.resources.groups.each(function(group) {
        var _value;
        _value = _allowed.indexOf(group.id) === -1 ? false : true;
        return group.set('allowed', _value);
      }));
    },
    initialize: function(models, options) {
      _.extend(this, options);
      this.initResource();
      $.when(this.def, ovivo.desktop.resources.groups.def).then(_.bind(this.postProcess, this));
      return true;
    }
  }));
});

define('views/resources/WorkingHour',['views/resources/ResourceBase', 'ovivo'], function(ResourceBase) {
  return ResourceBase.extend({
    common: {},
    tagName: 'li',
    className: 'working-hour element',
    template: Handlebars.templates['workingHour'],
    groupTemplate: Handlebars.templates['workingHour_group'],
    events: {
      'mouseenter': 'processMouseEnter',
      'mouseleave': 'processMouseLeave',
      'click': 'processClick'
    },
    processMouseEnter: function() {
      return this.model.highlight();
    },
    processMouseLeave: function() {
      return this.model.removeHighlight();
    },
    processClick: function(e) {
      var _mode;
      if (this.model.isSingle() === true) {
        _mode = 'edit-single';
      } else {
        _mode = 'edit';
      }
      ovivo.desktop.pages.editWorkingHours.view.showEl();
      ovivo.desktop.pages.editWorkingHours.view.edit(this.model, _mode);
      e.stopPropagation();
      return false;
    },
    _getDateStr: function(_date) {
      if (_date != null) {
        return "" + (ovivo.config.DAYS[_date.getDay()].toLowerCase().slice(0, 3)) + " " + (_date.getDate()) + ". " + (ovivo.config.MONTHS[_date.getMonth()].toLowerCase());
      } else {
        return '';
      }
    },
    start_date: function() {
      var _start_date;
      if ((_start_date = this.model.start_date()) != null) {
        return this._getDateStr(new Date(Date.parse(_start_date)));
      } else {
        return '';
      }
    },
    end_date: function() {
      var _end_date;
      if (this.model.end_date() === this.model.start_date()) {
        return '';
      } else if ((_end_date = this.model.end_date()) != null) {
        return " – " + (this._getDateStr(new Date(Date.parse(_end_date))));
      } else {
        return ' – \u221E';
      }
    },
    available: function() {
      if (this.model.available() === true) {
        return gettext('Available');
      } else {
        return gettext('Unavailable');
      }
    },
    postRender: function() {
      var _className;
      _className = this.model.available() === true ? 'available' : 'unavailable';
      return this.$('.element-container').removeClass('available unavailable').addClass(_className);
    },
    initialize: function() {
      this.model.setDeltaHours();
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('views/resources/WorkingHourEdit',['views/resources/ResourceBase', 'ovivo'], function(ResourceBase) {
  return ResourceBase.extend({
    common: {},
    tagName: 'li',
    className: 'working-hour element',
    template: Handlebars.templates['workingHourEdit'],
    groupTemplate: Handlebars.templates['workingHourEdit_group'],
    events: {
      'click li.weekday': 'weekdayClick',
      'click .edit-button': 'edit',
      'click .remove-button': 'processRemove'
    },
    weekdayClick: function(e) {
      var _i, _item;
      _item = $(e.target).closest('.weekday');
      _i = _item.index();
      return this.model.processWeek(_i, this.model.weekdaysHash[_i]);
    },
    edit: function() {
      var _mode;
      if (this.model.isSingle() === true) {
        _mode = 'edit-single';
      } else {
        _mode = 'edit';
      }
      ovivo.desktop.popups.editPopupWorkingHour.show();
      return ovivo.desktop.popups.editPopupWorkingHour.edit(this.model, _mode);
    },
    _getDateStr: function(_date) {
      if (_date != null) {
        return "" + (_date.getDate()) + ". " + (ovivo.config.MONTHS[_date.getMonth()].toLowerCase().slice(0, 3));
      } else {
        return '';
      }
    },
    start_date: function() {
      var _start_date;
      if ((_start_date = this.model.start_date()) != null) {
        return this._getDateStr(new Date(Date.parse(_start_date)));
      } else {
        return '';
      }
    },
    end_date: function() {
      var _end_date;
      if (this.model.end_date() === this.model.start_date()) {
        return '';
      } else if ((_end_date = this.model.end_date()) != null) {
        return " – " + (this._getDateStr(new Date(Date.parse(_end_date))));
      } else {
        return ' – \u221E';
      }
    },
    available: function() {
      if (this.model.available() === true) {
        return gettext('Available');
      } else {
        return gettext('Unavailable');
      }
    },
    _repeatStrs: [gettext('Every other week').toLowerCase(), gettext('Every second week').toLowerCase(), gettext('Every third week').toLowerCase(), gettext('Every fourth week').toLowerCase()],
    repeat: function() {
      return this._repeatStrs[this.model.repeat() - 1];
    },
    postRender: function() {
      var _this = this;
      return this.$('.columns.weekdays > li').each(function(i, elem) {
        if (_this.model.weekdaysHash[i] === true) {
          return $(elem).addClass('checked');
        } else {
          return $(elem).removeClass('checked');
        }
      });
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      this.weekDays = this.$('ul.weekdays');
      return true;
    }
  });
});

define('_features/validators',[], function() {
  return {
    time: function(name, time) {
      var match, _hours, _minutes, _returnValue;
      _returnValue = void 0;
      match = _.compact(ovivo.config.VALIDATION_REGEXP_TIME.exec(time));
      if (match.length === 0) {
        _returnValue = name;
      } else {
        match = match.slice(1);
        _hours = parseInt(match[2]);
        if (!((_hours >= 0) && (_hours <= 24))) {
          _returnValue = name;
        } else {
          _minutes = parseInt(match[3]);
          if (!((_minutes >= 0) && (_minutes <= 60))) {
            _returnValue = name;
          }
        }
      }
      return _returnValue;
    }
  };
});

define('models/resources/WorkingHour',['models/resources/ResourceBase', 'views/resources/WorkingHour', 'views/resources/WorkingHourEdit', '_features/validators', 'ovivo'], function(ResourceBase, View, EditView, validators) {
  return ResourceBase.extend({
    typeName: 'workingHour',
    _gettersNames: ['weekdays', 'available', 'repeat', 'exclusions', 'groups', 'start_date', 'end_date', 'start_time', 'end_time', 'pk', 'start_date_obj', 'end_date_obj', 'deltaHours'],
    isSingle: function() {
      return this.start_date() === this.end_date();
    },
    _getTrueHash: function(hash) {
      return _.compact(_.map(_.pairs(hash), function(arr) {
        if (arr[1] === true) {
          return parseInt(arr[0]) + 1;
        } else {
          return void 0;
        }
      }));
    },
    processWeek: function(num, value) {
      var _weeks;
      value = !value;
      this.weekdaysHash[num] = value;
      _weeks = this._getTrueHash(this.weekdaysHash);
      this.set('weekdays', _weeks.length > 0 ? _weeks.join(',') : null);
      return true;
    },
    processGroup: function(pk, value) {
      var _groups;
      value = !value;
      this.groupsHash[pk] = value;
      _groups = this._getTrueHash(this.groupsHash);
      this.set('groups', _.map(_groups, function(group) {
        return parseInt(group);
      }));
      return true;
    },
    groups: function() {
      var _groups;
      if ((_groups = this.get('groups')) != null) {
        return _groups;
      } else {
        return [];
      }
    },
    validate: function(attrs) {
      if ((attrs.available != null) && (attrs.start_date != null) && (attrs.start_time != null) && (attrs.end_time != null) && (attrs.weekdays != null) && attrs.repeat) {
        return void 0;
      } else {
        return gettext('Params are missing');
      }
    },
    validate: function(attrs) {
      var _this = this;
      return _.reduce([
        {
          name: 'start_time',
          value: attrs.start_time
        }, {
          name: 'end_time',
          value: attrs.end_time
        }
      ], (function(memo, obj) {
        if (typeof memo !== 'undefined') {
          return memo;
        } else {
          return validators.time(obj.name, obj.value);
        }
      }), void 0);
    },
    toJSON: function() {
      var _json;
      _json = Backbone.Model.prototype.toJSON.call(this);
      if ((_json.groups instanceof Array) && (_json.groups.length === 0)) {
        this.set('groups', null, {
          silent: true
        });
        _json.groups = null;
      }
      delete _json.start_date_obj;
      delete _json.end_date_obj;
      delete _json.deltaHours;
      return _json;
    },
    processRange: function(start, end) {
      var _arr, _day, _end, _i, _repeat, _start, _startMonday, _startWeek;
      _arr = [];
      _start = this.start_date_obj();
      _startWeek = _start.getWeek();
      _startMonday = new Date(_start);
      if (_startMonday.getDay() !== 1) {
        _startMonday.moveToDayOfWeek(1, -1);
      }
      _end = this.end_date_obj();
      _repeat = this.repeat();
      if (_start > start) {
        start = _start;
      }
      if ((_end != null) && (_end < end)) {
        end = _end;
      }
      _i = new Date(start);
      while (_i <= end) {
        _day = _i.getDay() - 1;
        if (_day < 0) {
          _day = 7 + _day;
        }
        if ((this.weekdaysHash[_day] === true) && ((_repeat === 1) || (((Math.floor((_i - _startMonday) / 86400000 / 7)) % _repeat) === 0))) {
          _arr.push({
            date: new Date(_i),
            model: this
          });
        }
        _i.setDate(_i.getDate() + 1);
      }
      return _arr;
    },
    setDeltaHours: (function() {
      var _getMinutes;
      _getMinutes = function(str) {
        var hours, minutes, _ref, _ref1;
        _ref = _.compact(ovivo.config.VALIDATION_REGEXP_TIME.exec(str)).slice(-2), hours = _ref[0], minutes = _ref[1];
        _ref1 = [parseInt(hours), parseInt(minutes)], hours = _ref1[0], minutes = _ref1[1];
        return hours * 60 + minutes;
      };
      return function() {
        var _delta, _end, _start;
        _end = _getMinutes(this.end_time());
        _start = _getMinutes(this.start_time());
        if (_start <= _end) {
          _delta = (_end - _start) / 60;
        } else {
          _delta = (_end - _start) / 60 + 24;
        }
        return this.set('deltaHours', Math.round(_delta));
      };
    })(),
    updateWeekdaysHash: function() {
      var _ref;
      return this.weekdaysHash = _.reduce((_ref = this.weekdays()) != null ? _ref.split(',') : void 0, (function(memo, elem) {
        memo[parseInt(elem) - 1] = true;
        return memo;
      }), {});
    },
    updateStartDate: function() {
      return this.set('start_date_obj', new Date(Date.parse(this.start_date())));
    },
    updateEndDate: function() {
      var _end_date;
      if ((_end_date = this.end_date()) != null) {
        return this.set('end_date_obj', new Date(Date.parse(_end_date)));
      } else {
        return this.set('end_date_obj', void 0);
      }
    },
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      this.updateStartDate();
      this.updateEndDate();
      this.on('change:weekdays', this.updateWeekdaysHash, this);
      this.on('change:start_date', this.updateStartDate, this);
      this.on('change:end_date', this.updateEndDate, this);
      this.groupsHash = _.reduce(this.groups(), (function(memo, elem) {
        memo[elem] = true;
        return memo;
      }), {});
      this.updateWeekdaysHash();
      this.editView = new EditView({
        model: this
      });
      return true;
    }
  });
});

define('collections/resources/WorkingHours',['models/resources/WorkingHour', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    fullResponse: true,
    url: "" + ovivo.config.API_URL_PREFIX + "users/" + ovivo.config.USER_ID + "/working-hours/",
    comparator: function(workingHour) {
      return Date.parse(workingHour.start_date()).valueOf();
    },
    processRange: function(start, end) {
      return this.reduce((function(arr, workingHour) {
        return arr.concat(workingHour.processRange(start, end));
      }), []);
    },
    _ignoreChange: ['start_date_obj', 'end_date_obj', 'deltaHours'],
    initialize: function() {
      this.initResource();
      return true;
    }
  }));
});

define('views/resources/Inactivity',['views/resources/ResourceBase', 'ovivo'], function(ResourceBase) {
  return ResourceBase.extend({
    common: {},
    tagName: 'li',
    className: 'inactivity',
    template: Handlebars.templates['inactivity'],
    groupTemplate: Handlebars.templates['inactivity_group'],
    events: {
      'click': 'processClick'
    },
    processClick: function(e) {
      var _mode;
      if (this.model.isSingle() === true) {
        _mode = 'edit-single';
      } else {
        _mode = 'edit';
      }
      ovivo.desktop.pages.editInactivity.view.showEl();
      ovivo.desktop.pages.editInactivity.view.edit(this.model, _mode);
      e.stopPropagation();
      return false;
    },
    _getDateStr: function(_date) {
      if (_date != null) {
        return "" + (ovivo.config.DAYS[_date.getDay()].toLowerCase().slice(0, 3)) + " " + (_date.getDate()) + ". " + (ovivo.config.MONTHS[_date.getMonth()].toLowerCase());
      } else {
        return '';
      }
    },
    start: function() {
      var _start;
      if ((_start = this.model.start()) != null) {
        return this._getDateStr(new Date(Date.parse(_start)));
      } else {
        return '';
      }
    },
    end: function() {
      var _end;
      if ((_end = this.model.end()) != null) {
        return this._getDateStr(new Date(Date.parse(_end)));
      } else {
        return '';
      }
    },
    approved: function() {
      var _approved;
      if ((_approved = this.model.approved()) != null) {
        if (_approved === true) {
          return gettext('Approved');
        } else {
          return gettext('Not approved');
        }
      } else {
        return gettext('Pending');
      }
    },
    isReason: function() {
      var _reason;
      return ((_reason = this.reason()) != null) && (_reason !== '');
    },
    postRender: function() {
      return this.$el.addClass(this.itemType);
    },
    initialize: function(options) {
      this.itemType = options.itemType;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('views/resources/InactivityEdit',['views/resources/ResourceBase', 'ovivo'], function(ResourceBase) {
  return ResourceBase.extend({
    common: {},
    tagName: 'li',
    className: 'element inactivity',
    events: {
      'click .edit-button': 'edit',
      'click .remove-button': 'processRemove'
    },
    template: Handlebars.templates['inactivityEdit'],
    groupTemplate: Handlebars.templates['inactivityEdit_group'],
    edit: function() {
      var _mode;
      if (this.model.isSingle() === true) {
        _mode = 'edit-single';
      } else {
        _mode = 'edit';
      }
      ovivo.desktop.popups.editPopupTimeoff.show();
      return ovivo.desktop.popups.editPopupTimeoff.edit(this.model, _mode);
    },
    _getDateStr: function(_date) {
      if (_date != null) {
        return "" + (_date.getDate()) + ". " + (ovivo.config.MONTHS[_date.getMonth()].toLowerCase().slice(0, 3));
      } else {
        return '';
      }
    },
    start: function() {
      var _start;
      if ((_start = this.model.start()) != null) {
        return this._getDateStr(new Date(Date.parse(_start)));
      } else {
        return '';
      }
    },
    end: function() {
      var _end;
      if ((_end = this.model.end()) != null) {
        return this._getDateStr(new Date(Date.parse(_end)));
      } else {
        return '';
      }
    },
    approved: function() {
      var _approved;
      if ((_approved = this.model.approved()) != null) {
        if (_approved === true) {
          return gettext('Approved');
        } else {
          return gettext('Not approved');
        }
      } else {
        return gettext('Pending');
      }
    },
    postRender: function() {
      var _approved;
      this.$el.removeClass('approved not-approved pending');
      return this.$el.addClass((_approved = this.model.approved()) != null ? _approved === true ? 'approved' : 'not-approved' : 'pending');
    },
    isReason: function() {
      var _reason;
      return ((_reason = this.reason()) != null) && (_reason !== '');
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('models/resources/Inactivity',['models/resources/ResourceBase', 'views/resources/Inactivity', 'views/resources/InactivityEdit', 'ovivo'], function(ResourceBase, View, EditView) {
  return ResourceBase.extend({
    typeName: 'inactivity',
    _gettersNames: ['start', 'end', 'reason', 'approved', 'municipality', 'type', 'pk'],
    isSingle: function() {
      return this.start() === this.end();
    },
    validate: function(attrs) {
      if ((attrs.start != null) && (attrs.end != null) && (attrs.municipality != null)) {
        return void 0;
      } else {
        return gettext('Params are missing');
      }
    },
    processRange: function(start, end) {
      var _arr, _end, _i, _start, _type;
      _arr = [];
      _start = new Date(Date.parse(this.start()));
      _end = new Date(Date.parse(this.end()));
      if (_start > start) {
        start = _start;
      }
      if (_end < end) {
        end = _end;
      }
      _i = new Date(start);
      while (_i <= end) {
        _type = [];
        if ((_i - _start) === 0) {
          _type.push('first');
        }
        if ((_i - _end) === 0) {
          _type.push('last');
        }
        if (((_i - _start) !== 0) && ((_i - _end) !== 0)) {
          _type.push('none');
        }
        _arr.push({
          date: new Date(_i),
          model: this,
          itemType: _type.join(' ')
        });
        _i.setDate(_i.getDate() + 1);
      }
      return _arr;
    },
    getView: function(obj) {
      return new this.View({
        model: this,
        itemType: obj.itemType
      });
    },
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      this.editView = new EditView({
        model: this
      });
      return true;
    }
  });
});

define('collections/resources/Inactivities',['models/resources/Inactivity', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    fullResponse: true,
    url: "" + ovivo.config.API_URL_PREFIX + "users/" + ovivo.config.USER_ID + "/inactivity/",
    comparator: function(inactivity) {
      return Date.parse(inactivity.start()).valueOf();
    },
    processRange: function(start, end) {
      return this.reduce((function(arr, inactivity) {
        return arr.concat(inactivity.processRange(start, end));
      }), []);
    },
    initialize: function() {
      this.initResource();
      return true;
    }
  }));
});

define('models/ApiError',['models/resources/ResourceBase', 'ovivo'], function(ResourceBase) {
  return ResourceBase.extend({
    _gettersNames: ['resp', 'obj', 'method', 'url'],
    localStorageOnly: true,
    initialize: function(attrs, options) {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});

define('collections/ApiErrors',['models/ApiError', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    fullResponse: true,
    localStorageOnly: true,
    initializeEmpty: true,
    url: "/API-errors/",
    addError: function(url, model, resp, method, options) {
      if ((method === 'update') || (method === 'create')) {
        return this.add({
          obj: model.toJSON(),
          method: method,
          resp: resp,
          url: url
        });
      }
    },
    initialize: function() {
      this.initResource();
      return true;
    }
  }));
});

define('_features/socket.io',['ovivo'], function() {
  var _getCookie, _handlers, _pathRegexp;
  _getCookie = function(name) {
    var _match;
    _match = document.cookie.match(new RegExp("" + name + "=(.*?)(;|$)"));
    if (_match !== null) {
      return _match[1];
    } else {
      return ovivo.config.TEST_SESSIONID_COOKIE;
    }
  };
  _pathRegexp = new RegExp("^" + ovivo.config.API_URL_PREFIX_REGEXP + "\\/(.*?)\\/(\\d+)\\/$");
  _handlers = {
    'connected': function() {
      return true;
    },
    'connect': function() {
      this._socket.emit('auth', this._sessionId);
      return true;
    },
    'data': function(msg) {
      msg = $.parseJSON(msg);
      this._processMessage(msg);
      return true;
    }
  };
  return {
    _initHandlers: function() {
      var _this = this;
      _.each(_handlers, function(func, name) {
        _this._socket.on(name, _.bind(func, _this));
        _this._socket.on(name, function() {
          console.log(name, arguments);
          return true;
        });
        return true;
      });
      return true;
    },
    _processMessage: function(msg) {
      var _id, _match, _model, _path, _ref, _target;
      msg = msg.data;
      _ref = msg.target.match(_pathRegexp), _match = _ref[0], _path = _ref[1], _id = _ref[2];
      if ((_target = ovivo.desktop.resources[_path]) != null) {
        _model = _target.get(parseInt(_id));
        switch (msg.action) {
          case 'create':
            _target.add(msg.data, {
              'socket_io': true
            });
            break;
          case 'update':
            if (_model != null) {
              _model.set(msg.data, {
                'socket_io': true
              });
            } else {
              _target.add(msg.data, {
                'socket_io': true
              });
            }
            break;
          case 'delete':
            _target.remove(_model);
        }
        playAlert('glass');
      } else {
        throw new Error('Socket.IO: wrong target');
      }
      return true;
    },
    init: function() {
      var _cookie,
        _this = this;
      if ((typeof io !== "undefined" && io !== null) && (io.connect != null)) {
        this._socket = io.connect(ovivo.config.SOCKET_IO_CONNECT_URL);
        this._sessionId = (_cookie = _getCookie('sessionid')) != null ? _cookie : ovivo.config.TEST_SESSIONID_COOKIE;
        this._initHandlers();
      } else {
        setTimeout((function() {
          return _this.init();
        }), 300);
      }
      return true;
    }
  };
});

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

define("main", function(){});

//# sourceMappingURL=script.js.map