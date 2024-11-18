import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/models/users.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth-dto';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject('MAIL_SERVICE') private readonly clientMailService: ClientProxy,
    private readonly eventEmitter: EventEmitter2,
    private readonly jwtService: JwtService,
  ) {}

  /*
   * INICIAR SESION
   * @param userBody
   * @returns
   */
  public async login(userLoginBody: LoginAuthDto) {
    const { password } = userLoginBody;
    const userExits = await this.userModel.findOne({
      email: userLoginBody.email,
    });

    if (!userExits) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const isCheck = await compareHash(password, userExits.password);

    if (!isCheck)
      throw new HttpException('PASSWORD INVALIDA', HttpStatus.CONFLICT);

    const userFlat = userExits.toObject();
    delete userFlat.password;

    const payload = {
      id: userFlat._id,
    };

    const token = this.jwtService.sign(payload);

    const data = {
      token: token,
      user: userFlat,
    };

    /*
     * Enviar (evento) de email
     */
    this.eventEmitter.emit('user.login', userFlat);

    return data;
  }

  /*
   * REGISTRAR USUARIO
   * @param userBody
   * @returns
   */
  public async register(userBody: RegisterAuthDto) {
    const { password, ...user } = userBody;

    const userParse = {
      ...user,
      password: await generateHash(password),
    };

    const newUser = await this.userModel.create(userParse);

    /*
     * Enviar (evento) de email
     */
    this.clientMailService.emit('user.created', newUser);

    return newUser;
  }
}
