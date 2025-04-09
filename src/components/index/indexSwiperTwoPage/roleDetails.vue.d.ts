type __VLS_Props = {
    item: {
        role: {
            zh_cn: string;
            en_us: string;
        };
        details: {
            attribute: string;
            quality: number;
            CV: {
                zh_cn: string;
            };
            dub: string;
            introduce: string;
            PV: string | null;
        };
    };
    index: number;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {
    star: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    playAudio: (path: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onPlayAudio?: ((path: string) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
