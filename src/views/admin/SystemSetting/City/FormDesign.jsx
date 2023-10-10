import React from 'react';
import {  FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';
import { Col, Row, Form } from 'react-bootstrap';

export default function FormDesign(props) {

    const { handleSubmit, handleChange, values, errors, countries, states } = props;

    return (
        <>
            <Form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={3}>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="role">Country</InputLabel>
                            <Select
                                labelId="Country"
                                id="Country"
                                label="Country Name"
                                name="country_id"
                                value={values.country_id}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {countries && countries.map((country, i) =>
                                    <MenuItem key={i} value={country.id}>{country.country_name}</MenuItem>
                                )}
                            </Select>
                            {errors.country_id && <small className="text-danger">{errors.country_id}</small>}
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={3}>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="role">State</InputLabel>
                            <Select
                                labelId="State"
                                id="State"
                                label="State Name"
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
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={3}>
                        <TextField
                            id="City"
                            label="City Name"
                            variant="outlined"
                            size="small"
                            name="city_name"
                            value={values.city_name}
                            onChange={handleChange}
                        />
                        {errors.city_name && <small className="text-danger">{errors.city_name}</small>}
                    </Form.Group>
                    <Col xs={12} className="mt-3">
                        <Button type="submit" variant="contained" size="small" color="primary" className="text-white">
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
