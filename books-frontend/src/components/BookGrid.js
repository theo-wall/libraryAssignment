import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const BookGrid = ({ bookData, handleSelect }) => {
  let bookRows = bookData?.map((book) => {
    return {
      id: book.id,
      col1: book.name,
      col2: book.author,
      col3: book.yearOfPublishing,
      col4: book.isbnNumber,
    };
  });

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Book Title", width: 150 },
    { field: "col2", headerName: "Author", width: 150 },
    { field: "col3", headerName: "Publishing Year", width: 150 },
    { field: "col4", headerName: "ISBN Number", width: 150 },
  ];

  const rows: GridRowsProp = bookRows;

  return (
    <div style={{ height: 400, width: "100%" }}>
      {bookData ? (
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnMenu
          hideFooterPagination
          onSelectionModelChange={(selection) => {
            handleSelect(selection);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default BookGrid;
