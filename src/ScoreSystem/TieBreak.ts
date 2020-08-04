import ScoreSystem from './ScoreSystem';
import configFile from '../config';

const config = configFile.tieBrak;
export default class TieBreakScoreSystem implements ScoreSystem {
    toString(score: [number, number]): string {
        if (score.every(x => x === 0)) {
            return '';
        }
        return score.join('-');
    }

    getWinner(score: [number, number]): 0 | 1 | undefined {
        if (Math.abs(score[0] - score[1]) >= config.minDiffToWinGame && Math.max(...score) >= config.minPointsToWinGame) {
            return score[0] > score[1] ? 0 : 1;
        }
        return undefined;
    }
}