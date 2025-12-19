import React from "react";
import type { GenresParentSelectProps } from "./GenresParentSelect.types";
import { Controller } from "react-hook-form";
import { useGenreOption } from "../../hooks/useGenreOption";
import type { Option } from "@/types/options.types";
import CustomSelect from "@/components/ui/CustomForm/CustomSelect";

const GenresParentSelect: React.FC<GenresParentSelectProps> = ({
  control,
  name,
  isDisabled,
}) => {
  const { data, isLoading } = useGenreOption({ onlyParent: true });
  const options: Option[] =
    data?.data?.map((g) => ({ label: g.name, value: g.id })) ?? [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        // <Select
        //   options={options}
        //   value={options?.find((o) => o.value === value) ?? null}
        //   onChange={(opt) => onChange(opt?.value)}
        //   isClearable
        //   isLoading={isLoading}
        //   placeholder="Select parent genre"
        //   classNames={tailwindSelectClasses}
        // />
        <CustomSelect
          isDisabled={isDisabled}
          options={options}
          value={options?.find((o) => o.value === value) ?? null}
          onChange={(opt) => onChange((opt as Option | null)?.value ?? null)}
          isLoading={isLoading}
          placeholder="Select parent genre"
        />
      )}
    />
  );
};

export default GenresParentSelect;
