# Teoria Webpack

NPM (node package module).
Para iniciar a utilizer node debemos crear el archivo “package.json”, para eso utilizamos el comando: “npm init”.
Los package.json son necesarios para saber que paquetes son necesarios para que funcione el sistema creado.

## 4 puntos importantes

### Entradas
Todo aquello que se encuentre en la carpeta `src` sera el punto de entrada. Para la creacion de dichos puntos de entrada utilizamos `modos`, los cuales sirven para que webpack haga diferentes configuraciones archivos, la manera en como se configuran dichos archivos es desde el `package.json` en la parte de scripts:
```
`Modo desarrollo`
"dev": "webpack --mode development"

`Modo de produccion`
"build": "webpack --mode production"
```
`El modo de produccion suele ser mas ligero.`

#### Para crear varios punto de entrada tenemos la opcion de crear mas modos: 
```
"dev-foo": "webpack --mode development --entry ./foo/src/index.js --output-path ./foo/dist"

"build-foo": "webpack --mode production --entry ./foo/src/index.js --output-path ./foo/dist"
```
Ha dichos modos se les puede crear mas puntos de entrada(`--entry direccion`) y de salida(`--output-path`.).

### Salidas
Son los archivos o carpetas al final, suele ser `dist/` o `docs/`.

### Loaders
Seran los encargados de leer los diferentes tipos de archivos existentes.

### Plugins
Suelen dar ciertas funcionalidades a los diferentes loaders o al procesamiento de los archivos previamente leidos.

## Inicializar

### npm install
Con eso iniciaremos el `.json` donde posteriormente se encontrara todos los paquetes a usar en el proyecto.
### npm i -D webpack webpack-cli
Iniciamos webpack


# Configuracion de webpack (package.json)

## Servidor
Se debe instalar el siguiente paquete`npm i -D webpack-dev-server` se encargara de que todo funcione en tiempo real. Y dentro del `package.json`se debe escribir en el apartado `scripts`lo siguiente:
```
"start": "webpack serve argumentoDocumentacion
```

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.prod.js",
    "build:dev": "webpack --config webpack.config.js",
    "start": "webpack serve --config webpack.config.js --open-app-name=firefox --port=8080"
}

Test -> Se crea por defecto.

build -> Sera el nombre del paquete a crear.
build:dev -> Sera el nombre del paquete a crear.
En el caso de build y build:dev son 2 paquetes los cuales uno se usara para poner la aplicacion en produccion(build), mientras que el otro sera para desarrollo(build:dev), por lo que, al paquete "build" se buscara sea el mas ligero y que no tenga comentarios.
De igual manera dentro de esta configuracion debemos seleccionar la ubicacion del archivo donde se haran dichos paquetes, con la siguiente estructura:
"build": "webpack --config webpack.tipoArchivo.js" --> donde tipo de archivo nos dira si sera de desarrollo(dev), produccion(prod), etc.

start -> Sera la configuracion del servidor donde se ejecutara el sistema en tiempo real.
Se debe seleccionar el paquete del cual se hara la ejecucion, asi como el puerto del que se quisiera iniciar y el navegador desde el eque se quiera se abra:
"start": "webpack serve --config nombreBuild.js --open-app-name=nombreNavegadorAUsar --port=numeroPuerto".

# Configuracion paquete webpack

## Primero se definen algunas variables a utilizar de acuerdo a la documentacion de los plugins a usar. 

Las instrucciones hechas para cada uno de los plugins vienen definidos desde la documentacion de cada uno de ellos, asi como las opciones a modificar, agregar, etc. Por lo que para saber que hace con exactitud cada una de las opciones se recomienda revisar la documentacion.

Siempre que el paquete lleve el nombre `plugin`es casi seguro se debe crear la variable. No es necesario la variable lleve el "Plugin".
```
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
```

## Estructura de webpack, puede llevar mas opciones si se revisa la documentacion.

