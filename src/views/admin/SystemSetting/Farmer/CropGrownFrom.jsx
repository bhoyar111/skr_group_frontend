import React from 'react';
import {  Button } from '@material-ui/core';
import { Col, Row, Form } from 'react-bootstrap';
import CGCheckBoxForm from './CGCheckBoxForm';

export default function CropGrownFrom(props) {

  const { handleSubmit, values, setValues, subCrops} = props;

  return (
    <>
        <Form onSubmit={handleSubmit} noValidate>
            <Row>
                <Form.Group as={Col} xs={12} md={12} lg={12} xl={6}>
                    <CGCheckBoxForm
                        values={values}
                        setValues={setValues}
                        subCrops={subCrops}
                    />
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
