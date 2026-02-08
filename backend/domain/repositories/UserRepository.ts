// Import the entity and value object this repository handles
import { User } from "../entities/User";
import { UserEmail } from "../valueObjects/UserEmail";

export interface UserRepository {
    save(user: User): Promise<void>;
    findByEmail(email: UserEmail): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}
