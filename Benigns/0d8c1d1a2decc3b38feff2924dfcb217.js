/**
  Copyright (c) 2016 Lukas Kollmer <lukas@kollmer.me> All Rights Reserved.
  Site: Relay.fm
  Purpose: Localize the schedule calendar
*/
if (document.location.pathname == '/schedule') {

  var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var calendarParameters = {
    'showTitle'     : '0',
    'showPrint'     : '0',
    'showTabs'      : '0',
    'showCalendars' : '0',
    'mode'          : 'AGENDA',
    'height'        : '600',
    'wkst'          : '1',
    'bgcolor'       : '%23FFFFFF',
    'src'           : 'relay.fm_t9pnsv6j91a3ra7o8l13cb9q3o@group.calendar.google.com',
    'color'         : '%23182C57',
    'ctz'           : timeZone
  };
  var calendarURL = 'https://calendar.google.com/calendar/embed?';

  Object.keys(calendarParameters).forEach(function(key) {
    var value = calendarParameters[key];
    calendarURL += key + '=' + value + '&'
});

  $('div.responsive-iframe-container').children().attr('src', calendarURL);


}

