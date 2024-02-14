import { TextInput, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      multiline
      textAlignVertical="top"
      className=" bg-slate-800 rounded-md px-4 py-3 font-body text-sm text-white"
      {...rest}
    />
  );
}
