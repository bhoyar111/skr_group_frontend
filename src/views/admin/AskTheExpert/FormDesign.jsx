import React, { useState, useEffect } from 'react';
import { Col, Row, Form } from 'react-bootstrap';

import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';

export default function FormDesign(props) {

    const { farmers, handleSubmit, handleChange, values, setValues, errors } = props;

    const [askDates, setAskDate] = useState(new Date(values.ask_date));

    const handleDateChange = (date, name) => {
      setValues({
          ...values,
          [name]: moment(new Date(date)).format("YYYY-MM-DD")
      });
    }

    const [displayUrl, setDisplayUrl] = useState('');

    const handleImgChange = (event) => {
        const { files, name } = event.target;
        let newUrl = ''
        let newSelectedFile = '';
        if (files && files.length) {
            const selectedFile = files[0];
            newUrl = URL.createObjectURL(selectedFile);
            newSelectedFile = selectedFile;
        }
        setDisplayUrl(newUrl);
        setValues({
            ...values,
            [name]: newSelectedFile
        });
    }

    useEffect(() => {
        setAskDate(new Date(values.ask_date));
    }, [values.ask_date])

    return (
        <>
            <Form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Subject"
                            label="Subject"
                            variant="outlined"
                            size="small"
                            name="subject"
                            value={values.subject}
                            onChange={handleChange}
                        />
                        {errors.subject && <small className="text-danger">{errors.subject}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="role">Farmer</InputLabel>
                            <Select
                                labelId="Farmer"
                                id="Farmer"
                                label="Farmer"
                                name="farmer_id"
                                value={values.farmer_id}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {farmers && farmers.map((farmer, i) =>
                                    <MenuItem key={i} value={farmer.id}>{farmer.full_name}</MenuItem>
                                )}
                            </Select>
                            {errors.farmer_id && <small className="text-danger">{errors.farmer_id}</small>}
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                                id="AskDate"
                                label="Ask Date"
                                format="DD/MM/yyyy"
                                inputVariant="outlined"
                                size="small"
                                value={askDates}
                                onChange={date => handleDateChange(date, 'ask_date', setAskDate)}
                            />
                            {errors.ask_date && <small className="text-danger">{errors.ask_date}</small>}
                        </MuiPickersUtilsProvider>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={8}>
                        <TextField
                            id="Description"
                            label="Description"
                            variant="outlined"
                            size="small"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <div className="custom-file upload float-left">
                            <input
                                type="file"
                                className="custom-file-input shadow-none"
                                id="inputGroupFile02"
                                name="doc_url"
                                onChange={handleImgChange}
                            />
                            <label
                                className="custom-file-label mb-0 shadow-none"
                                htmlFor="inputGroupFile02"
                                aria-describedby="inputGroupFileAddon02"
                            >
                              Ask Expert Image
                            </label>
                        </div>
                        <div className="custom-file upload text-right">
                            {displayUrl &&
                                <a href={displayUrl} target="_blank">View</a>
                            }
                        </div>
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
