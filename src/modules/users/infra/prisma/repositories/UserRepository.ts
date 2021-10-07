import { ICreateUser } from '../../../domain/models/ICreateUser';
import { IUser } from '../../../domain/models/IUser';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { PrismaClient } from '@prisma/client';

class UserRepository implements IUserRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    return await this.client.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const user = await this.client.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return undefined;
    }

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.client.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return undefined;
    }

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    return await this.client.user.update({
      where: {
        id: user.id,
      },

      data: user,
    });
  }

  public async findAll(): Promise<IUser[]> {
    return await this.client.user.findMany();
  }

  public async remove(id: string): Promise<void> {
    await this.client.user.delete({
      where: {
        id,
      },
    });
  }
}

export default UserRepository;
