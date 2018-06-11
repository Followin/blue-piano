<template>
    <header>
        <p class="logo-text">BP</p>
        <p class="logo-text-full">BLUE PIANO</p>
        <nav>
            <router-link to="/" class="router-link">Home</router-link>
            |
            <router-link to="/game" class="router-link">Game</router-link>
            |
            <router-link to="/about" class="router-link">About</router-link>
        </nav>
        <div class="avatar" v-bind:style="{ 'background-image': 'url(https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&h=350)' }"></div>
    </header>
</template>

<style lang="stylus" scoped>
    @import "../../styles/_colors.styl"
    @import "../../styles/_elevation.styl"
    @import "../../styles/_media.styl"

    header {
        mat-elevation(8);

        width: 100%;
        position: fixed;
        top: 0;
        left: 0;

        background: $dark-primary-color;
        color: $icon-color;
        z-index: 1;

        display: grid;
        grid-template-columns: 40px auto 60px;
        grid-template-areas: "logo links avatar";
        grid-column-gap: 10px;
        place-items: center center;
    }

    .logo-text, .logo-text-full {
        grid-area: logo;

        font-weight: bold;
    };

    .logo-text-full {
        font-size: 1.3em;
        display: none;
    }

    .avatar {
        grid-area: avatar;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid #fff;
        background-size: cover;
    };


    .router-link {
        color: $icon-color;
        text-decoration: none;

        &.router-link-exact-active {
            color: $light-primary-color;
            font-weight: bold;

            border-bottom: 2px solid $light-primary-color;
        }
    };

    +desktop() {
        header {
            grid-template-columns: 150px auto 100px;
            grid-column-gap: 30px;
        }

        .avatar {
            width: 70px;
            height: 70px;
        }

        .logo-text-full {
            display: inline;
        }

        .logo-text {
            display: none;
        }

        nav {
            justify-self: left;
        }
    }

</style>
