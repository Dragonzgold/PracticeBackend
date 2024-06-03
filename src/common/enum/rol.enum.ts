//Esto sera largo de explicar, pero aqui vamos. Esta carpeta enum se encontraba dentro de la
//carpeta auth. Pero, ¿por que se cambio?
//Pues, por que el archivo users tambien lo necesita. Es decir
//Se extrajo para esta nueva carpeta llamada commin. Para poder usar
//este contenido en 2 archivos diferentes sin dañar la estructura o la organizacion del programa
//Tambien se hace de esta manera por que solo 2 archivos compartiran dicha informacion
//Ademas de no ser tanta informacion y ser relativamente corta

//Esto nos permite especificar y decir cuales son los roles que existen en nuestro programa
//Y asi exportralo para que lo usen las diferentes funciones
export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}