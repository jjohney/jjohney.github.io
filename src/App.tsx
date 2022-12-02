import "./App.css";

import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  CssBaseline,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";

import { Replace } from "./components/Replace";

const isLast = (index: number, input: any[]) => index === input.length - 1;
const getLast = (input: any[]) => input[input.length - 1];

export type Condition = {
  src: string;
  target: string;
};
function App() {
  const [input, setInput] = useState<string[]>(['']);
  const [output, setOutput] = useState('');
  const [conditions, setConditions] = useState<Condition[]>([
    { src: '', target: '' },
  ]);
  const addCondition = () => {
    setConditions((prev) => [...prev, { src: '', target: '' }]);
  };
  const removeCondition = (index: number) => {
    setConditions((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  };

  const start = () => {
    let result = input[input.length - 1];
    console.log(result, conditions);
    conditions
      .filter(({ src }) => Boolean(src))
      .forEach(({ src, target }) => {
        result = result.replace(new RegExp(src, 'ig'), target);
        console.log(result);
      });
    setOutput(result);
  };
  const addDoubleQuote = () => {
    const result = input[input.length - 1]
      .split(/\r|\n/)
      .map((item) => `"${item}"`)
      .join('\r\n');

    setOutput(result);
  };

  const onConditionChange = (condition: Condition, index: number) => {
    const newConditions = conditions.slice();
    newConditions[index] = condition;
    setConditions(newConditions);
  };

  const removeSpace = () => {
    const result = input[input.length - 1]
      .split(/[\r\n]+/)
      .join(',')
      .replace(/\s+/g, '');
    setOutput(result);
  };

  const lowerCase = () => {
    const result = input[input.length - 1].toLowerCase();
    setOutput(result);
  };

  const addInput = () => {
    setInput((prev) => [...prev, output]);
  };

  const removeInput = (index: number) => {
    const newInput = input.slice().splice(index, 1);
    setInput(newInput);
  };

  const updateInput = (value: string, index: number) => {
    input[index] = value;
    setInput([...input]);
  };
  return (
    <>
      <CssBaseline />
      <Container>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              String handler
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Stack spacing={2}>
          <Stack spacing={2}>
            {input.map((_input, index) => {
              const label = index === 0 ? 'Input your string' : null;
              return (
                <Stack key={index} spacing={1}>
                  <TextField
                    label={label}
                    className="w-full"
                    disabled={input.length - 1 !== index}
                    multiline
                    rows={10}
                    value={_input}
                    onChange={(e) => {
                      updateInput(e.target.value, index);
                    }}
                  />
                  {index === input.length - 1 && index !== 0 ? (
                    <Button
                      variant="contained"
                      color="warning"
                      className="self-end"
                      onClick={(e) => removeInput(index)}
                    >
                      remove
                    </Button>
                  ) : null}
                </Stack>
              );
            })}
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={addDoubleQuote}>
              double quote
            </Button>
            <Button variant="contained" onClick={removeSpace}>
              remove space
            </Button>
            <Button
              variant="contained"
              className="border py-0.5 px-3 rounded bg-rose-500 text-white"
              onClick={lowerCase}
            >
              lowercase
            </Button>
          </Stack>

          <Stack spacing={2}>
            <Button
              variant="contained"
              onClick={addCondition}
              className="self-start"
            >
              add condition
            </Button>
            {conditions.map(({ src, target }, index) => (
              <div key={index} className="flex">
                <Replace
                  src={src}
                  target={target}
                  onChange={(condition: Condition) => {
                    onConditionChange(condition, index);
                  }}
                />
                <Button
                  size="small"
                  variant="contained"
                  color="warning"
                  onClick={(e) => removeCondition(index)}
                >
                  remove
                </Button>
              </div>
            ))}
          </Stack>

          <div>
            <Button onClick={start}>start</Button>
            <Button onClick={addInput}>continue</Button>
          </div>

          <Stack>
            <TextField
              label="Result"
              disabled
              multiline
              value={output}
              rows={10}
            />
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default App;
