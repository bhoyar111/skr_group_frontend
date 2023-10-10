import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import PageHeader from '../../../../containers/PageHeader';
import TableTr from './TableTr';
import { AuthApi } from '../../../../utils/api';
import { toast } from 'react-toastify';
import Pagination from "react-js-pagination";

export default function List() {

    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(1);

    const [ farmers, setFarmers ] = useState([]);

    const getListing = async (pgNO) => {
        try {
            const listResponse = await AuthApi.get(`/admin/farmers?pageNo=${pgNO}`);
            const { status, data } = listResponse;
            if( status === 200 && data.farmers !== undefined ){
              setFarmers(data.farmers);
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
            const deleteResponse = await AuthApi.delete(`/admin/farmer-delete/${id}`);
            const { status, data } = deleteResponse;
            if( status === 200 && data.farmer !== undefined ){
                toast.success(`Farmer deleted successfully`);
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
                    <CCard>
                        <CCardHeader>
                            <PageHeader
                                title="Listing"
                                addlink="farmer-add"
                            />
                        </CCardHeader>
                        <CCardBody>
                            <table className="table bg-white white-table library-table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-center">Sr. No</th>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Mobile No.</th>
                                        <th scope="col">City</th>
                                        {/* <th scope="col">Crop Grown</th> */}
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    farmers && farmers.map((farmer, i) => (
                                        <TableTr
                                            sr={i+1}
                                            key={i}
                                            farmer={farmer}
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
