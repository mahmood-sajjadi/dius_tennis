export default interface Match {
    pointWonBy(player: string): void;
    score(): string;
}