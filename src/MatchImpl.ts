import MatchInterface from './Match';
import {
    ScoreSystem,
    NormalScoreSystem,
    TieBreakcoreSystem
} from './ScoreSystem';

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
        if (winner) {
            this.gameScore = [0, 0];
            this.setScore[winner]++;
            if (this.setScore.every(x => x === 6)) {
                this.scoreSystem = new TieBreakcoreSystem();
            }
        }
    }

    public score(): string {
        const set = this.setScore.join('-');
        const game = this.scoreSystem.toString(this.gameScore);
        return `${set}${game ? ', ' : ''}${game}`;
    }
}