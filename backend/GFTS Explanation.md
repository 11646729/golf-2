# Mapping routes, trips & stops for GTFS data

TRIPS
The trips.txt file contains a list of trips, each with:
1 - A route ID: route_id
2 - A trip ID: trip_id
3 - A shape ID: shape_id
4 - A direction ID: direction_id

ROUTES
The routes.txt file defines the set of bus routes for a specific Company, each with:
1 - A route ID: route_id
2 - The name of the Company: agency_id

SHAPES
The shapes.txt file contains a set of points, each with:
1 - A common ID: shape_id
2 - A latitude: shape_pt_lat
3 - A longitude: shape_pt_lon
4 - A sequence number: shape_pt_sequence
5 - A distance travelled from the previous point: shape_dist_traveled

Each shape has a common shape_id and consists of the total sequence of straight lines joining these points.

STOP TIMES
The stop_times.txt file specifies individual stop arrivals and departures for each trip. It contains:
1 - A trip ID: trip_id
2 - A single stop: stop_id
3 - A unique number for a given trip to indicate the stopping order: stop_sequence

STOPS
The stops.txt contains individual locations where vehicles pick up or drop off passengers, each with:
1 - A common ID: stop_id
2 - A latitude: stop_lat
3 - A longitude: stop_lon
4 - A name of the stop as passengers know it by: stop_name
5 - A code identifying a stop to passengers: stop_code

The stops.txt file also contains details of stations, timezomes, wheelchair access etc.
