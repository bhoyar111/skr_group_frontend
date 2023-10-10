import React, { useState, useEffect } from 'react';
import { Col, Row, Form } from 'react-bootstrap';

import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';

export default function FormDesign(props) {

    const { handleSubmit, handleChange, values, setValues, errors, subCrops } = props;

    const [vDates, setVDate] = useState(new Date(values.v_date));

    const handleDateChange = (date, name) => {
      setValues({
          ...values,
          [name]: moment(new Date(date)).format("YYYY-MM-DD")
      });
  }

  useEffect(() => {
      setVDate(new Date(values.v_date));
  }, [values.v_date])

    return (
        <>
            <Form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Title"
                            label="Title"
                            variant="outlined"
                            size="small"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                        />
                        {errors.title && <small className="text-danger">{errors.title}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="role">Crops</InputLabel>
                            <Select
                                labelId="Crop"
                                id="Crop"
                                label="Crop"
                                name="sub_crop_id"
                                value={values.sub_crop_id}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {subCrops && subCrops.map((subCrop, i) =>
                                    <MenuItem key={i} value={subCrop.id}>{subCrop.sub_crop_name}</MenuItem>
                                )}
                            </Select>
                            {errors.sub_crop_id && <small className="text-danger">{errors.sub_crop_id}</small>}
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Link"
                            label="Link"
                            variant="outlined"
                            size="small"
                            name="link"
                            value={values.link}
                            onChange={handleChange}
                        />
                        {errors.link && <small className="text-danger">{errors.link}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                                id="POCDate"
                                label="Video Date"
                                format="DD/MM/yyyy"
                                inputVariant="outlined"
                                size="small"
                                value={vDates}
                                onChange={date => handleDateChange(date, 'v_date', setVDate)}
                            />
                            {errors.v_date && <small className="text-danger">{errors.v_date}</small>}
                        </MuiPickersUtilsProvider>
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
