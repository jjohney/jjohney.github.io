import "./App.css";

import { useState } from "react";
import removeAccents from "remove-accents";

import { CopyAll } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Alert,
  AppBar,
  Button,
  CssBaseline,
  Divider,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";

import { Condition, Conditions } from "./components/Conditions";
import { getLast } from "./utils/array";

function App() {
  const originInput = localStorage.getItem('originInput') || '';
  const [input, setInput] = useState<string[]>([originInput]);
  const [output, setOutput] = useState('');
  const [conditions, setConditions] = useState<Condition[]>([
    { src: '', target: '' },
  ]);

  const onInputChange = (e: any, index: number) => {
    updateInput(e.target.value, index);
    if (index === 0) {
      localStorage.setItem('originInput', e.target.value);
    }
  };

  const start = () => {
    let result = getLast(input);
    conditions
      .filter(({ src }) => Boolean(src))
      .forEach(({ src, target }) => {
        const withSlash = src
          .split('')
          .map((s) => `\\${s}`)
          .join('');
        const reg = new RegExp(withSlash, 'ig');
        console.log(withSlash);
        console.log(reg);
        result = result.replace(reg, target);
      });
    setOutput(result);
  };
  const addDoubleQuote = () => {
    const result = getLast(input)
      .split(/\r|\n/)
      .map((item) => `"${item}"`)
      .join('\r\n');

    setOutput(result);
  };

  const removeSpace = () => {
    const result = getLast(input).replace(/\s+/g, '');
    setOutput(result);
  };

  const lowerCase = () => {
    const result = getLast(input).toLowerCase();
    setOutput(result);
  };

  const joinWithComma = () => {
    const result = getLast(input)
      .split(/[\r\n]+/)
      .join(',');
    setOutput(result);
  };

  const removeNonEnglishChars = () => {
    const result = removeAccents(getLast(input));
    setOutput(result);
  };
  const addInput = () => {
    setInput((prev) => [...prev, output]);
  };

  const removeInput = (index: number) => {
    const newInput = input.slice();
    newInput.splice(index, 1);
    setInput(newInput);
  };

  const updateInput = (value: string, index: number) => {
    input[index] = value;
    setInput([...input]);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <>
      <CssBaseline />

      <Container>
        <AppBar position="absolute">
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
          </Toolbar>
        </AppBar>
        <Alert className="mt-8">
          This is a step by step tool for replacing characters in your input
          string. Every time you modify the input, the result will show in the
          bottom text input. If you wanna go on replacing from the result, click
          the Continue from result button, and make further replacements.
        </Alert>
        <Stack spacing={2} className="mt-8">
          <Stack spacing={2}>
            {input.map((_input, index) => {
              const label = index === 0 ? 'Input your string' : _input.length;
              return (
                <Stack key={index} spacing={1}>
                  <TextField
                    label={label}
                    className="w-full"
                    disabled={input.length - 1 !== index}
                    multiline
                    rows={10}
                    value={_input}
                    onChange={(e) => onInputChange(e, index)}
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
            <Button variant="contained" onClick={removeNonEnglishChars}>
              remove accents
            </Button>
            <Button variant="contained" onClick={addDoubleQuote}>
              double quote
            </Button>
            <Button variant="contained" onClick={joinWithComma}>
              join with comma
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

          <Divider />
          {/* Conditions */}
          <Conditions
            conditions={conditions}
            onConditionsChange={setConditions}
          />
          <Divider />
          <Stack direction="row" justifyContent={'space-between'}>
            <Button variant="contained" color="success" onClick={start}>
              start
            </Button>
            <Button variant="contained" color="info" onClick={addInput}>
              continue from result
            </Button>
          </Stack>

          <Stack spacing={2}>
            <TextField
              label="Result"
              disabled
              multiline
              value={output}
              rows={10}
            />
            <Button
              variant="outlined"
              color="success"
              onClick={copyResult}
              startIcon={<CopyAll />}
            >
              copy result
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default App;
