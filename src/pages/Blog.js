import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import { CircularProgress, TextField, Typography, Button, Grid, Slider, Box } from '@mui/material';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import SelectField from './SelectField';

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const PrettoSlider = styled(Slider)({
  color: '#4886db',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#4886db',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

const styles = makeStyles((theme) => ({
  gridContainer: {
    margin: '0.5rem 0',
    width: '100%',
  },
  h2: {
    marginLeft: '0 !imporant',
  },
  textfield: {
    width: '100%',
    marginBottom: 4,

    '& div': {
      maxWidth: '100%',
    },
  },
  root: {
    margin: 4,
    '&$error': {
      color: 'rgba(180, 60, 0, 0.87)',
    },
  },
  error: {
    '&.MuiFormHelperText-root.Mui-error': {
      color: 'rgba(180, 60, 0, 0.87)',
    },
  },
  button: {
    textTransform: 'none',
    // fontFamily: font.heading,
    margin: theme.spacing(1.5),
  },
  initialHelperText: {
    color: 'rgba(0, 0, 0, 0.54)',
    margin: 0,
    fontSize: '0.75rem',
    marginTop: 3,
    textAlign: 'left',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  numberInput: {
    width: '42px',
  },
}));

export default function Blog() {
  const [value, setValue] = React.useState('Controlled');
  const classes = styles();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [makeACall, setMakeACall] = useState(false);

  const fetchRequest = useCallback(
    (promptText, maxChart) => {
      (async () => {
        try {
          setIsLoading(true);
          const response = await openai.createCompletion({
            model: 'text-davinci-002',
            prompt: promptText,
            temperature: 0.05,
            max_tokens: maxChart,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
          setPosts(response);
        } catch (error) {
          console.log('error coming from api');
        } finally {
          setIsLoading(false);
        }
      })();
    },
    [makeACall]
  );

  const [values, setValues] = useState({
    prompt: 'Create an essay about',
    result:
      'To get a result Please write a promp, Example Create an outline for an essay about Nikola Tesla and his contributions to technology:',
    maxChart: 50,
  });

  const setChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <div>
      <Typography variant="h2" className={classes.h2}>
        Open AI
      </Typography>
      <Typography variant="body1">
        Generate an outline for a research topic. Create a prompt to get the essay outline Example : Create an outline
        for an essay about Nikola Tesla and his contributions to technology: Example : Create an essay about How to
        write a smart contract:
      </Typography>
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid item xs>
          <TextField
            id="prompt"
            className={classes.textfield}
            // error={errors.name.length > 0}
            // helperText={errors.name || ''}
            label="Prompt"
            variant="filled"
            value={values.prompt}
            onChange={setChange('prompt')}
            onBlur={setChange}
          />
          <span className={classes.initialHelperText}>
            Example : Create an essay about How to write a smart contract:
          </span>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid item xs>
          <Box sx={{ width: 320 }}>
            <Typography gutterBottom>Maximum Length</Typography>
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={60}
              max={900}
              onChange={setChange('maxChart')}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid item xs>
          {isLoading ? (
            <CircularProgress disableShrink />
          ) : (
            <TextField
              multiline
              id="result"
              className={classes.textfield}
              label="Result"
              // error={errors.description.length > 0}
              // helperText={errors.description || ''}
              // onChange={onChange}
              minRows="20"
              variant="filled"
              value={posts.data ? posts.data.choices[0].text : values.result}
            />
          )}
        </Grid>
      </Grid>
      <Grid container className={classes.gridContainer} justifyContent="flex-end" spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              fetchRequest(values.prompt, values.maxChart);
            }}
            disabled={isLoading || values.prompt.length < 30}
          >
            Generate
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
