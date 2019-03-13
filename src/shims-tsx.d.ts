import Vue, { VNode } from 'vue';

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {}
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
}

declare module 'vue/types/vue' {
    interface VueConstructor {
        http: any;
        methods: any;
    }
    interface VueConfiguration {
        debug: any;
    }
    interface Vue {
        // vueprototype.js 中的成员
    }
}
