import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { User } from '../../models';

@Service()
export class UsersService {
  @InjectRepository(User)
  private readonly userRepo: Repository<User>;

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepo.findOne({ where: { email: email } });
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.userRepo.findOne(id);
  }
}
