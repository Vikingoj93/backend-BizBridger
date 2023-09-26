import{ Schema, model, models} from 'mongoose';
import {IAuthProviders, IUser} from '../types/user'

const providersSchema: Schema = new Schema({
    provider: String,
    providerId: String
})

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  providers: [providersSchema]
});

const User = models.User || model<IUser>('User', userSchema);

export default User;
