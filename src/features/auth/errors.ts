export class NicknameTakenError extends Error {
    constructor() {
        super('Nickname is taken');
        this.name = 'NicknameTakenError';
    }
}
