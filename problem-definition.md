
# Definición del Problema

## Objetivos

Desarrollar un sistama que:

1)  Permita subir un archivo(.jpg, .png) o documento PDF.
2)  Extraiga el texto de dicho archivo (OCR).
3)  Identifique el tipo de archivo inicialmente si es DNI.
4)  En caso de ser DNI, se extraigan los datos estructurados como:
    * Numero de DNI
    * Nombres
    * Apellidos
    * Fecha de Nacimiento
    * Sexo
    * Lugar de Nacimiento
5)  Devolver los datos al cliente en formato JSON, para que puedan ser utilizado en autocompletado u otros procesos.

## Entradas

*   Archivo subido por el usuario en formato:
    *   .jpg, .jpeg, .png (imagen)
    * .pdf (documento PDF)
*   Preferentemente el archivo debe tener:
    * Texto legible
    * Buena iluminación y contraste
    * Resolución suficiente como para que el OCR lo pueda procesa correctamente.

## Procesamiento

*   Detección de tipo de archivo
    * Si es imagen -> pasa directamente al OCR
    * Si es pdf -> se convierte cada página a imagen -> pasan al OCR
*   OCR
    * Aplica la extracción de texto usando Tesseract.js, configurado en idioma español.
*   Postprocesado de texto
    * Se eliminan todos los caracteres extraños
    * Normalización(espaciado, mayusculas/minusculas)
*   Iterpretación de Texto
    * Opción A: Usando expresiones regulares para extraer los datos.
    * Opción B: Usando un IA(local) para interpretar y devolver los datos en formato JSON. (RECOMENDADA)
*   Validación de los datos extraidos
    * Validar DNI(que tenga entre 7 y 8 digitos)
    * Validar Nombres y Apellidos
    * Validar Fecha de Nacimiento
    * Validar Sexo
    * Validar Lugar de Nacimiento
*   Devolución
    * Devolver los datos estructurados en formato JSON

## Salidas esperadas

Ejemplo de respuesta JSON:

```json
    {
        "datos": {
            "dni": "12345678",
            "nombres": "Jane",
            "apellidos": "Doe",
            "fecha_nacimiento": "01/01/1990",
            "sexo": "Masculino",
            "lugar_nacimiento": "San luis"
        }
    }
```

## Criterios de éxito
*   El sistema identifica correctamente los campos solicitados en imágenes claras.

*   El sistema maneja errores de OCR devolviendo resultados parciales si es posible.

*   El sistema soporta PDF de múltiples páginas, procesando al menos la primera que contenga datos.

## Limitaciones actuales
*   No hay autenticación de usuarios.

*   Los archivos procesados no se almacenan de forma persistente (se manejan como temporales).

*   No hay control de acceso ni sistema de historial.

## Futuras mejoras (TODO)
Para próximas etapas se prevé:

*   Sistema de usuarios con login/registro.

*   Almacenamiento persistente de archivos y resultados (local o en la nube).

*   Historial de documentos procesados por usuario.

*   Soporte para múltiples tipos de documentos (facturas, pasaportes, licencias de conducir).

*   Mejoras en la precisión del OCR con modelos especializados.

*   Interfaz web para carga y visualización de resultados.