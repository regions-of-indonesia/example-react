import type { Region } from "@regions-of-indonesia/types";

const RegionSelectOptions = (props: { regions: Region[] }) => (
  <>
    {props.regions.map((region) => (
      <option key={region.code} value={region.code}>
        {region.name}
      </option>
    ))}
  </>
);

export default RegionSelectOptions;
