import Match from './MatchImpl';

const players = ["player 1", "player 2"];
const p1 = players[0];
const p2 = players[1];

describe('Match tie-break rules', () => {
  let match: Match;
  beforeEach(() => {
    match = new Match(p1, p2);

    for(let i = 0; i < 6; i++) {
        // game winner is winner of 4 points with diffrence minimum 2
        // 4 points to player0
        match.pointWonBy(players[0]);
        match.pointWonBy(players[0]);
        match.pointWonBy(players[0]);
        match.pointWonBy(players[0]);

        // 4 points to player1
        match.pointWonBy(players[1]);
        match.pointWonBy(players[1]);
        match.pointWonBy(players[1]);
        match.pointWonBy(players[1]);
    }
  });

  test('WHEN tie-break THEN scrore increment by 1', () => {
    // less than 7 as if player win 7 point in tie-break, game and set will finish
    for (let i = 1; i < 7; i++) {
        match.pointWonBy(players[0]);

        expect(match.score()).toBe(`6-6, ${i}-0`);
    }
  });

  test('WHEN tie-break and player win 7 point THEN player is winner', () => {
    // less than 7 as if player win 7 point in tie-break, game and set will finish
    for (let i = 1; i < 8; i++) {
        match.pointWonBy(players[0]);
    }
    expect(match.score()).toBe(`${p1} is winner`);
  });
});