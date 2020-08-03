import MatchInterface from './Match';

export default class Match implements MatchInterface {
    constructor(private readonly player1: string, private readonly player2: string) {
    }

    public pointWonBy(player: string): void {
        return;
    }

    public score(): string {
        return '';
    }
}