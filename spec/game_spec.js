var game = require('../src/game');
var gameBoard = require('../src/board');
var output = require('../src/output');
var HumanPlayer = require('../src/human');
var ComputerPlayer = require('../src/computer');

describe('play game', function() {

    it('sets up a new game given the symbol entered by the human player', function() {
        spyOn(game, 'playTurn');
        var newGame = function() {};

        game.setup('x', 'o', newGame);

        var humanPlayer = new HumanPlayer('x');
        var computerPlayer = new ComputerPlayer('o');

        expect(game.playTurn).toHaveBeenCalledWith(humanPlayer, computerPlayer);
    });

    it('plays the game until x wins', function() {
        var Board = new gameBoard();
        var mockPlayer1 = new HumanPlayer('x'),
            player1Moves = ['1', '3', '5', '7'];

        var mockPlayer2 = new HumanPlayer('o'),
            player2Moves = ['2', '4', '6', '8'];

        spyOn(mockPlayer1, 'getMove').andCallFake(function(openCells, moveCallback) {
            moveCallback(player1Moves.shift());
        });

        spyOn(mockPlayer2, 'getMove').andCallFake(function(openCells, moveCallback) {
            moveCallback(player2Moves.shift());
        });

        spyOn(output, 'printBoard').andCallFake(function() {});

        spyOn(game, 'finish');

        game.playTurn(mockPlayer1, mockPlayer2);

        expect(game.finish).toHaveBeenCalledWith('x');
    });

});
