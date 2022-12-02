import { FC } from "react";

import { Button, Stack } from "@mui/material";

import { Replace } from "../Replace";

export type Condition = {
  src: string;
  target: string;
};
type ConditionsProps = {
  conditions?: Condition[];
  onConditionsChange: (conditions: Condition[]) => void;
};

export const Conditions: FC<ConditionsProps> = ({
  conditions = [{ src: '', target: '' }],
  onConditionsChange = (conditions: Condition[]) => {},
}) => {
  const addCondition = () => {
    onConditionsChange([...conditions, { src: '', target: '' }]);
  };
  const removeCondition = (index: number) => {
    const newConditions = conditions.slice().splice(index, 1);
    onConditionsChange(newConditions);
  };

  const changeCondition = (condition: Condition, index: number) => {
    const newConditions = conditions.slice();
    newConditions[index] = condition;
    onConditionsChange(newConditions);
  };

  return (
    <Stack spacing={2}>
      <Button variant="contained" onClick={addCondition} className="self-start">
        add condition
      </Button>
      {conditions.map(({ src, target }, index) => (
        <div key={index} className="flex gap-x-2">
          <Replace
            src={src}
            target={target}
            onChange={(condition: Condition) => {
              changeCondition(condition, index);
            }}
          />
          <Button
            className="self-center"
            variant="contained"
            color="warning"
            onClick={() => removeCondition(index)}
          >
            remove
          </Button>
        </div>
      ))}
    </Stack>
  );
};
