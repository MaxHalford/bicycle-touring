import glob
import gpxpy

def main(path: str):

    min_lat, max_lat = float('inf'), float('-inf')
    min_lon, max_lon = float('inf'), float('-inf')

    for gpx_path in glob.glob(path + "/*.gpx"):

        with open(gpx_path, 'r') as gpx_file:
            gpx = gpxpy.parse(gpx_file)

        for track in gpx.tracks:
            for segment in track.segments:
                for point in segment.points:
                    min_lat = min(min_lat, point.latitude)
                    max_lat = max(max_lat, point.latitude)
                    min_lon = min(min_lon, point.longitude)
                    max_lon = max(max_lon, point.longitude)

    # Order from https://docs.protomaps.com/pmtiles/cli#extract
    bbox = (min_lon, min_lat, max_lon, max_lat)
    print(f"Bounding box: {','.join(map(str, bbox))}")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Calculate the bounding box of a GPX file.")
    parser.add_argument("path", type=str, help="Path to the GPX file")
    args = parser.parse_args()

    main(args.path)
