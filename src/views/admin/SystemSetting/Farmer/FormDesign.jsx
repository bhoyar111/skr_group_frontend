import React, { useState, useEffect } from 'react';
import {  FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';
import { Col, Row, Form } from 'react-bootstrap';
import { Acreage, Irrigate } from '../../../../utils/constant';

export default function FormDesign(props) {

    const { handleSubmit, handleChange, values, errors, states, cities } = props;

    const [allCities, setAllCities] = useState([]);

    useEffect(() => {
      let stateId = parseInt(values.state_id);
      if (values.stateId !== 0) {
          let stateCity = cities.filter(city => city.state_id == stateId);
          setAllCities(stateCity);
      }
  }, [values.state_id]);

    return (
        <>
            <Form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="FullName"
                            label="Full Name"
                            variant="outlined"
                            size="small"
                            name="full_name"
                            value={values.full_name}
                            onChange={handleChange}
                        />
                        {errors.full_name && <small className="text-danger">{errors.full_name}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Age"
                            label="Age"
                            variant="outlined"
                            size="small"
                            name="age"
                            value={values.age}
                            onChange={handleChange}
                        />
                        {errors.age && <small className="text-danger">{errors.age}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Email"
                            label="Email"
                            variant="outlined"
                            size="small"
                            name="email_id"
                            value={values.email_id}
                            onChange={handleChange}
                        />
                        {errors.email_id && <small className="text-danger">{errors.email_id}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Password"
                            label="Password"
                            variant="outlined"
                            size="small"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Mobile"
                            label="Mobile no."
                            variant="outlined"
                            size="small"
                            name="mobile_no"
                            value={values.mobile_no}
                            onChange={handleChange}
                        />
                        {errors.mobile_no && <small className="text-danger">{errors.mobile_no}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="OTP"
                            label="OTP"
                            variant="outlined"
                            size="small"
                            name="otp"
                            value={values.otp}
                            onChange={handleChange}
                        />
                        {errors.otp && <small className="text-danger">{errors.otp}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Address"
                            label="Address"
                            variant="outlined"
                            size="small"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                        />
                        {errors.address && <small className="text-danger">{errors.address}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="role">State</InputLabel>
                            <Select
                                labelId="Dealer"
                                id="Dealer"
                                label="Dealer State"
                                name="state_id"
                                value={values.state_id}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {states && states.map((state, i) =>
                                    <MenuItem key={i} value={state.id}>{state.state_name}</MenuItem>
                                )}
                            </Select>
                            {errors.state_id && <small className="text-danger">{errors.state_id}</small>}
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="role">City</InputLabel>
                            <Select
                                labelId="DealerCity"
                                id="DealerCity"
                                label="Dealer District"
                                name="district_id"
                                value={values.district_id}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {allCities && allCities.map((city, i) =>
                                    <MenuItem key={i} value={city.id}>{city.city_name}</MenuItem>
                                )}
                            </Select>
                            {errors.district_id && <small className="text-danger">{errors.district_id}</small>}
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Taluka"
                            label="Taluka "
                            variant="outlined"
                            size="small"
                            name="taluka"
                            value={values.taluka}
                            onChange={handleChange}
                        />
                        {errors.taluka && <small className="text-danger">{errors.taluka}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="PinCode"
                            label="Pin Code "
                            variant="outlined"
                            size="small"
                            name="pin_code"
                            value={values.pin_code}
                            onChange={handleChange}
                        />
                        {errors.pin_code && <small className="text-danger">{errors.pin_code}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="dayMonth-label">Irrigate</InputLabel>
                            <Select
                                labelId="Irrigate"
                                id="Irrigate"
                                label="Irrigate"
                                name="irrigate"
                                value={values.irrigate}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {Irrigate && Irrigate.map((irri, ind) =>
                                    <MenuItem key={ind} value={irri.val}>{irri.label}</MenuItem>
                                )}
                            </Select>
                            {errors.irrigate && <small className="text-danger">{errors.irrigate}</small>}
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="dayMonth-label">Acreage</InputLabel>
                            <Select
                                labelId="Acr"
                                id="Acreage"
                                label="Acreage"
                                name="acreage"
                                value={values.acreage}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {Acreage && Acreage.map((acr, ind) =>
                                    <MenuItem key={ind} value={acr.val}>{acr.label}</MenuItem>
                                )}
                            </Select>
                            {errors.acreage && <small className="text-danger">{errors.acreage}</small>}
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="KrushiKendra"
                            label="Krushi Kendra"
                            variant="outlined"
                            size="small"
                            name="krushi_kendra_name"
                            value={values.krushi_kendra_name}
                            onChange={handleChange}
                        />
                        {errors.krushi_kendra_name && <small className="text-danger">{errors.krushi_kendra_name}</small>}
                    </Form.Group>
                    <Col xs={12} className="mt-3">
                        <Button type="submit" variant="contained" size="small" color="primary" className=" text-white">
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
