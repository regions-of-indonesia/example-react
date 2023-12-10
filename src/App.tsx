import { useEffect, useState } from "react";

import { create, cache } from "@regions-of-indonesia/client";
import { isRegionCode } from "@regions-of-indonesia/utils";
import type { Region } from "@regions-of-indonesia/types";

import Label from "./components/Label";
import Select from "./components/Select";
import RegionSelectOptions from "./components/RegionSelectOptions";

const client = create({
  middlewares: [cache()],
});

const parseRegionCode = (value: unknown) => {
  if (value && isRegionCode(value)) return value;
  throw new Error("Invalid region code");
};

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
        console.error(error);
        setProvinces([]);
      }
    };

    effect();
  }, []);

  useEffect(() => {
    const effect = async () => {
      setSelectedDistrictCode("");

      try {
        setDistricts(await client.district.find(parseRegionCode(selectedProvinceCode)));
      } catch (error) {
        console.error(error);
        setDistricts([]);
      }
    };

    effect();
  }, [selectedProvinceCode]);

  useEffect(() => {
    const effect = async () => {
      setSelectedSubdistrictsCode("");

      try {
        setSubdistricts(await client.subdistrict.find(parseRegionCode(selectedDistrictCode)));
      } catch (error) {
        console.error(error);
        setSubdistricts([]);
      }
    };

    effect();
  }, [selectedDistrictCode]);

  useEffect(() => {
    const effect = async () => {
      setSelectedVillageCode("");

      try {
        setVillages(await client.village.find(parseRegionCode(selectedSubdistrictsCode)));
      } catch (error) {
        console.error(error);
        setVillages([]);
      }
    };

    effect();
  }, [selectedSubdistrictsCode]);

  return (
    <>
      <div className="container max-w-screen-lg mx-auto p-4 md:p-6 lg:p-8 xl:p-10">
        <h1 className="mb-4 lg:mb-6 text-center text-lg md:text-xl 2xl:text-2xl font-mono font-bold">Regions of Indonesia</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="select-provinces">Provinces</Label>
            <Select id="select-provinces" value={selectedProvinceCode} onChange={setSelectedProvinceCode}>
              <option value="" disabled>
                Select...
              </option>
              <RegionSelectOptions regions={provinces} />
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="select-districts">Districts</Label>
            <Select id="select-districts" value={selectedDistrictCode} onChange={setSelectedDistrictCode}>
              <option value="" disabled>
                Select...
              </option>
              <RegionSelectOptions regions={districts} />
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="select-subdistricts">Subdistricts</Label>
            <Select id="select-subdistricts" value={selectedSubdistrictsCode} onChange={setSelectedSubdistrictsCode}>
              <option value="" disabled>
                Select...
              </option>
              <RegionSelectOptions regions={subdistricts} />
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="select-villages">Villages</Label>
            <Select id="select-villages" value={selectedVillageCode} onChange={setSelectedVillageCode}>
              <option value="" disabled>
                Select...
              </option>
              <RegionSelectOptions regions={villages} />
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
