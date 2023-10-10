import React from 'react';
import {  FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';
import { Col, Row, Form } from 'react-bootstrap';

export default function FormDesign(props) {

    const { handleSubmit, handleChange, values, errors, countries } = props;

    return (
        <>
            <Form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={3}>
                        <TextField
                            id="State"
                            label="State Name"
                            variant="outlined"
                            size="small"
                            name="state_name"
                            value={values.state_name}
                            onChange={handleChange}
                        />
                        {errors.state_name && <small className="text-danger">{errors.state_name}</small>}
                    </Form.Group>
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
