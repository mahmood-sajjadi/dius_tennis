export default interface ScoreSystem {
    toString(gameScore: [number, number]): string;
    getWinner(gameScore: [number, number]): 0 | 1 | undefined;
}