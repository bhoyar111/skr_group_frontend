import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useParams } from "react-router-dom";

import { AuthApi } from '../../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../../useForm';
import validate from '../../../../validate/validateCity';

import PageHeader from '../../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Edit(props) {

    const { id } = useParams();

    const [ countries, setCountries ] = useState([]);
    const [ states, setStates ] = useState([]);

    const getEditData = async () => {
        try {
            const getResponse = await AuthApi.get(`/admin/city-get/${id}`);
            const { status, data } = getResponse;
            if( status === 200 && data.city !== undefined ){
                const { city } = data;
                for (let [key] of Object.entries(formInputObj)) {
                    formInputObj[key] = city[key];
                }
                setValues({ ...formInputObj });

                if(data.countries!== undefined) setCountries(data.countries);
                if(data.states!== undefined) setStates(data.states);

            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const submit = async () => {
        try {
            const editResponse = await AuthApi.put(`/admin/city-update/${id}`, values);
            const { status, data } = editResponse;
            if( status === 201 && data.city !== undefined ){
                toast.success(`City edit successfully`);
                props.history.push("/cities");
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
      city_name    : "",
      country_id    : "",
      state_id      : ""
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
                            backlink="cities"
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
                            states={states}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
