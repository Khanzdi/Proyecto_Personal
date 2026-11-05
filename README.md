# ReservaFácil — demostración para fincas

Landing page estática para captar solicitudes de cotización y continuar la conversación por WhatsApp.

## Estructura

- `index.html`: contenido y estructura.
- `styles.css`: diseño responsive.
- `config.js`: datos del negocio y configuración.
- `app.js`: menú, validación del formulario y WhatsApp.
- `google-apps-script.gs`: integración opcional con Google Sheets.

## Antes de publicar

1. Abre `config.js`.
2. Cambia `businessName`, `location` y `whatsappNumber`.
3. El número debe incluir indicativo internacional, solo dígitos. Ejemplo de formato colombiano: `573001112233`.
4. Reemplaza las fotografías de muestra por imágenes propias o con licencia adecuada. Busca las URLs `images.unsplash.com` en `index.html` y `styles.css`.
5. Actualiza título, descripción, servicios, capacidad, dirección y textos para el negocio real.
6. Prueba el formulario en un celular y computador.

**Importante:** los textos, nombre y fotografías actuales son demostrativos. No representan una finca real. El formulario no confirma reservas ni consulta disponibilidad en tiempo real; abre WhatsApp para que el negocio confirme la solicitud.

## Publicar gratis en GitHub Pages

1. Crea un repositorio público en GitHub llamado `reservafacil-demo`.
2. Sube `index.html`, `styles.css`, `config.js` y `app.js` a la raíz del repositorio.
3. En el repositorio entra a **Settings → Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**.
5. Selecciona `main` y carpeta `/ (root)`. Guarda.
6. Espera la publicación. La URL tendrá este formato:
   `https://TU-USUARIO.github.io/reservafacil-demo/`

No subas contraseñas, claves privadas ni información personal de clientes al repositorio.

## Integración opcional con Google Sheets

1. Crea una hoja de cálculo.
2. Copia el ID que aparece entre `/d/` y `/edit` en la URL.
3. Abre **Extensiones → Apps Script** y pega `google-apps-script.gs`.
4. Reemplaza `SPREADSHEET_ID`.
5. Implementa como **Aplicación web**, ejecutando como tú y con acceso para cualquier persona.
6. Copia la URL de implementación terminada en `/exec`.
7. Pégala en `googleSheetsEndpoint` dentro de `config.js`.

El modo `no-cors` del navegador no permite verificar desde el frontend si Sheets guardó la fila. Haz una prueba revisando directamente la hoja. Si el registro es crítico, conviene implementar una integración con respuesta verificable y controles anti-spam.

## Costos

El prototipo puede publicarse sin costo con GitHub Pages, Google Sheets y Apps Script dentro de sus cuotas. El dominio personalizado es opcional y puede generar costo. No se incluyen servicios pagos ni API oficial de WhatsApp.
