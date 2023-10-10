import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

import { AuthApi } from '../../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../../useForm';
import validate from '../../../../validate/validateProduct';

import PageHeader from '../../../../containers/PageHeader';

import { useParams } from "react-router-dom";
import { getDecryptId } from '../../../../utils/secure';

import FormDesign from './FormDesign';

export default function Add(props) {

  const { product_category_id } = useParams();

  const decProductId = getDecryptId(product_category_id);

    const [productCategories, setProductCategories] = useState([]);

    const getDs = async () => {
        try {
            const listResponse = await AuthApi.get("/admin/product-subategories-ds");
            const { status, data } = listResponse;
            if( status === 200 && data.product_categories !== undefined ){
                setProductCategories(data.product_categories);
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
            const saveResponse = await AuthApi.post("/admin/product-subcategory-add", formData);
            const { status, data } = saveResponse;
            if( status === 201 && data.product_subcategory !== undefined ){
                toast.success(`Product added successfully`);
                props.history.push(`/products/${product_category_id}`);
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
        product_name        : "",
        product_category_id : decProductId,
        price               : "",
        weight              : "",
        description         : "",
        doc_url             : ""
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
                            title="Product Add"
                            backlink={`products/${product_category_id}`}
                        />
                    </CCardHeader>
                    <CCardBody>
                        <FormDesign
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setValues={setValues}
                            values={values}
                            errors={errors}
                            productCategories={productCategories}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
