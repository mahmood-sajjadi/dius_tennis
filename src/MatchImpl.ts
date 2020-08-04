import MatchInterface from './Match';
import {
    ScoreSystem,
    NormalScoreSystem,
    TieBreakcoreSystem
} from './ScoreSystem';
import config from './config';

export default class Match implements MatchInterface {
    private setScore: [number, number] = [0, 0];
    private gameScore: [number, number] = [0, 0];
    private scoreSystem: ScoreSystem;

    constructor(private readonly player1: string, private readonly player2: string) {
        this.scoreSystem = new NormalScoreSystem(player1, player2);
    }

    private getIndex(player: string): 0 | 1 {
        if (player === this.player1) {
            return 0;
        } else if (player === this.player2) {
            return 1;
        }
        throw new Error('Player Not Found');
    }

    public pointWonBy(player: string): void {
        const index = this.getIndex(player);
        this.gameScore[index]++;
        const winner = this.scoreSystem.getWinner(this.gameScore);
        if (winner !== undefined) {
            this.gameScore = [0, 0];
            this.setScore[winner]++;
            if (this.setScore.every(x => x === config.setScoreToTieBrak)) {
                this.scoreSystem = new TieBreakcoreSystem();
            }
        }
    }

    public score(): string {
        const set = this.setScore.join('-');
        const game = this.scoreSystem.toString(this.gameScore);
        if (
            // normal game winner
            (Math.max(...this.setScore) === config.minScoreToWinSet && Math.abs(this.setScore[0] - this.setScore[1]) >= config.minDiffToWinSet)
            // tie-break winner or 7-5, who ever reach 7 is the winner
            || Math.max(...this.setScore) >= config.setScoreToWin
         ) {
            const winner = this.setScore[0] > this.setScore[1] ? this.player1 : this.player2;
            return `${winner} is winner`;
        }
        return `${set}${game ? ', ' : ''}${game}`;
    }
}