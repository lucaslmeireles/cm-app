import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Field } from "react-hook-form";


type SelectInputProps = {
    field: Field
    selectTitle?: string;
    selectList?: { value: string; label: string }[];
}

export const SelectInput = ({ field, selectTitle, selectList }: SelectInputProps) => {
    <Select
        onValueChange={field.onChange}
        defaultValue={field.value}
    >
        <FormControl>
            <SelectTrigger>
                <SelectValue placeholder={selectTitle} />
            </SelectTrigger>
        </FormControl>
        <SelectContent>
            {selectList?.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                    {item.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
}