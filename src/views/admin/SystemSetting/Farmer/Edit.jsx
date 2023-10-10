import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useParams } from "react-router-dom";

import { AuthApi } from '../../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../../useForm';
import validate from '../../../../validate/validateFarmer';

import PageHeader from '../../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Edit(props) {

    const { id } = useParams();

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

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

                if(data.states !== undefined) setStates(data.states);
                if(data.cities !== undefined) setCities(data.cities);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const submit = async () => {
        try {
            const editResponse = await AuthApi.put(`/admin/farmer-update/${id}`, values);
            const { status, data } = editResponse;
            if( status === 201 && data.farmer !== undefined ){
                toast.success(`Farmer edit successfully`);
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
      full_name   : "",
      age         : "",
      email_id    : "",
      mobile_no   : "",
      otp         : "",
      password    : "",
      address     : "",
      state_id    : "",
      district_id : "",
      taluka      : "",
      pin_code    : "",
      irrigate    : "",
      acreage     : "",
      krushi_kendra_name: ""
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
                            backlink="farmers"
                        />
                    </CCardHeader>
                    <CCardBody>
                        <FormDesign
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setValues={setValues}
                            values={values}
                            errors={errors}
                            states={states}
                            cities={cities}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
