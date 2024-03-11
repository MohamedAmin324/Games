const signOptions = [
    {
        htmlFor: 'x-sign',
        id: 'x-sign',
        name: 'sign',
        value: 'X',
        labelText: 'X:',
    },
    {
        htmlFor: 'o-sign',
        id: 'o-sign',
        name: 'sign',
        value: 'O',
        labelText: 'O:',
    }
]

const modeOptions = [
    {
        htmlFor: "single-player",
        id: "single-player",
        name: "mode",
        value: "single-player",
        labelText: "single-player (against the computer)",
    },
    {
        htmlFor: "2-players",
        id: "2-players",
        name: "mode",
        value: "2-players",
        labelText: "2 players",
    }
]

const turnsOptions = [
    {
        htmlFor: "go-first",
        id: "go-first",
        name: "userTurn",
        value: "true",
        labelText: "Yes",
    },
    {
        htmlFor: "go-second",
        id: "go-second",
        name: "userTurn",
        value: "false",
        labelText: "No",
    }
]

const DEFAULT_SETTINGS = {
    mode: '',
    userTurn: true,
}

const INITIAL_GAME_STATE = [
    { sign: '', colorValue: '' },
    { sign: '', colorValue: '' },
    { sign: '', colorValue: '' },
    { sign: '', colorValue: '' },
    { sign: '', colorValue: '' },
    { sign: '', colorValue: '' },
    { sign: '', colorValue: '' },
    { sign: '', colorValue: '' },
    { sign: '', colorValue: '' },
]

export { signOptions, modeOptions, turnsOptions, DEFAULT_SETTINGS, INITIAL_GAME_STATE };
