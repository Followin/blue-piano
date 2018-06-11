<template>
    <button class="bp-button"
            v-bind:class="{ 'bp-button-elevated': elevated, 'bp-button-primary': primary, 'bp-button-accent': accent }"
            v-on:click="click">
        <slot></slot>
        <div class="bp-button-background"></div>
        <div class="bp-button-ripple"
             v-bind:class="{'active': showRippleEffect}"
             v-bind:style="{top: rippleOffset.top + 'px', left: rippleOffset.left + 'px'}"></div>
    </button>
</template>

<script src="./button.js">
</script>
<style src="./button.styl">
</style>
