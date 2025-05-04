## Installation

```sh
brew install pmtiles

pip install gpxpy
```

## Adding a new map

```sh
# Determine bounding box
python gpxbbox.py 2023

pmtiles extract https://build.protomaps.com/20250504.pmtiles 2023.pmtiles --bbox=2.312288,43.620541,3.346494,45.557904 --maxzoom
5
```

https://pmtiles.io/
