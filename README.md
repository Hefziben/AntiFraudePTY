# AntiFraudePTY

## Configuración del Entorno

Para que la aplicación funcione correctamente, es necesario configurar las siguientes variables de entorno en un archivo `.env` dentro de la carpeta `shield-app/`:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_llave_anon_de_supabase
```

### Base de Datos
Asegúrate de ejecutar el archivo `shield-app/schema.sql` en el SQL Editor de Supabase para crear las tablas necesarias.

## Instalación y Ejecución

1. Entrar en la carpeta de la aplicación: `cd shield-app`
2. Instalar dependencias: `npm install`
3. Iniciar servidor de desarrollo: `npm run dev`
4. Construir para producción: `npm run build`