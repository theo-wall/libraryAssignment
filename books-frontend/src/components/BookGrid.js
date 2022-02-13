import { DataGrid } from "@mui/x-data-grid";

const BookGrid = ({ bookData, handleSelect }) => {
  // creates array bookRows from bookData fetched from back end for MUI DataGrid
  const rows = bookData?.map((book) => {
    return {
      id: book.id,
      col1: book.name,
      col2: book.author,
      col3: book.yearOfPublishing,
      col4: book.isdnNumber,
    };
  });

  // creates array of column headers for MUI DataGrid
  const columns = [
    { field: "col1", headerName: "Book Title", width: 150 },
    { field: "col2", headerName: "Author", width: 150 },
    { field: "col3", headerName: "Publishing Year", width: 150 },
    { field: "col4", headerName: "ISDN Number", width: 150 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* Displays DataGrid MUI Component only when bookData is variables rows and columns have been populated */}
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
