import { FC, useState } from "react";

import { Stack, TextField } from "@mui/material";

import { Condition } from "../../App";

type ReplaceProps = {
  src: string;
  target: string;
  onChange: (condition: Condition) => void;
};
export const Replace: FC<ReplaceProps> = (props) => {
  const [src, setSrc] = useState(props.src);
  const [target, setTarget] = useState(props.target);

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        type="text"
        value={src}
        variant="standard"
        label="Replace"
        onChange={(e) => {
          setSrc(e.target.value);
          props.onChange({
            src: e.target.value,
            target,
          });
        }}
      />
      <TextField
        type="text"
        className="border"
        label="With"
        value={target}
        variant="standard"
        onChange={(e) => {
          setTarget(e.target.value);
          props.onChange({
            target: e.target.value,
            src,
          });
        }}
      />
    </Stack>
  );
};
