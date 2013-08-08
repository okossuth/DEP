define(['srgs-parser', 'ovivo'], function(parser) {
  return _.extend(new parser.Grammar('statement'), {
    statement: [parser.Ref('command'), parser.Tag('out = rules.command')],
    command: [parser.OneOf([[parser.Ref('commandOpen'), parser.Tag('out.type = \'open\''), parser.Tag('out.target = rules.commandOpen')], [parser.Ref('commandCreate'), parser.Tag('out.type = \'create\''), parser.Tag('out.target = rules.commandCreate')]])],
    commandOpen: [gettext('open'), parser.OneOf([[gettext('calendar'), parser.Tag('out = \'calendar\'')], [gettext('settings'), parser.Tag('out = \'settings\'')], [gettext('feedback'), parser.Tag('out = \'feedback\'')], [gettext('help'), parser.Tag('out = \'help\'')]])],
    commandCreate: [gettext('create'), parser.OneOf([['time', 'off', parser.Tag('out = \'inactivity\'')], ['timeoff', parser.Tag('out = \'inactivity\'')], ['inactivity', parser.Tag('out = \'inactivity\'')], ['working', 'hours', parser.Tag('out = \'working-hours\'')], ['working', 'hour', parser.Tag('out = \'working-hours\'')]])]
  });
});
