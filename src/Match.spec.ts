import Match from './MatchImpl';

const players = ["player 1", "player 2"];
const p1 = players[0];
const p2 = players[1];

describe('Match rules', () => {
  let match: Match;
  beforeEach(() => {
    match = new Match(p1, p2);
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

  for (let player = 1; player <= 2; player ++) {
    const otherPlayer = Math.floor(player % 2) + 1;

    for (let t = 3; t < 10; t++) {
      test(`WHEN player ${otherPlayer} get ${3} point and player ${player} one extra point THEN Advantage player ${player}`, () => {
        for (let i = 0; i < t; i++) {
          match.pointWonBy(players[player - 1]);
          match.pointWonBy(players[otherPlayer - 1]);
        }
        match.pointWonBy(players[player - 1]);

        expect(match.score()).toBe(`0-0, Advantage ${players[player - 1]}`);
      });
    }

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

    expect(match.score()).toBe("6-6, 0-0");
  });
});