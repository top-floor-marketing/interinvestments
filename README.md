# 🚀 React Plugin - Interinvestments

Este proyecto fue creado con **Create React App** y adaptado como plugin para ser embebido en distintos entornos a través de una carpeta de distribución personalizada (`/dist`).

---

## 🛠️ Variables de Entorno

Este proyecto utiliza varias variables para gestionar los entornos de desarrollo y producción, así como rutas y listeners específicos.

### 🌐 Archivo `.env`

Ejemplo de configuración:

```env
# ⚙️ General
GENERATE_SOURCEMAP=false
BUILD_PATH=dist
FOLDER_NAME=Agent_Card_Info_Plugin
PROD_PATH=https://interinvestments.site

# 🌍 Entorno
REACT_APP_NODE_ENV=production

# 📄 Plugin Listener
REACT_APP_PDF_LISTING_LISTENER=interinvestmentsCreatePdfListener

# 🔗 APIs
REACT_APP_API_URL_PROD=https://interinvestments.site/graphql
REACT_APP_API_URL_DEV=https://interinvestments.site/graphql

# 🌐 Dominios base
REACT_APP_DOMAIN_PROD=https://interinvestments.site/
REACT_APP_DOMAIN_DEV=https://interinvestments.site/