import { useEffect, useState } from "react";

import { create } from "@regions-of-indonesia/client";
import type { Region } from "@regions-of-indonesia/types";

const client = create();

function App() {
  const [provinces, setProvinces] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<Region[]>([]);
  const [subdistricts, setSubdistricts] = useState<Region[]>([]);
  const [villages, setVillages] = useState<Region[]>([]);

  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string>("");
  const [selectedSubdistrictsCode, setSelectedSubdistrictsCode] = useState<string>("");
  const [selectedVillageCode, setSelectedVillageCode] = useState<string>("");

  useEffect(() => {
    const effect = async () => {
      try {
        setProvinces(await client.province.find());
      } catch (error) {
        setProvinces([]);
      }
    };

    effect();
  }, []);

  useEffect(() => {
    const effect = async () => {
      setSelectedDistrictCode("");

      try {
        setDistricts(await client.district.find(selectedProvinceCode));
      } catch (error) {
        setDistricts([]);
      }
    };

    effect();
  }, [selectedProvinceCode]);

  useEffect(() => {
    const effect = async () => {
      setSelectedSubdistrictsCode("");

      try {
        setSubdistricts(await client.subdistrict.find(selectedDistrictCode));
      } catch (error) {
        setSubdistricts([]);
      }
    };

    effect();
  }, [selectedDistrictCode]);

  useEffect(() => {
    const effect = async () => {
      setSelectedVillageCode("");

      try {
        setVillages(await client.village.find(selectedSubdistrictsCode));
      } catch (error) {
        setVillages([]);
      }
    };

    effect();
  }, [selectedSubdistrictsCode]);

  return (
    <>
      <div className="container max-w-screen-lg mx-auto p-4 md:p-6 lg:p-8 xl:p-10">
        <h1 className="mb-4 lg:mb-6 text-center text-lg lg:text-xl font-mono">Regions of Indonesia</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          <div>
            <select
              className="select select-bordered select-xs w-full"
              value={selectedProvinceCode}
              onChange={(event) => {
                setSelectedProvinceCode(event.currentTarget.value);
              }}
            >
              <option value="" disabled>
                Select...
              </option>

              {provinces.map((region) => (
                <option key={region.code} value={region.code}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="select select-bordered select-xs w-full"
              value={selectedDistrictCode}
              onChange={(event) => {
                setSelectedDistrictCode(event.currentTarget.value);
              }}
            >
              <option value="" disabled>
                Select...
              </option>

              {districts.map((region) => (
                <option key={region.code} value={region.code}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="select select-bordered select-xs w-full"
              value={selectedSubdistrictsCode}
              onChange={(event) => {
                setSelectedSubdistrictsCode(event.currentTarget.value);
              }}
            >
              <option value="" disabled>
                Select...
              </option>

              {subdistricts.map((region) => (
                <option key={region.code} value={region.code}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="select select-bordered select-xs w-full"
              value={selectedVillageCode}
              onChange={(event) => {
                setSelectedVillageCode(event.currentTarget.value);
              }}
            >
              <option value="" disabled>
                Select...
              </option>

              {villages.map((region) => (
                <option key={region.code} value={region.code}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
