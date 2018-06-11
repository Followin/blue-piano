<template>
    <span>
        <input :name="name" :id="uuid" type="radio" :checked="isChecked" @change="$emit('input', val)"/>
        <label :for="uuid"><slot></slot></label>
    </span>
</template>

<script src="./radio.js">
</script>
<style src="./radio.styl" lang="stylus" scoped></style>
