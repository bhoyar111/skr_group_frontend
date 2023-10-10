import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

import { AuthApi } from '../../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../../useForm';
import validate from '../../../../validate/validateState';

import PageHeader from '../../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Add(props) {

  const [ countries, setCountries ] = useState([]);
  // console.log(`countries`, countries);

  const getDs = async () => {
    try {
        const listResponse = await AuthApi.get("/admin/states-ds");
        const { status, data } = listResponse;
        if( status === 200 && data.countries !== undefined ){
          setCountries(data.countries);
        }
    } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
    }
}

    const submit = async () => {
        try {
            const saveResponse = await AuthApi.post("/admin/state-add", values);
            const { status, data } = saveResponse;
            if( status === 201 && data.state !== undefined ){
                toast.success(`State added successfully`);
                props.history.push('/states');
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
      state_name    : "",
      country_id    : ""
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
                            backlink="states"
                        />
                    </CCardHeader>
                    <CCardBody>
                        <FormDesign
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setValues={setValues}
                            values={values}
                            errors={errors}
                            countries={countries}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
