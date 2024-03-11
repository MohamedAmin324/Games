// check that there is at least 3 used cells to make the gamePlay eligible for verification
const checkGameStatus = (gamePlay) => gamePlay.filter(({ sign }) => sign !== '').length >= 3;


function testRows(gamePlay) {
    return {
        firstRow: gamePlay[0].sign === gamePlay[1].sign && gamePlay[1].sign === gamePlay[2].sign ? gamePlay[0].sign : false,
        secondRow: gamePlay[3].sign === gamePlay[4].sign && gamePlay[4].sign === gamePlay[5].sign ? gamePlay[3].sign : false,
        thirdRow: gamePlay[6].sign === gamePlay[7].sign && gamePlay[7].sign === gamePlay[8].sign ? gamePlay[6].sign : false,
    }
}

function testColumns(gamePlay) {
    return {
        firstColumn: gamePlay[0].sign === gamePlay[3].sign && gamePlay[3].sign === gamePlay[6].sign ? gamePlay[0].sign : false,
        secondColumn: gamePlay[1].sign === gamePlay[4].sign && gamePlay[4].sign === gamePlay[7].sign ? gamePlay[1].sign : false,
        thirdColumn: gamePlay[2].sign === gamePlay[5].sign && gamePlay[5].sign === gamePlay[8].sign ? gamePlay[2].sign : false,
    }
}

function testDiagonals(gamePlay) {
    return {
        firstDiagonal: gamePlay[0].sign === gamePlay[4].sign && gamePlay[4].sign === gamePlay[8].sign ? gamePlay[0].sign : false,
        secondDiagonal: gamePlay[6].sign === gamePlay[4].sign && gamePlay[4].sign === gamePlay[2].sign ? gamePlay[6].sign : false,
    }
}

export { checkGameStatus, testRows, testColumns, testDiagonals }
