const map = new maplibregl.Map({
    container: 'map',
    style: {
      "version": 8,
      "sources": {
        "osm": {
          "type": "raster",
          "tiles": [
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          ],
          "tileSize": 256
        },
        "satellite": {
          "type": "raster",
          "tiles": [
            "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          ],
          "tileSize": 256
        }
      },
      "layers": [
        {
          "id": "background",
          "type": "background",
          "paint": {
            "background-color": "#f0f0f0"
          }
        },
        {
          "id": "basemap-osm",
          "type": "raster",
          "source": "osm",
          "layout": { "visibility": "visible" }
        },
        {
          "id": "basemap-satellite",
          "type": "raster",
          "source": "satellite",
          "layout": { "visibility": "none" }
        },
      ]
    },
    center: [-64.3477571, -33.139869],
    zoom: 12,
    pitch: 45,
    maxPitch: 85,
    attributionControl: false,
    hash: true
  });

  map.addControl(new maplibregl.NavigationControl());
  
  const layers = {
    edificios: { 
      id: "3d-buildings",
      source: { 'type': 'geojson', 'data': 'capas/edifConParcelasYColoresEPSG4326alturaCorregida.geojson' },
      layer: {
        "id": "3d-buildings",
        "type": "fill-extrusion",
        "source": "3d-buildings",
        "paint": {
          "fill-extrusion-color": ["get","color"],
          "fill-extrusion-height": ["get", "alturaMetros"],
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": 1
        }
      }
    },
    manzanas: {
      id: "manzanas",
      source: { 'type': 'geojson', 'data': 'capas/manzanasEPSG4326.geojson' },
      layer: {
        "id": "manzanas",
        "type": "fill-extrusion",
        "source": "manzanas",
        "paint": {
          "fill-extrusion-color": "#ababab",
          "fill-extrusion-height": 0.75,
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": 0.8
        }
      }
    },
    calles: {
      id: "calles",
      source: { 'type': 'geojson', 'data': 'capas/callesEPSG4326.geojson' },
      layer: {
        "id": "calles",
        "type": "fill-extrusion",
        "source": "calles",
        "paint": {
          "fill-extrusion-color": "#000000",
          "fill-extrusion-height": 0.1,
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": 0.55
        }
      }
    },
    espaciosVerdes: {
      id: "espacios-verdes",
      source: { 'type': 'geojson', 'data': 'capas/espaciosVerdesEPSG4326.geojson' },
      layer: {
        "id": "espacios-verdes",
        "type": "fill-extrusion",
        "source": "espacios-verdes",
        "paint": {
          "fill-extrusion-color": "#58c468",
          "fill-extrusion-height": 0.85,
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": 0.85
        }
      }
    },
    rio: {
      id: "rio",
      source: { 'type': 'geojson', 'data': 'capas/rioEPSG4326.geojson' },
      layer: {
        "id": "rio",
        "type": "fill-extrusion",
        "source": "rio",
        "paint": {
          "fill-extrusion-color": "#72bced",
          "fill-extrusion-height": 0.2,
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": 0.85
        }
      }
    }
  };

  function toggleLayer(layerName, isVisible) {
    const layer = layers[layerName];
    if (isVisible) {
      if (!map.getLayer(layer.id)) {
        map.addSource(layer.id, layer.source);
        map.addLayer(layer.layer);
      }
    } else {
      if (map.getLayer(layer.id)) {
        map.removeLayer(layer.id);
        map.removeSource(layer.id);
      }
    }
  }

  function switchBasemap(basemap) {
    map.setLayoutProperty('basemap-osm', 'visibility', basemap === 'osm' ? 'visible' : 'none');
    map.setLayoutProperty('basemap-satellite', 'visibility', basemap === 'satellite' ? 'visible' : 'none');
  }

  map.on('load', () => {
      map.setSky(undefined);
      map.setSky({
        'sky-color': '#91CEFF', 
        'sky-horizon-blend': 0.5,
        'horizon-color': '#FEFEFE',
        'horizon-fog-blend': 0.6,
        'fog-color': '#0000FF',
        'fog-ground-blend': 0,
    });
    
    // Agrego las capas activadas por defecto
    toggleLayer('edificios', true);
    toggleLayer('manzanas', true);

    document.getElementsByName('basemap').forEach((radio) => {
      radio.addEventListener('change', (e) => {
        switchBasemap(e.target.value);
      });
    });

    // Event listeners para los checkboxes
    document.getElementById('toggle-edificios').addEventListener('change', (e) => {
      toggleLayer('edificios', e.target.checked);
    });

    document.getElementById('toggle-manzanas').addEventListener('change', (e) => {
      toggleLayer('manzanas', e.target.checked);
    });

    document.getElementById('toggle-calles').addEventListener('change', (e) => {
      toggleLayer('calles', e.target.checked);
    });

    document.getElementById('toggle-espacios-verdes').addEventListener('change', (e) => {
      toggleLayer('espaciosVerdes', e.target.checked);
    });

    document.getElementById('toggle-rio').addEventListener('change', (e) => {
      toggleLayer('rio', e.target.checked);
    });

    switchBasemap('osm');
  });
