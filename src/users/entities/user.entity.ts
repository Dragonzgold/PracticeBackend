import { Role } from "../../common/enum/rol.enum";
import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class User {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    //colocando las palabras select nos permitira definir si enviar los datos o no
    //Por defecto siempre viene en true. Pero, si ponemos false no se mostraran los datos
    @Column({ nullable: false, select: false })
    password: string;

    @Column({ unique: true, nullable: false })
    email: string;

    //Al momento de ponerlo como "variable global" pudismos traer el Role hasta aca y permitir validar de
    //mejor manera los datos. El type nos permite indicar que tipo sera el campo (por asi decirlo)
    //Y con el tipo enum nos permitira desglosarlo. default: nos indica el valor que tendra por defecto
    //enum. Nos desglozara todo lo que tenmos dentro de la lista que estamos importando 
    //del common 
    @Column({ type: 'enum', default: Role.USER, enum: Role })
    role: Role

    @DeleteDateColumn()
    deleteAt: Date;
}

//El valor nullable significa que son valores que no pueden estar en vacio