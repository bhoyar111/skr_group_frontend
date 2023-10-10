import React,{ useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Col, Row, Form } from 'react-bootstrap';

// import { SERVER_BASE_URL } from '../../../../utils/api';

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

  //   useEffect(() => {
  //     const documentUrl = (values.crop_img !== null && values.crop_img !== '') ? SERVER_BASE_URL+values.crop_img : '';
  //     setDisplayUrl(documentUrl);
  // },[values.crop_img]);

    return (
        <>
            <Form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Name"
                            label="Crop Type"
                            variant="outlined"
                            size="small"
                            name="crop_name"
                            value={values.crop_name}
                            onChange={handleChange}
                        />
                        {errors.crop_name && <small className="text-danger">{errors.crop_name}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <div className="custom-file upload float-left">
                            <input
                                type="file"
                                className="custom-file-input shadow-none"
                                id="inputGroupFile02"
                                name="crop_img"
                                onChange={handleImgChange}
                            />
                            <label
                                className="custom-file-label mb-0 shadow-none"
                                htmlFor="inputGroupFile02"
                                aria-describedby="inputGroupFileAddon02"
                            >
                              Crop Image
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
