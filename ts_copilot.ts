interface IUser {
    id: number;
    name: string;
    age: number;
    role: string;
    privileges: string[];
}

class User implements IUser {
    constructor(
        public id: number,
        public name: string,
        public age: number,
        public role: string,
        public privileges: string[]
    ) {}

    public getRole(): string {
        return this.role;
    }

    
}