import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';
import useForm from '../../../useForm';
import { Col, Row, Form } from 'react-bootstrap';
import validate from '../../../validate/validateFilter';

export default function Filter(props) {

    const { getFilterData, states, cities } = props;

    const [allCities, setCities] = useState([]);

    const filterFormObj = {
      dealer_name    : "",
      mobile_no      : "",
      state_id       : "",
      district_id    : "",
      taluka         : "",
      pin_code       : "",
    };

    const resetFilterForm = () => {
        for (let [key] of Object.entries(filterFormObj)) {
            filterFormObj[key] = "";
        }
        setValues({ ...filterFormObj });
        getFilterData({}, 1);
    }

    const submit = async () => {
        let sendValues = {};
        for (let [key] of Object.entries(values)) {
            if (values[key] !== '') {
                sendValues[key] = values[key];
            }
        }
        getFilterData(sendValues, 1);
    }

    const { handleChange, handleSubmit, values, setValues } = useForm(
        submit,
        validate,
        filterFormObj
    );

  useEffect(() => {
      let stateId = parseInt(values.state_id);
      if (values.stateId !== 0) {
          let stateCity = cities.filter(city => city.state_id == stateId);
          setCities(stateCity);
      }
  }, [values.state_id]);

    return (
        <>
            <Form onSubmit={handleSubmit} noValidate>
                <Row className="m-0">
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="DealerName"
                            label="Dealer Name"
                            variant="outlined"
                            size="small"
                            name="dealer_name"
                            value={values.dealer_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="DealerMobile"
                            label="Dealer Mobile"
                            variant="outlined"
                            size="small"
                            name="mobile_no"
                            value={values.mobile_no}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="role">Dealer State</InputLabel>
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
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="role">Dealer City</InputLabel>
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
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Taluka"
                            label="Dealer Taluka "
                            variant="outlined"
                            size="small"
                            name="taluka"
                            value={values.taluka}
                            onChange={handleChange}
                        />
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
                    </Form.Group>

                    <Col xs={12} md={12} className="filter-btn-parent text-right">
                        <Button type="submit" variant="contained" size="small" color="primary" className="mr-3">
                            Search
                        </Button>
                        <Button onClick={resetFilterForm} variant="contained" size="small" color="primary">
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
