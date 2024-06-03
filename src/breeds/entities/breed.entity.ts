import { Cat } from "src/cats/entities/cat.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Breed {
    @Column({ primary: true, generated: true })
    id: number;
    @Column({ length: 500 })
    name: string;
    //En este lado se le indica que sera de uno a muchos. Abrimos parentesis y hacemos una funcion flecha, Le indicamos que buscamos la funcion Cat, que se encuentra en cat. Luego colocamos una coma y hacemos otra funcion flecha, dentro del parentesis incluimos el nombre de la variable para posteriormente pedirle la variable breed. Y luego en la linea de abajo indicamos una variable, seguido de 2 puntos. El nombre de la funcion con corchetes

    //El OneToMany no puede vivir sin el ManyToOne. No funciona basicamente
    //Pero el ManyToOne si puede vivir sin el OneToMany
    @OneToMany(() => Cat, (cat) => cat.breed)
    cat: Cat[];
}
