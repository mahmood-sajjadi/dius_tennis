import ScoreSystem from './ScoreSystem';

const display = [0, 15, 30, 40];

export default class NormalScoreSystem implements ScoreSystem {
    constructor(private readonly player1: string, private readonly player2: string) {
    }

    toString(score: [number, number]): string {
        if (score.every(x => x === 0)) {
            return '';
        }
        if (score.every(v => v >= 3)) {
            if (score[0] === score[1]) {
                return 'Deuce';
            } else {
                const player = score[0] > score[1] ? this.player1 : this.player2;
                return `Advantage ${player}`;
            }
        }
        return score.map(s => display[s]).join('-');
    }

    getWinner(score: [number, number]): 0 | 1 | undefined {
        if (Math.abs(score[0] - score[1]) >= 2 && Math.max(...score) >= 4) {
            return score[0] > score[1] ? 0 : 1;
        }
        return undefined;
    }
}