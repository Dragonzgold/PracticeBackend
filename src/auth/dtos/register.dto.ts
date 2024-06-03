import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class Registerdto {

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}

//El transform nos permite evitar los espacios en blanco
//Al momento de importar el transform tener cuidado. Por que
//El que se debe de importar es el siguiente: class-transformer. Y no otro