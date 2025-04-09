interface PageItem {
    controller: {
        image: string;
    };
    role: {
        zh_cn: string;
        en_us: string;
    };
}
type __VLS_Props = {
    totalPages: PageItem[];
    currentPage: number;
    maxVisible: number;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {
    star: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    prevPage: () => any;
    nextPage: () => any;
    goToPage: (index: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onPrevPage?: (() => any) | undefined;
    onNextPage?: (() => any) | undefined;
    onGoToPage?: ((index: number) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
