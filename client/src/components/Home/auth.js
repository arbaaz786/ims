// import React from 'react';

// function AuthHome() {
//   return (
//     <>
//       <h1>Home</h1>
//       <p>You are logged in</p>
//     </>
//   );
// }

// export default AuthHome;

import React from 'react';
// import './App.css';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
// import { Link } from 'react-router-dom';
import { notify } from 'react-notify-toast';
import moment from 'moment';
// import { columns, data } from './data';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

const BUYERS_QUERY = gql`
  {
    allBuyers {
      _id
      title
      date
      content
      address
      emailId
      contactNo
      invoiceNo
      deliveryNote
      supplierRef
      otherRef
      buyersOrderNo
      dispatchDocumentNo
      deliveryNoteDate
      dispatchedThrough
      destination
      termsOfDelivery
      srNo
      disriptionOfGoods
      modelNo
      sirNo
      hsnsac
      quantity
      rate
      per
      discount
      amount
      totalAmount
      totalAmountInWords
    }
  }
`;

const DELETE_INVOICE_QUERY = gql`
  mutation deleteBuyer($_id: ID!) {
    deleteBuyer(_id: $_id) {
      title
      content
      _id
      date
    }
  }
`;

function AuthHome() {
  const columns = [
    {
      name: 'Invoice No',
      selector: 'invoiceNo',
      sortable: true,
      width: '100px',
    },
    {
      name: 'Name',
      selector: 'title',
      sortable: true,
    },
    {
      name: 'Address',
      selector: 'address',
      sortable: true,
      width: '200px',
    },
    {
      name: 'ContactNo',
      selector: 'contactNo',
      sortable: true,
    },
    {
      name: 'Date',
      selector: 'deliveryNoteDate',
      sortable: true,
      width: '200px',
      cell: (row) => moment(row.deliveryNoteDate).format('lll'),
    },
    {
      name: 'Edit',
      button: true,
      cell: (row) => (
        // <Link to={`updateInvoice/${row._id}`}>
        //   <i className='fas fa-edit'></i>
        // </Link>
        <button>
          <a href={`updateInvoice/${row._id}`}>
            <i className='fas fa-edit'></i>
          </a>
        </button>
      ),
    },
    {
      name: 'Print',
      button: true,
      cell: (row) => (
        <button>
          <a href={`printInvoice/${row._id}`}>
            <i className='fas fa-print'></i>
          </a>
        </button>
      ),
    },
    {
      name: 'Delete',
      button: true,
      cell: (row) => (
        <button
          className='button is-link is-small'
          onClick={(e) => {
            e.preventDefault();
            onDelete(row);
          }}
        >
          <i className='fas fa-trash-alt'></i>
        </button>
      ),
    },
  ];
  const { loading, error, data } = useQuery(BUYERS_QUERY);

  function onDelete(row) {
    if (window.confirm(`Are you sure you want to delete:\r ${row.title}?`)) {
      deleteBuyer({ variables: { _id: row._id } });
      notify.show('Invoice was deleted successfully', 'success');
      window.location.reload(false);
    }
  }

  const [deleteBuyer] = useMutation(DELETE_INVOICE_QUERY, {
    update(cache, { data: { deleteBuyer } }) {
      const { allInvoices } = cache.readQuery({ query: BUYERS_QUERY });
      const newInvoices = allInvoices.filter(
        (invoice) => invoice._id !== deleteBuyer._id
      );

      cache.writeQuery({
        query: BUYERS_QUERY,
        data: { allInvoices: newInvoices },
      });
    },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const listOfInvoice = data.allBuyers;
  console.log('columns', columns);
  console.log('listOfInvoice ', listOfInvoice);
  const tableData = {
    columns,
    data: listOfInvoice,
  };

  return (
    <div>
      {/* <div className='navbar-right'>
        <Link to={routes.CreateInvoice}>CreateInvoice</Link>
      </div> */}
      <div className='tablebody'>
        <DataTableExtensions {...tableData} className='data-table-extensions'>
          <DataTable
            columns={columns}
            data={listOfInvoice}
            noHeader
            defaultSortField='invoiceNo'
            defaultSortAsc={false}
            pagination
            highlightOnHover
          />
        </DataTableExtensions>
      </div>
    </div>
  );
}

export default AuthHome;
