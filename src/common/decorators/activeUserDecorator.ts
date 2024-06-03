import { ExecutionContext, createParamDecorator } from "@nestjs/common";

//El createParamDecorator se encuentra en la libreria de @nest/common
//la data unknown es asi (investigar). Y el ctx es lo que vamos a usar
//con esos podemos crear una constante llamada request y con el ctx
//Podemos empezar a pedir los datos o mejor dicho pasar los datos con las funciones
//Con las funciones switchToHttp y con el getRequest, los cuales nos permite agarrar los datos
//Por cierto. Los datos se agarran a la hora de que el usuario accede a una de las rutas
//Es por eso que se usa el request. Para captar los datos. Y con el return capturamos el request
//Junto al .user que fue lo que capturaria
export const ActiveUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user
    }
)