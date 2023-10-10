import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow , CButton} from '@coreui/react';
import { useParams } from "react-router-dom";

import PageHeader from '../../../../containers/PageHeader';
import { AuthApi } from '../../../../utils/api';

import { toast } from 'react-toastify';
import Pagination from "react-js-pagination";

import TableTr from './TableTr';

export default function List() {

  const { sub_crop_id } = useParams();

    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(1);

    const [ stages, setStages ] = useState([]);
    const [subCrops, setSubCrops] = useState([]);

    const getListing = async (pgNO) => {
        try {
            const listResponse = await AuthApi.get(`/admin/stages/${sub_crop_id}?pageNo=${pgNO}`);
            const { status, data } = listResponse;
            if( status === 200 ){
                if ( data.stages !== undefined ) setStages(data.stages);
                if (data.sub_crops !== undefined ) setSubCrops(data.sub_crops);
                const { pageData:{per_page, total_record} } = data || {};
                setPerPage(per_page);
                setTotalRecords(total_record);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const deleteData = async (id) => {
        try {
            const deleteResponse = await AuthApi.delete(`/admin/stage-delete/${id}`);
            const { status, data } = deleteResponse;
            if( status === 200 && data.stage !== undefined ){
                toast.success(`Stage deleted successfully`);
                getListing(currentPage);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const getClickedPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
        getListing(pageNumber);
    }

    useEffect(() => {
        getListing(currentPage)
    }, []);

    return (
        <>
            <CRow>
                <CCol xl={12}>
                    <CCardHeader>
                      <div className="d-flex justify-content-between pt-3">
                        <p className="title mb-1"><b>Crop Name:-{subCrops != undefined ? subCrops.sub_crop_name : ''}</b></p>
                        <CButton href={`/#/sub_crops`} color="secondary" size="small" className="ml-3 text-back">Back</CButton>
                      </div>
                    </CCardHeader>
                    <CCard>
                        <CCardHeader>
                            <PageHeader
                                title="Stages Listing"
                                addlink={`stage-add/${sub_crop_id}`}
                            />
                        </CCardHeader>
                        <CCardBody>
                            <table className="table bg-white white-table library-table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-center">Sr. No</th>
                                        <th scope="col">Stage Name</th>
                                        <th scope="col" className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    stages && stages.map((stage, i) => (
                                        <TableTr
                                            sr={i+1}
                                            key={i}
                                            stage={stage}
                                            deleteData={deleteData}
                                            currentPage={currentPage}
                                            perPage={perPage}
                                        />
                                    ))
                                }
                                </tbody>
                            </table>
                            <div className="d-flex flex-row py-4 justify-content-center">
                                <Pagination
                                    activePage={currentPage}
                                    prevPageText='prev'
                                    nextPageText='next'
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    pageRangeDisplayed={5}
                                    itemsCountPerPage={perPage}
                                    totalItemsCount={totalRecords}
                                    onChange={getClickedPageNo}
                                />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}
