import { IUser } from 'src/modules/users/domain/models/IUser';

class FakeUser implements IUser {
  id: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  created_at: Date = new Date();
  updated_at: Date = new Date();
}

export default FakeUser;
