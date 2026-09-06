# DocStore

**DocStore** es un gestor documental moderno que permite a usuarios autenticados cargar, organizar, consultar, previsualizar, descargar y eliminar documentos de forma segura y eficiente.

El foco del producto es una experiencia tipo biblioteca de documentos: el usuario navega archivos, los encuentra por nombre o filtros, y no necesita conocer ni acceder a las rutas internas del filesystem. La separaci&oacute;n entre documento, archivo f&iacute;sico y metadata permite evolucionar despu&eacute;s a versionado, permisos y b&uacute;squeda avanzada.

---

## ✨ Caracter&iacute;sticas principales (MVP)

- **Autenticaci&oacute;n b&aacute;sica**: registro e inicio de sesi&oacute;n de usuarios.
- **Carga de documentos**: uno o varios archivos por operaci&oacute;n.
- **Almacenamiento local**: archivos guardados en filesystem con clave &uacute;nica interna.
- **Metadata en SQL Server**: entidades y relaciones persistentes.
- **Biblioteca de documentos**: listado paginado con ordenamiento.
- **Carpetas simples**: organizaci&oacute;n jer&aacute;rquica b&aacute;sica.
- **Etiquetas**: clasificaci&oacute;n transversal de documentos.
- **B&uacute;squeda y filtros**: por nombre, tipo, carpeta, etiqueta y fechas.
- **Previsualizaci&oacute;n**: formatos soportados (PDF, im&aacute;genes, texto).
- **Descarga**: recuperaci&oacute;n del archivo con su nombre original.
- **Edici&oacute;n de metadata**: t&iacute;tulo, descripci&oacute;n, carpeta, etiquetas, tipo documental.
- **Eliminaci&oacute;n l&oacute;gica**: papelera con restauraci&oacute;n y eliminaci&oacute;n permanente.
- **Bit&aacute;cora de actividad**: registro de eventos relevantes (upload, download, delete, etc.).

---

## 🚀 Stack tecnol&oacute;gico

- **Frontend**: Angular
- **Backend**: Flask (Python)
- **Base de datos**: SQL Server
- **Storage inicial**: filesystem local persistente
- **Contenedores**: Docker
- **B&uacute;squeda avanzada (futura)**: OpenSearch

---

## 🏗️ Arquitectura del sistema

```
┌─────────────┐
│   Angular   │  ← Frontend (SPA)
└──────┬──────┘
       │ HTTP/JSON
┌──────▼──────┐
│    Flask    │  ← Backend API (REST)
└──────┬──────┘
       ├──────────────┐
       │              │
┌──────▼──────┐ ┌─────▼──────┐
│  SQL Server │ │ Filesystem │
│  (metadata) │ │  (binarios)│
└─────────────┘ └────────────┘
```

- **SQL Server** es la fuente de verdad para entidades y metadata.
- **Filesystem** contiene los bytes f&iacute;sicos, identificados mediante una `storage_key` &uacute;nica.
- El **frontend** nunca recibe rutas internas del filesystem; toda operaci&oacute;n pasa por la API.

---

## 📁 Estructura del proyecto (sugerida)

