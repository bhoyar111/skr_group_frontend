import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useParams } from "react-router-dom";

import { AuthApi } from '../../../utils/api';
import { toast } from 'react-toastify';
import moment from 'moment';

import useForm from '../../../useForm';
import validate from '../../../validate/validateVideo';

import PageHeader from '../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Edit(props) {

    const { id } = useParams();

    const [subCrops, setSubCrops] = useState([]);

    const getEditData = async () => {
        try {
            const getResponse = await AuthApi.get(`/admin/video-get/${id}`);
            const { status, data } = getResponse;
            if( status === 200 && data.video !== undefined ){
                const { video } = data;

                const dateInputKey = ['v_date'];

                for (let [key] of Object.entries(formInputObj)) {
                  if( dateInputKey.includes(key) ){
                    formInputObj[key] = moment(new Date(video[key])).format("YYYY-MM-DD");
                }else{
                    formInputObj[key] = video[key];
                }
              }

                setValues({ ...formInputObj });

                if(data.sub_crops !== undefined ) setSubCrops(data.sub_crops);

            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const submit = async () => {
        try {
            const editResponse = await AuthApi.put(`/admin/video-update/${id}`, values);
            const { status, data } = editResponse;
            if( status === 201 && data.video !== undefined ){
                toast.success(`Video edit successfully`);
                props.history.push("/videos");
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
                            title="Edit"
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
