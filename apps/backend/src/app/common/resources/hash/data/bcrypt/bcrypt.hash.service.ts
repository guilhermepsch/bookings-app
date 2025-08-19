import { IHashService } from '@common/resources/hash/domain/hash.service.interface';
import * as bcrypt from 'bcrypt';

export class BcryptHashService implements IHashService {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