```
docstore/
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── documents/
│   │   ├── folders/
│   │   ├── tags/
│   │   ├── activity/
│   │   ├── storage/
│   │   ├── common/
│   │   ├── extensions.py
│   │   └── config.py
│   ├── tests/
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 🔐 Seguridad y validaciones

- Hash de contrase&ntilde;as (nunca almacenamiento en texto plano).
- Validaci&oacute;n de extensi&oacute;n, MIME type y tama&ntilde;o m&aacute;ximo por archivo.
- No se conf&iacute;a en la extensi&oacute;n enviada por el cliente.
- No se aceptan rutas enviadas por el navegador.
- El archivo se resuelve &uacute;nicamente desde una `storage_key` almacenada en la base.
- Verificaci&oacute;n del `owner_user_id` en cada operaci&oacute;n (autorizaci&oacute;n por propietario).
- Prevenci&oacute;n de path traversal y exposici&oacute;n de informaci&oacute;n sensible en errores.

---

## 🗂️ Modelo de datos (entidades principales)

- **Usuario**: representa a la persona autenticada.
- **Carpeta**: ubicaci&oacute;n l&oacute;gica para organizar documentos (jerarqu&iacute;a simple).
- **Documento**: entidad principal que el usuario ve y administra.
- **Archivo de documento**: binario f&iacute;sico asociado al documento (1:1 en el MVP).
- **Etiqueta**: clasificaci&oacute;n transversal de documentos.
- **Documento-Etiqueta**: relaci&oacute;n muchos a muchos.
- **Actividad**: registro de eventos importantes para trazabilidad.

---

## 📄 Estados del documento

- **ACTIVE**: documento disponible en biblioteca.
- **DELETED**: documento eliminado l&oacute;gicamente (aparece en papelera).
- **ARCHIVED**: reservado para futura iteraci&oacute;n (documentos que se conservan pero no se muestran en el flujo principal).

---

## 🗑️ Papelera y ciclo de vida

- **Eliminaci&oacute;n l&oacute;gica**: el documento pasa a estado `DELETED` y aparece en la papelera.
- **Restauraci&oacute;n**: vuelve a `ACTIVE` y limpia `deleted_at`.
- **Eliminaci&oacute;n permanente**: eliminaci&oacute;n definitiva del registro y opcionalmente del archivo f&iacute;sico.
- **Limpieza programada (futura)**: job que purga documentos eliminados hace m&aacute;s de N d&iacute;as.

---

## 🎯 Casos de uso principales

1. **Autenticarse**: inicio de sesi&oacute;n y acceso a la biblioteca personal.
2. **Cargar documento**: selecci&oacute;n de archivo, validaci&oacute;n, almacenamiento y registro de metadata.
3. **Explorar biblioteca**: listar, ordenar, buscar y filtrar documentos.
4. **Ver detalle**: visualizar metadata, preview y actividad reciente.
5. **Previsualizar**: visualizaci&oacute;n de formatos soportados (PDF, im&aacute;genes, texto).
6. **Descargar**: recuperaci&oacute;n del archivo con su nombre original.
7. **Editar metadata**: modificar t&iacute;tulo, descripci&oacute;n, carpeta, etiquetas, tipo documental.
8. **Eliminar documento**: movimiento a papelera con registro de actividad.
9. **Gestionar papelera**: restaurar o eliminar permanentemente documentos.

---

## 📈 Roadmap

### Iteraci&oacute;n 1 (MVP)

- N&uacute;cleo funcional: autenticaci&oacute;n, carga, listado, preview, descarga, edici&oacute;n, eliminaci&oacute;n l&oacute;gica, papelera b&aacute;sica.

### Iteraci&oacute;n 2

- Vista de cards.
- Favoritos.
- Recientes.
- Papelera visible con restauraci&oacute;n.
- Miniaturas.
- Mejor carga m&uacute;ltiple.

### Iteraci&oacute;n 3

- OpenSearch.
- Indexaci&oacute;n de t&iacute;tulo, nombre, etiquetas, tipo y metadata.
- B&uacute;squeda por contenido.
- Extracci&oacute;n de texto desde PDF.
- Filtros con facetas.
- Reindexaci&oacute;n desde SQL Server.

### Iteraci&oacute;n 4

- Versionado.
- Compartici&oacute;n.
- Permisos por carpeta o documento.
- Enlaces temporales.

### Iteraci&oacute;n 5

- Object storage.
- Cifrado.
- Antivirus.
- Auditor&iacute;a extendida.
- Observabilidad.
- Retenci&oacute;n.
- Eliminaci&oacute;n definitiva.

---

## 📝 Criterios de aceptaci&oacute;n (MVP)

El MVP estar&aacute; listo cuando:

- Un usuario autenticado pueda subir un PDF o una imagen.
- La carga cree documento, archivo asociado y actividad.
- Dos archivos con el mismo nombre original puedan coexistir.
- El filesystem use una `storage_key` &uacute;nica, no el nombre original.
- La biblioteca liste documentos con paginaci&oacute;n.
- La biblioteca permita buscar por nombre.
- Existan filtros por tipo, carpeta y etiqueta.
- Se puedan visualizar PDF, im&aacute;genes y texto.
- Se pueda descargar cualquier archivo permitido.
- Se pueda editar metadata sin reemplazar el binario.
- Se pueda eliminar l&oacute;gicamente un documento.
- El frontend no conozca paths internos del filesystem.
- Cada operaci&oacute;n importante genere una actividad.
- La papelera permita restaurar y eliminar permanentemente.

---

## 🛠️ Instalaci&oacute;n y ejecuci&oacute;n (pendiente)

> Esta secci&oacute;n se completar&aacute; cuando el proyecto est&eacute; implementado.

```bash
# Ejemplo futuro:
docker-compose up --build
```

---

## 📄 Licencia

MIT

---

## 👤 Autor

Proyecto personal de portafolio &mdash; desarrollado como demostraci&oacute;n de capacidades en backend, arquitectura de software y gesti&oacute;n documental.
