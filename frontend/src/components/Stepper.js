import React, { Fragment } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
// import CloudUploadRoundedIcon from '@material-ui/icons/CloudUploadRounded';
import axios from 'axios'
const useStyles = makeStyles((theme)=>({
    root: {
        width: '100%'
    },
    backButton: {
        marginRight: theme.spacing(1),
      },
      instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}))

function getSteps() {
    return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
  }
  
//   function getStepContent(stepIndex) {
//     switch (stepIndex) {
//       case 0:
//         return 'Select campaign settings...';
//       case 1:
//         return 'What is an ad group anyways?';
//       case 2:
//         return 'This is the bit I really care about!';
//       default:
//         return 'Unknown stepIndex';
//     }
//   }

export default function HorizontalLabelPositionBelowStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [file, setFile] = React.useState('')
    const [filename, setFilename] = React.useState('Choose File')
    const [uploadFile, setUploadFile] = React.useState()

    const steps = getSteps();
  
    const isStepOptional = (step) => {
      return step === 0;
    };
    const isStepOptional1 = (step) => {
      return step === 1;
    };
    const isStepOptional2 = (step) => {
      return step === 2;
    };

    const onChange = (e) =>{
      setFile(e.target.files[0])
      setFilename(e.target.files[0].name)
    }
    const onSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData();
      formData.append('json',file)
      try{
        const res = await axios.post('http://127.0.0.1:5000/single/jsonToCSV/file', formData, {
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(res)
        const {filename, filePath} = res.data
        
        setUploadFile({filename, filePath})
      }catch(err){
        if(err.res.code === 500){
          console.log('There was a problem with the server')
        }else{
          console.log(err.res.data.msg)
        }
      }
    }
    // const isStepFailed = (step) => {
    //   return step === 1;
    // };

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
};

return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) =>{
          //const stepProps = {}
          const labelProps = {}
          if(isStepOptional(index)){
            labelProps.optional = (
              <Fragment>
                <form onSubmit={onSubmit}>
                  <div className='custom-file mb-4'>
                    <input type='file' className='custom-file-input' id='customFile' onChange={onChange}/>
                    <label className='custom-file-label' htmlFor='customFile'>
                      {filename}
                    </label>
                  </div>
                  <input type="submit" value='Upload' className='btn'/>
                </form>
              </Fragment>
            )
          }
          return (
            <Step key={label}> 
              {/* {...stepProps} */}
              <StepLabel {...labelProps}> {label} </StepLabel>
            </Step>
          )
        })} 
        {/* {steps.map((label) => (
          <Step key={label}>
            <StepLabel> <Button variant='contained'><CloudUploadRoundedIcon/> &nbsp;&nbsp; Add Files</Button> </StepLabel>
          </Step>
        ))} */}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}