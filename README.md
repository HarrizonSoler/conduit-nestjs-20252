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

# 08/09/25

1. `pnpm i @mikro-orm/migrations @mikro-orm/entity-generator @mikro-orm/reflection @mikro-orm/seeder @mikro-orm/cli`

2. Ejecutar migraciones:  `pnpm mikro-orm migration:create -- --initial`

# 15/09/25

- `pnpm install slug`

- `pnpm install -D @types/slug`

- Crear el módulo `article` con el comando: `nest g module article`

- Copiar los archivos `src/article/article.entity.ts`, `src/article/article.service.ts` y `src/article/article.module.ts` e implementar los siguientes archivos:

1. `src/article/comment.entity.ts`
	- Implementar los siguientes atributos con anotaciones Mikro-ORM:
		```
		id de tipo number como llave primaria
		createdAt = new Date()

		@Property({ onUpdate: () => new Date() })
		updatedAt = new Date()

		body de tipo string
		article de tipo Article con relación ManyToOne
		author de tipo User con relación ManyToOne
		```
	- Implementar constructor con argumentos author, article y body

2. `src/article/dto/create-article.dto.ts`
	- Implementar los siguientes atributos con anotaciones Swagger (vease @ApiProperty):
		```
		title de tipo string
		description de tipo string
		body de tipo string
		tagList de tipo string[]
		```

3. `src/article/dto/create-comment.dto.ts`
	- Implementar el atributo `body` de tipo string con anotacion Swagger 

4. `src/article/dto/index.ts` 
	- Implementar barrel para los archivos dto

5. `src/article/article.interface.ts`
	- Implementar interface CommentResponse con atributo `body` de tipo string
	- Implementar interface CommentsResponse con atributo `comments` de tipo CommentResponse[]
	- Implementar interface ArticleResponse con atributo `article` de tipo ArticleDTO
	- Implementar interface ArticlesResponse con atributos:
		```
		articles de tipo ArticlesDTO
		articlesCount de tipo number
		```

6. `src/article/article.controller.ts`
	- En la documentación de los endpoints [https://docs.realworld.show/specifications/backend/endpoints/](https://docs.realworld.show/specifications/backend/endpoints/) implementar las rutas que comienzen por `/api/articles`, asi mismo verificar que cumpla el formato de respuesta body json [https://docs.realworld.show/specifications/backend/api-response-format/](https://docs.realworld.show/specifications/backend/api-response-format/). Especificamente los siguientes endpoints:

		```
		GET /api/articles
		GET /api/articles/feed
		GET /api/articles/:slug
		POST /api/articles
		PUT /api/articles/:slug
		DELETE /api/articles/:slug
		POST /api/articles/:slug/comments
		GET /api/articles/:slug/comments
		DELETE /api/articles/:slug/comments/:id
		POST /api/articles/:slug/favorite
		DELETE /api/articles/:slug/favorite
		```

	- Completar endpoints con anotaciones Swagger @ApiBody, @ApiParam, etc.

	> [!TIP]
	> Recuerda que los endpoints no solicitan algún dato del usuario sino que es extraido con la anotación especial `@User('atributo por ejemplo id o email')` importada del archivo `src/user/user.decorator.ts` la cual es usada en el controlador `user.controller.ts`.

7. Completar atributos faltantes `favorites` y `articles` para `user.entity.ts`.
