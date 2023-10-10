import React from 'react';
import { lazy } from 'react';

// For Dashboard
const Dashboard              = lazy(() => import('./views/dashboard/Dashboard'));
// General System
const Profile                = lazy(() => import('./views/admin/GeneralSetting/Profile/Profile'));
const ChangePassword         = lazy(() => import('./views/admin/GeneralSetting/ChangePassword/ChangePassword'));
// System Setting
// For Admin Users
const Users                  = lazy(() => import('./views/admin/SystemSetting/users/List'));
const AddUser                = lazy(() => import('./views/admin/SystemSetting/users/Add'));
const EditUser               = lazy(() => import('./views/admin/SystemSetting/users/Edit'));
// For Farmer
const Farmers                = lazy(() => import('./views/admin/SystemSetting/Farmer/List'));
const AddFarmer              = lazy(() => import('./views/admin/SystemSetting/Farmer/Add'));
const EditFarmer             = lazy(() => import('./views/admin/SystemSetting/Farmer/Edit'));
const CropGrown              = lazy(() => import('./views/admin/SystemSetting/Farmer/CropGrown'))
// For Admin Role
const Role                    = lazy(() => import('./views/admin/SystemSetting/role/List'));
const AddRole                 = lazy(() => import('./views/admin/SystemSetting/role/Add'));
const EditRole                = lazy(() => import('./views/admin/SystemSetting/role/Edit'));
// For Countries master
const Country                 = lazy(() => import('./views/admin/SystemSetting/Country/List'));
const AddCountry              = lazy(() => import('./views/admin/SystemSetting/Country/Add'));
const EditCountry             = lazy(() => import('./views/admin/SystemSetting/Country/Edit'));
// For State master
const State                   = lazy(() => import('./views/admin/SystemSetting/State/List'));
const AddState                = lazy(() => import('./views/admin/SystemSetting/State/Add'));
const EditState               = lazy(() => import('./views/admin/SystemSetting/State/Edit'));
// For City master
const City                   = lazy(() => import('./views/admin/SystemSetting/City/List'));
const AddCity                = lazy(() => import('./views/admin/SystemSetting/City/Add'));
const EditCity               = lazy(() => import('./views/admin/SystemSetting/City/Edit'));
// For Crops
const Crops                   = lazy(() => import('./views/admin/Crop/Crop/List'));
const AddCrop                 = lazy(() => import('./views/admin/Crop/Crop/Add'));
const EditCrop                = lazy(() => import('./views/admin//Crop/Crop/Edit'));
// For Sub Crops
const SubCrops               = lazy(() => import('./views/admin/Crop/SubCrop/List'));
const AddSubCrop             = lazy(() => import('./views/admin/Crop/SubCrop/Add'));
const EditSubCrop            = lazy(() => import('./views/admin/Crop/SubCrop/Edit'));
// For Stage
const Stage                  = lazy(() => import('./views/admin/Crop/Stages/List'));
const AddStage               = lazy(() => import('./views/admin/Crop/Stages/Add'));
const EditStage              = lazy(() => import('./views/admin/Crop/Stages/Edit'));
// For Stage information
const StageInfo              = lazy(() => import('./views/admin/Crop/StageInformation/List'));
const AddStageInfo           = lazy(() => import('./views/admin/Crop/StageInformation/Add'));
const EditStageInfo          = lazy(() => import('./views/admin/Crop/StageInformation/Edit'));
// For Product Category
const ProductCategory        = lazy(() => import('./views/admin/Product/ProductCategory/List'));
const AddProductCategory     = lazy(() => import('./views/admin/Product/ProductCategory/Add'));
const EditProductCategory    = lazy(() => import('./views/admin/Product/ProductCategory/Edit'));
// For Product
const Product                = lazy(() => import('./views/admin/Product/Products/List'));
const AddProduct             = lazy(() => import('./views/admin/Product/Products/Add'));
const EditProduct            = lazy(() => import('./views/admin/Product/Products/Edit'));
// For Dealer
const Dealer                 = lazy(() => import('./views/admin/Dealer/List'));
const AddDealer              = lazy(() => import('./views/admin/Dealer/Add'));
const EditDealer             = lazy(() => import('./views/admin/Dealer/Edit'));
// For Video
const Video                 = lazy(() => import('./views/admin/Video/List'));
const AddVideo              = lazy(() => import('./views/admin/Video/Add'));
const EditVideo             = lazy(() => import('./views/admin/Video/Edit'));
// For Banner
const Banner                 = lazy(() => import('./views/admin/Banner/List'));
const AddBanner              = lazy(() => import('./views/admin/Banner/Add'));
const EditBanner             = lazy(() => import('./views/admin/Banner/Edit'));
// For Ask the Expert
const AskTheExpert           = lazy(() => import('./views/admin/AskTheExpert/List'));
const AddAskTheExpert        = lazy(() => import('./views/admin/AskTheExpert/Add'));
const EditAskTheExpert       = lazy(() => import('./views/admin/AskTheExpert/Edit'));



const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));

const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));