module.exports = {
    mode: 'production',

    output:{
        /**
         * clean: true -> Se usa para que cada que se haga un "npm run build" se elimina la carpeta "dist" y se reescribe.
         */
        clean: true,
        filename: 'main.[contenthash].js'
    },

    module:{
        rules:[
            {
                /**
                 * test -> Por medio de expresion regular se buscaran todos los archivos html..
                 * loader -> Se utiliza para poder cargar archivos html de manera de string a "dist" por medio de la build.
                 * options{sources} -> En caso de mover archivos con imagenes o archivos aparte, estos no tengan fallos al copiarse.*/
                test: /\.html$/,
                loader: 'html-loader',
                options:{
                    sources: false
                }
            },
            {
                /**
                 * test -> Se buscaran todos los archivos con extension css.
                 * exclude -> Para no tomar en cuenta los archivos en este caso que se llamen "styles.css"
                 * use -> Al hacer las instrucciones anterieos se usaran los paquetes "style-loader" y "css-loader".
                 */
                test: /\.css$/,
                exclude: /styles.css$/,
                use: [ 'style-loader', 'css-loader']
            },
            {
                /**
                 * Se buscaran todos los archivos llamados "style.css"
                 * A dicho archivo se le aplicaran los plugins "MiniCssExtractPlugin.loader" y "css-loader".
                 */
                test: /styles.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                /**
                 * Se buscaran todos los archivos de extension: png, jpg, jpeg o gif.
                 * Se les aplicara el plugin "file-loader"
                 */
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                /**
                 * Se buscaran todos los archivos con extension js.
                 * Se excluiran aquellos archivos que se encuentren en el directorio "node_modules".
                 * Se les aplicara el plugin "babel-loader" con la opcion definida en la documentacion.
                 */
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    optimization:{
        /**
         * Para optimizar parte del codigo se hara uso de los plugins "minimize" y "minimizer", principalmente con "CssMinimizerPlugin" y "TerserPlugin".
         */
        minimize: true,
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    },

    plugins:[
        /**
         * HtmlWebpackPlugin -> Se utilizara este plugin para poder mandar una copia del archivo html del origen a la carpeta "dist".
         * MiniCssExtractPlugin -> Se usara para poder crear un archivo CSS en el paquete "build" copiando ya existentes desde carpetas "src".
         * CopyPlugin -> Se usara para poder crear directorios en el paqute "build" copiando ya existentes desde carpetas "src".*/
        new HtmlWebpackPlugin({
            /**
             * title -> Se cambia el head del archivo html
             * filename -> Se cambia el nombre del archivo html a copiar en la carpeta "dist"
             * template -> Se selecciona un archivo de html al cual se le copiara toda su estructura. Sino se hace esto en la carpeta "dist" solo habra una archivo en blanco.
             */
            title: 'Mi webpack app',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns:[
                {from: 'src/assets', to: 'assets/'}
            ]
    })
    ]

}

# Comandos importantes

`npm init` -> Con este comando se inicializa npm
`npm run build` -> Con este comando reescribimos el trabajo actual en alguno de los paquetes que se configuraron(produccion, desarrollo, etc.)
`npm start` -> Se iniciliza un servidor para poder ver en tiempo real los cambios a un trabajo.
`npm i -D` -> Con este comando evitas poner "install --save-dev" y ya solo ocupas poner el paquete o paquetes a instalar(separados por un espacio).

# Plugins utilizados

https://webpack.js.org/
https://webpack.js.org/plugins/mini-css-extract-plugin/#root
https://webpack.js.org/loaders/style-loader/#root
https://webpack.js.org/loaders/css-loader/#root
https://webpack.js.org/plugins/html-webpack-plugin
https://webpack.js.org/loaders/html-loader/
https://webpack.js.org/configuration/dev-server/
https://github.com/webpack/webpack-dev-server
https://v4.webpack.js.org/loaders/file-loader/
https://webpack.js.org/plugins/copy-webpack-plugin/#root
https://webpack.js.org/plugins/css-minimizer-webpack-plugin/
https://webpack.js.org/plugins/terser-webpack-plugin/
https://webpack.js.org/guides/typescript/
https://www.npmjs.com/package/image-webpack-loader

## Para React solo ocupa`npm i <nombrePaquete>'
react
react-dom


# Babel

Sirve para poder utilizar una pagina hecha con ultimas versiones de javascript en versiones antiguas.

## Instalacion

npm install --save-dev babel-loader @babel/cor`

### Para react
```
npm i -D @babel/preset-ract
```

# Git y github

## gitignore

Se crea un archivo '.gitignore' donde se le dice a git que archivos o carpetas queremos sean ignoradas al ser subidas a la nube.

En este caso hubo 2 carpetas las cuales llevaran dicha funcion: las cuales son "dist" y 'node_modules'. Para poder ser ocupadas se necesitaran 2 comandos en especial.

### node_modules

Para podre volver a construir dicha carpeta, necesitamos el comando:

```
npm install
```

### dist

Para que esta carpeta se vuelva a crear se usara el comando:

```
npm run build
```
