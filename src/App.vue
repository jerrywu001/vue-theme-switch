<template>
    <div id="app" class="enter">
        <a href="javascript:;" @click="toggleTheme">切换主题</a>
        <router-view></router-view>
    </div>
</template>

<script>
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {
    data() {
        return {
            isDefaultTheme: true,
        };
    },
    methods: {
        createElementFromHTML(htmlString) {
            const div = document.createElement('div');
            div.innerHTML = htmlString.trim();
            return div.firstChild;
        },
        appendThemeStyle(text) {
            let styleDom = document.getElementById('id-scss');
            if (styleDom) {
                styleDom.innerHTML = text;
            } else {
                styleDom = this.createElementFromHTML(`
                    <style type="text/css" id="id-scss">${text}</style>
                `);
                document.head.appendChild(styleDom);
            }
        },
        switchTheme() {
            if (this.isDefaultTheme) {
                Vue.http.get('/static/themes/default.min.css').then((rsp) => {
                    if (rsp.status === 200) {
                        this.appendThemeStyle(rsp.bodyText);
                    }
                });
            } else {
                Vue.http.get('/static/themes/dark.min.css').then((rsp) => {
                    if (rsp.status === 200) {
                        this.appendThemeStyle(rsp.bodyText);
                    }
                });
            }
        },
        toggleTheme() {
            this.isDefaultTheme = !this.isDefaultTheme;
            this.switchTheme();
        },
    },
    created() {
        this.switchTheme();
    },
};

</script>

<style lang="scss">
@import './assets/css/App.scss';

.enter {
    a {
        display: block;
        width: 80px;
        height: 20px;
        text-align: center;
    }
}

</style>
