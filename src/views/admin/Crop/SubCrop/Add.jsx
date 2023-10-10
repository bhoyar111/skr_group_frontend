import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

import { AuthApi } from '../../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../../useForm';
import validate from '../../../../validate/validateSubCrop';

import PageHeader from '../../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Add(props) {

    const [crops, setCrops] = useState([]);

    const getDs = async () => {
        try {
            const listResponse = await AuthApi.get("/admin/subcrops-ds");
            const { status, data } = listResponse;
            if( status === 200 && data.crops !== undefined ){
                setCrops(data.crops);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const submit = async () => {
        try {
            const formData = new FormData();
            for ( let [key] of Object.entries(values) ) {
                formData.append(key, values[key]);
            }
            const saveResponse = await AuthApi.post("/admin/subcrop-add", formData);
            const { status, data } = saveResponse;
            if( status === 201 && data.sub_crop !== undefined ){
                toast.success(`Crops added successfully`);
                props.history.push('/sub_crops');
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
            // setErrors
            const { response } = e;
            if(response !== undefined && Object.keys(response.data).length && response.data.error !== undefined ){
                setErrors(response.data.error); // if error from server side
            }
        }
    }

    const formInputObj = {
        crop_id       : "",
        sub_crop_name : "",
        sub_crop_img  : ""
    };

    const { handleChange, handleSubmit, values, errors, setErrors, setValues } = useForm(
        submit,
        validate,
        formInputObj
    )

    useEffect(() => {
        getDs();
    }, [])

    return (
        <CRow>
            <CCol xl={12}>
                <CCard>
                    <CCardHeader>
                        <PageHeader
                            title="Crop Add"
                            backlink="sub_crops"
                        />
                    </CCardHeader>
                    <CCardBody>
                        <FormDesign
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setValues={setValues}
                            values={values}
                            errors={errors}
                            crops={crops}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
