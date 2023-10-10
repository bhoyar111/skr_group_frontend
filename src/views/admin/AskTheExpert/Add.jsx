import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

import { AuthApi } from '../../../utils/api';
import { toast } from 'react-toastify';
import moment from 'moment';

import useForm from '../../../useForm';
import validate from '../../../validate/validateAskTheExpert';

import PageHeader from '../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Add(props) {

  const [farmers, setFarmers] = useState([]);

  const getDs = async () => {
    try {
        const listResponse = await AuthApi.get("/admin/asktheexperts-ds");
        const { status, data } = listResponse;
        if( status === 200 ){
          if(data.farmers !== undefined) setFarmers(data.farmers);
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

            const saveResponse = await AuthApi.post("/admin/asktheexpert-add", formData);
            const { status, data } = saveResponse;
            if( status === 201 && data.asktheexpert !== undefined ){
                toast.success(`Ask The Expert added successfully`);
                props.history.push('/asktheexperts');
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
        subject     : "",
        farmer_id   : "",
        description : "",
        ask_date    : moment(new Date()).format("YYYY-MM-DD"),
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
                            title="Add"
                            backlink="asktheexperts"
                        />
                    </CCardHeader>
                    <CCardBody>
                        <FormDesign
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setValues={setValues}
                            values={values}
                            errors={errors}
                            farmers={farmers}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
