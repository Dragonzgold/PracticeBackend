import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Registerdto } from './dtos/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dtos/login.dto';
//Esta importacion fue descargada desde la consola
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        //Basicamente el mismo readonly que siempre se hace
        //Para seguir con este token hay que hacer unas cosas en el modulo del auth. Ir para ese archivo
        //Para seguir los pasos y las modificaciones
        private readonly jwtService: JwtService
    ) { }

    //Aqui hicimos una desestructuracion del registerDto (Solo para intentar cosas nuevas)
    async register({ name, email, password }: Registerdto) {
        const newUser = await this.userService.findOneByEmail(email)
        if (newUser) {
            throw new BadRequestException('Ya hay una cuenta con ese email');
        }
        await this.userService.create({
            name,
            email,
            password: await bcryptjs.hash(password, 12),
        });

        //Aqui estamos retornando solamente los datos que nosotros le pedimos al usuario
        //Al momento de crearse
        //Es inclusive dependiendo del programa no puede retornar nada. ya que aun asi
        //Los datos se guardan en la BD
        return {
            name,
            email,
        }

    }

    async login({ email, password }: LoginDto) {
        const user = await this.userService.findByEmailWithPassword(email);
        
        if (!user) {
            throw new UnauthorizedException('Email no coincide')
        }

        const nameUser = user.name;

        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException('contraseña no coincide')
        }

        const payload = { email: user.email, role: user.role }

        const token = await this.jwtService.signAsync(payload)


        return {
            token,
            email,
            nameUser
        };
    }

    async profile({ email, role }: { email: string, role: string }) {

        //if (role === 'admin') {
        //    throw new UnauthorizedException('Usted no puede acceder a este apartado')
        //}

        return await this.userService.findOneByEmail(email);
    }
}
