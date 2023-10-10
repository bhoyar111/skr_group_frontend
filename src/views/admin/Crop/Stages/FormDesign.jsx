import React, { useState, } from 'react';
import {  FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';
import { Col, Row, Form } from 'react-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { HaveSubStage } from '../../../../utils/constant';
import { SERVER_BASE_URL } from '../../../../utils/api';

export default function FormDesign(props) {

    const { handleSubmit, handleChange, values, setValues, errors } = props;

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

    const handleChangeCkEditor = (event, editor) => {
      const data = editor.getData();
        setValues({
          ...values,
          description: data
      });
    }

    return (
        <>
            <Form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Name"
                            label="Stage Name"
                            variant="outlined"
                            size="small"
                            name="stage_name"
                            value={values.stage_name}
                            onChange={handleChange}
                        />
                        {errors.stage_name && <small className="text-danger">{errors.stage_name}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="dayMonth-label">Have SubStage</InputLabel>
                            <Select
                                labelId="HaveSubStage"
                                id="HaveSubStage"
                                label="Have SubStage"
                                name="have_sub_stage"
                                value={values.have_sub_stage}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {HaveSubStage && HaveSubStage.map((substage, ind) =>
                                    <MenuItem key={ind} value={substage.val}>{substage.label}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <div className="custom-file upload">
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
                                Stage Image
                            </label>
                        </div>
                        <div className="custom-file upload text-right">
                            {displayUrl &&
                                <a href={displayUrl} target="_blank">View</a>
                            }
                        </div>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={12}>
                        <CKEditor
                            editor={ClassicEditor}
                            onReady={editor =>{
                            }}
                            config={
                              {
                                ckfinder:{
                                  uploadUrl:`${SERVER_BASE_URL}admin/ck-editor-stage`
                                }
                              }
                            }
                            name="description"
                            data={values.description}
                            onChange={handleChangeCkEditor}
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
