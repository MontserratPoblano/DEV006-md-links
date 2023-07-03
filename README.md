# **PROYECTO MD-LINKS**

# Introducción :star2:

MD-LINKS es una librería de línea de comando diseñada para facilitar la obtención de enlaces en archivos con extensión markdown, algunas de las características claves de MD-LINKS son las siguientes:

-  Obtención de enlaces: MD-LINKS es capaz de identificar y extraer enlaces presentes en archivos con extensión markdown.
-  Exploración de directorios: analizar directorios en busca de archivos markdown.
-  Información de los enlaces: no solo recopila URL de los enlaces sino que también muestra el texto asociado y el archivo donde se encontraron.
-  Estadísticas: puedes obtener el recuento total de enlaces, identificar cuáles son únicos y detectar los enlaces rotos o no válidos.


## Tabla de contenido
>
* [1. Instalación](#instalación)
>
* [2. Guía de uso](#guía-de-uso)
>
* [3. Ejemplos](#ejemplos)
>
* [4. Diagramas de flujo](#diagrama-de-flujo)
>
* [5. Autor](#autor)
>




## Instalación

Sigue los pasos a continuación para instalar la CLI en tu sistema:
1. Abre una terminal o línea de comandos.
2. Ejecuta el siguiente comando para instalar la CLI utilizando npm.
3. Puedes verificar que se ha instalando correctamente ejecutando el siguiente comando: 


## Guía de uso  
:+1: Para usarlo en terminal:

 md-links **`<path-to-file>`** [options]
 

 ---

 **Uso basico**

 -Una vez instalada la CLI, puedes utilizarla en cualquier directorio que contenga archivos markdown.

 Ejecuta el siguiente comando para obtener los enlaces de los archivos Markdown:

 ````javascript
 md-links <path-to-file> 
 ````

Reemplaza `<path-to-file>` con la ruta del archivo o directorio que deseas analizar. Por ejemplo:

````javascript
 md-links ./docs
 ````
La CLI buscará en los archivos Markdown del directorio especificado y mostrará una lista de los enlaces encontrados, junto con información adicional como la ruta del archivo y el texto del enlace.


 **Opciones adicionales**

 Puedes agregar las siguientes opciones para personalizar el comportamiento de MD-LINKS:

 - `--validate ` o `--v ` Realiza una validación de enlaces para verificar su estado, muestra el código de respuesta HTTP y el estado del mensaje.

 - `--stats ` o `--s `Muestra estadistícas básicas sobre los enlaces, como el número total de enlaces y el número de enlaces únicos.

- `--validate --stats ` o `--v --s ` Puedes combinar las opciones para tener obtener resultados más detallados, esto te mostrara las estadisticas y validación de enlaces.

```` javascript
md-links ./docs --validate --stats 
````

**Ayuda**

Si necesitas obtener información adicional sobre como utilizar la CLI ``md-links`` o conocer las opciones disponibles, puedes utilizar la opción de ayuda, simplemente ejecuta el siguiente comando: ``--help`` o ``-h``

````javascript
md-links --help   
````