const routes = [

// For Ask the expert
{ path: '/asktheexperts', exact: true, name: "AskTheExpert", component: AskTheExpert },
{ path: '/asktheexpert-add', exact: true, name: "AskTheExpert Add", component: AddAskTheExpert },
{ path: '/asktheexpert-edit/:id', exact: true, name: "AskTheExpert Edit", component: EditAskTheExpert },

// For banner
{ path: '/banners', exact: true, name: "Banner", component: Banner },
{ path: '/banner-add', exact: true, name: "Banner Add", component: AddBanner },
{ path: '/banner-edit/:id', exact: true, name: "Banner Edit", component: EditBanner },

// For Video
{ path: '/videos', exact: true, name: "Video", component: Video },
{ path: '/video-add', exact: true, name: "Video Add", component: AddVideo },
{ path: '/video-edit/:id', exact: true, name: "Video Edit", component: EditVideo },

// For Stage Information
{ path: '/stageinfos/:sub_crop_id/:stage_id', exact: true, name: "StageInfo", component: StageInfo },
{ path: '/stageinfo-add/:sub_crop_id/:stage_id', exact: true, name: "StageInfo Add", component: AddStageInfo },
{ path: '/stageinfo-edit/:sub_crop_id/:stage_id/:id', exact: true, name: "StageInfo Edit", component: EditStageInfo },

// For Stage
{ path: '/stages/:sub_crop_id', exact: true, name: "Stage", component: Stage },
{ path: '/stage-add/:sub_crop_id', exact: true, name: "Stage Add", component: AddStage },
{ path: '/stage-edit/:id/:sub_crop_id', exact: true, name: "Stage Edit", component: EditStage },

// For Dealers
{ path: '/dealers', exact: true, name: "Dealer", component: Dealer },
{ path: '/dealer-add', exact: true, name: "Dealer Add", component: AddDealer },
{ path: '/dealer-edit/:id', exact: true, name: "Dealer Edit", component: EditDealer },

// For Products
{ path: '/products/:product_category_id', exact: true, name: "Product", component: Product },
{ path: '/product-add/:product_category_id', exact: true, name: "Product Add", component: AddProduct },
{ path: '/product-edit/:id/:product_category_id', exact: true, name: "Product Edit", component: EditProduct },

// For Product Category
{ path: '/product_categories', exact: true, name: "Product Category", component: ProductCategory },
{ path: '/product_category-add', exact: true, name: "Product Category Add", component: AddProductCategory },
{ path: '/product_category-edit/:id', exact: true, name: "Product Category Edit", component: EditProductCategory },

// For Sub Crops
{ path: '/sub_crops', exact: true, name: "Sub Crop", component: SubCrops },
{ path: '/sub_crop-add', exact: true, name: "Sub Crop Add", component: AddSubCrop },
{ path: '/sub_crop-edit/:id', exact: true, name: "Sub Crop Edit", component: EditSubCrop },

  // For Crops
{ path: '/crops', exact: true, name: "Crop", component: Crops },
{ path: '/crop-add', exact: true, name: "Crop Add", component: AddCrop },
{ path: '/crop-edit/:id', exact: true, name: "Crop Edit", component: EditCrop },

// System Setting
// For Admin User
{ path: '/users', exact: true, name: "User", component: Users },
{ path: '/user-add', exact: true, name: "User Add", component: AddUser },
{ path: '/user-edit/:id', exact: true, name: "User Edit", component: EditUser },
// For Farmer
{ path: '/farmers', exact: true, name: "Farmer", component: Farmers },
{ path: '/farmer-add', exact: true, name: "Farmer Add", component: AddFarmer },
{ path: '/farmer-edit/:id', exact: true, name: "Farmer Edit", component: EditFarmer },
{ path: '/crop-grown/:id', exact: true, name: "Crop Grown", component: CropGrown },
// For Admin Role
{ path: '/roles', exact: true, name: "Role", component: Role },
{ path: '/role-add', exact: true, name: "Role Add", component: AddRole },
{ path: '/role-edit/:id', exact: true, name: "Role Edit", component: EditRole },
// For Country master
{ path: '/countries', exact: true, name: "Country", component: Country },
{ path: '/country-add', exact: true, name: "Country Add", component: AddCountry },
{ path: '/country-edit/:id', exact: true, name: "Country Edit", component: EditCountry },
// For State
{ path: '/states', exact: true, name: "State", component: State },
{ path: '/state-add', exact: true, name: "State Add", component: AddState },
{ path: '/state-edit/:id', exact: true, name: "State Edit", component: EditState },
// For City
{ path: '/cities', exact: true, name: "City", component: City },
{ path: '/city-add', exact: true, name: "City Add", component: AddCity },
{ path: '/city-edit/:id', exact: true, name: "City Edit", component: EditCity },
// { path:'/login', name:'Login Page', component: Login },
// // For Dashboard and Home page
// { path: '/', name: 'Home', component: Home},
{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
// General System
{ path: '/profile', exact: true, name: "Profile", component: Profile },
{ path: '/changepassword', exact: true, name: "Change Password", component: ChangePassword },


  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },

];

export default routes;
