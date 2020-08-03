import MatchInterface from './Match';

export default class Match implements MatchInterface {
    setScore = [0, 0];
    gameScore = [0, 0];

    constructor(private readonly player1: string, private readonly player2: string) {
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
    }

    public score(): string {
        return '';
    }
}