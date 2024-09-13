import { Helmet } from 'react-helmet-async';

import { CreateProductView } from '../sections/products/createProduct';
import BreadcrumbsComponent from '../components/breadcrumb/breadcrumb.jsx'


// ----------------------------------------------------------------------

export default function CreateProductPage() {
  const breadcrumbPaths = [
    { label: 'Products', href: '/dashboard/products' },
    { label: 'Add User', href: '/dashboard/products/add' }
  ];
  return (
    <>
      <Helmet>
        <title> Add Product </title>
      </Helmet>
      <BreadcrumbsComponent paths={breadcrumbPaths} />
      <CreateProductView />
    </>
  );
}
