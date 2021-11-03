import React from 'react'

const IncidentTable = () => {
    return (
        <div>
  <div className="card">
    <div className="card-header">
      <h3 className="card-title">DataTable with default features</h3>
    </div>
    {/* /.card-header */}
    <div className="card-body">
      <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4"><div className="row"><div className="col-sm-12 col-md-6"><div className="dt-buttons btn-group flex-wrap">               <button className="btn btn-secondary buttons-copy buttons-html5" tabIndex={0} aria-controls="example1" type="button"><span>Copy</span></button> <button className="btn btn-secondary buttons-csv buttons-html5" tabIndex={0} aria-controls="example1" type="button"><span>CSV</span></button> <button className="btn btn-secondary buttons-excel buttons-html5" tabIndex={0} aria-controls="example1" type="button"><span>Excel</span></button> <button className="btn btn-secondary buttons-pdf buttons-html5" tabIndex={0} aria-controls="example1" type="button"><span>PDF</span></button> <button className="btn btn-secondary buttons-print" tabIndex={0} aria-controls="example1" type="button"><span>Print</span></button> <div className="btn-group"><button className="btn btn-secondary buttons-collection dropdown-toggle buttons-colvis" tabIndex={0} aria-controls="example1" type="button" aria-haspopup="true" aria-expanded="false"><span>Column visibility</span></button></div> </div></div><div className="col-sm-12 col-md-6"><div id="example1_filter" className="dataTables_filter"><label>Search:<input type="search" className="form-control form-control-sm" placeholder aria-controls="example1" /></label></div></div></div><div className="row"><div className="col-sm-12"><table id="example1" className="table table-bordered table-striped dataTable dtr-inline" role="grid" aria-describedby="example1_info">
              <thead>
                <tr role="row"><th className="sorting sorting_asc" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">Rendering engine</th><th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Browser: activate to sort column ascending">Browser</th><th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Platform(s): activate to sort column ascending">Platform(s)</th><th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Engine version: activate to sort column ascending">Engine version</th><th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="CSS grade: activate to sort column ascending">CSS grade</th></tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td className="dtr-control sorting_1" tabIndex={0}>Gecko</td>
                  <td>Firefox 1.0</td>
                  <td>Win 98+ / OSX.2+</td>
                  <td>1.7</td>
                  <td>A</td>
                </tr><tr className="even">
                  <td className="dtr-control sorting_1" tabIndex={0}>Gecko</td>
                  <td>Firefox 1.5</td>
                  <td>Win 98+ / OSX.2+</td>
                  <td>1.8</td>
                  <td>A</td>
                </tr><tr className="odd">
                  <td className="dtr-control sorting_1" tabIndex={0}>Gecko</td>
                  <td>Firefox 2.0</td>
                  <td>Win 98+ / OSX.2+</td>
                  <td>1.8</td>
                  <td>A</td>
                </tr><tr className="even">
                  <td className="dtr-control sorting_1" tabIndex={0}>Gecko</td>
                  <td>Firefox 3.0</td>
                  <td>Win 2k+ / OSX.3+</td>
                  <td>1.9</td>
                  <td>A</td>
                </tr><tr className="odd">
                  <td className="sorting_1 dtr-control" tabIndex={0}>Gecko</td>
                  <td>Camino 1.0</td>
                  <td>OSX.2+</td>
                  <td>1.8</td>
                  <td>A</td>
                </tr><tr className="even">
                  <td className="sorting_1 dtr-control" tabIndex={0}>Gecko</td>
                  <td>Camino 1.5</td>
                  <td>OSX.3+</td>
                  <td>1.8</td>
                  <td>A</td>
                </tr><tr className="odd">
                  <td className="sorting_1 dtr-control" tabIndex={0}>Gecko</td>
                  <td>Netscape 7.2</td>
                  <td>Win 95+ / Mac OS 8.6-9.2</td>
                  <td>1.7</td>
                  <td>A</td>
                </tr><tr className="even">
                  <td className="sorting_1 dtr-control" tabIndex={0}>Gecko</td>
                  <td>Netscape Browser 8</td>
                  <td>Win 98SE+</td>
                  <td>1.7</td>
                  <td>A</td>
                </tr><tr className="odd">
                  <td className="sorting_1 dtr-control" tabIndex={0}>Gecko</td>
                  <td>Netscape Navigator 9</td>
                  <td>Win 98+ / OSX.2+</td>
                  <td>1.8</td>
                  <td>A</td>
                </tr><tr className="even">
                  <td className="sorting_1 dtr-control" tabIndex={0}>Gecko</td>
                  <td>Mozilla 1.0</td>
                  <td>Win 95+ / OSX.1+</td>
                  <td>1</td>
                  <td>A</td>
                </tr></tbody>
              <tfoot>
                <tr><th rowSpan={1} colSpan={1}>Rendering engine</th><th rowSpan={1} colSpan={1}>Browser</th><th rowSpan={1} colSpan={1}>Platform(s)</th><th rowSpan={1} colSpan={1}>Engine version</th><th rowSpan={1} colSpan={1}>CSS grade</th></tr>
              </tfoot>
            </table></div></div><div className="row"><div className="col-sm-12 col-md-5"><div className="dataTables_info" id="example1_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div></div><div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="example1_paginate"><ul className="pagination"><li className="paginate_button page-item previous disabled" id="example1_previous"><a href="#" aria-controls="example1" data-dt-idx={0} tabIndex={0} className="page-link">Previous</a></li><li className="paginate_button page-item active"><a href="#" aria-controls="example1" data-dt-idx={1} tabIndex={0} className="page-link">1</a></li><li className="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx={2} tabIndex={0} className="page-link">2</a></li><li className="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx={3} tabIndex={0} className="page-link">3</a></li><li className="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx={4} tabIndex={0} className="page-link">4</a></li><li className="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx={5} tabIndex={0} className="page-link">5</a></li><li className="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx={6} tabIndex={0} className="page-link">6</a></li><li className="paginate_button page-item next" id="example1_next"><a href="#" aria-controls="example1" data-dt-idx={7} tabIndex={0} className="page-link">Next</a></li></ul></div></div></div></div>
    </div>
    {/* /.card-body */}
  </div>

        </div>
    )
}

export default IncidentTable
