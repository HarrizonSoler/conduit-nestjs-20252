# 11/08/25

### Requisitos iniciales:
1. Verificar que NodeJS se encuentre instalado en su ultima versión

2. En una terminal ejecutar el siguiente comando para verificar: `node -v`

### Instalación de pnpm:
1. `npm install --global corepack@latest`

2. `corepack enable pnpm`

En caso de error actualizar NodeJS y reintentar

### Instalación de Nest CLI
`pnpm i -g @nestjs/cli`

### Creación del proyecto
`nest new conduit-back`

# 21/08/25

### Instalación de librerias iniciales

1. `pnpm i @mikro-orm/core @mikro-orm/nestjs @mikro-orm/sqlite class-validator jsonwebtoken`

2. `pnpm approve-builds` presionamos tecla 'a' (para seleccionar todas las opciones) despues 'Enter' despues 'y'

### Módulo Usuario

4. `nest g module user` para generar el boilerplate del módulo usuario.

5. Escribir código de archivos `src/config.ts`, `src/mikro-orm.config.ts` y carpeta `src/user/`

# 25/08/25

### Instalación de librerias

1. `pnpm i bcrypt` 
2. `pnpm i -D @types/jsonwebtoken @types/bcrypt`
3. `pnpm approve-builds` presionamos tecla 'a' (para seleccionar todas las opciones) despues 'Enter' despues 'y'

4. Escribir código de carpeta `src/user/dto` y archivos `src/user/user.interface.ts`, `src/user/user.service.ts` 

# 28/08/25

1. `pnpm i class-transformer reflect-metadata`

2. Escribir código de archivos `src/shared/pipes/validation.pipe.ts` `src/user/user.decorator.ts`

# 01/09/25

1. `pnpm install @nestjs/swagger`

2. `pnpm approve-builds` presionamos tecla 'a' (para seleccionar todas las opciones) despues 'Enter' despues 'y'

3. Escribir código de archivos `src/user/auth.middleware.ts`,  `src/user/user.controller.ts`, `src/user/user.service.ts`, `src/user/user.module.ts`, `src/app.module.ts`