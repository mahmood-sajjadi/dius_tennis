import ScoreSystem from './ScoreSystem';
import configFile from '../config';

const config = configFile.normal;

export default class NormalScoreSystem implements ScoreSystem {
    constructor(private readonly player1: string, private readonly player2: string) {
    }

    toString(score: [number, number]): string {
        if (score.every(x => x === 0)) {
            return '';
        }
        if (score.every(v => v >= config.miniPointsDeuce)) {
            if (score[0] === score[1]) {
                return 'Deuce';
            } else {
                const player = score[0] > score[1] ? this.player1 : this.player2;
                return `Advantage ${player}`;
            }
        }
        return score.map(s => config.matchPints[s]).join('-');
    }

    getWinner(score: [number, number]): 0 | 1 | undefined {
        if (Math.abs(score[0] - score[1]) >= config.minDiffToWinGame && Math.max(...score) >= config.minPointsToWinGame) {
            return score[0] > score[1] ? 0 : 1;
        }
        return undefined;
    }
}