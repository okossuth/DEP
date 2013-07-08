define [
  'srgs-parser',

  'ovivo'
], (parser) ->
  _.extend new parser.Grammar('statement'),
    statement: [
        parser.Ref('command'),
        parser.Tag('out = rules.command')
    ],

    command: [
        parser.OneOf([
            [parser.Ref('commandOpen'), parser.Tag('out.type = \'open\''), parser.Tag('out.target = rules.commandOpen')],
            [parser.Ref('commandCreate'), parser.Tag('out.type = \'create\''), parser.Tag('out.target = rules.commandCreate')]
        ])
    ],

    commandOpen: [
        'open',

        parser.OneOf([
            ['calendar', parser.Tag('out = \'calendar\'')],
            ['settings', parser.Tag('out = \'settings\'')],
            ['feedback', parser.Tag('out = \'feedback\'')],
            ['help', parser.Tag('out = \'help\'')]
        ])
    ],

    commandCreate: [
        'create',

        parser.OneOf([
            ['time', 'off', parser.Tag('out = \'inactivity\'')],
            ['timeoff', parser.Tag('out = \'inactivity\'')],
            ['inactivity', parser.Tag('out = \'inactivity\'')],
            ['working', 'hours', parser.Tag('out = \'working-hours\'')],
            ['working', 'hour', parser.Tag('out = \'working-hours\'')],
        ])
    ]