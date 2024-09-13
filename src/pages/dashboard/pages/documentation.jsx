import { Helmet } from 'react-helmet-async';

import { DocumentationView } from '../sections/documentation';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Documentation </title>
      </Helmet>

      <DocumentationView />
    </>
  );
}
