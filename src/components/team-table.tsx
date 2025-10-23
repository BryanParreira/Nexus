"use client";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCloseCircleLine,
  RiDeleteBinLine,
  RiBardLine,
  RiFilter3Line,
  RiSearch2Line,
  RiCheckLine,
  RiMoreLine,
} from "@remixicon/react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

type TeamMember = {
  id: string;
  image: string;
  name: string;
  status: string;
  location: string;
  role: string;
  department: string;
  joinDate: string;
};

const statusFilterFn: FilterFn<TeamMember> = (
  row,
  columnId,
  filterValue: string[],
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

interface GetColumnsProps {
  data: TeamMember[];
  setData: React.Dispatch<React.SetStateAction<TeamMember[]>>;
}

const getColumns = ({ data, setData }: GetColumnsProps): ColumnDef<TeamMember>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img
          className="rounded-full"
          src={row.original.image}
          width={32}
          height={32}
          alt={row.getValue("name")}
        />
        <div className="font-medium">{row.getValue("name")}</div>
      </div>
    ),
    size: 200,
    enableHiding: false,
  },
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("id")}</span>
    ),
    size: 110,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <div className="flex items-center h-full">
        <Badge
          variant="outline"
          className={cn(
            "gap-1 py-0.5 px-2 text-sm",
            row.original.status === "Inactive"
              ? "text-muted-foreground"
              : "text-primary-foreground",
          )}
        >
          {row.original.status === "Active" && (
            <RiCheckLine
              className="text-emerald-500"
              size={14}
              aria-hidden="true"
            />
          )}
          {row.original.status === "Inactive" && "- "}
          {row.original.status}
        </Badge>
      </div>
    ),
    size: 110,
    filterFn: statusFilterFn,
  },
  {
    header: "Location",
    accessorKey: "location",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("location")}</span>
    ),
    size: 140,
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("role")}</span>
    ),
    size: 150,
  },
  {
    header: "Department",
    accessorKey: "department",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-normal">
        {row.getValue("department")}
      </Badge>
    ),
    size: 140,
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <RowActions data={data} setData={setData} item={row.original} />
    ),
    size: 90,
    enableSorting: false,
    enableHiding: false,
  },
];

interface TeamTableProps {
  data: TeamMember[];
  isLoading?: boolean;
}

export function TeamTable({ data: initialData, isLoading = false }: TeamTableProps) {
  const [data, setData] = useState<TeamMember[]>(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const columns = useMemo(() => getColumns({ data, setData }), [data]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    table.getColumn("name")?.setFilterValue(searchValue);
  }, [searchValue, table]);

  useEffect(() => {
    table.getColumn("status")?.setFilterValue(statusFilter);
  }, [statusFilter, table]);

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const isRowSelected = selectedRows.length > 0;

  const handleResetFilters = () => {
    setSearchValue("");
    setStatusFilter([]);
    table.resetColumnFilters();
  };

  const isFiltered =
    searchValue || statusFilter.length > 0 || columnFilters.length > 0;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2 max-w-sm">
          <div className="relative flex-1">
            <RiSearch2Line
              size={16}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              placeholder="Search by name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-9 w-full pl-8"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-9 gap-2 border-dashed",
                  statusFilter.length > 0 && "bg-accent",
                )}
              >
                <RiFilter3Line size={16} aria-hidden="true" />
                <span className="hidden sm:inline">Status</span>
                {statusFilter.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="h-5 rounded-sm px-1 font-normal"
                  >
                    {statusFilter.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-3" align="end">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium">Status</h4>
                  <p className="text-xs text-muted-foreground">
                    Filter by member status
                  </p>
                </div>
                <div className="space-y-2">
                  {["Active", "Inactive"].map((status) => (
                    <Label
                      key={status}
                      className="flex items-center gap-2 font-normal"
                    >
                      <Checkbox
                        checked={statusFilter.includes(status)}
                        onCheckedChange={(checked) => {
                          setStatusFilter(
                            checked
                              ? [...statusFilter, status]
                              : statusFilter.filter((s) => s !== status),
                          );
                        }}
                      />
                      <span className="text-sm">{status}</span>
                    </Label>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Reset Filters */}
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="h-9 gap-2"
            >
              <RiCloseCircleLine size={16} aria-hidden="true" />
              <span>Reset</span>
            </Button>
          )}
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {isRowSelected && (
        <div className="flex items-center justify-between rounded-lg border bg-accent/50 px-4 py-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {selectedRows.length}
            </span>{" "}
            of {table.getFilteredRowModel().rows.length} row(s) selected
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.toggleAllPageRowsSelected(false)}
            >
              Clear
            </Button>
            <Button variant="destructive" size="sm">
              <RiDeleteBinLine size={16} className="mr-2" aria-hidden="true" />
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <Table className="table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          header.column.getCanSort() &&
                            "flex h-full cursor-pointer select-none items-center gap-2",
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          if (
                            header.column.getCanSort() &&
                            (e.key === "Enter" || e.key === " ")
                          ) {
                            e.preventDefault();
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: (
                            <RiArrowUpSLine
                              className="shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                          ),
                          desc: (
                            <RiArrowDownSLine
                              className="shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <tbody aria-hidden="true" className="table-row h-1"></tbody>
        <TableBody>
          {isLoading ? (
            <TableRow className="hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="last:py-0 h-[inherit]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <tbody aria-hidden="true" className="table-row h-1"></tbody>
      </Table>

      {/* Pagination */}
      {table.getRowModel().rows.length > 0 && (
        <div className="flex items-center justify-between gap-3">
          <p
            className="flex-1 whitespace-nowrap text-sm text-muted-foreground"
            aria-live="polite"
          >
            Page{" "}
            <span className="text-foreground">
              {table.getState().pagination.pageIndex + 1}
            </span>{" "}
            of <span className="text-foreground">{table.getPageCount()}</span>
          </p>
          <Pagination className="w-auto">
            <PaginationContent className="gap-3">
              <PaginationItem>
                <Button
                  variant="outline"
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  Previous
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

function RowActions({
  setData,
  data,
  item,
}: {
  setData: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  data: TeamMember[];
  item: TeamMember;
}) {
  const [isUpdatePending, startUpdateTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleStatusToggle = () => {
    startUpdateTransition(() => {
      const updatedData = data.map((dataItem) => {
        if (dataItem.id === item.id) {
          return {
            ...dataItem,
            status: item.status === "Active" ? "Inactive" : "Active",
          };
        }
        return dataItem;
      });
      setData(updatedData);
    });
  };

  const handleDelete = () => {
    startUpdateTransition(() => {
      const updatedData = data.filter((dataItem) => dataItem.id !== item.id);
      setData(updatedData);
      setShowDeleteDialog(false);
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-end">
            <Button
              size="icon"
              variant="ghost"
              className="shadow-none text-muted-foreground/60"
              aria-label="Edit item"
            >
              <RiMoreLine className="size-5" size={20} aria-hidden="true" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          <DropdownMenuGroup>
            <DropdownMenuItem>Edit member</DropdownMenuItem>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleStatusToggle}
              disabled={isUpdatePending}
            >
              {item.status === "Active"
                ? "Deactivate member"
                : "Activate member"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            variant="destructive"
            className="dark:data-[variant=destructive]:focus:bg-destructive/10"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove this
              team member from your organization.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdatePending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isUpdatePending}
              className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}