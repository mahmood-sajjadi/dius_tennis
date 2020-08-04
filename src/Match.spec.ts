import Match from './MatchImpl';

const players = ["player 1", "player 2"];
const p1 = players[0];
const p2 = players[1];

describe('Match rules', () => {
  let match: Match;
  beforeEach(() => {
    match = new Match(p1, p2);
  });

  test(`WHEN wrong player name THEN should throw error`, () => {
    expect(() => {
      match.pointWonBy('some random name');
    }).toThrow('Player Not Found');
  });
  
  test('WHEN question test THEN given answers', () => {
    match.pointWonBy(p1);
    match.pointWonBy(p2);
    // this will return "0-0, 15-15"
    expect(match.score()).toBe("0-0, 15-15");

    match.pointWonBy(p1);
    match.pointWonBy(p1);
    // this will return "0-0, 40-15"
    expect(match.score()).toBe("0-0, 40-15");
    
    match.pointWonBy(p2);
    match.pointWonBy(p2);
    // this will return "0-0, Deuce"
    expect(match.score()).toBe("0-0, Deuce");
    
    match.pointWonBy(p1);
    // this will return "0-0, Advantage player 1"
    expect(match.score()).toBe("0-0, Advantage player 1");
    
    match.pointWonBy(p1);
    // this will return "1-0"
    expect(match.score()).toBe("1-0");
  });

  test('WHEN 6 win in a row for a player THEN it should be counted as one game scrore and 2 points for next game', () => {
    match.pointWonBy(p1);
    match.pointWonBy(p1);
    match.pointWonBy(p1);
    match.pointWonBy(p1);// winning of first game
    match.pointWonBy(p1);// 15 points
    match.pointWonBy(p1);// 30 points

    expect(match.score()).toBe("1-0, 30-0");
  });

  test('WHEN each get equal points and grater than 3 points THEN deuce', () => {
    match.pointWonBy(p1);
    match.pointWonBy(p2);
    match.pointWonBy(p1);
    match.pointWonBy(p2);
    match.pointWonBy(p1);
    match.pointWonBy(p2);
    expect(match.score()).toBe("0-0, Deuce");

    match.pointWonBy(p1);
    match.pointWonBy(p2);
    expect(match.score()).toBe("0-0, Deuce");

    match.pointWonBy(p1);
    match.pointWonBy(p2);
    expect(match.score()).toBe("0-0, Deuce");

    match.pointWonBy(p1);
    match.pointWonBy(p2);
    expect(match.score()).toBe("0-0, Deuce");

    match.pointWonBy(p1);
    match.pointWonBy(p2);
    expect(match.score()).toBe("0-0, Deuce");
  });

  // logic for player 1 or player 2 should be equal
  for (let player = 1; player <= 2; player ++) {
    const otherPlayer = Math.floor(player % 2) + 1;

    for (let t = 3; t < 10; t++) {
      test(`WHEN player ${otherPlayer} get ${t} point and player ${player} one extra point THEN Advantage player ${player}`, () => {
        for (let i = 0; i < t; i++) {
          match.pointWonBy(players[player - 1]);
          match.pointWonBy(players[otherPlayer - 1]);
        }
        match.pointWonBy(players[player - 1]);

        expect(match.score()).toBe(`0-0, Advantage ${players[player - 1]}`);
      });
    }

    // minimum 4 games and diff is more than 2 to win
    const tests1 = [[4, 0], [4, 1], [4, 2], [5, 3]];
    for (let t = 0; t < tests1.length; t++) {
      const values = tests1[t];
      test(`WHEN player ${otherPlayer} win ${values[1]} points and after that player ${player} win ${values[0]} points THEN player ${player} win then game`, () => {
        for(let j = 0; j < values[1]; j++) {
          match.pointWonBy(players[otherPlayer - 1]);
        }
        for(let i = 0; i < values[0]; i++) {
          match.pointWonBy(players[player - 1]);
        }

        const score = [0, 0];
        score[player - 1] = 1;
        expect(match.score()).toBe(score.join('-'));
      });
    }

    // just 2 more points to win and minimum 4, so other player minimum 2
    const tests2 = [2, 3, 4, 5];
    for (let t = 0; t < tests2.length; t++) {
      const values = tests2[t];
      test(`WHEN they get equal ${values} points and player ${player} get 2 more points THEN player ${player} win then game`, () => {
        for(let i = 0; i < values; i++) {
          match.pointWonBy(players[player - 1]);
          match.pointWonBy(players[otherPlayer - 1]);
        }

        match.pointWonBy(players[player - 1]);
        match.pointWonBy(players[player - 1]);

        const score = [0, 0];
        score[player - 1] = 1;
        expect(match.score()).toBe(score.join('-'));
      });
    }

    // first player to reach 6 or more with more than 2 game diff is a set winner
    const test3 = [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [7, 5]]
    for (let t = 0; t < test3.length; t++) {
      const values = test3[t];
      test(`WHEN player ${otherPlayer} win ${values[1]} games and after that player ${player} win ${values[0]} games THEN playr ${player} is winner of the set`, () => {
        for(let j = 0; j < values[1]; j++) {
          match.pointWonBy(players[otherPlayer - 1]);
          match.pointWonBy(players[otherPlayer - 1]);
          match.pointWonBy(players[otherPlayer - 1]);
          match.pointWonBy(players[otherPlayer - 1]);
        }
        for(let i = 0; i < values[0]; i++) {
          match.pointWonBy(players[player - 1]);
          match.pointWonBy(players[player - 1]);
          match.pointWonBy(players[player - 1]);
          match.pointWonBy(players[player - 1]);
        }

        expect(match.score()).toBe(`${players[player - 1]} is winner`)
      });
    }

    // equal points but 2 more for first player to win, so minimum 4 game required other player to have 6 or more for fist player
    const test4 = [4, 5];
    for (let t = 0; t < test4.length; t++) {
      const values = test4[t];
      test(`WHEN players win equal ${values} games and after that player ${player} win 2 more games THEN playr ${player} is winner of the set`, () => {
        for(let j = 0; j < values; j++) {
          match.pointWonBy(players[otherPlayer - 1]);
          match.pointWonBy(players[otherPlayer - 1]);
          match.pointWonBy(players[otherPlayer - 1]);
          match.pointWonBy(players[otherPlayer - 1]);

          match.pointWonBy(players[player - 1]);
          match.pointWonBy(players[player - 1]);
          match.pointWonBy(players[player - 1]);
          match.pointWonBy(players[player - 1]);
        }
        for(let i = 0; i < 2; i++) {
          match.pointWonBy(players[player - 1]);
          match.pointWonBy(players[player - 1]);
          match.pointWonBy(players[player - 1]);
          match.pointWonBy(players[player - 1]);
        }

        expect(match.score()).toBe(`${players[player - 1]} is winner`)
      });
    }

    // tie-break is one extra game when the score is 6-6 and the winner is a set winner
    for (let t = 0; t <= 5; t++) {
      test(`WHEN score is 6-6 and player ${otherPlayer} win ${t} games first and after that player ${player} win 7 games THEN playr ${player} is winner of the tie-break`, () => {
        for(let s = 0; s < 6; s++) {
          match.pointWonBy(players[otherPlayer - 1]);
          match.pointWonBy(players[otherPlayer - 1]);
          match.pointWonBy(players[otherPlayer - 1]);
          match.pointWonBy(players[otherPlayer - 1]);

          match.pointWonBy(players[player - 1]);
          match.pointWonBy(players[player - 1]);
          match.pointWonBy(players[player - 1]);
          match.pointWonBy(players[player - 1]);
        }
        for(let j = 0; j < t; j++) {
          match.pointWonBy(players[otherPlayer - 1]);
        }
        for(let i = 0; i < 7; i++) {
          match.pointWonBy(players[player - 1]);
        }
        expect(match.score()).toBe(`${players[player - 1]} is winner`)
      });
    }
  }

  // tie-break starts when set score is 6-6
  test('WHEN players win equal 6 games THEN tie-break 0-0', () => {
    for(let i = 0; i < 6; i++) {
      match.pointWonBy(players[0]);
      match.pointWonBy(players[0]);
      match.pointWonBy(players[0]);
      match.pointWonBy(players[0]);

      match.pointWonBy(players[1]);
      match.pointWonBy(players[1]);
      match.pointWonBy(players[1]);
      match.pointWonBy(players[1]);
    }

    expect(match.score()).toBe("6-6");
  });
});