declare namespace Domains {
    interface tableRow {
        prop: string;
        label: string;
        formatter?: object;
        type?: string;
        width?: string;
        showOverflowTooltip?: boolean;
        minWidth?: string;
        fixed?: boolean | string;
        align?: string;
        slotName?: string;
        required?: boolean;
    }

    interface showOperation {
        showDelLine?: boolean;
        showEditLine?: boolean;
        showView?: boolean;
    }

    interface tableSetUp {
        id?: string;
        maxHeight?: string;
        highlightCurrentRow?: boolean;
        scrollbarAlwaysOn?: boolean;
        sortOrders?: Array<string>;
        defaultSort?: object;
        showSelection?: boolean;
        selectFn?: (row: object, index: number) => boolean;
        readonly?: boolean;
        tableColumns?: Array<tableRow>;
        showOperation?: showOperation | boolean;
        showSummary?: boolean | [];
        draggable?: boolean;
        showPagination?: showPagination;
        pageSize?: string;
        pageSizeOptions?: Array<string>;
        virtualList?: boolean;
    }

    interface showPagination {
        pageSize?: number;
        pageSizeOptions: Array<number>;
        pagerCount?: number;
    }

    interface Product {
        id: string;
        name: string;
        amount1: string;
        amount2: string;
        amount3: number;
    }

    interface SummaryMethodProps<T = Product> {
        columns: [];
        data: T[];
    }
}
export type { Domains };
