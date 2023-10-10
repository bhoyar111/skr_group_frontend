import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useParams } from "react-router-dom";

import { AuthApi } from '../../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../../useForm';
import validate from '../../../../validate/validateFarmerCropGrown';

import PageHeader from '../../../../containers/PageHeader';

import CropGrownFrom from './CropGrownFrom';

export default function CropGrown(props) {

    const { id } = useParams();

    const [subCrops, setSubCrops] = useState([]);

    const getEditData = async () => {
        try {
            const getResponse = await AuthApi.get(`/admin/farmer-get/${id}`);
            const { status, data } = getResponse;
            if( status === 200 && data.farmer !== undefined ){
                const { farmer } = data;
                for (let [key] of Object.entries(formInputObj)) {
                  formInputObj[key] = farmer[key];
                }
                setValues({ ...formInputObj });

                if (data.sub_crops !== undefined ) setSubCrops(data.sub_crops);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const submit = async () => {
        try {
            const editResponse = await AuthApi.put(`/admin/farmer-crop-grown-update/${id}`, values);
            const { status, data } = editResponse;
            if( status === 201 && data.farmer !== undefined ){
                toast.success(`Crop Grown Save successfully`);
                props.history.push("/farmers");
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
      farmercropgrowns  : []
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
                            title="Crop Grown"
                            backlink="farmers"
                        />
                    </CCardHeader>
                    <CCardBody>
                        <CropGrownFrom
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setValues={setValues}
                            values={values}
                            errors={errors}
                            subCrops={subCrops}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
