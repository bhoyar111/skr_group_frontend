import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'


// sidebar nav config
import navigation from './_nav'
import Logo from '../../src/assets/img/logo01.png'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

//   const { project_id } = useParams();

  return (
        <CSidebar
            show={show}
            onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
        >
            <CSidebarBrand className="d-md-down-none" to="/">
                <img src={Logo} />
                {/* <CIcon
                    className="c-sidebar-brand-full"
                    name="logo-negative"
                    height={35}
                /> */}
                <CIcon
                    className="c-sidebar-brand-minimized"
                    name="sygnet"
                    height={35}
                />
            </CSidebarBrand>
            <CSidebarNav>
                <CCreateElement
                    items={navigation}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle
                    }}
                />
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none"/>
        </CSidebar>
    )
}

export default React.memo(TheSidebar)
