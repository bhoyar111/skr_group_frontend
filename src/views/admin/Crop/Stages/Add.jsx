import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

import { AuthApi } from '../../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../../useForm';
import validate from '../../../../validate/validateStage';

import PageHeader from '../../../../containers/PageHeader';
import { getDecryptId } from '../../../../utils/secure';

import FormDesign from './FormDesign';

export default function Add(props) {

  const { sub_crop_id } = useParams();

  const decSubCropId = getDecryptId(sub_crop_id);

  const [subCrops, setSubCrops] = useState([]);

    const getDs = async () => {
        try {
            const listResponse = await AuthApi.get("/admin/stages-ds");
            const { status, data } = listResponse;
            if( status === 200 ){
                if (data.sub_crops !== undefined ) setSubCrops(data.sub_crops);
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

            const saveResponse = await AuthApi.post("/admin/stage-add", formData);
            const { status, data } = saveResponse;
            if( status === 201 && data.stage !== undefined ){
                toast.success(`Stage added successfully`);
                props.history.push(`/stages/${sub_crop_id}`);
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
        stage_name    : "",
        sub_crop_id   : decSubCropId,
        doc_url       : "",
        have_sub_stage: "",
        description   : ""
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
                            title="Stage Add"
                            backlink={`stages/${sub_crop_id}`}
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
