import { Helmet } from 'react-helmet-async';

import { CreateProductView } from '../sections/products/createProduct';

// ----------------------------------------------------------------------

export default function CreateProductPage() {
  return (
    <>
      <Helmet>
        <title> Add Product | NFCecure </title>
      </Helmet>

      <CreateProductView />
    </>
  );
}
