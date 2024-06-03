import { Breed } from "src/breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Cat {
    //@PrimaryGeneratedColumn()
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    //Es un campo que nos permite, saber en que fecha se elimino un registro
    @DeleteDateColumn()
    deleteCat: Date;

    //Esto se hace para que las tablas empiecen a estar relacionadas entre si. Esta de aqui esta relacionada con la tabla de breed
    //Y seria de muchos a uno, dentro del parentesis se haria una funcion flecja y luego de la funcion flecha se colocaria el nombre de la clase que queremos que esten relacionadas.
    //seguido de una coma para posteriormente abrir nuevamente un parentesis y alli definir una variable. Que luego se pasa por funcion flecha y le pediremos el ID
    //Para ver la continuacion ir hacia el breed.entityes.ts
    @ManyToOne(() => Breed, (breed) => breed.id, {
        eager: true //Para que traiga el nombre de la raza
    })
    breed: Breed;

    @ManyToOne(() => User)
    //En este aparatdo lo que indicamos es que el nombre con el que se va a aguardar va a ser
    //userEmail y el referenced ColumnName: Va a ser la referencia con la que va hacer las cosas
    //Es decir es lo que va a agarrar como llave foranea
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
    user: User;
    //Con la linea de arriba TypeOrm es quien decide como hacer las cosas
    //Mientras que si pones esto al final nos da el control de indicar con que queremos capturar el
    //parametro
    @Column()
    userEmail: string;
}
