import * as dynamoose from 'dynamoose';

const userSchema = new dynamoose.Schema({
  userId: {
    type: String,
    hashKey: true,
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: (value: string) => /\S+@\S+\.\S+/.test(value),
  },
  age: {
    type: Number,
    required: true,
    validate: (value: number) => value > 0
  }
});

const UserModel = dynamoose.model('Users', userSchema);

export default UserModel;
