import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useParams } from "react-router-dom";

import { AuthApi } from '../../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../../useForm';
import validate from '../../../../validate/validateSubCrop';

import PageHeader from '../../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Edit(props) {

    const { id } = useParams();

    const [crops, setCrops] = useState([]);

    const getEditData = async () => {
        try {
            const getResponse = await AuthApi.get(`/admin/subcrop-get/${id}`);
            const { status, data } = getResponse;
            if( status === 200 && data.sub_crop !== undefined ){
                const { sub_crop } = data;
                for (let [key] of Object.entries(formInputObj)) {
                    formInputObj[key] = sub_crop[key];
                }
                setValues({ ...formInputObj });

                if(data.crops!== undefined) setCrops(data.crops);

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
            const editResponse = await AuthApi.put(`/admin/subcrop-update/${id}`, formData);
            const { status, data } = editResponse;
            if( status === 201 && data.sub_crop !== undefined ){
                toast.success(`Crop details edit successfully`);
                props.history.push("/sub_crops");
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
    );

    useEffect(() => {
        getEditData();
    }, []);

    return (
        <CRow>
            <CCol xl={12}>
                <CCard>
                    <CCardHeader>
                        <PageHeader
                            title="Stage Edit"
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
