import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline';
import React, { Component } from 'react';

interface CFADataGridProps {
    data: Array<{ [key: string]: any }>;
    columns: Array<{ title: string; field: string }>;
    searchable?: boolean;
    filterable?: boolean;
    sortable?: boolean;
}

interface CFADataGridState {
    filteredData: Array<{ [key: string]: any }>;
    searchQuery: string;
    sortedColumn: string;
    sortDirection: 'asc' | 'desc';
    columnFilters: { [key: string]: string };
}

class CFADataGrid extends Component<CFADataGridProps, CFADataGridState> {
    constructor(props: CFADataGridProps) {
        super(props);
        this.state = {
            filteredData: props.data,
            searchQuery: '',
            sortedColumn: '',
            sortDirection: 'asc',
            columnFilters: {}
        };
    }

    // componentDidUpdate(prevProps: CFADataGridProps) {
    //     if (prevProps.data !== this.props.data) {
    //         this.setState({ filteredData: this.props.data }, this.filterData);
    //     }
    // }
    static getDerivedStateFromProps(nextProps: CFADataGridProps, prevState: CFADataGridState) {
        if (nextProps.data !== prevState.filteredData) {
            return {
                filteredData: nextProps.data,
            };
        }
        return null;
    }

    handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = e.target.value;
        this.setState({ searchQuery }, this.filterData);
    };

    handleFilterChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        const { columnFilters } = this.state;
        columnFilters[field] = e.target.value;
        this.setState({ columnFilters }, this.filterData);
    };

    filterData = () => {
        const { data } = this.props;
        const { searchQuery, columnFilters } = this.state;

        const filteredData = data.filter((row) => {
            for (const column of Object.keys(columnFilters)) {
                if (
                    columnFilters[column] &&
                    row[column]
                        .toString()
                        .toLowerCase()
                        .indexOf(columnFilters[column].toLowerCase()) === -1
                ) {
                    return false;
                }
            }
            if (
                searchQuery &&
                !Object.values(row).some((value) =>
                    value
                        .toString()
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                )
            ) {
                return false;
            }
            return true;
        });

        this.setState({ filteredData });
    };

    handleSort = (field: string) => {
        const { filteredData, sortedColumn, sortDirection } = this.state;
        const newSortDirection = sortedColumn === field && sortDirection === 'asc' ? 'desc' : 'asc';

        const sortedData = [...filteredData].sort((a, b) => {
            if (a[field] < b[field]) {
                return newSortDirection === 'asc' ? -1 : 1;
            }
            if (a[field] > b[field]) {
                return newSortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });

        this.setState({
            filteredData: sortedData,
            sortedColumn: field,
            sortDirection: newSortDirection,
        });
    };

    render() {
        const {
            data,
            columns,
            searchable,
            sortable,
            filterable,
        } = this.props;
        const { searchQuery, columnFilters, filteredData, sortedColumn, sortDirection } = this.state;

        const statusOrder: Record<string, number> = { Fail: 1, Waiting: 2, Checking: 3, Pass: 4 };
        const sortByStatus = (data: any[], CFAResult: keyof typeof statusOrder) => {
            return data.sort((a, b) => statusOrder[a[CFAResult]] - statusOrder[b[CFAResult]]);
        };
        const sortedData = sortByStatus(filteredData, 'CFAResult');

        return (
            <div className="table-container">
                {searchable && (
                    <div>
                        <label>Search:</label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={this.handleSearch}
                            placeholder={`Filter by...`} // Thêm thuộc tính placeholder
                            className="filter-input"
                        />
                    </div>
                )}
                <table>
                    <thead className="sticky-header">
                        <tr>
                            {columns.map((column, i) => (
                                <th key={i} onClick={sortable ? () => this.handleSort(column.field) : undefined}>
                                    <span>{column.title}</span>
                                    {sortable && sortedColumn === column.field && (
                                        <span>{sortDirection === 'asc' ? <BarsArrowUpIcon width={'15px'} height={'15px'} className={'inline'} /> : <BarsArrowDownIcon width={'15px'} height={'15px'} className={'inline'} />}</span>
                                    )}
                                </th>
                            ))}
                        </tr>
                        {filterable && (
                            <tr>
                                {columns.map((column) => (
                                    <th key={column.field}>
                                        <input
                                            type="text"
                                            value={columnFilters[column.field] || ''}
                                            onChange={(e) =>
                                                this.handleFilterChange(e, column.field)
                                            }
                                            placeholder={``} // Thêm thuộc tính placeholder
                                            className="filter-input mt-1 w-full px-2 py-1 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 text-sm text-gray-900 placeholder-gray-500 transition duration-300 ease-in-out" // Thêm các lớp của Tailwind CSS
                                            style={{ width: '100%' }}
                                        />
                                    </th>
                                ))}
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {filteredData.map((row, index) => (
                            <tr key={index} className={row.CFAResult === 'Fail'
                                ? 'fail-color'
                                : row.CFAResult === 'Waiting'
                                    ? 'waiting-color'
                                    : row.CFAResult === 'Checking'
                                        ? 'checking-color'
                                        : ''}>
                                {columns.map((column) => (
                                    <td key={column.field}>{row[column.field]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CFADataGrid;
