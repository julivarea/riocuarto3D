## Mapa de Río Cuarto en 3D
Esta página consiste en un mapa 3D de las edificaciones de Río Cuarto (Córdoba) usando [MapLibre](https://maplibre.org/), sobre un mapa 2D de fondo (el mapa estándar de [OpenStreetMap](https://www.openstreetmap.org), o imágenes satelitales de [ESRI](https://www.arcgis.com/index.html).

Los datos de edificaciones se obtuvieron del portal de descargas de [Mapas Cordoba (IDECOR)](https://www.mapascordoba.gob.ar/#/descargas). El archivo usado es el .json de edificaciones.
Este no contiene explícitamente los datos de la altura de cada edificación, sino que contiene para cada edificación su cantidad de pisos. Por eso, se añadió en QGIS un atributo de altura "estándar" a cada una según su cantidad de pisos. Luego, se transformo el archivo a un .geojson
con proyección EPSG 4326 para que sea compatible con MapLibre.
