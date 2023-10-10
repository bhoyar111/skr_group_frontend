import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

import { AuthApi } from '../../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../../useForm';
import validate from '../../../../validate/validateStageInfo';

import PageHeader from '../../../../containers/PageHeader';
import { getDecryptId } from '../../../../utils/secure';

import FormDesign from './FormDesign';

export default function Add(props) {

    const { sub_crop_id, stage_id } = useParams();

    const decIdSubcrop = getDecryptId(sub_crop_id);
    const decIdStage = getDecryptId(stage_id);

    const [subCrops, setSubCrops] = useState([]);
    const [stages, setStages] = useState([]);

    const getDs = async () => {
        try {
            const listResponse = await AuthApi.get("/admin/stage-informations-ds");
            const { status, data } = listResponse;
            if( status === 200 ){
                if (data.sub_crops !== undefined ) setSubCrops(data.sub_crops);
                if (data.stages !== undefined ) setStages(data.stages);
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
            const saveResponse = await AuthApi.post("/admin/stage-information-add", formData);
            const { status, data } = saveResponse;
            if( status === 201 && data.stage_information !== undefined ){
                toast.success(`Stage Information added successfully`);
                props.history.push(`/stageinfos/${sub_crop_id}/${stage_id}`);
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
        name        : "",
        sub_crop_id : decIdSubcrop,
        stage_id    : decIdStage,
        description : "",
        doc_url     : ""
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
                            title="Sub Stage Add"
                            backlink={`stageInfos/${sub_crop_id}/${stage_id}`}
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
                            stages={stages}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
