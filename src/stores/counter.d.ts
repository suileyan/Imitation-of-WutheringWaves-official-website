export declare const useCounterStore: import("pinia").StoreDefinition<"counter", Pick<{
    increment(): void;
    doubleCount: import("vue").ComputedRef<number>;
    count: import("vue").Ref<number, number>;
    officialWebsite: import("vue").Ref<string, string>;
}, "count" | "officialWebsite">, Pick<{
    increment(): void;
    doubleCount: import("vue").ComputedRef<number>;
    count: import("vue").Ref<number, number>;
    officialWebsite: import("vue").Ref<string, string>;
}, "doubleCount">, Pick<{
    increment(): void;
    doubleCount: import("vue").ComputedRef<number>;
    count: import("vue").Ref<number, number>;
    officialWebsite: import("vue").Ref<string, string>;
}, "increment">>;
