import {
  TextField,
  InputLabel,
  Container,
  TextareaAutosize,
  Autocomplete,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Slider,
  TableRow,
  Grid,
  FormGroup,
  Button,
  Typography,
} from "@mui/material";
import { Country, State, City }  from 'country-state-city';

import axios from "axios";
import React, { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate=useNavigate()
  let flagStatus=false
    const [flag,setFlag]=useState(true)
  const [dataArray, setDataArray] = useState(
    JSON.parse(localStorage.getItem("dataArray"))
      ? JSON.parse(localStorage.getItem("dataArray"))
      : []
  );
  const state = useState(State.getStatesOfCountry("IN"
));
  const [district, setDistrict] = useState();
  const [errors, setErrors] = useState({
    email: "",
    mobileNo: "",
    name: "",
  });
  const [stateCode, setStateCode] = useState();
  const [data, setData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    address: "",
    state: "",
    district: "",
    city: "",
    DOB: null,
    gender: "",
    hobbies: [],
    communicationRating: 0,
  });
  console.log()
  const districts=City.getCitiesOfState("IN", stateCode)

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://cdn-api.co-vin.in/api/v2/admin/location/states
  //   `
  //     )
  //     .then((res) => {
  //       const persons = res.data;
  //       setState(persons.states);
  //     });
  // }, []);

  useEffect(()=>{
      if(!flag){
      validateEmail(data.email,data.name)}
  },[data.name,data.email,data.mobileNo])

 function findStateCode(stateName){
  state[0].map(prev=>{
    console.log(data.state)
    if(prev.name==stateName){
      setStateCode(prev.isoCode)
    }
  })
 }

  console.log(stateCode)
  //   useEffect(()=>{
  //       if(state || data.state){
  //           deriverStateId()
  //           axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}
  //           `)
  //           .then(res => {
  //             const persons = res.data;
  //             setDistrict(persons.districts)
  //           })
  //       }
  //   })

  const handleDateChange = (newValue) => {
    console.log(newValue);
    var date = new Date(newValue);
    var finaldate =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    console.log(finaldate);
    setData({ ...data, DOB: finaldate });
  };

  function deriverStateId() {
    console.log(data.state);
    state.map((prev) => {
      console.log(prev.state_name);
      if (prev.state_name == data.state) {
      }
    });
  }

 

  function validateEmail() {
    let result = true;
    let sampleError = {...errors};
    if (!data.name) {
console.log("hgfevhy")
      sampleError.name = "Name is Required";
      flagStatus=false

    }else{
      flagStatus=true
        console.log("whjbfuwb")
        sampleError.name="" 
    }
    console.log(data.mobileNo)
    if (!data.mobileNo ) {
        if(data.mobileNo.toString().length<10 || data.mobileNo.toString().length > 10){
          flagStatus=false

        console.log(data.mobileNo.toString().length)
              sampleError.mobileNo = "Please provide Valid Mobile No";}
              else{
                flagStatus=true

                sampleError.mobileNo="" 
            }
        
            }
            else{
                if(data.mobileNo.toString().length<10 || data.mobileNo.toString().length > 10){
                  flagStatus=false

                    console.log(data.mobileNo.toString().length)
                          sampleError.mobileNo = "Please provide Valid Mobile No";}
                          else{
                            flagStatus=true

                            sampleError.mobileNo="" 
                        }
            }
           
    if (!data.email) {
      flagStatus=false

      sampleError.email = "Email is Required";
      result = false;
    } else {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      result = re.test(String(data.email).toLowerCase());
      if (!result) sampleError.email = "Invalid Email address";
      if(!result )       flagStatus=false

    }
    if(result){
      flagStatus=true

        sampleError.email = ""
    }
    console.log(sampleError);
    setErrors(sampleError);
  }

  function handleCheckBoxCheck(event) {
    console.log(event.target.id);
    console.log(event.target.checked);
    if (event.target.checked == true) {
      let array = [...data.hobbies];
      array.push(event.target.value);
      setData({ ...data, hobbies: array });
    } else {
      console.log("whfbuhb");
      let array = [...data.hobbies];
      let array1 = array.splice(event.target.id, event.target.id + 1);
      setData({ ...data, hobbies: array1 });
    }
  }

  console.log(state);
  const handleChange = (event) => {

    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value,
    });
    if(!flag){validateEmail()}
  };

  //   if( !state ){
  //       return(
  //           <h1>Loading</h1>
  //       )
  //   }

  return (
    <Container
      maxWidth="md"
      spacing={3}
      sx={{
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" component="div" gutterBottom>
        Registration Form
      </Typography>
      <TextField
        required
        error={errors.name ? true : false}

        sx={{ paddingBottom: "10px" }}
        id="outlined-basic"
        label="Name"
        variant="outlined"
        fullWidth
        name="name"
        helperText={errors.name}

        value={data.name}
        onChange={handleChange}
      />
      <TextField
        sx={{ paddingBottom: "10px" }}
        fullWidth
        id="outlined-basic"
        error={errors.email ? true : false}
        label="email"
        variant="outlined"
        name="email"
        helperText={errors.email}
        value={data.email}
        onChange={handleChange}
      />
      <Grid>
        <TextField
          fullWidth
          sx={{ paddingBottom: "10px" }}
          value={data.password}
          type="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          name="password"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          py={10}
          id="outlined-basic"
          type="number"
          name="mobileNo"
          helperText={errors.mobileNo}

          value={data.mobileNo}
          
          error={errors.mobileNo ? true : false}
          onChange={handleChange}
          //   sx={{ width: "300px" }}
          label="Mobile No"
          variant="outlined"
        />
      </Grid>
      <FormLabel>Address</FormLabel>
      <TextareaAutosize
        fullWidth
        style={{ width: 850, paddingBottom: "10px" }}
        minRows={3}

        name="address"
        value={data.address}
        onChange={handleChange}
        aria-label="empty textarea"
        placeholder="Address"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          paddingTop: "10px",
        }}
      >
        <Autocomplete
          disablePortal
          sx={{ width: "450px", paddingTop: "10" }}
          name="state"
          inputValue={data.state}

          onChange={(event, value) => {
            findStateCode(value)
            setData({ ...data, state: value });
          }} // prints the selected value
          options={
             state[0].map((prev) => prev.name )
          }
          renderInput={(params) => <TextField {...params} label="State" />}
        />


      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          paddingTop: "10px",
        }}
      >
        <Autocomplete
          disablePortal
          inputValue={data.city}
          id="combo-box-demo1"
          name="city"
          sx={{ paddingRight: "10px", width: "450px" }}
          onChange={(event, value) => setData({ ...data, city: value })}
          options={stateCode && districts.map(prev=>prev.name)}
          renderInput={(params) => <TextField {...params} label="City" />}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={data.DOB}
            sx={{ paddingRight: "10px", width: "450px" }}
            format="DD-MM-YYYY"
            views={["year", "month", "day"]}
            disableFuture
            name="DOB"
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="male"
          name="radio-buttons-group"
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <FormControlLabel
            name="gender"
            onChange={handleChange}
            value="female"
            control={<Radio />}
            label="Female"
          />
          <FormControlLabel
            name="gender"
            onChange={handleChange}
            value="male"
            control={<Radio />}
            label="Male"
          />
          <FormControlLabel
            name="gender"
            onChange={handleChange}
            value="other"
            control={<Radio />}
            label="Other"
          />
        </RadioGroup>
      </FormControl>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
          <InputLabel>Hobbies</InputLabel>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckBoxCheck}
                value="reading"
                name="reading"
                id={0}
              />
            }
            label="Reading"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="playing"
                onChange={handleCheckBoxCheck}
                name="playing"
                id={1}
              />
            }
            label="Playing"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="singing"
                onChange={handleCheckBoxCheck}
                name="singing"
                id={2}
              />
            }
            label="Singing"
          />
        </FormGroup>
      </Box>

      <box sx={{ display: "flex", flexDirection: "row" }}>
        <FormLabel> Rate your communication skills</FormLabel>
        <Slider
          aria-label="Temperature"
          defaultValue={30}
          //   getAriaValueText="ejdnw"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={5}
          name="communicationRating"
          value={data.communicationRating}
          onChange={handleChange}
        />
      </box>

      <Button
        variant="contained"
        onClick={() => {
          let array = [...dataArray];
          array.push(data);
          validateEmail();
          setFlag(false)

          if(flagStatus){
          localStorage.setItem("dataArray", JSON.stringify(array));
          setDataArray(array);
          
          navigate(`/employees`);}

        }}
        color="primary"
      >
        Submit
      </Button>
    </Container>
  );
}

export default Form;
