<template>
    <div id="app">
        <bp-header></bp-header>
        <router-view/>
    </div>
</template>

<style lang="stylus">
    @import "../styles/global.styl";

    header-height = {
        mobile: 50px,
        desktop: 80px
    }

    body {
        margin: 0;
    }

    header {
        height: header-height.mobile;
    }

    #app {
        font-family: Roboto, sans-serif;
        position: absolute;
        top: header-height.mobile + 10px;
        left: 0;
        right: 0;
        bottom: 0;
    }

    @media (min-width: 768px) {
        header {
            height: header-height.desktop;
        }

        #app {
            top: header-height.desktop + 10px;
        }
    }
</style>
