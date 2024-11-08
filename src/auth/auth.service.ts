import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/models/users.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>, private readonly jwtService: JwtService) { }

    public async login(userLoginBody: LoginAuthDto){

        const { password } = userLoginBody;
        const userExits = await this.userModel.findOne({ email: userLoginBody.email });

        if(!userExits) throw new HttpException("NOT_FOUND", HttpStatus.NOT_FOUND);

        const isCheck = await compareHash(password, userExits.password);

        if(!isCheck) throw new HttpException("PASSWORD INVALIDA", HttpStatus.CONFLICT);

        const userFlat = userExits.toObject();
        delete userFlat.password;

        const payload = {
            id: userFlat._id
        }

        const token = this.jwtService.sign(payload)

        const data = {
            token : token,
            user : userFlat
        }

        return data;

    }

    public async register(userBody: RegisterAuthDto) {
        const { password, ...user } = userBody;

        const userParse = {
            ...user, password: await generateHash(password)
        };

        return this.userModel.create(userParse);
    }


}
