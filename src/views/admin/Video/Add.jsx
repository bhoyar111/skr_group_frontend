import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

import { AuthApi } from '../../../utils/api';
import { toast } from 'react-toastify';
import moment from 'moment';

import useForm from '../../../useForm';
import validate from '../../../validate/validateVideo';

import PageHeader from '../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Add(props) {

    const [subCrops, setSubCrops] = useState([]);

    const getDs = async () => {
        try {
            const listResponse = await AuthApi.get("/admin/videos-ds");
            const { status, data } = listResponse;
            if( status === 200 ){
              if(data.sub_crops !== undefined ) setSubCrops(data.sub_crops);
          }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const submit = async () => {
        try {
            const saveResponse = await AuthApi.post("/admin/video-add", values);
            const { status, data } = saveResponse;
            if( status === 201 && data.video !== undefined ){
                toast.success(`Video added successfully`);
                props.history.push('/videos');
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
        title       : "",
        sub_crop_id : "",
        link        : "",
        v_date      : moment(new Date()).format("YYYY-MM-DD"),
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
                            title="Add"
                            backlink="videos"
                        />
                    </CCardHeader>
                    <CCardBody>
                        <FormDesign
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
