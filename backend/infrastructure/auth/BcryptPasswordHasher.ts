import bcrypt from "bcrypt";
import { PasswordHasher } from "../../domain/services/PasswordHasher";

export class BcryptPasswordHasher implements PasswordHasher {
    async matches(plain: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plain, hash);
    }
}

