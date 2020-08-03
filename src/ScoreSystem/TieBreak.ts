import ScoreSystem from './ScoreSystem';

export default class TieBreakScoreSystem implements ScoreSystem {
    toString(score: [number, number]): string {
        return score.join('-');
    }

    getWinner(score: [number, number]): 0 | 1 | undefined {
        if (Math.abs(score[0] - score[1]) >= 2 && Math.max(...score) >= 7) {
            return score[0] > score[1] ? 0 : 1;
        }
        return undefined;
    }
}