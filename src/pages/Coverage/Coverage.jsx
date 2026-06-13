import React, { useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Coverage = () => {
  const locations = useLoaderData();
  const mapRef = useRef(null);
  const position = [23.8103, 90.4125];
  const [searchResult, setSearchResult] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchResult("");
    const searchValue = e.target.search.value.toLowerCase().trim();
    const district = locations.find(
      (location) => location.district.toLowerCase() === searchValue,
    );
    const coveredarea = locations.find((location) =>
      location.covered_area.some((area) => area.toLowerCase() === searchValue),
    );
    const matchedLoaction = district || coveredarea;

    if (matchedLoaction) {
      let locationPosition = [
        matchedLoaction.latitude,
        matchedLoaction.longitude,
      ];
      mapRef.current.flyTo(locationPosition, 14, {
        duration: 2,
      });
      setSearchResult(searchValue);
    } else {
      alert("No location found");
      return;
    }
  };

  return (
    <div>
      <div className="p-10 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900">
        <div>
          <div className="flex flex-col gap-8 border-b pb-8 mb-8 border-gray-200 dark:border-gray-800">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
              We are available in 64 districts
            </h2>
            <div>
              <form onSubmit={handleSearch}>
                <div className="bg-gray-100 border border-gray-200 dark:border-gray-800 h-11 flex items-center justify-between gap-3 w-full max-w-md rounded-4xl overflow-hidden">
                  <div className="h-full shrink-0">
                    <label htmlFor="search">
                      <div className="h-full flex items-center justify-center ps-3 text-2xl text-gray-800 dark:text-white">
                        <IoSearchOutline></IoSearchOutline>
                      </div>
                    </label>
                  </div>
                  <div className="grow h-full">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="h-full w-full outline-none border-none"
                      placeholder="Search here"
                      required
                    />
                  </div>
                  <div className="shrink-0  h-full">
                    <button
                      type="submit"
                      className="h-full cursor-pointer bg-lime-400 hover:bg-lime-500 focus:bg-lime-400 duration-75 rounded-4xl px-8"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h3 className="font-bold text-3xl text-gray-800 dark:text-white">
                We deliver almost all over Bangladesh
              </h3>
              {searchResult && (
                <p className="mt-3">
                  Showing Location of:{" "}
                  <strong className="text-lime-500">
                    {searchResult.toUpperCase()}
                  </strong>
                </p>
              )}
            </div>
            <div className="h-125 rounded-2xl overflow-hidden ">
              <MapContainer
                className="h-full "
                center={position}
                zoom={7}
                scrollWheelZoom={false}
                ref={mapRef}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location, index) => {
                  return (
                    <Marker
                      key={index}
                      position={[location.latitude, location.longitude]}
                    >
                      <Popup>
                        <p className="font-bold border-b border-gray-300 pb-3 mb-0">
                          {location.district}
                        </p>
                        <p>
                          <span className="font-bold">Areas: </span>
                          {location.covered_area.join(", ")}.
                        </p>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
